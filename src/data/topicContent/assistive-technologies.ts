import type { DetailedTopicContent } from './types'

export const assistiveTechnologies: DetailedTopicContent = {
  topicId: '1c-assistive-technologies',
  introduction: [
    'When we think about navigating the world, we are really talking about two main things: the tools we carry with each of us and the clever ways we adjust our behavior to get things done. Assistive technology refers to the physical or digital tools that help a person complete a task. Think of it like a bicycle for the mind or body; it helps you get where you want to go when walking might be too difficult. Adaptive strategies are the personal "life hacks" or adjustments people make to their environment or their own actions to make a task easier.',
    'This topic is important because great design happens where people, their environment, and their tools meet. Even the most beautiful building or website needs to be friendly to the personal tools people bring with them. When we understand these tools, we can design things that don\'t get in the way of how people actually live their lives.',
  ],
  learningPoints: [
    'Tell the difference between a tool someone brings with them, a personal strategy they use, and features that are already built into a product.',
    'Spot when a barrier should be fixed by the designer instead of making the user figure out a workaround.',
    'Describe how people mix and match tools, settings, and changes to their surroundings to finish a task.',
    'See that helpful solutions can be high-tech gadgets or simple, low-tech items.',
    'Make sure that digital products and physical spaces work perfectly with the tools people use every day.',
  ],
  sections: [
    {
      heading: 'Getting to know the tools and the tactics',
      content: 'To understand how accessibility works in the real world, we need to look at three different but related ideas.',
      subsections: [
        {
          heading: 'Assistive technology',
          content: [
            'Assistive technology is any item or system that helps someone do something they might otherwise struggle to do. This is a very big category that includes:<ul class="list-disc ml-6 mt-2 space-y-1"><li><strong>High-tech tools:</strong> This could be software that reads the words on a screen out loud or a device that turns digital text into Braille.</li><li><strong>Low-tech tools:</strong> This could be something as simple as a printed board with pictures used for communication or a physical grab bar.</li><li><strong>Everyday tools:</strong> Sometimes, a standard smartphone becomes assistive technology when someone uses the built-in settings to make the text larger or the colors easier to see.</li></ul>',
            'Essentially, these tools give people more independence by changing how they receive information or how they interact with the world.',
          ]
        },
        {
          heading: 'Adaptive strategies',
          content: [
            'Adaptive strategies are the "how-to" methods people use to make life work for them. These aren\'t necessarily tools you buy, but rather choices you make. This includes:<ul class="list-disc ml-6 mt-2 space-y-1"><li><strong>Changing where you are:</strong> For example, someone might move to the front of a room to hear a speaker more clearly.</li><li><strong>Changing the pace:</strong> This could mean taking more breaks or breaking a big project into smaller, more manageable steps.</li><li><strong>Making it personal:</strong> Adjusting the brightness on a screen or changing the font size to make reading more comfortable.</li><li><strong>Choosing different ways to talk:</strong> Someone might choose to type a message instead of speaking it if they are in a loud place or if their voice is tired.</li></ul>',
            'These strategies are vital because they allow people to adapt to things like stress, bright lights, or just a long, tiring day.',
          ]
        },
        {
          heading: 'Accessibility solutions',
          content: 'Accessibility solutions are the changes made directly to a product or a building to remove a hurdle at the source. This is where the person in charge of the product takes responsibility. If a building has a ramp and wide doors, a person using a wheelchair doesn\'t have to struggle to find a back entrance. When we build things correctly from the start, people don\'t have to rely so heavily on workarounds.'
        },
      ]
    },
    {
      heading: 'Tools can be digital, physical, or a bit of both',
      content: [
        'While we often think of "tech" as computers, assistive tools are everywhere. Some are purely software-based, like a program that helps with spelling. Others are purely physical, like a cane or a tactile label on a microwave.',
        'In many cases, people use a "stack" of things all at once. For example, someone might use a specific physical tablet, with a special app installed, while sitting in a room that has been dimmed to make the screen easier to see. Everything needs to work together without any "glitches" or interruptions.',
      ],
    },
    {
      heading: 'Making sure tools can talk to each other',
      content: [
        'For digital tools to work, they need to be able to "read" the structure of a website or an app. This is called interoperability. Imagine trying to read a map that has no labels; that is what it feels like for a screen reader when a website doesn\'t have proper descriptions for its buttons.',
        'To keep things working smoothly, we must ensure:<ul class="list-disc ml-6 mt-2 space-y-1"><li>Buttons and menus have clear, hidden names that software can understand.</li><li>Content follows a logical order.</li><li>The system doesn\'t assume everyone is using a mouse or a touch screen.</li></ul>',
      ],
    },
    {
      heading: 'Simplicity often wins the day',
      content: 'Not all help comes from an expensive computer. A simple piece of cardboard with "Yes" and "No" written on it can be a life-changing tool for communication. It doesn\'t need a battery, it won\'t break if you drop it, and it\'s easy for everyone to understand. Whether a tool is "high-tech" or "low-tech" matters less than whether it helps someone join in on the fun.',
    },
    {
      heading: 'Personal strategies are the invisible layer',
      content: 'Often, the clever ways people adapt are invisible to others. You might not notice that someone has chosen a specific seat to avoid the glare of a window, or that they are using a "do not disturb" mode to help them focus. These strategies remind us that everyone\'s needs change throughout the day. A design that is flexible and resilient is much better than one that is rigid and breaks when someone tries to do things a little differently.',
    },
  ]
}
