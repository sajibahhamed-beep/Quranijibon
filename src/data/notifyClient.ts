"use server";

import { addNotification } from "@/data/notificationsStorage";

export async function recordUserInteraction({
  title,
  message,
  category,
  link,
}: {
  title: string;
  message: string;
  category: "admission" | "donation" | "teacher" | "system" | "message";
  link?: string;
}) {
  try {
    return await addNotification({
      title,
      message,
      category,
      link,
    });
  } catch (err) {
    console.error("Error recording user interaction notification", err);
    return null;
  }
}
