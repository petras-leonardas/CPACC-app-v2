import type { DetailedTopicContent } from '../types'
import { whyRegionalMatter, regionalFramework } from './context'
import { europeanInstruments } from './european-instruments'
import { africanSystem } from './african-system'
import { interAmericanSystem } from './inter-american-system'

export const regionalInstruments: DetailedTopicContent = {
  topicId: '3b-regional-instruments',
  introduction: [
    'When we talk about human rights for people with disabilities, we often think of big, global rules. But sometimes, the most helpful rules are the ones made closer to home. Regional human rights instruments are special agreements—like charters or treaties—made by groups of countries that live in the same part of the world.',
    'Think of global rules as the foundation of a house, and regional rules as the specific way you decorate the rooms to fit your family\'s needs. These regional agreements reflect the shared history and culture of an area. They make it easier for people to stand up for their rights because the courts and commissions are nearby and understand the local situation.'
  ],
  learningPointsHeading: 'Understanding this section will help you:',
  learningPoints: [
    'Identify the main regional human rights agreements for people with disabilities',
    'Understand how regional rules work alongside global disability laws',
    'Explain why each major regional agreement was created',
    'Recognize how regional courts help make sure these rules are followed'
  ],
  sections: [
    whyRegionalMatter,
    europeanInstruments,
    africanSystem,
    interAmericanSystem,
    regionalFramework
  ]
}
