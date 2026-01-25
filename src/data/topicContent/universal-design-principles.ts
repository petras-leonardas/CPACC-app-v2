import type { DetailedTopicContent } from './types'

export const universalDesignPrinciples: DetailedTopicContent = {
  topicId: '2e-universal-design-principles',
  introduction: [
    'Universal design is the idea that everything we build—whether it is a building, a website, or a simple kitchen tool—should be easy for everyone to use right from the start. Instead of making "special" versions for people with disabilities, we try to create one great design that fits almost everybody. It is like throwing a party where every single guest can reach the snacks without needing to ask for help.',
    'These principles were created in 1997 by a team led by Ronald Mace at <strong>North Carolina State University</strong>. They help us move away from a "one-size-fits-all" mindset and toward a "one-size-fits-most" reality that celebrates human diversity.',
  ],
  learningPoints: [
    'Name and recognize the seven principles of universal design.',
    'Understand the goals and benefits of this design philosophy.',
    'Apply these principles to both the physical world and digital spaces.',
  ],
  sections: [
    {
      heading: '1. Equitable use',
      content: [
        'This principle is all about fairness. It means that the design is useful and marketable to people with diverse abilities. Whenever possible, the way people use a product should be identical. If it cannot be identical, it should at least be equivalent.',
        '<strong>Why it matters:</strong> It stops people from feeling "othered" or stigmatized. No one wants to have to use the "special" entrance at the back of a building while everyone else goes through the front.',
        '<strong>In practice:</strong> An automatic door at a grocery store is a perfect example. It works exactly the same way for a person using a wheelchair, a parent pushing a stroller, or someone carrying heavy bags.',
      ],
    },
    {
      heading: '2. Flexibility in use',
      content: [
        'Good design should accommodate a wide range of individual preferences and abilities. It should let the user choose how they want to interact with it.',
        '<strong>Why it matters:</strong> People have different paces and "dominant" hands. A rigid design that only works one way will eventually leave someone out.',
        '<strong>In practice:</strong> Think of a pair of scissors designed for both right-handed and left-handed people, or a website that lets you navigate using either a mouse or just the keyboard.',
      ],
    },
    {
      heading: '3. Simple and intuitive use',
      content: [
        'The design should be easy to understand, regardless of the user\'s experience, knowledge, language skills, or current concentration level. It should just "make sense."',
        '<strong>Why it matters:</strong> This helps everyone, especially people with cognitive disabilities or those who might be using the product while stressed or distracted.',
        '<strong>In practice:</strong> A public restroom sign that uses a simple, universally recognized icon instead of a long paragraph of text. Another example is a "Save" button on a computer that always stays in the same place so you do not have to hunt for it.',
      ],
    },
    {
      heading: '4. Perceptible information',
      content: [
        'The design needs to communicate necessary information effectively to the user, regardless of ambient conditions or the user\'s sensory abilities.',
        '<strong>Why it matters:</strong> If information only comes in one "flavor" (like only sound), then people who cannot hear that sound (or are in a very noisy room) are left in the dark.',
        '<strong>In practice:</strong> A crosswalk signal that chirps (audio) and shows a bright white walking figure (visual) tells everyone when it is safe to cross, regardless of whether they can see or hear.',
      ],
    },
    {
      heading: '5. Tolerance for error',
      content: [
        'The design should minimize hazards and the adverse consequences of accidental or unintended actions. Basically, the design should "have your back" if you make a mistake.',
        '<strong>Why it matters:</strong> Everyone clicks the wrong button sometimes. A good design makes sure that a small slip-up does not lead to a huge disaster.',
        '<strong>In practice:</strong> The "Undo" button in a word processor or a confirmation pop-up that asks, "Are you sure you want to delete this forever?" before it actually does it.',
      ],
    },
    {
      heading: '6. Low physical effort',
      content: [
        'The design should be able to be used efficiently and comfortably with a minimum of fatigue.',
        '<strong>Why it matters:</strong> This is crucial for people with limited strength or mobility, but it also makes life easier for anyone who is tired or multi-tasking.',
        '<strong>In practice:</strong> A lever-style door handle is much easier to use than a round doorknob. You can push a lever down with an elbow or a closed fist if your hands are full or if you have a weak grip.',
      ],
    },
    {
      heading: '7. Size and space for approach and use',
      content: [
        'Appropriate size and space should be provided for approach, reach, manipulation, and use regardless of user\'s body size, posture, or mobility.',
        '<strong>Why it matters:</strong> A tool or a space is only "accessible" if you can actually get close enough to use it.',
        '<strong>In practice:</strong> A wide subway turnstile that allows a wheelchair or a large suitcase to pass through easily, or a bathroom sink with clear space underneath so a person can roll right up to it.',
      ],
    },
    {
      heading: 'Summary of the goals',
      content: 'The big goal here is to make the world a more independent place. When we follow these rules, we create environments that are a pleasure for everyone to use. It reduces the need for expensive "retrofits" later on and makes sure everyone can "join the party" from day one.'
    }
  ]
}
