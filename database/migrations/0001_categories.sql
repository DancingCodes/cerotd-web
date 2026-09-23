CREATE TABLE categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  name_en TEXT NOT NULL,
  name_zh TEXT NOT NULL,
  desc_en TEXT NOT NULL DEFAULT '',
  desc_zh TEXT NOT NULL DEFAULT '',
  cover_url TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_published INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX idx_categories_sort ON categories (sort_order, id);
CREATE INDEX idx_categories_published ON categories (is_published);
