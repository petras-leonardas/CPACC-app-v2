import type { DetailedTopicContent } from './types'

export const demographicsStatistics: DetailedTopicContent = {
  topicId: '1d-demographics-statistics',
  introduction: [
    'Disability demographics and statistics provide a quantitative picture of how many people live with disabilities worldwide and what conditions shape their daily experiences. Understanding this data goes far beyond memorizing figures. It requires learning how to interpret statistics critically, recognizing the methodological choices behind each dataset and the real people those numbers represent. For CPACC certification candidates, demographic literacy is a foundational skill because accessibility decisions in policy, design, and technology are only as sound as the evidence that informs them.',
    'Because every country and culture defines disability differently, comparing data across borders presents significant challenges. Definitions may be rooted in medical diagnosis, functional limitation, or social participation, and each approach produces different prevalence rates for the same population. In accessibility work, these statistics reveal the true scale of the audience we are designing for and demonstrate that disability is not a marginal experience. With approximately one in six people worldwide living with a significant disability, the data confirms that disability is a natural and prevalent part of the human condition that must be addressed systematically.',
  ],
  learningPoints: [
    'Explain why disability data is collected and how it supports building more inclusive systems.',
    'Recognize the limitations of disability statistics and why they do not always tell the whole story.',
    'Analyze disability data critically, understanding the methodological context behind the numbers.',
    'Identify global patterns in disability prevalence that reveal health equity gaps.',
    'Describe disability statistics in a way that is accurate, responsible, and person-centered.',
  ],
  sections: [
    {
      heading: 'Why do these numbers matter?',
      content: [
        'We use disability statistics to plan for the future. Imagine trying to throw a party without knowing how many guests are coming or what they like to eat. You would probably end up with a lot of unhappy people! Data helps governments and organizations plan for things like buses, schools, and hospitals that actually work for the people living in their communities.',
        'When we look at the data, it also helps us realize that disability is very common. It challenges the idea that having a disability is an exception to the rule. Even if the data isn\'t perfect, it shines a light on gaps where people might be struggling to get a job or find a home, making sure they aren\'t invisible to the people in charge.',
      ],
    },
    {
      heading: 'How do we gather this information?',
      content: [
        'People collect disability data in many ways, including national censuses and health surveys. A census is a comprehensive official count of every person living in a country. However, different surveys ask different questions. One might ask about a medical diagnosis, while another might ask if you have trouble climbing stairs. To improve international comparability, the <strong>Washington Group on Disability Statistics</strong> developed a short set of six questions that focus on functional difficulties in areas such as seeing, hearing, walking, remembering, self-care, and communication. These questions are now used in censuses and surveys in over 100 countries and provide a standardized way to measure disability prevalence across different cultural and linguistic contexts.',
        'Because there isn\'t one single global definition of disability, it can be hard to compare two different countries. A person might be counted as disabled in one study but not in another just because the rules changed. This is why we always need to look at the why and how behind the numbers.',
      ],
    },
    {
      heading: 'The limits of what statistics can tell us',
      content: [
        'Collecting data about people is complicated, and there are a few reasons why the numbers might not show the full reality.<ul class="list-disc ml-6 mt-2 space-y-1><li>Many big surveys don\'t ask for enough detail about the specific types of disabilities people have or how severe they are.</li><li>The words we use for disability change depending on the language or the local laws, which makes it hard to compare data across borders.</li><li>Many people live with more than one disability at the same time, which doesn\'t always fit into a neat little box on a form.</li><li>Some people might not report their disability because they are afraid of being treated differently or because they don\'t have an official diagnosis.</li><li>Things like how much money someone has or where they live can change how their disability affects them, and numbers often miss that personal context.</li></ul>',
        'Basically, we should treat these numbers as helpful clues rather than the absolute, final word on the matter.',
      ],
    },
    {
      heading: 'Global patterns and fairness in health',
      content: [
        'When we look at the world as a whole, we see that disability is closely tied to how people live. On average, people with disabilities often face more health challenges and might not live as long. This usually isn\'t because of the disability itself, but because of barriers in the world around them.',
        'For example, if the only bus in town doesn\'t have a ramp, a person who uses a wheelchair might not be able to get to the doctor. This is a systemic failure, which is a fancy way of saying the system was built in a way that leaves people out. Our goal is to use data to find these broken parts of the system and fix them.',
      ],
    },
    {
      heading: 'Using data to create better laws',
      content: [
        'Reliable data is a superpower for people who make laws. It helps them figure out how many people need support in the workplace or how many kids need extra help at school. When used correctly, statistics help us make decisions based on facts rather than guesses.',
        'However, if we use numbers without thinking about the people they represent, we risk making things worse. Using disability data responsibly means being honest about what we don\'t know and always remembering that every data point is a real person with a real life.',
      ],
    },
    {
      heading: 'Important statistics to remember',
      content: [
        'The <strong>World Health Organization</strong>, which is a group that looks out for global health, shares some very important facts:<ul class=list-disc ml-6 mt-2 space-y-1><li>About <strong>1.3 billion</strong> people live with a significant disability. This is roughly <strong>1 in 6</strong> people on the planet.</li><li>In some contexts, particularly for people with severe mental health conditions in low-income settings, life expectancy can be reduced by up to <strong>20 years</strong> due to barriers in accessing adequate healthcare and support.</li><li>People with disabilities have a <strong>two times higher risk</strong> of facing health issues like depression or diabetes because the world isn\'t always set up for their needs.</li><li>People with disabilities are <strong>15 times more likely</strong> to find transportation inaccessible or unaffordable compared to people without disabilities.</li></ul>',
        'These numbers remind us that we have a lot of work to do to make the world a place where everyone can join the party" equally.',
      ],
    }
  ]
}
