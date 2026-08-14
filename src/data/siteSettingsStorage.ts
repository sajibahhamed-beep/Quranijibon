import defaultSettingsData from "./siteSettings.json";
import { getSupabaseClient, getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";

export interface SocialLinkItem {
  id: string;
  platform: string;
  label: string;
  url: string;
  active: boolean;
}

export interface FooterLinkItem {
  id: string;
  label: string;
  url: string;
}

export interface SiteSettings {
  whatsappNumber: string;
  whatsappDisplayText: string;
  phone1: string;
  phone2: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  copyrightText: string;
  socialLinks: SocialLinkItem[];
  footerMenuLinks: FooterLinkItem[];
  footerPolicyLinks: FooterLinkItem[];
}

export function getSiteSettings(): SiteSettings {
  return defaultSettingsData as unknown as SiteSettings;
}

export async function getSiteSettingsAsync(): Promise<SiteSettings> {
  if (isSupabaseConfigured) {
    try {
      const supabase = getSupabaseClient();
      if (supabase) {
        const { data, error } = await supabase.from("site_settings").select("settings").eq("id", 1).single();
        if (!error && data && data.settings) {
          return data.settings as SiteSettings;
        }
      }
    } catch (e) {
      console.warn("Supabase site settings fetch error:", e);
    }
  }

  return getSiteSettings();
}

export async function saveSiteSettingsAsync(settings: SiteSettings): Promise<boolean> {
  if (isSupabaseConfigured) {
    try {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        const { error } = await supabase.from("site_settings").upsert(
          [{ id: 1, settings, updated_at: new Date().toISOString() }],
          { onConflict: "id" }
        );
        if (!error) return true;
        console.error("Supabase save site settings error:", error.message);
      }
    } catch (e) {
      console.warn("Supabase save site settings exception:", e);
    }
  }

  return true;
}
