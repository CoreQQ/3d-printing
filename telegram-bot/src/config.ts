import 'dotenv/config';

function parseIdList(raw: string | undefined): number[] {
  return (raw ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .map(Number)
    .filter((n) => Number.isFinite(n));
}

function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
}

export const config = {
  telegramBotToken: required('TELEGRAM_BOT_TOKEN'),
  anthropicApiKey: required('ANTHROPIC_API_KEY'),
  anthropicModel: process.env.ANTHROPIC_MODEL ?? 'claude-sonnet-4-6',
  allowedUserIds: parseIdList(process.env.ALLOWED_USER_IDS),
  allowedChatIds: parseIdList(process.env.ALLOWED_CHAT_IDS),
};
