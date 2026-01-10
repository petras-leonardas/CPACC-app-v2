# 📊 CPACC Mastery - Amplitude Analytics Strategy

**Last Updated:** January 10, 2026  
**Status:** ✅ Fully Implemented & Ready for Production

---

## 🎯 Overview

This document outlines all analytics tracking implemented in CPACC Mastery. All events and user properties are instrumented and ready to collect data. Use this as a reference when building Amplitude dashboards or analyzing user behavior.

---

## 📋 Table of Contents

1. [User Profile Properties](#user-profile-properties)
2. [Page Tracking Events](#page-tracking-events)
3. [Navigation Events](#navigation-events)
4. [Content Engagement Events](#content-engagement-events)
5. [Test & Learning Events](#test--learning-events)
6. [Feature Interaction Events](#feature-interaction-events)
7. [System & Performance Events](#system--performance-events)
8. [Recommended Dashboards](#recommended-dashboards)
9. [Data Storage](#data-storage)

---

## 👤 User Profile Properties

These properties are automatically tracked in Amplitude's `Identify` API to enable cohort analysis:

| Property               | Type    | Description                                                   |
| ---------------------- | ------- | ------------------------------------------------------------- |
| `totalTestsTaken`      | Number  | Total number of tests completed                               |
| `totalTopicsViewed`    | Number  | Total unique topics viewed                                    |
| `averageScore`         | Number  | Running average of all test scores (0-100)                    |
| `userLevel`            | String  | `beginner` (<60%), `intermediate` (60-80%), `advanced` (>80%) |
| `prefersTTS`           | Boolean | Whether user has used Text-to-Speech feature                  |
| `hasSubmittedFeedback` | Boolean | Whether user has submitted any feedback                       |
| `daysSinceFirstVisit`  | Number  | Days since first app visit                                    |

**Use Cases:**

- Segment users by skill level
- Identify power users (high test count)
- Target TTS users for accessibility features
- Analyze learning progression

---

## 📄 Page Tracking Events

### `Page Viewed`

**Triggered:** On every page load (via `usePageTracking` hook)

**Properties:**

- `page` (string): Page name (e.g., "Home", "Practice Test Hub", topic title)
- `path` (string): URL pathname
- `search` (string): Query parameters
- `utm_source` (string): Traffic source if UTM present
- `utm_medium` (string): Traffic medium if UTM present
- `utm_campaign` (string): Campaign identifier if UTM present
- `$referring_domain` (automatic): Referring website domain

**Dashboard Uses:**

- Daily Active Users (DAU)
- Traffic source analysis
- UTM campaign performance
- Page popularity ranking
- User journey paths

---

### `Page Time Spent`

**Triggered:** On page unmount (minimum 1 second)

**Properties:**

- `page` (string): Page name
- `path` (string): URL pathname
- `durationSeconds` (number): Time spent in seconds
- `durationMinutes` (number): Time spent in minutes (rounded to 1 decimal)

**Dashboard Uses:**

- Average session duration
- Engagement quality by page
- Content effectiveness scoring
- Identify high-value content

---

## 🧭 Navigation Events

### `Domain Card Clicked`

**Location:** Welcome page  
**Properties:** `domain` (1/2/3), `domainTitle`, `location` ("home")

### `Sidebar Navigation Clicked`

**Location:** Sidebar menu  
**Properties:** `destination`, `domainTitle`, `location` ("sidebar")

### `Topic Navigation Clicked`

**Location:** Topic detail pages (prev/next buttons)  
**Properties:** `direction` ("previous"/"next"), `currentTopicId`, `currentTopicTitle`, `targetTopicId`, `targetTopicTitle`, `domainNumber`

### `Topic Back Button Clicked`

**Location:** Topic detail pages  
**Properties:** `topicId`, `topicTitle`, `domainNumber`

### `Logo Clicked`

**Location:** Header  
**Properties:** `destination` ("home"), `location` ("header")

### `Navigation Toggle Clicked`

**Location:** Header hamburger menu  
**Properties:** `action` ("expand"/"collapse"), `location` ("header")

**Dashboard Uses:**

- Navigation pattern analysis
- Feature discovery flow
- User journey mapping
- Drop-off point identification

---

## 📚 Content Engagement Events

### `Content Scroll Depth` ⭐ NEW

**Triggered:** At 25%, 50%, 75%, 90%, 100% scroll milestones

**Properties:**

- `depth` (number): 25, 50, 75, 90, or 100
- `topicId` (string): Topic being viewed
- `topicTitle` (string): Topic title
- `timeToReach` (number): Seconds to reach this depth
- `domainNumber` (number): Domain context

**Dashboard Uses:**

- Content engagement quality
- Average scroll depth by topic
- Drop-off points analysis
- Reading completion rates
- Time-to-engagement metrics

---

### `Content First Viewed` ⭐ NEW

**Triggered:** First time viewing any topic

**Properties:**

- `contentType` (string): "topic"
- `contentId` (string): Topic ID
- `contentTitle` (string): Topic title
- `viewOrder` (number): Sequential order of discovery (1st topic, 2nd topic, etc.)
- `sessionNumber` (number): User's session count

**Dashboard Uses:**

- Content discovery patterns
- Learning path analysis
- Popular entry points
- Topic sequence optimization

---

### `TOC Section Clicked` ⭐ NEW

**Triggered:** When user clicks table of contents link

**Properties:**

- `sectionId` (string): Section anchor ID
- `sectionTitle` (string): Section title
- `topicId` (string): Parent topic ID
- `scrollPosition` (number): Current scroll percentage (0-100)

**Dashboard Uses:**

- Most/least accessed sections
- Navigation preferences
- Content structure optimization
- Skip pattern analysis

---

### `Content Copied` ⭐ NEW

**Triggered:** When user copies text (>10 characters)

**Properties:**

- `topicId` (string): Topic where text was copied
- `textLength` (number): Character count
- `firstWords` (string): First 50 characters of copied text

**Dashboard Uses:**

- Most valuable content identification
- Quotable sections
- Content reuse patterns

---

## 🎓 Test & Learning Events

### `Test Button Clicked`

**Location:** Practice hub  
**Properties:** `testType` ("mock-exam"/"quick-test"/"super-quick-test"), `questionCount` (10/20/80), `location` ("practice-hub")

### `Topic Test Button Clicked`

**Location:** Topic detail pages  
**Properties:** `topicId`, `topicTitle`, `location` ("top-cta"/"mid-cta"/"bottom-cta"), `domainNumber`

**Dashboard Uses:**

- CTA effectiveness by position
- Test format preferences
- Study → Test conversion funnel

---

### `Test Started`

**Properties:** `testType`, `topicId`

### `Test Answer Submitted` (Enhanced)

**Properties:**

- `questionId` (string)
- `isCorrect` (boolean)
- `questionNumber` (number)
- `totalQuestions` (number)
- `topicId` (string)
- `timeToAnswer` (number): Seconds to answer ⭐ NEW
- `answerSpeed` (string): "fast"/"medium"/"slow" ⭐ NEW
- `testType` (string)

**Dashboard Uses:**

- Average score calculation
- Question difficulty analysis
- Time-per-question metrics
- Speed vs accuracy correlation

---

### `Test Answer Changed` ⭐ NEW

**Triggered:** When user changes their selected answer

**Properties:**

- `questionNumber` (number)
- `fromAnswer` (number): Original selection (0-3)
- `toAnswer` (number): New selection (0-3)
- `changeCount` (number): How many times answer changed
- `questionId` (string)
- `topicId` (string)
- `testType` (string)

**Dashboard Uses:**

- Question confidence analysis
- Indecision patterns
- Questions causing most doubt
- Change frequency vs correctness correlation

---

### `Test Session Paused` ⭐ NEW

**Triggered:** When user switches away from test tab

**Properties:**

- `questionNumber` (number)
- `testType` (string)
- `progress` (number): Percentage complete (0-100)
- `pauseReason` (string): "tab_hidden"

### `Test Session Resumed` ⭐ NEW

**Triggered:** When user returns to test tab

**Properties:**

- `questionNumber` (number)
- `testType` (string)

**Dashboard Uses:**

- Test interruption rates
- Session continuity analysis
- Optimal test length determination
- Pause point patterns

---

### `Test Question Skipped`

**Properties:** `skipType` ("defer"/"forfeit"), `questionNumber`, `totalQuestions`

### `Test Exit Clicked`

**Properties:** `questionNumber`, `totalQuestions`, `progress` (%), `testType`

### `Test Exit Confirmed`

**Properties:** `questionNumber`, `totalQuestions`, `progress` (%), `testType`, `reason` ("manual")

**Dashboard Uses:**

- Abandonment rate tracking
- Exit point analysis
- Test difficulty indicators

---

### `Test Finished` (Enhanced)

**Properties:**

- `score` (number): Final score
- `totalQuestions` (number)
- `correctAnswers` (number)
- `percentage` (number): Score percentage (0-100)
- `testType` (string)
- `topicId` (string)
- `timeTaken` (number): Total seconds ⭐ NEW
- `averageTimePerQuestion` (number): Seconds ⭐ NEW

**Dashboard Uses:**

- Completion rate funnels
- Performance distribution
- Test format comparison
- Time efficiency analysis

---

### `Test Repeated` ⭐ NEW

**Triggered:** When user retakes a test they've done before

**Properties:**

- `topicId` (string)
- `daysSinceLastTest` (number)
- `previousScore` (number): Previous score percentage
- `currentScore` (number): New score percentage
- `scoreChange` (number): Difference (positive = improvement)
- `improvementRate` (number): Percentage improvement

**Dashboard Uses:**

- Learning retention curves
- Spaced repetition effectiveness
- Score improvement tracking
- Forgetting curve analysis

---

### `Test Next Question Clicked`

**Properties:** `questionNumber`, `totalQuestions`, `isLastQuestion`

### `Test Restarted`

**Properties:** `previousScore`, `totalQuestions`, `percentage`

### `Test Results Viewed`

**Properties:** `score`, `testType`, `passed` (≥70%)

### `Test Review Question Clicked`

**Properties:** `questionNumber`, `wasCorrect`

---

## 🎯 Feature Interaction Events

### `Feature First Used` ⭐ NEW

**Triggered:** First time user interacts with any feature

**Properties:**

- `feature` (string): Feature name (e.g., "tts", "feedback")
- `daysSinceFirstVisit` (number)
- Additional context properties

**Dashboard Uses:**

- Feature adoption rates
- Time-to-feature-discovery
- Onboarding effectiveness
- Feature usage by user segment

---

### `TTS Play Clicked`

**Location:** Inline or sticky TTS controls  
**Properties:** `location` ("sticky-tts"/"inline-tts"), `wasResume` (boolean)

### `TTS Pause Clicked`, `TTS Stop Clicked`, `TTS Next Clicked`, `TTS Previous Clicked`

**Properties:** `location` ("sticky-tts"/"inline-tts")

### `TTS Speed Changed`

**Properties:** `newSpeed`, `previousSpeed`, `location`

**Dashboard Uses:**

- TTS adoption rate
- Preferred playback speeds
- Usage by location (sticky vs inline)
- Accessibility feature engagement

---

### `Feedback Button Clicked`

**Location:** Header or Sidebar  
**Properties:** `location` ("header"/"sidebar")

### `Feedback Submitted`

**Properties:** `feedbackType` ("suggestion"/"bug"/"content"), `hasEmail` (boolean), `feedbackLength` (number), `pageContext` (URL path)

### `Feedback Submission Success`

**Properties:** `feedbackType`, `pageContext`

### `Feedback Submission Error`

**Properties:** `feedbackType`, `error` (string), `pageContext`

### `Feedback Modal Closed`

**Properties:** `hadContent` (boolean), `feedbackType`, `submissionState`

**Dashboard Uses:**

- Feature request tracking
- Bug report monitoring
- User engagement with feedback
- Content improvement priorities

---

### `Theme Toggled`

**Properties:** `from` ("light"/"dark"), `to` ("light"/"dark"), `location` ("header")

### `External Link Clicked`

**Properties:** `linkText`, `destination`, `location`

### `Footer Link Clicked`

**Properties:** `linkType`, `location`

---

## 🖥️ System & Performance Events

### `Study Session Started` ⭐ NEW

**Triggered:** Automatically on app mount

**Properties:**

- `sessionId` (string): Unique session identifier
- `timestamp` (number): Start time

### `Study Session Ended` ⭐ NEW

**Triggered:** On app unmount (minimum 2 minutes)

**Properties:**

- `sessionId` (string)
- `duration` (number): Minutes
- `topicsViewed` (number): Unique topics in session
- `testsTaken` (number): Tests in session
- `averageScore` (number): If tests were taken

**Dashboard Uses:**

- Study session patterns
- Engagement duration trends
- Content consumption per session
- Learning intensity analysis

---

### `Page Load Performance` ⭐ NEW

**Triggered:** On page load completion

**Properties:**

- `page` (string): Page name
- `loadTime` (number): Total load time (ms)
- `domContentLoaded` (number): DOM ready time (ms)
- `domInteractive` (number): DOM interactive time (ms)
- `connectionType` (string): Network connection type
- `deviceType` (string): "mobile"/"tablet"/"desktop"

**Dashboard Uses:**

- Page performance monitoring
- Device/connection performance comparison
- Performance regression detection
- Technical issue identification

---

### `JavaScript Error` ⭐ NEW

**Triggered:** On any JavaScript error

**Properties:**

- `errorMessage` (string)
- `errorSource` (string): File name
- `errorLine` (number)
- `errorColumn` (number)
- `page` (string): Page where error occurred

### `Unhandled Promise Rejection` ⭐ NEW

**Properties:**

- `errorMessage` (string)
- `page` (string)

**Dashboard Uses:**

- Error rate monitoring
- Quality assurance
- User impact assessment
- Bug prioritization

---

### `Keyboard Navigation Detected` ⭐ NEW

**Triggered:** After 5 keyboard navigation actions

**Properties:**

- `page` (string)
- `likelyKeyboardUser` (boolean): true

**Dashboard Uses:**

- Accessibility user identification
- Keyboard-only user experience
- A11y feature prioritization

---

### `Cookie Consent Given`

**Properties:** `action` ("accept")

---

## 📊 Recommended Dashboards

### 1. Executive Daily Overview

**Purpose:** High-level daily metrics

**Key Charts:**

- Daily Active Users (DAU)
- Traffic Sources (`$referring_domain`, UTM parameters)
- Page Views by Section
- Average Session Duration (`Page Time Spent`)
- Study → Test Conversion Funnel
- Tests Started by Type
- Average Test Score (%)
- Top 5 Topics by Views

---

### 2. Content Effectiveness Dashboard

**Purpose:** Measure content engagement quality

**Key Charts:**

- Average Scroll Depth by Topic (`Content Scroll Depth`)
- Section Engagement Heatmap (`TOC Section Clicked`)
- Content Completion Rates (100% scroll depth)
- Most Copied Content (`Content Copied`)
- Time to Scroll Milestones
- Topic Discovery Order (`Content First Viewed`)

**Key Metrics:**

- Topics with <50% avg scroll = need improvement
- Sections never clicked in TOC = consider removing
- Most copied text = most valuable insights

---

### 3. Learning Intelligence Dashboard

**Purpose:** Understand learning behavior and effectiveness

**Key Charts:**

- Answer Confidence Analysis (`Test Answer Changed`)
- Question Difficulty Heatmap (time + skip rate + change frequency)
- Test Pause Patterns (`Test Session Paused/Resumed`)
- Learning Retention Curves (`Test Repeated`)
- Speed vs Accuracy Correlation
- Score Improvement Over Time

**Key Metrics:**

- Questions with high change count = confusing/ambiguous
- Tests with high pause rate = too long
- Positive score improvement = effective learning

---

### 4. User Segmentation Dashboard

**Purpose:** Understand different user types

**Cohorts to Create:**

- **Active Learners:** 3+ topics in 7 days
- **Test Takers:** Completed 1+ test
- **High Performers:** Avg score >70%
- **Feature Users:** Used TTS or submitted feedback
- **Keyboard Users:** Keyboard navigation detected
- **Beginners/Intermediate/Advanced:** Based on user level

**Analysis:**

- Behavior differences by segment
- Feature adoption by user level
- Conversion rates by cohort

---

### 5. Test Engagement Dashboard

**Purpose:** Deep dive into testing behavior

**Key Charts:**

- Test Starts by Type
- Test Completion Rate Funnel
- Average Score by Test Type
- Question Skip Rate
- Test Abandonment Rate and Exit Points
- Answer Change Frequency
- Time Per Question Distribution

---

### 6. Feature Adoption Dashboard

**Purpose:** Track feature discovery and usage

**Key Charts:**

- Feature First Used Timeline (`Feature First Used`)
- TTS Adoption Rate
- TTS Speed Preferences
- Feedback Submission Rate by Type
- Theme Preference Distribution
- Navigation Method Preferences

---

### 7. Performance & Quality Dashboard

**Purpose:** Monitor technical health

**Key Charts:**

- Page Load Times by Device/Connection
- JavaScript Error Rate
- API Error Rate
- Performance by Page
- Error Types Distribution
- Error Impact (users affected)

---

### 8. Marketing & Acquisition Dashboard

**Purpose:** Track campaign effectiveness

**Key Charts:**

- Traffic by UTM Source/Campaign
- Conversion Rate by Channel
- New vs Returning Users
- Campaign ROI (traffic → tests → scores)
- First Action by Traffic Source
- Retention by Acquisition Channel

---

## 💾 Data Storage

### LocalStorage Keys

Your app stores user data locally for enhanced tracking:

| Key                           | Data Type   | Purpose                                   |
| ----------------------------- | ----------- | ----------------------------------------- |
| `user_analytics_profile`      | JSON Object | User profile (tests, scores, level, etc.) |
| `viewed_topics_order`         | JSON Array  | Topic view history with timestamps        |
| `test_score_{topicId}`        | Number      | Score for specific topic                  |
| `test_date_{topicId}`         | Timestamp   | Date of last test for topic               |
| `feature_usage_{featureName}` | Timestamp   | First usage date for features             |

**Data Retention:** Stored indefinitely in user's browser

**Privacy:** All data is client-side only, never sent to servers except through Amplitude

---

## 🎯 Quick Reference: Event Categories

| Category               | Event Count   | Key Use Cases                          |
| ---------------------- | ------------- | -------------------------------------- |
| **Page Tracking**      | 2             | DAU, traffic sources, session duration |
| **Navigation**         | 6             | User journey, feature discovery        |
| **Content Engagement** | 4             | Scroll depth, TOC usage, copying       |
| **Test Core**          | 12            | Scores, completion rates, performance  |
| **Test Intelligence**  | 3             | Answer changes, pausing, retention     |
| **TTS Features**       | 6             | Adoption, preferences                  |
| **Feedback**           | 5             | User insights, bug reports             |
| **System**             | 6             | Sessions, performance, errors          |
| **Total**              | **44 Events** | Comprehensive behavioral analytics     |

---

## 🚀 Getting Started with Dashboards

### Step 1: Verify Data Collection

1. Open Amplitude → User Lookup
2. Search for your test user
3. Verify events are being tracked

### Step 2: Create Your First Dashboard

Start with the **Executive Daily Overview** (simplest, most valuable)

### Step 3: Set Up Funnels

Priority funnels:

1. Study → Test Conversion
2. Test Completion Rate
3. Traffic Source → Test Start

### Step 4: Build Cohorts

Essential cohorts:

1. Active Learners
2. High Performers
3. Feature Users

---

## 📖 Additional Resources

**Implementation Files:**

- `/src/utils/analytics.ts` - Core Amplitude integration
- `/src/utils/analyticsHelpers.ts` - Advanced tracking utilities
- `/src/hooks/usePageTracking.ts` - Page view tracking hook

**Amplitude Documentation:**

- [Event Segmentation](https://help.amplitude.com/hc/en-us/articles/230426687)
- [Funnel Analysis](https://help.amplitude.com/hc/en-us/articles/231275508)
- [User Cohorts](https://help.amplitude.com/hc/en-us/articles/231881448)

---

## 🔄 Maintenance

**When to Update This Document:**

- Adding new tracking events
- Changing event properties
- Implementing new features with tracking
- After major user feedback

**Last Review:** January 10, 2026  
**Next Review:** After launch + 1 month

---

## ✅ Status: Ready for Production

All events are instrumented and tested. Data collection begins immediately upon deployment. No further code changes needed for analytics functionality.
