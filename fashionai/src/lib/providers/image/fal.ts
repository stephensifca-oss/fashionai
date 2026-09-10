import { ImageProvider, ImageGenerationInput, ImageGenerationOutput } from '../types';

function getDimensions(aspectRatio?: string): { width: number; height: number } {
  switch (aspectRatio) {
    case '16:9':
      return { width: 1344, height: 768 };
    case '9:16':
      return { width: 768, height: 1344 };
    case '1:1':
      return { width: 1024, height: 1024 };
    case '4:3':
      return { width: 1152, height: 864 };
    case '3:4':
      return { width: 864, height: 1152 };
    case '2:3':
    default:
      return { width: 832, height: 1248 };
  }
}

export class FalImageProvider implements ImageProvider {
  name = 'fal';
  private apiKey: string;

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.FAL_KEY || '';
  }

  async generate(input: ImageGenerationInput): Promise<ImageGenerationOutput> {
    if (!this.apiKey) {
      throw new Error('FAL_KEY is not configured.');
    }

    let endpoint = process.env.FAL_ENDPOINT || 'bytedance/seedream/v5/pro/text-to-image';

    const body: Record<string, unknown> = {
      prompt: input.prompt,
      aspect_ratio: input.aspectRatio || '2:3',
      image_size: getDimensions(input.aspectRatio),
      seed: input.seed,
    };

    if (input.referenceImages && input.referenceImages.length > 0) {
      const urls: string[] = [];
      const fs = require('fs');
      const path = require('path');
      
      for (const r of input.referenceImages) {
        let finalUrl = r.url || r.base64;
        if (!finalUrl) continue;
        
        if (finalUrl.startsWith('/')) {
          try {
            const publicPath = path.join(process.cwd(), 'public', finalUrl);
            if (fs.existsSync(publicPath)) {
              const buf = fs.readFileSync(publicPath);
              const mimeType = finalUrl.endsWith('.png') ? 'image/png' : 'image/jpeg';
              finalUrl = `data:${mimeType};base64,${buf.toString('base64')}`;
            }
          } catch (err) {
            console.error('Error reading local file for Fal.ai:', err);
          }
        }
        urls.push(finalUrl);
      }
      
      if (urls.length > 0) {
        body.image_urls = urls;
        body.image_url = urls[0];
      }
    }

    // If endpoint is an edit endpoint but no reference images provided, use text-to-image endpoint
    if (!body.image_urls && endpoint.includes('edit')) {
      endpoint = 'bytedance/seedream/v5/pro/text-to-image';
    }

    const res = await fetch(`https://fal.run/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Key ${this.apiKey}`,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Fal.ai API error [${res.status}]: ${err}`);
    }

    const data = await res.json();
    const imageUrl = data.images?.[0]?.url || data.image?.url || data.output?.url || '';

    return {
      imageUrl,
      seed: data.seed,
      provider: this.name,
      costEstimateCents: 6,
      rawResponse: data,
    };
  }
}
