# Google Sheets → D1 Sync Guide

## Quick Start

To sync your questions from Google Sheets to D1:

```bash
npm run sync-questions
```

That's it! 🎉

## What It Does

1. Fetches all questions from your Google Sheet
2. Generates SQL INSERT statements
3. Clears the D1 database
4. Uploads all questions to D1
5. Shows you a summary

## Your Configuration

- **Google Sheet ID:** `1igjNm_5VhHlBJSwXGApS5BzvFy6f4IGiRyCekFaRfk0`
- **Sheet Tab:** `D1 - Questions & Answers`
- **Service Account:** `sheets-sync@cpacc-questions-sync.iam.gserviceaccount.com`

## Workflow

### Sync to Production

1. Edit your questions in Google Sheets
2. Open terminal in your project
3. Run: `npm run sync-questions`
4. Wait 10-30 seconds
5. Your live site has the updated questions!

### Sync to Local Development

After syncing to production, update your local database:

```bash
# Update local database
npx wrangler d1 execute flashcards-app --local --file=sync-import.sql

# If you're running dev server, restart it to pick up changes
# (Kill the current server and run again)
```

This ensures your local development environment matches production.

## Troubleshooting

### Error: "No data found in sheet"

- Check that the sheet tab name is exactly: `D1 - Questions & Answers`
- Make sure your sheet has data starting from row 2 (row 1 is headers)

### Error: "Permission denied" or "403"

- Make sure you shared your Google Sheet with:
  `sheets-sync@cpacc-questions-sync.iam.gserviceaccount.com`
- Give it "Viewer" access

### Error: "service-account.json not found"

- Make sure `service-account.json` is in your project root
- It should be in the same folder as `package.json`

## Column Order (Do Not Change)

Your Google Sheet must have these columns in this order:

| Column | Field Name               |
| ------ | ------------------------ |
| A      | ID                       |
| B      | domain_category          |
| C      | domain_category_name     |
| D      | domain_sub-category      |
| E      | domain_sub-category_name |
| F      | subject                  |
| G      | question                 |
| H      | correct_answer           |
| I      | false_answer_1           |
| J      | false_answer_2           |
| K      | false_answer_3           |
| L      | rationale                |

## Important Notes

⚠️ **The sync script DELETES all existing questions and replaces them with what's in Google Sheets**

✅ This means:

- Google Sheets is your "source of truth"
- D1 is just a copy of your Google Sheet
- You can always re-sync if something goes wrong

🔒 **Security:**

- `service-account.json` is in `.gitignore` - it won't be pushed to GitHub
- Keep this file safe - anyone with it can read your Google Sheet

## Need Help?

If you get errors, check:

1. Is the Google Sheet shared with the service account?
2. Is `service-account.json` in the project root?
3. Is your sheet tab name exactly: `D1 - Questions & Answers`?
4. Do you have internet connection?

---

Last updated: Dec 13, 2025
