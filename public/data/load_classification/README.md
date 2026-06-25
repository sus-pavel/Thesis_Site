# Классификация нагрузок

- `load_classes.csv`: `class_id`, `class_ru`, `class_en`, `cycle_type`, `main_dr_action`, `key_constraint`;
- `dr_actions.csv`: `class_id`, `action_id`, `action_ru`, `action_en`, `enabled`;
- `optimization_parameters.csv`: `parameter`, `value`, `unit`, `description`.

Допустимые `class_id`: `variable`, `sliding`, `flexible`, `migrating`, `passive`. Не меняйте их после подключения визуализаций. Для численных ограничений можно добавить `min_value`, `max_value`, `penalty_weight`.
