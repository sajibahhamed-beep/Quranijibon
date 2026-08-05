import fs from "fs/promises";
import path from "path";

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
    answer: "আমাদের প্ল্যাটফর্মে ক্লাস করার জন্য আপনার একটি স্মার্টফোন, ট্যাবলেট বা কম্পিউটার এবং ইন্টারনেট কানেকশন প্রয়োজন। Zoom বা Google Meet অ্যাপের মাধ্যমে সরাসরি লাইভ ওয়ান-টু-ওয়ান ক্লাস নেওয়া হয়।",
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
  try {
    const fileContent = await fs.readFile(DATA_FILE_PATH, "utf-8");
    const data = JSON.parse(fileContent) as FaqItem[];
    if (!Array.isArray(data)) {
      throw new Error("Invalid json format");
    }
    return data.sort((a, b) => a.order - b.order);
  } catch (error) {
    await saveFaqsData(DEFAULT_FAQS);
    return DEFAULT_FAQS;
  }
}

export async function saveFaqsData(faqs: FaqItem[]): Promise<void> {
  const dir = path.dirname(DATA_FILE_PATH);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(DATA_FILE_PATH, JSON.stringify(faqs, null, 2), "utf-8");
}

export async function createFaqItem(faqData: Partial<FaqItem>): Promise<FaqItem> {
  const faqs = await getFaqsData();
  const newFaq: FaqItem = {
    id: faqData.id || `faq-${Date.now()}`,
    question: faqData.question || "",
    answer: faqData.answer || "",
    category: faqData.category || "সাধারণ",
    order: faqData.order !== undefined ? faqData.order : faqs.length + 1,
    isActive: faqData.isActive !== undefined ? faqData.isActive : true,
  };

  faqs.push(newFaq);
  await saveFaqsData(faqs);
  return newFaq;
}

export async function updateFaqItem(id: string, updatedFields: Partial<FaqItem>): Promise<FaqItem | null> {
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
  const faqs = await getFaqsData();
  const filtered = faqs.filter((f) => f.id !== id);
  if (filtered.length === faqs.length) return false;

  await saveFaqsData(filtered);
  return true;
}
