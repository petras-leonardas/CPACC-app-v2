import type { DetailedTopicContent } from './types'

export const universalDesignPrinciples: DetailedTopicContent = {
  topicId: 'universal-design-principles',
  introduction: [
    'Universal design is grounded in the idea that environments, products, and services should work well for everyone, without needing special adaptation or separate solutions. The seven principles of universal design provide a practical framework for translating this idea into real design decisions. They describe what "good design for human diversity" looks like in practice and help designers evaluate whether something truly supports a wide range of users.',
    'These principles were developed in 1997 by an interdisciplinary working group led by Ronald Mace at North Carolina State University. They were originally rooted in the built environment, but they now influence design across architecture, products, digital interfaces, services, and systems. The principles emphasize that universal design is not about designing for a niche group—it is about creating solutions that are usable, dignified, and beneficial for everyone.'
  ],
  learningPoints: [
    'Name and recognize the seven principles of universal design',
    'Understand the goals behind universal design as a design philosophy',
    'Apply universal design principles to physical and digital environments',
    'Explain why universal design benefits both individuals and society'
  ],
  sections: [
    {
      heading: 'The goals and benefits of universal design',
      content: [
        'The goal of universal design is to ensure that environments and products can be accessed, understood, and used by as many people as possible, regardless of age, size, ability, or disability. This approach treats human variation as normal rather than exceptional. When design accounts for this diversity from the start, it reduces barriers, increases independence, and improves overall user experience.',
        'Universal design benefits extend beyond people with disabilities. Designs that are clear, flexible, safe, and comfortable tend to be easier for everyone to use. They reduce the need for special instructions, individual accommodations, or retrofits. As a result, universal design often leads to better quality, lower long-term costs, and solutions that feel more intuitive and humane.'
      ]
    },
    {
      heading: '1. Equitable use',
      content: [],
      subsections: [
        {
          heading: 'What it means?',
          content: 'Equitable use means that a design can be used by people with diverse abilities in comparable ways. Whenever possible, everyone should be able to use the same solution rather than being separated into "standard" and "special" options.'
        },
        {
          heading: 'Why it matters?',
          content: 'When designs require separate solutions for different users, they risk creating stigma and making accessibility feel like special treatment. Equitable designs avoid segregation by ensuring that features related to privacy, safety, and security are equally available to all users, making inclusion feel natural rather than exceptional.'
        },
        {
          heading: 'In practice',
          content: 'Automatic doors benefit everyone—wheelchair users, parents with strollers, delivery workers with packages, and people with temporary injuries. Touch-screen kiosks with audio interfaces allow both sighted and blind users to complete tasks independently using the same device, without requiring assistance or a separate "accessible" version.'
        },
        {
          heading: 'Common mistakes',
          content: 'Creating separate "accessible entrances" at the back of buildings, designing websites with a separate "text-only" version for screen reader users, or providing assistive features that draw unwanted attention to disability status.'
        }
      ]
    },
    {
      heading: '2. Flexibility in use',
      content: [],
      subsections: [
        {
          heading: 'What it means?',
          content: 'Flexibility in use acknowledges that people have different preferences, abilities, and ways of interacting with the world. A flexible design provides choices in how something can be used, accommodating different interaction styles, speeds, and methods.'
        },
        {
          heading: 'Why it matters?',
          content: 'People work differently based on their abilities, preferences, and contexts. Rigid designs force users into a single mode of interaction, which can exclude those who cannot use that method or make tasks unnecessarily difficult. Flexible designs respect human diversity and allow people to choose approaches that work best for them.'
        },
        {
          heading: 'In practice',
          content: 'Scissors designed for both left and right-handed use. Mobile apps that work in both portrait and landscape orientation. Adjustable-height desks that accommodate both sitting and standing. Websites that support keyboard, mouse, touch, and voice navigation. Video controls that allow users to adjust speed, enable captions, or read transcripts.'
        },
        {
          heading: 'Common mistakes',
          content: 'Designing interfaces that only work with a mouse, creating time-limited interactions without pause options, forcing users into a single input method, or assuming all users will interact at the same speed or in the same way.'
        }
      ]
    },
    {
      heading: '3. Simple and intuitive use',
      content: [],
      subsections: [
        {
          heading: 'What it means?',
          content: 'Simple and intuitive use focuses on clarity. A design should be easy to understand, regardless of the user\'s experience level, language skills, concentration, or familiarity with technology.'
        },
        {
          heading: 'Why it matters?',
          content: 'Unnecessary complexity creates barriers for everyone but especially impacts people with cognitive disabilities, limited literacy, language differences, or those under stress. When designs align with user expectations and provide clear feedback, people can accomplish tasks confidently without extensive instructions or training.'
        },
        {
          heading: 'In practice',
          content: 'Icons paired with text labels so meaning is clear. Consistent navigation patterns across a website. Progress indicators during multi-step processes. Error messages that explain what went wrong and how to fix it. Elevator buttons with both numbers and Braille, organized in logical order.'
        },
        {
          heading: 'Common mistakes',
          content: 'Using unclear icons without labels, changing navigation patterns between pages, hiding important features in obscure menus, providing jargon-heavy instructions, or creating interfaces that require extensive prior knowledge to use.'
        }
      ]
    },
    {
      heading: '4. Perceptible information',
      content: [],
      subsections: [
        {
          heading: 'What it means?',
          content: 'Perceptible information ensures that essential information is communicated effectively to all users, regardless of sensory abilities or environmental conditions. Information should never rely on a single sense to be understood.'
        },
        {
          heading: 'Why it matters?',
          content: 'People with sensory disabilities—such as blindness, low vision, deafness, or hearing loss—cannot access information that relies exclusively on sight or sound. Additionally, environmental factors like bright sunlight, noisy spaces, or dim lighting can make information hard to perceive even for people without disabilities. Presenting information in multiple formats ensures everyone can access it.'
        },
        {
          heading: 'In practice',
          content: 'Fire alarms with both sound and flashing lights. Subway announcements both audible and displayed on screens. Tactile ground surface indicators at pedestrian crossings. High-contrast text on backgrounds. Captions and transcripts for video content. Visual and auditory feedback when buttons are pressed.'
        },
        {
          heading: 'Common mistakes',
          content: 'Using color alone to convey information, providing audio-only announcements in public spaces, using low-contrast text, relying solely on visual cues like icons without text, or presenting critical information in only one sensory format.'
        }
      ]
    },
    {
      heading: '5. Tolerance for error',
      content: [],
      subsections: [
        {
          heading: 'What it means?',
          content: 'Tolerance for error recognizes that mistakes happen. Designs should minimize both the risk of accidental actions and the consequences when errors do occur.'
        },
        {
          heading: 'Why it matters?',
          content: 'People make mistakes when tired, distracted, learning something new, or working under pressure. Errors are especially common for people with cognitive disabilities, motor impairments, or those unfamiliar with a system. Designs that punish mistakes create anxiety and exclude users who cannot perform actions with perfect precision every time.'
        },
        {
          heading: 'In practice',
          content: 'Undo buttons and confirmation dialogs before deleting important data. Elevator buttons that can be pressed again to cancel a floor selection. Power tools with two-stage triggers that prevent accidental activation. Guardrails and warnings near hazards. Auto-save features that prevent data loss. Forgiving form inputs that accept multiple date formats.'
        },
        {
          heading: 'Common mistakes',
          content: 'Placing destructive actions (like "Delete All") next to safe actions without confirmation, providing no way to undo irreversible actions, designing controls that are easy to activate accidentally, or creating systems with harsh penalties for minor errors.'
        }
      ]
    },
    {
      heading: '6. Low physical effort',
      content: [],
      subsections: [
        {
          heading: 'What it means?',
          content: 'Low physical effort means that a design can be used comfortably and efficiently without unnecessary physical strain, awkward positions, or repetitive actions.'
        },
        {
          heading: 'Why it matters?',
          content: 'People with limited strength, stamina, chronic pain, or mobility impairments may struggle with designs that require sustained force, precise movements, or uncomfortable positions. Even for people without disabilities, reducing physical effort decreases fatigue, prevents injury, and improves overall user experience, especially during extended use.'
        },
        {
          heading: 'In practice',
          content: 'Lever-style door handles instead of round knobs that require gripping and twisting. Shopping cart wheels that swivel easily. Voice controls for smart home devices. Automatic soap dispensers. Lightweight laptops. One-handed bottle openers. Touch-sensitive buttons that require minimal force. Adjustable seating that supports neutral body positions.'
        },
        {
          heading: 'Common mistakes',
          content: 'Requiring tight gripping or twisting motions, designing controls that need precise fine motor control, placing frequently used items out of comfortable reach, requiring sustained force to maintain a position, or creating repetitive strain through poor ergonomic design.'
        }
      ]
    },
    {
      heading: '7. Size and space for approach and use',
      content: [],
      subsections: [
        {
          heading: 'What it means?',
          content: 'Size and space for approach and use focuses on ensuring that people can approach, reach, and operate a design regardless of their body size, posture, mobility, or whether they use assistive devices.'
        },
        {
          heading: 'Why it matters?',
          content: 'People come in different sizes and move in different ways. Wheelchair users, people using walkers, parents with strollers, tall or short individuals, and children all need adequate space to approach and use features comfortably. Designs that assume a single body type or overlook spatial requirements create physical barriers that exclude many users.'
        },
        {
          heading: 'In practice',
          content: 'ATMs with lower screens and controls reachable from wheelchair height. Doorways and hallways wide enough for mobility devices. Clear floor space in front of controls and fixtures. Adjustable-height work surfaces. Parking spaces with adequate maneuvering room. Controls and displays positioned where both seated and standing users can see and reach them. Handles and grips sized for different hand sizes.'
        },
        {
          heading: 'Common mistakes',
          content: 'Placing controls too high or too low for some users to reach, designing narrow pathways that don\'t accommodate wheelchairs or walkers, creating spaces with inadequate turning radius, positioning important displays where they can\'t be seen from a seated position, or assuming all users have the same reach range and grip strength.'
        }
      ]
    }
  ]
}
