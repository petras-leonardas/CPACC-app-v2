/**
 * Barrel index — combines all per-topic question files
 * To regenerate: node scripts/generate-questions-from-sql.cjs
 */
export type { Question } from './types'

import { questions_1a } from './1a-theoretical-models'
import { questions_1b } from './1b-categories-characteristics'
import { questions_1c } from './1c-assistive-technologies'
import { questions_1d } from './1d-demographics-statistics'
import { questions_1e } from './1e-disability-etiquette'
import { questions_2a } from './2a-accommodations-universal-design'
import { questions_2b } from './2b-benefits-accessibility'
import { questions_2c } from './2c-wcag-principles'
import { questions_2d } from './2d-built-environment'
import { questions_2e } from './2e-universal-design-principles'
import { questions_2f } from './2f-udl-ux'
import { questions_3a } from './3a-international-conventions'
import { questions_3b } from './3b-regional-instruments'
import { questions_3c } from './3c-national-provincial'
import { questions_3d } from './3d-procurement-laws'
import { questions_3e } from './3e-ict-standards'
import { questions_3f } from './3f-integrating-ict'

export const ALL_QUESTIONS = [
  ...questions_1a,
  ...questions_1b,
  ...questions_1c,
  ...questions_1d,
  ...questions_1e,
  ...questions_2a,
  ...questions_2b,
  ...questions_2c,
  ...questions_2d,
  ...questions_2e,
  ...questions_2f,
  ...questions_3a,
  ...questions_3b,
  ...questions_3c,
  ...questions_3d,
  ...questions_3e,
  ...questions_3f,
]

/**
 * Question counts by sub-category code (e.g. '1A', '2B')
 * Derived from per-topic array lengths — always in sync
 */
export const QUESTION_COUNTS: Record<string, number> = {
  '1A': questions_1a.length,
  '1B': questions_1b.length,
  '1C': questions_1c.length,
  '1D': questions_1d.length,
  '1E': questions_1e.length,
  '2A': questions_2a.length,
  '2B': questions_2b.length,
  '2C': questions_2c.length,
  '2D': questions_2d.length,
  '2E': questions_2e.length,
  '2F': questions_2f.length,
  '3A': questions_3a.length,
  '3B': questions_3b.length,
  '3C': questions_3c.length,
  '3D': questions_3d.length,
  '3E': questions_3e.length,
  '3F': questions_3f.length,
}
