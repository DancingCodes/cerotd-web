# Cerotd 门户部署记录

## 已确认方案

- 门户 `cerotd-web` 使用 Nuxt 静态生成，动态产品与新闻内容在构建时从 admin 接口读取并生成 HTML、页面数据和详情页。
- 后台 `cerotd-admin` 独立部署在国内服务器，使用云 MySQL 保存产品、新闻、分类和询盘。
- 门户域名为 `https://dcodes.top`；当前仍绑定在 Cloudflare，上传 COS 不会改变现有域名解析。
- 产品图片使用现有腾讯云 COS 桶 `dancingcodes-1303900201`，对象统一放在 `cerotd/` 前缀，公开图片域名为 `cdn.dancingcodes.cn`。
- 门户静态产物也计划上传到同一个 COS 桶根目录；图片前缀 `cerotd/` 保持不动。
- 对象存储桶本身不是网站访问入口。可使用 COS 静态网站托管地址测试；正式域名需要配置 CDN 自定义域名与 HTTPS。CDN 服务区域选全球以覆盖国内外访客。EdgeOne 是可选项，不是必须项。
- 联系表单由门户浏览器直接请求 admin 接口；后台 CORS 来源应配置为 `https://dcodes.top`。

## 本地生成

1. 启动 `cerotd-admin`，默认监听 `http://127.0.0.1:3001`。
2. 在 `cerotd-web` 运行 `npm run generate`。构建时从后台接口读取已发布产品和新闻，并生成静态列表和详情页。
3. 产物位于 `cerotd-web/.output/public/`。已验证包含 8 个产品详情页，产品图片引用 COS 的 `cerotd/` 地址。

## 上传内容

把 `.output/public/` **里面的所有文件和目录**上传到 COS 桶根目录，不要额外套一层 `public/`。门户文件会包含 `index.html`、`_nuxt/`、`products/`、`news/`、`images/` 等。保留已有 COS `cerotd/` 图片目录。

单独打开 COS 对象的 `index.html` 链接只能验证文件；要浏览网站，需要开启 COS 静态网站托管或通过配置好的 CDN 域名访问。

## 发布前待办

- 配置 `NUXT_PUBLIC_ADMIN_API_ORIGIN` 为 admin 的公网 HTTPS 地址，重新生成产物。当前默认值 `http://127.0.0.1:3001` 仅适合本机；将其发布会导致联系表单失效。
- 确认 `cerotd-admin` 生产环境 `NUXT_PORTAL_ORIGIN=https://dcodes.top`，并验证联系表单的 OPTIONS 预检及真实提交。
- 生成并检查 `sitemap.xml`、`robots.txt`；目前静态产物中尚未找到这两个文件。
- 配置 COS 静态网站托管/CDN、`dcodes.top` 自定义域名解析、HTTPS 和全球服务区域。当前 `dcodes.top` 仍在 Cloudflare 上；切换前需明确 DNS/CDN 的最终接入方式。
- 检查 CDN 对 `/products/<slug>/` 等目录路径能返回对应的 `index.html`，验证首页、产品详情、图片和联系表单。
- 首次建议手动上传并验收。admin 中的“更新网站”按钮尚未接通自动生成、上传和刷新 CDN 的发布流程。
- 后台更新内容后，需重新生成并发布整份静态产物，线上内容才会更新。

## 今日数据迁移

- 线上 12 个产品分类和 8 个已发布产品已通过 admin API 写入云 MySQL。
- 22 张产品图片已迁移到腾讯云 COS `cerotd/` 前缀；产品图片地址已改为 `cdn.dancingcodes.cn/cerotd/...`。
- 产品图片静态生成后已核验不再引用旧站图片地址。新闻及新闻分类线上为空。
- 未部署门户或后台。
