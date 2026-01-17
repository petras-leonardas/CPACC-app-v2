import type { TopicSection } from '../types'

export const visualDisabilities: TopicSection = {
  heading: 'Visual disabilities',
  content: 'Visual disabilities include a wide spectrum of experiences related to seeing. They are not limited to total blindness and often involve partial, fluctuating, or context-dependent vision. Some people rely primarily on non-visual access to information, while others depend on magnification, contrast enhancement, or stable visual layouts. The way visual disability affects someone\'s daily life depends heavily on lighting conditions, visual complexity, and how information is presented.',
  subsections: [
    {
      heading: 'Common subtypes and characteristics',
      content: [
        '<strong>Blindness:</strong> Blindness can range from complete absence of vision to limited perception of light, contrast, or large shapes. Some people may detect light or movement but cannot read text or recognize faces visually. Others may have usable vision in specific conditions but still rely on non-visual access for most tasks.',
        '<strong>Low vision:</strong> Low vision refers to vision that cannot be fully corrected with glasses, contact lenses, medication, or surgery and interferes with daily activities. People with low vision may need magnification, strong contrast, or layouts that remain usable when zoomed. Low vision is best understood functionally: it is "not enough vision to do what you need to do," and that threshold differs from person to person.',
        '<strong>Color vision differences:</strong> Color vision differences affect the ability to distinguish certain colors. The most common form involves difficulty distinguishing red and green, but blue-yellow differences also exist. Color vision differences do not usually affect sharpness of vision, but they can make information conveyed only through color completely inaccessible.'
      ]
    },
    {
      heading: 'Statistical context',
      content: [
        'Globally, at least 2.2 billion people have vision impairment or blindness, and at least 1 billion cases are preventable or unaddressed (World Health Organization).',
        'The leading causes worldwide are uncorrected refractive errors and cataracts.',
        'Most people with vision impairment are over 50 years old.',
        'Low vision affects ~246 million people (3.5% of the global population), and around 90% live in low-income settings.',
        'Red–green color vision deficiency affects 1 in 12 males (8.3%) and 1 in 200 females (0.5%).',
        'Blue–yellow color vision deficiency occurs in fewer than 1 in 100,000 people worldwide.'
      ]
    },
    {
      heading: 'Common barriers',
      content: [
        'Physical and service environments that rely exclusively on visual information (printed-only signage, visual-only instructions)',
        'Poor lighting, glare, or visually cluttered environments',
        'Obstacles in walking paths that cannot be detected non-visually',
        'Digital content where images, buttons, or controls lack meaningful text alternatives',
        'Interfaces that break or lose information when zoomed',
        'Navigation that lacks structure, orientation cues, or consistency',
        'Low contrast text or reliance on color alone to convey meaning',
        'Experiences that assume mouse use and fail with keyboard-only interaction'
      ]
    },
    {
      heading: 'Practical accessibility solutions',
      content: [
        '<strong>Physical environments:</strong> predictable layouts, clear paths, tactile and non-visual cues, readable and discoverable labeling',
        '<strong>Digital environments:</strong> text alternatives for meaningful non-text content; layouts that remain usable when zoomed; strong contrast; no color-only communication; consistent navigation and structure'
      ]
    }
  ]
}
