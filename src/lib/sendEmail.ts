import nodemailer from "nodemailer";

// Fallback recipient emails if RECIPIENT_EMAILS is not provided in .env
const DEFAULT_RECIPIENT_EMAILS = [
  "sajibahhamed@gmail.com",
  "mahiyaakter148@gmail.com",
];

export function getRecipientEmails(): string[] {
  const envRecipients = process.env.RECIPIENT_EMAILS?.trim();
  if (envRecipients) {
    const list = envRecipients
      .split(",")
      .map((e) => e.trim())
      .filter(Boolean);
    if (list.length > 0) return list;
  }
  return DEFAULT_RECIPIENT_EMAILS;
}

export function getSmtpConfig() {
  const user = (process.env.SMTP_EMAIL || process.env.SMTP_USER)?.trim();
  const rawPass = (process.env.SMTP_PASSWORD || process.env.SMTP_PASS)?.trim();
  const pass = rawPass ? rawPass.replace(/\s+/g, "") : "";
  const host = process.env.SMTP_HOST?.trim() || "smtp.gmail.com";
  const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 465;
  const secure = process.env.SMTP_SECURE !== undefined 
    ? process.env.SMTP_SECURE === "true" 
    : port === 465;
  const fromName = process.env.SMTP_FROM_NAME?.trim() || "Quranijibon Academy";

  return {
    user,
    pass,
    host,
    port,
    secure,
    fromName,
    isConfigured: Boolean(user && pass),
  };
}

export function createTransporter() {
  const config = getSmtpConfig();

  if (!config.isConfigured || !config.user || !config.pass) {
    console.warn("[Nodemailer] SMTP_USER/SMTP_EMAIL or SMTP_PASS/SMTP_PASSWORD not set in environment — email skipped.");
    return null;
  }

  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure, // SSL on port 465, STARTTLS on port 587
    auth: {
      user: config.user,
      pass: config.pass,
    },
    tls: {
      rejectUnauthorized: false,
    },
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 20000,
  });
}

/**
 * Test SMTP connection and return verification result
 */
export async function verifySmtp(): Promise<{ success: boolean; message: string; config?: any }> {
  try {
    const config = getSmtpConfig();
    if (!config.isConfigured) {
      return { success: false, message: "SMTP credentials (user/password) not found in environment variables." };
    }

    const transporter = createTransporter();
    if (!transporter) {
      return { success: false, message: "Failed to initialize SMTP transporter." };
    }

    await transporter.verify();
    return {
      success: true,
      message: "SMTP Transporter verified successfully and ready to send messages.",
      config: {
        host: config.host,
        port: config.port,
        secure: config.secure,
        user: config.user,
        recipients: getRecipientEmails(),
      },
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to verify SMTP transporter.",
    };
  }
}

export async function sendNotificationEmail({
  subject,
  htmlBody,
  to,
}: {
  subject: string;
  htmlBody: string;
  to?: string | string[];
}) {
  const config = getSmtpConfig();
  const transporter = createTransporter();

  if (!transporter || !config.user) {
    console.warn(`[Nodemailer] Skipping email "${subject}" because SMTP is not configured.`);
    return { success: false, reason: "SMTP not configured" };
  }

  let recipients: string[] = [];
  if (to) {
    recipients = Array.isArray(to) ? to : [to];
  } else {
    recipients = getRecipientEmails();
  }

  // Send a separate individual email to each recipient
  const results = await Promise.allSettled(
    recipients.map((recipient) =>
      transporter.sendMail({
        from: `"${config.fromName}" <${config.user}>`,
        to: recipient,
        subject,
        html: htmlBody,
      })
    )
  );

  let successCount = 0;
  results.forEach((result, i) => {
    if (result.status === "fulfilled") {
      successCount++;
      console.log(`✅ [Nodemailer] Email sent to ${recipients[i]}: ${subject}`);
    } else {
      console.error(`❌ [Nodemailer] Email failed for ${recipients[i]}:`, result.reason);
    }
  });

  return {
    success: successCount > 0,
    deliveredCount: successCount,
    totalCount: recipients.length,
    results,
  };
}


// ── Prebuilt email templates ─────────────────────────────────────────────────

export async function sendStudentApplicationEmail(student: {
  name: string;
  gender?: string;
  phone: string;
  email?: string;
  package?: string;
  schedule?: string;
  teacherPreference?: string;
  notes?: string;
}) {
  const subject = `📚 নতুন শিক্ষার্থী ভর্তি আবেদন — ${student.name} (${student.package || "কোর্স"})`;
  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0;">
      <div style="background: linear-gradient(135deg, #00A89C, #059669); padding: 24px 28px;">
        <h1 style="color: white; margin: 0; font-size: 20px;">📚 নতুন শিক্ষার্থী ভর্তি আবেদন</h1>
        <p style="color: rgba(255,255,255,0.85); margin: 6px 0 0; font-size: 14px;">কুরআন জীবন অনলাইন একাডেমি</p>
      </div>
      <div style="padding: 28px;">
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr><td style="padding: 10px 0; color: #64748b; width: 40%;">শিক্ষার্থীর নাম</td><td style="padding: 10px 0; font-weight: bold; color: #0f172a;">${student.name}</td></tr>
          <tr style="background:#f1f5f9;"><td style="padding: 10px 8px; color: #64748b;">শিক্ষার্থীর জেন্ডার / ধরন</td><td style="padding: 10px 8px; font-weight: bold; color: #00A89C;">${student.gender || "—"}</td></tr>
          <tr><td style="padding: 10px 0; color: #64748b;">ফোন / হোয়াটসঅ্যাপ</td><td style="padding: 10px 0; font-weight: bold; color: #0f172a;">${student.phone}</td></tr>
          ${student.email ? `<tr style="background:#f1f5f9;"><td style="padding: 10px 8px; color: #64748b;">ইমেইল</td><td style="padding: 10px 8px; color: #0f172a;">${student.email}</td></tr>` : ""}
          <tr><td style="padding: 10px 0; color: #64748b;">প্যাকেজ / কোর্স</td><td style="padding: 10px 0; font-weight: bold; color: #0f172a;">${student.package || "—"}</td></tr>
          <tr style="background:#f1f5f9;"><td style="padding: 10px 8px; color: #64748b;">পছন্দের সময়সূচী</td><td style="padding: 10px 8px; color: #0f172a;">${student.schedule || "—"}</td></tr>
          <tr><td style="padding: 10px 0; color: #64748b;">শিক্ষক পছন্দ</td><td style="padding: 10px 0; color: #0f172a;">${student.teacherPreference || "—"}</td></tr>
          ${student.notes ? `<tr style="background:#f1f5f9;"><td style="padding: 10px 8px; color: #64748b;">বিশেষ নোট</td><td style="padding: 10px 8px; color: #0f172a;">${student.notes}</td></tr>` : ""}
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
  return await sendNotificationEmail({ subject, htmlBody });
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
  return await sendNotificationEmail({ subject, htmlBody });
}

export async function sendContactMessageEmail(contact: {
  name: string;
  phone: string;
  email?: string;
  message: string;
}) {
  const subject = `💬 যোগাযোগ ফর্ম থেকে নতুন বার্তা — ${contact.name}`;
  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0;">
      <div style="background: linear-gradient(135deg, #0ea5e9, #00A89C); padding: 24px 28px;">
        <h1 style="color: white; margin: 0; font-size: 20px;">💬 যোগাযোগ ফর্ম থেকে বার্তা</h1>
        <p style="color: rgba(255,255,255,0.85); margin: 6px 0 0; font-size: 14px;">কুরআন জীবন হেল্প ও সাপোর্ট</p>
      </div>
      <div style="padding: 28px;">
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr><td style="padding: 10px 0; color: #64748b; width: 40%;">নাম</td><td style="padding: 10px 0; font-weight: bold; color: #0f172a;">${contact.name}</td></tr>
          <tr style="background:#f1f5f9;"><td style="padding: 10px 8px; color: #64748b;">ফোন / হোয়াটসঅ্যাপ</td><td style="padding: 10px 8px; font-weight: bold; color: #0f172a;">${contact.phone}</td></tr>
          ${contact.email ? `<tr><td style="padding: 10px 0; color: #64748b;">ইমেইল</td><td style="padding: 10px 0; color: #0f172a;">${contact.email}</td></tr>` : ""}
          <tr style="background:#f1f5f9;"><td style="padding: 10px 8px; color: #64748b;">বার্তা</td><td style="padding: 10px 8px; color: #0f172a; white-space: pre-wrap;">${contact.message}</td></tr>
        </table>
      </div>
      <div style="padding: 16px 28px; background: #f1f5f9; text-align: center; font-size: 12px; color: #94a3b8;">
        Message from <strong>Quranijibon</strong> &bull; quranijibon.com
      </div>
    </div>
  `;
  return await sendNotificationEmail({ subject, htmlBody });
}

export async function sendDonationAlertEmail(donation: {
  id: string;
  donorName: string;
  phone: string;
  amount: number;
  paymentMethod: string;
  trxId?: string;
  type?: string;
}) {
  const subject = `💚 নতুন অনুদান ও হাদিয়া প্রাপ্তি (৳${donation.amount}) — ${donation.donorName}`;
  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0;">
      <div style="background: linear-gradient(135deg, #059669, #00A89C); padding: 24px 28px;">
        <h1 style="color: white; margin: 0; font-size: 20px;">💚 নতুন অনুদান / হাদিয়া সাবমিশন</h1>
        <p style="color: rgba(255,255,255,0.85); margin: 6px 0 0; font-size: 14px;">কুরআন জীবন সাদাকা তাহবিল</p>
      </div>
      <div style="padding: 28px;">
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr><td style="padding: 10px 0; color: #64748b; width: 40%;">অনুদান আইডি</td><td style="padding: 10px 0; font-weight: bold; color: #0f172a;">${donation.id}</td></tr>
          <tr style="background:#f1f5f9;"><td style="padding: 10px 8px; color: #64748b;">অনুদানকারীর নাম</td><td style="padding: 10px 8px; font-weight: bold; color: #0f172a;">${donation.donorName}</td></tr>
          <tr><td style="padding: 10px 0; color: #64748b;">মোবাইল নম্বর</td><td style="padding: 10px 0; font-weight: bold; color: #0f172a;">${donation.phone}</td></tr>
          <tr style="background:#f1f5f9;"><td style="padding: 10px 8px; color: #64748b;">অনুদানের পরিমাণ</td><td style="padding: 10px 8px; font-weight: bold; color: #059669; font-size: 16px;">৳${donation.amount}</td></tr>
          <tr><td style="padding: 10px 0; color: #64748b;">পেমেন্ট মেথড</td><td style="padding: 10px 0; color: #0f172a;">${donation.paymentMethod}</td></tr>
          <tr style="background:#f1f5f9;"><td style="padding: 10px 8px; color: #64748b;">ট্রানজেকশন আইডি (TrxID)</td><td style="padding: 10px 8px; font-weight: bold; color: #0f172a;">${donation.trxId || "প্রদান করা হয়নি"}</td></tr>
          <tr><td style="padding: 10px 0; color: #64748b;">টাইপ</td><td style="padding: 10px 0; color: #0f172a;">${donation.type || "সাদাকা"}</td></tr>
        </table>
        <div style="margin-top: 24px; padding: 14px 16px; background: #ecfdf5; border-left: 4px solid #059669; border-radius: 4px;">
          <p style="margin: 0; color: #065f46; font-size: 13px;">অ্যাডমিন প্যানেলের "অনুদান ও স্পন্সরশিপ" পাতায় লগইন করে পেমেন্ট ভেরিফাই করুন।</p>
        </div>
      </div>
      <div style="padding: 16px 28px; background: #f1f5f9; text-align: center; font-size: 12px; color: #94a3b8;">
        Message from <strong>Quranijibon</strong> &bull; quranijibon.com
      </div>
    </div>
  `;
  return await sendNotificationEmail({ subject, htmlBody });
}
