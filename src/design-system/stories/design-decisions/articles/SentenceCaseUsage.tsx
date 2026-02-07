export function SentenceCaseUsageArticle() {
  return (
    <div style={{ 
      maxWidth: '900px', 
      margin: '0 auto', 
      padding: '3rem 2rem',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      lineHeight: '1.6',
      color: '#1f2937'
    }}>
      <h1 style={{ 
        fontSize: '2.5rem', 
        marginBottom: '1rem', 
        fontWeight: '700',
        color: '#111827'
      }}>
        Sentence case: why we use it everywhere
      </h1>
      
      <p style={{ 
        fontSize: '1.25rem', 
        color: '#6b7280', 
        marginBottom: '3rem',
        lineHeight: '1.75'
      }}>
        We use sentence case for all UI text — headings, buttons, links, labels, navigation items, and any other text element. The only exceptions are proper nouns, product names, acronyms, and formal titles such as treaties or legislation. This article documents why sentence case is the standard across major design systems, why it improves readability and accessibility, and how we apply it in this application.
      </p>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '2px solid #e5e7eb' }} />

      <h2 style={{ 
        fontSize: '2rem', 
        fontWeight: '600', 
        marginTop: '2.5rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        What is sentence case?
      </h2>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        Sentence case means capitalising only the first word and any proper nouns, just as you would in a normal sentence. It stands in contrast to title case (capitalising major words) and all caps (every letter uppercase).
      </p>

      <table style={{ 
        width: '100%', 
        borderCollapse: 'collapse',
        marginBottom: '2rem',
        fontSize: '1rem'
      }}>
        <thead>
          <tr style={{ background: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '25%' }}>Style</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '35%' }}>Example</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '40%' }}>Rule</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #e5e7eb', background: '#f0fdf4' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Sentence case</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>Manage your account settings</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>Capitalise only the first word and proper nouns</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Title case</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>Manage Your Account Settings</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>Capitalise the first word and all major words (definitions vary)</td>
          </tr>
          <tr>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>All caps</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>MANAGE YOUR ACCOUNT SETTINGS</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>Every letter is uppercase</td>
          </tr>
        </tbody>
      </table>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '2px solid #e5e7eb' }} />

      <h2 style={{ 
        fontSize: '2rem', 
        fontWeight: '600', 
        marginTop: '2.5rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        How major design systems handle capitalisation
      </h2>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        The world's most rigorously tested design systems have independently converged on sentence case as the standard for UI text. This is not a coincidence — it reflects decades of usability research.
      </p>

      <table style={{ 
        width: '100%', 
        borderCollapse: 'collapse',
        marginBottom: '2rem',
        fontSize: '1rem'
      }}>
        <thead>
          <tr style={{ background: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '20%' }}>Design system</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '20%' }}>Convention</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '60%' }}>What they say</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>GOV.UK</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>Sentence case</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              <em>"Do not use block capitals or upper case. It makes text harder to read. Avoid using italics. Research shows that capital letters are harder to read for all users, but especially for people with dyslexia."</em> GOV.UK mandates sentence case for all headings, labels, buttons, and navigation — with no exceptions other than proper nouns and acronyms.
            </td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Carbon (IBM)</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>Sentence case</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              <em>"Use sentence-style capitalisation in text and for all text elements in the UI except for proper nouns. Sentence style capitalises only the first word of each sentence."</em> IBM applies this rule across headings, buttons, labels, menu items, tabs, and tooltips.
            </td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Material Design (Google)</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>Sentence case</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Google's Material Design uses sentence case for buttons, tabs, and other interactive elements. Their writing guidelines emphasise clarity and simplicity, recommending sentence case to keep interfaces approachable and easy to scan.
            </td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Atlassian</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>Sentence case</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Atlassian's content guidelines specify sentence case for headings, labels, and buttons. Their rationale: sentence case is easier to read, more conversational, and reduces cognitive load when scanning dense interfaces like Jira and Confluence.
            </td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Microsoft Fluent</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>Sentence case</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Microsoft's Fluent design system uses sentence case for buttons, navigation items, and headings. Their writing style guide recommends it for a friendly, approachable tone that reduces formality barriers.
            </td>
          </tr>
          <tr>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Apple HIG</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>Title case (exception)</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Apple's Human Interface Guidelines are the notable outlier, preferring title case for many UI elements. However, Apple's ecosystem is deeply tied to its brand voice, and even Apple uses sentence case for longer strings, descriptions, and body text.
            </td>
          </tr>
        </tbody>
      </table>

      <div style={{ 
        background: '#eff6ff', 
        padding: '1.5rem', 
        borderRadius: '0.5rem',
        border: '2px solid #3b82f6',
        marginBottom: '2rem'
      }}>
        <h3 style={{ marginTop: '0', marginBottom: '0.75rem', fontSize: '1.125rem', fontWeight: '600', color: '#1e40af' }}>
          The consensus
        </h3>
        <p style={{ fontSize: '1.125rem', lineHeight: '1.75', margin: '0' }}>
          Five of the six most influential design systems mandate sentence case. The only exception (Apple) is a brand-driven choice, not a usability-driven one. When GOV.UK, IBM, Google, Atlassian, and Microsoft all independently arrive at the same conclusion, it is a strong signal that sentence case is the evidence-based default.
        </p>
      </div>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '2px solid #e5e7eb' }} />

      <h2 style={{ 
        fontSize: '2rem', 
        fontWeight: '600', 
        marginTop: '2.5rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        Why sentence case is better for readability
      </h2>

      <h3 style={{ 
        fontSize: '1.5rem', 
        fontWeight: '600', 
        marginTop: '2rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        Word shape recognition
      </h3>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        Readers don't process text letter by letter — they recognise word shapes (the pattern of ascenders, descenders, and x-height characters). Lowercase text produces distinctive, varied word shapes that the brain can match quickly. Title case and all caps flatten these shapes, making every word look more uniform and harder to distinguish at a glance.
      </p>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        Research by Miles Tinker, one of the foundational legibility researchers, found that all-caps text is read 13–20% slower than mixed case. While title case is not as extreme as all caps, it introduces unnecessary capital letters that partially flatten word shapes, reducing the distinctiveness that aids rapid recognition.
      </p>

      <h3 style={{ 
        fontSize: '1.5rem', 
        fontWeight: '600', 
        marginTop: '2rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        Proper noun distinction
      </h3>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        In sentence case, capital letters carry meaning — they signal proper nouns, the start of a sentence, or acronyms. When you see <em>"Review the Americans with Disabilities Act"</em>, the capital letters immediately tell you that "Americans with Disabilities Act" is a formal name.
      </p>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        In title case, this signal is destroyed. <em>"Review The Americans With Disabilities Act"</em> capitalises "The" and "With" alongside the proper noun, making it impossible to distinguish formal names from ordinary words at a glance. For non-native English speakers and people with cognitive disabilities, this loss of signal is especially costly.
      </p>

      <h3 style={{ 
        fontSize: '1.5rem', 
        fontWeight: '600', 
        marginTop: '2rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        Scanning speed
      </h3>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        Users scan interfaces, they don't read them. Eye-tracking research consistently shows that people read UI text in an F-pattern, fixating mainly on the first few words of headings and labels. Sentence case supports this by making the first word prominent (capitalised) while keeping the rest in lowercase, creating a natural visual hierarchy within each line. Title case flattens this hierarchy by making every major word equally prominent.
      </p>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '2px solid #e5e7eb' }} />

      <h2 style={{ 
        fontSize: '2rem', 
        fontWeight: '600', 
        marginTop: '2.5rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        Accessibility benefits
      </h2>

      <h3 style={{ 
        fontSize: '1.5rem', 
        fontWeight: '600', 
        marginTop: '2rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        Dyslexia
      </h3>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        The British Dyslexia Association's style guide explicitly recommends avoiding all capitals and unnecessary capitalisation. People with dyslexia rely heavily on word shape to decode text. Capital letters disrupt the distinctive ascender/descender patterns that make words recognisable. GOV.UK cites this research directly in their capitalisation guidelines, noting that <em>"capital letters are harder to read for all users, but especially for people with dyslexia."</em>
      </p>

      <h3 style={{ 
        fontSize: '1.5rem', 
        fontWeight: '600', 
        marginTop: '2rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        Cognitive disabilities
      </h3>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        People with cognitive disabilities benefit from consistent, predictable text patterns. Sentence case follows the same rules as regular prose, reducing the mental effort needed to parse UI elements. Title case introduces ambiguity (which words get capitalised? Is "the" capitalised after a colon?), adding cognitive load to both reading and writing content.
      </p>

      <h3 style={{ 
        fontSize: '1.5rem', 
        fontWeight: '600', 
        marginTop: '2rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        Non-native English speakers
      </h3>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        Title case is largely an English-language convention, and its rules are inconsistent even among native speakers. Non-native speakers may interpret capitalised words as proper nouns, brand names, or technical terms, leading to confusion. Sentence case removes this ambiguity because capitalisation follows the universal rule: first word and proper nouns only.
      </p>

      <h3 style={{ 
        fontSize: '1.5rem', 
        fontWeight: '600', 
        marginTop: '2rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        Screen readers
      </h3>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        Some screen readers interpret capitalised words differently. For instance, a word in all caps may be read letter by letter (as an acronym) rather than as a word. While most modern screen readers handle title case correctly, inconsistent capitalisation can still cause unexpected pauses or emphasis changes in speech output. Sentence case produces the most predictable, natural-sounding screen reader output.
      </p>

      <div style={{ 
        background: '#eff6ff', 
        padding: '1.5rem', 
        borderRadius: '0.5rem',
        border: '2px solid #3b82f6',
        marginBottom: '2rem'
      }}>
        <h3 style={{ marginTop: '0', marginBottom: '0.75rem', fontSize: '1.125rem', fontWeight: '600', color: '#1e40af' }}>
          The accessibility case is clear
        </h3>
        <p style={{ fontSize: '1.125rem', lineHeight: '1.75', margin: '0' }}>
          Sentence case benefits people with dyslexia, cognitive disabilities, and non-native speakers while producing the most predictable screen reader output. No accessibility research recommends title case or all caps for UI text. The evidence consistently points in one direction.
        </p>
      </div>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '2px solid #e5e7eb' }} />

      <h2 style={{ 
        fontSize: '2rem', 
        fontWeight: '600', 
        marginTop: '2.5rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        Consistency and authoring benefits
      </h2>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        Beyond readability and accessibility, sentence case has a significant practical advantage: <strong>it is trivially easy to apply consistently</strong>.
      </p>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        Title case requires authors to know which words to capitalise. The rules are surprisingly complex and vary between style guides: Is it "Sign In to Your Account" or "Sign in to Your Account" or "Sign In To Your Account"? Should prepositions of four or more letters be capitalised? What about "is", "are", "be"? Different style guides (AP, APA, Chicago, MLA) give different answers.
      </p>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        Sentence case eliminates this problem entirely. The rule is the same one you learned in primary school: capitalise the first word and proper nouns. Every developer, designer, and content author already knows it. There is no ambiguity, no need for a style guide lookup, and no inconsistency between contributors.
      </p>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        As Nottinghamshire County Council's digital content guidelines note: <em>"Sentence case makes text easier to read and easier to write. It reduces the chance of inconsistency across a website or application."</em>
      </p>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '2px solid #e5e7eb' }} />

      <h2 style={{ 
        fontSize: '2rem', 
        fontWeight: '600', 
        marginTop: '2.5rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        Our rules
      </h2>

      <div style={{ 
        background: '#f0fdf4', 
        padding: '1.5rem', 
        borderRadius: '0.5rem',
        border: '2px solid #86efac',
        marginBottom: '2rem'
      }}>
        <h3 style={{ marginTop: '0', marginBottom: '1rem', fontSize: '1.25rem', fontWeight: '600', color: '#166534' }}>
          Always capitalise
        </h3>
        <ul style={{ 
          fontSize: '1.125rem', 
          lineHeight: '1.75',
          marginLeft: '1.5rem',
          marginBottom: '0'
        }}>
          <li style={{ marginBottom: '0.5rem' }}>The first word of any text element (heading, button, label, link, tooltip)</li>
          <li style={{ marginBottom: '0.5rem' }}>Proper nouns — <em>Americans with Disabilities Act</em>, <em>European Union</em>, <em>United Kingdom</em></li>
          <li style={{ marginBottom: '0.5rem' }}>Product and brand names — <em>CPACC</em>, <em>IAAP</em>, <em>WCAG</em></li>
          <li style={{ marginBottom: '0.5rem' }}>Acronyms — <em>HTML</em>, <em>ARIA</em>, <em>CSS</em>, <em>SPA</em></li>
          <li style={{ marginBottom: '0' }}>Formal titles of treaties, legislation, and standards — <em>Convention on the Rights of Persons with Disabilities</em></li>
        </ul>
      </div>

      <div style={{ 
        background: '#fef2f2', 
        padding: '1.5rem', 
        borderRadius: '0.5rem',
        border: '2px solid #fca5a5',
        marginBottom: '2rem'
      }}>
        <h3 style={{ marginTop: '0', marginBottom: '1rem', fontSize: '1.25rem', fontWeight: '600', color: '#991b1b' }}>
          Never capitalise
        </h3>
        <ul style={{ 
          fontSize: '1.125rem', 
          lineHeight: '1.75',
          marginLeft: '1.5rem',
          marginBottom: '0'
        }}>
          <li style={{ marginBottom: '0.5rem' }}>Common words in headings or labels for emphasis — use bold or font weight instead</li>
          <li style={{ marginBottom: '0.5rem' }}>Every word in a heading (title case)</li>
          <li style={{ marginBottom: '0.5rem' }}>Entire words or phrases in all caps — use CSS <code style={{ background: '#f3f4f6', padding: '0.15rem 0.4rem', borderRadius: '0.25rem', fontFamily: 'monospace', fontSize: '0.9rem' }}>text-transform: uppercase</code> if the visual design requires it (this preserves the underlying sentence case for screen readers)</li>
          <li style={{ marginBottom: '0' }}>Words that are not proper nouns, even if they feel "important"</li>
        </ul>
      </div>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '2px solid #e5e7eb' }} />

      <h2 style={{ 
        fontSize: '2rem', 
        fontWeight: '600', 
        marginTop: '2.5rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        Examples from our application
      </h2>

      <table style={{ 
        width: '100%', 
        borderCollapse: 'collapse',
        marginBottom: '2rem',
        fontSize: '1rem'
      }}>
        <thead>
          <tr style={{ background: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '20%' }}>Element</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '35%' }}>&#10003; Correct (sentence case)</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '35%' }}>&#10007; Incorrect</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '10%' }}>Issue</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Page heading</td>
            <td style={{ padding: '1rem', verticalAlign: 'top', color: '#166534' }}>Universal design principles</td>
            <td style={{ padding: '1rem', verticalAlign: 'top', color: '#991b1b' }}>Universal Design Principles</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>Title case</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Button</td>
            <td style={{ padding: '1rem', verticalAlign: 'top', color: '#166534' }}>Confirm answer</td>
            <td style={{ padding: '1rem', verticalAlign: 'top', color: '#991b1b' }}>Confirm Answer</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>Title case</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Navigation link</td>
            <td style={{ padding: '1rem', verticalAlign: 'top', color: '#166534' }}>Practice tests</td>
            <td style={{ padding: '1rem', verticalAlign: 'top', color: '#991b1b' }}>Practice Tests</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>Title case</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Heading with proper noun</td>
            <td style={{ padding: '1rem', verticalAlign: 'top', color: '#166534' }}>About the CPACC certification</td>
            <td style={{ padding: '1rem', verticalAlign: 'top', color: '#991b1b' }}>About the Cpacc certification</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>Acronym lowercased</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Label</td>
            <td style={{ padding: '1rem', verticalAlign: 'top', color: '#166534' }}>Select your answer</td>
            <td style={{ padding: '1rem', verticalAlign: 'top', color: '#991b1b' }}>SELECT YOUR ANSWER</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>All caps</td>
          </tr>
          <tr>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Heading with legislation</td>
            <td style={{ padding: '1rem', verticalAlign: 'top', color: '#166534' }}>Overview of the Americans with Disabilities Act</td>
            <td style={{ padding: '1rem', verticalAlign: 'top', color: '#991b1b' }}>Overview of the americans with disabilities act</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>Proper noun lowercased</td>
          </tr>
        </tbody>
      </table>

      <div style={{ 
        background: '#eff6ff', 
        padding: '1.5rem', 
        borderRadius: '0.5rem',
        border: '2px solid #3b82f6',
        marginBottom: '2rem'
      }}>
        <h3 style={{ marginTop: '0', marginBottom: '0.75rem', fontSize: '1.125rem', fontWeight: '600', color: '#1e40af' }}>
          When you need visual uppercase
        </h3>
        <p style={{ fontSize: '1.125rem', lineHeight: '1.75', margin: '0' }}>
          If the visual design calls for uppercase text (e.g., a small category label above a heading), write the source text in sentence case and apply <code style={{ background: '#dbeafe', padding: '0.15rem 0.4rem', borderRadius: '0.25rem', fontFamily: 'monospace', fontSize: '0.9rem' }}>text-transform: uppercase</code> in CSS. This way, screen readers receive the natural sentence-case string while sighted users see the uppercase visual treatment. Never hard-code uppercase in the source text.
        </p>
      </div>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '2px solid #e5e7eb' }} />

      <h2 style={{ 
        fontSize: '2rem', 
        fontWeight: '600', 
        marginTop: '2.5rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        References
      </h2>

      <ul style={{ 
        fontSize: '1.125rem', 
        lineHeight: '1.75',
        marginLeft: '1.5rem',
        marginBottom: '1.5rem'
      }}>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong>GOV.UK Content Design — Writing for GOV.UK:</strong>{' '}
          <a href="https://www.gov.uk/guidance/content-design/writing-for-gov-uk" style={{ color: '#2563eb' }}>gov.uk/guidance/content-design/writing-for-gov-uk</a>
          <br /><span style={{ color: '#6b7280', fontSize: '1rem' }}>
            "Do not use block capitals or upper case. It makes text harder to read."
          </span>
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong>Carbon Design System (IBM) — Capitalisation:</strong>{' '}
          <a href="https://carbondesignsystem.com/guidelines/content/overview/" style={{ color: '#2563eb' }}>carbondesignsystem.com/guidelines/content/overview</a>
          <br /><span style={{ color: '#6b7280', fontSize: '1rem' }}>
            "Use sentence-style capitalisation in text and for all text elements in the UI."
          </span>
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong>Material Design (Google) — Writing:</strong>{' '}
          <a href="https://m3.material.io/foundations/content-design/style-guide/capitalization-punctuation" style={{ color: '#2563eb' }}>m3.material.io — Capitalisation &amp; punctuation</a>
          <br /><span style={{ color: '#6b7280', fontSize: '1rem' }}>
            Google's guidelines on capitalisation and punctuation for UI text.
          </span>
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong>Nottinghamshire County Council — Digital Content Guidelines:</strong>{' '}
          <a href="https://www.nottinghamshire.gov.uk/policy-library/25757/digital-content-guidelines" style={{ color: '#2563eb' }}>nottinghamshire.gov.uk — digital content guidelines</a>
          <br /><span style={{ color: '#6b7280', fontSize: '1rem' }}>
            "Sentence case makes text easier to read and easier to write."
          </span>
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong>British Dyslexia Association — Dyslexia Style Guide:</strong>{' '}
          <a href="https://www.bdadyslexia.org.uk/advice/employers/creating-a-dyslexia-friendly-workplace/dyslexia-friendly-style-guide" style={{ color: '#2563eb' }}>bdadyslexia.org.uk — dyslexia friendly style guide</a>
          <br /><span style={{ color: '#6b7280', fontSize: '1rem' }}>
            Guidance on text formatting to support readers with dyslexia, including avoiding unnecessary capitalisation.
          </span>
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong>USAGov — Content Style Guide:</strong>{' '}
          <a href="https://www.usa.gov/style-guide" style={{ color: '#2563eb' }}>usa.gov/style-guide</a>
          <br /><span style={{ color: '#6b7280', fontSize: '1rem' }}>
            US federal government content guidelines recommending sentence case for headings and UI elements.
          </span>
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong>eLaHub — Accessible Text Guidelines:</strong>{' '}
          <a href="https://www.interedvisual.com/elahub/" style={{ color: '#2563eb' }}>elahub — accessible text</a>
          <br /><span style={{ color: '#6b7280', fontSize: '1rem' }}>
            Research on how capitalisation patterns affect reading comprehension across diverse user groups.
          </span>
        </li>
        <li style={{ marginBottom: '0' }}>
          <strong>Miles Tinker — Legibility of Print (1963):</strong>
          <br /><span style={{ color: '#6b7280', fontSize: '1rem' }}>
            Foundational research demonstrating that all-caps text is read 13–20% slower than mixed case, underpinning modern capitalisation recommendations.
          </span>
        </li>
      </ul>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '2px solid #e5e7eb' }} />

      <h2 style={{ 
        fontSize: '2rem', 
        fontWeight: '600', 
        marginTop: '2.5rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        Summary
      </h2>

      <ul style={{ 
        fontSize: '1.125rem', 
        lineHeight: '1.75',
        marginLeft: '1.5rem',
        marginBottom: '1.5rem'
      }}>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong>Sentence case is the evidence-based default</strong> — five of six major design systems mandate it.
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong>It preserves word shape</strong>, which is how the brain recognises words quickly and is critical for people with dyslexia.
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong>Capital letters carry meaning</strong> — in sentence case, a capital letter signals a proper noun, acronym, or sentence start. Title case destroys this signal.
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong>It benefits everyone</strong> — people with dyslexia, cognitive disabilities, non-native speakers, and screen reader users all benefit from consistent sentence case.
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong>It is trivially easy to apply</strong> — no style guide debates, no ambiguity, no inconsistency between authors.
        </li>
        <li style={{ marginBottom: '0' }}>
          <strong>Use CSS for visual uppercase</strong> — when the design calls for uppercase text, use <code style={{ background: '#f3f4f6', padding: '0.15rem 0.4rem', borderRadius: '0.25rem', fontFamily: 'monospace', fontSize: '0.9rem' }}>text-transform: uppercase</code> and keep the source in sentence case.
        </li>
      </ul>
    </div>
  )
}
