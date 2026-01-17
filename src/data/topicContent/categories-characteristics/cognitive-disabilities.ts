import type { TopicSection } from '../types'

export const cognitiveDisabilities: TopicSection = {
  heading: 'Cognitive disabilities',
  content: [
    'Cognitive disabilities affect mental processes such as attention, memory, perception, language processing, reasoning, planning, emotional regulation, and calculation. Importantly, cognitive performance is highly context-dependent. Stress, fatigue, noise, time pressure, and information overload can significantly reduce anyone\'s cognitive capacity—and disproportionately affect people with cognitive disabilities.',
    'A critical accessibility insight is that designing to support cognitive functions (like memory or attention) is often more effective than designing for specific diagnoses.'
  ],
  subsections: [
    {
      heading: 'Examples of cognitive-related conditions and characteristics',
      content: [
        '<strong>Intellectual disability:</strong> Involves differences in reasoning, learning, and adaptive behavior. Adaptive skills include conceptual (language, numbers), social (interaction, judgment), and practical (daily living, work tasks) abilities. Cultural and environmental context strongly influences how limitations appear.',
        '<strong>Reading-related disabilities (including dyslexia):</strong> Difficulty decoding, spelling, reading fluently, or processing written language. Intelligence is not affected, but text-heavy or poorly structured content can be exhausting or inaccessible.',
        '<strong>Math-related disabilities (including dyscalculia):</strong> Difficulty understanding quantities, numerical relationships, math facts, or mental calculation. This can affect time estimation, money handling, and interpreting numerical information.',
        '<strong>Attention Deficit Hyperactivity Disorder (ADHD):</strong> Patterns of inattention and/or impulsivity that affect task initiation, organization, sustained focus, and completion. ADHD may involve hyperactivity, but many people—especially adults—primarily experience attention and executive-function challenges.',
        '<strong>Autism spectrum conditions:</strong> Differences in social communication and interaction, along with patterns of repetitive behaviors or routines. Sensory sensitivities (sound, light, texture) are common. Cognitive abilities vary widely, from intellectual disability to above-average intelligence.',
        '<strong>Non-verbal learning profiles (NLD):</strong> Often involve strong verbal skills paired with difficulty interpreting social cues, managing transitions, abstract reasoning, or synthesizing the "big picture."'
      ]
    },
    {
      heading: 'Statistical context',
      content: [
        'Dyslexia affects 5–10% of the population, with estimates as high as 17%; 70–80% of people with reading difficulties have some form of dyslexia.',
        'Dyscalculia affects approximately 3–6% of people.',
        'ADHD affects 2–7% of children globally and around 4% of adults.',
        'Autism affects approximately 1 in 100 people worldwide.',
        'Non-verbal learning disability affects roughly 1% of children in the United States.'
      ]
    },
    {
      heading: 'Common barriers',
      content: [
        'Difficulty finding important information or understanding page purpose',
        'Complex forms and multi-step processes',
        'Password and account-management burdens',
        'Confusing or inconsistent controls',
        'Distracting layouts, clutter, and dense text',
        'Timeouts that interrupt planning and increase stress',
        'These barriers affect everyone to some degree, but for people with cognitive disabilities they often cause task abandonment rather than delay.'
      ]
    },
    {
      heading: 'Practical accessibility solutions',
      content: [
        '<strong>General contexts:</strong> Plain language; predictable structure; clear steps and examples; feedback loops; reduced noise and distraction; adequate preparation time.',
        '<strong>Physical environments:</strong> Simple routes; easy-to-find destinations; large, legible, unambiguous signage; consistent wayfinding patterns.',
        '<strong>Digital environments:</strong> Simplified flows; reduced distraction; multi-modal information where helpful; flexible timing; personalization options.'
      ]
    }
  ]
}
