import { NextResponse } from "next/server";
import { verifySmtp, sendNotificationEmail, getSmtpConfig } from "@/lib/sendEmail";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const config = getSmtpConfig();
    const verification = await verifySmtp();
    return NextResponse.json({
      configured: config.isConfigured,
      verification,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error?.message || "Failed to test SMTP" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    let targetEmail: string | undefined;
    try {
      const body = await req.json();
      targetEmail = body.to;
    } catch {
      // empty body allowed, will send to default recipients
    }

    const timestamp = new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka" });
    const result = await sendNotificationEmail({
      subject: `🧪 Nodemailer SMTP Live Test [${timestamp}]`,
      htmlBody: `
        <div style="font-family: Arial, sans-serif; max-width: 580px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #00A89C, #059669); padding: 20px; text-align: center; color: white;">
            <h2 style="margin: 0; font-size: 20px;">🎉 SMTP System Working!</h2>
            <p style="margin: 5px 0 0 0; opacity: 0.9; font-size: 13px;">Quranijibon Academy Notification System</p>
          </div>
          <div style="padding: 24px; color: #334155; line-height: 1.6;">
            <p style="font-weight: bold; color: #0f172a; margin-top: 0;">Assalamu Alaikum,</p>
            <p>This is a live test notification from your Quranijibon Next.js application verifying that <strong>Nodemailer</strong> is properly sending emails.</p>
            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px; margin: 16px 0; font-size: 13px;">
              <div><strong>Time:</strong> ${timestamp} (Asia/Dhaka)</div>
              <div><strong>Status:</strong> Connected & Authenticated</div>
            </div>
          </div>
        </div>
      `,
      to: targetEmail,
    });

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error?.message || "Failed to send test email" },
      { status: 500 }
    );
  }
}
