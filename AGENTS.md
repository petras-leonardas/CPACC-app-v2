# AGENTS.md -- CPACC Mastery Project Context

## Project Overview

**CPACC Mastery** is a web-based study and practice test application for the **CPACC (Certified Professional in Accessibility Core Competencies)** certification exam. It provides detailed study content for all 17 CPACC exam topics, multiple-choice practice tests, and text-to-speech -- all built with accessibility as a core concern.

- **Production:** https://cpaccmastery.com (also `cpacc-mastery-final.petras-leonardas.workers.dev`)
- **Preview:** Auto-generated for every non-main branch push (e.g., `*-cpacc-mastery-final.petras-leonardas.workers.dev`)
- **GitHub:** https://github.com/petras-leonardas/CPACC-app-v2
- **Storybook:** Deployed to `cpacc-design-system` Cloudflare Pages project

This is a **single-page application** deployed on **Cloudflare Workers** with **Cloudflare D1** (SQLite) for the database and a **Worker entry point** (`functions/worker.ts`) as the serverless API layer. Pushing to `main` auto-deploys to production via Git integration. There is no authentication -- the app is fully public with client-side state persisted in `localStorage`.

---

## Tech Stack

| Layer | Technology | Notes |
|---|---|---|
| UI | React 19, TypeScript 5.9 | Strict mode, ES2022 target |
| Build | Vite 5.4 | `@vitejs/plugin-react` |
| Styling | Tailwind CSS 3.4 | Dark mode via `class` strategy |
| Routing | React Router DOM 7 | Client-side SPA routing |
| Hosting | Cloudflare Pages | Static assets + serverless functions |
| Database | Cloudflare D1 (SQLite) | Used for feedback storage only |
| Serverless | Cloudflare Pages Functions | `/api/feedback`, `/api/tts` |
| Email | Resend API | Feedback email notifications |
| TTS | Google Cloud TTS API | Neural2/Wavenet voices, proxied through CF function |
| Analytics | Amplitude | 44 tracked events, consent-gated, production-only |
| Icons | lucide-react | Via design system re-exports |
| SEO | react-helmet-async | OG tags, structured data, canonical URLs |
| Component docs | Storybook 10 | Design system documentation |
| Testing | Vitest 4 + Playwright | 126 unit tests + 25 E2E tests |
| External DS | @leo-designs/components | GitHub-hosted package: Button, InputField, SelectField, Dialog, Icon |

---

## Architecture

```
Browser (SPA)
  |
  |-- React Router (client-side routing)
  |-- Static TS data (questions, topic content -- compiled into bundle)
  |-- localStorage (theme, TTS settings, test scores, analytics consent)
  |
  |--> Cloudflare Pages Functions (serverless)
  |      |-- POST /api/feedback --> D1 database + Resend email
  |      |-- POST /api/tts     --> Google Cloud TTS API proxy
  |
  |--> Amplitude (analytics, production domains only)
  |--> Cloudflare Web Analytics (beacon)
```

Key architectural decisions:
- **Questions and topic content are static TypeScript files** compiled into the bundle. They are NOT fetched from an API at runtime.
- **D1 is only used for the feedback system.** The question data pipeline goes: Google Sheets --> sync script --> static TS files.
- **No server-side rendering.** This is a pure client-side SPA.
- **No authentication.** All user state is client-side localStorage.

---

## Directory Structure

```
/
├── functions/                  # Cloudflare Pages Functions (serverless API)
│   └── api/
│       ├── feedback.ts         #   POST /api/feedback
│       └── tts.ts              #   POST /api/tts
│
├── migrations/                 # D1 database migrations
├── scripts/                    # Build & sync scripts
├── public/                     # Static assets (favicons, og-image, robots.txt, sitemap)
│
├── src/
│   ├── App.tsx                 # All routes defined here
│   ├── main.tsx                # Entry point (React root + ThemeProvider)
│   ├── index.css               # Global CSS (Tailwind directives, animations)
│   │
│   ├── components/             # Application-level components
│   │   ├── Layout.tsx          #   Shell: sidebar + header + footer + Outlet
│   │   ├── TestView.tsx        #   Test UI orchestrator (uses hooks for logic)
│   │   ├── TextToSpeech.tsx    #   TTS UI shell (uses useTTSEngine hook)
│   │   ├── TopicContent.tsx    #   Topic detail content renderer
│   │   ├── LegalPageLayout.tsx #   Shared layout for privacy/terms/accessibility pages
│   │   ├── Test/               #   Test sub-components (QuestionCard, Results, Review, etc.)
│   │   ├── Topic/              #   Topic page sub-components
│   │   └── TTS/                #   Text-to-speech sub-components
│   │
│   ├── config/                 # Site and domain configuration (includes DomainPageConfig)
│   ├── contexts/               # React contexts
│   │   ├── ThemeContext.tsx     #   Light/dark theme
│   │   └── ScrollContainerContext.tsx  # Shared ref to main scroll container
│   │
│   ├── data/
│   │   ├── topics.ts           #   Domain/Topic type definitions and data
│   │   ├── questions/          #   17 question files (one per topic) + types + barrel
│   │   └── topicContent/       #   Study content for each topic + types + barrel
│   │
│   ├── design-system/          # Internal design system
│   │   ├── components/         #   23 component directories
│   │   ├── hooks/              #   DS hooks (useDarkMode)
│   │   ├── tokens/             #   Design tokens (colors, spacing, typography, etc.)
│   │   ├── stories/            #   Storybook stories
│   │   ├── icons/              #   Icon re-exports from lucide-react
│   │   ├── utils/              #   cn() utility (clsx + tailwind-merge)
│   │   └── index.ts            #   Barrel export for all DS components + tokens + hooks
│   │
│   ├── hooks/                  # Custom React hooks
│   │   ├── useTestQuestions.ts  #   Test question selection, answers, scoring
│   │   ├── useTestNavigation.ts #   Test exit modal, browser back, interceptor
│   │   ├── useTTSEngine.ts     #   TTS audio engine (caching, playback, prefetch)
│   │   └── useTTSSettings.ts   #   TTS voice/speed localStorage persistence
│   │
│   ├── pages/                  # Page-level components (one per route)
│   │   ├── DomainPage.tsx      #   Shared domain page (accepts domainNumber prop)
│   │   └── ...                 #   Other pages
│   │
│   ├── test/                   # Test setup (Vitest config)
│   └── utils/                  # Utilities (analytics, TTS, SEO, test selection)
│
├── e2e/                        # Playwright E2E tests (accessibility, navigation, test flow)
├── .storybook/                 # Storybook configuration
├── docs/                       # Architecture documentation
└── [root .md files]            # Feature-specific documentation (see Related Docs)
```

---

## Design System

The project has an **internal design system** at `src/design-system/` with 23 components documented in Storybook.

### Available DS Components

**Primitives:** Button, IconButton, Link, Badge, Heading, Text, Logo
**Layout:** Section, Container, Grid, Stack
**Navigation:** NavigationItem, NavigationButton, TopicNavigationItem, TopicNavigationList, TableOfContents, SkipLink
**Surfaces:** Card, SelectableCard, RadioCard, Modal
**Feedback:** Toast (ToastContainer, ToastProvider, useToast), Tooltip

### Import Pattern

All design system components are exported from a single barrel:

```tsx
import { Button, Card, Heading, Text, cn } from '@/design-system'
// or
import { Button } from '../design-system'
```

### Rule: Use DS Components for New Code

**All new UI code must use design system components** instead of raw HTML + Tailwind for any element that has a DS equivalent. Specifically:

- Buttons --> `<Button>` or `<IconButton>`, never raw `<button>` with Tailwind
- Links --> `<Link>`, never raw `<a>` with Tailwind
- Cards --> `<Card>`, never raw `<div>` with card-like styling
- Headings --> `<Heading>`, never raw `<h1>`-`<h6>` with Tailwind
- Body text --> `<Text>`, never raw `<p>` with Tailwind typography classes
- Modals --> `<Modal>`, never custom dialog implementations
- Toast notifications --> `useToast()` hook

The existing codebase has not fully migrated yet (see `BUTTON_AUDIT.md` and `LINK_AUDIT.md` for status). When touching existing code, prefer migrating to DS components as part of the change.

### Creating New DS Components

1. Create directory at `src/design-system/components/[ComponentName]/`
2. Use design tokens from `src/design-system/tokens/`
3. Use the `cn()` utility for conditional classes
4. Create a `.stories.tsx` file with multiple variants
5. Export from `src/design-system/index.ts`
6. Test in both light and dark modes
7. Verify accessibility with Storybook's a11y addon

See `src/design-system/README.md` for full documentation.

---

## Styling

### Three-Layer Color System

1. **Base colors** (`tokens/colors/base.ts`) -- Raw palette: gray, blue, green, red, amber, orange, teal
2. **Semantic colors** (`tokens/colors/semantic.ts`) -- Purpose-driven: primary, success, error, warning, info (with light/dark variants)
3. **Component colors** (`tokens/colors/components.ts`) -- Usage-specific: text, background, border (with light/dark variants)

### Dark Mode

- Controlled by `ThemeContext` (toggle stored in localStorage)
- Implemented via Tailwind `class` strategy (`dark:` prefix)
- CSS variables injected dynamically at runtime for theme switching
- All components and pages must support both themes

### Utility

Use the `cn()` utility for conditional and merged Tailwind classes:

```tsx
import { cn } from '@/design-system'
cn('base-class', isActive && 'active-class', className)
```

### References

- `SEMANTIC_COLORS.md` -- Full color system documentation with migration guide
- `TYPOGRAPHY_SYSTEM.md` -- Typography scale (h1-h3, body-1/2, small, button-lg) and usage
- `GRID_SYSTEM.md` -- 12-column grid system documentation

---

## Data Architecture

### Questions (`src/data/questions/`)

- 17 TypeScript files, one per topic (e.g., `1a-theoretical-models.ts`)
- Each exports an array of `Question` objects
- Barrel file (`index.ts`) exports `ALL_QUESTIONS` and `QUESTION_COUNTS`
- **Question interface:** `{ id, topicId, question, options: string[], correctAnswer: number, explanation?, subject? }`
- `correctAnswer` is a 0-based index into the `options` array

### Topic Content (`src/data/topicContent/`)

- Study material for each of the 17 topics
- **DetailedTopicContent interface:** `{ topicId, introduction: string[], learningPointsHeading?, learningPoints?: string[], sections: TopicSection[] }`
- Sections have headings, content (string or string[]), and optional subsections
- Content can include inline HTML for emphasis (`<strong>`)

### Topics & Domains (`src/data/topics.ts`)

Three CPACC exam domains with 17 total topics:
- **Domain 1** (40% exam weight): Topics 1A-1E -- Disabilities, Challenges & AT
- **Domain 2** (40% exam weight): Topics 2A-2F -- Accessibility & Universal Design
- **Domain 3** (20% exam weight): Topics 3A-3F -- Standards, Laws & Management

### Data Pipeline

Questions can be synced from Google Sheets:

```
Google Sheets --> scripts/sync-from-sheets.cjs --> D1 database
                  scripts/generate-questions-from-sql.cjs --> src/data/questions/*.ts
```

But the **runtime data source is always the static TypeScript files** -- the app never fetches questions from D1 or any API.

---

## Routing

All routes are defined in `src/App.tsx`. Routes use SEO-optimized URL paths.

### Primary Routes

| Path | Page | Description |
|---|---|---|
| `/` | WelcomePage | Landing page |
| `/cpacc-practice-test` | MockExamPage | Practice test hub |
| `/disabilities-challenges-assistive-technology` | Domain1Page | Domain 1 overview |
| `/disabilities-challenges-assistive-technology/:topicId` | TopicDetailPage | Domain 1 topic |
| `/accessibility-universal-design` | Domain2Page | Domain 2 overview |
| `/accessibility-universal-design/:topicId` | TopicDetailPage | Domain 2 topic |
| `/standards-laws-management-strategies` | Domain3Page | Domain 3 overview |
| `/standards-laws-management-strategies/:topicId` | TopicDetailPage | Domain 3 topic |
| `/test/topic-quick/:topicId` | TestPage | Topic quick test (10 questions) |
| `/test/domain-quick/:topicId` | TestPage | Domain quick test (10 questions) |
| `/test/:topicId` | TestPage | General test |
| `/privacy` | PrivacyPage | Privacy policy |
| `/terms` | TermsPage | Terms of service |
| `/accessibility` | AccessibilityPage | Accessibility statement |

### Legacy Redirects

Extensive `<Navigate replace>` redirects exist for old URL patterns (e.g., `/domain-1` --> `/disabilities-challenges-assistive-technology`, `/mock-exam` --> `/cpacc-practice-test`, old topic IDs without prefixes). **Do not remove these** -- they preserve SEO and bookmarks.

---

## State Management

React-native only. No external state management library.

| Mechanism | What it manages |
|---|---|
| `ThemeContext` | Light/dark theme (persisted to localStorage) |
| `useState` / `useEffect` | All component-level state |
| `localStorage` | Theme, TTS settings, test scores, analytics consent, user profile, viewed topics |

### Key localStorage Keys

- `theme` -- `'light'` or `'dark'`
- `amplitude-consent` -- Analytics consent flag
- `user_analytics_profile` -- Amplitude user profile JSON
- `ttsVoice`, `ttsPlaybackSpeed` -- TTS preferences
- `ttsQuota` -- Monthly TTS character usage tracking
- `test_score_{topicId}`, `test_date_{topicId}` -- Test history
- `viewed_topics_order` -- Topic viewing history
- `feature_usage_{featureName}` -- First-use tracking

---

## API Endpoints

Both endpoints are Cloudflare Pages Functions in `functions/api/`.

### POST `/api/feedback`
- **Input:** `{ feedbackType: 'suggestion'|'bug'|'content', feedbackText, email?, pageUrl, pageContext? }`
- **Action:** Inserts into D1 `feedback` table, sends email notification via Resend
- **Env vars:** `DB` (D1 binding), `RESEND_API_KEY`

### POST `/api/tts`
- **Input:** Text content to synthesize
- **Action:** Proxies to Google Cloud TTS API, returns MP3 audio
- **Env vars:** `GOOGLE_TTS_API_KEY`

---

## Analytics

- **Provider:** Amplitude (`@amplitude/analytics-browser`)
- **Consent-gated:** Only initialized after user accepts cookie consent
- **Production-only:** Only runs on `cpacc-app-v2.pages.dev` and `cpaccmastery.com`
- **44 tracked events** covering: page views, test performance, scroll depth, TTS usage, study sessions, feedback, errors, theme changes, keyboard navigation
- **Do not add, remove, or modify analytics events** without consulting `AMPLITUDE_ANALYTICS_STRATEGY.md`

Key files:
- `src/utils/analytics.ts` -- Core init, track, identify functions
- `src/utils/analyticsHelpers.ts` -- Event helpers, profiles, sessions
- `src/hooks/usePageTracking.ts` -- Page view + time-on-page hook
- `src/hooks/useTopicAnalytics.ts` -- Topic-specific tracking

---

## Accessibility

This is a study tool for an **accessibility certification**. Accessibility is not optional -- it is a core requirement.

- **Target:** WCAG 2.1 AA compliance
- **Semantic HTML:** Use correct heading hierarchy, landmarks, lists, etc.
- **ARIA:** Use appropriate ARIA attributes where HTML semantics fall short
- **Keyboard navigation:** All interactive elements must be keyboard-accessible with visible focus indicators
- **Focus management:** Manage focus on route changes, modal open/close, dynamic content
- **Skip link:** `<SkipLink>` component at the top of every page
- **Screen readers:** All content and interactive elements must have accessible names
- **Color contrast:** All text meets AA contrast ratios in both light and dark modes
- **Responsive:** The app must work on all viewport sizes

---

## Common Workflows

### Development & Deployment Workflow

When making code changes, **always follow this workflow:**

1. **Start the local dev server** if not already running: `npm run dev` (serves at `localhost:5173`)
2. Make the requested code changes
3. **Wait for the user to review and approve** the changes locally in the browser before committing
4. Only after the user explicitly confirms they are happy: `git add`, `git commit`, and `git push origin main`
5. Pushing to `main` auto-deploys to production via Cloudflare Git integration -- no manual deploy needed

**Never commit or push changes without the user confirming they are satisfied with the result locally.** For small tweaks the user may approve quickly. For larger changes, give the user time to test navigation, dark mode, and responsiveness.

**Exception for non-UI changes:** For changes that have no visual impact (config files, documentation, analytics, data files, etc.), skip the local dev server step. If the user explicitly asks to deploy or push, commit and push directly without requiring a local preview.

```bash
npm run dev              # Start Vite dev server (localhost:5173)
npm run storybook        # Start Storybook (localhost:6006)
npm run lint             # ESLint
npm run build            # TypeScript check + Vite build + sitemap
npm test                 # Unit tests (Vitest, ~1.5s)
npm run test:watch       # Unit tests in watch mode
npm run test:e2e         # E2E tests (Playwright, needs dev server, ~7s)
npm run test:coverage    # Unit tests with coverage report
```

### Deployment Commands

```bash
git push origin main     # Auto-deploys to production
npm run deploy           # Manual fallback: build + deploy directly to Cloudflare (bypasses Git)
npm run deploy:storybook # Build + deploy Storybook
```

Branch strategy: `feature/* --> main`. Push feature branches for preview deployments, merge to `main` for production.

### Syncing Questions from Google Sheets

```bash
npm run sync-questions   # Requires service-account.json
```

This reads from the configured Google Sheet and updates the D1 database. To regenerate the static TS question files, use `scripts/generate-questions-from-sql.cjs`. See `SYNC_GUIDE.md` for details.

### Adding a New Topic

1. Add the topic to `src/data/topics.ts` in the appropriate domain
2. Create a question file at `src/data/questions/{topicId}.ts`
3. Export it from `src/data/questions/index.ts`
4. Create a topic content file at `src/data/topicContent/{topicId}.ts`
5. Export it from `src/data/topicContent/index.ts`
6. The routing is dynamic (`:topicId` param) so no route changes are needed
7. Follow the content structure in `CONTENT_GUIDELINES.md`

### Adding a New Design System Component

1. Create `src/design-system/components/[Name]/[Name].tsx`
2. Use tokens from `src/design-system/tokens/`
3. Use the `cn()` utility for class composition
4. Create `src/design-system/stories/components/[Name].stories.tsx`
5. Export from `src/design-system/index.ts`
6. Test in both light and dark modes in Storybook
7. Verify with Storybook's a11y addon

### Initializing Local D1 Database

```bash
bash scripts/init-local-db.sh
```

### Generating CSS Variables

```bash
npm run generate:css-vars
```

---

## Guardrails -- Do NOT

1. **Do NOT add external state management libraries** (Redux, Zustand, Jotai, etc.). Use React state, context, and localStorage.
2. **Do NOT change the data architecture** from static TypeScript files to runtime API fetches for questions or topic content. The static data approach is intentional.
3. **Do NOT add authentication or user accounts.** The app is intentionally public and anonymous.
4. **Do NOT modify analytics events** without reading `AMPLITUDE_ANALYTICS_STRATEGY.md` first. The 44 events are carefully planned.
5. **Do NOT use raw HTML elements** (button, a, h1-h6, etc.) with Tailwind classes when a design system component exists. See the Design System section above.
6. **Do NOT remove legacy route redirects** from `App.tsx`. They preserve SEO and user bookmarks.
7. **Do NOT hardcode colors.** Always use design tokens or semantic Tailwind classes (`bg-surface-primary`, `text-content-primary`, etc.).
8. **Do NOT skip dark mode support.** Every visual change must work in both light and dark themes.
9. **Do NOT skip accessibility.** Every interactive element needs keyboard access, focus indicators, and screen reader support. This is an accessibility certification study app.
10. **Do NOT add new npm dependencies** without careful consideration. The dependency footprint is intentionally small.
11. **Do NOT commit or push to production** without the user first reviewing changes locally via `npm run dev`. Always ensure the dev server is running and the user has explicitly approved the changes. For large changes, also consider pushing a feature branch to test via a preview deployment URL.

**Exception for non-UI changes:** For changes that have no visual impact (config files, documentation, analytics, data files, etc.), skip the local dev server step. If the user explicitly asks to deploy or push, commit and push directly without requiring a local preview.
12. **Do NOT commit `.dev.vars`, `service-account.json`, or any file containing API keys.**

---

## Environment Variables

### Cloudflare Secrets (set via `wrangler secret put`)

- `RESEND_API_KEY` -- Resend email API key (used by `/api/feedback`)
- `GOOGLE_TTS_API_KEY` -- Google Cloud TTS API key (used by `/api/tts`)

### Local Development

- `.dev.vars` -- Local env vars file (gitignored), mirrors the Cloudflare secrets above

### D1 Databases

- **Production:** `flashcards-app` (ID: `07b80856-0503-4a7c-b95d-e72d6830e039`)

---

## Related Documentation

These files provide deep dives into specific systems. Read the relevant doc before making changes in that area.

| File | Topic |
|---|---|
| `AMPLITUDE_ANALYTICS_STRATEGY.md` | All 44 analytics events with properties and triggers |
| `BUTTON_AUDIT.md` | Audit of 108+ button instances for DS migration |
| `LINK_AUDIT.md` | Audit of 60+ link instances for DS migration |
| `CONTENT_GUIDELINES.md` | Topic content authoring rules and structure |
| `DESIGN_SYSTEM.md` | External Leo Design System (@leo-designs/components) reference |
| `src/design-system/README.md` | Internal design system documentation |
| `SEMANTIC_COLORS.md` | 3-layer color system with migration guide |
| `TYPOGRAPHY_SYSTEM.md` | Typography scale and usage patterns |
| `GRID_SYSTEM.md` | 12-column grid system documentation |
| `FEEDBACK_SETUP.md` | Feedback system setup (D1 + Resend) |

| `SYNC_GUIDE.md` | Google Sheets to D1 question sync workflow |
| `docs/architecture/card-component-patterns.md` | Card component accessibility architecture |
