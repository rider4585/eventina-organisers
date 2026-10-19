-- Cloudflare D1 Database Schema for Eventina Organisers
-- Table: enquiries

CREATE TABLE IF NOT EXISTS enquiries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  reference TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  event_type TEXT NOT NULL,
  event_date TEXT NOT NULL,
  city TEXT NOT NULL,
  budget TEXT NOT NULL,
  services TEXT NOT NULL,
  notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_enquiries_reference ON enquiries(reference);
CREATE INDEX IF NOT EXISTS idx_enquiries_created_at ON enquiries(created_at);
CREATE INDEX IF NOT EXISTS idx_enquiries_email ON enquiries(email);
