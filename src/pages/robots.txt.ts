import type { APIRoute } from 'astro';
import { withBase } from '../i18n/config';

export const prerender = true;

export const GET: APIRoute = ({ site }) => {
  const origin = site ?? new URL('https://sus-pavel.github.io/Thesis_Site/');
  const sitemapUrl = new URL(withBase('/sitemap.xml'), origin).href;

  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemapUrl}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
