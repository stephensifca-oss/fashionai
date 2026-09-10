"use server";

import { z } from "zod";
import { parsePhoneNumberWithError } from "libphonenumber-js";

function detectSocialPlatform(url?: string): "instagram" | "facebook" | "tiktok" | "site" | "autre" {
  if (!url) return "autre";
  const lower = url.toLowerCase();
  if (lower.includes("instagram.com") || lower.includes("instagr.am")) return "instagram";
  if (lower.includes("facebook.com") || lower.includes("fb.com") || lower.includes("fb.watch")) return "facebook";
  if (lower.includes("tiktok.com")) return "tiktok";
  if (lower.startsWith("http://") || lower.startsWith("https://") || lower.includes(".")) return "site";
  return "autre";
}

function generateWaCode(): string {
  const chars = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ"; // exclude easily confused chars (0, 1, I, O)
  let code = "";
  for (let i = 0; i < 5; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

const LeadSchema = z
  .object({
    prenom: z.string().trim().min(2, "Le prénom doit comporter au moins 2 caractères"),
    whatsapp: z.string().trim().refine((val) => {
      try {
        const phoneNumber = parsePhoneNumberWithError(val);
        return phoneNumber.isValid();
      } catch {
        return false;
      }
    }, "Numéro WhatsApp invalide. N'oubliez pas l'indicatif pays (ex: +225...)"),
    email: z.string().trim().email("Email invalide").optional().or(z.literal("")),
    social_url: z.string().trim().optional().or(z.literal("")),
    has_no_social: z.boolean().default(false),
    slug: z.string(),
  })
  .superRefine((data, ctx) => {
    if (!data.has_no_social) {
      if (!data.social_url || data.social_url.trim().length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Veuillez renseigner le lien de votre boutique/page ou cocher la case ci-dessous.",
          path: ["social_url"],
        });
      }
    }
  });

export async function submitLead(formData: FormData) {
  try {
    const rawHasNoSocial = formData.get("has_no_social");
    const hasNoSocial = rawHasNoSocial === "on" || rawHasNoSocial === "true" || rawHasNoSocial === "1";

    let whatsapp = (formData.get("whatsapp") as string) || "";
    const countryCode = (formData.get("country_code") as string) || "";
    const phoneNumber = (formData.get("phone_number") as string) || "";

    if (!whatsapp && phoneNumber) {
      const cleanPhone = phoneNumber.trim();
      if (cleanPhone.startsWith("+")) {
        whatsapp = cleanPhone;
      } else if (countryCode && countryCode !== "+") {
        whatsapp = `${countryCode}${cleanPhone}`;
      } else {
        whatsapp = cleanPhone;
      }
    }

    const data = {
      prenom: (formData.get("prenom") as string) || "",
      whatsapp: whatsapp.trim(),
      email: (formData.get("email") as string) || "",
      social_url: (formData.get("social_url") as string) || "",
      has_no_social: hasNoSocial,
      slug: (formData.get("slug") as string) || "studio-shooting-mode",
    };

    const validatedData = LeadSchema.parse(data);

    // Format phone number to E.164
    const formattedPhone = parsePhoneNumberWithError(validatedData.whatsapp).format("E.164");
    const socialPlatform = detectSocialPlatform(validatedData.social_url);
    const waCode = generateWaCode();

    console.log("Lead captured:", {
      prenom: validatedData.prenom,
      whatsapp: formattedPhone,
      email: validatedData.email || null,
      social_url: validatedData.social_url || null,
      social_platform: socialPlatform,
      has_no_social: validatedData.has_no_social ? 1 : 0,
      wa_code: waCode,
      slug: validatedData.slug,
    });

    // Generate a secure token
    const secureToken = "token-" + Buffer.from(`${Date.now()}-${waCode}`).toString("base64url");
    const platform = ((formData.get("platform") as string) || "google") as "google" | "chatgpt" | "autres";

    // Persist to leads store
    try {
      const { saveLead } = await import("@/lib/leads-store");
      saveLead({
        prenom: validatedData.prenom,
        whatsapp: formattedPhone,
        country_code: countryCode || "CI",
        dial_code: countryCode || "+225",
        phone_number: phoneNumber || validatedData.whatsapp,
        email: validatedData.email || null,
        social_url: validatedData.social_url || null,
        social_platform: socialPlatform,
        has_no_social: validatedData.has_no_social,
        platform: platform,
        wa_code: waCode,
        token: secureToken,
        slug: validatedData.slug,
      });
    } catch (saveErr) {
      console.error("Error saving lead to store:", saveErr);
    }

    return { 
      success: true, 
      token: secureToken,
      code: waCode,
      prenom: validatedData.prenom,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0]?.message || "Erreur de validation des champs." };
    }
    return { success: false, error: "Une erreur est survenue lors de l'enregistrement." };
  }
}
