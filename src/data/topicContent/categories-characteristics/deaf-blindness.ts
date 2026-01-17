import type { TopicSection } from '../types'

export const deafBlindness: TopicSection = {
  heading: 'Deaf-blindness',
  content: [
    'Deaf-blindness involves combined hearing and vision limitations. Most people who are deaf-blind are not completely deaf nor completely blind, but the combination of both sensory losses creates unique access challenges. Because both distance senses are affected, touch often becomes the primary channel for complex communication.',
    'Small accessibility gaps — such as missing structure, incomplete transcripts, or unreliable output — can turn partial access into total inaccessibility.'
  ],
  subsections: [
    {
      heading: 'Common characteristics',
      content: [
        'Heavy reliance on tactile or highly structured alternatives',
        'Use of braille and tactile forms of sign language',
        'Extreme sensitivity to content quality and completeness',
        'Limited ability to compensate through another sense'
      ]
    },
    {
      heading: 'Statistical context',
      content: [
        'Deaf-blindness affects between 0.2% and 2% of the global population.'
      ]
    },
    {
      heading: 'Common barriers',
      content: [
        'Printed materials and wayfinding without tactile equivalents',
        'Digital content that does not produce reliable, structured output',
        'Audio and video without transcripts that can be converted to braille',
        'Lack of access to tactile interpretation when needed'
      ]
    },
    {
      heading: 'Practical accessibility solutions',
      content: [
        'Ensure text-based versions of audio and video content exist',
        'Maintain clean, semantic structure in digital content',
        'Plan communication access in advance rather than improvising'
      ]
    }
  ]
}
