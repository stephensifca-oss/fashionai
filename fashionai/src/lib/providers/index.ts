import { LLMProvider, ImageProvider, LLMInput, LLMOutput, ImageGenerationInput, ImageGenerationOutput } from './types';
import { CloudflareWorkersAILLMProvider } from './llm/cloudflare';
import { GeminiLLMProvider } from './llm/gemini';
import { OpenAILLMProvider } from './llm/openai';
import { CloudflareWorkersAIImageProvider } from './image/cloudflare';
import { FalImageProvider } from './image/fal';
import { ReplicateImageProvider } from './image/replicate';
import { HuggingFaceImageProvider } from './image/huggingface';
import { VertexImagenProvider } from './image/vertex';

export * from './types';

/**
 * Factory for LLM Provider based on LLM_PROVIDER env variable ('cloudflare' | 'gemini' | 'openai')
 */
export function getLLMProvider(name?: string): LLMProvider {
  const providerName = name || process.env.LLM_PROVIDER || 'cloudflare';

  switch (providerName.toLowerCase()) {
    case 'gemini':
      return new GeminiLLMProvider();
    case 'openai':
      return new OpenAILLMProvider();
    case 'cloudflare':
    default:
      return new CloudflareWorkersAILLMProvider();
  }
}

/**
 * Factory for Image Provider based on IMAGE_PROVIDER env variable ('cloudflare' | 'fal' | 'replicate' | 'vertex' | 'imagen')
 */
export function getImageProvider(name?: string): ImageProvider {
  const providerName = name || process.env.IMAGE_PROVIDER || 'cloudflare';

  switch (providerName.toLowerCase()) {
    case 'vertex':
    case 'imagen':
    case 'imagen3':
    case 'google':
      return new VertexImagenProvider();
    case 'fal':
      return new FalImageProvider();
    case 'replicate':
      return new ReplicateImageProvider();
    case 'huggingface':
    case 'hf':
    case 'hf-dev':
      // FLUX.1-dev est gated (nécessite acceptation HF) — on utilise schnell par défaut
      // Pour activer FLUX.1-dev : accepter les termes sur huggingface.co + configurer HF_API_TOKEN
      return new HuggingFaceImageProvider(undefined, 'black-forest-labs/FLUX.1-schnell');
    case 'hf-schnell':
      return new HuggingFaceImageProvider(undefined, 'black-forest-labs/FLUX.1-schnell');
    case 'cloudflare':
    default:
      return new CloudflareWorkersAIImageProvider();
  }
}

/**
 * Universal shortcut to call the configured LLM provider
 */
export async function llm(input: LLMInput, providerName?: string): Promise<LLMOutput> {
  const provider = getLLMProvider(providerName);
  return provider.complete(input);
}

/**
 * Universal shortcut to call the configured Image provider
 */
export async function image(input: ImageGenerationInput, providerName?: string): Promise<ImageGenerationOutput> {
  const provider = getImageProvider(providerName);
  return provider.generate(input);
}
