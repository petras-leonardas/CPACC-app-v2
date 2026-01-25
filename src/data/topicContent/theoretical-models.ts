import type { DetailedTopicContent } from './types'

export const theoreticalModels: DetailedTopicContent = {
  topicId: '1a-theoretical-models',
  introduction: [
    'Disability isn\'t just one thing. It can be understood in many different ways depending on which "lens" you use. These different lenses are called theoretical models. They help us explain what disability is, what causes barriers, and how we should respond as a society.',
    'No single model is perfect. Each one has its own strengths and its own blind spots. In real-world accessibility work, we usually mix and match these ideas to make sure everyone can "join the party."',
  ],
  learningPoints: [
    'Recognize the different ways disability is described in laws, design, and daily life.',
    'Understand why some solutions focus on the environment while others focus on the individual.',
    'Identify the pros and cons of common disability perspectives.',
    'Apply these different models to real-life situations where people face barriers.',
    'Make better, more balanced decisions when working on accessibility projects.',
  ],
  sections: [
    {
      heading: 'Medical model',
      content: [
        'The medical model looks at disability as something located inside a person\'s body or mind. It sees disability as a "problem" caused by a disease, an injury, or a health condition. Because of this, the focus is usually on medical professionals—like doctors or therapists—trying to "fix" or "cure" the person so they can fit into the world more easily.',
        '<strong>Strengths:</strong> This model is very good at addressing the biological side of things. It values the importance of healthcare, surgery, and medicine, which can be life-changing or life-saving for many people.',
        '<strong>Weaknesses:</strong> It treats disability like a personal defect. If a student in a wheelchair can\'t get into a building because of steps, this model says the "problem" is the wheelchair, not the steps. This can make people feel like they are "broken" or that they are a problem to be solved.',
      ],
    },
    {
      heading: 'Social model',
      content: [
        'The social model flips the script. It says that people aren\'t disabled by their bodies, but by the way society is built. A person isn\'t "disabled" by being blind; they are disabled by a magazine that isn\'t available in digital text or Braille.',
        '<strong>Strengths:</strong> This model is the heart of accessibility and human rights. It tells us that we can make the world better for everyone by removing barriers like stairs, bad lighting, or complicated websites. It puts the responsibility on society to be inclusive.',
        '<strong>Weaknesses:</strong> It can sometimes ignore the physical reality of living with a condition. Even if every barrier in the world is removed, someone might still experience chronic pain or fatigue.',
      ],
    },
    {
      heading: 'Biopsychosocial model',
      content: [
        'This model tries to be the "middle ground." It combines the medical and social models into one big picture. It looks at biological factors (health), psychological factors (how we think and feel), and social factors (our environment and relationships).',
        'In 1977, a man named George Engel came up with this idea. Later, in 2002, the <strong>World Health Organization</strong> used it to create the <strong>International Classification of Functioning, Disability and Health (ICF)</strong>.',
        'The <strong>International Classification of Functioning, Disability and Health (ICF)</strong> is a global system used to describe how people live with their health conditions.',
        '<strong>Strengths:</strong> it is very helpful for doctors and social workers because it looks at the whole person, not just one part of their life.',
        '<strong>Weaknesses:</strong> It is very complicated to use in the real world. Some people also worry that mixing the models might lead to people\'s medical needs being overlooked.',
      ],
    },
    {
      heading: 'Economic model',
      content: [
        'The economic model defines disability based on a person\'s ability to work. It asks: "Can this person be productive in a job?" It is often used by governments to decide who gets financial support or disability benefits.',
        '<strong>Strengths:</strong> It recognizes that disability can make it harder to earn money and that people might need extra financial help or special tools at work to succeed.',
        '<strong>Weaknesses:</strong> It can be very stigmatizing. It defines people by their "value" in the workplace, which can make them feel like a burden if they aren\'t able to work a traditional job.',
      ],
    },
    {
      heading: 'Functional solutions model',
      content: [
        'This is a very practical, "let\'s fix it" model. It looks at a specific challenge—like not being able to hear a video—and finds a tool to solve it, like captions. This is the model that most accessibility professionals use every day.',
        '<strong>Strengths:</strong> It is results-oriented. It loves innovation and technology, and it focuses on getting things done so people can use products and services right now.',
        '<strong>Weaknesses:</strong> Sometimes people invent expensive gadgets that don\'t actually help. If we only focus on technology, we might forget to fix the bigger social problems that caused the barrier in the first place.',
      ],
    },
    {
      heading: 'Social identity or cultural affiliation model',
      content: [
        'This model says that disability is a source of pride and community. The best example of this is the Deaf community. Many Deaf people don\'t see themselves as "disabled"; they see themselves as part of a cultural group with their own language (sign language) and history.',
        '<strong>Strengths:</strong> It builds self-esteem and creates a sense of belonging. It shows that having a disability can be a positive part of who you are.',
        '<strong>Weaknesses:</strong> Sometimes these groups can feel exclusive. If you don\'t fit the "perfect" image of that group, you might feel left out.',
      ],
    },
    {
      heading: 'Charity model',
      content: [
        'The charity model sees disabled people as "unfortunate" or "needy" people who deserve our pity. It relies on the kindness of others to provide help or money.',
        '<strong>Strengths:</strong> It can inspire people to donate time or money to help people in urgent need.',
        '<strong>Weaknesses:</strong> It can be very condescending. It makes disabled people feel like they have to act "pitiful" to get help, and it focuses on short-term fixes rather than long-term rights and independence.',
      ],
    },
    {
      heading: 'Key takeaways',
      content: [
        '<ul class="list-disc ml-6 mt-2 space-y-1"><li>No single model is right or wrong. Most organizations use a mix, especially the <strong>medical and social models</strong>.</li><li>The <strong>medical model</strong> focuses on cures and treatments for the individual.</li><li>The <strong>social model</strong> focuses on removing barriers in society and is a key part of human rights.</li><li>The <strong>biopsychosocial model</strong> looks at health, the mind, and the environment all at once.</li><li>The <strong>World Health Organization</strong> uses the <strong>International Classification of Functioning, Disability and Health (ICF)</strong> to combine these ideas into one global framework.</li></ul>',
      ],
    }
  ]
}
