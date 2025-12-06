#!/bin/bash

# Initialize local D1 database with schema and sample data

echo "🔧 Setting up local D1 database..."

# Create table schema
echo "Creating table schema..."
npx wrangler d1 execute flashcards-app --command "CREATE TABLE IF NOT EXISTS cards_v2 (ID INTEGER, domain_category TEXT, domain_category_name TEXT, 'domain_sub-category' TEXT, 'domain_sub-category_name' TEXT, subject TEXT, question TEXT, correct_answer TEXT, false_answer_1 TEXT, false_answer_2 TEXT, false_answer_3 TEXT, rationale TEXT);"

# Insert sample data
echo "Inserting sample data..."
npx wrangler d1 execute flashcards-app --file=seed-local-db.sql

# Verify data
echo "Verifying data..."
npx wrangler d1 execute flashcards-app --command "SELECT COUNT(*) as count FROM cards_v2;"

echo "✅ Local database setup complete!"
