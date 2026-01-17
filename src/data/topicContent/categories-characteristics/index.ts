import type { DetailedTopicContent } from '../types'
import { visualDisabilities } from './visual-disabilities'
import { auditoryDisabilities } from './auditory-disabilities'
import { deafBlindness } from './deaf-blindness'
import { speechLanguageDisabilities } from './speech-language-disabilities'
import { mobilityDisabilities } from './mobility-disabilities'
import { cognitiveDisabilities } from './cognitive-disabilities'
import { seizureDisabilities } from './seizure-disabilities'
import { psychologicalDisabilities } from './psychological-disabilities'
import { multipleDisabilities } from './multiple-disabilities'

export const categoriesCharacteristics: DetailedTopicContent = {
  topicId: '1b-categories-characteristics',
  introduction: [
    'This section explains the major disability categories you\'re likely to encounter in accessibility work and what those categories often mean in real life. It describes typical ways disabilities can affect perception, communication, movement, thinking, and emotional regulation—while emphasizing that the same diagnosis can look very different from one person to the next.',
    'It also connects disability to the barriers people face in everyday environments and digital products. The goal is to build a clear mental model: disability is not just about an individual\'s body or mind, but about how well (or poorly) tools, spaces, content, and social practices support a wide range of human variation.'
  ],
  learningPoints: [
    'Recognize major disability categories and the kinds of impacts they can have',
    'Identify common environmental and digital barriers that disable people in practice',
    'Explain why "same diagnosis" does not mean "same needs"',
    'Apply practical, non-technology solutions that remove barriers in spaces and interfaces',
    'Connect accessibility decisions to real participation outcomes'
  ],
  sections: [
    visualDisabilities,
    auditoryDisabilities,
    deafBlindness,
    speechLanguageDisabilities,
    mobilityDisabilities,
    cognitiveDisabilities,
    seizureDisabilities,
    psychologicalDisabilities,
    multipleDisabilities
  ]
}
