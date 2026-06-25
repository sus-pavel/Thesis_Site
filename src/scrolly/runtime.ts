import { renderVisualization } from "./viz";

type Dataset = Record<string, Array<Record<string, string | number | boolean>>>;

const base = import.meta.env.BASE_URL;

async function loadData(path: string): Promise<Dataset> {
  const response = await fetch(path);
  if (!response.ok) throw new Error(`Не удалось загрузить данные: ${path}`);
  return response.json();
}

function renderPanel(panel: HTMLElement, data: Dataset) {
  const canvas = panel.querySelector<HTMLElement>(".viz-canvas") || panel;
  const type = panel.dataset.vizType || panel.dataset.staticViz || "cards";
  const key = panel.dataset.dataKey || "";
  renderVisualization(type, canvas, data[key] || []);
}

export async function initScrollytelling() {
  const shell = document.querySelector<HTMLElement>("[data-scrolly]");
  if (!shell || shell.dataset.ready === "true") return;
  shell.dataset.ready = "true";

  const data = await loadData(shell.dataset.source || `${base}data/main-data.json`);
  const sections = Array.from(shell.querySelectorAll<HTMLElement>(".scroll-section"));
  const panels = Array.from(shell.querySelectorAll<HTMLElement>("[data-viz-panel]"));
  const links = Array.from(shell.querySelectorAll<HTMLElement>("[data-rail-link]"));
  const progress = document.querySelector<HTMLElement>(".reading-progress span");

  panels.forEach((panel) => renderPanel(panel, data));
  sections.forEach((section) => {
    const id = section.dataset.section || "";
    const source = panels.find((panel) => panel.dataset.vizPanel === id);
    const mobile = section.querySelector<HTMLElement>("[data-mobile-viz]");
    if (!source || !mobile) return;
    mobile.innerHTML = `<header><strong>${source.querySelector("h2")?.textContent || ""}</strong><span class="placeholder-badge">Демонстрационные данные</span></header><div class="viz-canvas"></div>`;
    const proxy = mobile as HTMLElement;
    proxy.dataset.vizType = source.dataset.vizType;
    proxy.dataset.dataKey = source.dataset.dataKey;
    renderPanel(proxy, data);
  });

  const activate = (id: string) => {
    panels.forEach((panel) => panel.classList.toggle("active", panel.dataset.vizPanel === id));
    links.forEach((link) => link.classList.toggle("active", link.dataset.railLink === id));
    history.replaceState(null, "", `#${id}`);
    const index = sections.findIndex((section) => section.dataset.section === id);
    if (progress) progress.style.width = `${((index + 1) / sections.length) * 100}%`;
  };

  const observer = new IntersectionObserver((entries) => {
    const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (visible) activate((visible.target as HTMLElement).dataset.section || "");
  }, { rootMargin: "-25% 0px -50% 0px", threshold: [0.15, 0.35, 0.6] });

  sections.forEach((section) => observer.observe(section));
  activate(location.hash.slice(1) || sections[0]?.dataset.section || "");
}

export async function initStaticVisualizations() {
  const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-static-viz]"));
  if (!elements.length) return;
  const files = Array.from(new Set(elements.map((element) => element.dataset.dataFile || "main-data.json")));
  const datasets = new Map<string, Dataset>();
  await Promise.all(files.map(async (file) => datasets.set(file, await loadData(`${base}data/${file}`))));

  elements.forEach((element) => {
    if (element.dataset.ready === "true") return;
    element.dataset.ready = "true";
    element.innerHTML = `<header><span class="placeholder-badge">Демонстрационные данные</span></header><div class="viz-canvas"></div>`;
    const file = element.dataset.dataFile || "main-data.json";
    renderPanel(element, datasets.get(file) || {});
  });
}
