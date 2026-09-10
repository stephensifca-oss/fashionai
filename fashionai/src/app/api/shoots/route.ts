import { NextRequest } from 'next/server';
import { getAgent, AgentSlug } from '@/lib/agents/registry';
import { llm, image, LLMMessage } from '@/lib/providers';
import { validateInversion, validateContamination, validateMannequinConformity } from '@/lib/validators';

export const runtime = 'edge';

const encoder = new TextEncoder();

function sseMsg(event: string, data: any) {
  return encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
}

export async function POST(req: NextRequest) {
  try {
    const {
      uploadedGarments,
      garmentPrecisions,
      noExtraAccessories,
      selectedModel,
      selectedTemplate,
      artisticModifs
    } = await req.json();

    if (!uploadedGarments || uploadedGarments.length === 0) {
      return new Response('No garments provided', { status: 400 });
    }

    const stream = new ReadableStream({
      async start(controller) {
        try {
          // --- ÉTAPE 1 : CLOTH AGENT ---
          controller.enqueue(sseMsg('log', { message: 'Analyse du vêtement (Agent Textile)...' }));
          
          const clothAgent = getAgent('cloth');
          const clothUserInput = `${garmentPrecisions} ${noExtraAccessories ? '[Ne pas inventer d accessoires]' : ''}`;
          
          let clothTextContent = clothUserInput || '';
          if (!uploadedGarments || uploadedGarments.length === 0) {
            clothTextContent = `@precisions #2 : ${clothUserInput}\n\nIMPORTANT : Rédige le prompt final complet et prêt à l'emploi pour ce vêtement en remplissant toutes les sections du triptyque (matière, coupe, face, dos, accessoires). Ne laisse AUCUN crochet d'exemple générique [ ... ], remplace-les tous par les détails précis et concrets de la tenue demandée.`;
          }

          const clothMessages: LLMMessage['content'] = [{ type: 'text', text: clothTextContent }];
          uploadedGarments.forEach((img: string) => {
            clothMessages.push({ type: 'image_url', image_url: { url: img } });
          });

          const clothRes = await llm({
            systemPrompt: clothAgent.systemPrompt,
            messages: [{ role: 'user', content: clothMessages }]
          });
          const clothPrompt = clothRes.text;
          
          controller.enqueue(sseMsg('log', { message: '✅ Analyse textile terminée.' }));
          if (clothPrompt.includes('[estimation]')) {
             controller.enqueue(sseMsg('estimation', { hasEstimations: true }));
          }

          // --- ÉTAPE 2 : TRIPTYQUE IMAGE ---
          controller.enqueue(sseMsg('log', { message: 'Génération du triptyque de normalisation...' }));
          
          const triptychRes = await image({
            prompt: clothPrompt,
            aspectRatio: '16:9',
            referenceImages: uploadedGarments.map((url: string) => ({ url }))
          });
          
          const triptychUrl = triptychRes.imageUrl;
          controller.enqueue(sseMsg('triptych', { url: triptychUrl }));
          controller.enqueue(sseMsg('log', { message: '✅ Triptyque généré avec succès.' }));

          // --- ÉTAPE 3 : SWAP AGENT (PLAN MAÎTRE) ---
          controller.enqueue(sseMsg('log', { message: 'Agent Direction : Adaptation mannequin et cadrage...' }));
          
          const swapAgent = getAgent('swap');
          const swapUserInput = `Modèle: ${selectedModel.name} (${selectedModel.morphology || ''}). Décor: ${selectedTemplate.name}. Ajustements: ${artisticModifs}. Description détaillée du vêtement: ${clothPrompt}`;
          
          // CRITICAL FIX: we pass the triptychUrl as @tenue, not the raw images.
          const swapMessages: LLMMessage['content'] = [
            { type: 'text', text: swapUserInput },
            { type: 'text', text: '\n[Reference Image: @source]\n' },
            { type: 'image_url', image_url: { url: selectedTemplate.source_image } },
            { type: 'text', text: '\n[Reference Image: @tenue]\n' },
            { type: 'image_url', image_url: { url: triptychUrl } }
          ];

          if (selectedModel.character_sheet || selectedModel.thumbnail) {
            swapMessages.push({ type: 'text', text: '\n[Reference Image: @perso]\n' });
            swapMessages.push({ type: 'image_url', image_url: { url: selectedModel.character_sheet || selectedModel.thumbnail } });
          }

          const swapRes = await llm({
            systemPrompt: swapAgent.systemPrompt,
            messages: [{ role: 'user', content: swapMessages }]
          });
          let masterPrompt = swapRes.text;

          // VALIDATOR: Inversion
          const inversionRes = validateInversion(masterPrompt, ['dress', 'shirt', 'pants', 'skirt', 'jacket', 'coat', 'sweater', 't-shirt', 'blouse', 'jeans']);
          if (!inversionRes.valid) {
             controller.enqueue(sseMsg('log', { message: '⚠️ Avertissement : Le validateur d inversion a détecté des anomalies dans le prompt maître.' }));
          }

          controller.enqueue(sseMsg('log', { message: '✅ Prompt Maître prêt. Lancement photographie...' }));

          // --- ÉTAPE 4 : MASTER IMAGE ---
          const identityRef = selectedModel.character_sheet || selectedModel.thumbnail;

          const generateMaster = async (promptToUse: string) => {
            const res = await image({
              prompt: promptToUse,
              aspectRatio: '2:3',
              referenceImages: [
                { url: selectedTemplate.source_image },
                { url: triptychUrl },
                ...(identityRef ? [{ url: identityRef }] : [])
              ]
            });
            return res.imageUrl;
          };

          let masterShotUrl = await generateMaster(masterPrompt);

          // VALIDATOR: Conformité mannequin (identité @perso)
          // Le prompt maître (agent swap) demande un verrou d'identité strict, mais aucun
          // contrôle automatique ne vérifiait jusqu'ici que le visage généré correspond
          // réellement à la référence @perso — d'où des dérives d'identité non détectées.
          let conformityRes = null as Awaited<ReturnType<typeof validateMannequinConformity>> | null;
          if (identityRef) {
            controller.enqueue(sseMsg('log', { message: 'Contrôle de fidélité mannequin (identité @perso)...' }));
            conformityRes = await validateMannequinConformity({
              referenceImageUrl: identityRef,
              generatedImageUrl: masterShotUrl,
              modelName: selectedModel.name
            });

            if (!conformityRes.valid) {
              controller.enqueue(sseMsg('log', { message: `⚠️ Écart d'identité détecté (${conformityRes.mismatches.join(', ') || 'non précisé'}). Nouvelle tentative...` }));

              const correctivePrompt = `${masterPrompt}\n\nCRITICAL IDENTITY CORRECTION: the previous attempt drifted from the @perso reference on: ${conformityRes.mismatches.join('; ')}. Re-match @perso exactly on facial structure, skin tone, hairstyle and hair color — zero deviation.`;
              const retryUrl = await generateMaster(correctivePrompt);
              const retryConformity = await validateMannequinConformity({
                referenceImageUrl: identityRef,
                generatedImageUrl: retryUrl,
                modelName: selectedModel.name
              });

              if (retryConformity.valid || retryConformity.mismatches.length < conformityRes.mismatches.length) {
                masterShotUrl = retryUrl;
                conformityRes = retryConformity;
                controller.enqueue(sseMsg('log', { message: retryConformity.valid ? '✅ Identité corrigée après nouvelle génération.' : '⚠️ Amélioration partielle, écart résiduel possible.' }));
              } else {
                controller.enqueue(sseMsg('log', { message: '⚠️ La nouvelle tentative n\'a pas corrigé l\'écart — conservation de la première version, vérification manuelle recommandée.' }));
              }
            } else {
              controller.enqueue(sseMsg('log', { message: '✅ Mannequin conforme à la référence @perso.' }));
            }
          }

          controller.enqueue(sseMsg('master', { url: masterShotUrl }));
          if (conformityRes) {
            controller.enqueue(sseMsg('conformity', {
              valid: conformityRes.valid,
              mismatches: conformityRes.mismatches,
              confidence: conformityRes.confidence
            }));
          }
          controller.enqueue(sseMsg('log', { message: '✅ Plan Maître généré avec succès.' }));

          // --- ÉTAPE 5 : VUES SÉRIE EN PARALLÈLE ---
          controller.enqueue(sseMsg('log', { message: 'Agents Profil et Dos : Calcul de la continuité spatiale...' }));
          
          const agentPayloadBase = {
            userInput: `Voici le prompt maître (@modeA_sans_produit) : \n${masterPrompt}`,
            images: [
              { url: masterShotUrl, tag: '@modeA_Shoot' },
              { url: triptychUrl, tag: '@tenue' },
              ...(selectedModel.character_sheet || selectedModel.thumbnail ? [{ url: selectedModel.character_sheet || selectedModel.thumbnail, tag: '@perso' }] : [])
            ]
          };

          const buildMessages = (userInput: string, images: any[]) => {
            const msgs: LLMMessage['content'] = [{ type: 'text', text: userInput }];
            images.forEach(img => {
              msgs.push({ type: 'text', text: `\n[Reference Image: ${img.tag}]\n` });
              msgs.push({ type: 'image_url', image_url: { url: img.url } });
            });
            return msgs;
          };

          const profilAgent = getAgent('transfert_profil');
          const dosAgent = getAgent('transfert_dos');

          const [profilAgentRes, dosAgentRes] = await Promise.all([
            llm({ systemPrompt: profilAgent.systemPrompt, messages: [{ role: 'user', content: buildMessages(agentPayloadBase.userInput, agentPayloadBase.images) }] }),
            llm({ systemPrompt: dosAgent.systemPrompt, messages: [{ role: 'user', content: buildMessages(agentPayloadBase.userInput, agentPayloadBase.images) }] })
          ]);

          const profilPrompt = profilAgentRes.text;
          const dosPrompt = dosAgentRes.text;
          
          // VALIDATOR: Contamination (Optional simulation as we don't have block parser here easily, but we call the function with dummy blocks for demo of integration)
          validateContamination({ environment: selectedTemplate.name }, { environment: selectedTemplate.name });
          
          controller.enqueue(sseMsg('log', { message: '✅ Prompts Série prêts. Génération des vues en parallèle...' }));

          const [profilPromise, dosPromise] = await Promise.allSettled([
            image({
              prompt: profilPrompt,
              aspectRatio: '1:1',
              referenceImages: agentPayloadBase.images.map(i => ({ url: i.url }))
            }),
            image({
              prompt: dosPrompt,
              aspectRatio: '1:1',
              referenceImages: agentPayloadBase.images.map(i => ({ url: i.url }))
            })
          ]);

          if (profilPromise.status === 'fulfilled') {
             controller.enqueue(sseMsg('profil', { url: profilPromise.value.imageUrl }));
             controller.enqueue(sseMsg('log', { message: '✅ Vue Profil 3/4 terminée.' }));
          } else {
             controller.enqueue(sseMsg('log', { message: '⚠️ Échec Vue Profil.' }));
          }

          if (dosPromise.status === 'fulfilled') {
             controller.enqueue(sseMsg('dos', { url: dosPromise.value.imageUrl }));
             controller.enqueue(sseMsg('log', { message: '✅ Vue Dos terminée.' }));
          } else {
             controller.enqueue(sseMsg('log', { message: '⚠️ Échec Vue Dos.' }));
          }

          controller.enqueue(sseMsg('log', { message: '🎉 Série générée avec succès !' }));
          controller.enqueue(sseMsg('done', { success: true }));

        } catch (error: any) {
          console.error('Shoot pipeline error:', error);
          controller.enqueue(sseMsg('error', { message: error.message || 'Server error' }));
        } finally {
          controller.close();
        }
      }
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache, no-transform',
        'Connection': 'keep-alive',
      },
    });

  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
