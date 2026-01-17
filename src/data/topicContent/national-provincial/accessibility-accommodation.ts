import type { TopicSection } from '../types'

export const accessibilityAccommodation: TopicSection = {
  heading: 'Accessibility and reasonable accommodation in law',
  content: [
    'Disability rights laws use two complementary approaches to granting rights and accommodating the needs of people with disabilities: accessibility and reasonable accommodation. Understanding the difference between these approaches is essential for implementing equality in practice.'
  ],
  subsections: [
    {
      heading: 'Reasonable accommodation',
      content: [
        'Reasonable accommodation (also called individual accommodation) aims to ensure equal treatment on a case-by-case basis. It addresses individual needs in specific situations by requiring adjustments or modifications—such as flexible work arrangements, assistive technology, or alternative formats—so that a person with a disability can participate equally.',
        'The <strong>EU Employment Directive</strong> (Directive establishing a general framework for equal treatment in employment and occupation) provides a comprehensive description of reasonable accommodation in employment:',
        '"In order to guarantee compliance with the principle of equal treatment in relation to persons with disabilities, reasonable accommodation shall be provided. This means that employers shall take appropriate measures, where needed in a particular case, to enable a person with a disability to have access to, participate in, or advance in employment, or to undergo training, unless such measures would impose a disproportionate burden on the employer."',
        'Accommodation is typically required unless it would impose an undue or disproportionate burden. This acknowledges that while equality is the goal, there are practical limits based on cost, organizational capacity, and other factors.'
      ]
    },
    {
      heading: 'Accessibility',
      content: [
        'Accessibility focuses on creating environments, services, and systems that are usable by everyone, regardless of disability status. Unlike reasonable accommodation, accessibility requirements apply broadly and proactively—the conditions should be met regardless of whether a person with a disability is present or has made a request.',
        '<strong>Section 508 of the US Rehabilitation Act of 1973</strong> exemplifies this approach. It requires that when federal agencies develop, procure, maintain, or use electronic and information technology, they must ensure it allows:',
        '"individuals with disabilities who are members of the public seeking information or services from a Federal department or agency to have access to and use of information and data that is comparable to the access to and use of the information and data by such members of the public who are not individuals with disabilities."',
        'This means digital services, public buildings, transportation systems, and other resources must meet specific accessibility standards so that people with disabilities do not have to request special treatment or identify themselves as disabled to access basic services.'
      ]
    },
    {
      heading: 'Complementary approaches',
      content: [
        'Together, accessibility and reasonable accommodation reflect the idea that equality requires both inclusive design and individual flexibility. Accessibility ensures that environments are usable from the start, while reasonable accommodation addresses situations where individual needs require specific adjustments.',
        'Both approaches are essential. Accessibility alone cannot address every individual need, and reasonable accommodation alone places too much burden on individuals to request adjustments. Effective disability rights laws combine both approaches to create truly inclusive societies.'
      ]
    }
  ]
}
