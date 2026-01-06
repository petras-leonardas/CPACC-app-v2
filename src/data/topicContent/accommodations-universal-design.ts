import type { DetailedTopicContent } from './types'

export const accommodationsUniversalDesign: DetailedTopicContent = {
  topicId: 'accommodations-universal-design',
  introduction: [
    'Universal design is an approach to creating products, services, and environments so they can be used by as many people as possible, from the outset, without requiring special adjustments. Instead of treating access as an afterthought or an exception, universal design treats human diversity as a normal condition of use. This perspective is especially important in accessibility work because it shifts effort upstream—into design decisions—rather than relying primarily on fixes later.',
    'This topic also sits at the intersection of accessibility and usability. While these concepts are closely related, they are not identical. Understanding how they overlap and where they differ helps teams choose the right strategies, avoid false trade-offs, and recognize when universal design can reduce the need for individual accommodations—while still respecting that accommodations and assistive technologies will sometimes remain necessary.'
  ],
  learningPoints: [
    'Understand how universal design differs from accommodations and why both still matter',
    'Recognize the relationship between accessibility, usability, and universal design',
    'Explain why designing for diversity benefits everyone, not only disabled users',
    'Apply universal design thinking earlier in design and decision-making processes'
  ],
  sections: [
    {
      heading: 'Universal design and accommodations',
      content: [
        'At its core, universal design aims to create solutions that work for the widest possible range of people without requiring individual changes. A universally designed product or service anticipates variation in ability, age, language, experience, and context of use. Instead of asking users to adapt themselves, the design adapts to them.',
        'Accommodations work differently. They are targeted adjustments made for a specific person or situation to ensure equal access. Examples include providing a sign language interpreter for a meeting, offering extra time on a test, or installing a screen reader on a particular workstation. Accommodations are often essential, especially in existing systems that were not designed inclusively.',
        'Universal design does not eliminate the need for accommodations or assistive technologies. Rather, it reduces how often they are required. When environments and products are designed to be flexible and inclusive from the beginning, fewer people need special arrangements or personal assistance just to participate. This can reduce cost, effort, and stigma, while still leaving room for individualized support when it is genuinely needed.'
      ]
    },
    {
      heading: 'Related design concepts',
      content: [
        'The idea behind universal design has influenced several closely related approaches. These concepts often overlap in practice and share a common goal: making things usable by as many people as possible without special adaptation.',
        'Inclusive design emphasizes designing with, not just for, people who have diverse needs. It often highlights the importance of involving users with disabilities and other marginalized groups directly in the design process.',
        'Design for all is a term commonly used in Europe, particularly in policy and standards contexts. It reflects the same underlying philosophy as universal design and is often applied at an organizational or societal level, guiding how products and services are developed across entire systems.',
        'Human-centered design focuses on understanding users\' needs, behaviors, and contexts. While it does not always explicitly address disability, it can strongly support universal design when it intentionally includes people with a wide range of abilities and experiences.',
        'Life-span design emphasizes that people\'s abilities change over time. A design that works well for children, adults, and older people is more likely to be resilient, flexible, and inclusive overall.',
        'Despite differences in terminology, all of these approaches share the same central idea: designing for diversity from the start rather than retrofitting solutions later.'
      ]
    },
    {
      heading: 'Accessibility, usability, and universal design',
      content: [
        'Universal design is closely connected to both accessibility and usability, but each concept has a distinct emphasis.',
        'Accessibility focuses on ensuring that people with disabilities can use a product, service, or environment without barriers or discrimination. It is concerned with equivalent access and comparable experiences, and it often addresses specific requirements related to sensory, physical, cognitive, or communication differences.',
        'Usability focuses on how easy and efficient something is to use. It considers factors like clarity, efficiency, error prevention, and user satisfaction. However, usability work does not automatically account for disability unless it is explicitly included in research and testing.',
        'Universal design sits alongside these concepts by aiming for broad inclusion without defining narrow target groups. Rather than designing separately for "typical users" and "edge cases," universal design treats variation as expected. When done well, universal design supports accessibility goals and often improves usability for everyone.',
        'Together, these concepts reinforce one another. Accessibility ensures fairness and inclusion, usability ensures ease and effectiveness, and universal design provides a mindset for addressing both early and holistically.'
      ]
    }
  ]
}
