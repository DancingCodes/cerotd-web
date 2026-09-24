CREATE TABLE products_categories (
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

CREATE INDEX idx_products_categories_sort ON products_categories (sort_order, id);
CREATE INDEX idx_products_categories_published ON products_categories (is_published);

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
  show_on_home INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (category_id) REFERENCES products_categories(id)
);

CREATE INDEX idx_products_sort ON products (sort_order, id);
CREATE INDEX idx_products_published ON products (is_published);
CREATE INDEX idx_products_category ON products (category_id);

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
  is_read INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX idx_inquiries_created ON inquiries (created_at DESC);
CREATE INDEX idx_inquiries_is_read ON inquiries (is_read, created_at DESC);

CREATE TABLE news_categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  name_en TEXT NOT NULL,
  name_zh TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_published INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX idx_news_categories_sort ON news_categories (sort_order, id);
CREATE INDEX idx_news_categories_published ON news_categories (is_published);

CREATE TABLE news (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL DEFAULT 'company',
  title_en TEXT NOT NULL,
  title_zh TEXT NOT NULL,
  summary_en TEXT NOT NULL DEFAULT '',
  summary_zh TEXT NOT NULL DEFAULT '',
  content_en TEXT NOT NULL DEFAULT '',
  content_zh TEXT NOT NULL DEFAULT '',
  cover_url TEXT,
  is_published INTEGER NOT NULL DEFAULT 0,
  published_at TEXT NOT NULL DEFAULT (datetime('now')),
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX idx_news_published_at ON news (is_published, published_at DESC);
CREATE INDEX idx_news_category ON news (category);
CREATE INDEX idx_news_slug ON news (slug);
