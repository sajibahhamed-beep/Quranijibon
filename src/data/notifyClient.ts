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
    const res = await fetch("/api/notifications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, message, category, link }),
    });
    if (!res.ok) throw new Error("Failed to record notification");
    const data = await res.json();
    return data.notification;
  } catch (err) {
    console.error("Error recording user interaction notification:", err);
    return null;
  }
}
