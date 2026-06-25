import * as d3 from "d3";

type Row = Record<string, string | number | boolean>;

const colors = {
  blue: "#52a6ff",
  green: "#62d98b",
  amber: "#f4b740",
  alert: "#ff6b45",
  purple: "#a78bfa",
  paper: "#eef4f8",
  muted: "#91a1b5",
  line: "#26364a",
  panel: "#0a1726"
};

const clusterColors = [colors.blue, colors.green, colors.amber, colors.alert, colors.purple];

function frame(container: HTMLElement, height = 430) {
  container.replaceChildren();
  const width = Math.max(container.clientWidth || 680, 320);
  return d3.select(container).append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("role", "img")
    .attr("aria-label", container.closest("[data-viz-panel]")?.querySelector("h2")?.textContent || "График")
    .style("width", "100%")
    .style("height", "auto");
}

function axisStyle(selection: d3.Selection<SVGGElement, unknown, null, undefined>) {
  selection.selectAll("path, line").attr("stroke", colors.line);
  selection.selectAll("text").attr("fill", colors.muted).style("font-size", "11px");
}

export function renderLineChart(container: HTMLElement, raw: Row[]) {
  const svg = frame(container);
  const width = Number(svg.attr("viewBox").split(" ")[2]);
  const height = 430;
  const margin = { top: 28, right: 22, bottom: 48, left: 54 };
  const rows = raw.map((d) => ({ raw: d, date: new Date(String(d.timestamp)) }));
  const keys = "drpiValue" in (raw[0] || {}) ? ["drpiValue"] : ["originalLoadKw", "component1Kw", "component2Kw", "component3Kw"];
  const labels: Record<string, string> = { originalLoadKw: "Нагрузка", component1Kw: "Компонента 1", component2Kw: "Компонента 2", component3Kw: "Компонента 3", drpiValue: "DRPI" };
  const x = d3.scaleTime().domain(d3.extent(rows, (d) => d.date) as [Date, Date]).range([margin.left, width - margin.right]);
  const yMax = d3.max(rows, (d) => d3.max(keys, (key) => Number(d.raw[key]))) || 1;
  const y = d3.scaleLinear().domain([0, yMax * 1.08]).nice().range([height - margin.bottom, margin.top]);
  type LineDatum = { date: Date; value: number };
  const line = d3.line<LineDatum>().x((d) => x(d.date)).y((d) => y(d.value));

  svg.append("g").attr("transform", `translate(0,${height - margin.bottom})`).call(d3.axisBottom(x).ticks(5).tickFormat(d3.timeFormat("%H:%M") as never)).call(axisStyle);
  svg.append("g").attr("transform", `translate(${margin.left},0)`).call(d3.axisLeft(y).ticks(5)).call(axisStyle);
  svg.append("g").selectAll("line").data(y.ticks(5)).join("line")
    .attr("x1", margin.left).attr("x2", width - margin.right).attr("y1", (d) => y(d)).attr("y2", (d) => y(d))
    .attr("stroke", colors.line).attr("stroke-dasharray", "2 6");

  keys.forEach((key, index) => {
    const series: LineDatum[] = rows.map((d) => ({ date: d.date, value: Number(d.raw[key]) }));
    svg.append("path").datum(series).attr("fill", "none").attr("stroke", clusterColors[index])
      .attr("stroke-width", index === 0 ? 2.5 : 1.7).attr("d", line);
  });

  const legend = svg.append("g").attr("transform", `translate(${margin.left},8)`);
  keys.forEach((key, index) => {
    const item = legend.append("g").attr("transform", `translate(${index * 128},0)`);
    item.append("line").attr("x2", 18).attr("y1", 6).attr("y2", 6).attr("stroke", clusterColors[index]).attr("stroke-width", 2);
    item.append("text").attr("x", 24).attr("y", 10).attr("fill", colors.muted).style("font-size", "10px").text(labels[key]);
  });
}

export function renderScatterPlot(container: HTMLElement, raw: Row[]) {
  const svg = frame(container);
  const width = Number(svg.attr("viewBox").split(" ")[2]);
  const height = 430;
  const margin = { top: 30, right: 30, bottom: 54, left: 60 };
  const x = d3.scaleLog().domain([2, (d3.max(raw, (d) => Number(d.periodHours)) || 168) * 1.25]).range([margin.left, width - margin.right]);
  const y = d3.scaleLinear().domain([0, (d3.max(raw, (d) => Number(d.amplitudeKw)) || 80) * 1.18]).range([height - margin.bottom, margin.top]);
  const r = d3.scaleSqrt().domain([0, d3.max(raw, (d) => Number(d.energyContributionPercent)) || 30]).range([5, 18]);

  svg.append("g").attr("transform", `translate(0,${height - margin.bottom})`).call(d3.axisBottom(x).tickValues([3, 8, 12, 24, 48, 168]).tickFormat((d) => `${d} ч`)).call(axisStyle);
  svg.append("g").attr("transform", `translate(${margin.left},0)`).call(d3.axisLeft(y).ticks(5)).call(axisStyle);
  svg.append("text").attr("x", width / 2).attr("y", height - 10).attr("text-anchor", "middle").attr("fill", colors.muted).style("font-size", "11px").text("Характерный период");
  svg.append("text").attr("transform", "rotate(-90)").attr("x", -height / 2).attr("y", 14).attr("text-anchor", "middle").attr("fill", colors.muted).style("font-size", "11px").text("Амплитуда, кВт");

  const points = svg.append("g").selectAll("g").data(raw).join("g");
  points.append("circle").attr("cx", (d) => x(Number(d.periodHours))).attr("cy", (d) => y(Number(d.amplitudeKw)))
    .attr("r", (d) => r(Number(d.energyContributionPercent))).attr("fill", (d) => clusterColors[(Number(d.clusterId) - 1) % clusterColors.length])
    .attr("fill-opacity", 0.72).attr("stroke", colors.paper).attr("stroke-width", 1);
  points.append("text").attr("x", (d) => x(Number(d.periodHours))).attr("y", (d) => y(Number(d.amplitudeKw)) - r(Number(d.energyContributionPercent)) - 6)
    .attr("text-anchor", "middle").attr("fill", colors.paper).style("font-size", "10px").text((d) => String(d.componentId));
}

export function renderHeatmap(container: HTMLElement, raw: Row[]) {
  const svg = frame(container);
  const width = Number(svg.attr("viewBox").split(" ")[2]);
  const height = 430;
  const margin = { top: 34, right: 26, bottom: 48, left: 52 };
  const days = Array.from(new Set(raw.map((d) => String(d.dayOfWeek))));
  const hours = Array.from(new Set(raw.map((d) => Number(d.hour)))).sort((a, b) => a - b);
  const x = d3.scaleBand<number>().domain(hours).range([margin.left, width - margin.right]).padding(0.08);
  const y = d3.scaleBand<string>().domain(days).range([margin.top, height - margin.bottom]).padding(0.08);
  const color = d3.scaleSequential(d3.interpolateRgb("#10243a", colors.blue)).domain([0, 1]);

  svg.append("g").attr("transform", `translate(0,${height - margin.bottom})`).call(d3.axisBottom(x).tickFormat((d) => `${d}:00`)).call(axisStyle);
  svg.append("g").attr("transform", `translate(${margin.left},0)`).call(d3.axisLeft(y)).call(axisStyle);
  svg.append("g").selectAll("rect").data(raw).join("rect")
    .attr("x", (d) => x(Number(d.hour)) || 0).attr("y", (d) => y(String(d.dayOfWeek)) || 0)
    .attr("width", x.bandwidth()).attr("height", y.bandwidth()).attr("rx", 3)
    .attr("fill", (d) => color(Number(d.drpiValue)));
  svg.append("g").selectAll("text").data(raw).join("text")
    .attr("x", (d) => (x(Number(d.hour)) || 0) + x.bandwidth() / 2)
    .attr("y", (d) => (y(String(d.dayOfWeek)) || 0) + y.bandwidth() / 2 + 4)
    .attr("text-anchor", "middle").attr("fill", colors.paper).style("font-size", "10px")
    .text((d) => Number(d.drpiValue).toFixed(2));
}

export function renderBars(container: HTMLElement, raw: Row[]) {
  const svg = frame(container, 390);
  const width = Number(svg.attr("viewBox").split(" ")[2]);
  const margin = { top: 24, right: 45, bottom: 38, left: 180 };
  const valueKey = "flexibility" in (raw[0] || {}) ? "flexibility" : "baseline";
  const labelKey = "label" in (raw[0] || {}) ? "label" : "metric";
  const max = d3.max(raw, (d) => Math.max(Number(d[valueKey]), Number(d.afterDr || 0))) || 100;
  const y = d3.scaleBand().domain(raw.map((d) => String(d[labelKey]))).range([margin.top, 350]).padding(0.3);
  const x = d3.scaleLinear().domain([0, max * 1.1]).range([margin.left, width - margin.right]);
  svg.append("g").attr("transform", `translate(0,350)`).call(d3.axisBottom(x).ticks(5)).call(axisStyle);
  svg.append("g").attr("transform", `translate(${margin.left},0)`).call(d3.axisLeft(y).tickSize(0)).call(axisStyle);
  svg.selectAll(".bar").data(raw).join("rect").attr("class", "bar")
    .attr("x", margin.left).attr("y", (d) => y(String(d[labelKey])) || 0)
    .attr("width", (d) => x(Number(d[valueKey])) - margin.left).attr("height", y.bandwidth())
    .attr("fill", (d) => String(d.color || colors.blue)).attr("rx", 3).attr("opacity", 0.82);
  if ("afterDr" in (raw[0] || {})) {
    svg.selectAll(".after").data(raw).join("rect").attr("class", "after")
      .attr("x", margin.left).attr("y", (d) => (y(String(d[labelKey])) || 0) + y.bandwidth() * 0.55)
      .attr("width", (d) => x(Number(d.afterDr)) - margin.left).attr("height", y.bandwidth() * 0.45)
      .attr("fill", colors.green).attr("rx", 2);
  }
}

export function renderCards(container: HTMLElement, raw: Row[]) {
  container.replaceChildren();
  const fallback = [
    { label: "Стоимость топлива", value: "Высокая", color: colors.amber },
    { label: "Резерв мощности", value: "Ограничен", color: colors.alert },
    { label: "Изменчивость ВИЭ", value: "Переменная", color: colors.green },
    { label: "Пики нагрузки", value: "Критичны", color: colors.alert },
    { label: "Потенциал DR", value: "Требует аудита", color: colors.blue }
  ];
  const rows = raw.length ? raw : fallback;
  const grid = d3.select(container).append("div").attr("class", "d3-card-grid");
  const cards = grid.selectAll("article").data(rows).join("article").style("border-color", (d) => String(d.color || colors.line));
  cards.append("span").attr("class", "card-marker").style("background", (d) => String(d.color || colors.blue));
  cards.append("h3").text((d) => String(d.label || d.metric));
  cards.append("strong").text((d) => {
    if (d.sharePercent) return `${d.sharePercent}%`;
    if (d.value !== undefined) return `${d.value}${d.unit ? ` ${d.unit}` : ""}`;
    return String(d.period || "");
  });
  cards.append("p").text((d) => String(d.period || d.value || d.unit || ""));
}

export function renderNetworkDiagram(container: HTMLElement) {
  const svg = frame(container);
  const width = Number(svg.attr("viewBox").split(" ")[2]);
  const nodes = [
    { x: width * 0.18, y: 115, label: "Дизельная\nгенерация", color: colors.amber, icon: "DG" },
    { x: width * 0.18, y: 315, label: "ВИЭ", color: colors.green, icon: "RES" },
    { x: width * 0.5, y: 215, label: "Шина\nпеременного тока", color: colors.paper, icon: "AC" },
    { x: width * 0.82, y: 115, label: "Накопитель", color: colors.purple, icon: "BESS" },
    { x: width * 0.82, y: 315, label: "Нагрузка", color: colors.blue, icon: "LOAD" }
  ];
  const edges = [[0, 2], [1, 2], [2, 3], [2, 4]];
  svg.append("g").selectAll("line").data(edges).join("line")
    .attr("x1", (d) => nodes[d[0]].x).attr("y1", (d) => nodes[d[0]].y)
    .attr("x2", (d) => nodes[d[1]].x).attr("y2", (d) => nodes[d[1]].y)
    .attr("stroke", (d) => nodes[d[0]].color).attr("stroke-width", 2);
  const group = svg.append("g").selectAll("g").data(nodes).join("g").attr("transform", (d) => `translate(${d.x},${d.y})`);
  group.append("circle").attr("r", 43).attr("fill", colors.panel).attr("stroke", (d) => d.color).attr("stroke-width", 2);
  group.append("text").attr("text-anchor", "middle").attr("y", 5).attr("fill", (d) => d.color).style("font-size", "12px").style("font-weight", "700").text((d) => d.icon);
  group.append("text").attr("text-anchor", "middle").attr("y", 69).attr("fill", colors.paper).style("font-size", "12px")
    .selectAll("tspan").data((d) => d.label.split("\n")).join("tspan").attr("x", 0).attr("dy", (_, i) => i ? 15 : 0).text((d) => d);
}

export function renderFlowDiagram(container: HTMLElement, raw: Row[]) {
  const svg = frame(container);
  const width = Number(svg.attr("viewBox").split(" ")[2]);
  const labels = ["SSA", "Паттерны", "DRPI", "Классы\nнагрузок", "Модели\nуправления", "Эффекты"];
  const x = d3.scalePoint().domain(d3.range(labels.length).map(String)).range([55, width - 55]);
  svg.append("line").attr("x1", 55).attr("x2", width - 55).attr("y1", 185).attr("y2", 185).attr("stroke", colors.line).attr("stroke-width", 3);
  const groups = svg.selectAll("g.step").data(labels).join("g").attr("class", "step").attr("transform", (_, i) => `translate(${x(String(i))},185)`);
  groups.append("circle").attr("r", 30).attr("fill", colors.panel).attr("stroke", (_, i) => clusterColors[i % clusterColors.length]).attr("stroke-width", 2);
  groups.append("text").attr("text-anchor", "middle").attr("y", 56).attr("fill", colors.paper).style("font-size", "11px")
    .selectAll("tspan").data((d) => d.split("\n")).join("tspan").attr("x", 0).attr("dy", (_, i) => i ? 14 : 0).text((d) => d);
  groups.append("text").attr("text-anchor", "middle").attr("y", 5).attr("fill", (_, i) => clusterColors[i % clusterColors.length]).style("font-size", "12px").style("font-weight", "700").text((_, i) => String(i + 1).padStart(2, "0"));
  const effects = svg.append("g").attr("transform", `translate(${width / 2 - 180},315)`);
  raw.forEach((d, i) => effects.append("text").attr("x", i * 180).attr("fill", colors.muted).style("font-size", "11px").text(`${d.metric}: ${d.value}${d.unit}`));
}

export function renderVisualization(type: string, container: HTMLElement, data: Row[] = []) {
  if (type === "line") return renderLineChart(container, data);
  if (type === "scatter") return renderScatterPlot(container, data);
  if (type === "heatmap") return renderHeatmap(container, data);
  if (type === "bars") return renderBars(container, data);
  if (type === "cards") return renderCards(container, data);
  if (type === "network") return renderNetworkDiagram(container);
  return renderFlowDiagram(container, data);
}
