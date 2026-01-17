// Re-export types
export * from './types'

// Import types for internal use
import type { DetailedTopicContent } from './types'

// Import all topics
import { theoreticalModels } from './theoretical-models'
import { demographicsStatistics } from './demographics-statistics'
import { disabilityEtiquette } from './disability-etiquette'
import { categoriesCharacteristics } from './categories-characteristics/index'
import { assistiveTechnologies } from './assistive-technologies'
import { accommodationsUniversalDesign } from './accommodations-universal-design'
import { benefitsAccessibility } from './benefits-accessibility'
import { wcagPrinciples } from './wcag-principles'
import { builtEnvironment } from './built-environment'
import { universalDesignPrinciples } from './universal-design-principles'
import { udlUx } from './udl-ux'
import { internationalConventions } from './international-conventions'
import { regionalInstruments } from './regional-instruments/index'
import { nationalProvincial } from './national-provincial/index'
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

// Map topic IDs to content (supports both old and new IDs for backward compatibility)
export const topicDetailedContent: Record<string, DetailedTopicContent> = {
  // Domain 1 - New IDs
  '1a-theoretical-models': theoreticalModels,
  '1b-categories-characteristics': categoriesCharacteristics,
  '1c-assistive-technologies': assistiveTechnologies,
  '1d-demographics-statistics': demographicsStatistics,
  '1e-disability-etiquette': disabilityEtiquette,
  
  // Domain 2 - New IDs
  '2a-accommodations-universal-design': accommodationsUniversalDesign,
  '2b-benefits-accessibility': benefitsAccessibility,
  '2c-wcag-principles': wcagPrinciples,
  '2d-built-environment': builtEnvironment,
  '2e-universal-design-principles': universalDesignPrinciples,
  '2f-udl-ux': udlUx,
  
  // Domain 3 - New IDs
  '3a-international-conventions': internationalConventions,
  '3b-regional-instruments': regionalInstruments,
  '3c-national-provincial': nationalProvincial,
  '3d-procurement-laws': procurementLaws,
  '3e-ict-standards': ictStandards,
  '3f-integrating-ict': integratingIct,
  
  // Legacy IDs (for backward compatibility during transition)
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
