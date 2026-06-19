import type { Context, MiddlewareFn } from 'telegraf';
import { config } from './config';

export function isAllowed(ctx: Context): boolean {
  const userId = ctx.from?.id;
  const chatId = ctx.chat?.id;
  if (userId !== undefined && config.allowedUserIds.includes(userId)) {
    return true;
  }
  if (chatId !== undefined && config.allowedChatIds.includes(chatId)) {
    return true;
  }
  return false;
}

export const authMiddleware: MiddlewareFn<Context> = async (ctx, next) => {
  if (!isAllowed(ctx)) {
    await ctx.reply(
      'Этот бот приватный. Отправь /whoami и попроси владельца добавить твой ID в ALLOWED_USER_IDS или ALLOWED_CHAT_IDS.',
    );
    return;
  }
  await next();
};
