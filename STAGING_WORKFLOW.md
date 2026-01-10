# 🚀 Staging Environment Workflow Guide

**Last Updated:** January 10, 2026

---

## 📋 Overview

This document explains how to use the staging environment for safe testing before deploying to production.

**Environments:**

- **Production:** `cpacc-app-v2.pages.dev` (real users, analytics enabled)
- **Staging:** `cpacc-app-v2-staging.pages.dev` (testing only, analytics disabled)

**Key Benefits:**

- ✅ Test WIP features without affecting real users
- ✅ Analytics stay clean (no test data in production)
- ✅ Separate databases (safe feedback/data testing)
- ✅ Easy rollback if issues found

---

## 🔄 Daily Development Workflow

### Scenario: Working on a New Feature

```bash
# 1. Create feature branch from main
git checkout main
git pull origin main
git checkout -b feature/your-feature-name

# 2. Make your changes over multiple days
# ... code, commit, code, commit ...

# 3. Deploy to staging for testing
git checkout staging
git merge feature/your-feature-name
git push origin staging

# 4. Deploy staging
npm run deploy:staging

# 5. Test at: https://[deployment-id].cpacc-app-v2-staging.pages.dev
# - Verify functionality works
# - Check console: analytics should be disabled
# - Test feedback submission (goes to staging DB)

# 6. Once validated, merge to production
git checkout main
git merge staging
git push origin main

# 7. Deploy production
npm run deploy

# 8. Clean up feature branch (optional)
git branch -d feature/your-feature-name
git push origin --delete feature/your-feature-name
```

---

## 🎯 Quick Commands Reference

### Deploy Commands

```bash
# Deploy to staging
npm run deploy:staging

# Deploy to production
npm run deploy

# Local development (localhost)
npm run dev
```

### Git Commands

```bash
# Switch to staging branch
git checkout staging

# Switch to main branch
git checkout main

# Update staging from main
git checkout staging
git merge main
git push origin staging
```

### Database Commands

```bash
# Apply migrations to staging database
npx wrangler d1 migrations apply flashcards-app-staging --remote --config=wrangler.staging.toml

# Apply migrations to production database
npx wrangler d1 migrations apply flashcards-app --remote

# Query staging database
npx wrangler d1 execute flashcards-app-staging --remote --command="SELECT * FROM feedback LIMIT 10"

# Query production database
npx wrangler d1 execute flashcards-app --remote --command="SELECT * FROM feedback LIMIT 10"
```

---

## 🗄️ Database Management

### Staging Database

- **Name:** `flashcards-app-staging`
- **ID:** `2c5d2802-f532-4313-bb32-1732fa2b01ef`
- **Purpose:** Safe testing of feedback submissions, migrations, etc.

### Production Database

- **Name:** `flashcards-app`
- **ID:** `07b80856-0503-4a7c-b95d-e72d6830e039`
- **Purpose:** Real user data

### Resetting Staging Database

If you need to clear test data from staging:

```bash
# Drop and recreate feedback table
npx wrangler d1 execute flashcards-app-staging --remote --command="DROP TABLE IF EXISTS feedback"

# Reapply migrations
npx wrangler d1 migrations apply flashcards-app-staging --remote --config=wrangler.staging.toml

# (Optional) Seed with test data
npx wrangler d1 execute flashcards-app-staging --remote --file=./seed-local-db.sql
```

---

## 📊 Analytics Behavior

### Staging

- **URL Pattern:** `*.cpacc-app-v2-staging.pages.dev`
- **Analytics:** ❌ Disabled
- **Console Message:** `[Analytics] Disabled - running on [deployment-id].cpacc-app-v2-staging.pages.dev`
- **Amplitude Requests:** None

### Production

- **URL:** `cpacc-app-v2.pages.dev`
- **Analytics:** ✅ Enabled
- **Console Message:** `[Analytics] Initialized successfully`
- **Amplitude Requests:** Sent after cookie consent

### Localhost

- **URL:** `localhost:5173`
- **Analytics:** ❌ Disabled
- **Console Message:** `[Analytics] Disabled - running on localhost`

---

## 🧪 Testing Checklist

Before merging staging → production:

- [ ] Site loads without errors
- [ ] Navigation works (all links, breadcrumbs)
- [ ] Content displays correctly
- [ ] Tests work (practice tests, quick tests)
- [ ] Feedback form submission works
- [ ] Theme toggle works (light/dark mode)
- [ ] TTS features work (if applicable)
- [ ] Console shows no critical errors
- [ ] Analytics disabled on staging (check console)
- [ ] Mobile responsive (test on different screen sizes)

---

## 🛠️ Troubleshooting

### Issue: Analytics still sending to Amplitude on staging

**Solution:**

1. Check console - should show: `[Analytics] Disabled - running on...`
2. If not, verify deployment has latest code:
   ```bash
   npm run deploy:staging
   ```
3. Hard refresh browser: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)

### Issue: Feedback not saving on staging

**Check D1 binding:**

1. Go to Cloudflare Dashboard → Pages → `cpacc-app-v2-staging`
2. Settings → Functions → Bindings
3. Ensure Preview environment has: `DB` → `flashcards-app-staging`

### Issue: Staging deployment failed

**Debug steps:**

1. Check terminal output for errors
2. Verify build succeeds locally: `npm run build:staging`
3. Check Cloudflare dashboard → Deployments for error logs

### Issue: Database migration failed

**Solution:**

```bash
# Check migration status
npx wrangler d1 migrations list flashcards-app-staging --remote

# Force apply specific migration
npx wrangler d1 execute flashcards-app-staging --remote --file=./migrations/0001_create_feedback_table.sql
```

---

## 📁 File Structure

```
CPACC-app-v2/
├── wrangler.toml              # Production Cloudflare config
├── wrangler.staging.toml      # Staging Cloudflare config
├── package.json               # Deploy scripts (deploy, deploy:staging)
├── src/
│   └── utils/
│       └── analytics.ts       # Analytics with environment detection
├── migrations/
│   └── 0001_create_feedback_table.sql
└── STAGING_WORKFLOW.md        # This file
```

---

## 🌿 Git Branch Strategy

```
main (production)
  ↑
  merge when validated
  ↑
staging (staging environment)
  ↑
  merge for testing
  ↑
feature/* (development branches)
```

**Branch Protection (Recommended):**

- `main` - Require pull request reviews
- `staging` - Allow direct pushes (for quick testing)

---

## 🔐 Security Notes

- Staging and production share the same **Amplitude API key** (analytics disabled by domain check)
- Each environment has **separate D1 databases**
- No production secrets needed in staging
- Staging deployments are publicly accessible (use for non-sensitive testing only)

---

## 📈 Deployment URLs

Staging deployments create unique URLs per deployment:

- Format: `https://[deployment-hash].cpacc-app-v2-staging.pages.dev`
- Each `npm run deploy:staging` creates a new URL
- Previous deployments remain accessible
- Can view all deployments in Cloudflare Dashboard

---

## 🚨 Emergency Rollback

If production has critical issues:

### Option 1: Rollback in Cloudflare Dashboard

1. Go to Cloudflare Dashboard → Pages → `cpacc-app-v2`
2. Deployments tab
3. Find last working deployment
4. Click "⋯" → "Rollback to this deployment"

### Option 2: Redeploy previous commit

```bash
git checkout main
git log  # Find last working commit hash
git checkout [commit-hash]
npm run deploy
git checkout main  # Return to main
```

---

## 💡 Best Practices

1. **Always test on staging first** - Never deploy untested code to production
2. **Keep staging in sync** - Regularly merge `main` → `staging` to keep environments similar
3. **Clean commit messages** - Helps identify what to rollback if needed
4. **Test feedback forms** - Staging DB is safe to test with
5. **Check console on both environments** - Verify analytics behavior
6. **Document major changes** - Update this workflow doc when process changes

---

## 📞 Quick Links

- **Production Site:** https://cpacc-app-v2.pages.dev
- **Staging Deployments:** Check Cloudflare Dashboard → Pages → cpacc-app-v2-staging
- **Cloudflare Dashboard:** https://dash.cloudflare.com
- **GitHub Repository:** https://github.com/petras-leonardas/CPACC-app-v2
- **Amplitude Analytics:** https://analytics.amplitude.com

---

## ✅ Setup Complete

Your staging environment is fully configured and ready to use. Follow the daily workflow above for safe, efficient development.

**Questions or issues?** Refer to the Troubleshooting section or check Cloudflare deployment logs.
