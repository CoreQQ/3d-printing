import Anthropic from '@anthropic-ai/sdk';
import { config } from './config';
import type { ChatMessage } from './session';

const client = new Anthropic({ apiKey: config.anthropicApiKey });

export async function askAgent(systemPrompt: string, history: ChatMessage[]): Promise<string> {
  const response = await client.messages.create({
    model: config.anthropicModel,
    max_tokens: 1500,
    system: systemPrompt,
    messages: history.map((m) => ({ role: m.role, content: m.content })),
  });

  const textBlock = response.content.find((block) => block.type === 'text');
  return textBlock?.type === 'text' ? textBlock.text : '';
}
