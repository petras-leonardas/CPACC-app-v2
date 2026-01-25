import type { DetailedTopicContent } from './types'

export const ictStandards: DetailedTopicContent = {
  topicId: '3e-ict-standards',
  introduction: [
    'Information and Communication Technology, which we usually just call ICT, is the heart of how we live today. It is how we chat with friends, buy our groceries, and learn new things. For a long time, laws were mostly about making sure physical things like buildings and buses were easy to use. Today, we realize that a website or an app that doesn\'t work for everyone is just as much of a barrier as a staircase is for someone using a wheelchair.',
    'Modern laws treat digital access as a civil right. These rules help us understand who needs to make their tech accessible, what "accessible" actually looks like, and what happens if those rules aren\'t followed. Instead of just being a "nice to do" suggestion, making digital tools work for everyone is now the law of the land in many places.',
  ],
  learningPoints: [
    'Point out the most important digital accessibility laws in the United States and the European Union.',
    'See how technical rulebooks like WCAG are used to create legal requirements.',
    'Figure out who is responsible for following these rules in both government and private business.',
    'Explain how these laws are actually put into action and checked.',
  ],
  sections: [
    {
      heading: 'Digital tools and our civil rights',
      content: [
        'Digital accessibility laws are all about taking the idea of fairness and applying it to the internet and our devices. These laws cover everything from websites and phone apps to digital documents and the touch-screen kiosks you might use to check in at the airport. Because technology moves so fast, the laws usually point to a set of outside technical rules instead of trying to write every single coding detail into the law itself.',
        'Different parts of the world handle these rules differently. Some places wait for someone to point out a problem, while others have official groups that check in on websites regularly. Usually, government offices have the strictest rules, but private companies are increasingly being told they must "join the party" and make their tools inclusive too.',
      ],
    },
    {
      heading: 'Digital accessibility in the United States',
      content: [],
      subsections: [
        {
          heading: 'Section 508 of the Rehabilitation Act',
          content: [
            'The <strong>Section 508 of the Rehabilitation Act</strong> is a rule that applies specifically to the federal government in the United States. This law is like a rulebook for any technology the government buys or uses.',
            'The <strong>Section 508 of the Rehabilitation Act</strong> ensures that government employees and the public can use federal tech just as easily as anyone else. This is a "look ahead" kind of law—it means accessibility has to be part of the plan from the very start, whether the government is buying a new computer system or updating its website. To keep things clear, it uses a technical standard called WCAG 2.0.',
            '<strong>Section 508 of the Rehabilitation Act</strong> is a US law that requires federal agencies to make their electronic technology accessible to people with disabilities.',
            '<strong>WCAG 2.0</strong> stands for the Web Content Accessibility Guidelines, which is an international list of "how-to" instructions for making websites accessible.',
            'If something isn\'t working right under this law, people can file a complaint directly with the government agency. Most of the pressure to follow these rules comes from the government\'s own internal checks and its rules about which products it is allowed to buy.',
          ]
        },
        {
          heading: 'The Americans with Disabilities Act',
          content: [
            'The <strong>Americans with Disabilities Act</strong> of 1990 is a very famous civil rights law that protects people from being treated unfairly. While it was written before the internet was a big part of our lives, the people who look after our laws say it absolutely applies to websites and apps today.',
            'Title III of the <strong>Americans with Disabilities Act</strong> covers "places of public accommodation." In simple terms, this means any place that serves the public—like an online store, a bank\'s website, or a travel app—must be accessible. If these digital spaces have "virtual stairs" that block people, the owners can find themselves in legal trouble.',
            'The <strong>Americans with Disabilities Act</strong> is a landmark US civil rights law that prohibits discrimination against people with disabilities in all areas of public life.',
            'This law is looked after by the US Department of Justice. Most of the time, the law is put into action because people or groups speak up when they find a digital barrier. This has led to many conversations in courtrooms about how to make sure the internet stays open to everyone.',
          ]
        },
      ]
    },
    {
      heading: 'Digital accessibility in the European Union',
      content: [],
      subsections: [
        {
          heading: 'European Web Accessibility Directive',
          content: [
            'The <strong>European Web Accessibility Directive</strong> is a set of rules for public sector bodies, like local councils and government agencies, across the European Union. It says that all their websites and apps must be easy for everyone to use.',
            'This directive is very big on being open and honest. Besides making things accessible, government offices must also:<ul class="list-disc ml-6 mt-2 space-y-1"><li>Write an "accessibility statement" that explains how they are doing.</li><li>Give people a simple way to report a problem if they find one.</li><li>Tell people exactly what to do if their feedback isn\'t taken seriously.</li></ul>',
            'To make sure everyone is on the same page, the directive uses a standard called EN 301 549. If a website follows these rules, it is legally seen as doing a good job.',
            'The <strong>European Web Accessibility Directive</strong> is an EU law that makes it mandatory for public sector websites and apps to be accessible.',
            '<strong>EN 301 549</strong> is the specific European technical standard that sets the requirements for accessible ICT products and services.',
            'Instead of waiting for lawsuits, EU countries have official "watchdog" groups that check in on websites and help them fix mistakes.',
          ]
        },
        {
          heading: 'European Accessibility Act',
          content: [
            'The <strong>European Accessibility Act</strong> is a newer law that moves accessibility beyond just government offices and into the world of private business. Starting in 2025, it will set common rules for many popular products and services.',
            'This act covers a lot of the tech we use every day, including:<ul class="list-disc ml-6 mt-2 space-y-1"><li>Personal computers and their operating systems.</li><li>Smartphones and the services that let us make calls.</li><li>Cash machines, ticket dispensers, and check-in kiosks.</li><li>Digital books and online shopping sites.</li><li>Banking and travel services.</li></ul>',
            'The <strong>European Accessibility Act</strong> is an EU law that requires many private-sector products and services to be accessible to people with disabilities.',
            'Each country in the EU will have its own authorities to make sure companies are following these rules. They can even give out penalties if a company refuses to make its products work for everyone.',
          ]
        },
      ]
    },
    {
      heading: 'How we check the rules',
      content: [
        'While the US and the EU both want a world where everyone can use tech, they go about it in slightly different ways. In the United States, change often happens because individuals or groups speak up and take legal action. In the European Union, there is more focus on government groups watching over things and using shared standards to keep everyone moving in the right direction.',
        'No matter which system is used, the goal is the same: to make sure that as our world becomes more digital, no one gets left behind. These laws turn the "right to access" into a reality for everyone.',
      ],
    },
  ]
}
