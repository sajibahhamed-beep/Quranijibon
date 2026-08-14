import fs from "fs/promises";
import path from "path";
import { getSupabaseClient, getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";

export interface ContactMessage {
  id: string;
  name: string;
  phone: string;
  email?: string;
  message: string;
  status: "নতুন" | "পঠিত" | "উত্তর দেওয়া হয়েছে";
  createdAt: string;
  date: string;
}

const DATA_FILE_PATH = path.join(process.cwd(), "src", "data", "messages.json");

export async function getContactMessages(): Promise<ContactMessage[]> {
  if (isSupabaseConfigured) {
    try {
      const supabase = getSupabaseClient();
      if (supabase) {
        const { data: dbMessages, error } = await supabase
          .from("contact_messages")
          .select("*")
          .order("created_at", { ascending: false });

        if (!error && Array.isArray(dbMessages)) {
          return dbMessages.map((m) => ({
            id: m.id,
            name: m.name,
            phone: m.phone,
            email: m.email || "",
            message: m.message,
            status: m.status || "নতুন",
            createdAt: m.created_at || new Date().toISOString(),
            date: m.created_at ? m.created_at.split("T")[0] : new Date().toISOString().split("T")[0],
          }));
        }
      }
    } catch (e) {
      console.warn("Supabase contact_messages fetch exception:", e);
    }
  }

  try {
    const fileContent = await fs.readFile(DATA_FILE_PATH, "utf-8");
    if (!fileContent || !fileContent.trim()) return [];
    const data = JSON.parse(fileContent) as ContactMessage[];
    return Array.isArray(data) ? data : [];
  } catch (error) {
    return [];
  }
}

export async function saveContactMessages(data: ContactMessage[]): Promise<void> {
  try {
    const dir = path.dirname(DATA_FILE_PATH);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch (e) {}
}

export async function addContactMessage(
  data: Omit<ContactMessage, "id" | "createdAt" | "date" | "status">
): Promise<ContactMessage> {
  const currentMessages = await getContactMessages();
  const dateStr = new Date().toISOString().split("T")[0];
  const fullIso = new Date().toISOString();
  const newId = `MSG-${100 + currentMessages.length + 1}`;

  const newMessage: ContactMessage = {
    id: newId,
    name: data.name.trim(),
    phone: data.phone.trim(),
    email: data.email ? data.email.trim() : "",
    message: data.message.trim(),
    status: "নতুন",
    createdAt: fullIso,
    date: dateStr,
  };

  if (isSupabaseConfigured) {
    try {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        await supabase.from("contact_messages").insert([
          {
            id: newId,
            name: newMessage.name,
            phone: newMessage.phone,
            email: newMessage.email || null,
            message: newMessage.message,
            status: newMessage.status,
            created_at: fullIso,
          },
        ]);
      }
    } catch (e) {
      console.warn("Supabase insert contact_messages error:", e);
    }
  }

  const updated = [newMessage, ...currentMessages];
  await saveContactMessages(updated);
  return newMessage;
}

export async function updateMessageStatus(
  id: string,
  newStatus: ContactMessage["status"]
): Promise<boolean> {
  const current = await getContactMessages();
  const updated = current.map((m) => (m.id === id ? { ...m, status: newStatus } : m));
  await saveContactMessages(updated);

  if (isSupabaseConfigured) {
    try {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        await supabase
          .from("contact_messages")
          .update({ status: newStatus })
          .eq("id", id);
      }
    } catch (e) {
      console.warn("Supabase update message status error:", e);
    }
  }

  return true;
}

export async function deleteContactMessage(id: string): Promise<boolean> {
  if (isSupabaseConfigured) {
    try {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        await supabase.from("contact_messages").delete().eq("id", id);
      }
    } catch (e) {
      console.warn("Supabase delete contact message error:", e);
    }
  }

  const current = await getContactMessages();
  const filtered = current.filter((m) => m.id !== id);
  await saveContactMessages(filtered);
  return true;
}
