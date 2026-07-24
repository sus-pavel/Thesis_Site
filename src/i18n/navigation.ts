import type { Language } from './config';
import { localizedHref } from './config';

type NavigationItem = {
  href: string;
  label: Record<Language, string>;
  localized?: Partial<Record<Language, boolean>>;
  visible?: Partial<Record<Language, boolean>>;
};

export const navigation: NavigationItem[] = [
  { href: '/', label: { ru: 'Главная', en: 'Home' } },
  { href: '/architecture', label: { ru: 'Архитектура', en: 'Architecture' } },
  { href: '/publications', label: { ru: 'Публикации', en: 'Publications' } },
  { href: '/downloads', label: { ru: 'Материалы', en: 'Downloads' } },
];

export function getNavigation(language: Language) {
  return navigation
    .filter((item) => item.visible?.[language] !== false)
    .map((item) => ({
      ...item,
      label: item.label[language],
      href: localizedHref(item.href, item.localized?.[language] === false ? 'ru' : language),
    }));
}
