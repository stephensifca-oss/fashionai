"use server";

import { getAllLeads, updateLeadStatus, deleteLead } from "@/lib/leads-store";
import type { LeadRecord } from "@/lib/leads-store";
import { revalidatePath } from "next/cache";
import { requireAuthPage } from "@/lib/auth";

export async function getLeadsAction(): Promise<{ success: boolean; leads: LeadRecord[] }> {
  try {
    if (!(await requireAuthPage())) throw new Error("Non autorisé");
    const leads = await getAllLeads();
    return { success: true, leads };
  } catch (err: unknown) {
    console.error("Error fetching leads:", err);
    return { success: false, leads: [] };
  }
}

export async function updateLeadStatusAction(
  id: string,
  status: string,
  notes?: string
): Promise<{ success: boolean; lead?: LeadRecord; error?: string }> {
  try {
    if (!(await requireAuthPage())) throw new Error("Non autorisé");
    const updated = await updateLeadStatus(id, status, notes);
    if (!updated) {
      return { success: false, error: "Lead introuvable" };
    }
    revalidatePath("/admin/leads");
    return { success: true, lead: updated };
  } catch (err) {
    console.error("Error updating lead:", err);
    return { success: false };
  }
}

export async function deleteLeadAction(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    if (!(await requireAuthPage())) throw new Error("Non autorisé");
    const success = await deleteLead(id);
    if (!success) {
      return { success: false, error: "Erreur suppression" };
    }
    revalidatePath("/admin/leads");
    return { success: true };
  } catch (err) {
    console.error("Error deleting lead:", err);
    return { success: false };
  }
}
