import type { DetailedTopicContent } from '../types'
import { backgroundEvolution } from './background-evolution'
import { accessibilityAccommodation } from './accessibility-accommodation'
import { ukEqualityAct } from './uk-equality-act'
import { usAda } from './us-ada'
import { canadaOntario } from './canada-ontario'
import { euLaws, whyNationalLawsMatter } from './eu-laws'

export const nationalProvincial: DetailedTopicContent = {
  topicId: '3c-national-provincial',
  introduction: [
    'National and provincial disability rights laws translate human rights principles into enforceable obligations within specific countries or regions. These laws shape how equality, accessibility, and inclusion are implemented in everyday life—across employment, education, transportation, public services, and the built and digital environments. While international and regional treaties set shared expectations, it is national and provincial legislation that most directly affects people\'s lived experiences.',
    'Over the past few decades, disability-related laws have increasingly shifted away from charity and welfare models toward equality and anti-discrimination frameworks. This change reflects a broader move from viewing disability as an individual problem to recognizing it as a social issue shaped by barriers, exclusion, and unequal treatment. As a result, modern disability laws tend to emphasize rights, participation, and systemic change rather than assistance alone.'
  ],
  learningPoints: [
    'Identify key national and provincial disability rights laws',
    'Understand how disability laws reflect equality and non-discrimination principles',
    'Explain the main purpose and scope of major disability-related acts',
    'Recognize how accessibility and reasonable accommodation are used in law'
  ],
  sections: [
    backgroundEvolution,
    accessibilityAccommodation,
    ukEqualityAct,
    usAda,
    canadaOntario,
    euLaws,
    whyNationalLawsMatter
  ]
}
