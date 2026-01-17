import type { DetailedTopicContent } from '../types'
import { whyRegionalMatter, regionalFramework } from './context'
import { europeanInstruments } from './european-instruments'
import { africanSystem } from './african-system'
import { interAmericanSystem } from './inter-american-system'

export const regionalInstruments: DetailedTopicContent = {
  topicId: '3b-regional-instruments',
  introduction: [
    'Regional human rights instruments—such as charters, conventions, and protocols—play a crucial role in protecting and advancing the rights of people with disabilities. While global frameworks establish broad principles, regional instruments often reflect shared histories, legal traditions, and social realities. They can strengthen protections, fill gaps left by international law, and provide enforcement mechanisms that are closer and more accessible to individuals.',
    'Many regional instruments were created before the global disability rights treaty emerged. Even today, they remain highly relevant. Regional systems allow individuals and organizations to bring complaints before regional courts and commissions, creating accountability and practical pathways for enforcement. Together with global agreements, these instruments form a layered human rights framework that supports disability rights at international, regional, and national levels.'
  ],
  learningPoints: [
    'Identify key regional human rights instruments related to disability',
    'Understand how regional frameworks complement global disability rights law',
    'Explain the main purpose of each major regional instrument',
    'Recognize the role of regional courts and monitoring bodies in enforcement'
  ],
  sections: [
    whyRegionalMatter,
    europeanInstruments,
    africanSystem,
    interAmericanSystem,
    regionalFramework
  ]
}
