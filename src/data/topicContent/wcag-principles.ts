import type { DetailedTopicContent } from './types'

export const wcagPrinciples: DetailedTopicContent = {
  topicId: '2c-wcag-principles',
  introduction: [
    'Think of web accessibility as the digital version of a welcome mat. It is all about making sure that everyone—no matter how they see, hear, move, or process information—can get into the party and enjoy everything on the website. Whether someone is using a high-tech screen reader or just browsing on a phone in bright sunlight, accessibility ensures the web works for them.',
    'The gold standard for this is the <strong>Web Content Accessibility Guidelines</strong>, often called WCAG. Published by the <strong>Web Accessibility Initiative (WAI)</strong> of the <strong>World Wide Web Consortium (W3C)</strong>, WCAG is a set of international standards that define how to make digital content accessible to people with disabilities. WCAG has evolved through several versions: WCAG 2.0 in 2008, WCAG 2.1 in 2018, and WCAG 2.2 in 2023. Each new version builds on the previous one. Most accessibility laws around the world currently reference <strong>WCAG 2.1 Level AA</strong> as their benchmark.'
  ],
  learningPoints: [
    'Understand what web accessibility means in practical, real-world terms',
    'Recognize how WCAG supports people with different types of disabilities',
    'Identify the four core principles that structure accessible web design',
    'Apply accessibility thinking across design, development, and content creation'
  ],
  sections: [
    {
      heading: 'What is web accessibility?',
      content: [
        'At its core, web accessibility means that people can use websites and apps without hitting a brick wall. This means they can take in the info, understand how the buttons work, move around easily, and click "submit" without a hitch.',
        'This covers a huge range of human experiences, including people with visual, hearing, physical, speech, or cognitive disabilities. For example, some people might use a keyboard instead of a mouse, while others might need the text to be extra large and clear.',
        'The best part? Accessible design makes life better for everyone. It helps a parent holding a baby with one hand, a student on a slow internet connection, or someone trying to read a screen in the glaring sun. It\'s just good, resilient design.'
      ]
    },
    {
      heading: 'Meet the four pillars: POUR',
      content: 'The <strong>Web Content Accessibility Guidelines</strong> 2.2 use four main principles to keep us on track. You can remember them with the acronym POUR.',
      subsections: [
        {
          heading: '1. Perceivable: Can I see or hear it?',
          content: [
            '<strong>Perceivable</strong> means that information must not be invisible to any of a user\'s available senses. If a piece of content only exists in a picture, a person who is blind will not know it is there.',
            'To fix this, we provide text alternatives for images so a screen reader can speak the picture.',
            'A screen reader is a piece of software that reads out the text on a screen for users who cannot see it.',
            'We also add captions to videos so people who are deaf can read what is being said. Content should be flexible—like a piece of clay—so it can be resized or changed to high contrast without breaking.'
          ]
        },
        {
          heading: '2. Operable: Can I use it?',
          content: [
            '<strong>Operable</strong> means that all interface components and navigation must be usable through a variety of input methods. Not everyone can use a mouse. Some people use their voice, a single-button switch device, or a standard keyboard.',
            'Being <strong>operable</strong> means the website doesn\'t have any trap doors. Users should have plenty of time to read things without a timer rushing them, and they should never run into flashing lights that might cause a seizure. It\'s about making the controls easy to find and easy to use for everyone.'
          ]
        },
        {
          heading: '3. Understandable: Does it make sense?',
          content: [
            '<strong>Understandable</strong> means that content must be readable and the interface must behave in predictable ways. The text should be clear, the navigation should be consistent, and the website should operate in a manner that users can anticipate.',
            'If a user makes a mistake on a form, an understandable website doesn\'t just say "Error." It gives a helpful hint on how to fix it. This is especially important for people with cognitive or learning disabilities, as it lowers the brain power needed to get things done.'
          ]
        },
        {
          heading: '4. Robust: Will it keep working?',
          content: [
            '<strong>Robust</strong> means that content must be built with clean, well-structured code so it works reliably across current and future technologies.',
            'When code is robust, it means it plays well with others—specifically with different browsers and assistive technologies.',
            'Assistive technology is any tool or software, like a magnifying app or a specialized keyboard, that helps a person with a disability use a computer.',
            'This ensures that as technology changes, the accessibility doesn\'t break.',
            'By following these four principles, we make sure the web stays open, inclusive, and ready for everyone.',
            'WCAG defines three <strong>conformance levels</strong> that indicate how thoroughly a site meets accessibility requirements. <strong>Level A</strong> covers the most basic requirements. <strong>Level AA</strong> addresses the most common barriers and is the standard required by most accessibility laws and policies worldwide. <strong>Level AAA</strong> represents the highest level of accessibility, though it is not typically required as a blanket standard because not all content can meet every AAA criterion. When organizations say they comply with WCAG, they almost always mean Level AA.'
          ]
        }
      ]
    }
  ]
}
