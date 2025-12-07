const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

// Configuration
const SHEET_ID = '1igjNm_5VhHlBJSwXGApS5BzvFy6f4IGiRyCekFaRfk0';
const SHEET_NAME = 'D1 - Questions & Answers';
const SERVICE_ACCOUNT_PATH = path.join(__dirname, '..', 'service-account.json');

async function syncQuestionsFromSheets() {
  try {
    console.log('🔄 Starting sync from Google Sheets...\n');

    // 1. Authenticate with Google Sheets API
    console.log('🔐 Authenticating with Google Sheets API...');
    const auth = new google.auth.GoogleAuth({
      keyFile: SERVICE_ACCOUNT_PATH,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // 2. Fetch data from Google Sheets
    console.log('📥 Fetching questions from Google Sheets...');
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: `${SHEET_NAME}!A:L`,
    });

    const rows = response.data.values;
    
    if (!rows || rows.length === 0) {
      console.error('❌ No data found in sheet');
      process.exit(1);
    }

    // Skip header row
    const dataRows = rows.slice(1);
    console.log(`✅ Found ${dataRows.length} questions\n`);

    // 3. Generate SQL statements
    console.log('🔨 Generating SQL statements...');
    const sqlStatements = [];

    // Clear existing data
    sqlStatements.push('DELETE FROM cards_v2;');

    // Insert new data
    for (let i = 0; i < dataRows.length; i++) {
      const row = dataRows[i];
      
      // Skip empty rows
      if (!row[0] || row.length < 12) {
        console.log(`⚠️  Skipping row ${i + 2} (empty or incomplete)`);
        continue;
      }

      // Map columns to database fields
      const [
        id,
        domainCategory,
        domainCategoryName,
        domainSubCategory,
        domainSubCategoryName,
        subject,
        question,
        correctAnswer,
        falseAnswer1,
        falseAnswer2,
        falseAnswer3,
        rationale
      ] = row.map(cell => (cell || '').toString().trim());

      // Escape single quotes for SQL
      const escape = (str) => str.replace(/'/g, "''");

      const sql = `INSERT INTO cards_v2 (ID, domain_category, domain_category_name, "domain_sub-category", "domain_sub-category_name", subject, question, correct_answer, false_answer_1, false_answer_2, false_answer_3, rationale) VALUES (${id}, '${escape(domainCategory)}', '${escape(domainCategoryName)}', '${escape(domainSubCategory)}', '${escape(domainSubCategoryName)}', '${escape(subject)}', '${escape(question)}', '${escape(correctAnswer)}', '${escape(falseAnswer1)}', '${escape(falseAnswer2)}', '${escape(falseAnswer3)}', '${escape(rationale)}');`;

      sqlStatements.push(sql);
    }

    console.log(`✅ Generated ${sqlStatements.length - 1} INSERT statements\n`);

    // 4. Write SQL to file
    const sqlFilePath = path.join(__dirname, '..', 'sync-import.sql');
    fs.writeFileSync(sqlFilePath, sqlStatements.join('\n'));
    console.log(`💾 Saved SQL to: sync-import.sql\n`);

    // 5. Execute SQL on D1
    console.log('☁️  Uploading to D1 database...');
    const { exec } = require('child_process');
    const { promisify } = require('util');
    const execAsync = promisify(exec);

    try {
      const { stdout, stderr } = await execAsync(
        'npx wrangler d1 execute flashcards-app --remote --file=sync-import.sql',
        { cwd: path.join(__dirname, '..') }
      );

      if (stderr && !stderr.includes('wrangler')) {
        console.error('⚠️  Warning:', stderr);
      }

      console.log(stdout);
      console.log('✅ Successfully synced to D1!\n');
      console.log(`📊 Summary:`);
      console.log(`   - Fetched: ${dataRows.length} rows from Google Sheets`);
      console.log(`   - Imported: ${sqlStatements.length - 1} questions to D1`);
      console.log(`   - Status: Complete! 🎉\n`);
    } catch (execError) {
      console.error('❌ Error executing SQL on D1:', execError.message);
      console.log('\n💡 Tip: You can manually import by running:');
      console.log('   npx wrangler d1 execute flashcards-app --remote --file=sync-import.sql');
      process.exit(1);
    }

  } catch (error) {
    console.error('❌ Error syncing questions:', error.message);
    
    if (error.message.includes('ENOENT') && error.message.includes('service-account.json')) {
      console.error('\n💡 Make sure service-account.json is in your project root!');
    } else if (error.message.includes('403') || error.message.includes('permission')) {
      console.error('\n💡 Make sure you shared the Google Sheet with:');
      console.error('   sheets-sync@cpacc-questions-sync.iam.gserviceaccount.com');
    }
    
    process.exit(1);
  }
}

// Run the sync
syncQuestionsFromSheets();
