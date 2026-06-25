# Dissertation Scrollytelling Site

Статический билингвальный research-story сайт диссертационного исследования:

> «Управление спросом на электроэнергию автономных электротехнических комплексов путём идентификации паттернов и классификации нагрузок»

Автор: Сусликов Павел Константинович  
Специальность: 2.4.2. Электротехнические комплексы и системы

Проект построен на Astro, TypeScript, MDX, Tailwind CSS и подготовлен к подключению D3.js-графиков.

## 1. Запуск

Требуется Node.js 22.12+ и npm 9.6.5+ (требование Astro 7).

```bash
cd dissertation-scrollytelling-site
npm install
npm run dev
```

Astro покажет локальный адрес, обычно `http://localhost:4321`.

Полезные команды:

```bash
npm run check
npm run build
npm run preview
```

## 2. Страницы

- `/` — главная, аннотация и ключевые показатели;
- `/story` — двухколоночный scrollytelling из 16 сцен;
- `/statements` — положения, выносимые на защиту;
- `/publications` — публикации и программа для ЭВМ;
- `/downloads` — документы и наборы данных.

## 3. Куда добавлять данные

Все доступные браузеру данные хранятся в `public/data`:

```text
public/data/
  load_profiles/
  ssa/
  drpi/
  load_classification/
  simulation/
  economics/
  emissions/
  publications/
```

Каждая папка содержит README со схемой. CSV должны использовать UTF-8, запятую, точку как десятичный разделитель и ISO 8601 для времени.

Путь `public/data/ssa/component_features.csv` в компоненте или браузере превращается в `/data/ssa/component_features.csv`.

Важно: не восстанавливайте численные данные из PDF-графиков. Заменяйте демонстрационные строки только результатами авторских Python-скриптов.

## 4. Куда добавлять изображения

SVG/PNG/WebP размещаются в `public/figures`:

```text
public/figures/
  relevance/
  system_model/
  ssa/
  drpi/
  classification/
  optimization/
  results/
```

Рекомендуется SVG для схем и графиков. Имена ожидаемых файлов перечислены в `src/data/visuals.ts` и показаны прямо на placeholder-карточках.

## 5. Как заменить placeholder на реальный график

1. Добавьте проверенный CSV в нужную папку `public/data`.
2. Откройте соответствующий компонент в `src/components/visuals`.
3. Загрузите данные на клиенте:

```ts
const response = await fetch('/data/drpi/drpi_timeseries.csv');
const text = await response.text();
```

4. Разберите CSV через `d3.csvParse` или используйте `d3.csv`.
5. Отрисуйте SVG внутри React-компонента или Astro-компонента с клиентским скриптом.
6. В `src/components/scrollytelling/StickyVisual.astro` замените `PlaceholderVisual` на диспетчер реальных компонентов по `visual.id`.
7. Сохраните `data-visual` и `data-visual-panel`: они связывают текст и sticky-визуализацию.

Файлы `LoadProfileChart.tsx`, `SSAComponentsChart.tsx`, `AmplitudeFrequencyChart.tsx`, `DRPITimeSeriesChart.tsx`, `DRPIHeatmap.tsx` и `ScenarioComparisonChart.tsx` уже созданы как стартовые компоненты.

## 6. Как редактировать историю

Русский MDX:

- `src/content/ru/home.mdx`;
- `src/content/ru/story.mdx`;
- `src/content/ru/statements.mdx`;
- `src/content/ru/publications.mdx`;
- `src/content/ru/downloads.mdx`.

Scrollytelling-блок:

```mdx
<StoryStep
  visual="drpi-line"
  number="09"
  label="Количественная оценка"
  title="DR PI показывает потенциал DSM"
>
  Текст этапа.
</StoryStep>
```

`visual` должен совпадать с `id` в `src/data/visuals.ts`.

## 7. Как добавить английскую версию

Файлы-заготовки находятся в `src/content/en`. Переведите содержимое, сохраняя структуру компонентов и идентификаторы визуализаций.

Переключатель RU/EN:

- хранит выбор в `localStorage`;
- меняет `html[data-lang]`;
- показывает соответствующие `.language-content`;
- не требует создавать отдельные маршруты.

Если позднее понадобятся индексируемые локализованные URL (`/en/story`), существующий контент можно перенести в динамические маршруты Astro без изменения визуальных компонентов.

## 8. PDF для загрузки

Положите документы в `public/downloads`:

- `dissertation.pdf`;
- `autoreferat.pdf`;
- `presentation.pdf`;
- `brochure.pdf`.

Затем включите ссылки в `src/pages/downloads.astro`. Не создавайте пустые PDF-заглушки: пользователь должен видеть честный статус файла.

## 9. Production build

```bash
npm run build
```

Команда сначала выполняет `astro check`, затем создаёт статический сайт в `dist`.

Проверка локальной production-сборки:

```bash
npm run preview
```

## 10. Деплой

### Vercel

1. Импортируйте репозиторий.
2. Root Directory: `dissertation-scrollytelling-site`.
3. Build Command: `npm run build`.
4. Output Directory: `dist`.

### Netlify

1. Base directory: `dissertation-scrollytelling-site`.
2. Build command: `npm run build`.
3. Publish directory: `dissertation-scrollytelling-site/dist` (либо `dist`, если base directory уже задана).

### GitHub Pages

Для сайта проекта укажите в `astro.config.mjs`:

```js
export default defineConfig({
  site: 'https://USERNAME.github.io',
  base: '/REPOSITORY_NAME'
});
```

После этого используйте официальный GitHub Action для Astro. При размещении в корне пользовательского домена `base` не нужен.

## 11. Контроль перед публикацией

- `npm run build` завершается без ошибок;
- все пять маршрутов открываются;
- переключатель RU/EN сохраняет состояние;
- все 16 сцен `/story` переключают sticky-панель;
- ссылки навигации не ведут на 404;
- CSV соответствуют схемам README;
- источники и единицы измерения указаны;
- в публикациях нет placeholder-записей;
- кнопки PDF включены только для реально существующих файлов;
- проверены мобильная ширина, клавиатурная навигация и reduced motion.
