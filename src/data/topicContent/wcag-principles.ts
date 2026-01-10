import type { DetailedTopicContent } from './types'

export const wcagPrinciples: DetailedTopicContent = {
  topicId: '2c-wcag-principles',
  introduction: [
    'Web accessibility is about making sure websites and applications can be used by as many people as possible, including people with disabilities. It focuses on whether users can perceive information, understand it, navigate interfaces, interact with controls, and contribute content in meaningful ways. Accessibility is not limited to a small group of users—it reflects the reality that people use the web in many different ways, with different devices, abilities, and contexts.',
    'The Web Content Accessibility Guidelines (WCAG) provide a shared framework for achieving this goal. Developed by the World Wide Web Consortium through its Web Accessibility Initiative, WCAG brings together technical standards and universal design thinking. While the guidelines are often used to support compliance, their deeper purpose is to make digital content more usable, resilient, and inclusive for everyone.'
  ],
  learningPoints: [
    'Understand what web accessibility means in practical, real-world terms',
    'Recognize how WCAG supports people with different types of disabilities',
    'Learn the four core principles that structure accessible web design',
    'Apply accessibility thinking across design, development, and content creation'
  ],
  sections: [
    {
      heading: 'What web accessibility means?',
      content: [
        'Web accessibility means that people can use websites, tools, and applications regardless of disability. This includes being able to take in information, understand how things work, move through content, interact with controls, and create or submit information when needed.',
        'Disabilities that affect web access include auditory, visual, physical, speech, cognitive, and neurological disabilities. Each of these can influence how someone uses a website—for example, whether they rely on a keyboard instead of a mouse, need captions instead of audio, require clear structure and language, or use assistive technologies such as screen readers.',
        'Importantly, accessible design also benefits many people without disabilities. People using mobile devices, people in noisy or brightly lit environments, older adults with changing abilities, people with temporary injuries, and people with slow or limited internet connections all benefit from clearer structure, flexible interaction, and well-designed content. In this sense, web accessibility reflects inclusive and resilient design, not special treatment.'
      ]
    },
    {
      heading: 'The role of WCAG 2.2',
      content: [
        'The Web Content Accessibility Guidelines (WCAG) provide recommendations for making web content accessible. WCAG 2.2 builds on earlier versions and continues to emphasize that accessibility and usability are closely connected. Content that meets these guidelines is often easier to use, more consistent, and more adaptable across devices and technologies.',
        'WCAG is organized around four high-level principles. These principles describe what must be true for content to be accessible, regardless of the specific technology being used. Under each principle are guidelines that address common accessibility challenges and patterns.'
      ]
    },
    {
      heading: 'Perceivable',
      content: [
        'The perceivable principle is about making sure users can take in the information being presented. Content must not rely on a single sense, such as sight or hearing, to be understood.',
        'This includes providing text alternatives for images and other non-text content, so information can be conveyed through screen readers or other assistive technologies. Multimedia content should have alternatives such as captions or transcripts so that audio and visual information is available in more than one form.',
        'Perceivable content is also flexible. It can be presented in different ways—such as enlarged text, high contrast, or alternative layouts—without losing meaning. This supports people with low vision, color vision differences, or those who need to customize how content appears in order to understand it.'
      ]
    },
    {
      heading: 'Operable',
      content: [
        'The operable principle focuses on interaction. Users must be able to navigate and use all functionality, regardless of how they interact with the web.',
        'This includes ensuring that everything can be done using a keyboard, since not everyone can use a mouse or touch interface. Users should also have enough time to read content and complete tasks, without being rushed by unexpected time limits.',
        'Operable design avoids content that can trigger seizures or physical reactions and supports clear navigation so users can find their way through a site. It also recognizes that people may use different input methods, such as voice control, switches, or touch, and aims to make interaction flexible and forgiving.'
      ]
    },
    {
      heading: 'Understandable',
      content: [
        'The understandable principle is about clarity and predictability. Content should be written and structured in a way that users can comprehend and learn from.',
        'Text should be readable and appropriate for its audience, avoiding unnecessary complexity. Interfaces should behave in consistent and predictable ways so users are not surprised by unexpected changes in context or functionality.',
        'Understandable design also helps users avoid mistakes and recover from them when they occur. Clear instructions, helpful error messages, and guidance during form completion all reduce cognitive load and frustration, particularly for people with cognitive or learning disabilities.'
      ]
    },
    {
      heading: 'Robust',
      content: [
        'The robust principle ensures that content works reliably with a wide range of user tools, both now and in the future.',
        'This means using clean, well-structured code that can be interpreted correctly by browsers, assistive technologies, and other user agents. When content is robust, it is more likely to remain accessible as technologies evolve and new tools emerge.',
        'Robust design supports long-term accessibility. It recognizes that users rely on a diverse ecosystem of technologies and that accessibility should not break when software updates, devices change, or new interaction methods are introduced.',
        'Together, these four principles—perceivable, operable, understandable, and robust—form the foundation of modern web accessibility. They provide a shared language for designers, developers, and content creators to build digital experiences that are inclusive, usable, and sustainable.'
      ]
    }
  ]
}
