import fs from "fs/promises";
import path from "path";

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
  try {
    const fileContent = await fs.readFile(DATA_FILE_PATH, "utf-8");
    const data = JSON.parse(fileContent) as PageData[];
    if (!Array.isArray(data)) {
      throw new Error("Invalid json format");
    }
    return data;
  } catch (error) {
    console.error("Error reading pages.json", error);
    return [];
  }
}

export async function getPageById(idOrSlug: string): Promise<PageData | null> {
  const pages = await getPagesData();
  return pages.find((p) => p.id === idOrSlug || p.slug === idOrSlug) || null;
}

export async function updatePageData(id: string, updatedFields: Partial<PageData>): Promise<PageData | null> {
  const pages = await getPagesData();
  const index = pages.findIndex((p) => p.id === id || p.slug === id);
  
  if (index === -1) return null;

  const existingPage = pages[index];
  const updatedPage = {
    ...existingPage,
    ...updatedFields,
  };

  pages[index] = updatedPage;

  await savePagesData(pages);
  return updatedPage;
}

export async function createPage(newPageData: Partial<PageData>): Promise<PageData> {
  const pages = await getPagesData();
  
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

  pages.push(formattedPage);
  await savePagesData(pages);
  return formattedPage;
}

export async function deletePage(id: string): Promise<boolean> {
  const pages = await getPagesData();
  const filtered = pages.filter((p) => p.id !== id && p.slug !== id);
  if (filtered.length === pages.length) return false;
  await savePagesData(filtered);
  return true;
}

export async function savePagesData(data: PageData[]): Promise<void> {
  const dir = path.dirname(DATA_FILE_PATH);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(DATA_FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
}
