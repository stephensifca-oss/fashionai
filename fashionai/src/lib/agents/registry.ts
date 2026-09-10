export type AgentSlug = 'cloth' | 'swap' | 'transfert_profil' | 'transfert_dos';

export interface AgentDefinition {
  slug: AgentSlug;
  name: string;
  version: string;
  description: string;
  systemPrompt: string;
}

export const AGENT_VERSIONS: Record<AgentSlug, string> = {
  cloth: '1.0.0',
  swap: '1.0.0',
  transfert_profil: '1.0.0',
  transfert_dos: '1.0.0',
};

const AGENT_NAMES: Record<AgentSlug, string> = {
  cloth: 'Ghost Mannequin Director',
  swap: 'Studio Swap Director',
  transfert_profil: 'Transfert Vue Trois-Quarts',
  transfert_dos: 'Transfert Vue Dos',
};

const AGENT_DESCRIPTIONS: Record<AgentSlug, string> = {
  cloth: 'Analyse un vêtement et génère un prompt triptyque (mannequin stylisé + ghost face + ghost dos).',
  swap: 'Combine un template de scène, une identité mannequin et une tenue pour produire le plan maître.',
  transfert_profil: 'Transfère le plan maître en vue trois-quarts cohérente avec cadrage figé.',
  transfert_dos: 'Transfère le plan maître en vue de dos cohérente avec cadrage figé et autorité sur le panneau 3.',
};

const AGENT_PROMPTS: Record<AgentSlug, string> = {
  cloth: `Tu es un directeur artistique spécialisé en photographie produit mode, hyperréaliste. Tu combines deux techniques professionnelles dans une seule image en trois panneaux : le ghost mannequin et le mannequin stylisé. À partir d'images de vêtement, tu produis un prompt de génération d'image complet, structuré, et photoréaliste.`,
  swap: `Tu es le Directeur Artistique du Studio FashionAI. Tu combines un template de cadrage (@source), une tenue normalisée (@tenue), et une identité de mannequin (@perso) pour générer un Plan Maître photographique sans dérive de vêtement ni d'identité.`,
  transfert_profil: `Tu es le Directeur Artistique spécialisé en Continuité Spatiale 360°. À partir du Plan Maître (@modeA_Shoot), tu génères la vue Profil 3/4 avec un cadrage figé et une fidélité absolue au vêtement.`,
  transfert_dos: `Tu es le Directeur Artistique spécialisé en Continuité Spatiale 360°. À partir du Plan Maître (@modeA_Shoot) et du triptyque (@tenue), tu génères la vue de Dos épurée avec autorité sur les finitions arrière.`
};

/**
 * Loads the prompt for a given agent
 */
export function getAgentPrompt(slug: AgentSlug): string {
  return AGENT_PROMPTS[slug] || '';
}

/**
 * Returns the complete AgentDefinition including metadata and version
 */
export function getAgent(slug: AgentSlug): AgentDefinition {
  return {
    slug,
    name: AGENT_NAMES[slug],
    version: AGENT_VERSIONS[slug],
    description: AGENT_DESCRIPTIONS[slug],
    systemPrompt: getAgentPrompt(slug),
  };
}

/**
 * Returns active versions of all agents (for audit and telemetry)
 */
export function getAllAgentVersions(): Record<AgentSlug, string> {
  return { ...AGENT_VERSIONS };
}
