import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import nodemailer from "nodemailer";

const bookingSchema = z.object({
  date: z.string().min(1).max(80),
  time: z.string().min(1).max(40),
  timezone: z.string().min(1).max(80),
  browser: z.string().min(1).max(300),
  isoDateTime: z.string().min(1).max(60),
  userEmail: z.string().optional(),
});

export type BookingInput = z.infer<typeof bookingSchema>;

/**
 * Emails the date and time confirmation directly via Gmail SMTP (or Resend API).
 */
export const notifyBooking = createServerFn({ method: "POST" })
  .validator((data: unknown) => bookingSchema.parse(data))
  .handler(async ({ data }) => {
    const gmailUser = process.env["GMAIL_USER"] || "surendraloke18@gmail.com";
    const gmailPass = process.env["GMAIL_APP_PASSWORD"];
    const adminEmail = process.env["ADMIN_EMAIL"] || "surendraloke18@gmail.com";
    const apiKey = process.env["RESEND_API_KEY"];
    const fromEmail = process.env["FROM_EMAIL"] ?? gmailUser;

    const recipients = [adminEmail];
    if (data.userEmail && data.userEmail.trim().length > 0 && data.userEmail !== adminEmail) {
      recipients.push(data.userEmail.trim());
    }

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0d0814; color: #f3ecfe; margin: 0; padding: 20px; }
          .card { max-width: 520px; margin: 0 auto; background: linear-gradient(135deg, rgba(30,19,54,0.9), rgba(15,10,28,0.95)); border: 1px solid rgba(255,255,255,0.12); border-radius: 24px; padding: 32px; box-shadow: 0 20px 40px rgba(0,0,0,0.6); }
          .header { text-align: center; margin-bottom: 28px; }
          .title { font-size: 26px; font-weight: 700; background: linear-gradient(90deg, #ff758c, #ff7eb3); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin: 0 0 8px; }
          .subtitle { font-size: 14px; color: #a49bbb; margin: 0; }
          .badge-container { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 20px; margin-bottom: 24px; }
          .info-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px dashed rgba(255,255,255,0.08); font-size: 15px; }
          .info-row:last-child { border-bottom: none; }
          .label { color: #b8afce; font-weight: 500; }
          .value { color: #ffffff; font-weight: 600; text-align: right; }
          .footer { text-align: center; font-size: 12px; color: #766d8f; margin-top: 24px; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="header">
            <h1 class="title">It's Official! Date Confirmed ❤️</h1>
            <p class="subtitle">A date has been scheduled with the following details:</p>
          </div>
          <div class="badge-container">
            <div class="info-row">
              <span class="label">📅 Date</span>
              <span class="value">${data.date}</span>
            </div>
            <div class="info-row">
              <span class="label">⏰ Time</span>
              <span class="value">${data.time}</span>
            </div>
            <div class="info-row">
              <span class="label">🌍 Timezone</span>
              <span class="value">${data.timezone}</span>
            </div>
            ${data.userEmail ? `<div class="info-row"><span class="label">✉️ Guest Email</span><span class="value">${data.userEmail}</span></div>` : ""}
          </div>
          <div class="footer">
            Sent automatically from your Date Dodger Application ✨
          </div>
        </div>
      </body>
      </html>`;

    // 1. Try Gmail SMTP with App Password first
    if (gmailUser && gmailPass) {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: gmailUser,
            pass: gmailPass,
          },
        });

        await transporter.sendMail({
          from: `"Date Dodger" <${gmailUser}>`,
          to: recipients.join(", "),
          subject: `Date Confirmed for ${data.date} at ${data.time} ❤️`,
          html,
        });

        console.log(`[booking] Email successfully sent via Gmail SMTP to: ${recipients.join(", ")}`);
        return { emailed: true as const, provider: "gmail" as const, reason: null, recipients };
      } catch (err) {
        console.error("[booking] Gmail SMTP send failed:", err);
      }
    }

    // 2. Fallback to Resend API if API Key is available
    if (apiKey) {
      try {
        const response = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            from: `Date Invitation <${fromEmail}>`,
            to: recipients,
            subject: `Date Confirmed for ${data.date} at ${data.time} ❤️`,
            html,
          }),
        });

        if (response.ok) {
          return { emailed: true as const, provider: "resend" as const, reason: null, recipients };
        }
      } catch (err) {
        console.error("[booking] Resend fetch exception:", err);
      }
    }

    console.warn("[booking] No valid email credentials could complete delivery.", { recipients, data });
    return { emailed: false as const, provider: null, reason: "dispatch_failed" as const, recipients };
  });


