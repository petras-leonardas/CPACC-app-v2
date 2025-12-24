# Feedback System Setup Instructions

Your feedback system has been created successfully! Follow these steps to complete the setup:

## ✅ What's Been Done

1. **D1 Database Migration** - Created and applied `feedback` table to your database
2. **API Endpoint** - Created `/functions/api/feedback.ts` to handle submissions
3. **Frontend Component** - Updated `FeedbackModal.tsx` with full submission flow

## 🔧 Setup Steps

### 1. Get Resend API Key

1. Go to [resend.com](https://resend.com) and sign up (free tier: 100 emails/day)
2. Verify your email
3. Add and verify your sending domain, OR use their test domain: `onboarding@resend.dev`
4. Go to **API Keys** section and create a new API key
5. Copy the API key (starts with `re_`)

### 2. Configure Resend API Key in Cloudflare

Run this command to add your Resend API key as a secret:

```bash
npx wrangler secret put RESEND_API_KEY
```

When prompted, paste your Resend API key.

### 3. Update Email Configuration

Edit `/functions/api/feedback.ts` and update these two lines (around line 178-179):

```typescript
from: 'CPACC Mastery <feedback@yourdomain.com>',  // Change to your verified domain
to: ['your-email@example.com'],                    // Change to YOUR email address
```

**Important:**

- For `from`: Use your verified domain OR use `onboarding@resend.dev` for testing
- For `to`: Use YOUR actual email where you want to receive feedback

### 4. Test Locally (Optional)

To test locally with wrangler:

```bash
# Create a .dev.vars file for local development
echo "RESEND_API_KEY=your_resend_api_key_here" > .dev.vars

# Run dev server
npm run dev
```

Then test the feedback form by clicking "Send feedback" button.

### 5. Deploy to Production

```bash
npm run deploy
```

Your feedback system will now be live!

## 📊 Database Schema

The feedback table includes:

- `id` - Auto-incrementing primary key
- `feedback_type` - suggestion | bug | content
- `feedback_text` - The feedback message
- `email` - Optional user email for follow-up
- `page_url` - Full URL where feedback was submitted
- `page_context` - Optional page context (pathname)
- `user_agent` - Browser/device information
- `created_at` - Timestamp
- `status` - new | reviewed | resolved | archived

## 📧 Email Notifications

You'll receive an email for each feedback submission with:

- Feedback type (with emoji: 💡 suggestion, 🐛 bug, 📚 content)
- Full feedback text
- User email (if provided)
- Page URL with clickable link
- Page context
- Browser/device info
- Timestamp

## 🔍 View Feedback Data

To query your feedback database:

```bash
# View all feedback
npx wrangler d1 execute flashcards-app --remote --command "SELECT * FROM feedback ORDER BY created_at DESC LIMIT 10"

# View feedback by type
npx wrangler d1 execute flashcards-app --remote --command "SELECT * FROM feedback WHERE feedback_type='bug' ORDER BY created_at DESC"

# Count feedback by type
npx wrangler d1 execute flashcards-app --remote --command "SELECT feedback_type, COUNT(*) as count FROM feedback GROUP BY feedback_type"
```

## 🚀 Next Steps (Optional)

- Create an admin dashboard to view and manage feedback
- Add email templates with better styling
- Set up automated responses for common feedback types
- Add analytics tracking for feedback submissions
- Create a feedback archive/export feature

## 🐛 Troubleshooting

**Email not sending?**

- Check that `RESEND_API_KEY` is set correctly
- Verify your domain in Resend dashboard
- Check Cloudflare Workers logs: `npx wrangler pages deployment tail`

**Database errors?**

- Verify migration was applied: Run the migration command again
- Check D1 binding is correct in `wrangler.toml`

**API errors?**

- Check browser console for detailed error messages
- View function logs in Cloudflare dashboard

---

Need help? Check the comments in `/functions/api/feedback.ts` for additional details.
