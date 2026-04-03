/**
 * Domain configuration for CPACC topics.
 * Contains domain titles, URL paths, SEO metadata, and page content.
 */

/**
 * Domain titles mapped by domain number
 */
export const DOMAIN_TITLES: Record<number, string> = {
  1: 'Disabilities, challenges & assistive technologies',
  2: 'Accessibility & universal design',
  3: 'Standards, laws & management strategies'
}

/**
 * Domain URL paths mapped by domain number
 */
export const DOMAIN_PATHS: Record<number, string> = {
  1: 'disabilities-challenges-assistive-technology',
  2: 'accessibility-universal-design',
  3: 'standards-laws-management-strategies'
}

/**
 * Per-domain page content used by the DomainPage component.
 */
export interface DomainPageConfig {
  pageTrackingName: string
  structuredDataName: string
  structuredDataDescription: string
  seoTitle: string
  seoDescription: string
  examWeight: string
  introParagraphs: [string, string, string]
}

export const DOMAIN_PAGE_CONFIG: Record<number, DomainPageConfig> = {
  1: {
    pageTrackingName: 'Domain 1: Disabilities, Challenges & Assistive Technology',
    structuredDataName: 'Disabilities, Challenges & Assistive Technology',
    structuredDataDescription: 'Master Domain 1 of the CPACC certification covering theoretical models of disability, assistive technologies, and accessibility fundamentals.',
    seoTitle: 'CPACC Domain 1: Disabilities & Assistive Technology',
    seoDescription: 'CPACC Domain 1 study guide: disability models, assistive technologies, and accessibility fundamentals. Free certification prep.',
    examWeight: '~40% of exam questions',
    introParagraphs: [
      'Disability can be understood in many different ways, depending on the perspective used. This domain introduces how disability is defined, experienced, and shaped by the interaction between people, environments, and systems.',
      "You'll explore key theoretical models of disability, common categories and characteristics, and the barriers people encounter in everyday life. The domain also introduces assistive technologies and adaptive strategies, focusing on how they support access and participation rather than \"fixing\" individuals.",
      'This content establishes shared language and foundational understanding that underpins all other accessibility work.',
    ],
  },
  2: {
    pageTrackingName: 'Domain 2: Accessibility & Universal Design',
    structuredDataName: 'Accessibility & Universal Design',
    structuredDataDescription: 'Learn Domain 2 of CPACC certification covering WCAG guidelines, accessible web design, and universal design principles.',
    seoTitle: 'CPACC Domain 2: Accessibility & Universal Design',
    seoDescription: 'CPACC Domain 2 study guide: WCAG guidelines, universal design principles, and accessible web design. Free certification prep.',
    examWeight: '~40% of exam questions',
    introParagraphs: [
      'This domain focuses on how accessibility is applied through intentional design. It introduces principles and approaches that help create environments, products, and services usable by as many people as possible, without relying on individual accommodations.',
      "You'll learn how accessibility moves from reactive fixes to proactive, inclusive design. Topics include universal design, Universal Design for Learning (UDL), web accessibility principles (WCAG), and accessibility considerations across digital and physical environments.",
      'This domain helps translate foundational understanding into practical, scalable design decisions.',
    ],
  },
  3: {
    pageTrackingName: 'Domain 3: Standards, Laws & Management Strategies',
    structuredDataName: 'Standards, Laws & Management Strategies',
    structuredDataDescription: 'Study Domain 3 of CPACC certification covering accessibility standards, laws, regulations, and organizational management strategies.',
    seoTitle: 'CPACC Domain 3: Standards, Laws & Management',
    seoDescription: 'CPACC Domain 3 study guide: accessibility standards, laws, regulations, and management strategies. Free certification prep.',
    examWeight: '~20% of exam questions',
    introParagraphs: [
      'Accessibility becomes effective and sustainable when it is embedded into policies, standards, and organizational practices. This domain focuses on how accessibility is formalized, regulated, and maintained at scale.',
      "You'll explore international, regional, and national legal frameworks, accessibility standards, procurement requirements, and management strategies. The domain also covers how organizations integrate accessibility across teams, vendors, and systems over time.",
      'This content is essential for understanding accountability, compliance, and long-term accessibility maturity.',
    ],
  },
}
