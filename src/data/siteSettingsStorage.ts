import defaultSettingsData from "./siteSettings.json";

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
