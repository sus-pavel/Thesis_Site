# Dissertation Scrollytelling Site

Статический билингвальный сайт диссертационного исследования:

> «Управление спросом на электроэнергию автономных электротехнических комплексов путём идентификации паттернов и классификации нагрузок»

Автор: Сусликов Павел Константинович  
Специальность: 2.4.2. Электротехнические комплексы и системы

Проект построен на Astro 5, TypeScript, MDX и Tailwind CSS. D3 оставлен для подключения интерактивных графиков по мере развития визуализаций.

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

## Страницы

- `/` — главная страница, аннотация и ключевые показатели;
- `/story` — scrollytelling из 14 сцен;
- `/statements` — положения, выносимые на защиту;
- `/publications` — публикации и программы для ЭВМ;
- `/downloads` — диссертация, автореферат, презентация и данные.
- `/en/` — placeholder главной английской версии;
- `/en/statements/` — placeholder английской страницы положений;
- `/en/publications/` — placeholder английской страницы публикаций;
- `/en/downloads/` — placeholder английской страницы материалов.

# Как вручную редактировать сайт

## Русская версия

Русские маршруты находятся в `src/pages/`:

- `src/pages/index.astro`;
- `src/pages/statements.astro`;
- `src/pages/publications.astro`;
- `src/pages/downloads.astro`;
- `src/pages/story.astro`.

Русский MDX-контент находится в `src/content/ru/`.

## Английская версия

Английские маршруты находятся в `src/pages/en/`:

- `src/pages/en/index.astro`;
- `src/pages/en/statements.astro`;
- `src/pages/en/publications.astro`;
- `src/pages/en/downloads.astro`.

Пока эти страницы содержат placeholder `English version is being prepared.`. Английский scrollytelling-маршрут `/en/story/` не создавался: русская scrollytelling-страница остаётся в `src/pages/story.astro`.

Английский MDX-контент-заготовка находится в `src/content/en/`.

## Как вручную переводить

1. Переводить тексты только вручную, без автоматической замены русских страниц.
2. Для английских страниц редактировать файлы в `src/pages/en/`.
3. Для английских MDX-текстов использовать `src/content/en/`.
4. Общие SEO-данные, короткое название сайта и подписи layout/header/footer редактировать в `src/i18n/site.ts`.
5. Навигационные подписи и правила локализации ссылок редактировать в `src/i18n/navigation.ts`.
6. Пути и языковые префиксы редактировать в `src/i18n/config.ts`.
7. Русскую версию трогать только при отдельной правке русского контента.

## Terminology / Терминология

При переводе английских страниц обязательно использовать `src/i18n/glossary.ts` как источник утверждённых терминов проекта. Если появляется новый спорный термин, сначала добавить его в словарь с `ru`, `en` и `note`, затем использовать в страницах.

## Какие файлы трогать

1. Главная русская страница и её крупные блоки редактируются в `src/pages/index.astro`.
2. Текст аннотации русской главной страницы редактируется в `src/content/ru/home.mdx`.
3. Полный русский scrollytelling редактируется в `src/content/ru/story.mdx`.
4. Текст первого и второго положений редактируется в `src/content/ru/statements.mdx`.
5. Навигация хранится в `src/i18n/navigation.ts`, а базовая оболочка — в `src/layouts/BaseLayout.astro`.
6. Порядок сцен и соответствие текстовых секций визуализациям редактируются в `src/data/visuals.ts`.
7. Логика переключения визуализаций при прокрутке находится в `src/components/scrollytelling/ScrollStory.astro`.
8. Единая SVG-логика визуальных сцен находится в `src/components/visuals/PlaceholderVisual.astro`.
9. Данные графиков лежат в `public/data/`, а готовые изображения — в `public/figures/`.
10. Публикации редактируются в `public/data/publications/publications.json`.
11. PDF-файлы заменяются в `public/downloads/` без изменения их имён.
12. Даты на странице материалов задаются вручную в `publicationDate` внутри `src/pages/downloads.astro`.
13. Общий внешний вид редактируется в `src/styles/global.css`. Стили отдельной страницы или компонента находятся в блоке `<style>` в соответствующем `.astro`-файле.

Важно: значение `visual` у каждого `StoryStep` в `src/content/ru/story.mdx` должно совпадать с `id` сцены в `src/data/visuals.ts`.

Переключатель языка сейчас не отображается. Реальные английские маршруты находятся под `/en/`.

# Что не нужно редактировать без необходимости

- `astro.config.mjs` — настройки сборки, GitHub Pages и интеграций Astro;
- `tsconfig.json` — правила TypeScript;
- `package.json` и `package-lock.json` — зависимости и команды проекта;
- `tailwind.config.mjs` — настройка обработки CSS;
- `src/components/scrollytelling/ScrollStory.astro` — runtime прокрутки;
- `src/components/visuals/PlaceholderVisual.astro` — логика визуальных сцен;
- `src/layouts/BaseLayout.astro` — HTML-оболочка, metadata, canonical/alternate links и глобальное подключение стилей.

Эти файлы лучше менять только при изменении архитектуры, сборки или поведения визуализаций.

## Карта данных и материалов

```text
public/
  data/
    drpi/                 данные и расчёты DR PI
    economics/            экономические показатели
    emissions/            показатели Scope 1
    experiments/          результаты проверок устойчивости
    load_classification/  классы нагрузок и параметры управления
    load_profiles/        профили нагрузки
    publications/         публикации
    relevance/            данные актуальности исследования
    simulation/           сценарии и модель энергосистемы
    ssa/                  данные SSA и реконструированные паттерны
  downloads/              PDF и файл данных для скачивания
  figures/                готовые SVG/PNG исследования
```

Файлы в `public/` доступны браузеру от корня сайта. Например, `public/data/drpi/drpi_timeseries.csv` публикуется как `/data/drpi/drpi_timeseries.csv`.

## Production build и GitHub Pages

```bash
npm run build
```

Команда выполняет `astro check`, затем создаёт статический сайт в `dist`.

`astro.config.mjs` автоматически использует имя репозитория как `base` в GitHub Actions через переменную `GITHUB_REPOSITORY`. Для собственного домена можно передать `SITE_URL`.

## Контроль перед публикацией

- `npm run build` завершается без ошибок;
- открываются русские маршруты и placeholder-маршруты `/en/`;
- все 14 сцен `/story` переключают визуальную панель;
- ссылки навигации и скачивания не ведут на 404;
- публикации и PDF содержат финальные материалы;
- проверены desktop, мобильная ширина и консоль браузера.
