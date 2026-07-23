#!/usr/bin/env bash
set -euo pipefail

project_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
output_dir="$project_root/public/architecture/formulas"
work_dir="$(mktemp -d)"
trap 'rm -rf "$work_dir"' EXIT

mkdir -p "$output_dir"

names=(
  normalization
  trajectory
  svd
  elementary
  hankelization
  w-correlation
  features
  pattern
  drpi-components
  drpi
)

formulas=(
  '\widehat{P}_{t}=\frac{P_{t}-P_{\min}}{P_{\max}-P_{\min}}'
  '\begin{aligned}A&=\left[p_{i+j-1}\right]_{L\times k}\\[-1pt]k&=K-L+1\end{aligned}'
  'A=U\Sigma V^{\mathsf T}'
  'A_i=\sqrt{\lambda_i}\,U_iV_i^{\mathsf T}'
  '\widetilde{F}_i(j)=\frac{1}{n_j}\sum_{m+n=j+1}(A_i)_{mn}'
  'w_{ij}=\frac{\left|\left\langle\widetilde{F}_i,\widetilde{F}_j\right\rangle_w\right|}{\left\|\widetilde{F}_i\right\|_w\left\|\widetilde{F}_j\right\|_w}'
  '\begin{aligned}a_i&=\sqrt{\frac{1}{N}\sum_t\widetilde{F}_i^2(t)}\\[-1pt]f_i&=\underset{f>0}{\operatorname{arg\,max}}\,\left|\operatorname{FFT}(\widetilde{F}_i)(f)\right|\end{aligned}'
  'P_d^{(m)}(t)=\sum_{i\in C_m}\widetilde{F}_i(t)'
  '\begin{aligned}F_{1,d}&=\frac{E_{\mathrm{flex},d}}{E_{\mathrm{tot},d}},\qquad F_{2,d}=1-\frac{k_{50,d}}{N}\\[-1pt]F_{3,d}&=\frac{R_d-R_{\min}}{R_{\max}-R_{\min}}\end{aligned}'
  '\operatorname{DR\,PI}_d=w_1F_{1,d}+w_2F_{2,d}+w_3F_{3,d}'
)

for index in "${!names[@]}"; do
  name="${names[$index]}"
  formula="${formulas[$index]}"
  formula_dir="$work_dir/$name"
  mkdir -p "$formula_dir"

  {
    printf '%s\n' '\documentclass[border=1.5pt]{standalone}'
    printf '%s\n' '\usepackage{amsmath,amssymb}'
    printf '%s\n' '\usepackage{xcolor}'
    printf '%s\n' '\begin{document}'
    printf '%s\n' '\color[HTML]{234F80}'
    printf '\\(\\displaystyle %s\\)\n' "$formula"
    printf '%s\n' '\end{document}'
  } > "$formula_dir/formula.tex"

  latex \
    -interaction=nonstopmode \
    -halt-on-error \
    -output-directory="$formula_dir" \
    "$formula_dir/formula.tex" >/dev/null

  dvisvgm \
    --exact \
    --bbox=min \
    --no-fonts \
    --output="$output_dir/$name.svg" \
    "$formula_dir/formula.dvi" >/dev/null
done

printf 'Rendered %s LaTeX formulas to %s\n' "${#names[@]}" "$output_dir"
