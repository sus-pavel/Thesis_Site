export type VisualDefinition = {
  id: string;
  title: string;
  dataFile: string;
  figureFile: string;
  kind: 'line' | 'map' | 'system' | 'matrix' | 'scatter' | 'clusters' | 'heatmap' | 'table' | 'flow' | 'bars' | 'emissions';
};

const base = import.meta.env.BASE_URL;
const publicPath = (path: string) => `${base}${path.replace(/^\//, '')}`;

export const storyVisuals: VisualDefinition[] = [
  { id: 'system-model', title: 'Автономный ЭТК с гибридной генерацией', dataFile: publicPath('/data/simulation/system_topology.json'), figureFile: publicPath('/figures/system_model/hybrid_system.svg'), kind: 'system' },
  { id: 'load-profile', title: 'Временные ряды нагрузки по фидерам', dataFile: publicPath('/data/load_profiles/placeholder_load_profile.csv'), figureFile: publicPath('/figures/load_profiles/load_profile_fragment.svg'), kind: 'line' },
  { id: 'ssa-matrix', title: 'Траекторная матрица SSA', dataFile: publicPath('/data/ssa/components.csv'), figureFile: publicPath('/figures/ssa/ssa_trajectory_matrix.svg'), kind: 'matrix' },
  { id: 'ssa-components', title: 'Элементарные SSA компоненты', dataFile: publicPath('/data/ssa/components.csv'), figureFile: publicPath('/figures/ssa/ssa_component_contribution.svg'), kind: 'line' },
  { id: 'amplitude-frequency', title: 'Амплитудно-частотная плоскость компонент', dataFile: publicPath('/data/ssa/component_features.csv'), figureFile: publicPath('/figures/ssa/ssa_amplitude_frequency_clusters.svg'), kind: 'scatter' },
  { id: 'patterns', title: 'Кластеры и реконструированные паттерны', dataFile: publicPath('/data/ssa/reconstructed_patterns.csv'), figureFile: publicPath('/figures/ssa/ssa_reconstructed_patterns.svg'), kind: 'clusters' },
  { id: 'drpi-line', title: 'Временной ряд DR PI', dataFile: publicPath('/data/drpi/drpi_timeseries.csv'), figureFile: publicPath('/figures/drpi/drpi_timeseries.svg'), kind: 'line' },
  { id: 'drpi-heatmap', title: 'Тепловая карта DR PI', dataFile: publicPath('/data/drpi/drpi_heatmap.csv'), figureFile: publicPath('/figures/drpi/drpi_heatmap_weekday_timeblock.svg'), kind: 'heatmap' },
  { id: 'load-classes', title: 'Классификация электроприёмников', dataFile: publicPath('/data/load_classification/load_classes.csv'), figureFile: publicPath('/figures/classification/load_classes.svg'), kind: 'table' },
  { id: 'dr-actions', title: 'DR-воздействия для классов нагрузок', dataFile: publicPath('/data/load_classification/dr_actions.csv'), figureFile: publicPath('/figures/classification/dr_actions.svg'), kind: 'flow' },
  { id: 'optimization', title: 'Оптимизационный расчёт Matpower + CC-PSO', dataFile: publicPath('/data/load_classification/optimization_parameters.csv'), figureFile: publicPath('/figures/optimization/matpower_ccpso.svg'), kind: 'flow' },
  { id: 'scenario-comparison', title: 'Сравнение сценариев Base / DSM / BESS', dataFile: publicPath('/data/simulation/scenario_dsm.csv'), figureFile: publicPath('/figures/results/scenario_comparison.svg'), kind: 'bars' },
  { id: 'economics', title: 'Экономические показатели', dataFile: publicPath('/data/economics/economic_results.csv'), figureFile: publicPath('/figures/results/economics.svg'), kind: 'bars' },
  { id: 'emissions', title: 'Экологические показатели Scope 1', dataFile: publicPath('/data/emissions/scope1_results.csv'), figureFile: publicPath('/figures/results/scope1.svg'), kind: 'emissions' },
];
