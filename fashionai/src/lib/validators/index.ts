import { llm } from '@/lib/providers';

export interface InversionValidationResult {
  valid: boolean;
  violations: string[];
  suggestedAction?: 'retry_llm' | 'proceed';
}

export interface ContaminationValidationResult {
  valid: boolean;
  mismatches: {
    blockName: string;
    expected: string;
    actual: string;
  }[];
}

/**
 * Validateur d'inversion (Requirement A0-8) :
 * Vérifie qu'aucun terme décrivant un élément clé du vêtement (triptyque)
 * ne se retrouve banni dans le negative prompt du plan maître.
 */
export function validateInversion(
  masterNegativePrompt: string,
  garmentKeywords: string[]
): InversionValidationResult {
  const violations: string[] = [];
  const normalizedNegative = masterNegativePrompt.toLowerCase();

  for (const keyword of garmentKeywords) {
    const cleanKeyword = keyword.trim().toLowerCase();
    if (cleanKeyword.length > 2 && normalizedNegative.includes(cleanKeyword)) {
      violations.push(cleanKeyword);
    }
  }

  return {
    valid: violations.length === 0,
    violations,
    suggestedAction: violations.length > 0 ? 'retry_llm' : 'proceed',
  };
}

/**
 * Validateur de contamination (Requirement A0-9) :
 * Vérifie que les blocs fondamentaux (environment, lighting, grading, palette)
 * des vues dérivées (profil 3/4 et dos) restent strictement cohérents avec le plan maître.
 */
export function validateContamination(
  masterPromptBlocks: Record<string, string>,
  viewPromptBlocks: Record<string, string>,
  criticalBlocks: string[] = ['environment', 'lighting', 'grading', 'palette']
): ContaminationValidationResult {
  const mismatches: { blockName: string; expected: string; actual: string }[] = [];

  for (const block of criticalBlocks) {
    const masterVal = masterPromptBlocks[block]?.trim() || '';
    const viewVal = viewPromptBlocks[block]?.trim() || '';

    // If master had this block defined but view completely changed or corrupted it
    if (masterVal && viewVal && masterVal.toLowerCase() !== viewVal.toLowerCase()) {
      mismatches.push({
        blockName: block,
        expected: masterVal,
        actual: viewVal,
      });
    }
  }

  return {
    valid: mismatches.length === 0,
    mismatches,
  };
}

export interface MannequinConformityResult {
  valid: boolean;
  mismatches: string[];
  confidence: 'low' | 'medium' | 'high';
  suggestedAction: 'retry_llm' | 'proceed';
}

const MANNEQUIN_CONFORMITY_SYSTEM_PROMPT = `Tu es un contrôleur qualité pour un studio de mode IA. Tu compares une image de RÉFÉRENCE D'IDENTITÉ (@perso — le mannequin signature du studio) à une PHOTO GÉNÉRÉE (le plan maître produit par le pipeline), afin de vérifier que le mannequin de la photo générée est bien la MÊME PERSONNE que la référence.

Compare strictement sur ces 4 axes, dans cet ordre :
1. Structure faciale (forme du visage, mâchoire, nez, yeux, sourcils, lèvres)
2. Carnation (teinte de peau, sous-ton, profondeur)
3. Chevelure (coupe, longueur, raie, couleur/mèches)
4. Morphologie corporelle visible (silhouette, proportions)

Un écart mineur de maquillage, d'éclairage, d'expression ou d'angle de prise de vue n'est PAS une non-conformité — seule une dérive d'identité (une personne qui semble différente de la référence) l'est.

Réponds UNIQUEMENT avec un objet JSON strict, sans texte autour, sans balise markdown :
{"valid": boolean, "mismatches": string[], "confidence": "low"|"medium"|"high"}

"mismatches" liste en français, un élément court par axe en écart (tableau vide si valid=true). "confidence" reflète ta certitude visuelle (qualité, cadrage et angle des deux images comparées).`;

function parseConformityJson(raw: string): { valid?: unknown; mismatches?: unknown; confidence?: unknown } | null {
  const cleaned = raw.trim().replace(/^```(?:json)?/i, '').replace(/```$/, '').trim();
  const start = cleaned.indexOf('{');
  const end = cleaned.lastIndexOf('}');
  if (start === -1 || end === -1 || end < start) return null;
  try {
    return JSON.parse(cleaned.slice(start, end + 1));
  } catch {
    return null;
  }
}

/**
 * Validateur de conformité mannequin :
 * Vérifie, via une passe LLM vision, que le sujet du plan maître généré est bien
 * la même personne que la référence d'identité (@perso — character_sheet ou thumbnail
 * du mannequin sélectionné), sur 4 axes : structure faciale, carnation, chevelure, morphologie.
 *
 * Fail-open par conception : une erreur d'appel ou une réponse non parsable ne bloque
 * jamais la livraison du shoot — elle est seulement signalée comme non vérifiée
 * (confidence: 'low'), au même titre que les autres validateurs de ce module qui n'ont
 * jamais autorité pour interrompre le pipeline, seulement pour déclencher un avertissement
 * ou une tentative de correction côté appelant.
 */
export async function validateMannequinConformity(params: {
  referenceImageUrl: string;
  generatedImageUrl: string;
  modelName?: string;
}): Promise<MannequinConformityResult> {
  const { referenceImageUrl, generatedImageUrl, modelName } = params;

  try {
    const res = await llm({
      systemPrompt: MANNEQUIN_CONFORMITY_SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: `Mannequin attendu : ${modelName || 'référence @perso'}.` },
            { type: 'text', text: '\n[RÉFÉRENCE @perso]\n' },
            { type: 'image_url', image_url: { url: referenceImageUrl } },
            { type: 'text', text: '\n[PHOTO GÉNÉRÉE — plan maître]\n' },
            { type: 'image_url', image_url: { url: generatedImageUrl } },
          ],
        },
      ],
      temperature: 0,
    });

    const parsed = parseConformityJson(res.text);
    if (!parsed) {
      return { valid: true, mismatches: [], confidence: 'low', suggestedAction: 'proceed' };
    }

    const mismatches = Array.isArray(parsed.mismatches)
      ? parsed.mismatches.filter((m: unknown): m is string => typeof m === 'string')
      : [];
    const valid = typeof parsed.valid === 'boolean' ? parsed.valid : mismatches.length === 0;
    const confidence: MannequinConformityResult['confidence'] =
      parsed.confidence === 'high' || parsed.confidence === 'low' ? parsed.confidence : 'medium';

    return {
      valid,
      mismatches,
      confidence,
      suggestedAction: valid ? 'proceed' : 'retry_llm',
    };
  } catch {
    return { valid: true, mismatches: [], confidence: 'low', suggestedAction: 'proceed' };
  }
}
