import type { DetailedTopicContent } from './types'

export const ictStandards: DetailedTopicContent = {
  topicId: 'ict-standards',
  introduction: [
    'Information and Communication Technology (ICT) is now central to how people work, learn, shop, communicate, and access public services. Despite this, legal protections for digital accessibility developed later than protections for physical spaces. Many countries first focused on buildings, transportation, and employment, only later recognizing that inaccessible websites, apps, and digital services can be just as exclusionary.',
    'Today, ICT accessibility laws link civil rights principles with technical standards. They define who must make digital content accessible, what "accessible" means in practice, and how compliance is monitored or enforced. While approaches differ between regions, a common trend has emerged: access to digital information and services is increasingly treated as a legal and civil rights issue, not a voluntary best practice.'
  ],
  learningPoints: [
    'Identify major ICT accessibility laws and regulations in the US and EU',
    'Understand how accessibility standards like WCAG are used in law',
    'Recognize who is responsible for compliance in public and private sectors',
    'Explain how ICT accessibility laws are enforced in practice'
  ],
  sections: [
    {
      heading: 'ICT accessibility and civil rights',
      content: [
        'ICT accessibility laws apply anti-discrimination principles to digital environments. They address barriers in websites, mobile applications, electronic documents, kiosks, and digital services. Because technology evolves rapidly, most laws rely on recognized technical standards rather than prescribing detailed technical rules directly in legislation.',
        'Enforcement mechanisms vary. Some systems rely on complaints and lawsuits, while others emphasize regulatory monitoring and corrective action. Public-sector obligations are often more explicit, while private-sector obligations are frequently enforced through broader non-discrimination law.'
      ]
    },
    {
      heading: 'ICT accessibility laws and standards in the United States',
      content: [],
      subsections: [
        {
          heading: 'Section 508 of the Rehabilitation Act',
          content: [
            'Section 508 applies to federal government agencies in the United States. It requires that electronic and information technology used or procured by the federal government be accessible to both employees and members of the public with disabilities.',
            'Section 508 is proactive and procurement-focused. Accessibility must be considered when technology is designed, purchased, maintained, or updated. The technical requirements are defined in the Section 508 Standards, which are based on the Web Content Accessibility Guidelines (WCAG) 2.0.',
            'Enforcement mechanisms: Enforcement is primarily administrative. Individuals can file complaints with federal agencies, and agencies are responsible for investigating and resolving issues. Compliance is also driven through procurement rules, internal audits, and oversight rather than widespread litigation.'
          ]
        },
        {
          heading: 'The Americans with Disabilities Act (ADA) and Digital Accessibility',
          content: [
            'The Americans with Disabilities Act of 1990 does not specify technical accessibility standards for websites or mobile applications, especially for private businesses and non-profit organizations. However, courts and regulators have increasingly interpreted digital services as falling under the ADA\'s prohibition of disability discrimination.',
            'Title III of the ADA applies to places of public accommodation, which courts have found can include e-commerce platforms, organizational websites, and public-facing mobile apps. As a result, organizations can face legal action if their digital services are inaccessible.',
            'Enforcement mechanisms: The ADA is enforced by the US Department of Justice and, in education-related cases, by the US Department of Education Office for Civil Rights. Enforcement occurs through investigations, consent decrees, settlements, and private lawsuits. This complaint-driven model has led to a growing volume of accessibility litigation related to websites and apps.'
          ]
        }
      ]
    },
    {
      heading: 'ICT accessibility laws and standards in the European Union',
      content: [],
      subsections: [
        {
          heading: 'European Web Accessibility Directive',
          content: [
            'The European Web Accessibility Directive applies to public sector bodies across the European Union. It requires government websites and mobile applications to be accessible when they are made available to users.',
            'In addition to technical accessibility, the Directive introduces procedural transparency. Public bodies must:<ul class="list-disc ml-6 mt-2 space-y-1"><li>Ensure websites and mobile apps are accessible</li><li>Publish an accessibility statement</li><li>Provide a mechanism for users to report accessibility issues</li><li>Link to enforcement or redress procedures</li></ul>',
            'The Directive refers to EN 301 549 as the primary way to demonstrate compliance. Following the relevant parts of this harmonized standard creates a legal presumption of conformity.',
            'Enforcement mechanisms: Each EU Member State is responsible for monitoring and enforcing compliance. Enforcement typically involves national monitoring bodies, periodic audits, user feedback mechanisms, and corrective actions rather than individual lawsuits.'
          ]
        },
        {
          heading: 'European Accessibility Act',
          content: [
            'The European Accessibility Act significantly expands ICT accessibility requirements beyond the public sector. Applying from 2025, it establishes common accessibility rules for key products and services provided by private businesses, with limited exceptions for microenterprises.',
            'Covered ICT-related products and services include:<ul class="list-disc ml-6 mt-2 space-y-1"><li>Computers and operating systems</li><li>Smartphones and telephony services</li><li>ATMs, ticketing, and check-in machines</li><li>E-books and e-commerce platforms</li><li>Banking services and transport-related digital services</li></ul>',
            'Like the Web Accessibility Directive, the Act relies on harmonized European standards—such as updated versions of EN 301 549—to assess accessibility.',
            'Enforcement mechanisms: Enforcement is handled at the national level. Member States designate authorities responsible for oversight and penalties. The Act allows non-government organizations and other bodies to initiate legal action on behalf of individuals, and it permits penalties for non-compliance under national law.'
          ]
        }
      ]
    },
    {
      heading: 'Comparing enforcement approaches',
      content: [
        'ICT accessibility enforcement differs noticeably between the US and the EU:<ul class="list-disc ml-6 mt-2 space-y-1"><li>In the United States, enforcement relies heavily on complaints, investigations, and litigation, particularly under the ADA.</li><li>In the European Union, enforcement emphasizes regulatory oversight, harmonized standards, and national monitoring bodies.</li><li>Public-sector ICT accessibility is generally more explicitly regulated than private-sector accessibility.</li></ul>',
        'Despite these differences, both systems increasingly recognize that digital access is essential to equality and participation.',
        'Accessibility laws applied to ICT ensure that digital transformation does not create new forms of exclusion. By linking civil rights principles to technical standards and enforcement mechanisms, these laws make accessibility a concrete, enforceable requirement in the digital world.'
      ]
    }
  ]
}
