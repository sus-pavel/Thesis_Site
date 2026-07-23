# Сайт диссертационного исследования

Статический билингвальный сайт диссертационного исследования:

> «Управление спросом на электроэнергию автономных электротехнических комплексов путём идентификации паттернов и классификации нагрузок»

Автор: Сусликов Павел Константинович  
Специальность: 2.4.2. Электротехнические комплексы и системы

Проект построен на Astro 5, TypeScript, MDX и Tailwind CSS. Основная интерактивная страница — архитектура решения с тремя масштабируемыми сценами.

## Запуск

Рекомендуется Node.js 20.10+ или 22 LTS.

```bash
npm install
npm run dev
```

Основные команды:

```bash
npm run check
npm run build
npm run preview
```

## Действующие маршруты

- `/` — русская главная страница;
- `/architecture/` — интерактивная архитектура решения;
- `/publications/` — публикации и программы для ЭВМ;
- `/downloads/` — диссертация, автореферат, презентация и данные;
- `/en/` — английская главная страница;
- `/en/publications/` — английская страница публикаций;
- `/en/downloads/` — английская страница материалов.

У `/architecture/` пока нет отдельной английской версии, поэтому этот маршрут не показывается в английской навигации.

## Как вручную редактировать сайт

### Страницы и тексты

- Главная RU: `src/pages/index.astro` и `src/content/ru/home.mdx`.
- Главная EN: `src/pages/en/index.astro` и `src/content/en/home.mdx`.
- Публикации: `src/pages/publications.astro`, `src/pages/en/publications.astro` и `public/data/publications/publications.json`.
- Материалы RU/EN и даты публикации: `src/pages/downloads.astro` и `src/pages/en/downloads.astro`.
- Вводные тексты страниц материалов и публикаций: `src/content/{ru,en}/downloads.mdx` и `src/content/{ru,en}/publications.mdx`.
- PDF: `public/downloads/`; скачиваемый CSV: `public/data/drpi/data_for_visualization.csv`.

### Архитектура решения

- Названия сцен, размеры, начальные узлы и все описания узлов: `src/components/architecture/architectureScenes.ts`.
- Интерактивный runtime, панель описания и стили страницы: `src/components/architecture/ArchitectureExplorer.astro`.
- SVG-разметка трёх сцен: `src/components/architecture/scenes/*.astro`.
- Исходник генерации формул: `scripts/render_architecture_formulas.sh`.
- Используемые SVG-формулы: `public/architecture/formulas/*.svg`.

Значение `data-detail-id` у кликабельного узла или формулы в `scenes/*.astro` должно совпадать с ключом в `details` соответствующей сцены в `architectureScenes.ts`.

### Оболочка и локализация

- Навигация и видимость маршрутов: `src/i18n/navigation.ts`.
- Языковые префиксы и base-aware пути: `src/i18n/config.ts`.
- Переводы оболочки, SEO-тексты и подписи footer: `src/i18n/site.ts`.
- Утверждённые термины RU/EN: `src/i18n/glossary.ts`.
- Общая HTML-оболочка: `src/layouts/BaseLayout.astro`.
- Header, footer и переключатель языка: `src/components/layout/`.
- Общие стили: `src/styles/global.css`; локальные стили находятся в `<style>` соответствующего Astro-компонента.

При переводе английских страниц используйте `src/i18n/glossary.ts` как источник утверждённых терминов. Новый спорный термин сначала добавляется в словарь с полями `ru`, `en` и `note`.

## Данные и материалы

```text
public/
  architecture/formulas/  SVG-формулы интерактивной архитектуры
  data/
    drpi/                  данные и расчёты DR PI
    economics/             экономические показатели
    emissions/             показатели Scope 1
    load_classification/   классы нагрузок и параметры управления
    publications/          данные страницы публикаций
    simulation/            сценарии и модель энергосистемы
    ssa/                   данные SSA
  downloads/               PDF-материалы
  figures/                 научные SVG/PNG-иллюстрации
```

Активные страницы напрямую читают `publications.json`; `data_for_visualization.csv` и PDF доступны для скачивания. Остальные научные наборы и изображения сохранены как материалы исследования, даже если текущие маршруты их не загружают.

Любой файл в `public/` попадает в опубликованный сайт. Не размещайте там черновые, демонстрационные или placeholder-данные.

## Что не нужно редактировать без необходимости

- `astro.config.mjs` — сборка, интеграции и GitHub Pages `base`;
- `tsconfig.json` — правила TypeScript;
- `package.json` и `package-lock.json` — зависимости и команды;
- `tailwind.config.mjs` — конфигурация Tailwind;
- `src/content.config.ts` — конфигурация MDX Content Collections;
- `dist/`, `.astro/` и `node_modules/` — генерируемые или установленные файлы.

## Production build и GitHub Pages

```bash
npm run build
```

Команда сначала выполняет `astro check`, затем создаёт статический сайт в `dist/`.

В GitHub Actions `astro.config.mjs` получает имя репозитория из `GITHUB_REPOSITORY` и автоматически задаёт `base`. Локальная проверка сборки для project page:

```bash
GITHUB_REPOSITORY=owner/Thesis_Site npm run build
```

Для собственного домена можно передать `SITE_URL`.

## Контроль перед публикацией

- `npm ls` подтверждает согласованность установленного дерева и lockfile;
- `npm run check` завершается без ошибок;
- `npm run build` собирает все семь маршрутов;
- отдельная сборка с `GITHUB_REPOSITORY=owner/Thesis_Site` не содержит сломанных base-aware путей;
- все внутренние ссылки и скачиваемые файлы открываются;
- на `/architecture/` переключаются три сцены, открываются описания и формулы, работает масштабирование;
- desktop и мобильная ширина не имеют горизонтального переполнения;
- в консоли браузера нет относящихся к приложению warnings/errors.
