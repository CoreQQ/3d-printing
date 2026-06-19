import { defaultAgentKey } from './agents';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface SessionState {
  agentKey: string;
  history: ChatMessage[];
}

const MAX_HISTORY = 20;

const sessions = new Map<number, SessionState>();

export function getSession(chatId: number): SessionState {
  let session = sessions.get(chatId);
  if (!session) {
    session = { agentKey: defaultAgentKey, history: [] };
    sessions.set(chatId, session);
  }
  return session;
}

export function setAgent(chatId: number, agentKey: string): void {
  const session = getSession(chatId);
  session.agentKey = agentKey;
}

export function resetHistory(chatId: number): void {
  const session = getSession(chatId);
  session.history = [];
}

export function pushExchange(chatId: number, userText: string, assistantText: string): void {
  const session = getSession(chatId);
  session.history.push({ role: 'user', content: userText });
  session.history.push({ role: 'assistant', content: assistantText });
  if (session.history.length > MAX_HISTORY) {
    session.history = session.history.slice(-MAX_HISTORY);
  }
}
