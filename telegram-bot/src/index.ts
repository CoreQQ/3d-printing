import { Telegraf } from 'telegraf';
import { config } from './config';
import { authMiddleware } from './auth';
import { agents, getAgent, listAgents, defaultAgentKey } from './agents';
import { getSession, setAgent, resetHistory, pushExchange } from './session';
import { askAgent } from './claude';

const bot = new Telegraf(config.telegramBotToken);

const TELEGRAM_MAX_LENGTH = 4096;

async function replyLong(ctx: { reply: (text: string) => Promise<unknown> }, text: string): Promise<void> {
  if (text.length <= TELEGRAM_MAX_LENGTH) {
    await ctx.reply(text);
    return;
  }
  for (let i = 0; i < text.length; i += TELEGRAM_MAX_LENGTH) {
    await ctx.reply(text.slice(i, i + TELEGRAM_MAX_LENGTH));
  }
}

function agentsMenuText(): string {
  return listAgents()
    .map((agent) => `/${agent.key} — ${agent.label}: ${agent.description}`)
    .join('\n');
}

// /whoami works without auth so the owner can find the IDs to put in .env
bot.command('whoami', async (ctx) => {
  await ctx.reply(
    `user_id: ${ctx.from?.id}\nchat_id: ${ctx.chat?.id}\n\nДобавь нужный ID в ALLOWED_USER_IDS или ALLOWED_CHAT_IDS и перезапусти бота.`,
  );
});

bot.use(authMiddleware);

bot.command('start', async (ctx) => {
  await ctx.reply(
    `Привет! Я набор агентов для продвижения bmwcoding и Nimbus3D (3D-печать).\n\nДоступные агенты:\n${agentsMenuText()}\n\nТекущий агент: ${getAgent(getSession(ctx.chat!.id).agentKey)!.label}\n\nПросто пиши сообщение — отвечает текущий агент. /reset очищает историю диалога.`,
  );
});

bot.command('help', async (ctx) => {
  await ctx.reply(`Команды:\n${agentsMenuText()}\n/reset — очистить историю диалога\n/whoami — узнать свой Telegram ID`);
});

for (const agent of Object.values(agents)) {
  bot.command(agent.key, async (ctx) => {
    setAgent(ctx.chat!.id, agent.key);
    await ctx.reply(`Переключился на агента: ${agent.label}\n${agent.description}`);
  });
}

bot.command('reset', async (ctx) => {
  resetHistory(ctx.chat!.id);
  await ctx.reply('История диалога очищена.');
});

bot.on('text', async (ctx) => {
  const chatId = ctx.chat.id;
  const session = getSession(chatId);
  const agent = getAgent(session.agentKey) ?? getAgent(defaultAgentKey)!;

  await ctx.sendChatAction('typing');

  try {
    const reply = await askAgent(agent.systemPrompt, [...session.history, { role: 'user', content: ctx.message.text }]);
    pushExchange(chatId, ctx.message.text, reply);
    await replyLong(ctx, reply || 'Не получилось сформировать ответ, попробуй переформулировать.');
  } catch (error) {
    console.error('Claude request failed:', error);
    await ctx.reply('Ошибка при обращении к Claude API. Попробуй ещё раз чуть позже.');
  }
});

bot.catch((error) => {
  console.error('Bot error:', error);
});

bot.launch().then(() => {
  console.log('Bot started (long polling).');
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
