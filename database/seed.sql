DELETE FROM categories;

INSERT INTO categories (slug, name_en, name_zh, desc_en, desc_zh, sort_order, is_published) VALUES
  ('gasoline', 'Gasoline Engine Oil', '汽油机油', 'Lubrication and protection line for gasoline engines.', '面向汽油发动机的润滑保护产品线。', 1, 1),
  ('diesel', 'Diesel Engine Oil', '柴油机油', 'Built for diesel engine load and durability needs.', '服务柴油发动机的重载与耐久需求。', 2, 1),
  ('transmission', 'Transmission Fluid', '变速箱油', 'Focused on smooth shifting and transmission efficiency.', '关注换挡平顺与传动效率的变速系统用油。', 3, 1),
  ('gear', 'Gear Oil', '齿轮油', 'Extreme-pressure lubrication for gearboxes and gear sets.', '适用于齿轮箱与传动齿轮的极压润滑。', 4, 1),
  ('antifreeze', 'Antifreeze', '防冻液', 'Cooling system protection against freeze, boil, and corrosion.', '冷却系统防冻防沸与金属防护方案。', 5, 1),
  ('hydraulic', 'Anti-wear Hydraulic Oil', '抗磨液压油', 'Anti-wear and stable operation for industrial and construction hydraulic systems.', '服务工程机械与工业液压系统的抗磨稳定方案。', 6, 1),
  ('grease', 'Grease', '润滑脂', 'Adhesion and EP protection for bearings and heavy-duty friction points.', '覆盖轴承与重载摩擦点的附着与极压保护。', 7, 1);
