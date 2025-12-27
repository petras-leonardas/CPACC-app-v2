// Re-export types
export * from './types'

// Import types for internal use
import type { DetailedTopicContent } from './types'

// Import all topics
import { theoreticalModels } from './theoretical-models'
import { demographicsStatistics } from './demographics-statistics'
import { disabilityEtiquette } from './disability-etiquette'
import { categoriesCharacteristics } from './categories-characteristics'
import { assistiveTechnologies } from './assistive-technologies'
import { accommodationsUniversalDesign } from './accommodations-universal-design'
import { benefitsAccessibility } from './benefits-accessibility'
import { wcagPrinciples } from './wcag-principles'
import { builtEnvironment } from './built-environment'
import { universalDesignPrinciples } from './universal-design-principles'
import { udlUx } from './udl-ux'
import { internationalConventions } from './international-conventions'
import { regionalInstruments } from './regional-instruments'
import { nationalProvincial } from './national-provincial'
import { procurementLaws } from './procurement-laws'
import { ictStandards } from './ict-standards'
import { integratingIct } from './integrating-ict'

// Re-export individual topics (for potential direct imports)
export {
  theoreticalModels,
  demographicsStatistics,
  disabilityEtiquette,
  categoriesCharacteristics,
  assistiveTechnologies,
  accommodationsUniversalDesign,
  benefitsAccessibility,
  wcagPrinciples,
  builtEnvironment,
  universalDesignPrinciples,
  udlUx,
  internationalConventions,
  regionalInstruments,
  nationalProvincial,
  procurementLaws,
  ictStandards,
  integratingIct
}

// Maintain backward compatibility with existing imports
export const topicDetailedContent: Record<string, DetailedTopicContent> = {
  'theoretical-models': theoreticalModels,
  'demographics-statistics': demographicsStatistics,
  'disability-etiquette': disabilityEtiquette,
  'categories-characteristics': categoriesCharacteristics,
  'assistive-technologies': assistiveTechnologies,
  'accommodations-universal-design': accommodationsUniversalDesign,
  'benefits-accessibility': benefitsAccessibility,
  'wcag-principles': wcagPrinciples,
  'built-environment': builtEnvironment,
  'universal-design-principles': universalDesignPrinciples,
  'udl-ux': udlUx,
  'international-conventions': internationalConventions,
  'regional-instruments': regionalInstruments,
  'national-provincial': nationalProvincial,
  'procurement-laws': procurementLaws,
  'ict-standards': ictStandards,
  'integrating-ict': integratingIct
}
