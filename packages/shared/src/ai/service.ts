import OpenAI from 'openai';
import { AIConfig, defaultAIConfig } from './config';
import {
  CODE_REVIEW_PROMPT,
  TEST_GENERATION_PROMPT,
  DOCUMENTATION_PROMPT,
  CODE_OPTIMIZATION_PROMPT,
  SECURITY_AUDIT_PROMPT,
} from './prompts';

export class AIService {
  private static instance: AIService;
  private openai: OpenAI;
  private config: AIConfig;

  private constructor(config: AIConfig = defaultAIConfig) {
    this.config = config;
    this.openai = new OpenAI({
      apiKey: this.config.openaiApiKey,
    });
  }

  public static getInstance(config?: AIConfig): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService(config);
    }
    return AIService.instance;
  }

  private async generateCompletion(prompt: string): Promise<string> {
    try {
      const completion = await this.openai.chat.completions.create({
        model: this.config.model,
        messages: [{ role: 'user', content: prompt }],
        temperature: this.config.temperature,
        max_tokens: this.config.maxTokens,
      });

      return completion.choices[0]?.message?.content || '';
    } catch (error) {
      console.error('Error generating AI completion:', error);
      throw new Error('Failed to generate AI completion');
    }
  }

  public async reviewCode(code: string): Promise<string> {
    const prompt = CODE_REVIEW_PROMPT.replace('{code}', code);
    return this.generateCompletion(prompt);
  }

  public async generateTests(code: string): Promise<string> {
    const prompt = TEST_GENERATION_PROMPT.replace('{code}', code);
    return this.generateCompletion(prompt);
  }

  public async generateDocumentation(code: string): Promise<string> {
    const prompt = DOCUMENTATION_PROMPT.replace('{code}', code);
    return this.generateCompletion(prompt);
  }

  public async optimizeCode(code: string): Promise<string> {
    const prompt = CODE_OPTIMIZATION_PROMPT.replace('{code}', code);
    return this.generateCompletion(prompt);
  }

  public async auditSecurity(code: string): Promise<string> {
    const prompt = SECURITY_AUDIT_PROMPT.replace('{code}', code);
    return this.generateCompletion(prompt);
  }
}
