import type { Language } from './config';

type SiteLocaleConfig = {
  title: string;
  footerTitle: string;
  shortTitle: string;
  author: string;
  specialty: string;
  description: string;
  organization: string;
  footerFormat: string;
};

export const siteLocales: Record<Language, SiteLocaleConfig> = {
  ru: {
    title: 'Управление спросом на электроэнергию автономных электротехнических комплексов',
    footerTitle:
      'Управление спросом на электроэнергию автономных электротехнических комплексов путём идентификации паттернов и классификации нагрузок',
    shortTitle: 'Диссертация · Сусликов ПК',
    author: 'Сусликов Павел Константинович',
    specialty: '2.4.2. Электротехнические комплексы и системы',
    description:
      'Интерактивное представление диссертационного исследования по идентификации паттернов, классификации нагрузок и управлению спросом.',
    organization: 'Санкт-Петербургский горный университет императрицы Екатерины II',
    footerFormat: 'статический исследовательский сайт',
  },
  en: {
    title: 'Demand-side management for autonomous electrical engineering complexes',
    footerTitle:
      'Demand-side management for autonomous electrical engineering complexes through pattern identification and load classification',
    shortTitle: 'Dissertation · Pavel Suslikov',
    author: 'Pavel K. Suslikov',
    specialty: '2.4.2. Electrical Engineering Complexes and Systems',
    description:
      'Interactive presentation of a dissertation research project on pattern identification, load classification, and demand-side management.',
    organization: 'Empress Catherine II Saint Petersburg Mining University',
    footerFormat: 'static research website',
  },
};

export const siteUi: Record<Language, Record<string, string>> = {
  ru: {
    homeAria: 'На главную',
    primaryNavigation: 'Основная навигация',
    thesis: 'Диссертация',
    author: 'Автор:',
    organization: 'Выполнено в:',
    specialty: 'Специальность:',
    format: 'Формат:',
    downloadMaterials: 'Скачать материалы',
    contactAuthor: 'Связаться с автором',
    authorSocials: 'Социальные сети автора',
  },
  en: {
    homeAria: 'Go to homepage',
    primaryNavigation: 'Primary navigation',
    thesis: 'Dissertation',
    author: 'Author:',
    organization: 'Prepared at:',
    specialty: 'Specialty:',
    format: 'Format:',
    downloadMaterials: 'Download materials',
    contactAuthor: 'Contact the author',
    authorSocials: 'Author social links',
  },
};
