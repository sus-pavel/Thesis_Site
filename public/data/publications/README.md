# Публикации

`publications.json` — массив объектов:

- `id`: уникальный slug;
- `type`: `scopus`, `vak`, `conference`, `other`, `software`;
- `year`: целое;
- `titleRu`, `titleEn`: строки;
- `authors`: массив строк;
- `source`: журнал, сборник или реестр;
- `volume`, `issue`, `pages`: строки или `null`;
- `doi`: строка без `https://doi.org/` или `null`;
- `url`: полный URL или `null`;
- `relatedStatement`: `1`, `2` или `both`;
- `isPlaceholder`: boolean.

Не включайте непроверенные DOI. Для отсутствующего значения используйте `null`, не пустую строку.
