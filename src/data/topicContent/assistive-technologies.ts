import type { DetailedTopicContent } from './types'

export const assistiveTechnologies: DetailedTopicContent = {
  topicId: 'assistive-technologies',
  introduction: [
    'Assistive technologies and adaptive strategies are two complementary ways people navigate barriers in the physical world and in digital spaces. Assistive technology refers to tools—ranging from simple low-tech items to advanced software and devices—that help someone complete tasks that would otherwise be difficult or impossible. Adaptive strategies are the practical adjustments people make in how they do things: changing their environment, changing their approach, or using built-in settings and workarounds to get the same outcome in a different way.',
    'This topic matters because accessibility work sits at the intersection of people, environments, and tools. Even when a product or space is well designed, people will still use a mix of personal technology, personalization settings, and situational strategies to meet their needs. Understanding what these tools and strategies look like helps you design systems that work well with them—rather than accidentally blocking, undermining, or ignoring how people actually operate.'
  ],
  learningPoints: [
    'Distinguish between assistive technology, adaptive strategies, and built-in accessibility features',
    'Identify when barriers should be removed through design rather than "pushed onto" the individual',
    'Explain how people combine tools, settings, and environmental adjustments to complete tasks',
    'Recognize that assistive solutions can be low-tech, high-tech, personal, and situational',
    'Anticipate compatibility needs between assistive tools and digital products or physical environments'
  ],
  sections: [
    {
      heading: 'Key terms and the relationship between them',
      content: 'Understanding the distinctions between assistive technology, adaptive strategies, and accessibility solutions helps clarify where responsibility sits and how different approaches work together.'
    },
    {
      heading: 'Assistive technology',
      content: 'Assistive technology is any product, device, system, or item that helps a person perform tasks they could not do (or could not do reliably) without that support. The category includes:',
      subsections: [
        {
          heading: '',
          content: [
            'High-tech tools, like software that reads content aloud or devices that translate digital text into another output.',
            'Low-tech tools, like a paper-based communication board or a simple physical aid.',
            'General-purpose tools used in an assistive way, like a phone using built-in accessibility settings.'
          ]
        },
        {
          heading: '',
          content: 'A useful way to think about assistive technology is: it provides capability, access, or independence by changing how information is presented, how input is performed, or how tasks are completed.'
        }
      ]
    },
    {
      heading: 'Adaptive strategies',
      content: 'Adaptive strategies are the "how" people adjust their behavior or environment to accomplish tasks. They often involve:',
      subsections: [
        {
          heading: '',
          content: [
            'Changing position or context (for example, moving closer to a speaker).',
            'Altering timing or pacing (taking more time, breaking a task into steps).',
            'Personalizing presentation (adjusting text size, contrast, layout, audio levels).',
            'Choosing different interaction methods (typing instead of speaking, using shortcuts, avoiding tasks in noisy environments).'
          ]
        },
        {
          heading: '',
          content: 'Adaptive strategies are especially important because they reflect real life: people constantly adapt to circumstances, fatigue, stress, lighting, noise, time pressure, and changing symptoms.'
        }
      ]
    },
    {
      heading: 'Accessibility solutions',
      content: [
        'Accessibility solutions are changes to products, services, and environments that remove barriers at the source. This matters because assistive tech and adaptive strategies should not be the only path to participation. When the environment is built well, people need fewer workarounds and experience less friction.',
        'A critical point: the responsibility for accessibility sits with the provider/owner of the product, service, or space—not with the person who has to navigate it.'
      ]
    },
    {
      heading: 'Assistive technology can be digital, physical, or both',
      content: 'It\'s common to associate assistive technology with computers, but the scope is broader:',
      subsections: [
        {
          heading: '',
          content: [
            'Some assistive tools are computer-based (software and settings).',
            'Some are physical-world tools (mobility aids, tactile labels, communication boards).'
          ]
        },
        {
          heading: '',
          content: 'Many experiences blend both (a device in the physical world that relies on digital content, or vice versa).'
        },
        {
          heading: '',
          content: 'This is important because people rarely use one tool in isolation. They often rely on a stack:'
        },
        {
          heading: '',
          content: [
            'a device,',
            'plus an app or software feature,',
            'plus compatible content structure,',
            'plus an environment that doesn\'t interfere.'
          ]
        }
      ]
    },
    {
      heading: 'Assistive tech often depends on "user agents" and interoperability',
      content: [
        'Some assistive technologies rely on other systems to function properly—for example, software or devices that interpret the structure and content provided by a browser, media player, or app. When a digital product is built with weak semantics, missing labels, unpredictable navigation, or custom controls that don\'t expose meaningful information, assistive technologies may not have the data they need to work.',
        'Practically, this means accessibility is not just about having assistive tools available—it\'s about ensuring compatibility:'
      ],
      subsections: [
        {
          heading: '',
          content: [
            'controls need programmatic names and roles,',
            'content needs meaningful structure,',
            'interactions need to work without narrow input assumptions.'
          ]
        }
      ]
    },
    {
      heading: 'Low-tech and "ordinary" tools still count',
      content: 'Not all assistive technology is expensive, clinical, or specialized. A cardboard communication board is a good example of an assistive tool that can be effective precisely because it is:',
      subsections: [
        {
          heading: '',
          content: [
            'simple,',
            'durable,',
            'easy to understand,',
            'usable without power or connectivity.'
          ]
        },
        {
          heading: '',
          content: 'Likewise, many supports that people use day-to-day can be considered assistive depending on context:'
        },
        {
          heading: '',
          content: [
            'built-in device settings,',
            'mainstream apps used to scaffold memory or attention,',
            'simple physical modifications and labels.'
          ]
        },
        {
          heading: '',
          content: 'The boundary is less about what the tool is and more about what it enables.'
        }
      ]
    },
    {
      heading: 'Different definitions exist depending on context',
      content: 'The term "assistive technology" is used differently in different systems:',
      subsections: [
        {
          heading: '',
          content: [
            'In some contexts, it refers specifically to tools provided through public programs or social support systems.',
            'In other contexts, it includes anything that helps—including off-the-shelf consumer products and free tools.'
          ]
        },
        {
          heading: '',
          content: 'When communicating about assistive tech in professional work, it helps to clarify which meaning you\'re using, because it affects procurement, eligibility, support expectations, and access to funding.'
        }
      ]
    },
    {
      heading: 'Adaptive strategies are personal, situational, and often invisible',
      content: [
        'Adaptive strategies are frequently the "in-between layer" that outsiders miss. They can look small, but they are often the difference between success and failure in a task.',
        'Examples of adaptive strategies in practice include:'
      ],
      subsections: [
        {
          heading: '',
          content: [
            'changing where someone sits to improve hearing or reduce distractions,',
            'slowing down and working in shorter bursts to manage fatigue,',
            'turning on a distraction-free mode to reduce cognitive load,',
            'using personalization settings to make text readable and navigation predictable.'
          ]
        },
        {
          heading: '',
          content: 'These strategies remind us that disability is not static. People\'s capacity shifts across the day and across environments, and good design supports those fluctuations rather than punishing them.'
        }
      ]
    },
    {
      heading: 'How this connects back to design and implementation',
      content: 'Understanding assistive technologies and adaptive strategies changes how you design:',
      subsections: [
        {
          heading: '',
          content: [
            'You become more careful about not breaking compatibility (custom controls, missing labels, inaccessible media).',
            'You design with multiple ways to complete tasks, because people use different input/output methods.',
            'You respect the fact that people may be combining tools and strategies—so your design should be resilient, not fragile.',
            'You recognize that the best outcome is often removing the barrier in the product or environment, so assistive tools are a choice—not a requirement.'
          ]
        }
      ]
    }
  ]
}
