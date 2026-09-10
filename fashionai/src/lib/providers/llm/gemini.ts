import { LLMProvider, LLMInput, LLMOutput, LLMMessage } from '../types';

export class GeminiLLMProvider implements LLMProvider {
  name = 'gemini';
  private apiKey: string;
  private model: string;

  constructor(apiKey?: string, model: string = 'gemini-3.6-flash') {
    this.apiKey = apiKey || process.env.GEMINI_API_KEY || '';
    this.model = process.env.GEMINI_MODEL || model;
  }

  async complete(input: LLMInput): Promise<LLMOutput> {
    if (!this.apiKey) {
      throw new Error('GEMINI_API_KEY is not configured.');
    }

    const contents = await Promise.all(
      input.messages.map(async (m: LLMMessage) => {
        const role = m.role === 'assistant' ? 'model' : 'user';
        if (typeof m.content === 'string') {
          return { role, parts: [{ text: m.content }] };
        }
        const parts = await Promise.all(
          m.content.map(async (part) => {
            if (part.type === 'text' && part.text) return { text: part.text };
            if (part.type === 'image_url' && part.image_url) {
              const url = part.image_url.url;
              if (url.startsWith('data:')) {
                const [header, base64Data] = url.split(';base64,');
                const mimeType = header.replace('data:', '');
                return {
                  inlineData: {
                    mimeType,
                    data: base64Data,
                  },
                };
              }
              if (url.startsWith('http://') || url.startsWith('https://')) {
                try {
                  const imgRes = await fetch(url);
                  const arrayBuffer = await imgRes.arrayBuffer();
                  const base64Data = Buffer.from(arrayBuffer).toString('base64');
                  const mimeType = imgRes.headers.get('content-type') || 'image/jpeg';
                  return {
                    inlineData: {
                      mimeType,
                      data: base64Data,
                    },
                  };
                } catch {
                  return { text: `[Image reference: ${url}]` };
                }
              }
              if (url.startsWith('/')) {
                return { text: `[Local image reference: ${url}]` };
              }
              if (url.startsWith('http')) {
                try {
                  const res = await fetch(url);
                  const arrayBuffer = await res.arrayBuffer();
                  const buf = Buffer.from(arrayBuffer);
                  const mimeType = res.headers.get('content-type') || 'image/jpeg';
                  return {
                    inlineData: {
                      mimeType,
                      data: buf.toString('base64'),
                    },
                  };
                } catch (err) {
                  console.error('Failed to fetch remote image for Gemini:', url, err);
                  return { text: `[Image reference: ${url}]` };
                }
              }
              return { text: `[Image reference: ${url}]` };
            }
            return { text: '' };
          })
        );
        return { role, parts };
      })
    );

    const body: Record<string, unknown> = {
      contents,
      generationConfig: {
        temperature: input.temperature ?? 0.4,
        maxOutputTokens: input.maxTokens ?? 4096,
      },
    };

    if (input.systemPrompt) {
      body.systemInstruction = {
        parts: [{ text: input.systemPrompt }],
      };
    }

    const candidateModels = Array.from(new Set([
      this.model,
      'gemini-3.5-flash',
      'gemini-3.6-flash',
      'gemini-3.5-flash-lite',
    ]));

    let lastError: Error | null = null;

    for (const modelToTry of candidateModels) {
      try {
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${modelToTry}:generateContent?key=${this.apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
          }
        );

        if (!res.ok) {
          const errText = await res.text();
          // If 503 (high demand) or 429 (quota), try next model
          if (res.status === 503 || res.status === 429) {
            console.warn(`Gemini model ${modelToTry} returned ${res.status}, trying next fallback model...`);
            lastError = new Error(`Gemini LLM API error [${res.status}]: ${errText}`);
            continue;
          }
          throw new Error(`Gemini LLM API error [${res.status}]: ${errText}`);
        }

        const data = await res.json();
        const candidate = data.candidates?.[0];
        const text = candidate?.content?.parts?.map((p: { text?: string }) => p.text || '').join('') || '';

        return {
          text,
          provider: `${this.name} (${modelToTry})`,
          tokensUsed: {
            prompt: data.usageMetadata?.promptTokenCount || 0,
            completion: data.usageMetadata?.candidatesTokenCount || 0,
            total: data.usageMetadata?.totalTokenCount || 0,
          },
          rawResponse: data,
        };
      } catch (err: any) {
        if (err.message?.includes('503') || err.message?.includes('429')) {
          lastError = err;
          continue;
        }
        throw err;
      }
    }

    throw lastError || new Error('All Gemini model fallbacks failed.');
  }
}
