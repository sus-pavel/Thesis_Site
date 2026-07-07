export const glossary = {
  isolatedPowerSystem: {
    ru: 'автономный электротехнический комплекс',
    en: 'isolated power system',
    note: 'Use instead of autonomous electrical engineering complex.',
  },
  demandSideManagement: {
    ru: 'управление спросом на электроэнергию',
    en: 'demand-side management, DSM',
    note: 'Use for the broad demand-side management technology or system-level concept.',
  },
  demandResponse: {
    ru: 'управление спросом как конкретное управляющее воздействие',
    en: 'demand response, DR',
    note: 'Use for a specific control action or response event.',
  },
  electricalLoads: {
    ru: 'электроприёмники',
    en: 'electrical loads',
    note: 'Use instead of electrical receivers.',
  },
  migrationLoad: {
    ru: 'мигрирующая нагрузка',
    en: 'migration load',
    note: 'Use instead of mobile, relocatable, or migrating load.',
  },
  electricityConsumptionPatterns: {
    ru: 'паттерны электропотребления',
    en: 'electricity consumption patterns',
    note: 'Use when referring specifically to electricity consumption patterns.',
  },
  singularSpectrumAnalysis: {
    ru: 'сингулярный спектральный анализ',
    en: 'Singular Spectrum Analysis, SSA',
    note: 'Use the full term on first mention, then SSA when appropriate.',
  },
  demandResponsePotentialIndex: {
    ru: 'индекс потенциала управления спросом',
    en: 'Demand Response Potential Index, DRPI',
    note: 'Use instead of demand-side management potential index.',
  },
  isolatedEnergySystem: {
    ru: 'автономная энергосистема',
    en: 'isolated power system',
    note: 'Use the same English term as for автономный электротехнический комплекс unless the context requires a narrower distinction.',
  },
  loadFlexibility: {
    ru: 'гибкость нагрузки',
    en: 'load flexibility',
    note: 'Use for the property of a load to be shifted or adjusted.',
  },
  classificationOfElectricalLoads: {
    ru: 'классификация электроприёмников',
    en: 'classification of electrical loads',
    note: 'Use for the proposed load classification framework.',
  },
  loadControlModel: {
    ru: 'модель управления нагрузкой',
    en: 'load control model',
    note: 'Use for formalized control models for load classes.',
  },
  technicalConstraints: {
    ru: 'технические ограничения',
    en: 'technical constraints',
    note: 'Use for equipment, network, and operating limitations.',
  },
  heatmap: {
    ru: 'тепловая карта',
    en: 'heatmap',
    note: 'Use as one word.',
  },
  amplitudeFrequencyPlane: {
    ru: 'амплитудно-частотная плоскость',
    en: 'amplitude–frequency plane',
    note: 'Use this form when referring to the feature space of SSA components.',
  },
  researchOutputs: {
    ru: 'Апробация результатов',
    en: 'RESEARCH OUTPUTS',
    note: 'Use for the publications page eyebrow and related dissertation output sections.',
  },
  researchProposition: {
    ru: 'Положение',
    en: 'Research Proposition',
    note: 'Use for dissertation propositions or statements submitted for defence.',
  },
  higherAttestationCommission: {
    ru: 'ВАК',
    en: 'Journals listed by the Higher Attestation Commission',
    note: 'Use for the Russian Higher Attestation Commission journal category in publication listings.',
  },
  vakJournals: {
    ru: 'Журналы ВАК',
    en: 'Journals listed by the Higher Attestation Commission',
    note: 'Use for the VAK journal section and statistics label.',
  },
  softwareRegistrations: {
    ru: 'Программы для ЭВМ',
    en: 'Software Registrations',
    note: 'Use for Russian software registration certificates and related publication sections.',
  },
} as const;

export type GlossaryKey = keyof typeof glossary;
