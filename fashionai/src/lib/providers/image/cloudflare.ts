import { ImageProvider, ImageGenerationInput, ImageGenerationOutput } from '../types';

export class CloudflareWorkersAIImageProvider implements ImageProvider {
  name = 'cloudflare';
  private accountId: string;
  private apiToken: string;
  private model: string;

  constructor(
    accountId?: string,
    apiToken?: string,
    model: string = '@cf/black-forest-labs/flux-1-schnell'
  ) {
    this.accountId = accountId || process.env.CLOUDFLARE_ACCOUNT_ID || '';
    this.apiToken = apiToken || process.env.CF_WORKERS_AI_TOKEN || process.env.CLOUDFLARE_API_TOKEN || '';
    this.model = process.env.CLOUDFLARE_IMAGE_MODEL || model;
  }

  async generate(input: ImageGenerationInput): Promise<ImageGenerationOutput> {
    if (!this.accountId || !this.apiToken) {
      throw new Error(
        'CLOUDFLARE_ACCOUNT_ID et CF_WORKERS_AI_TOKEN sont requis pour utiliser Cloudflare Workers AI.'
      );
    }

    // Cloudflare Workers AI flux-1-schnell has a 2048 character limit on prompt
    const sanitizedPrompt = input.prompt.length > 2000 
      ? input.prompt.slice(0, 2000) 
      : input.prompt;

    const res = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${this.accountId}/ai/run/${this.model}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.apiToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: sanitizedPrompt,
        }),
      }
    );

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Cloudflare Workers AI (Image) error [${res.status}]: ${err}`);
    }

    const data = await res.json();
    const base64Raw = data.result?.image || '';
    const base64Image = base64Raw.startsWith('data:')
      ? base64Raw
      : `data:image/jpeg;base64,${base64Raw}`;

    return {
      imageUrl: base64Image,
      provider: this.name,
      costEstimateCents: 0, // Workers AI
      rawResponse: data,
    };
  }
}
