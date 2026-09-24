ALTER TABLE inquiries ADD COLUMN is_read INTEGER NOT NULL DEFAULT 0;

CREATE INDEX idx_inquiries_is_read ON inquiries (is_read, created_at DESC);
