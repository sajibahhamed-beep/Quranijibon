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
        const { data: dbNotifs, error } = await supabase
          .from("notifications")
          .select("*")
          .order("created_at", { ascending: false });

        if (!error && Array.isArray(dbNotifs)) {
          return dbNotifs.map((n) => ({
            id: n.id,
            title: n.title,
            message: n.message,
            category: (n.category as AdminNotification["category"]) || "system",
            timestamp: n.created_at ? new Date(n.created_at).toLocaleDateString("bn-BD") : "এইমাত্র",
            read: n.read || false,
            link: n.link || "",
          }));
        }
        if (error) {
          console.warn("Supabase notifications fetch error:", error.message);
        }
      }
    } catch (e) {
      console.warn("Supabase notifications fetch exception:", e);
    }
  }

  try {
    const fileContent = await fs.readFile(DATA_FILE_PATH, "utf-8");
    if (!fileContent || !fileContent.trim()) return [];
    const data = JSON.parse(fileContent) as AdminNotification[];
    return Array.isArray(data) ? data : [];
  } catch (error) {
    return [];
  }
}

export async function markAsRead(id: string): Promise<boolean> {
  if (isSupabaseConfigured) {
    try {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        const { error } = await supabase.from("notifications").update({ read: true }).eq("id", id);
        if (!error) return true;
        console.error("Supabase markAsRead error:", error.message);
      }
    } catch (e) {
      console.warn("Supabase markAsRead exception:", e);
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
        const { error } = await supabase.from("notifications").update({ read: true }).neq("id", "");
        if (!error) return true;
        console.error("Supabase markAllAsRead error:", error.message);
      }
    } catch (e) {
      console.warn("Supabase markAllAsRead exception:", e);
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
        const { error } = await supabase.from("notifications").delete().eq("id", id);
        if (!error) return true;
        console.error("Supabase deleteNotification error:", error.message);
      }
    } catch (e) {
      console.warn("Supabase deleteNotification exception:", e);
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
        const { error } = await supabase.from("notifications").delete().neq("id", "");
        if (!error) return true;
        console.error("Supabase clearAllNotifications error:", error.message);
      }
    } catch (e) {
      console.warn("Supabase clearAllNotifications exception:", e);
    }
  }

  await saveNotifications([]);
  return true;
}

export async function addNotification(
  data: Omit<AdminNotification, "id" | "timestamp" | "read">
): Promise<AdminNotification> {
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
        const { error } = await supabase.from("notifications").insert([{
          id: newNotif.id,
          title: newNotif.title,
          message: newNotif.message,
          category: newNotif.category,
          link: newNotif.link || "",
          read: false,
          created_at: new Date().toISOString(),
        }]);
        if (error) {
          console.error("Supabase addNotification error:", error.message);
        }
      }
    } catch (e) {
      console.warn("Supabase addNotification exception:", e);
    }
  }

  return newNotif;
}

export async function saveNotifications(data: AdminNotification[]): Promise<void> {
  try {
    const dir = path.dirname(DATA_FILE_PATH);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch (e) {}
}
