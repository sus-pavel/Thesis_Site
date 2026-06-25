# Моделирование

- `system_topology.json`: узлы `{id,type,label}` и связи `{source,target,capacity_mw}`;
- `scenario_base.csv`, `scenario_dsm.csv`: `hour`, мощности ДГУ/ВИЭ, `total_load_mw`;
- `scenario_bess.csv`: те же поля плюс `bess_mw`, опционально `soc`;
- `generator_dispatch.csv`: `hour`, `scenario`, `generator_id`, `p_mw`, `on`;
- `renewable_generation.csv`: доступная и использованная мощность PV/Wind;
- `load_profiles_24h.csv`: сопоставимые профили сценариев.

`hour` — `0…23`; знак `bess_mw` нужно описать в метаданных (рекомендуется: плюс — разряд, минус — заряд).
