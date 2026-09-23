CREATE TABLE products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  category_id INTEGER NOT NULL,
  name_en TEXT NOT NULL,
  name_zh TEXT NOT NULL,
  summary_en TEXT NOT NULL DEFAULT '',
  summary_zh TEXT NOT NULL DEFAULT '',
  description_en TEXT NOT NULL DEFAULT '',
  description_zh TEXT NOT NULL DEFAULT '',
  cover_url TEXT,
  images_json TEXT NOT NULL DEFAULT '[]',
  specs_en_json TEXT NOT NULL DEFAULT '[]',
  specs_zh_json TEXT NOT NULL DEFAULT '[]',
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_published INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE INDEX idx_products_sort ON products (sort_order, id);
CREATE INDEX idx_products_published ON products (is_published);
CREATE INDEX idx_products_category ON products (category_id);
