export type AspectRatio = '1:1' | '2:3' | '3:2' | '4:5' | '16:9';

export interface ImageGenerationInput {
  prompt: string;
  negativePrompt?: string;
  aspectRatio?: AspectRatio;
  referenceImages?: {
    url?: string;
    base64?: string;
    role?: 'source' | 'model' | 'garment' | 'scene';
  }[];
  seed?: number;
}

export interface ImageGenerationOutput {
  imageUrl: string;
  seed?: number;
  provider: string;
  costEstimateCents?: number;
  rawResponse?: unknown;
}

export interface ImageProvider {
  name: string;
  generate(input: ImageGenerationInput): Promise<ImageGenerationOutput>;
}

export interface LLMMessage {
  role: 'system' | 'user' | 'assistant';
  content: string | { type: 'text' | 'image_url'; text?: string; image_url?: { url: string } }[];
}

export interface LLMInput {
  systemPrompt?: string;
  messages: LLMMessage[];
  temperature?: number;
  maxTokens?: number;
}

export interface LLMOutput {
  text: string;
  provider: string;
  tokensUsed?: {
    prompt: number;
    completion: number;
    total: number;
  };
  rawResponse?: unknown;
}

export interface LLMProvider {
  name: string;
  complete(input: LLMInput): Promise<LLMOutput>;
}
