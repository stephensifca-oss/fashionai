import { ImageProvider, ImageGenerationInput, ImageGenerationOutput, AspectRatio } from '../types';
import { getGcpAccessToken } from '../gcp-auth';

// Imagen 3's `:predict` API (imagen-3.0-generate-002) is not reachable from this project on
// either Vertex AI or the Generative Language API — see AGENTS.md-adjacent notes / chat log.
// Google's current fashion/photo-editing-capable image models are the Gemini-native image
// models ("Nano Banana" family), served via `:generateContent`, which also accept reference
// images as normal multimodal input parts (useful for garment/model reference photos).
function mapAspectRatio(ratio?: AspectRatio): '1:1' | '9:16' | '16:9' | '3:4' | '4:3' {
  switch (ratio) {
    case '16:9':
      return '16:9';
    case '2:3':
      return '3:4'; // Closest portrait ratio supported
    case '3:2':
      return '4:3';
    case '4:5':
      return '3:4';
    case '1:1':
    default:
      return '1:1';
  }
}

import fs from 'fs/promises';
import path from 'path';

async function referenceImagesToParts(
  referenceImages: ImageGenerationInput['referenceImages']
): Promise<{ inlineData: { mimeType: string; data: string } }[]> {
  if (!referenceImages?.length) return [];

  const parts = await Promise.all(
    referenceImages.map(async (ref) => {
      if (ref.base64) {
        // Accept either a raw base64 payload or a data: URL in `base64`.
        if (ref.base64.startsWith('data:')) {
          const [header, data] = ref.base64.split(';base64,');
          return { inlineData: { mimeType: header.replace('data:', ''), data } };
        }
        return { inlineData: { mimeType: 'image/jpeg', data: ref.base64 } };
      }
      if (ref.url) {
        if (ref.url.startsWith('data:')) {
          const [header, data] = ref.url.split(';base64,');
          return { inlineData: { mimeType: header.replace('data:', ''), data } };
        }
        // Handle local static paths in /public
        if (ref.url.startsWith('/')) {
          try {
            const filePath = path.join(process.cwd(), 'public', ref.url);
            const buffer = await fs.readFile(filePath);
            const ext = path.extname(filePath).toLowerCase();
            const mimeType = ext === '.png' ? 'image/png' : ext === '.webp' ? 'image/webp' : 'image/jpeg';
            return { inlineData: { mimeType, data: buffer.toString('base64') } };
          } catch (fsErr) {
            console.error('Failed to read local reference image:', ref.url, fsErr);
            return null;
          }
        }
        try {
          const res = await fetch(ref.url);
          const arrayBuffer = await res.arrayBuffer();
          const mimeType = res.headers.get('content-type') || 'image/jpeg';
          return { inlineData: { mimeType, data: Buffer.from(arrayBuffer).toString('base64') } };
        } catch (err) {
          console.error('Failed to fetch reference image for image generation:', ref.url, err);
          return null;
        }
      }
      return null;
    })
  );

  return parts.filter((p): p is { inlineData: { mimeType: string; data: string } } => p !== null);
}

function buildGenerateContentBody(
  input: ImageGenerationInput,
  aspectRatio: string,
  referenceParts: { inlineData: { mimeType: string; data: string } }[]
) {
  const promptParts: string[] = [input.prompt];
  if (input.negativePrompt) {
    promptParts.push(`Avoid the following: ${input.negativePrompt}`);
  }

  return {
    contents: [
      {
        role: 'user',
        parts: [...referenceParts, { text: promptParts.join('\n\n') }],
      },
    ],
    generationConfig: {
      responseModalities: ['IMAGE'],
      imageConfig: { aspectRatio },
    },
  };
}

function extractImage(data: any): { mimeType: string; base64: string } | null {
  const parts = data?.candidates?.[0]?.content?.parts || [];
  for (const part of parts) {
    if (part.inlineData?.data) {
      return { mimeType: part.inlineData.mimeType || 'image/png', base64: part.inlineData.data };
    }
  }
  return null;
}

export class VertexImagenProvider implements ImageProvider {
  name = 'vertex';
  private apiKey: string;
  private model: string;
  private projectId: string;
  private location: string;
  private accessToken: string;

  constructor() {
    this.apiKey = process.env.VERTEX_API_KEY || process.env.GEMINI_API_KEY || '';
    this.model = process.env.VERTEX_IMAGEN_MODEL || 'gemini-3-pro-image';
    this.projectId = process.env.GCP_PROJECT_ID || process.env.GOOGLE_CLOUD_PROJECT || '';
    // Gemini image-gen models (gemini-3-pro-image, etc.) are only published in the `global`
    // Vertex AI location, not regional ones like us-central1 — using a region here 404s even
    // though the model exists and the project has access.
    this.location = process.env.GCP_LOCATION || 'global';
    this.accessToken = process.env.GCP_ACCESS_TOKEN || '';
  }

  async generate(input: ImageGenerationInput): Promise<ImageGenerationOutput> {
    const aspectRatio = mapAspectRatio(input.aspectRatio);
    const referenceParts = await referenceImagesToParts(input.referenceImages);

    // 1. Try Direct GCP Vertex AI OAuth Token / Project configured
    // Token retrieval is inside the try too: a service-account/auth failure (bad creds,
    // expired key, no network to oauth2.googleapis.com) must fall back to Google AI Studio
    // below, not crash the whole request.
    if (this.projectId) {
      try {
        const token = this.accessToken || (await getGcpAccessToken());
        if (token) {
          return await this.generateVertexGCP(input, aspectRatio, referenceParts, token);
        }
      } catch (gcpErr) {
        console.warn('GCP Vertex AI failed, falling back to Google AI Studio:', gcpErr);
      }
    }

    // 2. Fallback / Default: Generative Language API (Gemini native image generation)
    return this.generateGoogleAIStudio(input, aspectRatio, referenceParts);
  }

  private async generateGoogleAIStudio(
    input: ImageGenerationInput,
    aspectRatio: string,
    referenceParts: { inlineData: { mimeType: string; data: string } }[]
  ): Promise<ImageGenerationOutput> {
    if (!this.apiKey) {
      throw new Error(
        'VERTEX_API_KEY or GEMINI_API_KEY is required for image generation. Please configure it in .env.local.'
      );
    }

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${this.model}:generateContent?key=${this.apiKey}`;
    const body = buildGenerateContentBody(input, aspectRatio, referenceParts);

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Google AI Studio image API error (${res.status}): ${errText}`);
    }

    const data = await res.json();
    const image = extractImage(data);

    if (!image) {
      throw new Error(`No image generated by ${this.model}. Response: ${JSON.stringify(data).slice(0, 500)}`);
    }

    return {
      imageUrl: `data:${image.mimeType};base64,${image.base64}`,
      provider: `google-ai-studio-${this.model}`,
      costEstimateCents: this.model.includes('pro') ? 6.0 : 3.0,
      rawResponse: data,
    };
  }

  private async generateVertexGCP(
    input: ImageGenerationInput,
    aspectRatio: string,
    referenceParts: { inlineData: { mimeType: string; data: string } }[],
    token: string
  ): Promise<ImageGenerationOutput> {
    // The `global` location has no regional host prefix; regional locations do.
    const host = this.location === 'global' ? 'aiplatform.googleapis.com' : `${this.location}-aiplatform.googleapis.com`;
    const endpoint = `https://${host}/v1/projects/${this.projectId}/locations/${this.location}/publishers/google/models/${this.model}:generateContent`;
    const body = buildGenerateContentBody(input, aspectRatio, referenceParts);

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Vertex AI API error (${res.status}): ${errText}`);
    }

    const data = await res.json();
    const image = extractImage(data);

    if (!image) {
      throw new Error(`No image returned by Vertex AI ${this.model}. Response: ${JSON.stringify(data).slice(0, 500)}`);
    }

    return {
      imageUrl: `data:${image.mimeType};base64,${image.base64}`,
      provider: `vertex-ai-${this.model}`,
      costEstimateCents: this.model.includes('pro') ? 6.0 : 3.0,
      rawResponse: data,
    };
  }
}
