CREATE TABLE inquiries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  company TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL DEFAULT '',
  phone TEXT NOT NULL DEFAULT '',
  country TEXT NOT NULL DEFAULT '',
  im TEXT NOT NULL DEFAULT '',
  bulk_intent TEXT NOT NULL DEFAULT '',
  product_slug TEXT NOT NULL DEFAULT '',
  message TEXT NOT NULL DEFAULT '',
  locale TEXT NOT NULL DEFAULT 'en',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX idx_inquiries_created ON inquiries (created_at DESC);
