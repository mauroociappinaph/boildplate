import { z } from 'zod';

export const AIConfigSchema = z.object({
  openaiApiKey: z.string().min(1),
  model: z.enum(['gpt-4', 'gpt-3.5-turbo']).default('gpt-3.5-turbo'),
  temperature: z.number().min(0).max(2).default(0.7),
  maxTokens: z.number().min(1).max(4000).default(2000),
});

export type AIConfig = z.infer<typeof AIConfigSchema>;

export const defaultAIConfig: AIConfig = {
  openaiApiKey: process.env.OPENAI_API_KEY || '',
  model: 'gpt-3.5-turbo',
  temperature: 0.7,
  maxTokens: 2000,
};
