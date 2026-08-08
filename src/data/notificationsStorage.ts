import fs from "fs/promises";
import path from "path";

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
  const notifs = await getNotifications();
  const index = notifs.findIndex((n) => n.id === id);
  if (index === -1) return false;
  notifs[index].read = true;
  await saveNotifications(notifs);
  return true;
}

export async function markAllAsRead(): Promise<boolean> {
  const notifs = await getNotifications();
  const updated = notifs.map((n) => ({ ...n, read: true }));
  await saveNotifications(updated);
  return true;
}

export async function deleteNotification(id: string): Promise<boolean> {
  const notifs = await getNotifications();
  const filtered = notifs.filter((n) => n.id !== id);
  await saveNotifications(filtered);
  return true;
}

export async function clearAllNotifications(): Promise<boolean> {
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
  const updated = [newNotif, ...notifs];
  await saveNotifications(updated);
  return newNotif;
}

export async function saveNotifications(data: AdminNotification[]): Promise<void> {
  const dir = path.dirname(DATA_FILE_PATH);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(DATA_FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
}
