import {
  architectureScenes,
  type ArchitectureScene,
  type SceneDetail,
} from './architectureScenes';

type DetailTranslation = Pick<SceneDetail, 'kind' | 'title' | 'text'> & {
  items?: string[];
  termDescriptions?: string[];
};

const buildScene = (
  source: ArchitectureScene,
  title: string,
  subtitle: string,
  translations: Record<string, DetailTranslation>,
): ArchitectureScene => ({
  ...source,
  title,
  subtitle,
  details: Object.fromEntries(
    Object.entries(source.details).map(([id, detail]) => {
      const translation = translations[id];
      if (!translation) throw new Error(`Missing English architecture detail: ${id}`);
      if (detail.terms && translation.termDescriptions?.length !== detail.terms.length) {
        throw new Error(`Incomplete English formula terms: ${id}`);
      }

      return [
        id,
        {
          ...detail,
          kind: translation.kind,
          title: translation.title,
          text: translation.text,
          items: translation.items,
          terms: detail.terms?.map((term, index) => ({
            ...term,
            description: translation.termDescriptions?.[index] ?? term.description,
          })),
        },
      ];
    }),
  ),
});

export const architectureScenesEn = {
  system: buildScene(
    architectureScenes.system,
    'DSM System Architecture',
    'Physical layer, data centre, and demand-side management loops',
    {
      generator: {
        kind: 'Physical layer · source',
        title: 'Electricity Generation',
        text: 'The power source of the isolated power system sends operating parameters and metering data to the information layer.',
        items: ['0.4 kV output voltage', 'Electricity metering', 'Connection to the common system bus'],
      },
      transformer: {
        kind: 'Physical layer · conversion',
        title: 'System Transformers',
        text: 'Transformer T1 connects generation to the 6 kV bus, while T2, T3, and Tn supply the 0.4 kV load groups.',
        items: ['T1: connection between generation and the 6 kV bus', 'T2, T3, Tn: supply to load groups', 'Transmission of electrical operating parameters'],
      },
      bus: {
        kind: 'Physical layer · distribution',
        title: '6 kV Bus',
        text: 'The bus distributes electricity among the transformer branches of the isolated power system.',
        items: ['Connection to T1', 'T2, T3, and Tn branches', 'Operating parameters for system modelling'],
      },
      load: {
        kind: 'Physical layer · consumption',
        title: 'Loads and Electricity Meters',
        text: 'The electrical load groups receive a 0.4 kV supply, while the meters transmit consumption time series and load-state data.',
        items: ['0.4 kV loads', 'Individual electricity meters', 'Data sources for load-class monitoring'],
      },
      monitoring: {
        kind: 'Assessment · monitoring',
        title: 'Load-Class Monitoring',
        text: 'The monitoring loop receives data from the main meter and individual loads, fills gaps, extracts features, and identifies equipment states.',
        items: ['Hysteresis-based labelling', 'HGB, XGB, LightGBM, and CAT', 'p(ON)(t), binarisation, and performance metrics'],
      },
      'load-data': {
        kind: 'Unified information model',
        title: 'Electricity and Process Data',
        text: 'Electrical parameters are combined with production constraints, external conditions, and consumption time series.',
        items: ['Electricity consumption', 'Equipment operating modes', 'Weather and process factors'],
      },
      modeling: {
        kind: 'Simulation loop',
        title: 'Power-System Modelling',
        text: 'The isolated power-system model in MATPOWER MOST calculates operating conditions and daily OPEX for each load-control option.',
        items: ['mpc: topology, generation, and costs', 'transmat and xgd: transitions and generators', 'sd, contab, and profiles: storage, contingencies, and profiles'],
      },
      'data-center': {
        kind: 'Integration layer',
        title: 'Data Centre',
        text: 'A unified exchange point connects monitoring, forecasting, potential assessment, modelling, and DSM optimisation.',
        items: ['Time series', 'Power-system parameters', 'Process constraints'],
      },
      control: {
        kind: 'System output',
        title: 'Load Control',
        text: 'Optimal parameters are converted into targeted control actions for specific classes of electrical loads.',
        items: ['Power limitation', 'Cycle shifting', 'Flexible and migratory control'],
      },
      external: {
        kind: 'Model context',
        title: 'External Conditions and Process',
        text: 'The production process, external factors, and maintenance schedules define the feasible domain for demand-side management.',
        items: ['Process constraints', 'Weather conditions', 'Maintenance schedules'],
      },
      forecast: {
        kind: 'Forecasting module',
        title: 'Time-Series Forecasting',
        text: 'The module produces a day-ahead forecast at one-minute resolution for subsequent operating-condition calculations.',
        items: ['Consumption', 'Renewable generation', 'Load states'],
      },
      decomposition: {
        kind: 'Analytical loop',
        title: 'Singular Spectrum Analysis',
        text: 'The SSA loop extracts time-series components, groups them by amplitude and frequency, and produces a DSM potential map.',
        items: ['Trajectory matrix', 'w-correlation', 'Patterns and DR PI'],
      },
      optimization: {
        kind: 'DSM optimisation',
        title: 'CC-PSO Optimisation',
        text: 'The iterative loop selects DSM parameters, sends adjusted load profiles to the power-system model, and compares the results.',
        items: [
          'Partitioning tuning parameters into groups',
          'Setting DSM parameters from the CC-PSO iteration',
          'Applying load-control algorithms',
          'Generating DR signals and adjusted load profiles',
          'Power-system modelling',
          'Checking the iteration-limit constraint',
        ],
      },
      criterion: {
        kind: 'Decision loop',
        title: 'DSM Application Criterion',
        text: 'The decision accounts for changes in daily OPEX and the mean daily demand-response flexibility index, DR FI. The plus sign is retained from the original architecture.',
        items: ['OPEX > OPEX(t − 1)', 'Mean daily DR FI > 0.5', 'YES: DSM is applied', 'NO: DSM is not required'],
      },
    },
  ),
  position1: buildScene(
    architectureScenes.position1,
    'Research Proposition 1 · Potential Assessment',
    'From a time series to a DSM potential map',
    {
      'raw-data': {
        kind: 'Input',
        title: 'Consumption Data',
        text: 'The raw electricity-consumption time series P(t) enters the common preprocessing pipeline.',
        items: ['Missing-value check', 'Sampling-interval alignment', 'Selection of the analysis interval'],
      },
      normalized: {
        kind: 'Preprocessing',
        title: 'Normalised Data',
        text: 'Min–max normalisation brings the values to a common scale while preserving the relative structure of the time series.',
        items: ['Feature comparability', 'Signal-shape preservation', 'Preparation for embedding'],
      },
      'formula-normalization': {
        kind: 'Formula explanation',
        title: 'Min–Max Normalisation',
        text: 'Each time-series value is transformed into the dimensionless range from 0 to 1.',
        termDescriptions: [
          'normalised power value at time t',
          'original power value at time t',
          'minimum value in the normalisation interval',
          'maximum value in the normalisation interval',
          'time-series sample index',
        ],
      },
      trajectory: {
        kind: 'SSA · embedding',
        title: 'Trajectory Matrix',
        text: 'Lagged copies of the normalised series form a Hankel trajectory matrix that captures recurring signal states.',
        items: ['Window length L', 'Lagged vectors', 'Hankel structure'],
      },
      'formula-trajectory': {
        kind: 'Formula explanation',
        title: 'Trajectory Matrix',
        text: 'Each matrix element is defined by the corresponding lagged time-series sample; equal anti-diagonals contain identical values.',
        termDescriptions: [
          'Hankel trajectory matrix',
          'series value at the intersection of row i and column j',
          'window length and number of matrix rows',
          'number of columns, or embedding vectors',
          'total number of samples in the original series',
          'matrix row and column indices',
        ],
      },
      'formula-svd': {
        kind: 'Formula explanation',
        title: 'Singular Value Decomposition',
        text: 'The decomposition represents the trajectory matrix as a sum of orthogonal components ordered by their contribution to the original signal.',
        termDescriptions: [
          'time-series trajectory matrix',
          'matrix of left singular vectors',
          'diagonal matrix of singular values',
          'transposed matrix of right singular vectors',
        ],
      },
      elementary: {
        kind: 'SSA · decomposition',
        title: 'Elementary Matrix',
        text: 'Each elementary matrix corresponds to one singular-spectrum component and its contribution to the trajectory matrix.',
        items: ['Rank 1', 'Individual contribution', 'Separate signal scale'],
      },
      'formula-elementary': {
        kind: 'Formula explanation',
        title: 'Elementary Matrix',
        text: 'The formula defines the i-th elementary matrix through its eigenvalue and the corresponding pair of singular vectors.',
        termDescriptions: [
          'i-th elementary matrix of the trajectory matrix',
          'i-th eigenvalue; characterises the component contribution',
          'i-th left singular vector',
          'i-th right singular vector',
          'transpose operation',
        ],
      },
      components: {
        kind: 'Singular spectrum analysis',
        title: 'Signal Components',
        text: 'After diagonal averaging, the elementary matrices return to the time domain as a set of signal components.',
        items: ['Trend component', 'Periodic components', 'High-frequency residual'],
      },
      'formula-hankelization': {
        kind: 'Formula explanation',
        title: 'Diagonal Averaging',
        text: 'A time-series component is reconstructed by averaging the elementary-matrix elements along each anti-diagonal.',
        termDescriptions: [
          'sample j of reconstructed component i',
          'i-th elementary matrix',
          'matrix element in row m and column n',
          'number of elements on anti-diagonal j',
          'summation of elements satisfying m + n = j + 1',
        ],
      },
      'w-correlation': {
        kind: 'Separability check',
        title: 'w-Correlation Matrix',
        text: 'w-correlation measures the relationship between reconstructed components and helps verify that they have been separated correctly.',
        items: ['Component similarity', 'Grouping selection', 'Interpretability check'],
      },
      'formula-w-correlation': {
        kind: 'Formula explanation',
        title: 'w-Correlation Coefficient',
        text: 'The normalised weighted inner product measures the similarity of two reconstructed components.',
        termDescriptions: [
          'w-correlation coefficient for components i and j',
          'reconstructed components being compared',
          'weighted inner product',
          'weighted component norm',
          'indices of singular-spectrum components',
        ],
      },
      'feature-space': {
        kind: 'Feature space',
        title: 'Amplitude–Frequency Plane',
        text: 'The RMS amplitude and dominant frequency are calculated for each component, after which the components are clustered.',
        items: ['RMS amplitude', 'Dominant frequency', 'Component clusters'],
      },
      'formula-features': {
        kind: 'Formula explanation',
        title: 'Amplitude and Frequency',
        text: 'Each component is represented as a point in the amplitude–frequency plane using its RMS amplitude and dominant frequency.',
        termDescriptions: [
          'RMS amplitude of component i',
          'dominant frequency of component i',
          'value of the reconstructed component at time t',
          'number of component samples',
          'fast Fourier transform',
          'frequency of a spectral component',
        ],
      },
      patterns: {
        kind: 'Reconstruction',
        title: 'Time-Series Patterns',
        text: 'Components in the same cluster are summed to form interpretable consumption patterns at different time scales.',
        items: ['Daily operating patterns', 'Process cycles', 'High-frequency variations'],
      },
      'formula-pattern': {
        kind: 'Formula explanation',
        title: 'Pattern Reconstruction',
        text: 'A temporal pattern is formed by summing all reconstructed components assigned by k-means to the same cluster.',
        termDescriptions: [
          'pattern m for window or day d',
          'set of components in cluster m',
          'i-th reconstructed elementary component',
          'cluster and corresponding pattern number',
          'index of the time window being analysed',
          'time index',
        ],
      },
      heatmap: {
        kind: 'Research Proposition 1 output',
        title: 'DSM Potential Map',
        text: 'The integral DR PI is converted into an intensity map that identifies preferred intervals for applying DSM.',
        items: ['Potential intensity', 'Time of day', 'Day type'],
      },
      'formula-drpi-components': {
        kind: 'Formula explanation',
        title: 'DR PI Components',
        text: 'Three normalised components describe the share of flexible energy, its temporal concentration, and the dynamics of load variation.',
        termDescriptions: [
          'flexible energy for day d: Σₜ max(0, Pᵈ,ₜ − bᵈ)Δt',
          'total energy for day d',
          'baseline: 20th percentile Q₀.₂ of the daily profile',
          'minimum number of intervals containing 50% of flexible energy',
          'number of samples per day',
          'normalised mean amplitude of intraday variations',
          'minimum and maximum R over the sample of days',
        ],
      },
      'formula-drpi': {
        kind: 'Formula explanation',
        title: 'Demand Response Potential Index',
        text: 'The index combines the energy, temporal, and dynamic components of demand-response potential. The adopted weights are 0.5, 0.3, and 0.2.',
        termDescriptions: [
          'integral potential index for day d',
          'flexible-energy share: Eflex,d / Etot,d',
          'flexible-energy concentration: 1 − k50,d / N',
          'normalised dynamics of intraday variations',
          'weighting coefficients; their sum equals 1',
          'index of the day or sliding daily window',
        ],
      },
    },
  ),
  position2: buildScene(
    architectureScenes.position2,
    'Research Proposition 2 · Targeted Control',
    'From load classification to measurable effects',
    {
      classification: {
        kind: 'Research Proposition 2 input',
        title: 'Load Classification',
        text: 'Loads are divided according to the admissible control mode: variable, shiftable, flexible, migratory, and passive.',
        items: ['Cycle characteristics', 'Control depth', 'Shift admissibility'],
      },
      actions: {
        kind: 'Formalisation',
        title: 'Control Actions and Constraints',
        text: 'For each class, admissible demand-response actions and limits on response time, cycle duration, control depth, and shifting are defined.',
        items: ['Response time', 'Cycle duration', 'Shift range'],
      },
      models: {
        kind: 'Control parameters',
        title: 'DSM Mathematical Models',
        text: 'The physical behaviour of each class is expressed through its own set of optimised parameters and constraints.',
        items: ['Variable load', 'Shiftable load', 'Flexible and migratory loads'],
      },
      optimization: {
        kind: 'CC-PSO method',
        title: 'DSM Parameter Optimisation',
        text: 'The integral objective function is minimised, accounting for operating costs, starts, low-load operation, and renewable-energy constraints.',
        items: ['Cₒₚ — operating costs', 'Cₛₜₐᵣₜ — start-up costs', 'Cₗₒw and C꜀ᵤᵣₜ — operating penalties'],
      },
      simulation: {
        kind: 'Operating-condition calculation',
        title: 'Power-System Modelling',
        text: 'Adjusted load profiles are passed to MATPOWER/MOST and the Python workflow to calculate operating conditions and costs.',
        items: ['Generation and network', 'Load profiles', 'Daily calculation'],
      },
      effects: {
        kind: 'Scenario comparison',
        title: 'Effect Assessment',
        text: 'The results are evaluated using economic, technical, and environmental indicators.',
        items: ['OPEX and payback period', 'Capacity factor and diesel-generator starts', 'Scope 1 and fuel savings'],
      },
      'source-data': {
        kind: 'Calculation example',
        title: 'Input Data',
        text: 'Network topology, generation, load profiles, and process constraints form a unified input dataset.',
        items: ['Power-system diagram', 'Load and renewable-generation profiles', 'Equipment parameters'],
      },
      cycle: {
        kind: 'Iterative loop',
        title: 'Calculation Cycle',
        text: 'CC-PSO changes the DSM parameters, the model recalculates the operating conditions, and the objective function determines the next search direction.',
        items: ['DSM parameters', 'Power-system modelling', 'Convergence check'],
      },
      results: {
        kind: 'Calculation output',
        title: 'Results',
        text: 'Scenarios are compared by load structure, generation operation, costs, emissions, and payback period.',
        items: ['Power profiles', 'Generation mix', 'Economic effect'],
      },
    },
  ),
} satisfies Record<string, ArchitectureScene>;
