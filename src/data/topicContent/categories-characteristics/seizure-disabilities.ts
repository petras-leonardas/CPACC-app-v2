import type { TopicSection } from '../types'

export const seizureDisabilities: TopicSection = {
  heading: 'Seizure disabilities',
  content: 'Seizure disabilities involve neurological conditions where seizures interfere with daily activities, safety, or independence. Seizures vary widely in type and severity, from brief changes in awareness to convulsions and loss of consciousness. Some seizures are triggered by visual stimuli, making digital and media environments especially important.',
  subsections: [
    {
      heading: 'Common characteristics',
      content: [
        'Seizures may affect awareness, movement, sensation, or perception',
        'Triggers vary by individual',
        'Recovery time and after-effects can affect participation beyond the seizure itself'
      ]
    },
    {
      heading: 'Statistical context',
      content: [
        'Epilepsy affects approximately 50 million people globally, making it one of the most common neurological conditions.',
        'Photosensitive epilepsy affects about 3% of people with epilepsy.',
        'Flashing or flickering between 16 and 25 times per second is most likely to trigger seizures, though sensitivity varies.'
      ]
    },
    {
      heading: 'Common barriers',
      content: [
        'Activities where sudden loss of consciousness poses risk',
        'Digital content with flashing, flickering, or rapidly changing visuals',
        'Media players without pause, stop, or motion-reduction controls'
      ]
    },
    {
      heading: 'Practical accessibility solutions',
      content: [
        'Avoid flashing content beyond safe thresholds',
        'Minimize unnecessary motion and visual effects',
        'Provide user controls to pause, stop, or reduce animation and video effects',
        'Design for visual stability and predictability'
      ]
    }
  ]
}
