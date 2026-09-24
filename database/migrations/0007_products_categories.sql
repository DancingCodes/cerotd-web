ALTER TABLE categories RENAME TO products_categories;

DROP INDEX IF EXISTS idx_categories_sort;
DROP INDEX IF EXISTS idx_categories_published;

CREATE INDEX idx_products_categories_sort ON products_categories (sort_order, id);
CREATE INDEX idx_products_categories_published ON products_categories (is_published);
