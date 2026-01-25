import type { DetailedTopicContent } from './types'

export const integratingIct: DetailedTopicContent = {
  topicId: '3f-integrating-ict',
  introduction: [
    'Building accessible Information and Communication Technology (ICT) isn\'t a one-time project you can finish and forget about. Think of ICT as all the digital tools we use to talk and share info, like websites, apps, and software. To really make it work, accessibility needs to be part of the office DNA. It should be built into how a team thinks, buys tools, and creates things every single day.',
    'When we treat accessibility as a permanent program rather than a quick fix, it grows alongside the company. This ensures that no matter how much technology changes, everyone is still invited to the digital party.',
  ],
  learningPoints: [
    'List the main steps for starting an accessibility plan that covers the whole organization.',
    'See why accessibility needs to be a forever program, not just a one-off project.',
    'Explain how "maturity models" help a company plan and see how they are doing.',
    'Understand why it is so important to have leaders who cheer for accessibility.',
  ],
  sections: [
    {
      heading: 'Accessibility as a program, not a project',
      content: [
        'If you only fix one broken website or do one quick check-up, you haven\'t really solved the problem. Accessibility is a living thing. People leave jobs, new technology is invented, and rules change. To keep up, an organization needs a strategy.',
        'A "programmatic approach" means accessibility is woven into the rules and the way people work. This keeps things consistent and makes sure everyone knows who is responsible for keeping the digital doors open.',
      ],
    },
    {
      heading: 'Steps to start your ICT accessibility plan',
      content: 'Starting a full program happens in four main stages. Each one helps the next, like building a house on a solid foundation.',
      subsections: [
        {
          heading: '1. Initiate',
          content: [
            'This stage is all about getting ready and getting people excited. Before you fix a single line of code, you need to show why this matters.',
            '<strong>What it looks like:</strong> Learning the basics, showing how accessibility helps the business, and getting leaders to say "yes" to the idea.',
          ]
        },
        {
          heading: '2. Plan',
          content: [
            'Planning turns a good idea into a real structure. It decides who does what and where the money comes from.',
            '<strong>What it looks like:</strong> Writing an official policy, setting a budget, and deciding how you will measure success.',
          ]
        },
        {
          heading: '3. Implement',
          content: [
            'This is where the real work happens. Accessibility becomes part of the daily routine for designers, writers, and developers.',
            '<strong>What it looks like:</strong> Training the staff, fixing current tools, and checking for accessibility early and often while building new things.',
          ]
        },
        {
          heading: '4. Sustain',
          content: [
            'This stage makes sure the hard work doesn\'t disappear. It\'s about keeping the momentum going forever.',
            '<strong>What it looks like:</strong> Checking websites regularly, listening to feedback from people with disabilities, and staying up to date with new laws.',
          ]
        },
      ]
    },
    {
      heading: 'Using accessibility maturity models',
      content: [
        'An accessibility maturity model is like a report card that tells a company how well they are doing. Instead of just asking if a website is "accessible," it asks how well the company handles accessibility as a whole.',
        'These models help a company see where they are now and what they need to do to get better. Most models use five levels:<ul class="list-disc ml-6 mt-2 space-y-1"><li><strong>Informal:</strong> There are no real rules or notes on how to do things.</li><li><strong>Defined:</strong> Rules exist, but people don\'t always follow them.</li><li><strong>Repeatable:</strong> The team follows the same good habits every time.</li><li><strong>Managed:</strong> The company watches its progress and tries to improve.</li><li><strong>Best practice:</strong> Accessibility is a natural part of everything the company dreams up.</li></ul>',
      ],
    },
    {
      heading: 'The power of management champions',
      content: 'A "champion" is a leader who stands up for accessibility. They don\'t have to be tech experts, but they do need to believe that including everyone is the right thing to do. When a boss cares about accessibility, the rest of the team usually does too. These leaders help find the budget and the time needed to make things right.',
    },
    {
      heading: 'Checking and hiring for accessibility',
      content: 'You can\'t know if something works unless you test it. It is much cheaper to fix an accessibility issue at the start than it is to fix it after a product has launched.',
      subsections: [
        {
          heading: 'Evaluation best practices',
          content: '<ul class="list-disc ml-6 mt-2 space-y-1"><li>Build things correctly from the very first day.</li><li>Use automated tools to find quick errors, but always have real humans check the work too.</li><li>Invite people with disabilities to test your tools. Their lived experience is the best way to know if something is truly usable.</li></ul>'
        },
        {
          heading: 'Hiring the right people',
          content: [
            'Organizations get stronger when they hire people with disabilities. It\'s important to make sure your job ads are on sites that everyone can use and that your office is ready to welcome everyone.',
            'When hiring for tech roles, look for people who know the <strong>Web Content Accessibility Guidelines (WCAG) 2.1</strong>. These are the international "gold standard" rules for making digital content accessible.',
          ]
        },
      ]
    },
    {
      heading: 'Buying and communicating with care',
      content: [
        'When a company buys software from someone else, they should make sure it is accessible before signing the contract. Large companies have a lot of power to make the market better by only buying tools that everyone can use.',
        'Internal and external talk matters, too. All emails, videos, and social media posts should be easy for everyone to understand. This means using things like "captions" (text that shows what people are saying in a video) and "plain language" (using simple words so everyone understands the message on the first try).',
      ],
    },
    {
      heading: 'Legal and public image',
      content: [
        'Many organizations are required by law to be accessible. Knowing the rules helps a company avoid legal trouble. Beyond the law, being accessible is great for a company\'s reputation. It shows that they care about all their customers and want everyone to be part of what they are building.',
        'By following the <strong>2013 Marrakesh Treaty</strong>, for example, organizations help ensure that books and stories are available in formats like Braille or audio for people who are blind or have low vision. This treaty is a global promise that no one should be kept from learning just because of how they see the world.',
      ],
    },
  ]
}
