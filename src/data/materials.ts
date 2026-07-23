import { existsSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { withBase, type Language } from '../i18n/config';

type LocalizedText = Record<Language, string>;

interface MaterialDefinition {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  path: string;
  format: string;
  language: LocalizedText;
  pages?: number;
  dateLabel: LocalizedText;
  date: LocalizedText;
}

const materialDefinitions: MaterialDefinition[] = [
  {
    id: 'abstract',
    title: {
      ru: 'Автореферат',
      en: 'Dissertation Abstract',
    },
    description: {
      ru: 'Краткое изложение диссертации, основных положений, результатов и выводов.',
      en: 'A concise presentation of the dissertation, its main propositions, results, and conclusions.',
    },
    path: 'downloads/autoreferat.pdf',
    format: 'PDF',
    language: { ru: 'Русский', en: 'Russian' },
    pages: 24,
    dateLabel: {
      ru: 'Дата официальной публикации',
      en: 'Official publication date',
    },
    date: { ru: '14 июля 2026 года', en: '14 July 2026' },
  },
  {
    id: 'dissertation',
    title: {
      ru: 'Диссертация',
      en: 'Dissertation',
    },
    description: {
      ru: 'Полный текст диссертационного исследования.',
      en: 'The full text of the dissertation research.',
    },
    path: 'downloads/dissertation.pdf',
    format: 'PDF',
    language: { ru: 'Русский', en: 'Russian' },
    pages: 160,
    dateLabel: {
      ru: 'Дата официальной публикации',
      en: 'Official publication date',
    },
    date: { ru: '8 июля 2026 года', en: '8 July 2026' },
  },
  {
    id: 'presentation',
    title: {
      ru: 'Презентация',
      en: 'Defence Presentation',
    },
    description: {
      ru: 'Презентационные материалы к защите диссертационной работы.',
      en: 'Presentation materials prepared for the dissertation defence.',
    },
    path: 'downloads/presentation.pdf',
    format: 'PDF',
    language: { ru: 'Русский', en: 'Russian' },
    pages: 29,
    dateLabel: { ru: 'Дата защиты', en: 'Defence date' },
    date: { ru: '29 сентября 2026 года', en: '29 September 2026' },
  },
  {
    id: 'visualization-data',
    title: {
      ru: 'Данные для визуализации',
      en: 'Visualization Data',
    },
    description: {
      ru: 'Набор из 1393 наблюдений: дата и время, активная мощность P_kW и значения индекса DRFI. Предназначен для воспроизведения и анализа визуализации.',
      en: 'A dataset of 1,393 observations containing date and time, active power (P_kW), and DRFI index values for reproducing and analysing the visualization.',
    },
    path: 'data/drpi/data_for_visualization.csv',
    format: 'CSV',
    language: { ru: 'Язык данных не применим', en: 'Language-neutral data' },
    dateLabel: { ru: 'Дата набора данных', en: 'Dataset date' },
    date: { ru: '1 апреля 2026 года', en: '1 April 2026' },
  },
];

function formatFileSize(bytes: number, lang: Language) {
  const megabytes = bytes / 1024 / 1024;
  const kilobytes = bytes / 1024;
  const value = megabytes >= 1 ? megabytes : kilobytes;
  const unit = megabytes >= 1 ? (lang === 'ru' ? 'МБ' : 'MB') : (lang === 'ru' ? 'КБ' : 'KB');
  return `${new Intl.NumberFormat(lang === 'ru' ? 'ru-RU' : 'en-US', {
    maximumFractionDigits: 1,
  }).format(value)} ${unit}`;
}

export function getMaterials(lang: Language) {
  return materialDefinitions.map((item) => {
    const filePath = join(process.cwd(), 'public', item.path);
    const exists = existsSync(filePath);
    const bytes = exists ? statSync(filePath).size : 0;

    return {
      id: item.id,
      title: item.title[lang],
      description: item.description[lang],
      format: item.format,
      language: item.language[lang],
      pages: item.pages,
      dateLabel: item.dateLabel[lang],
      date: item.date[lang],
      exists,
      fileSize: exists ? formatFileSize(bytes, lang) : '',
      href: withBase(item.path),
    };
  });
}
