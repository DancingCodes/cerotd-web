DELETE FROM products;
DELETE FROM categories;

INSERT INTO categories (slug, name_en, name_zh, desc_en, desc_zh, sort_order, is_published) VALUES
  ('gasoline', 'Gasoline Engine Oil', '汽油机油', 'Lubrication and protection line for gasoline engines.', '面向汽油发动机的润滑保护产品线。', 1, 1),
  ('diesel', 'Diesel Engine Oil', '柴油机油', 'Built for diesel engine load and durability needs.', '服务柴油发动机的重载与耐久需求。', 2, 1),
  ('transmission', 'Transmission Fluid', '变速箱油', 'Focused on smooth shifting and transmission efficiency.', '关注换挡平顺与传动效率的变速系统用油。', 3, 1),
  ('gear', 'Gear Oil', '齿轮油', 'Extreme-pressure lubrication for gearboxes and gear sets.', '适用于齿轮箱与传动齿轮的极压润滑。', 4, 1),
  ('antifreeze', 'Antifreeze', '防冻液', 'Cooling system protection against freeze, boil, and corrosion.', '冷却系统防冻防沸与金属防护方案。', 5, 1),
  ('hydraulic', 'Anti-wear Hydraulic Oil', '抗磨液压油', 'Anti-wear and stable operation for industrial and construction hydraulic systems.', '服务工程机械与工业液压系统的抗磨稳定方案。', 6, 1),
  ('grease', 'Grease', '润滑脂', 'Adhesion and EP protection for bearings and heavy-duty friction points.', '覆盖轴承与重载摩擦点的附着与极压保护。', 7, 1);

INSERT INTO products (
  slug, category_id, name_en, name_zh, summary_en, summary_zh, description_en, description_zh,
  cover_url, images_json, specs_en_json, specs_zh_json, sort_order, is_published
)
SELECT
  'antifreeze-g11-green',
  id,
  'Antifreeze G-11 Green',
  '防冻液 G-11 绿色',
  'Green ethylene glycol multi-effect engine coolant (antifreeze).',
  '绿色乙二醇多效发动机冷却液（防冻液）。',
  'Ethylene glycol (EG) based. IAT / HOAT corrosion inhibitor technology. Standard bright green, clear and transparent, with no suspended solids or stratification. Suitable for cooling systems of older cast-iron engine cars, light trucks, construction machinery, agricultural machinery, 2-stroke / 4-stroke motor boats and generator sets. Packaging: 1kg / 4kg / 5kg / 9kg / 10kg / 20kg / 200kg.',
  '以乙二醇（EG）为基础，采用IAT/HOAT复合缓蚀技术。标准亮绿色，澄清透明，无悬浮物、无分层。适用于老式铸铁发动机汽车、轻卡、工程机械、农业机械、二冲程/四冲程摩托艇及发电机组冷却系统。包装：1kg / 4kg / 5kg / 9kg / 10kg / 20kg / 200kg。',
  '/images/products/antifreeze-g11-green.webp',
  '["/images/products/antifreeze-g11-green.webp"]',
  '["Type: G-11 Green","Base: Ethylene Glycol","Packaging: 1-200kg"]',
  '["类型：G-11 Green","基础：乙二醇 EG","包装：1-200kg"]',
  1,
  1
FROM categories
WHERE slug = 'antifreeze';
