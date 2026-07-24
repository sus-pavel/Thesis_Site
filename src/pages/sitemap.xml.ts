import type { APIRoute } from 'astro';
import { withBase } from '../i18n/config';

export const prerender = true;

const routes = [
  '/',
  '/architecture/',
  '/publications/',
  '/downloads/',
  '/en/',
  '/en/architecture/',
  '/en/publications/',
  '/en/downloads/',
];

const escapeXml = (value: string) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&apos;');

export const GET: APIRoute = ({ site }) => {
  const origin = site ?? new URL('https://sus-pavel.github.io/Thesis_Site/');
  const entries = routes
    .map((route) => `<url><loc>${escapeXml(new URL(withBase(route), origin).href)}</loc></url>`)
    .join('');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries}</urlset>`,
    {
      headers: { 'Content-Type': 'application/xml; charset=utf-8' },
    },
  );
};
