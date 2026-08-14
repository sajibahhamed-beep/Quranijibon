"use server";

import fs from "fs";
import path from "path";
import { SiteSettings, getSiteSettingsAsync, saveSiteSettingsAsync } from "@/data/siteSettingsStorage";
import { revalidatePath } from "next/cache";

const SETTINGS_FILE_PATH = path.join(process.cwd(), "src", "data", "siteSettings.json");

export async function fetchSiteSettings(): Promise<SiteSettings> {
  return await getSiteSettingsAsync();
}

export async function updateAllSiteSettings(settings: SiteSettings): Promise<{ success: boolean }> {
  try {
    await saveSiteSettingsAsync(settings);

    // Also update local file if possible
    try {
      if (fs.existsSync(SETTINGS_FILE_PATH)) {
        fs.writeFileSync(SETTINGS_FILE_PATH, JSON.stringify(settings, null, 2), "utf-8");
      }
    } catch (e) {}

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
