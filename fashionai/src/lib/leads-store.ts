export interface LeadRecord {
  id: string;
  prenom: string;
  whatsapp: string; // Formatted E.164
  country_code: string;
  dial_code: string;
  phone_number: string;
  email: string | null;
  social_url: string | null;
  social_platform: "instagram" | "facebook" | "tiktok" | "site" | "autre";
  has_no_social: boolean;
  platform: "google" | "chatgpt" | "autres";
  wa_code: string;
  token: string;
  slug: string;
  status: "nouveau" | "contacte" | "audit_reserve" | "converti" | "archive";
  notes: string;
  downloads_count: number;
  created_at: string;
  updated_at: string;
}

let inMemoryLeads: LeadRecord[] | null = null;

// Sample initial leads for demo/testing if file does not exist
const INITIAL_DEMO_LEADS: LeadRecord[] = [
  {
    id: "lead-demo-1",
    prenom: "Fatou",
    whatsapp: "+2250708091011",
    country_code: "CI",
    dial_code: "+225",
    phone_number: "07 08 09 10 11",
    email: "fatou.kouame@waxstudio.ci",
    social_url: "instagram.com/waxstudio_abidjan",
    social_platform: "instagram",
    has_no_social: false,
    platform: "google",
    wa_code: "FW78K",
    token: "token-demo-fatou-1",
    slug: "studio-shooting-mode",
    status: "audit_reserve",
    notes: "Créatrice de mode à Abidjan. Recherche 40 visuels pour sa collection capsule d’automne.",
    downloads_count: 2,
    created_at: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    updated_at: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  },
  {
    id: "lead-demo-2",
    prenom: "Awa",
    whatsapp: "+221771234567",
    country_code: "SN",
    dial_code: "+221",
    phone_number: "77 123 45 67",
    email: "awa.diop@dakar-elegance.com",
    social_url: "dakar-elegance.com",
    social_platform: "site",
    has_no_social: false,
    platform: "chatgpt",
    wa_code: "AW92M",
    token: "token-demo-awa-2",
    slug: "studio-shooting-mode",
    status: "contacte",
    notes: "E-commerçante mode féminine à Dakar. Intéressée par le plan maître et la série 3 vues.",
    downloads_count: 1,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: "lead-demo-3",
    prenom: "Yann",
    whatsapp: "+33612345678",
    country_code: "FR",
    dial_code: "+33",
    phone_number: "06 12 34 56 78",
    email: "yann.moreau@studio-paris.fr",
    social_url: "instagram.com/yann_fashion_photo",
    social_platform: "instagram",
    has_no_social: false,
    platform: "autres",
    wa_code: "YN44P",
    token: "token-demo-yann-3",
    slug: "studio-shooting-mode",
    status: "nouveau",
    notes: "Photographe de studio à Paris. Teste l’édition Midjourney / Flux.",
    downloads_count: 3,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
  },
  {
    id: "lead-demo-4",
    prenom: "Éric",
    whatsapp: "+237690112233",
    country_code: "CM",
    dial_code: "+237",
    phone_number: "6 90 11 22 33",
    email: null,
    social_url: null,
    social_platform: "autre",
    has_no_social: true,
    platform: "google",
    wa_code: "ER55X",
    token: "token-demo-eric-4",
    slug: "studio-shooting-mode",
    status: "nouveau",
    notes: "Lancement de marque street-wear prévu dans 2 mois.",
    downloads_count: 1,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  }
];

function getFs() {
  try {
    return {
      fs: require("fs"),
      path: require("path"),
    };
  } catch {
    return null;
  }
}

function ensureDataFile() {
  const node = getFs();
  if (!node) return;
  try {
    const dataDir = node.path.join(process.cwd(), ".data");
    const leadsFile = node.path.join(dataDir, "leads.json");
    if (!node.fs.existsSync(dataDir)) {
      node.fs.mkdirSync(dataDir, { recursive: true });
    }
    if (!node.fs.existsSync(leadsFile)) {
      node.fs.writeFileSync(leadsFile, JSON.stringify(INITIAL_DEMO_LEADS, null, 2), "utf-8");
    }
  } catch {
    // ignore in serverless
  }
}

export function getAllLeads(): LeadRecord[] {
  if (inMemoryLeads) return inMemoryLeads;
  const node = getFs();
  if (node) {
    try {
      ensureDataFile();
      const leadsFile = node.path.join(process.cwd(), ".data", "leads.json");
      if (node.fs.existsSync(leadsFile)) {
        const data = node.fs.readFileSync(leadsFile, "utf-8");
        inMemoryLeads = JSON.parse(data || "[]");
        return (inMemoryLeads || []).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      }
    } catch {
      // ignore
    }
  }
  inMemoryLeads = [...INITIAL_DEMO_LEADS];
  return inMemoryLeads;
}

export function saveLead(leadData: Omit<LeadRecord, "id" | "created_at" | "updated_at" | "status" | "notes" | "downloads_count">): LeadRecord {
  const leads = getAllLeads();
  const now = new Date().toISOString();
  
  const existingIndex = leads.findIndex((l) => l.whatsapp === leadData.whatsapp);
  
  const newLead: LeadRecord = {
    ...leadData,
    id: existingIndex >= 0 ? leads[existingIndex].id : `lead-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    status: existingIndex >= 0 ? leads[existingIndex].status : "nouveau",
    notes: existingIndex >= 0 ? leads[existingIndex].notes : "",
    downloads_count: existingIndex >= 0 ? leads[existingIndex].downloads_count : 0,
    created_at: existingIndex >= 0 ? leads[existingIndex].created_at : now,
    updated_at: now,
  };

  if (existingIndex >= 0) {
    leads[existingIndex] = newLead;
  } else {
    leads.unshift(newLead);
  }
  inMemoryLeads = leads;

  const node = getFs();
  if (node) {
    try {
      const leadsFile = node.path.join(process.cwd(), ".data", "leads.json");
      node.fs.writeFileSync(leadsFile, JSON.stringify(leads, null, 2), "utf-8");
    } catch {
      // ignore
    }
  }

  return newLead;
}

export function updateLeadStatus(id: string, status: LeadRecord["status"], notes?: string): LeadRecord | null {
  const leads = getAllLeads();
  const index = leads.findIndex((l) => l.id === id);
  if (index === -1) return null;

  leads[index].status = status;
  if (notes !== undefined) {
    leads[index].notes = notes;
  }
  leads[index].updated_at = new Date().toISOString();
  inMemoryLeads = leads;

  const node = getFs();
  if (node) {
    try {
      const leadsFile = node.path.join(process.cwd(), ".data", "leads.json");
      node.fs.writeFileSync(leadsFile, JSON.stringify(leads, null, 2), "utf-8");
    } catch {
      // ignore
    }
  }

  return leads[index];
}

export function incrementLeadDownloads(token: string): void {
  const leads = getAllLeads();
  const index = leads.findIndex((l) => l.token === token);
  if (index !== -1) {
    leads[index].downloads_count = (leads[index].downloads_count || 0) + 1;
    leads[index].updated_at = new Date().toISOString();
    inMemoryLeads = leads;
    const node = getFs();
    if (node) {
      try {
        const leadsFile = node.path.join(process.cwd(), ".data", "leads.json");
        node.fs.writeFileSync(leadsFile, JSON.stringify(leads, null, 2), "utf-8");
      } catch {
        // ignore
      }
    }
  }
}

export function deleteLead(id: string): boolean {
  const leads = getAllLeads();
  const filtered = leads.filter((l) => l.id !== id);
  inMemoryLeads = filtered;
  const node = getFs();
  if (node) {
    try {
      const leadsFile = node.path.join(process.cwd(), ".data", "leads.json");
      node.fs.writeFileSync(leadsFile, JSON.stringify(filtered, null, 2), "utf-8");
    } catch {
      // ignore
    }
  }
  return true;
}
