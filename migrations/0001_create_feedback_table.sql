-- Migration: Create feedback table
-- Created: 2025-12-19

CREATE TABLE IF NOT EXISTS feedback (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  feedback_type TEXT NOT NULL CHECK(feedback_type IN ('suggestion', 'bug', 'content')),
  feedback_text TEXT NOT NULL,
  email TEXT,
  page_url TEXT NOT NULL,
  page_context TEXT,
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status TEXT DEFAULT 'new' CHECK(status IN ('new', 'reviewed', 'resolved', 'archived'))
);

-- Create index for faster queries by status and date
CREATE INDEX IF NOT EXISTS idx_feedback_status ON feedback(status);
CREATE INDEX IF NOT EXISTS idx_feedback_created_at ON feedback(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_feedback_type ON feedback(feedback_type);
