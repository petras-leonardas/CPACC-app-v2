import type { TopicSection } from '../types'

export const auditoryDisabilities: TopicSection = {
  heading: 'Auditory disabilities',
  content: [
    'Auditory disabilities involve differences in how people perceive, process, or understand sound. These disabilities are not only about volume or hearing sensitivity; they also include how the brain interprets sound. Communication preferences and needs can vary significantly depending on whether hearing loss is present from birth or acquired later in life.',
    'Some people primarily use spoken language with amplification or environmental supports. Others primarily use sign language and may experience written language differently, especially if sign language is their first language. Auditory disabilities often interact strongly with environmental factors such as background noise, acoustics, pacing of speech, and visual access to speakers.'
  ],
  subsections: [
    {
      heading: 'Common subtypes and characteristics',
      content: [
        '<strong>Deafness:</strong> Deafness involves little to no functional hearing. For many people born deaf, sign language is their first language. Written and spoken languages may be second languages, which can affect comfort with dense text or phonetic spelling systems.',
        '<strong>Hard of hearing:</strong> Hard-of-hearing individuals have partial hearing loss that may be supported by hearing aids, cochlear implants, or assistive listening systems. Hearing ability may fluctuate based on environment, distance, and competing sounds.',
        '<strong>Auditory processing differences (APD):</strong> In auditory processing disorder, hearing sensitivity may be typical, but the brain has difficulty interpreting, organizing, or understanding sound. People with APD may struggle to follow spoken instructions, locate sound sources, or understand speech in noisy or fast-paced environments, even though standard hearing tests show normal results.'
      ]
    },
    {
      heading: 'Statistical context',
      content: [
        '~430 million people globally have disabling hearing loss (World Health Organization).',
        '~750,000 people in the EU use sign language as their first language.',
        'Central Auditory Processing Disorder affects ~5% of the global population (American Speech-Language-Hearing Association).'
      ]
    },
    {
      heading: 'Common barriers',
      content: [
        'Speakers not using microphones in large or reverberant spaces',
        'Lack of sign language interpretation',
        'Background noise and poor acoustics',
        'Group conversations where multiple speakers overlap',
        'Poor lighting that makes lip-reading difficult',
        'Digital content that is audio-only',
        'Videos without accurate captions or transcripts',
        'Media players and meeting tools that do not allow caption customization',
        'Systems that require voice interaction as the only way to complete tasks'
      ]
    },
    {
      heading: 'Practical accessibility solutions',
      content: [
        '<strong>Communication and events:</strong> captions and transcripts for recorded and live content; sign language interpretation when appropriate; improved acoustics; facilitation practices that support turn-taking',
        '<strong>Digital environments:</strong> high-quality captions; text alternatives for audio; user control over audio and caption presentation; avoiding audio-only critical information'
      ]
    }
  ]
}
