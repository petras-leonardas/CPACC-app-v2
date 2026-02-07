export function SymbolsInUITextArticle() {
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
        Symbols in UI text: why screen readers can't be trusted with them
      </h1>
      
      <p style={{ 
        fontSize: '1.25rem', 
        color: '#6b7280', 
        marginBottom: '3rem',
        lineHeight: '1.75'
      }}>
        Symbols like the tilde (~), asterisk (*), and plus (+) are convenient visual shorthand for sighted users. But screen readers handle them with alarming inconsistency — some are read aloud, some are silently skipped, and some are announced with technical names that carry no meaning in context. This article documents our investigation into the tilde symbol used for approximate time estimates, what the research says about symbol support across screen readers, and how major design systems approach this problem.
      </p>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '2px solid #e5e7eb' }} />

      <h2 style={{ 
        fontSize: '2rem', 
        fontWeight: '600', 
        marginTop: '2.5rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        The problem: our tilde case study
      </h2>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        On our practice test page, each test card displays an estimated duration inside a small badge chip. The original implementation used the tilde symbol as a compact way to communicate "approximately":
      </p>

      <div style={{ 
        background: '#f9fafb', 
        padding: '1.5rem', 
        borderRadius: '0.5rem',
        border: '1px solid #e5e7eb',
        marginBottom: '1.5rem',
        fontFamily: 'monospace',
        fontSize: '0.95rem',
        lineHeight: '1.8'
      }}>
        <div><strong>Visual display:</strong> 🕐 ~10 minutes</div>
        <div><strong>Intended meaning:</strong> "Approximately 10 minutes"</div>
      </div>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        When tested with screen reading software, the badge was announced in one of two ways, neither of which communicated the intended meaning:
      </p>

      <table style={{ 
        width: '100%', 
        borderCollapse: 'collapse',
        marginBottom: '2rem',
        fontSize: '1rem'
      }}>
        <thead>
          <tr style={{ background: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '25%' }}>Screen reader</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '35%' }}>Announcement</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '40%' }}>Problem</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>JAWS</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>"tilde 10 minutes"</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>"Tilde" is the technical Unicode name of the character. Most users do not associate it with "approximately" in a time context.</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>NVDA</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>"10 minutes"</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>The tilde is silently dropped. The user hears an exact-sounding duration with no indication that it is an estimate.</td>
          </tr>
          <tr>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>VoiceOver</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>"tilde 10 minutes"</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>Same as JAWS — the technical name is announced but carries no natural meaning.</td>
          </tr>
        </tbody>
      </table>

      <div style={{ 
        background: '#fef2f2', 
        padding: '1.5rem', 
        borderRadius: '0.5rem',
        border: '2px solid #fca5a5',
        marginBottom: '2rem'
      }}>
        <h3 style={{ marginTop: '0', marginBottom: '0.75rem', fontSize: '1.125rem', fontWeight: '600', color: '#991b1b' }}>
          A worst-of-both-worlds situation
        </h3>
        <p style={{ fontSize: '1.125rem', lineHeight: '1.75', margin: '0' }}>
          NVDA users lose the "approximate" meaning entirely — they hear an exact-sounding "10 minutes." JAWS and VoiceOver users hear "tilde 10 minutes" — technically announced, but "tilde" does not naturally convey "approximately" in spoken language. Neither outcome communicates the intended meaning.
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
        What the research says: screen readers and symbols
      </h2>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        Two landmark studies have systematically tested how screen readers handle special characters and typographic symbols: <strong>Deque's 2014 research</strong> (by Paul Bohman) and <strong>Eleven Ways' 2023 update</strong> (which retested the same characters with current screen reader versions). Their findings are sobering.
      </p>

      <h3 style={{ 
        fontSize: '1.5rem', 
        fontWeight: '600', 
        marginTop: '2rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        Only 17 of 91 symbols are "safe"
      </h3>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        Deque tested 91 common punctuation marks and typographic symbols across JAWS, NVDA, and VoiceOver. Only <strong>17 characters</strong> were consistently read aloud by all three screen readers in their default configurations. The tilde is explicitly listed as an <strong>"unread character"</strong> — meaning at least one screen reader will not announce it.
      </p>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        The 17 safe characters are: <code style={{ background: '#f3f4f6', padding: '0.15rem 0.4rem', borderRadius: '0.25rem', fontFamily: 'monospace', fontSize: '0.9rem' }}>@</code> <code style={{ background: '#f3f4f6', padding: '0.15rem 0.4rem', borderRadius: '0.25rem', fontFamily: 'monospace', fontSize: '0.9rem' }}>&amp;</code> <code style={{ background: '#f3f4f6', padding: '0.15rem 0.4rem', borderRadius: '0.25rem', fontFamily: 'monospace', fontSize: '0.9rem' }}>/</code> <code style={{ background: '#f3f4f6', padding: '0.15rem 0.4rem', borderRadius: '0.25rem', fontFamily: 'monospace', fontSize: '0.9rem' }}>©</code> <code style={{ background: '#f3f4f6', padding: '0.15rem 0.4rem', borderRadius: '0.25rem', fontFamily: 'monospace', fontSize: '0.9rem' }}>®</code> <code style={{ background: '#f3f4f6', padding: '0.15rem 0.4rem', borderRadius: '0.25rem', fontFamily: 'monospace', fontSize: '0.9rem' }}>™</code> <code style={{ background: '#f3f4f6', padding: '0.15rem 0.4rem', borderRadius: '0.25rem', fontFamily: 'monospace', fontSize: '0.9rem' }}>¶</code> <code style={{ background: '#f3f4f6', padding: '0.15rem 0.4rem', borderRadius: '0.25rem', fontFamily: 'monospace', fontSize: '0.9rem' }}>•</code> <code style={{ background: '#f3f4f6', padding: '0.15rem 0.4rem', borderRadius: '0.25rem', fontFamily: 'monospace', fontSize: '0.9rem' }}>$</code> <code style={{ background: '#f3f4f6', padding: '0.15rem 0.4rem', borderRadius: '0.25rem', fontFamily: 'monospace', fontSize: '0.9rem' }}>€</code> <code style={{ background: '#f3f4f6', padding: '0.15rem 0.4rem', borderRadius: '0.25rem', fontFamily: 'monospace', fontSize: '0.9rem' }}>£</code> <code style={{ background: '#f3f4f6', padding: '0.15rem 0.4rem', borderRadius: '0.25rem', fontFamily: 'monospace', fontSize: '0.9rem' }}>¥</code> <code style={{ background: '#f3f4f6', padding: '0.15rem 0.4rem', borderRadius: '0.25rem', fontFamily: 'monospace', fontSize: '0.9rem' }}>%</code> <code style={{ background: '#f3f4f6', padding: '0.15rem 0.4rem', borderRadius: '0.25rem', fontFamily: 'monospace', fontSize: '0.9rem' }}>½</code> <code style={{ background: '#f3f4f6', padding: '0.15rem 0.4rem', borderRadius: '0.25rem', fontFamily: 'monospace', fontSize: '0.9rem' }}>¼</code> <code style={{ background: '#f3f4f6', padding: '0.15rem 0.4rem', borderRadius: '0.25rem', fontFamily: 'monospace', fontSize: '0.9rem' }}>¾</code> <code style={{ background: '#f3f4f6', padding: '0.15rem 0.4rem', borderRadius: '0.25rem', fontFamily: 'monospace', fontSize: '0.9rem' }}>°</code>. Everything else — including the tilde, asterisk, plus sign, parentheses, and many common punctuation marks — fails in at least one screen reader.
      </p>

      <h3 style={{ 
        fontSize: '1.5rem', 
        fontWeight: '600', 
        marginTop: '2rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        NVDA is the least verbose
      </h3>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        Both Deque and Eleven Ways found that <strong>NVDA is the least verbose screen reader by a large margin</strong>. In its default configuration, NVDA silently drops most typographic symbols — including the tilde, asterisk, parentheses, and many others. This means any meaning conveyed solely through a symbol will be completely lost for the significant population of NVDA users.
      </p>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        Deque's conclusion: <em>"If the meaning of a symbol is essential to your message, be very cautious in how you use the symbols."</em>
      </p>

      <h3 style={{ 
        fontSize: '1.5rem', 
        fontWeight: '600', 
        marginTop: '2rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        The 2023 update: improvements, but tilde is still unsafe
      </h3>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        Eleven Ways retested all characters in 2023 with current versions of JAWS, NVDA, and VoiceOver. While many characters improved (arrows, mathematical operators, daggers), the <strong>tilde remains on the "unread" list</strong>. Several other common characters also remain problematic, including parentheses, dashes, colons, semicolons, and quotation marks.
      </p>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        Their overarching takeaway: <em>"Use special characters only when there is a need for them"</em> and <em>"Test your content with multiple screen readers."</em>
      </p>

      <h3 style={{ 
        fontSize: '1.5rem', 
        fontWeight: '600', 
        marginTop: '2rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        Even "read" symbols can be confusing
      </h3>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        An important subtlety: even when a screen reader <em>does</em> announce a symbol, it reads the <strong>Unicode character name</strong>, not the meaning the author intended. The tilde is announced as "tilde" — a technical term from mathematics and computing. In a UI context like "~10 minutes," most users would not parse "tilde 10 minutes" as "approximately 10 minutes." The symbol is being <em>read</em>, but the <em>meaning</em> is not being communicated.
      </p>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        This is a broader problem. The asterisk is announced as "star" or "asterisk," not "required." The plus sign is "plus," not "and more." The pipe character is "vertical bar." Screen readers read <em>characters</em>, but users need <em>meaning</em>.
      </p>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '2px solid #e5e7eb' }} />

      <h2 style={{ 
        fontSize: '2rem', 
        fontWeight: '600', 
        marginTop: '2.5rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        How major design systems handle approximate time
      </h2>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        We surveyed how the world's most rigorously tested design systems display time estimates and approximate values. The pattern is unanimous: <strong>none of them use the tilde symbol</strong>.
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
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '30%' }}>Approach to approximate time</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '50%' }}>Example</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Material Design (Google)</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>Spells out in plain words. Has an explicit "Approximate time" section in their Data Formats guidelines.</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              <em>"In 5 minutes"</em>, <em>"3 days ago"</em>, <em>"2 hr 32 min ago"</em>. Abbreviations are permitted for compact contexts, but always in words — never symbols.
            </td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Atlassian</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>Uses conversational language. Their guideline: <em>"Express date and time information as you would speak in conversation."</em></td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              <em>"Use approximate time by rounding down to the largest or most recent date or time."</em> No symbols for approximation.
            </td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>GOV.UK</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>Prohibits symbols where words would be clearer. General principle: avoid characters that screen readers may not read correctly.</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Estimates are written in full words. No tilde or symbol-based approximation.
            </td>
          </tr>
          <tr>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Carbon (IBM)</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>Uses words for clarity. Content guidelines prioritise plain language over symbolic shorthand.</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Duration and time estimates use words, not symbols.
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
          No major design system uses the tilde (<code style={{ background: '#dbeafe', padding: '0.15rem 0.4rem', borderRadius: '0.25rem', fontFamily: 'monospace', fontSize: '0.9rem' }}>~</code>) for approximate time in UI text. They all use words — either fully spelled out or abbreviated. When Google, Atlassian, GOV.UK, and IBM all independently arrive at the same approach, it is a strong signal that words are the evidence-based choice.
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
        Common symbols and their screen reader problems
      </h2>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        The tilde is not an isolated case. Many symbols commonly used in UI design have similar problems. Here are the most frequent offenders, based on the Deque and Eleven Ways research:
      </p>

      <table style={{ 
        width: '100%', 
        borderCollapse: 'collapse',
        marginBottom: '2rem',
        fontSize: '1rem'
      }}>
        <thead>
          <tr style={{ background: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '10%' }}>Symbol</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '20%' }}>Common UI meaning</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '25%' }}>JAWS</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '20%' }}>NVDA</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '25%' }}>VoiceOver</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600', fontFamily: 'monospace' }}>~</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>Approximately</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>"tilde"</td>
            <td style={{ padding: '1rem', verticalAlign: 'top', color: '#991b1b', fontWeight: '600' }}>Silent</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>"tilde"</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600', fontFamily: 'monospace' }}>*</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>Required field</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>"star"</td>
            <td style={{ padding: '1rem', verticalAlign: 'top', color: '#991b1b', fontWeight: '600' }}>Silent</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>"star"</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600', fontFamily: 'monospace' }}>|</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>Separator / divider</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>"vertical bar"</td>
            <td style={{ padding: '1rem', verticalAlign: 'top', color: '#991b1b', fontWeight: '600' }}>Silent</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>"vertical bar"</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600', fontFamily: 'monospace' }}>…</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>More content / truncation</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>Varies</td>
            <td style={{ padding: '1rem', verticalAlign: 'top', color: '#991b1b', fontWeight: '600' }}>Silent</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>Varies</td>
          </tr>
          <tr>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600', fontFamily: 'monospace' }}>+</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>Add / and more</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>"plus"</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>"plus"</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>"plus"</td>
          </tr>
        </tbody>
      </table>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        Notice the pattern: NVDA — one of the most widely used screen readers — silently drops the majority of these symbols. Any meaning conveyed through a symbol alone is completely lost for NVDA users in their default verbosity settings.
      </p>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '2px solid #e5e7eb' }} />

      <h2 style={{ 
        fontSize: '2rem', 
        fontWeight: '600', 
        marginTop: '2.5rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        The role of user verbosity settings
      </h2>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        Screen readers allow users to configure verbosity levels — how much punctuation and symbol detail is read aloud. At higher verbosity levels, more symbols are announced. However, as Deque notes, <strong>most users leave their screen reader at default settings</strong>. Designing for non-default settings means relying on a small minority of power users to have manually configured their software in a specific way.
      </p>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        The accessible design principle is clear: <strong>do not rely on symbols to convey essential meaning</strong>. If the information matters, it must work at default verbosity levels across all major screen readers.
      </p>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '2px solid #e5e7eb' }} />

      <h2 style={{ 
        fontSize: '2rem', 
        fontWeight: '600', 
        marginTop: '2.5rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        Solutions: replacing symbols with words
      </h2>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        When space allows, the simplest and most robust solution is to replace the symbol with a word. When space is constrained, there are several approaches, each with trade-offs:
      </p>

      <h3 style={{ 
        fontSize: '1.5rem', 
        fontWeight: '600', 
        marginTop: '2rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        Option 1: Use a word or abbreviation (recommended)
      </h3>

      <div style={{ 
        background: '#dcfce7', 
        padding: '1.5rem', 
        borderRadius: '0.5rem',
        border: '2px solid #86efac',
        marginBottom: '2rem'
      }}>
        <pre style={{ 
          background: '#1f2937', 
          color: '#f9fafb', 
          padding: '1rem', 
          borderRadius: '0.375rem', 
          overflow: 'auto',
          fontSize: '0.875rem',
          lineHeight: '1.5',
          margin: '0 0 0.75rem 0'
        }}>
{`<Badge icon={Clock} size="sm">Approx. 10 min</Badge>`}
        </pre>
        <ul style={{ fontSize: '1rem', lineHeight: '1.75', marginTop: '0', marginBottom: '0', marginLeft: '1.5rem' }}>
          <li>Screen reader output: "Approx. 10 min" — clear and natural</li>
          <li>Identical experience for sighted and screen reader users</li>
          <li>No WCAG compliance risk</li>
          <li>Only 2–3 characters longer than the tilde version</li>
        </ul>
      </div>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        Compact word alternatives for "approximately":
      </p>

      <table style={{ 
        width: '100%', 
        borderCollapse: 'collapse',
        marginBottom: '2rem',
        fontSize: '1rem'
      }}>
        <thead>
          <tr style={{ background: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '35%' }}>Format</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '15%' }}>Characters</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '50%' }}>Screen reader output</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>~10 minutes</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>12</td>
            <td style={{ padding: '1rem', verticalAlign: 'top', color: '#991b1b' }}>"tilde 10 minutes" or "10 minutes" (NVDA)</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb', background: '#f0fdf4' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Approx. 10 min</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>15</td>
            <td style={{ padding: '1rem', verticalAlign: 'top', color: '#166534' }}>"Approx. 10 min" ✓</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb', background: '#f0fdf4' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>About 10 min</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>13</td>
            <td style={{ padding: '1rem', verticalAlign: 'top', color: '#166534' }}>"About 10 min" ✓</td>
          </tr>
          <tr style={{ background: '#f0fdf4' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Est. 10 min</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>12</td>
            <td style={{ padding: '1rem', verticalAlign: 'top', color: '#166534' }}>"Est. 10 min" ✓</td>
          </tr>
        </tbody>
      </table>

      <h3 style={{ 
        fontSize: '1.5rem', 
        fontWeight: '600', 
        marginTop: '2rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        Option 2: Visually hidden text (when the symbol must stay)
      </h3>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        If the visual design absolutely requires the symbol, you can hide it from screen readers and provide a word alternative:
      </p>

      <div style={{ 
        background: '#f9fafb', 
        padding: '1.5rem', 
        borderRadius: '0.5rem',
        border: '1px solid #e5e7eb',
        marginBottom: '2rem'
      }}>
        <pre style={{ 
          background: '#1f2937', 
          color: '#f9fafb', 
          padding: '1rem', 
          borderRadius: '0.375rem', 
          overflow: 'auto',
          fontSize: '0.875rem',
          lineHeight: '1.5',
          margin: '0'
        }}>
{`<Badge icon={Clock} size="sm">
  <span aria-hidden="true">~</span>
  <span className="sr-only">Approximately </span>
  10 minutes
</Badge>`}
        </pre>
        <ul style={{ fontSize: '1rem', lineHeight: '1.75', marginTop: '0.75rem', marginBottom: '0', marginLeft: '1.5rem' }}>
          <li>Sighted users see: "~10 minutes"</li>
          <li>Screen reader users hear: "Approximately 10 minutes"</li>
          <li>More DOM complexity, but a well-established accessible pattern</li>
        </ul>
      </div>

      <h3 style={{ 
        fontSize: '1.5rem', 
        fontWeight: '600', 
        marginTop: '2rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        Option 3: aria-label (use with caution)
      </h3>

      <div style={{ 
        background: '#fef2f2', 
        padding: '1.5rem', 
        borderRadius: '0.5rem',
        border: '2px solid #fca5a5',
        marginBottom: '2rem'
      }}>
        <pre style={{ 
          background: '#1f2937', 
          color: '#f9fafb', 
          padding: '1rem', 
          borderRadius: '0.375rem', 
          overflow: 'auto',
          fontSize: '0.875rem',
          lineHeight: '1.5',
          margin: '0'
        }}>
{`<Badge icon={Clock} size="sm" aria-label="Approximately 10 minutes">
  ~10 minutes
</Badge>`}
        </pre>
        <ul style={{ fontSize: '1rem', lineHeight: '1.75', marginTop: '0.75rem', marginBottom: '0', marginLeft: '1.5rem' }}>
          <li>Visual stays compact; screen reader gets the full word</li>
          <li style={{ color: '#991b1b', fontWeight: '600' }}>Risks violating WCAG 2.5.3 — Label in Name (Level A)</li>
          <li>Speech-input users (Dragon NaturallySpeaking) may not be able to activate the element by saying what they see</li>
          <li>Creates a divergence between visible and announced text</li>
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
        Our decision
      </h2>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        We chose <strong>Option 1</strong> — replacing the tilde with the abbreviation "Approx." and shortening the time unit. This gives us the best combination of clarity, accessibility, and compactness:
      </p>

      <table style={{ 
        width: '100%', 
        borderCollapse: 'collapse',
        marginBottom: '2rem',
        fontSize: '1rem'
      }}>
        <thead>
          <tr style={{ background: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '35%' }}>Before</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '35%' }}>After</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '30%' }}>Character difference</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #e5e7eb', background: '#f0fdf4' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>~10 minutes</td>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Approx. 10 min</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>+3 characters</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb', background: '#f0fdf4' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>~20 minutes</td>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Approx. 20 min</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>+3 characters</td>
          </tr>
          <tr style={{ background: '#f0fdf4' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>~2 hours</td>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Approx. 2 hrs</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>+5 characters</td>
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
        The general rule
      </h2>

      <div style={{ 
        background: '#eff6ff', 
        padding: '1.5rem', 
        borderRadius: '0.5rem',
        border: '2px solid #3b82f6',
        marginBottom: '2rem'
      }}>
        <p style={{ fontSize: '1.25rem', lineHeight: '1.75', margin: '0', fontWeight: '600', color: '#1e40af' }}>
          If a symbol carries essential meaning, replace it with a word.
        </p>
        <p style={{ fontSize: '1.125rem', lineHeight: '1.75', margin: '1rem 0 0 0' }}>
          Symbols are unreliable across screen readers, their Unicode names often don't match the author's intended meaning, and user verbosity settings are unpredictable. Words work for everyone — sighted users, screen reader users, speech-input users, and people with cognitive disabilities. When space is constrained, use standard abbreviations rather than symbols.
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
          <strong>Deque — Screen Readers: A Guide to Punctuation and Symbols:</strong>{' '}
          <a href="https://www.deque.com/blog/dont-screen-readers-read-whats-screen-part-1-punctuation-typographic-symbols/" style={{ color: '#2563eb' }}>deque.com — Punctuation and Typographic Symbols</a>
          <br /><span style={{ color: '#6b7280', fontSize: '1rem' }}>
            Comprehensive 2014 study testing 91 symbols across JAWS, NVDA, and VoiceOver. Only 17 are "safe."
          </span>
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong>Eleven Ways — How Screen Readers Read Special Characters (2023 Update):</strong>{' '}
          <a href="https://www.elevenways.be/en/articles/screenreaders-special-characters" style={{ color: '#2563eb' }}>elevenways.be — Screen readers and special characters</a>
          <br /><span style={{ color: '#6b7280', fontSize: '1rem' }}>
            Retested all characters in 2023. Tilde remains on the "unread" list. Many improvements, but significant gaps persist.
          </span>
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong>Material Design (Google) — Data Formats:</strong>{' '}
          <a href="https://m1.material.io/patterns/data-formats.html" style={{ color: '#2563eb' }}>m1.material.io — Data Formats</a>
          <br /><span style={{ color: '#6b7280', fontSize: '1rem' }}>
            Explicit "Approximate time" section using words, not symbols. Abbreviation guidelines for compact contexts.
          </span>
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong>Atlassian — Date and Time Guidelines:</strong>{' '}
          <a href="https://atlassian.design/content/writing-guidelines/writing-guidelines/date-and-time-guideline/" style={{ color: '#2563eb' }}>atlassian.design — Date and time</a>
          <br /><span style={{ color: '#6b7280', fontSize: '1rem' }}>
            "Express date and time information as you would speak in conversation." Uses words for approximation.
          </span>
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong>GOV.UK — Content Design:</strong>{' '}
          <a href="https://www.gov.uk/guidance/content-design/writing-for-gov-uk" style={{ color: '#2563eb' }}>gov.uk — Writing for GOV.UK</a>
          <br /><span style={{ color: '#6b7280', fontSize: '1rem' }}>
            General principle: avoid symbols and characters that screen readers may not read correctly.
          </span>
        </li>
        <li style={{ marginBottom: '0' }}>
          <strong>WCAG 2.5.3 — Label in Name (Level A):</strong>{' '}
          <a href="https://www.w3.org/WAI/WCAG21/Understanding/label-in-name.html" style={{ color: '#2563eb' }}>w3.org — Understanding Label in Name</a>
          <br /><span style={{ color: '#6b7280', fontSize: '1rem' }}>
            The accessible name must contain the visible text. Relevant when considering aria-label overrides for symbol-containing elements.
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
          <strong>The tilde is classified as "unsafe"</strong> — NVDA drops it silently, JAWS and VoiceOver read "tilde" which doesn't communicate "approximately."
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong>Only 17 of 91 symbols are reliably read</strong> by all major screen readers at default verbosity settings.
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong>No major design system uses symbols for approximate time</strong> — Material, Atlassian, GOV.UK, and Carbon all use words.
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong>Screen readers read character names, not meanings</strong> — even when a symbol is announced, its Unicode name may not match the author's intent.
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong>Words work for everyone</strong> — sighted users, screen reader users, speech-input users, and people with cognitive disabilities.
        </li>
        <li style={{ marginBottom: '0' }}>
          <strong>When space is tight, abbreviate — don't symbolise</strong> — "Approx.", "About", or "Est." are all clearer than "~".
        </li>
      </ul>
    </div>
  )
}
