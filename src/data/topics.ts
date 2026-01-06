export interface Topic {
  id: string
  title: string
  description: string
  subCategory?: string
}

export interface Domain {
  id: string
  title: string
  topics: Topic[]
}

export const cpacc_topics: Domain[] = [
  {
    id: 'domain-1',
    title: 'Domain 1',
    topics: [
      {
        id: 'theoretical-models',
        title: 'Theoretical models of disability',
        description: 'Study the various theoretical frameworks and models used to understand disability, including medical, social, and biopsychosocial models.',
        subCategory: 'A'
      },
      {
        id: 'categories-characteristics',
        title: 'Categories & characteristics of disabilities, associated barriers, and solutions',
        description: 'Learn about different disability categories, their characteristics, common barriers faced by people with disabilities, and effective solutions to overcome these barriers.',
        subCategory: 'B'
      },
      {
        id: 'assistive-technologies',
        title: 'Assistive technologies & adaptive strategies',
        description: 'Explore assistive technologies and adaptive strategies that enable people with disabilities to perform tasks and access information more effectively.',
        subCategory: 'C'
      },
      {
        id: 'demographics-statistics',
        title: 'Disability demographics and statistics',
        description: 'Understand the statistical data and demographic information related to disabilities worldwide and how this impacts accessibility considerations.',
        subCategory: 'D'
      },
      {
        id: 'disability-etiquette',
        title: 'Disability etiquette',
        description: 'Master the appropriate language, behaviors, and interactions when working with or communicating about people with disabilities.',
        subCategory: 'E'
      },
      {
        id: 'domain-1-all',
        title: 'Test all Domain 1 questions',
        description: 'Practice with all questions from Domain 1: Disabilities, challenges, and assistive technologies.',
        subCategory: '1-ALL'
      }
    ]
  },
  {
    id: 'domain-2',
    title: 'Domain 2',
    topics: [
      {
        id: 'accommodations-universal-design',
        title: 'Individual accommodations vs universal design',
        description: 'Understand the difference between providing individual accommodations and implementing universal design principles that benefit everyone.',
        subCategory: 'A'
      },
      {
        id: 'benefits-accessibility',
        title: 'Benefits of accessibility',
        description: 'Learn about the wide-ranging benefits of accessibility for individuals, organizations, and society as a whole.',
        subCategory: 'B'
      },
      {
        id: 'wcag-principles',
        title: 'Web accessibility principles (WCAG)',
        description: 'Study the Web Content Accessibility Guidelines (WCAG) principles: Perceivable, Operable, Understandable, and Robust (POUR).',
        subCategory: 'C'
      },
      {
        id: 'built-environment',
        title: 'Built environment accessibility principles',
        description: 'Explore accessibility principles for physical spaces, buildings, and infrastructure to ensure barrier-free access.',
        subCategory: 'D'
      },
      {
        id: 'universal-design-principles',
        title: 'Principles of universal design',
        description: 'Master the seven principles of universal design and how they can be applied to create inclusive products and environments.',
        subCategory: 'E'
      },
      {
        id: 'udl-ux',
        title: 'Universal design for learning (UDL) + UX',
        description: 'Learn how Universal Design for Learning principles can be integrated with user experience design to create accessible educational materials and digital products.',
        subCategory: 'F'
      },
      {
        id: 'domain-2-all',
        title: 'Test all Domain 2 questions',
        description: 'Practice with all questions from Domain 2: Accessibility and universal design.',
        subCategory: '2-ALL'
      }
    ]
  },
  {
    id: 'domain-3',
    title: 'Domain 3',
    topics: [
      {
        id: 'international-conventions',
        title: 'International declaration and conventions',
        description: 'Study international treaties, declarations, and conventions related to disability rights, including the UN Convention on the Rights of Persons with Disabilities.',
        subCategory: 'A'
      },
      {
        id: 'regional-instruments',
        title: 'Regional instruments on human & disability rights',
        description: 'Learn about regional agreements and instruments that protect the rights of people with disabilities in different parts of the world.',
        subCategory: 'B'
      },
      {
        id: 'national-provincial',
        title: 'National & provincial instruments',
        description: 'Understand national and provincial laws, regulations, and policies that govern accessibility and disability rights.',
        subCategory: 'C'
      },
      {
        id: 'procurement-laws',
        title: 'Domain-specific & government procurement laws',
        description: 'Explore domain-specific accessibility requirements and government procurement laws that mandate accessible products and services.',
        subCategory: 'D'
      },
      {
        id: 'ict-standards',
        title: 'Applying accessibility standards & regulations to ICT',
        description: 'Learn how to apply accessibility standards and regulations to Information and Communication Technology (ICT) products and services.',
        subCategory: 'E'
      },
      {
        id: 'integrating-ict',
        title: 'Integrating ICT accessibility across the organisation',
        description: 'Understand strategies for embedding ICT accessibility throughout an organization\'s policies, processes, and culture.',
        subCategory: 'F'
      },
      {
        id: 'domain-3-all',
        title: 'Test all Domain 3 questions',
        description: 'Practice with all questions from Domain 3: Standards, laws, and management strategies.',
        subCategory: '3-ALL'
      }
    ]
  }
]

export const allTopicsOverview: Topic = {
  id: 'all-topics',
  title: 'All topics',
  description: 'Practice with questions and flashcards from all CPACC exam domains. This comprehensive mode includes theoretical models of disability, accessibility principles, assistive technologies, international standards, and legal frameworks. Perfect for final exam preparation and testing your knowledge across all areas.'
}
