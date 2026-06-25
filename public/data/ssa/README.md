# SSA

Файлы:

- `components.csv`: `timestamp`, `component_id`, `value_kw`;
- `component_features.csv`: `component_id`, `frequency_cycles_per_day`, `period_hours`, `rms_amplitude_kw`, `relative_contribution`, `cluster_id`, `is_noise`, `is_placeholder`;
- `clusters.csv`: `component_id`, `cluster_id`, `cluster_label`, `distance_to_centroid`;
- `cluster_stats.csv`: агрегаты по кластерам;
- `reconstructed_patterns.csv`: `timestamp`, `pattern_id`, `pattern_label`, `p_kw`, `is_placeholder`.

`relative_contribution` хранится как доля `0…1`. Частота и период должны быть взаимно согласованы: `period_hours = 24 / frequency_cycles_per_day`.
