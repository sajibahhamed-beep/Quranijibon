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

export interface BankDetails {
  bankName: string;
  accountName: string;
  accountNumber: string;
  branch: string;
}

export interface MobileBankingDetails {
  bkashNumber: string;
  nagadNumber: string;
  rocketNumber?: string;
  instructions?: string;
}

export interface MobilePaymentAccount {
  id: string;
  providerName: string;
  logoType: "bkash" | "nagad" | "rocket" | "upay" | "cellfin" | "wallet" | "custom" | string;
  customLogoUrl?: string;
  number: string;
  accountType: string;
  instructions?: string;
  active: boolean;
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
  bankDetails: BankDetails;
  mobileBanking: MobileBankingDetails;
  mobilePaymentAccounts: MobilePaymentAccount[];
  socialLinks: SocialLinkItem[];
  footerMenuLinks: FooterLinkItem[];
  footerPolicyLinks: FooterLinkItem[];
}

const DEFAULT_BANK_DETAILS: BankDetails = {
  bankName: "ইসলামী ব্যাংক বাংলাদেশ লিমিটেড",
  accountName: "কুরআন জীবন একাডেমি",
  accountNumber: "২০৫০৭৭৭৮৮৮৯৯৯০০০",
  branch: "ধানমণ্ডি শাখা, ঢাকা",
};

const DEFAULT_MOBILE_BANKING: MobileBankingDetails = {
  bkashNumber: "01775551325",
  nagadNumber: "01775551325",
  instructions: "বিকাশ সেন্ড মানি / নগদ সেন্ড মানি করুন (পার্সোনাল)",
};

const DEFAULT_MOBILE_ACCOUNTS: MobilePaymentAccount[] = [
  {
    id: "1",
    providerName: "বিকাশ (bKash)",
    logoType: "bkash",
    number: "01775551325",
    accountType: "পার্সোনাল (Send Money)",
    instructions: "বিকাশ সেন্ড মানি করুন (পার্সোনাল)",
    active: true,
  },
  {
    id: "2",
    providerName: "নগদ (Nagad)",
    logoType: "nagad",
    number: "01775551325",
    accountType: "পার্সোনাল (Send Money)",
    instructions: "নগদ সেন্ড মানি করুন (পার্সোনাল)",
    active: true,
  },
];

export function getSiteSettings(): SiteSettings {
  const base = defaultSettingsData as unknown as Partial<SiteSettings>;
  return {
    ...base,
    bankDetails: base.bankDetails || DEFAULT_BANK_DETAILS,
    mobileBanking: base.mobileBanking || DEFAULT_MOBILE_BANKING,
    mobilePaymentAccounts: (base.mobilePaymentAccounts && base.mobilePaymentAccounts.length > 0)
      ? base.mobilePaymentAccounts
      : DEFAULT_MOBILE_ACCOUNTS,
  } as SiteSettings;
}

export async function getSiteSettingsAsync(): Promise<SiteSettings> {
  if (isSupabaseConfigured) {
    try {
      const supabase = getSupabaseClient();
      if (supabase) {
        const { data, error } = await supabase.from("site_settings").select("settings").eq("id", 1).single();
        if (!error && data && data.settings) {
          const s = data.settings as Partial<SiteSettings>;
          return {
            ...getSiteSettings(),
            ...s,
            bankDetails: s.bankDetails || DEFAULT_BANK_DETAILS,
            mobileBanking: s.mobileBanking || DEFAULT_MOBILE_BANKING,
            mobilePaymentAccounts: (s.mobilePaymentAccounts && s.mobilePaymentAccounts.length > 0)
              ? s.mobilePaymentAccounts
              : DEFAULT_MOBILE_ACCOUNTS,
          };
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
