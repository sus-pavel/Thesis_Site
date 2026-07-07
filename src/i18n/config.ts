export const languages = ['ru', 'en'] as const;

export type Language = (typeof languages)[number];

export const defaultLanguage: Language = 'ru';

export const languagePrefixes: Record<Language, string> = {
  ru: '/',
  en: '/en/',
};

export const languageLabels: Record<Language, string> = {
  ru: 'RU',
  en: 'EN',
};

export function isLanguage(value: string | undefined): value is Language {
  return languages.includes(value as Language);
}

export function getRoutePath(href: string, language: Language = defaultLanguage) {
  const withoutBase = href.replace(import.meta.env.BASE_URL, '/');
  const withoutLanguage = languages.reduce((path, currentLanguage) => {
    const prefix = languagePrefixes[currentLanguage];
    return prefix !== '/' && path.startsWith(prefix) ? path.slice(prefix.length - 1) : path;
  }, withoutBase);
  const normalizedHref = withoutLanguage === '/' ? '' : withoutLanguage.replace(/^\/|\/$/g, '');
  const prefix = languagePrefixes[language];

  if (!normalizedHref) return prefix;
  return `${prefix}${normalizedHref}/`.replace(/\/{2,}/g, '/');
}

export function withBase(path: string, base = import.meta.env.BASE_URL) {
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;
  const normalizedPath = path.replace(/^\//, '');

  return `${normalizedBase}${normalizedPath}`;
}

export function localizedHref(href: string, language: Language = defaultLanguage) {
  return withBase(getRoutePath(href, language));
}
