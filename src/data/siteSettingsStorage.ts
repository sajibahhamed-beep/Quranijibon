import defaultSettingsData from "./siteSettings.json";
import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase";

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
