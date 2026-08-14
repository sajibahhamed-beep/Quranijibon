import { NextResponse } from "next/server";
import { getNotifications, addNotification } from "@/data/notificationsStorage";
import { sendContactMessageEmail } from "@/lib/sendEmail";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const notifications = await getNotifications();
    return NextResponse.json({ success: true, notifications });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to fetch notifications" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.title || !body.message) {
      return NextResponse.json(
        { success: false, message: "Title and Message are required" },
        { status: 400 }
      );
    }

    const notification = await addNotification({
      title: body.title,
      message: body.message,
      category: body.category || "admission",
      link: body.link || "/admin/students",
    });

    // If it's a contact or user message, dispatch email alert
    if (body.category === "message") {
      try {
        await sendContactMessageEmail({
          name: body.title || "ব্যবহারকারী",
          phone: "উপরে উল্লেখিত",
          message: body.message,
        });
      } catch (err) {
        console.error("Contact message email error:", err);
      }
    }

    return NextResponse.json({ success: true, notification }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to save notification" },
      { status: 500 }
    );
  }
}
