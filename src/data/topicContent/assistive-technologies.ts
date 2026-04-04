import type { DetailedTopicContent } from './types'

export const assistiveTechnologies: DetailedTopicContent = {
  topicId: '1c-assistive-technologies',
  introduction: [
    '<strong>Assistive technology</strong> refers to any device, software, or system that helps a person perform tasks they might otherwise find difficult or impossible. These tools range from sophisticated screen readers and speech recognition software to simple items like magnifying glasses and grip aids. Alongside these tools, people develop <strong>adaptive strategies</strong>, which are personal techniques and behavioral adjustments used to navigate tasks and environments more effectively. Together, assistive technologies and adaptive strategies form a critical layer of support that enables people with disabilities to participate fully in education, employment, and daily life.',
    'For CPACC certification candidates, this topic is essential because accessibility professionals must understand the relationship between the products they design and the tools their users rely on. Even the most carefully crafted website or thoughtfully designed building will create barriers if it conflicts with the assistive technologies people depend on. The CPACC exam expects candidates to distinguish between assistive technologies, adaptive strategies, and built-in accessibility features, and to recognize how each category contributes to removing barriers. Mastering these distinctions prepares you to evaluate whether a given solution places responsibility on the user or on the designer.',
  ],
  learningPoints: [
    'Distinguish between assistive technologies, adaptive strategies, and built-in accessibility features.',
    'Recognize when a barrier should be addressed by the designer rather than requiring the user to develop a workaround.',
    'Describe how people combine tools, settings, and environmental changes to complete tasks.',
    'Identify that effective assistive solutions span a spectrum from high-tech digital tools to simple low-tech items.',
    'Evaluate whether digital products and physical spaces are compatible with the assistive tools people use every day.',
  ],
  sections: [
    {
      heading: 'Getting to know the tools and the tactics',
      content: 'To understand how accessibility works in the real world, we need to look at three different but related ideas.',
      subsections: [
        {
          heading: 'Assistive technology',
          content: [
            '<strong>Assistive technology</strong> is any item or system that helps someone do something they might otherwise struggle to do. This is a very big category that includes:<ul class="list-disc ml-6 mt-2 space-y-1><li><strong>High-tech tools:</strong> Screen readers such as JAWS, NVDA, and VoiceOver read the content of a screen aloud. Screen magnifiers like ZoomText enlarge portions of the screen. Speech recognition software such as Dragon NaturallySpeaking lets people control a computer with their voice. Refreshable braille displays convert digital text into tactile braille characters.</li><li><strong>Low-tech tools:</strong> This could be something as simple as a printed board with pictures used for communication, a physical grab bar, or a magnifying glass for reading.</li><li><strong>Everyday tools:</strong> Sometimes, a standard smartphone becomes assistive technology when someone uses built-in accessibility features like text enlargement, color inversion, or the VoiceOver and TalkBack screen readers.</li></ul>',
            'Essentially, these tools give people more independence by changing how they receive information or how they interact with the world.',
          ]
        },
        {
          heading: 'Adaptive strategies',
          content: [
            'Adaptive strategies are the how-to methods people use to make life work for them. These aren\'t necessarily tools you buy, but rather choices you make. This includes:<ul class=list-disc ml-6 mt-2 space-y-1><li><strong>Changing where you are:</strong> For example, someone might move to the front of a room to hear a speaker more clearly.</li><li><strong>Changing the pace:</strong> This could mean taking more breaks or breaking a big project into smaller, more manageable steps.</li><li><strong>Making it personal:</strong> Adjusting the brightness on a screen or changing the font size to make reading more comfortable.</li><li><strong>Choosing different ways to talk:</strong> Someone might choose to type a message instead of speaking it if they are in a loud place or if their voice is tired.</li></ul>',
            'These strategies are vital because they allow people to adapt to things like stress, bright lights, or just a long, tiring day.',
          ]
        },
        {
          heading: 'Built-in accessibility features',
          content: 'Beyond the tools people bring with them and the strategies they develop, many products and environments include <strong>built-in accessibility features</strong> that remove barriers at the source. This is where the person in charge of the product takes responsibility. If a building has a ramp and wide doors, a person using a wheelchair does not need to find a back entrance. When operating systems include screen readers, magnification, and voice control as standard features, users benefit without needing to purchase additional tools. The CPACC Body of Knowledge distinguishes between <strong>assistive technologies</strong> that people bring to a task and <strong>adaptive strategies</strong> that people develop as personal approaches. Both work best when the underlying product has been designed with accessibility in mind from the start.'
        },
      ]
    },
    {
      heading: 'Tools can be digital, physical, or a bit of both',
      content: [
        'While we often think of tech as computers, assistive tools are everywhere. Some are purely software-based, like a program that helps with spelling. Others are purely physical, like a cane or a tactile label on a microwave.',
        'In many cases, people use a stack of things all at once. For example, someone might use a specific physical tablet, with a special app installed, while sitting in a room that has been dimmed to make the screen easier to see. Everything needs to work together without any glitches or interruptions.',
      ],
    },
    {
      heading: 'Making sure tools can talk to each other',
      content: [
        'For digital tools to work, they need to be able to read the structure of a website or an app. This is called interoperability. Imagine trying to read a map that has no labels; that is what it feels like for a screen reader when a website doesn\'t have proper descriptions for its buttons.',
        'To keep things working smoothly, we must ensure:<ul class=list-disc ml-6 mt-2 space-y-1><li>Buttons and menus have clear, hidden names that software can understand.</li><li>Content follows a logical order.</li><li>The system doesn\'t assume everyone is using a mouse or a touch screen.</li></ul>',
      ],
    },
    {
      heading: 'Simplicity often wins the day',
      content: 'Not all help comes from an expensive computer. A simple piece of cardboard with Yes and No written on it can be a life-changing tool for communication. It doesn\'t need a battery, it won\'t break if you drop it, and it\'s easy for everyone to understand. Whether a tool is high-tech or low-tech matters less than whether it helps someone join in on the fun.',
    },
    {
      heading: 'Personal strategies are the invisible layer',
      content: 'Often, the clever ways people adapt are invisible to others. You might not notice that someone has chosen a specific seat to avoid the glare of a window, or that they are using a do not disturb" mode to help them focus. These strategies remind us that everyone\'s needs change throughout the day. A design that is flexible and resilient is much better than one that is rigid and breaks when someone tries to do things a little differently.',
    }
  ]
}
