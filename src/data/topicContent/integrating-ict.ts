import type { DetailedTopicContent } from './types'

export const integratingIct: DetailedTopicContent = {
  topicId: 'integrating-ict',
  introduction: [
    'Building accessible information and communication technology (ICT) across an organization is not a one-time effort or a standalone project. It requires an ongoing, coordinated program that is embedded into culture, governance, processes, and everyday decision-making. Organizations that succeed treat accessibility as part of how they design, procure, build, communicate, and evaluate digital products and services—over time and at scale.',
    'This topic brings together practical guidance for adopting an ICT accessibility program, explains how maturity models help organizations understand progress, and highlights why leadership and management champions are essential. The focus is not just on what to do, but on how to sustain accessibility as technology, standards, and organizational priorities evolve.'
  ],
  learningPoints: [
    'Describe the key steps involved in adopting an organization-wide ICT accessibility plan',
    'Understand why accessibility must be treated as an ongoing program, not a project',
    'Explain how accessibility maturity models support planning and measurement',
    'Recognize the critical role of leadership and management champions'
  ],
  sections: [
    {
      heading: 'Designing and Implementing an ICT Accessibility Program',
      content: [],
      subsections: [
        {
          heading: 'Accessibility as a Program, Not a Project',
          content: [
            'ICT accessibility must be approached strategically. A single website fix, audit, or remediation effort will not be sufficient if accessibility is not built into how the organization works. New content, new technologies, staff turnover, and evolving standards all mean that accessibility must be continuously maintained.',
            'A programmatic approach ensures that accessibility:',
            'Is aligned with organizational goals and culture',
            'Is integrated into policies, workflows, and governance',
            'Is supported with training, resources, and accountability',
            'Evolves as technology and legal expectations change'
          ]
        },
        {
          heading: 'Recommended Steps to Adopt an ICT Accessibility Plan',
          content: [
            'Initiate: A successful accessibility program begins with alignment and awareness. Accessibility needs to connect with existing organizational values, risk management, quality assurance, and inclusion goals.',
            'Key early actions include: Learning foundational accessibility concepts and standards, developing a clear business case for accessibility, understanding the current digital environment and risks, raising awareness across teams and leadership, setting measurable accessibility objectives, and building initial stakeholder support. This phase focuses on readiness and buy-in, not immediate technical fixes.',
            'Plan: Planning translates commitment into structure. It clarifies who is responsible, what resources are needed, and how progress will be tracked. Effective planning includes: creating an organizational accessibility policy, assigning clear roles and responsibilities, allocating budget and staffing resources, reviewing existing websites, systems, and tools, establishing monitoring and reporting frameworks, and engaging internal and external stakeholders. Without this foundation, accessibility efforts tend to be fragmented and short-lived.',
            'Implement: Implementation is where accessibility becomes part of everyday work. Rather than treating accessibility as an add-on, it should be woven into design, development, content creation, and procurement processes. Core implementation practices include: building staff skills and internal expertise, integrating accessibility into existing policies and workflows, assigning tasks and supporting delivery teams, evaluating early and regularly during development, prioritizing issues based on impact and risk, and tracking and communicating progress. Quick wins can help build momentum, but long-term success depends on consistency.',
            'Sustain: Sustainability ensures that accessibility does not fade once initial goals are met. Ongoing monitoring and adaptation are essential. Sustaining an accessibility program involves: continuously monitoring websites and digital services, maintaining engagement with stakeholders, tracking changes in standards, laws, and technologies, adapting practices as tools and platforms evolve, and incorporating user feedback, including from people with disabilities. Accessibility maturity grows over time through review, learning, and refinement.'
          ]
        },
        {
          heading: 'Organizational Guidelines for Accessible Information',
          content: [
            'Guidelines developed for accessible information emphasize embedding accessibility into strategy and operations, not isolating it within specialist roles.',
            'Key recommendations include: Including accessibility commitments in long-term strategy, developing a clear, incremental accessibility plan, assigning accountable owners with authority and resources, embedding accessibility into content production workflows, training all staff, with deeper training for specialists, ensuring accessibility requirements are included when outsourcing, and testing accessibility before publishing information or services.',
            'This approach treats accessibility as a shared responsibility across the organization.'
          ]
        }
      ]
    },
    {
      heading: 'Accessibility Maturity Models',
      content: [],
      subsections: [
        {
          heading: 'What Maturity Models Are',
          content: [
            'An accessibility maturity model is a structured way to assess how well accessibility is integrated into an organization. Instead of asking "Are we accessible?", maturity models ask "How consistently, predictably, and effectively do we address accessibility?"',
            'They help organizations: Benchmark current practices, identify gaps and priorities, measure improvement over time, and align accessibility with business processes.',
            'Different models exist, and organizations should choose one that fits their culture and scale.'
          ]
        },
        {
          heading: 'Example: Accessibility Maturity Levels',
          content: [
            'A common five-level structure includes:',
            'Informal: No consistent process or documentation',
            'Defined: Policies exist but are inconsistently applied',
            'Repeatable: Accessibility practices are consistently followed',
            'Managed: Processes are monitored, measured, and improved',
            'Best practice: Accessibility is optimized, innovative, and shared',
            'Progression through levels reflects increasing integration and organizational confidence.'
          ]
        },
        {
          heading: 'Adapted Capability Maturity Approach',
          content: [
            'Another approach adapts general process maturity models to ICT accessibility. It moves from ad hoc practices, to documented and enforced processes, to measurable and continuously improving systems. At higher levels, accessibility becomes part of organizational quality and risk management rather than a compliance afterthought.'
          ]
        }
      ]
    },
    {
      heading: 'The Importance of Management Champions',
      content: [],
      subsections: [
        {
          heading: 'Why Champions Matter',
          content: [
            'Leadership support is one of the strongest predictors of accessibility success. Management champions help move accessibility from intention to action.',
            'Effective accessibility champions: Build a shared vision and align teams, advocate for accessibility in decision-making, sustain momentum across projects and departments, support adoption of maturity models and metrics, and reinforce that accessibility is a program, not a side task.',
            'Champions do not need to be technical experts, but they must understand the value and implications of accessibility.'
          ]
        },
        {
          heading: 'Evaluating for Accessibility',
          content: [
            'Evaluation is essential to accessible ICT. Accessibility issues are easier and less costly to fix when identified early.',
            'Best practices include: Designing products to be usable by people with disabilities from the start, creating reusable accessible design and code libraries, using automated tools alongside human evaluation, testing throughout the lifecycle, not just at launch, including people with disabilities in evaluation activities, and using external expertise when internal capacity is limited.',
            'Regular evaluation keeps accessibility aligned with real user needs.'
          ]
        }
      ]
    },
    {
      heading: 'Supporting Accessibility Through People and Processes',
      content: [],
      subsections: [
        {
          heading: 'Recruiting and Hiring',
          content: [
            'Organizations strengthen accessibility by including people with disabilities as employees and by recruiting staff with accessibility skills. This includes accessible recruitment processes, reasonable accommodations, disability awareness training, and clear expectations for managers.'
          ]
        },
        {
          heading: 'Communication and Procurement',
          content: [
            'Accessible communication and purchasing practices extend accessibility beyond internal systems. Publishing accessible content, training communicators, setting procurement requirements, and verifying vendor claims all help ensure accessibility is maintained across the supply chain.'
          ]
        },
        {
          heading: 'Legal, Risk, and Public Accountability',
          content: [
            'Accessibility also carries legal and reputational implications. Organizations benefit from understanding relevant laws, documenting compliance, and coordinating legal, risk, and communications functions. When done well, accessibility supports trust, inclusion, and positive public reputation.',
            'An effective ICT accessibility program is sustained by leadership, measured through maturity, reinforced by policy, and embedded in everyday practice. When accessibility is treated as a core organizational capability, it becomes resilient, scalable, and impactful.'
          ]
        }
      ]
    }
  ]
}
