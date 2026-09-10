import { LLMProvider, LLMInput, LLMOutput, LLMMessage } from '../types';

export class CloudflareWorkersAILLMProvider implements LLMProvider {
  name = 'cloudflare';
  private accountId: string;
  private apiToken: string;
  private model: string;

  constructor(
    accountId?: string,
    apiToken?: string,
    model: string = '@cf/meta/llama-3.1-70b-instruct'
  ) {
    this.accountId = accountId || process.env.CLOUDFLARE_ACCOUNT_ID || '';
    this.apiToken = apiToken || process.env.CF_WORKERS_AI_TOKEN || process.env.CLOUDFLARE_API_TOKEN || '';
    this.model = process.env.CLOUDFLARE_LLM_MODEL || model;
  }

  async complete(input: LLMInput): Promise<LLMOutput> {
    if (!this.accountId || !this.apiToken) {
      throw new Error(
        'CLOUDFLARE_ACCOUNT_ID et CF_WORKERS_AI_TOKEN sont requis pour utiliser Cloudflare Workers AI.'
      );
    }

    const messages = [];
    if (input.systemPrompt) {
      messages.push({ role: 'system', content: input.systemPrompt });
    }

    for (const msg of input.messages) {
      if (typeof msg.content === 'string') {
        messages.push({ role: msg.role, content: msg.content });
      } else {
        // Concatenate text parts, and avoid injecting enormous raw base64 strings into the text model's prompt
        const textParts: string[] = [];
        for (const c of msg.content) {
          if (c.type === 'text' && c.text) {
            textParts.push(c.text);
          } else if (c.type === 'image_url') {
            const url = c.image_url?.url || '';
            if (url.startsWith('data:')) {
              // Extract basic info without exploding the token context
              const mime = url.substring(5, url.indexOf(';'));
              textParts.push(`[Image attachée fournie par l'utilisateur (${mime})]`);
            } else {
              textParts.push(`[Image: ${url}]`);
            }
          }
        }
        messages.push({ role: msg.role, content: textParts.join('\n') });
      }
    }

    const res = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${this.accountId}/ai/run/${this.model}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.apiToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages,
          temperature: input.temperature ?? 0.4,
          max_tokens: input.maxTokens ?? 2048,
        }),
      }
    );

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Cloudflare Workers AI (LLM) error [${res.status}]: ${err}`);
    }

    const data = await res.json();
    const text = data.result?.response || data.result?.choices?.[0]?.message?.content || '';

    return {
      text,
      provider: this.name,
      tokensUsed: {
        prompt: data.result?.usage?.prompt_tokens || 0,
        completion: data.result?.usage?.completion_tokens || 0,
        total: data.result?.usage?.total_tokens || 0,
      },
      rawResponse: data,
    };
  }
}
