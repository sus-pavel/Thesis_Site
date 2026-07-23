# Design QA — амплитудно-частотная плоскость

- Source visual truth: `/var/folders/mp/7kwktbxj3x984hq7y27d2gn80000gn/T/codex-clipboard-de456e6a-205f-43bc-9e2a-5bc394614b3f.png`
- Implementation screenshot: `/tmp/thesis-feature-plane.jpg`
- Combined focused comparison: `/tmp/thesis-feature-plane-comparison.jpg`
- Viewport: 1440 × 900 CSS px, desktop, device scale 1
- Source pixels: 1606 × 958
- Implementation pixels: 1440 × 900; focused component crop: 290 × 250
- State: `/architecture/`, «Положение 1», схема смещена к нижней группе блоков

## Full-view comparison evidence

The implementation screenshot confirms that the enlarged feature-space block fits the existing architecture, keeps the formula visible, and does not overlap the pattern or heatmap blocks. The incoming and outgoing routes remain separated and readable.

## Focused-region comparison evidence

The combined comparison checks the component against the source at a readable scale. Both show frequency on the horizontal axis, amplitude on the vertical axis, a compressed low-amplitude point cloud, one high-amplitude outlier, colored cluster points, red centroid crosses, a grid, and a cluster color scale. The implementation intentionally uses fewer tick labels to remain legible inside the compact architecture card.

## Required fidelity surfaces

- Fonts and typography: existing site typography is preserved; axis labels and ticks use compact Arial sizing appropriate for the card.
- Spacing and layout rhythm: chart, title, and formula have distinct vertical zones; no component or route overlap is visible.
- Colors and visual tokens: viridis-like cluster colors and coral-red centroids reproduce the source while matching the site palette.
- Image quality and asset fidelity: the visualization is vector-rendered and remains sharp at the scene zoom levels.
- Copy and content: Russian axis names, units, formula, and block title are retained.

## Findings

No actionable P0, P1, or P2 mismatches.

P3: the full-size source has more tick labels and a large centroid legend. These are intentionally condensed in the architecture card to preserve plot area and formula readability.

## Interaction and runtime checks

- Block click target remains available.
- Formula button remains available.
- Browser console checked: no warnings or errors.
- `npm run build` and `git diff --check` passed.

## Comparison history

- Pass 1: no P0/P1/P2 findings; no corrective iteration required.

final result: passed
