const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

// Load .env.local manually if dotenv is not installed
function loadEnv() {
  const envPath = path.resolve(process.cwd(), ".env.local");
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, "utf-8").split("\n");
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const idx = trimmed.indexOf("=");
      if (idx !== -1) {
        const key = trimmed.substring(0, idx).trim();
        let val = trimmed.substring(idx + 1).trim();
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.substring(1, val.length - 1);
        }
        if (!process.env[key]) {
          process.env[key] = val;
        }
      }
    }
  }
}

loadEnv();

async function testSMTP() {
  const user = (process.env.SMTP_EMAIL || process.env.SMTP_USER)?.trim();
  const rawPass = (process.env.SMTP_PASSWORD || process.env.SMTP_PASS)?.trim();
  const pass = rawPass ? rawPass.replace(/\s+/g, "") : "";
  const host = process.env.SMTP_HOST?.trim() || "smtp.gmail.com";
  const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 465;
  const secure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : (port === 465);

  console.log("=========================================");
  console.log("        NODEMAILER SMTP TEST RUNNER       ");
  console.log("=========================================");
  console.log("SMTP Host:    ", host);
  console.log("SMTP Port:    ", port);
  console.log("Secure (SSL): ", secure);
  console.log("SMTP User:    ", user ? user : "[NOT SET]");
  console.log("SMTP Pass:    ", pass ? `[SET - ${pass.length} chars (sanitized)]` : "[NOT SET]");
  console.log("Recipients:   ", process.env.RECIPIENT_EMAILS || "[DEFAULT]");

  if (!user || !pass) {
    console.error("❌ ERROR: SMTP credentials missing in .env.local!");
    process.exit(1);
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
    tls: {
      rejectUnauthorized: false,
    },
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 20000,
  });

  console.log("\n1. Verifying SMTP connection & authentication...");
  try {
    const verifyResult = await transporter.verify();
    console.log("✅ SMTP Transporter verification SUCCESSFUL:", verifyResult);
  } catch (verifyErr) {
    console.error("❌ SMTP Verification FAILED:", verifyErr.message);
    console.error(verifyErr);
    process.exit(1);
  }

  console.log("\n2. Sending test notification email...");
  const recipients = (process.env.RECIPIENT_EMAILS || "sajibahhamed@gmail.com")
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean);

  const timestamp = new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka" });

  try {
    for (const recipient of recipients) {
      console.log(`Sending to: ${recipient}...`);
      const info = await transporter.sendMail({
        from: `"Quranijibon Academy Test" <${user}>`,
        to: recipient,
        subject: `🧪 Nodemailer SMTP Test - Quranijibon [${timestamp}]`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 580px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
            <div style="background: linear-gradient(135deg, #00A89C, #059669); padding: 20px; text-align: center; color: white;">
              <h2 style="margin: 0; font-size: 20px;">🎉 SMTP System Test Successful!</h2>
              <p style="margin: 5px 0 0 0; opacity: 0.9; font-size: 13px;">Quranijibon Academy Notification System</p>
            </div>
            <div style="padding: 24px; color: #334155; line-height: 1.6;">
              <p style="font-weight: bold; color: #0f172a; margin-top: 0;">Assalamu Alaikum,</p>
              <p>This is an automated test email confirming that the <strong>Nodemailer SMTP System</strong> has been configured successfully using your <code>.env.local</code> credentials.</p>
              
              <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px; margin: 16px 0; font-size: 13px;">
                <div><strong>SMTP Host:</strong> ${host}</div>
                <div><strong>Port:</strong> ${port} (${secure ? "SSL" : "TLS"})</div>
                <div><strong>Sender:</strong> ${user}</div>
                <div><strong>Recipient:</strong> ${recipient}</div>
                <div><strong>Sent At (Dhaka Time):</strong> ${timestamp}</div>
              </div>

              <p style="color: #059669; font-weight: bold;">✔ All course applications, teacher registrations, messages, and donation alerts will now be reliably delivered to your inbox.</p>
            </div>
            <div style="background: #f1f5f9; padding: 12px; text-align: center; font-size: 12px; color: #64748b;">
              Quranijibon Academy &bull; quranijibon.com
            </div>
          </div>
        `,
      });
      console.log(`✅ Email sent successfully to ${recipient}! Message ID: ${info.messageId}`);
    }
    console.log("\n=========================================");
    console.log("🎉 ALL TESTS PASSED! SMTP is fully working.");
    console.log("=========================================");
  } catch (sendErr) {
    console.error("❌ Failed to send email:", sendErr.message);
    console.error(sendErr);
    process.exit(1);
  }
}

testSMTP();
