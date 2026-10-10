import { NextResponse } from 'next/server';
import { enquirySubject, enquiryText, parseEnquiry } from '@/lib/enquiry';

/*
 * Receives the contact form and forwards it to Telegram and/or email (Resend).
 * Configure delivery with environment variables — see .env.example.
 * If nothing is configured it answers 503, and the form falls back to opening
 * the visitor's email app instead.
 */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
// Best-effort per-instance limit; enough to stop a single client hammering the form.
const recent = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  hits.push(now);
  recent.set(ip, hits);
  if (recent.size > 5000) recent.clear();
  return hits.length > MAX_PER_WINDOW;
}

async function sendTelegram(token: string, chatId: string, text: string) {
  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, disable_web_page_preview: true }),
  });
  if (!res.ok) throw new Error(`Telegram responded ${res.status}`);
}

async function sendEmail(apiKey: string, to: string, from: string, subject: string, text: string, replyTo?: string) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({ from, to: [to], subject, text, ...(replyTo ? { reply_to: replyTo } : {}) }),
  });
  if (!res.ok) throw new Error(`Resend responded ${res.status}`);
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  const parsed = parseEnquiry(body);
  if (!parsed.ok) {
    return NextResponse.json({ error: 'invalid', fields: parsed.fields }, { status: 400 });
  }
  const enquiry = parsed.data;

  // Bots fill the hidden field; pretend it worked and drop it.
  if (enquiry.website) return NextResponse.json({ ok: true });

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (rateLimited(ip)) {
    return NextResponse.json({ error: 'rate_limited' }, { status: 429 });
  }

  const subject = enquirySubject(enquiry);
  const text = `New website enquiry\n\n${enquiryText(enquiry)}`;
  const env = process.env;
  const deliveries: Promise<void>[] = [];

  if (env.TELEGRAM_BOT_TOKEN && env.TELEGRAM_CHAT_ID) {
    deliveries.push(sendTelegram(env.TELEGRAM_BOT_TOKEN, env.TELEGRAM_CHAT_ID, `${subject}\n\n${enquiryText(enquiry)}`));
  }
  if (env.RESEND_API_KEY && env.ENQUIRY_EMAIL_TO) {
    const from = env.ENQUIRY_EMAIL_FROM || 'Yohartt Website <onboarding@resend.dev>';
    deliveries.push(sendEmail(env.RESEND_API_KEY, env.ENQUIRY_EMAIL_TO, from, subject, text, enquiry.email || undefined));
  }

  if (!deliveries.length) {
    return NextResponse.json({ error: 'not_configured' }, { status: 503 });
  }

  const results = await Promise.allSettled(deliveries);
  const failures = results.filter((r): r is PromiseRejectedResult => r.status === 'rejected');
  failures.forEach((f) => console.error('[enquiry] delivery failed:', f.reason));

  if (failures.length === results.length) {
    return NextResponse.json({ error: 'delivery_failed' }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
