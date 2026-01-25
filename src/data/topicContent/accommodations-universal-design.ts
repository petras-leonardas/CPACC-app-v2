import type { DetailedTopicContent } from './types'

export const accommodationsUniversalDesign: DetailedTopicContent = {
  topicId: '2a-accommodations-universal-design',
  introduction: [
    'Universal design is all about building things—like websites, parks, or apps—so they work for as many people as possible right from the start. Instead of making something "standard" and then fixing it later for people with different needs, we assume from day one that everyone is unique. It\'s like designing a party where every guest, no matter their height or how they move, can reach the snack table without needing to ask for a stool.',
    'This approach is a big deal in accessibility because it moves the hard work to the beginning. By making smart choices early on, we create a world that just works, rather than a world that needs a thousand tiny patches to be fair.'
  ],
  learningPoints: [
    'Understand how universal design differs from accommodations and why both still matter',
    'Recognize the relationship between accessibility, usability, and universal design',
    'Explain why designing for diversity benefits everyone, not only disabled users',
    'Apply universal design thinking earlier in design and decision-making processes'
  ],
  sections: [
    {
      heading: 'Universal design and accommodations',
      content: [
        'At its heart, universal design tries to find a "one size fits most" solution that is flexible and welcoming. It predicts that people will have different ages, languages, and abilities. Instead of waiting for a user to say, "I can\'t use this," the design says, "I\'ve already thought of you."',
        'Accommodations are a bit different. They are specific "fixes" made for one person in a specific moment to make sure they aren\'t left out.',
        'Think of it like this:<ul class="list-disc ml-6 mt-2 space-y-1"><li><strong>Universal design</strong> is building a beautiful, wide ramp next to the stairs so everyone can enter the building together.</li><li><strong>Accommodations</strong> are like having to call someone to bring out a portable lift because the stairs are the only way in.</li></ul>',
        'We still need accommodations, like providing a sign language interpreter for a specific meeting, but universal design means we don\'t have to scramble for fixes nearly as often. This makes life easier, cheaper, and much more welcoming for everyone.'
      ]
    },
    {
      heading: 'Related design concepts',
      content: 'Different parts of the world use different names for this "design for everyone" mindset. Even though the names change, the goal is the same: include everyone from the beginning.',
      subsections: [
        {
          heading: 'Inclusive design',
          content: 'This is a way of working where you don\'t just design for people with different needs; you design with them. By involving people with disabilities in the creative process, you make sure the final product actually works in the real world.'
        },
        {
          heading: 'Design for all',
          content: 'This is a popular term in Europe. It\'s basically a big-picture version of universal design used by governments and big organizations to make sure everything from public buses to city websites works for every single citizen.'
        },
        {
          heading: 'Human-centered design',
          content: 'This is an approach that focuses on the real-life needs and habits of people. When we use this method and make sure to include people with a wide range of abilities, it becomes a powerful partner for universal design.'
        },
        {
          heading: 'Life-span design',
          content: 'This reminds us that our abilities change as we grow. We all start as children who need simple tools, and we might grow into older adults who need a bit of extra help seeing or moving. Designing for the "whole life" makes products that stay useful for a long, long time.'
        }
      ]
    },
    {
      heading: 'Accessibility, usability, and universal design',
      content: [
        'These three terms are like three best friends who all want the same thing but have different hobbies.<ul class="list-disc ml-6 mt-2 space-y-1"><li><strong>Accessibility</strong> is about fairness. It makes sure that people with disabilities have the same access and experience as everyone else, without running into "No Entry" signs.</li><li><strong>Usability</strong> is about ease. It\'s the "Why is this so hard?" factor. It looks at how quickly and happily a person can finish a task.</li><li><strong>Universal design</strong> is the big umbrella. It doesn\'t pick a specific group to help; it just assumes that variation is normal.</li></ul>',
        'When you use all three, you get the best results: accessibility makes it fair, usability makes it easy, and universal design makes sure you thought about it from the very first sketch.'
      ]
    }
  ]
}
