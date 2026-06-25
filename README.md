# Что это за проект

Минималистичный статический сайт кандидатской диссертации на Astro. Главная страница построена как научный scrollytelling: MDX хранит нарратив, TypeScript — конфигурацию истории, Astro — layout, а небольшой vanilla TypeScript runtime связывает прокрутку с D3-визуализациями.

## Как запустить

```bash
npm install
npm run dev
```

Проверка production-сборки:

```bash
npm run build
npm run preview
```

## Структура файлов

- `src/pages/` — пять страниц сайта;
- `src/layouts/` — общий и scrollytelling layout;
- `src/components/ScrollySection.astro` — единственный контентный компонент;
- `src/scrolly/dissertation.ts` — метаданные и восемь состояний главной истории;
- `src/scrolly/runtime.ts` — Intersection Observer, progress bar, hash и mobile fallback;
- `src/scrolly/viz.ts` — все D3-визуализации;
- `src/styles/global.css` — визуальная система и responsive layout;
- `public/data/` — демонстрационные JSON;
- `public/materials/` — место для будущих материалов.

## Где менять текст

- главная история: `src/pages/index.mdx`;
- первое положение: `src/pages/position-1.mdx`;
- второе положение: `src/pages/position-2.mdx`;
- подписи и порядок визуализаций: `src/scrolly/dissertation.ts`;
- метаданные диссертации и hero: `src/scrolly/dissertation.ts`.

`id` каждого `<ScrollySection>` на главной должен совпадать с `id` секции в `dissertation.ts`.

## Где менять данные

- `public/data/main-data.json` — главная история;
- `public/data/position-1-data.json` — подробности первого положения;
- `public/data/position-2-data.json` — классы нагрузок, модели и эффекты;
- `public/data/publications.json` — публикации.

Все текущие записи демонстрационные и содержат `"isPlaceholder": true`.

## Как заменить placeholder JSON реальными результатами из Python

1. Экспортируйте результаты Python-пайплайна в JSON с теми же именами полей.
2. Сохраните временные метки в ISO 8601, например `2024-01-01T00:00:00+03:00`.
3. Замените соответствующие массивы в `public/data/*.json`.
4. Установите `"isPlaceholder": false` для реальных записей.
5. При необходимости обновите подписи, единицы и диапазоны в `src/scrolly/viz.ts`.
6. Уберите или измените бейдж «Демонстрационные данные» после полной замены данных.

Основные контракты: `loadTimeSeries`, `ssaPoints`, `patterns`, `drpiTimeSeries`, `drpiHeatmap`, `loadClasses`, `controlModels`, `effects`.

## Как добавить публикации

Добавьте объект в `public/data/publications.json` с полями `type`, `authors`, `title`, `source`, `year`, `doi`, `url`, `relatedPosition` и `isPlaceholder`. Допустимые значения `relatedPosition`: `position-1`, `position-2`, `both`.

## Как опубликовать на GitHub Pages

1. Создайте репозиторий GitHub и загрузите проект.
2. Выполните `npm run build`.
3. Публикуйте содержимое папки `dist/` через GitHub Actions или ветку Pages.
4. В GitHub выберите **Settings → Pages → Source: GitHub Actions**.

`astro.config.mjs` автоматически использует имя репозитория из `GITHUB_REPOSITORY` как `base` для project Pages. Для пользовательского репозитория вида `username.github.io` базовый путь остаётся `/`. При необходимости задайте канонический адрес через переменную `SITE_URL`.
