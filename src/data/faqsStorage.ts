import fs from "fs/promises";
import path from "path";
import { getSupabaseClient, getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  isActive: boolean;
}

const DATA_FILE_PATH = path.join(process.cwd(), "src", "data", "faqs.json");

const DEFAULT_FAQS: FaqItem[] = [
  {
    id: "faq-1",
    question: "কুরআন জীবন অনলাইন প্লাটফর্মে ক্লাস করার নিয়ম কি?",
    answer: "আমাদের প্ল্যাটফর্মে ক্লাস করার জন্য আপনার একটি স্মার্টফোন, tablet বা কম্পিউটার এবং ইন্টারনেট কানেকশন প্রয়োজন। Zoom বা Google Meet অ্যাপের মাধ্যমে সরাসরি লাইভ ওয়ান-টু-ওয়ান ক্লাস নেওয়া হয়।",
    category: "ক্লাস সংক্রান্ত",
    order: 1,
    isActive: true,
  },
  {
    id: "faq-2",
    question: "মহিলা শিক্ষার্থীদের কি আলাদা শিক্ষিকা দেওয়া হয়?",
    answer: "জি, আলহামদুলিল্লাহ! মহিলা এবং ছোট কন্যা শিশুদের জন্য আমাদের অভিজ্ঞ ও সার্টিফাইড মহিলা শিক্ষিকাদের আলাদা ব্যবস্থা রয়েছে। ক্লাসসমূহ সম্পূর্ণ পর্দা বজায় রেখে অনুষ্ঠিত হয়।",
    category: "শিক্ষক সংক্রান্ত",
    order: 2,
    isActive: true,
  },
  {
    id: "faq-3",
    question: "ক্লাসের সময়সূচী কীভাবে নির্ধারিত হয়?",
    answer: "শিক্ষার্থীর সুবিধাজনক সময় অনুযায়ী সকাল, দুপুর, বিকেল বা রাতের সুবিধাজনক স্লট নির্বাচন করতে পারেন। আপনি আপনার দৈনন্দিন রুটিনের সাথে মিলিয়ে ক্লাসের সময় চূড়ান্ত করবেন।",
    category: "ক্লাস সংক্রান্ত",
    order: 3,
    isActive: true,
  },
  {
    id: "faq-4",
    question: "অর্থনৈতিক সমস্যা থাকলে কি ফ্রিতে শেখার সুযোগ আছে?",
    answer: "জি! কুরআন জীবন বিশ্বাস করে অর্থকষ্টের জন্য কারো দ্বীন শেখা আটকে থাকা উচিত নয়। অসচ্ছল শিক্ষার্থীদের জন্য আমাদের স্কলারশিপ ও সম্পূর্ণ বিনামূল্যে পড়ার সুবিধা রয়েছে।",
    category: "ফি ও স্কলারশিপ",
    order: 4,
    isActive: true,
  },
  {
    id: "faq-5",
    question: "একেবারে শুরু থেকে বা কায়দা থেকে কি পড়া শুরু করা যাবে?",
    answer: "অবশ্যই! আমাদের কোর্সে একদম প্রাথমিক বর্ণমালা (নূরানী কায়দা) থেকে শুরু করে নাজেরা, তাজবীদ সহ কুরআন তিলাওয়াত এবং হিফজ বিভাগ পর্যন্ত সকল লেভেলের কোর্স রয়েছে।",
    category: "কোর্স সংক্রান্ত",
    order: 5,
    isActive: true,
  },
  {
    id: "faq-6",
    question: "ভর্তি হওয়ার আগে কি ট্রায়াল ক্লাস নেওয়া সম্ভব?",
    answer: "জি, আপনি ভর্তি হওয়ার আগে ১টি ফ্রি ট্রায়াল ক্লাসে অংশ নিয়ে আমাদের পড়াশোনার পদ্ধতি ও শিক্ষকের সাথে পরিচিত হতে পারবেন।",
    category: "ভর্তি সংক্রান্ত",
    order: 6,
    isActive: true,
  },
];

export async function getFaqsData(): Promise<FaqItem[]> {
  if (isSupabaseConfigured) {
    try {
      const supabase = getSupabaseClient();
      if (supabase) {
        const { data: dbFaqs, error } = await supabase
          .from("faqs")
          .select("*")
          .order("sort_order", { ascending: true });

        if (!error && Array.isArray(dbFaqs)) {
          return dbFaqs.map((f) => ({
            id: f.id,
            question: f.question,
            answer: f.answer,
            category: "সাধারণ",
            order: f.sort_order || 0,
            isActive: f.is_active !== false,
          }));
        }
        if (error) {
          console.warn("Supabase FAQs fetch error:", error.message);
        }
      }
    } catch (e) {
      console.warn("Supabase FAQs fetch exception:", e);
    }
  }

  try {
    const fileContent = await fs.readFile(DATA_FILE_PATH, "utf-8");
    const data = JSON.parse(fileContent) as FaqItem[];
    if (!Array.isArray(data)) {
      throw new Error("Invalid json format");
    }
    return data.sort((a, b) => a.order - b.order);
  } catch (error) {
    return DEFAULT_FAQS;
  }
}

export async function saveFaqsData(faqs: FaqItem[]): Promise<void> {
  try {
    const dir = path.dirname(DATA_FILE_PATH);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(faqs, null, 2), "utf-8");
  } catch (e) {}
}

export async function createFaqItem(faqData: Partial<FaqItem>): Promise<FaqItem> {
  const newFaq: FaqItem = {
    id: faqData.id || `faq-${Date.now()}`,
    question: faqData.question || "",
    answer: faqData.answer || "",
    category: faqData.category || "সাধারণ",
    order: faqData.order !== undefined ? faqData.order : 0,
    isActive: faqData.isActive !== undefined ? faqData.isActive : true,
  };

  if (isSupabaseConfigured) {
    try {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        const { error } = await supabase.from("faqs").insert([{
          id: newFaq.id,
          question: newFaq.question,
          answer: newFaq.answer,
          is_active: newFaq.isActive,
          sort_order: newFaq.order,
        }]);
        if (error) {
          console.error("Supabase create FAQ error:", error.message);
        }
      }
    } catch (e) {
      console.warn("Supabase create FAQ exception:", e);
    }
  }

  return newFaq;
}

export async function updateFaqItem(id: string, updatedFields: Partial<FaqItem>): Promise<FaqItem | null> {
  if (isSupabaseConfigured) {
    try {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        const updateObj: Record<string, any> = {};
        if (updatedFields.question !== undefined) updateObj.question = updatedFields.question;
        if (updatedFields.answer !== undefined) updateObj.answer = updatedFields.answer;
        if (updatedFields.isActive !== undefined) updateObj.is_active = updatedFields.isActive;
        if (updatedFields.order !== undefined) updateObj.sort_order = updatedFields.order;

        const { error } = await supabase.from("faqs").update(updateObj).eq("id", id);
        if (!error) {
          const faqs = await getFaqsData();
          return faqs.find((f) => f.id === id) || null;
        }
        console.error("Supabase update FAQ error:", error.message);
      }
    } catch (e) {
      console.warn("Supabase update FAQ exception:", e);
    }
  }

  const faqs = await getFaqsData();
  const index = faqs.findIndex((f) => f.id === id);
  if (index === -1) return null;

  const updatedFaq: FaqItem = {
    ...faqs[index],
    ...updatedFields,
  };

  faqs[index] = updatedFaq;
  await saveFaqsData(faqs);
  return updatedFaq;
}

export async function deleteFaqItem(id: string): Promise<boolean> {
  if (isSupabaseConfigured) {
    try {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        const { error } = await supabase.from("faqs").delete().eq("id", id);
        if (!error) return true;
        console.error("Supabase delete FAQ error:", error.message);
      }
    } catch (e) {
      console.warn("Supabase delete FAQ exception:", e);
    }
  }

  const faqs = await getFaqsData();
  const filtered = faqs.filter((f) => f.id !== id);
  await saveFaqsData(filtered);
  return true;
}

export async function moveFaqPosition(id: string, targetOrder: number): Promise<FaqItem[]> {
  const faqs = await getFaqsData();
  const sorted = [...faqs].sort((a, b) => a.order - b.order);
  const currentIndex = sorted.findIndex((f) => f.id === id);
  if (currentIndex === -1) return faqs;

  const [movedItem] = sorted.splice(currentIndex, 1);
  const safeTargetIndex = Math.max(0, Math.min(sorted.length, targetOrder - 1));
  sorted.splice(safeTargetIndex, 0, movedItem);

  const resequenced = sorted.map((item, idx) => ({
    ...item,
    order: idx + 1,
  }));

  if (isSupabaseConfigured) {
    try {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        await Promise.allSettled(
          resequenced.map((item) =>
            supabase.from("faqs").update({ sort_order: item.order }).eq("id", item.id)
          )
        );
      }
    } catch (e) {
      console.warn("Supabase reorder FAQs exception:", e);
    }
  }

  await saveFaqsData(resequenced);
  return resequenced;
}

export async function reorderFaqs(newOrderList: { id: string; order: number }[]): Promise<FaqItem[]> {
  const faqs = await getFaqsData();
  const orderMap = new Map(newOrderList.map((item) => [item.id, item.order]));

  const updatedFaqs = faqs.map((f) => ({
    ...f,
    order: orderMap.has(f.id) ? (orderMap.get(f.id) as number) : f.order,
  })).sort((a, b) => a.order - b.order);

  if (isSupabaseConfigured) {
    try {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        await Promise.allSettled(
          updatedFaqs.map((item) =>
            supabase.from("faqs").update({ sort_order: item.order }).eq("id", item.id)
          )
        );
      }
    } catch (e) {
      console.warn("Supabase reorder FAQs exception:", e);
    }
  }

  await saveFaqsData(updatedFaqs);
  return updatedFaqs;
}
