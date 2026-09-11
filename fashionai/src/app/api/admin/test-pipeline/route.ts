import { checkAuthAPI } from "@/lib/auth";
import { NextRequest, NextResponse } from 'next/server';
import { getAgent, AgentSlug } from '@/lib/agents/registry';
import { llm, image, LLMMessage } from '@/lib/providers';
import { validateInversion, validateContamination } from '@/lib/validators';
import { fal } from "@fal-ai/client";

export const runtime = 'edge';

const MAX_PAYLOAD_SIZE = 5 * 1024 * 1024;

export async function POST(req: NextRequest) {
  const authError = await checkAuthAPI(req);
  if (authError) return authError;

  
  try {
    const bodyText = await req.text();
    if (bodyText.length > 5 * 1024 * 1024) { // 5MB limit
      return NextResponse.json({ success: false, error: 'Payload too large' }, { status: 413 });
    }

    let body;
    try {
      body = JSON.parse(bodyText);
    } catch (e) {
      return NextResponse.json({ success: false, error: 'Invalid JSON' }, { status: 400 });
    }

    const { action } = body;

    // 1. Run LLM Agent
    if (action === 'run_agent') {
      const { agentSlug, userInput, images = [], provider } = body;
      const agent = getAgent(agentSlug as AgentSlug);

      let textContent = userInput || '';
      if (!images || images.length === 0) {
        textContent = `@precisions #2 : ${userInput}\n\nIMPORTANT : Rédige le prompt final complet et prêt à l'emploi pour ce vêtement en remplissant toutes les sections du triptyque (matière, coupe, face, dos, accessoires). Ne laisse AUCUN crochet d'exemple générique [ ... ], remplace-les tous par les détails précis et concrets de la tenue demandée.`;
      }

      const userContent: LLMMessage['content'] = [
        { type: 'text', text: textContent },
      ];

      if (images && Array.isArray(images)) {
        for (const img of images) {
          if (typeof img === 'string') {
            userContent.push({ type: 'image_url' as const, image_url: { url: img } });
          } else if (img && typeof img === 'object' && img.url) {
            if (img.tag) {
              userContent.push({ type: 'text', text: `\n[Reference Image: ${img.tag}]\n` });
            }
            userContent.push({ type: 'image_url' as const, image_url: { url: img.url } });
          }
        }
      }

      const llmRes = await llm(
        {
          systemPrompt: agent.systemPrompt,
          messages: [{ role: 'user', content: userContent }],
        },
        provider
      );

      return NextResponse.json({
        success: true,
        agentVersion: agent.version,
        result: llmRes.text,
        tokensUsed: llmRes.tokensUsed,
        provider: llmRes.provider,
      });
    }

    // 2. Generate Image
    if (action === 'generate_image') {
      const { prompt, negativePrompt, aspectRatio, seed, provider, referenceImages, images } = body;

      const refImages = referenceImages || (images && images.length ? images.map((img: any) => ({ url: typeof img === 'string' ? img : img.url })) : undefined);

      const imgRes = await image(
        {
          prompt,
          negativePrompt,
          aspectRatio: aspectRatio || '2:3',
          seed: seed ? Number(seed) : undefined,
          referenceImages: refImages,
        },
        provider
      );

      return NextResponse.json({
        success: true,
        imageUrl: imgRes.imageUrl,
        seed: imgRes.seed,
        costEstimateCents: imgRes.costEstimateCents,
        provider: imgRes.provider,
      });
    }

    // 3. Test Validators
    if (action === 'validate') {
      const { validationType, data } = body;
      if (validationType === 'inversion') {
        const res = validateInversion(data.negativePrompt, data.garmentKeywords || []);
        return NextResponse.json({ success: true, result: res });
      }
      if (validationType === 'contamination') {
        const res = validateContamination(data.masterBlocks || {}, data.viewBlocks || {});
        return NextResponse.json({ success: true, result: res });
      }
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  } catch (error: unknown) {
    console.error("Pipeline Error:", error);
    const message = error instanceof Error ? error.message : 'Unknown server error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
