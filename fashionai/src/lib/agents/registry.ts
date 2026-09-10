import fs from 'fs';
import path from 'path';

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

/**
 * Loads the raw markdown prompt for a given agent
 */
export function getAgentPrompt(slug: AgentSlug): string {
  // Check in project root fashionai/agents or agents/
  const possiblePaths = [
    path.join(process.cwd(), 'agents', `${slug}.md`),
    path.join(process.cwd(), 'fashionai', 'agents', `${slug}.md`),
    path.join(__dirname, '..', '..', 'agents', `${slug}.md`),
  ];

  for (const filePath of possiblePaths) {
    if (fs.existsSync(filePath)) {
      return fs.readFileSync(filePath, 'utf-8');
    }
  }

  throw new Error(`Agent prompt markdown not found for slug: ${slug}`);
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
