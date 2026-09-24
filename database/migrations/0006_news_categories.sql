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

INSERT INTO news_categories (slug, name_en, name_zh, sort_order, is_published) VALUES
  ('company', 'Company', '公司动态', 1, 1),
  ('product', 'Product', '产品资讯', 2, 1),
  ('industry', 'Industry', '行业观察', 3, 1),
  ('event', 'Events', '展会活动', 4, 1);
