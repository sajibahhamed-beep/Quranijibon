import fs from "fs/promises";
import path from "path";
import { getSupabaseClient, getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";

export interface SectionItem {
  id: string;
  label?: string;
  text: string;
}

export interface PageSection {
  id: string;
  title: string;
  iconName?: string;
  iconColorClass?: string;
  mainText?: string;
  items?: SectionItem[];
  itemStyle?: "cards" | "bullets";
  note?: string;
  noteType?: "teal" | "amber" | "rose" | "slate";
}

export interface PageData {
  id: string;
  slug: string;
  badge: string;
  title: string;
  description: string;
  sections: PageSection[];
}

const DATA_FILE_PATH = path.join(process.cwd(), "src", "data", "pages.json");

export async function getPagesData(): Promise<PageData[]> {
  if (isSupabaseConfigured) {
    try {
      const supabase = getSupabaseClient();
      if (supabase) {
        const { data: dbPages, error } = await supabase.from("pages").select("*");
        if (!error && Array.isArray(dbPages)) {
          return dbPages.map((pg) => {
            let parsedContent: Partial<PageData> = {};
            try {
              parsedContent = typeof pg.content === "string" ? JSON.parse(pg.content) : (pg.content || {});
            } catch (e) {}

            return {
              id: pg.id,
              slug: pg.slug,
              badge: parsedContent.badge || "তথ্য ও নীতিমালা",
              title: pg.title,
              description: pg.excerpt || parsedContent.description || "",
              sections: parsedContent.sections || [],
            };
          });
        }
        if (error) {
          console.warn("Supabase pages fetch error:", error.message);
        }
      }
    } catch (e) {
      console.warn("Supabase pages fetch exception:", e);
    }
  }

  try {
    const fileContent = await fs.readFile(DATA_FILE_PATH, "utf-8");
    const data = JSON.parse(fileContent) as PageData[];
    if (!Array.isArray(data)) {
      throw new Error("Invalid json format");
    }
    return data;
  } catch (error) {
    return [];
  }
}

export async function getPageById(idOrSlug: string): Promise<PageData | null> {
  if (isSupabaseConfigured) {
    try {
      const supabase = getSupabaseClient();
      if (supabase) {
        const { data, error } = await supabase
          .from("pages")
          .select("*")
          .or(`id.eq.${idOrSlug},slug.eq.${idOrSlug}`)
          .single();

        if (!error && data) {
          let parsedContent: Partial<PageData> = {};
          try {
            parsedContent = typeof data.content === "string" ? JSON.parse(data.content) : (data.content || {});
          } catch (e) {}

          return {
            id: data.id,
            slug: data.slug,
            badge: parsedContent.badge || "তথ্য ও নীতিমালা",
            title: data.title,
            description: data.excerpt || parsedContent.description || "",
            sections: parsedContent.sections || [],
          };
        }
      }
    } catch (e) {
      console.warn("Supabase single page fetch error:", e);
    }
  }

  const pages = await getPagesData();
  return pages.find((p) => p.id === idOrSlug || p.slug === idOrSlug) || null;
}

export async function updatePageData(id: string, updatedFields: Partial<PageData>): Promise<PageData | null> {
  const existingPage = await getPageById(id);
  if (!existingPage) return null;

  const updatedPage: PageData = {
    ...existingPage,
    ...updatedFields,
  };

  if (isSupabaseConfigured) {
    try {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        const { error } = await supabase.from("pages").update({
          title: updatedPage.title,
          excerpt: updatedPage.description,
          content: JSON.stringify(updatedPage),
          updated_at: new Date().toISOString(),
        }).or(`id.eq.${id},slug.eq.${id}`);

        if (!error) return updatedPage;
        console.error("Supabase update page error:", error.message);
      }
    } catch (e) {
      console.warn("Supabase update page exception:", e);
    }
  }

  const pages = await getPagesData();
  const index = pages.findIndex((p) => p.id === id || p.slug === id);
  if (index !== -1) {
    pages[index] = updatedPage;
    await savePagesData(pages);
  }

  return updatedPage;
}

export async function createPage(newPageData: Partial<PageData>): Promise<PageData> {
  const id = newPageData.id || `page-${Date.now()}`;
  const slug = newPageData.slug || id;
  
  const formattedPage: PageData = {
    id,
    slug,
    badge: newPageData.badge || "তথ্য ও নীতিমালা",
    title: newPageData.title || "নতুন পেজ",
    description: newPageData.description || "",
    sections: newPageData.sections || [
      {
        id: `sec-${Date.now()}`,
        title: "১. সূচনা ও বিবরণ",
        iconName: "FileText",
        iconColorClass: "text-[#00A89C]",
        mainText: "এখানে আপনার পেজের মূল বিবরণ লিখুন।",
        items: [],
        itemStyle: "bullets",
        note: "",
        noteType: "teal",
      },
    ],
  };

  if (isSupabaseConfigured) {
    try {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        const { error } = await supabase.from("pages").insert([{
          id: formattedPage.id,
          slug: formattedPage.slug,
          title: formattedPage.title,
          excerpt: formattedPage.description,
          content: JSON.stringify(formattedPage),
          updated_at: new Date().toISOString(),
        }]);
        if (error) {
          console.error("Supabase create page error:", error.message);
        }
      }
    } catch (e) {
      console.warn("Supabase create page exception:", e);
    }
  }

  return formattedPage;
}

export async function deletePage(id: string): Promise<boolean> {
  if (isSupabaseConfigured) {
    try {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        const { error } = await supabase.from("pages").delete().or(`id.eq.${id},slug.eq.${id}`);
        if (!error) return true;
        console.error("Supabase delete page error:", error.message);
      }
    } catch (e) {
      console.warn("Supabase delete page exception:", e);
    }
  }

  const pages = await getPagesData();
  const filtered = pages.filter((p) => p.id !== id && p.slug !== id);
  await savePagesData(filtered);
  return true;
}

export async function savePagesData(data: PageData[]): Promise<void> {
  try {
    const dir = path.dirname(DATA_FILE_PATH);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch (e) {}
}
