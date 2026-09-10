import { ImageProvider, ImageGenerationInput, ImageGenerationOutput } from '../types';

// Résolutions cibles par ratio d'aspect
const RATIO_SIZES: Record<string, { width: number; height: number }> = {
  '1:1':  { width: 1024, height: 1024 },
  '2:3':  { width: 832,  height: 1216 },
  '3:2':  { width: 1216, height: 832  },
  '16:9': { width: 1344, height: 768  },
  '4:5':  { width: 896,  height: 1120 },
};

/**
 * Hugging Face Inference API — FLUX.1-schnell (gratuit, non-gated)
 *
 * Modèles disponibles :
 *   - black-forest-labs/FLUX.1-schnell  ✅ Libre, ~2s, 4 étapes — RECOMMANDÉ
 *   - black-forest-labs/FLUX.1-dev      ⚠️ Gated (nécessite acceptation sur HF + token)
 *
 * Variable d'env optionnelle :
 *   HF_API_TOKEN  — token HF gratuit sur https://huggingface.co/settings/tokens
 *   HF_IMAGE_MODEL — pour surcharger le modèle
 */
export class HuggingFaceImageProvider implements ImageProvider {
  name = 'huggingface';
  private apiToken: string;
  private model: string;

  constructor(apiToken?: string, model?: string) {
    this.apiToken = apiToken || process.env.HF_API_TOKEN || '';
    // FLUX.1-schnell par défaut : libre, sans gating, ultra-rapide
    this.model = model || process.env.HF_IMAGE_MODEL || 'black-forest-labs/FLUX.1-schnell';
  }

  async generate(input: ImageGenerationInput): Promise<ImageGenerationOutput> {
    const { width, height } = RATIO_SIZES[input.aspectRatio || '2:3'] ?? RATIO_SIZES['2:3'];
    const isSchnell = this.model.includes('schnell');

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'image/jpeg,image/png,image/*',
    };

    if (this.apiToken) {
      headers['Authorization'] = `Bearer ${this.apiToken}`;
    }

    const endpoint = `https://api-inference.huggingface.co/models/${this.model}`;

    // Timeout de 45 secondes
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 45_000);

    let res: Response;
    try {
      res = await fetch(endpoint, {
        method: 'POST',
        headers,
        signal: controller.signal,
        body: JSON.stringify({
          inputs: input.prompt,
          parameters: {
            width,
            height,
            num_inference_steps: isSchnell ? 4 : 28,
            guidance_scale: isSchnell ? 0.0 : 3.5,
            ...(input.seed !== undefined ? { seed: input.seed } : {}),
            ...(input.negativePrompt ? { negative_prompt: input.negativePrompt } : {}),
          },
        }),
      });
    } finally {
      clearTimeout(timeoutId);
    }

    if (!res.ok) {
      let errMsg = `Hugging Face API error [${res.status}]`;
      try {
        const errJson = await res.json();
        // Message d'erreur lisible + conseil si modèle gated
        const detail = errJson.error || JSON.stringify(errJson);
        errMsg += `: ${detail}`;
        if (res.status === 403 || detail.includes('gated')) {
          errMsg += '. ⚠️ Ce modèle est "gated". Utilisez hf-schnell ou acceptez les conditions sur huggingface.co/black-forest-labs/FLUX.1-dev et configurez HF_API_TOKEN.';
        }
      } catch {
        errMsg += `: ${await res.text()}`;
      }
      throw new Error(errMsg);
    }

    // L'API retourne un blob PNG/JPEG
    const blob = await res.blob();
    const arrayBuffer = await blob.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString('base64');
    const mimeType = blob.type || 'image/png';
    const imageUrl = `data:${mimeType};base64,${base64}`;

    return {
      imageUrl,
      seed: input.seed,
      provider: `huggingface/${this.model}`,
      costEstimateCents: 0,
      rawResponse: { model: this.model, width, height },
    };
  }
}
