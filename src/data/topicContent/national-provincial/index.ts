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
    'National and provincial disability legislation translates the broad principles established by international conventions into enforceable domestic law. While treaties such as the Convention on the Rights of Persons with Disabilities set the global standard, it is national statutes and provincial regulations that directly govern how people access employment, education, transportation, and digital services in their daily lives.',
    'Historically, many jurisdictions approached disability through a welfare or medical lens, providing benefits rather than removing barriers. Contemporary legislation reflects the social model of disability, recognizing that exclusion results from inaccessible environments rather than from individual impairments. These modern laws establish accessibility and non-discrimination as legally enforceable rights, require reasonable accommodations in the workplace, and create compliance mechanisms with meaningful consequences for violations. For CPACC candidates, a thorough understanding of these national frameworks is critical to applying accessibility principles in practice.',
  ],
  learningPoints: [
    'Identify the most important national and provincial disability rights laws.',
    'Understand how these laws are grounded in principles of equality and non-discrimination.',
    'Describe the primary objectives and scope of major disability rights statutes.',
    'Distinguish how laws apply accessibility requirements and reasonable accommodation obligations.',
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
