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
    'National and provincial laws are the tools that turn big, global ideas about human rights into real rules that people must follow in their own neighborhoods. While international treaties set the stage, these local laws are what actually change how people get to work, go to school, or use the internet every day.',
    'In the past, many laws treated people with disabilities like they needed "charity" or "fixing." Today, we\'ve moved toward an equality model. This means we recognize that the world is often full of "clutter" and barriers that stop people from joining in. These modern laws are here to clear that clutter so everyone can "join the party" on equal terms.',
  ],
  learningPoints: [
    'Pinpoint the most important national and provincial disability rights laws.',
    'See how these laws are built on the ideas of fairness and treat everyone equally.',
    'Describe the main jobs and goals of the biggest disability acts.',
    'Spot how laws use "accessibility" and "reasonable accommodation" to make life better.',
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
