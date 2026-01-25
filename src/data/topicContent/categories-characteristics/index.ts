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
    'This section explains the major disability categories you are likely to encounter in accessibility work and what those categories often mean in real life. It describes typical ways disabilities can affect how people see, talk, move, think, and feel. It is important to remember that even if two people have the same diagnosis, their experiences can look very different. One person with low vision might struggle with bright sunlight, while another might need a spotlight just to read a menu.',
    'We also look at the "walls" or barriers people face in the physical world and on the internet. The goal is to understand that disability isn\'t just about a person\'s body—it is about the "mismatch" between a person and their environment. When we fail to design with everyone in mind, we create a world where some guests are left out of the party. Accessibility is the invitation that makes sure every guest can reach the snacks, join the conversation, and feel welcome.',
  ],
  learningPoints: [
    'Name the main categories of disabilities and the specific conditions that fall under them',
    'Describe the unique accessibility challenges faced by people in each category',
    'Understand how assistive technologies (like screen readers or switches) help individuals overcome barriers',
    'Identify which solutions are meant for the digital world (ICT) versus the physical world',
    'Connect disability characteristics to the "Adaptive Strategies" people use to navigate daily life',
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
