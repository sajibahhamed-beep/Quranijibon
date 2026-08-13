import nodemailer from "nodemailer";

// Both emails will each receive their own individual copy
const RECIPIENT_EMAILS = [
  "sajibahhamed@gmail.com",
  "sajibahhamed0@gmail.com",
];

function createTransporter() {
  const user = process.env.SMTP_EMAIL;
  const pass = process.env.SMTP_PASSWORD;

  if (!user || !pass) {
    console.warn("SMTP_EMAIL or SMTP_PASSWORD not set — email skipped.");
    return null;
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });
}

export async function sendNotificationEmail({
  subject,
  htmlBody,
}: {
  subject: string;
  htmlBody: string;
}) {
  const transporter = createTransporter();
  if (!transporter) return;

  // Send a separate individual email to each recipient
  const results = await Promise.allSettled(
    RECIPIENT_EMAILS.map((recipient) =>
      transporter.sendMail({
        from: `"Message from Quranijibon" <${process.env.SMTP_EMAIL}>`,
        to: recipient,
        subject,
        html: htmlBody,
      })
    )
  );

  results.forEach((result, i) => {
    if (result.status === "fulfilled") {
      console.log(`Email sent to ${RECIPIENT_EMAILS[i]}: ${subject}`);
    } else {
      console.error(`Email failed for ${RECIPIENT_EMAILS[i]}:`, result.reason);
    }
  });
}


// ── Prebuilt email templates ─────────────────────────────────────────────────

export async function sendStudentApplicationEmail(student: {
  name: string;
  phone: string;
  email?: string;
  package?: string;
  schedule?: string;
  teacherPreference?: string;
  notes?: string;
}) {
  const subject = `📚 নতুন শিক্ষার্থী আবেদন — ${student.name}`;
  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0;">
      <div style="background: linear-gradient(135deg, #00A89C, #059669); padding: 24px 28px;">
        <h1 style="color: white; margin: 0; font-size: 20px;">📚 নতুন শিক্ষার্থী আবেদন</h1>
        <p style="color: rgba(255,255,255,0.85); margin: 6px 0 0; font-size: 14px;">কুরআন জীবন অনলাইন একাডেমি</p>
      </div>
      <div style="padding: 28px;">
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr><td style="padding: 10px 0; color: #64748b; width: 40%;">নাম</td><td style="padding: 10px 0; font-weight: bold; color: #0f172a;">${student.name}</td></tr>
          <tr style="background:#f1f5f9;"><td style="padding: 10px 8px; color: #64748b;">ফোন / হোয়াটসঅ্যাপ</td><td style="padding: 10px 8px; font-weight: bold; color: #0f172a;">${student.phone}</td></tr>
          ${student.email ? `<tr><td style="padding: 10px 0; color: #64748b;">ইমেইল</td><td style="padding: 10px 0; color: #0f172a;">${student.email}</td></tr>` : ""}
          <tr style="background:#f1f5f9;"><td style="padding: 10px 8px; color: #64748b;">প্যাকেজ / কোর্স</td><td style="padding: 10px 8px; color: #0f172a;">${student.package || "—"}</td></tr>
          <tr><td style="padding: 10px 0; color: #64748b;">পছন্দের সময়সূচী</td><td style="padding: 10px 0; color: #0f172a;">${student.schedule || "—"}</td></tr>
          <tr style="background:#f1f5f9;"><td style="padding: 10px 8px; color: #64748b;">শিক্ষক পছন্দ</td><td style="padding: 10px 8px; color: #0f172a;">${student.teacherPreference || "—"}</td></tr>
          ${student.notes ? `<tr><td style="padding: 10px 0; color: #64748b;">বিশেষ নোট</td><td style="padding: 10px 0; color: #0f172a;">${student.notes}</td></tr>` : ""}
        </table>
        <div style="margin-top: 24px; padding: 14px 16px; background: #ecfdf5; border-left: 4px solid #00A89C; border-radius: 4px;">
          <p style="margin: 0; color: #064e3b; font-size: 13px;">অ্যাডমিন প্যানেলে লগইন করে এই আবেদনটি পর্যালোচনা করুন।</p>
        </div>
      </div>
      <div style="padding: 16px 28px; background: #f1f5f9; text-align: center; font-size: 12px; color: #94a3b8;">
        Message from <strong>Quranijibon</strong> &bull; quranijibon.com
      </div>
    </div>
  `;
  await sendNotificationEmail({ subject, htmlBody });
}

export async function sendTeacherApplicationEmail(teacher: {
  name: string;
  gender?: string;
  phone: string;
  email?: string;
  qualification?: string;
  experience?: string;
  workType?: string;
  notes?: string;
}) {
  const subject = `🌟 নতুন শিক্ষক আবেদন — ${teacher.name}`;
  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0;">
      <div style="background: linear-gradient(135deg, #7c3aed, #00A89C); padding: 24px 28px;">
        <h1 style="color: white; margin: 0; font-size: 20px;">🌟 নতুন শিক্ষক / মেন্টর আবেদন</h1>
        <p style="color: rgba(255,255,255,0.85); margin: 6px 0 0; font-size: 14px;">কুরআন জীবন মেন্টরশিপ প্রোগ্রাম</p>
      </div>
      <div style="padding: 28px;">
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr><td style="padding: 10px 0; color: #64748b; width: 40%;">নাম</td><td style="padding: 10px 0; font-weight: bold; color: #0f172a;">${teacher.name}</td></tr>
          <tr style="background:#f1f5f9;"><td style="padding: 10px 8px; color: #64748b;">লিঙ্গ</td><td style="padding: 10px 8px; color: #0f172a;">${teacher.gender || "—"}</td></tr>
          <tr><td style="padding: 10px 0; color: #64748b;">ফোন / হোয়াটসঅ্যাপ</td><td style="padding: 10px 0; font-weight: bold; color: #0f172a;">${teacher.phone}</td></tr>
          ${teacher.email ? `<tr style="background:#f1f5f9;"><td style="padding: 10px 8px; color: #64748b;">ইমেইল</td><td style="padding: 10px 8px; color: #0f172a;">${teacher.email}</td></tr>` : ""}
          <tr><td style="padding: 10px 0; color: #64748b;">দ্বীনি যোগ্যতা</td><td style="padding: 10px 0; color: #0f172a;">${teacher.qualification || "—"}</td></tr>
          <tr style="background:#f1f5f9;"><td style="padding: 10px 8px; color: #64748b;">অভিজ্ঞতা</td><td style="padding: 10px 8px; color: #0f172a;">${teacher.experience || "—"}</td></tr>
          <tr><td style="padding: 10px 0; color: #64748b;">কাজের ধরন</td><td style="padding: 10px 0; color: #0f172a;">${teacher.workType || "—"}</td></tr>
          ${teacher.notes ? `<tr style="background:#f1f5f9;"><td style="padding: 10px 8px; color: #64748b;">বার্তা / পরিচিতি</td><td style="padding: 10px 8px; color: #0f172a;">${teacher.notes}</td></tr>` : ""}
        </table>
        <div style="margin-top: 24px; padding: 14px 16px; background: #f5f3ff; border-left: 4px solid #7c3aed; border-radius: 4px;">
          <p style="margin: 0; color: #4c1d95; font-size: 13px;">অ্যাডমিন প্যানেলে লগইন করে এই শিক্ষকের আবেদনটি পর্যালোচনা করুন।</p>
        </div>
      </div>
      <div style="padding: 16px 28px; background: #f1f5f9; text-align: center; font-size: 12px; color: #94a3b8;">
        Message from <strong>Quranijibon</strong> &bull; quranijibon.com
      </div>
    </div>
  `;
  await sendNotificationEmail({ subject, htmlBody });
}
