import { ImageProvider, ImageGenerationInput, ImageGenerationOutput } from '../types';

export class ReplicateImageProvider implements ImageProvider {
  name = 'replicate';
  private apiKey: string;
  private model: string;

  constructor(apiKey?: string, model: string = 'black-forest-labs/flux-1.1-pro') {
    this.apiKey = apiKey || process.env.REPLICATE_API_TOKEN || '';
    this.model = process.env.REPLICATE_MODEL || model;
  }

  async generate(input: ImageGenerationInput): Promise<ImageGenerationOutput> {
    if (!this.apiKey) {
      throw new Error('REPLICATE_API_TOKEN is not configured.');
    }

    const res = await fetch(`https://api.replicate.com/v1/models/${this.model}/predictions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
        Prefer: 'wait',
      },
      body: JSON.stringify({
        input: {
          prompt: input.prompt,
          aspect_ratio: input.aspectRatio || '2:3',
          seed: input.seed,
        },
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Replicate API error [${res.status}]: ${err}`);
    }

    const data = await res.json();
    let imageUrl = '';
    if (typeof data.output === 'string') {
      imageUrl = data.output;
    } else if (Array.isArray(data.output) && data.output.length > 0) {
      imageUrl = data.output[0];
    }

    return {
      imageUrl,
      seed: input.seed,
      provider: this.name,
      costEstimateCents: 4,
      rawResponse: data,
    };
  }
}
