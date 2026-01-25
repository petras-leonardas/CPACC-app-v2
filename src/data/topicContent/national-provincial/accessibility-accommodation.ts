import type { TopicSection } from '../types'

export const accessibilityAccommodation: TopicSection = {
  heading: 'Two ways to make things right: accessibility and accommodation',
  content: 'To make sure everyone is included, laws use two different but equally important methods.',
  subsections: [
    {
      heading: 'Reasonable accommodation',
      content: [
        'Think of this as a "custom fit." It\'s an adjustment made for one specific person in a specific situation. For example, a boss might let an employee start their day an hour later to avoid a crowded commute.',
        'The <strong>EU Employment Directive</strong> is a set of rules for countries in the European Union that says bosses must provide these custom fits unless it\'s too difficult or expensive for the business. This directive is basically a framework that ensures people aren\'t excluded from jobs just because they need a slight change in how they work.',
      ]
    },
    {
      heading: 'Accessibility',
      content: [
        'This is "universal design" that works for everyone from the very start. You don\'t wait for someone to ask for a ramp; you build the ramp so it\'s there for everyone—whether they use a wheelchair, a stroller, or a delivery cart.',
        '<strong>Section 508 of the Rehabilitation Act of 1973</strong> is a US law that says the government\'s digital tools must be easy for everyone to use, without anyone having to ask for special treatment. This law specifically targets electronic and information technology to make sure the digital world is open to all.',
      ]
    },
  ]
}
