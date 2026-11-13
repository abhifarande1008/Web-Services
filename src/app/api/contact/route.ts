import { Resend } from "resend";
import { siteConfig } from "@/content/site";

const LIMITS = { name: 120, email: 200, whatsapp: 40, service: 120, budget: 80, message: 5000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Best-effort per-instance throttle; serverless instances don't share memory.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

function field(body: Record<string, unknown>, key: keyof typeof LIMITS) {
  const value = body[key];
  if (typeof value !== "string") return "";
  const clean = key === "message" ? value : value.replace(/[\r\n]+/g, " ");
  return clean.trim().slice(0, LIMITS[key]);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.RESEND_FROM_EMAIL || `${siteConfig.brand.name} <onboarding@resend.dev>`;

  if (!apiKey || !to) {
    console.error("Contact form: RESEND_API_KEY or CONTACT_TO_EMAIL is not set.");
    return Response.json(
      { error: "The contact form isn't set up yet. Please try again later." },
      { status: 503 }
    );
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return Response.json(
      { error: "Too many messages in a short time. Please try again in a few minutes." },
      { status: 429 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real visitors never see or fill the "company" field.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return Response.json({ ok: true });
  }

  const data = {
    name: field(body, "name"),
    email: field(body, "email"),
    whatsapp: field(body, "whatsapp"),
    service: field(body, "service"),
    budget: field(body, "budget"),
    message: field(body, "message"),
  };

  if (!data.name || !data.message) {
    return Response.json({ error: "Please add your name and a short message." }, { status: 400 });
  }
  if (!EMAIL_RE.test(data.email)) {
    return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const rows: [string, string][] = [
    ["Name", data.name],
    ["Email", data.email],
    ["Phone / WhatsApp", data.whatsapp || "-"],
    ["Service", data.service || "-"],
    ["Budget", data.budget || "-"],
  ];

  const text = [...rows.map(([k, v]) => `${k}: ${v}`), "", data.message].join("\n");
  const html = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;color:#1F1F1C;max-width:560px">
      <h2 style="margin:0 0 16px;font-size:18px">New enquiry from the website</h2>
      <table cellpadding="6" style="border-collapse:collapse;font-size:14px">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="color:#6B675E;padding-right:16px">${k}</td><td>${escapeHtml(v)}</td></tr>`
          )
          .join("")}
      </table>
      <p style="white-space:pre-wrap;font-size:14px;line-height:1.6;margin-top:16px;padding-top:16px;border-top:1px solid #DDD3C2">${escapeHtml(
        data.message
      )}</p>
    </div>`;

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to: to.split(",").map((addr) => addr.trim()).filter(Boolean),
    replyTo: data.email,
    subject: `Project enquiry: ${data.service || "General"} (${data.name})`,
    text,
    html,
  });

  if (error) {
    console.error("Contact form: Resend error", error);
    return Response.json(
      { error: "Your message couldn't be sent right now. Please try again in a minute." },
      { status: 502 }
    );
  }

  return Response.json({ ok: true });
}
