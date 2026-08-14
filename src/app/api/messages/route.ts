import { NextResponse } from "next/server";
import { getContactMessages, addContactMessage } from "@/data/messagesStorage";
import { addNotification } from "@/data/notificationsStorage";
import { sendContactMessageEmail } from "@/lib/sendEmail";

export async function GET() {
  try {
    const messages = await getContactMessages();
    return NextResponse.json({ success: true, messages });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch contact messages" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, message } = body;

    if (!name || !phone || !message) {
      return NextResponse.json(
        { success: false, message: "Name, phone and message are required" },
        { status: 400 }
      );
    }

    const savedMessage = await addContactMessage({
      name: String(name).trim(),
      phone: String(phone).trim(),
      email: email ? String(email).trim() : "",
      message: String(message).trim(),
    });

    // 1. Add Admin Notification
    try {
      await addNotification({
        title: `যোগাযোগ থেকে বার্তা: ${savedMessage.name}`,
        message: `${savedMessage.name} (${savedMessage.phone}) লিখেছেন: "${savedMessage.message.substring(0, 80)}${savedMessage.message.length > 80 ? "..." : ""}"`,
        category: "message",
        link: "/admin/messages",
      });
    } catch (notifErr) {
      console.warn("Notification error:", notifErr);
    }

    // 2. Send SMTP Email to Both Recipients
    try {
      await sendContactMessageEmail({
        name: savedMessage.name,
        phone: savedMessage.phone,
        email: savedMessage.email,
        message: savedMessage.message,
      });
    } catch (emailErr) {
      console.error("Failed to send contact message email:", emailErr);
    }

    return NextResponse.json({ success: true, message: savedMessage }, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/messages exception:", error);
    return NextResponse.json(
      { success: false, message: error?.message || "Failed to submit message" },
      { status: 500 }
    );
  }
}
