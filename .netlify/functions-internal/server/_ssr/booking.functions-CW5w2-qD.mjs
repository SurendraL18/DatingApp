import { o as __toESM } from "../_runtime.mjs";
import { c as createServerFn, i as TSS_SERVER_FUNCTION } from "./createServerFn-CIHAFgYl.mjs";
import { n as stringType, t as objectType } from "../_libs/zod.mjs";
import { t as require_nodemailer } from "../_libs/nodemailer.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/booking.functions-CW5w2-qD.js
var import_nodemailer = /* @__PURE__ */ __toESM(require_nodemailer());
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var bookingSchema = objectType({
	date: stringType().min(1).max(80),
	time: stringType().min(1).max(40),
	timezone: stringType().min(1).max(80),
	browser: stringType().min(1).max(300),
	isoDateTime: stringType().min(1).max(60),
	userEmail: stringType().optional()
});
var notifyBooking_createServerFn_handler = createServerRpc({
	id: "a6440baa0de4b59e656496a9ba84cd6245ddda76ea43436d801c58437acde2ff",
	name: "notifyBooking",
	filename: "src/lib/booking.functions.ts"
}, (opts) => notifyBooking.__executeServer(opts));
var notifyBooking = createServerFn({ method: "POST" }).validator((data) => bookingSchema.parse(data)).handler(notifyBooking_createServerFn_handler, async ({ data }) => {
	const gmailUser = process.env["GMAIL_USER"] || "surendraloke18@gmail.com";
	const gmailPass = process.env["GMAIL_APP_PASSWORD"];
	const adminEmail = process.env["ADMIN_EMAIL"] || "surendraloke18@gmail.com";
	const apiKey = process.env["RESEND_API_KEY"];
	const fromEmail = process.env["FROM_EMAIL"] ?? gmailUser;
	const recipients = [adminEmail];
	if (data.userEmail && data.userEmail.trim().length > 0 && data.userEmail !== adminEmail) recipients.push(data.userEmail.trim());
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
	if (gmailUser && gmailPass) try {
		await import_nodemailer.default.createTransport({
			service: "gmail",
			auth: {
				user: gmailUser,
				pass: gmailPass
			}
		}).sendMail({
			from: `"Date Dodger" <${gmailUser}>`,
			to: recipients.join(", "),
			subject: `Date Confirmed for ${data.date} at ${data.time} ❤️`,
			html
		});
		console.log(`[booking] Email successfully sent via Gmail SMTP to: ${recipients.join(", ")}`);
		return {
			emailed: true,
			provider: "gmail",
			reason: null,
			recipients
		};
	} catch (err) {
		console.error("[booking] Gmail SMTP send failed:", err);
	}
	if (apiKey) try {
		if ((await fetch("https://api.resend.com/emails", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${apiKey}`
			},
			body: JSON.stringify({
				from: `Date Invitation <${fromEmail}>`,
				to: recipients,
				subject: `Date Confirmed for ${data.date} at ${data.time} ❤️`,
				html
			})
		})).ok) return {
			emailed: true,
			provider: "resend",
			reason: null,
			recipients
		};
	} catch (err) {
		console.error("[booking] Resend fetch exception:", err);
	}
	console.warn("[booking] No valid email credentials could complete delivery.", {
		recipients,
		data
	});
	return {
		emailed: false,
		provider: null,
		reason: "dispatch_failed",
		recipients
	};
});
//#endregion
export { notifyBooking_createServerFn_handler };
