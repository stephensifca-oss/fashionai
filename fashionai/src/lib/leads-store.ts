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

import { getRequestContext } from "@cloudflare/next-on-pages";

// Helper to get D1 DB safely in edge environment
async function getDB() {
  try {
    const env = getRequestContext().env;
    if (env && env.DB) {
      return env.DB;
    }
    throw new Error("No DB binding found in getRequestContext().env");
  } catch (err) {
    if (process.env.DB) {
      return process.env.DB as any;
    }
    throw new Error("D1 Database non disponible. Le binding 'DB' est manquant.");
  }
}

export async function getAllLeads(): Promise<LeadRecord[]> {
  const db = await getDB();
  const { results } = await db.prepare("SELECT * FROM leads ORDER BY created_at DESC").all();
  return results.map(rowToLeadRecord);
}

export async function saveLead(leadData: Omit<LeadRecord, "id" | "created_at" | "updated_at" | "status" | "notes" | "downloads_count">): Promise<LeadRecord> {
  const db = await getDB();
  const now = new Date().toISOString();
  
  // Check if existing
  const existing = await db.prepare("SELECT id FROM leads WHERE whatsapp = ?").bind(leadData.whatsapp).first();
  
  let id = existing ? (existing.id as string) : `lead-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  let status = "nouveau";
  let notes = "";
  let downloads_count = 0;
  let created_at = now;

  if (existing) {
    // get existing to preserve some fields
    const { results } = await db.prepare("SELECT status, notes, downloads_count, created_at FROM leads WHERE id = ?").bind(id).all();
    if (results.length > 0) {
      status = results[0].status as string || "nouveau";
      notes = results[0].notes as string || "";
      downloads_count = results[0].downloads_count as number || 0;
      created_at = results[0].created_at as string || now;
    }
    
    // Update
    await db.prepare(`
      UPDATE leads SET 
        prenom = ?, country_code = ?, dial_code = ?, phone_number = ?, 
        email = ?, social_url = ?, social_platform = ?, has_no_social = ?, 
        platform = ?, wa_code = ?, token = ?, slug = ?, updated_at = ?
      WHERE id = ?
    `).bind(
      leadData.prenom, leadData.country_code, leadData.dial_code, leadData.phone_number,
      leadData.email, leadData.social_url, leadData.social_platform, leadData.has_no_social ? 1 : 0,
      leadData.platform, leadData.wa_code, leadData.token, leadData.slug, now,
      id
    ).run();
  } else {
    // Insert
    await db.prepare(`
      INSERT INTO leads (
        id, prenom, whatsapp, country_code, dial_code, phone_number, 
        email, social_url, social_platform, has_no_social, 
        platform, wa_code, token, slug, status, notes, downloads_count, 
        created_at, updated_at
      ) VALUES (
        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
      )
    `).bind(
      id, leadData.prenom, leadData.whatsapp, leadData.country_code, leadData.dial_code, leadData.phone_number,
      leadData.email, leadData.social_url, leadData.social_platform, leadData.has_no_social ? 1 : 0,
      leadData.platform, leadData.wa_code, leadData.token, leadData.slug, status, notes, downloads_count,
      created_at, now
    ).run();
  }

  return {
    ...leadData,
    id,
    status: status as any,
    notes,
    downloads_count,
    created_at,
    updated_at: now
  };
}

export async function updateLeadStatus(id: string, status: LeadRecord["status"], notes?: string): Promise<LeadRecord | null> {
  const db = await getDB();
  const now = new Date().toISOString();
  
  if (notes !== undefined) {
    await db.prepare("UPDATE leads SET status = ?, notes = ?, updated_at = ? WHERE id = ?")
      .bind(status, notes, now, id).run();
  } else {
    await db.prepare("UPDATE leads SET status = ?, updated_at = ? WHERE id = ?")
      .bind(status, now, id).run();
  }

  const { results } = await db.prepare("SELECT * FROM leads WHERE id = ?").bind(id).all();
  if (results.length === 0) return null;
  return rowToLeadRecord(results[0]);
}

export async function incrementLeadDownloads(token: string): Promise<void> {
  const db = await getDB();
  const now = new Date().toISOString();
  await db.prepare("UPDATE leads SET downloads_count = downloads_count + 1, updated_at = ? WHERE token = ?")
    .bind(now, token).run();
}

export async function deleteLead(id: string): Promise<boolean> {
  const db = await getDB();
  await db.prepare("DELETE FROM leads WHERE id = ?").bind(id).run();
  return true;
}

// Helper to safely convert SQLite row to LeadRecord
function rowToLeadRecord(row: any): LeadRecord {
  return {
    id: row.id,
    prenom: row.prenom || row.first_name || "",
    whatsapp: row.whatsapp || "",
    country_code: row.country_code || "",
    dial_code: row.dial_code || "",
    phone_number: row.phone_number || "",
    email: row.email || null,
    social_url: row.social_url || null,
    social_platform: row.social_platform || "autre",
    has_no_social: Boolean(row.has_no_social),
    platform: row.platform || "autres",
    wa_code: row.wa_code || "",
    token: row.token || "",
    slug: row.slug || "",
    status: row.status || "nouveau",
    notes: row.notes || "",
    downloads_count: row.downloads_count || 0,
    created_at: row.created_at || "",
    updated_at: row.updated_at || ""
  };
}
