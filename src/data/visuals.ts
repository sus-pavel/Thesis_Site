export type VisualDefinition = {
  id: string;
  title: string;
  dataFile: string;
  figureFile: string;
  kind: 'line' | 'map' | 'system' | 'matrix' | 'scatter' | 'clusters' | 'heatmap' | 'table' | 'flow' | 'bars' | 'emissions';
};

export const storyVisuals: VisualDefinition[] = [
  { id: 'energy-growth', title: 'Рост потребления электроэнергии в России и мире', dataFile: '/data/relevance/energy_growth.csv', figureFile: '/figures/relevance/energy_growth.svg', kind: 'line' },
  { id: 'diesel-map', title: 'ДЭС в изолированных и труднодоступных территориях', dataFile: '/data/relevance/diesel_sites.geojson', figureFile: '/figures/relevance/diesel_map.svg', kind: 'map' },
  { id: 'system-model', title: 'Автономный ЭТК с гибридной генерацией', dataFile: '/data/simulation/system_topology.json', figureFile: '/figures/system_model/hybrid_system.svg', kind: 'system' },
  { id: 'load-profile', title: 'Временные ряды нагрузки по фидерам', dataFile: '/data/load_profiles/placeholder_load_profile.csv', figureFile: '/figures/system_model/load_profiles.svg', kind: 'line' },
  { id: 'ssa-matrix', title: 'Траекторная матрица SSA', dataFile: '/data/ssa/components.csv', figureFile: '/figures/ssa/trajectory_matrix.svg', kind: 'matrix' },
  { id: 'ssa-components', title: 'Элементарные SSA-компоненты', dataFile: '/data/ssa/components.csv', figureFile: '/figures/ssa/ssa_components.svg', kind: 'line' },
  { id: 'amplitude-frequency', title: 'Амплитудно-частотная плоскость компонент', dataFile: '/data/ssa/component_features.csv', figureFile: '/figures/ssa/amplitude_frequency.svg', kind: 'scatter' },
  { id: 'patterns', title: 'Кластеры и реконструированные паттерны', dataFile: '/data/ssa/reconstructed_patterns.csv', figureFile: '/figures/ssa/reconstructed_patterns.svg', kind: 'clusters' },
  { id: 'drpi-line', title: 'Временной ряд DR PI', dataFile: '/data/drpi/drpi_timeseries.csv', figureFile: '/figures/drpi/drpi_timeseries.svg', kind: 'line' },
  { id: 'drpi-heatmap', title: 'Тепловая карта DR PI', dataFile: '/data/drpi/drpi_heatmap.csv', figureFile: '/figures/drpi/drpi_heatmap.svg', kind: 'heatmap' },
  { id: 'load-classes', title: 'Классификация электроприёмников', dataFile: '/data/load_classification/load_classes.csv', figureFile: '/figures/classification/load_classes.svg', kind: 'table' },
  { id: 'dr-actions', title: 'DR-воздействия для классов нагрузок', dataFile: '/data/load_classification/dr_actions.csv', figureFile: '/figures/classification/dr_actions.svg', kind: 'flow' },
  { id: 'optimization', title: 'Оптимизационный расчёт Matpower + CC-PSO', dataFile: '/data/load_classification/optimization_parameters.csv', figureFile: '/figures/optimization/matpower_ccpso.svg', kind: 'flow' },
  { id: 'scenario-comparison', title: 'Сравнение сценариев Base / DSM / BESS', dataFile: '/data/simulation/scenario_dsm.csv', figureFile: '/figures/results/scenario_comparison.svg', kind: 'bars' },
  { id: 'economics', title: 'Экономические показатели', dataFile: '/data/economics/economic_results.csv', figureFile: '/figures/results/economics.svg', kind: 'bars' },
  { id: 'emissions', title: 'Экологические показатели Scope 1', dataFile: '/data/emissions/scope1_results.csv', figureFile: '/figures/results/scope1.svg', kind: 'emissions' },
];
