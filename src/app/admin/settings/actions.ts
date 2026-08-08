"use server";

import fs from "fs";
import path from "path";
import { SiteSettings, getSiteSettings } from "@/data/siteSettingsStorage";
import { revalidatePath } from "next/cache";

const SETTINGS_FILE_PATH = path.join(process.cwd(), "src", "data", "siteSettings.json");

export async function fetchSiteSettings(): Promise<SiteSettings> {
  try {
    if (fs.existsSync(SETTINGS_FILE_PATH)) {
      const data = fs.readFileSync(SETTINGS_FILE_PATH, "utf-8");
      return JSON.parse(data);
    }
  } catch (err) {
    console.error("Error reading site settings:", err);
  }
  return getSiteSettings();
}

export async function updateAllSiteSettings(settings: SiteSettings): Promise<{ success: boolean }> {
  try {
    fs.writeFileSync(SETTINGS_FILE_PATH, JSON.stringify(settings, null, 2), "utf-8");
    revalidatePath("/", "layout");
    revalidatePath("/contact");
    revalidatePath("/about");
    revalidatePath("/donate");
    revalidatePath("/admin/settings");
    return { success: true };
  } catch (error) {
    console.error("Error writing site settings:", error);
    return { success: false };
  }
}
