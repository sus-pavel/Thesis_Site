# DR PI

- `drpi_timeseries.csv`: `timestamp`, `feeder_id`, `F1`, `F2`, `F3`, `DR_PI`, опционально `is_placeholder`;
- `drpi_heatmap.csv`: `day_type`, `hour`, `DR_PI`, опционально `sample_count`;
- `drpi_weights_sensitivity.csv`: `run_id`, `w_F1`, `w_F2`, `w_F3`, `mean_DR_PI`, `rank_correlation`;
- `pivot_delta.csv/json`: матрица изменений по фидерам и месяцам.

Ограничения:

- `F1`, `F2`, `F3`, `DR_PI` — числа `0…1`;
- `hour` — целое `0…23`;
- сумма весов `w_F1 + w_F2 + w_F3 = 1`;
- `day_type` используйте последовательно: `monday…sunday` либо `weekday/weekend`.
