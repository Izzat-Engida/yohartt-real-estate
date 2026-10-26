/**
 * Company-wide settings. Edit contact details here — every section reads from this file.
 * TODO: replace the placeholder phone, WhatsApp number and email with the real ones.
 */
export const site = {
  name: 'Yohart Properties',
  shortName: 'Yohart',
  tagline: 'Raising Addis, floor by floor.',
  description:
    'Yohart Properties develops modern residential towers in Addis Ababa, Ethiopia. Explore Yohart Tower floor by floor, follow our construction progress, and book a site visit.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  city: 'Addis Ababa',
  country: 'Ethiopia',
  phone: { display: '+251 900 000 000', href: 'tel:+251900000000' },
  email: 'hello@yohartt.com',
  /** International format, digits only — used for wa.me links. */
  whatsapp: '251900000000',
  socials: [
    { name: 'Instagram', href: 'https://www.instagram.com/yohartproperties/' },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/company/yohart-properties' },
    { name: 'Facebook', href: 'https://www.facebook.com/yohartproperties' },
  ],
} as const;

export const socialLinks = site.socials;
export type SocialLink = (typeof socialLinks)[number];

export const navLinks = [
  { href: '/#about', label: 'About' },
  { href: '/#location', label: 'Location' },
  { href: '/#residences', label: 'Residences' },
  { href: '/#tower', label: 'The Tower' },
  { href: '/#process', label: 'Process' },
  { href: '/#delivered', label: 'Delivered' },
  { href: '/#contact', label: 'Contact' },
] as const;

export const enquiryInterests = [
  'Yohartt Tower',
  'Completed units',
  'Investment opportunities',
  'Something else',
] as const;

export type EnquiryInterest = (typeof enquiryInterests)[number];
