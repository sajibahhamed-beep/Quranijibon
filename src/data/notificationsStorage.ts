import fs from "fs/promises";
import path from "path";
import { getSupabaseClient, getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";

export interface AdminNotification {
  id: string;
  title: string;
  message: string;
  category: "admission" | "donation" | "teacher" | "system" | "message";
  timestamp: string;
  read: boolean;
  link?: string;
}

const DATA_FILE_PATH = path.join(process.cwd(), "src", "data", "notifications.json");

export async function getNotifications(): Promise<AdminNotification[]> {
  if (isSupabaseConfigured) {
    try {
      const supabase = getSupabaseClient();
      if (supabase) {
        const { data: dbNotifs, error } = await supabase.from("notifications").select("*").order("created_at", { ascending: false });
        if (!error && dbNotifs && dbNotifs.length > 0) {
          return dbNotifs.map((n) => ({
            id: n.id,
            title: n.title,
            message: n.message,
            category: n.category || "system",
            timestamp: n.created_at ? new Date(n.created_at).toLocaleDateString("bn-BD") : "এইমাত্র",
            read: n.read || false,
            link: n.link || "",
          }));
        }
      }
    } catch (e) {
      console.warn("Supabase notifications fetch error, falling back to local file:", e);
    }
  }

  try {
    const fileContent = await fs.readFile(DATA_FILE_PATH, "utf-8");
    const data = JSON.parse(fileContent) as AdminNotification[];
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error reading notifications.json", error);
    return [];
  }
}

export async function markAsRead(id: string): Promise<boolean> {
  if (isSupabaseConfigured) {
    try {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        await supabase.from("notifications").update({ read: true }).eq("id", id);
      }
    } catch (e) {
      console.warn("Supabase markAsRead error:", e);
    }
  }

  const notifs = await getNotifications();
  const index = notifs.findIndex((n) => n.id === id);
  if (index === -1) return false;
  notifs[index].read = true;
  await saveNotifications(notifs);
  return true;
}

export async function markAllAsRead(): Promise<boolean> {
  if (isSupabaseConfigured) {
    try {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        await supabase.from("notifications").update({ read: true }).neq("id", "");
      }
    } catch (e) {
      console.warn("Supabase markAllAsRead error:", e);
    }
  }

  const notifs = await getNotifications();
  const updated = notifs.map((n) => ({ ...n, read: true }));
  await saveNotifications(updated);
  return true;
}

export async function deleteNotification(id: string): Promise<boolean> {
  if (isSupabaseConfigured) {
    try {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        await supabase.from("notifications").delete().eq("id", id);
      }
    } catch (e) {
      console.warn("Supabase deleteNotification error:", e);
    }
  }

  const notifs = await getNotifications();
  const filtered = notifs.filter((n) => n.id !== id);
  await saveNotifications(filtered);
  return true;
}

export async function clearAllNotifications(): Promise<boolean> {
  if (isSupabaseConfigured) {
    try {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        await supabase.from("notifications").delete().neq("id", "");
      }
    } catch (e) {
      console.warn("Supabase clearAllNotifications error:", e);
    }
  }

  await saveNotifications([]);
  return true;
}

export async function addNotification(
  data: Omit<AdminNotification, "id" | "timestamp" | "read">
): Promise<AdminNotification> {
  const notifs = await getNotifications();
  const newNotif: AdminNotification = {
    id: `notif-${Date.now()}`,
    ...data,
    timestamp: "এইমাত্র",
    read: false,
  };

  if (isSupabaseConfigured) {
    try {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        await supabase.from("notifications").insert([{
          id: newNotif.id,
          title: newNotif.title,
          message: newNotif.message,
          category: newNotif.category,
          link: newNotif.link || "",
          read: false,
          created_at: new Date().toISOString(),
        }]);
      }
    } catch (e) {
      console.warn("Supabase addNotification error:", e);
    }
  }

  const updated = [newNotif, ...notifs];
  await saveNotifications(updated);
  return newNotif;
}

export async function saveNotifications(data: AdminNotification[]): Promise<void> {
  const dir = path.dirname(DATA_FILE_PATH);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(DATA_FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
}
