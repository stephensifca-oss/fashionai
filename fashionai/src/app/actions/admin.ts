"use server";

import { getAllLeads, updateLeadStatus, deleteLead, LeadRecord } from "@/lib/leads-store";
import { revalidatePath } from "next/cache";

export async function getLeadsAction(): Promise<{ success: boolean; leads: LeadRecord[] }> {
  try {
    const leads = getAllLeads();
    return { success: true, leads };
  } catch (err: unknown) {
    console.error("Error fetching leads:", err);
    return { success: false, leads: [] };
  }
}

export async function updateLeadStatusAction(
  id: string,
  status: LeadRecord["status"],
  notes?: string
): Promise<{ success: boolean; lead?: LeadRecord; error?: string }> {
  try {
    const updated = updateLeadStatus(id, status, notes);
    if (!updated) {
      return { success: false, error: "Lead introuvable" };
    }
    revalidatePath("/admin/leads");
    return { success: true, lead: updated };
  } catch (err: unknown) {
    return { success: false, error: err instanceof Error ? err.message : "Erreur mise à jour" };
  }
}

export async function deleteLeadAction(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const success = deleteLead(id);
    if (!success) {
      return { success: false, error: "Erreur suppression" };
    }
    revalidatePath("/admin/leads");
    return { success: true };
  } catch (err: unknown) {
    return { success: false, error: err instanceof Error ? err.message : "Erreur suppression" };
  }
}
