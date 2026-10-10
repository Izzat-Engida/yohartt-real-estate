import { getFloor } from '@/data/floors';

export type Enquiry = {
  name: string;
  phone: string;
  email: string;
  interest: string;
  floor: string;
  message: string;
  /** Honeypot — real visitors never see or fill this field. */
  website: string;
};

export type EnquiryField = keyof Enquiry;

const LIMITS: Record<EnquiryField, number> = {
  name: 100,
  phone: 30,
  email: 200,
  interest: 100,
  floor: 4,
  message: 2000,
  website: 200,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+\d][\d\s()-]{5,}$/;

export type ParseResult =
  | { ok: true; data: Enquiry }
  | { ok: false; fields: EnquiryField[] };

/** Validates untrusted input (from the browser or the API body). */
export function parseEnquiry(input: unknown): ParseResult {
  const raw = (typeof input === 'object' && input !== null ? input : {}) as Record<string, unknown>;
  const data = {} as Enquiry;
  for (const key of Object.keys(LIMITS) as EnquiryField[]) {
    const value = raw[key];
    data[key] = typeof value === 'string' ? value.trim().slice(0, LIMITS[key]) : '';
  }

  const invalid: EnquiryField[] = [];
  if (!data.name) invalid.push('name');
  if (!PHONE_RE.test(data.phone)) invalid.push('phone');
  if (data.email && !EMAIL_RE.test(data.email)) invalid.push('email');
  if (data.floor && !getFloor(data.floor)) invalid.push('floor');

  return invalid.length ? { ok: false, fields: invalid } : { ok: true, data };
}

export function enquirySubject(e: Enquiry): string {
  const floor = getFloor(e.floor);
  return `Enquiry — ${e.interest || 'General'}${floor ? `, ${floor.label}` : ''}`;
}

/** Plain-text summary used for Telegram, email and the mailto/WhatsApp fallbacks. */
export function enquiryText(e: Enquiry): string {
  const floor = getFloor(e.floor);
  return [
    `Name: ${e.name}`,
    `Phone: ${e.phone}`,
    e.email && `Email: ${e.email}`,
    e.interest && `Interested in: ${e.interest}`,
    floor && `Preferred level: ${floor.label} (${floor.zone.name})`,
    e.message && `\n${e.message}`,
  ]
    .filter(Boolean)
    .join('\n');
}
