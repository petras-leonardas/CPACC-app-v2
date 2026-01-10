import type { DetailedTopicContent } from './types'

export const demographicsStatistics: DetailedTopicContent = {
  topicId: '1d-demographics-statistics',
  introduction: [
    'Disability demographics and statistics are about understanding how many people experience disability, where they live, and how disability intersects with health, education, employment, income, and daily life. This topic focuses less on exact numbers and more on learning how to interpret data responsibly, recognizing what statistics can tell us—and what they cannot. Because disability is defined and measured differently across countries and studies, data must always be read within its social, cultural, and methodological context.',
    'In accessibility work, disability statistics help frame the scale of issues, guide policy and design decisions, and support advocacy for inclusive systems. At the same time, these numbers are shaped by real-world limitations such as inconsistent terminology, underreporting, and the complexity of people living with multiple disabilities. Understanding both the value and the limits of disability data is essential for making informed, ethical decisions.'
  ],
  learningPoints: [
    'Recognize why disability data is collected and how it informs policy and design decisions',
    'Understand the structural and methodological limits of disability statistics',
    'Interpret disability data without overstating precision or certainty',
    'Identify global patterns and disparities affecting people with disabilities',
    'Communicate disability statistics responsibly and contextually'
  ],
  sections: [
    {
      heading: 'Why disability statistics matter?',
      content: [
        'Disability statistics are used to understand populations, plan services, shape public policy, and allocate resources. Data about disability can influence decisions in areas such as healthcare, transportation, housing, education, employment, and social protection. When policymakers and organizations understand how many people experience functional limitations—and what kinds—they are better positioned to design systems that work for real populations rather than hypothetical "average" users.',
        'Statistics also help illustrate scale. Knowing that disability affects a significant portion of the global population challenges assumptions that disability is rare or exceptional. Even imperfect data can be powerful when used to show trends, gaps, and inequities that might otherwise remain invisible.'
      ]
    },
    {
      heading: 'How disability data is collected?',
      content: [
        'Disability data is gathered through many sources, including national censuses, household surveys, health studies, and administrative records. These sources vary widely in how they define disability, what questions they ask, and which populations they reach. Some focus on medical diagnoses, others on functional limitations, and others on self-identification.',
        'Because there is no single global definition of disability, comparisons between countries or studies are often difficult. A person counted as "disabled" in one dataset may not appear in another simply because the criteria differ. This variability makes context essential when reading or sharing statistics.'
      ]
    },
    {
      heading: 'Key limitations of disability statistics',
      content: 'There are several well-known challenges in collecting accurate disability data:',
      subsections: [
        {
          heading: 'Common challenges',
          content: [
            'Limited detail in large surveys: Many national censuses do not collect detailed information about types of disability, severity, or lived experience.',
            'Inconsistent terminology: Words used to describe disability vary across languages, cultures, and legal systems, making direct comparison unreliable.',
            'Multiple and overlapping disabilities: Many people experience more than one disability, which can place them outside rigid statistical categories.',
            'Underreporting: Stigma, fear of discrimination, or lack of diagnosis may lead people not to disclose disability.',
            'Contextual factors: Disability can be influenced by environment, age, poverty, conflict, and access to healthcare—factors that statistics often struggle to capture fully.'
          ]
        },
        {
          heading: 'What this means?',
          content: [
            'These limitations do not make disability data useless, but they do mean the numbers should be treated as indicators rather than exact counts.'
          ]
        }
      ]
    },
    {
      heading: 'Global patterns and health inequities',
      content: [
        'Global health data shows that disability is common and closely linked to broader social and economic conditions. People with disabilities, on average, experience poorer health outcomes, reduced life expectancy, and higher risk of secondary conditions. These patterns are not caused by disability itself, but by barriers such as inaccessible healthcare, poverty, discrimination, and exclusion from education and employment.',
        'Transportation, for example, is a recurring barrier. Inaccessible or unaffordable transport limits access to healthcare, work, and community life, compounding disadvantage. These inequities highlight how disability statistics often reflect systemic failures rather than individual limitations.'
      ]
    },
    {
      heading: 'Disability data as an input to policy',
      content: [
        'Reliable disability data is especially valuable for public policy. Information about functional limitations can inform decisions in health services, social protection systems, urban planning, education, and labor markets. Data can help answer questions such as how many people with disabilities are employed, how income levels compare, or how many people live in poverty.',
        'When used well, statistics support evidence-based decisions and long-term planning. When used poorly—without context or nuance—they can reinforce stereotypes or justify exclusion. Responsible use of disability data requires both technical understanding and ethical judgment.'
      ]
    },
    {
      heading: 'Using disability statistics responsibly',
      content: [
        'When analyzing or communicating disability statistics, it is important to be transparent about limitations and assumptions. Numbers should not be presented as absolute truth, but as part of a broader picture that includes lived experience and qualitative insight.',
        'Disability statistics are most effective when they are used to support inclusion, challenge inequity, and inform better design—not when they are treated as definitive or detached from real human lives.'
      ]
    },
    {
      heading: 'Key statistics',
      content: '',
      subsections: [
        {
          heading: 'Global statistics (WHO)',
          content: [
            '<strong>1.3 billion people</strong> experience significant disability, representing <strong>16% of the world\'s population</strong> or <strong>1 in 6</strong> people.',
            'People with disabilities die <strong>up to 20 years earlier</strong> than those without disabilities.',
            '<strong>2x higher risk</strong> of developing conditions such as depression, asthma, diabetes, stroke, obesity, or poor oral health.',
            'Accessible and affordable transportation is <strong>15 times more difficult</strong> to access for people with disabilities compared to those without.'
          ]
        },
        {
          heading: 'Challenges in data collection',
          content: [
            '<strong>Census surveys typically don\'t include</strong> detailed information about different types of disabilities.',
            '<strong>Disability terminology varies</strong> between countries, making international comparisons difficult and unreliable.',
            'Many people have <strong>multiple disabilities</strong>, which complicates categorization and can place them outside defined statistical groups.'
          ]
        },
        {
          heading: 'Health and social inequities',
          content: [
            'People with disabilities face <strong>significant health inequities</strong> arising from stigma, discrimination, and poverty.',
            '<strong>Exclusion from education and employment</strong> creates systemic barriers that compound disadvantage.',
            '<strong>Health system barriers</strong> further limit access to care and appropriate services for people with disabilities.'
          ]
        }
      ]
    }
  ]
}
