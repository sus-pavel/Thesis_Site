export type VizType = "network" | "line" | "scatter" | "heatmap" | "bars" | "cards" | "flow";

export interface ScrollySectionConfig {
  id: string;
  navLabel: string;
  viz: {
    type: VizType;
    title: string;
    caption: string;
    dataKey: string;
  };
}

export const dissertationScrolly = {
  metadata: {
    title: "Управление спросом автономных электротехнических комплексов",
    subtitle: "Идентификация паттернов электропотребления и классификация электроприёмников",
    author: "Соискатель: имя будет добавлено",
    supervisor: "Научный руководитель: имя будет добавлено",
    specialty: "2.4.2. Электротехнические комплексы и системы"
  },
  hero: {
    label: "Кандидатская диссертация",
    title: "Управление спросом автономных электротехнических комплексов",
    subtitle: "От аудита гибкости нагрузки — к моделям управления и измеримым эффектам.",
    stats: [
      { value: "2", label: "научных положения" },
      { value: "5", label: "классов паттернов" },
      { value: "DRPI", label: "индекс потенциала" }
    ]
  },
  sections: [
    { id: "context", navLabel: "Контекст", viz: { type: "network", title: "Автономный электротехнический комплекс", caption: "Связи источников, накопителя и нагрузки в изолированной системе.", dataKey: "network" } },
    { id: "problem", navLabel: "Проблема", viz: { type: "cards", title: "Факторы, формирующие потребность в DR", caption: "Управление спросом начинается с проверки доступной гибкости.", dataKey: "problemFactors" } },
    { id: "ssa", navLabel: "SSA", viz: { type: "line", title: "Декомпозиция профиля электропотребления", caption: "Наблюдаемый ряд и три демонстрационные SSA-компоненты.", dataKey: "loadTimeSeries" } },
    { id: "amplitude-frequency", navLabel: "Компоненты", viz: { type: "scatter", title: "Амплитудно-частотная плоскость", caption: "Размер точки кодирует вклад компоненты в энергию сигнала.", dataKey: "ssaPoints" } },
    { id: "patterns", navLabel: "Паттерны", viz: { type: "cards", title: "Кластеры паттернов электропотребления", caption: "Повторяемые компоненты образуют интерпретируемые режимы.", dataKey: "patterns" } },
    { id: "drpi", navLabel: "DRPI", viz: { type: "line", title: "Динамика индекса DRPI", caption: "Высокое значение указывает на более выраженный потенциал управления спросом.", dataKey: "drpiTimeSeries" } },
    { id: "drpi-heatmap", navLabel: "Применимость", viz: { type: "heatmap", title: "Когда управление спросом применимо", caption: "Часовые окна потенциала по дням недели.", dataKey: "drpiHeatmap" } },
    { id: "effects", navLabel: "От аудита к эффектам", viz: { type: "flow", title: "Логика диссертационного исследования", caption: "Два научных положения связаны в единую прикладную цепочку.", dataKey: "effects" } }
  ] satisfies ScrollySectionConfig[]
};
