# AGENT.md

给 AI 开发者阅读的项目指引。后续规则与约定会持续补充，开发时请优先遵循本文。

## 项目定位

本项目是企业门户网站，核心产品为机械润滑油。

这是面向 Google 的独立站（非平台店铺），用于海外获客与品牌展示；内容与结构需兼顾搜索可见性，但不要做成关键词堆砌站。

目标不是做成普通企业站模板，而是做出有品牌感、有信任感的工业科技门户。页面整体气质要大气、克制、专业，可参考苹果官网等一线品牌站的表现方式：大留白、强层级、精致动效、少而准的信息密度。

## 设计方向

- 视觉大气、干净，强调品牌与产品专业感
- 参考苹果官网的页面节奏：清晰区块、强对比标题、克制动效
- 缺失图片先用空占位，不要塞廉价装饰图
- 不做 `prefers-reduced-motion` 专项适配（已明确不需要）
- 不做 Workers KV，除非后续有明确高频缓存需求

## 技术栈

- 框架：Nuxt 4
- 语言：TypeScript
- 样式：SCSS + `modern-normalize`
- 动效：`@vueuse/motion` + 路由页切换 fade/slide
- 富文本：TipTap（新闻正文）
- 部署：Cloudflare Workers + D1 + R2

## SCSS 规范

写 SCSS 时必须完全嵌套，并且不要使用 `&__` 这类拼接写法，必须写完整类名。

推荐：

```scss
.product-card {
  .product-card-title {
    color: $gray-900;
  }

  .product-card-desc {
    color: $gray-600;
  }
}
```

禁止：

```scss
.product-card {
  &__title {
    color: $gray-900;
  }

  &__desc {
    color: $gray-600;
  }
}
```

## 页面范围

前台：

- 首页 `/`
- 关于 `/about`
- 产品列表 `/products`（支持分类筛选、Show more 分页）
- 产品详情 `/products/[slug]`
- 新闻列表 `/news`（Show more 分页）
- 新闻详情 `/news/[slug]`
- 服务 `/services`（4 步流程：询盘 → 选型 → 生产质检 → 发货）
- 优势 `/advantages`
- 联系 `/contact`

后台 `/admin`：

- 产品分类 `/admin/product-categories`
- 产品 `/admin/products`
- 新闻分类 `/admin/news-categories`
- 新闻 `/admin/news`
- 留言 `/admin/inquiries`

后台列表能力：搜索/筛选、分页、总数、批量删除（留言页暂无批量删除）。状态文案用「未发布 / Unpublished」，不要叫「草稿」。

## 导航与交互

前台导航顺序：

Home → Products → Services → Advantages → About → News → Contact（主按钮 CTA）→ 语言切换

其他：

- 语言切换需本地持久化，刷新后保持
- 全站 `BackToTop`
- 图片统一走 `AppImage`，缺失时给 broken-image 兜底
- 封面/多图后台只支持上传，不提供粘贴 URL 输入

## 品牌与素材

静态资源统一放 `public/images/`：

- `/images/logo.png`（站点 logo + favicon）
- `/images/wechat.png`
- `/images/hero-bg.webp`（仅首页 hero 使用）
- `/images/partners/partner-1.png` … `partner-4.png`

About 介绍视频：

- 存 R2：`cerotd-media/videos/about-intro.mp4`
- 前台访问：`/cdn/videos/about-intro.mp4`
- `about.vue` 用运行时拼接 URL（`useSiteUrl()`），避免 Vite 把 `/cdn/...` 当成模块解析

当前仍用空占位、待补真实图的位置：

- About 工厂轮播（6 张）
- 首页 factory / advantage 媒体区

不要再引用已删除的 `plant.webp` / `tank-farm.webp` / `public/images/factory/`。

## 国际化

- 默认语言：英文
- 必须保留中英文切换，并本地持久化
- 文案以英文优先，中文同步维护
- i18n 文案里如果出现 `@`，必须写成 `{'@'}...`，否则 `@vue/i18n` 会报 linked format 错

## 内容策略

- 先用合理占位完成结构与视觉
- 真实公司信息、产品参数、工厂照片等由运营后续补充
- 不维护 seed/演示数据；schema 不塞默认业务数据

## 动效策略

- 动效克制、干净，避免花哨弹跳
- 滚动显现用 `@vueuse/motion`（如 `v-motion-slide-visible-once-bottom`）
- 页面切换保留轻量路由过渡（fade/slide）

## 模板规范

- 前台优先语义化 HTML，兼顾 SEO 与可访问性
- 布局骨架可用 `header` / `main` / `footer` / `nav` / `section`
- 每页一个主标题 `h1`；区块 `h2`；卡片/子项 `h3`
- 正文 `p`；列表 `ul` / `ol` / `li`；可点击操作用 `button` 或链接
- 表单用 `form` / `label` / `input` / `textarea` / `select` / `button`
- 视觉由 class 控制，不依赖标签默认样式
- 后台可相对宽松，但关键交互仍建议用 `button`

## 代码风格

- 追求最简洁的代码，不做多余封装
- 样式优先固定值，不使用 `clamp()` 这类复杂表达式
- 能直写就直写，避免为了“更完善”增加理解成本
- 改完需要上线时：先 `npm run build`，再 `npm run deploy`（只 deploy 不会带上最新 `pages/` 改动）

## 数据与接口

### D1

- binding：`DB`
- database_name：`cerotd`
- database_id：`f1c1d1b6-4952-401e-a005-49cad234dfa6`
- migrations：`database/migrations`
- schema 只维护一份：`database/migrations/0001_schema.sql`
- 本地通过 `nitro-cloudflare-dev` + `wrangler.toml` 直连线上 D1/R2（`remote = true`；读写即生产数据）
- 不要再维护本地库 / seed.sql / 一堆历史 migration 碎片

当前业务表：

- `products_categories`（无 desc/cover 字段）
- `products`（含 `show_on_home`）
- `news_categories`
- `news`
- `inquiries`（含 `is_read`）

### slug

- 创建时由英文名/英文标题自动生成
- 重复自动加 `-2`、`-3`
- 英文无法生成时回退 `product-{id}` / `news-{id}`
- 编辑时不改 slug

### API

- 产品分类：`/api/product-categories`
- 产品：`/api/products`（公开支持 `?category=`、`?home=1`；后台 `all=1` + 分页/搜索/状态）
- 新闻分类：`/api/news-categories`
- 新闻：`/api/news`
- 联系：`POST /api/contact` → 写 `inquiries`
- 留言管理：`/api/inquiries`
- 上传：`POST /api/upload`（仅图片 jpeg/png/webp/gif/avif，最大 8MB）
- 媒体访问：`/cdn/<key>`

写接口（POST/PUT/DELETE）需要：

`Authorization: Bearer <ADMIN_API_TOKEN>`

### 鉴权与本地密钥

- `ADMIN_API_TOKEN` 是 Cloudflare Worker Secret
- 本地只配 `.dev.vars` 里的 `ADMIN_API_TOKEN`
- 可复制 `.dev.vars.example` → `.dev.vars`
- 不要提交真实 token；不要再加多余的 `NUXT_ADMIN_API_TOKEN` / `NUXT_PUBLIC_SITE_URL` 到 `.dev.vars`

### R2

- bucket：`cerotd-media`
- binding：`MEDIA`
- 图片等业务上传走后台 `/api/upload`，按 folder 存，例如 `products/`、`news/`
- 大视频等超限文件用 `wrangler r2 object put` 手动上传，例如 `videos/about-intro.mp4`
- 业务表只存最终 URL；新闻 HTML 内图片也直接存 R2 URL

## SEO / Analytics

已有：

- `/robots.txt`、`/sitemap.xml`（含新闻详情）
- 页面 title / description / canonical
- 首页 Organization JSON-LD
- 产品详情 Product / Offer JSON-LD
- 产品/新闻详情 BreadcrumbList JSON-LD
- 后台 `/admin` noindex
- Cloudflare Web Analytics（控制台已开；注意 soft navigation 统计口径）

可选后续：

- Search Console 持续监控 sitemap / 收录
- 询盘 Telegram / 邮件通知
- 联系表单防刷 / 限流
- 产品详情跳转联系并预填产品
- www → apex 301（当前明确不做）
- About 工厂真实图片补齐

## 部署与域名

- 部署目标：Cloudflare Workers（不是 Pages）
- Worker 名：`cerotd-web`
- 构建：`npm run build`
- 部署：`npm run deploy`（内部是 `wrangler deploy`）
- 远程迁移：`npm run db:migrate`
- 正式域名：
  - `https://moonc.love`（主站）
  - `https://www.moonc.love`（已绑定）
- `NUXT_PUBLIC_SITE_URL = "https://moonc.love"`（写在 `wrangler.toml` `[vars]`）
- 对外只走自定义域：
  - `workers_dev = false`
  - `preview_urls = false`

## 开发注意

- 本地 admin 读写的是生产 D1/R2，操作前先确认
- Windows 下若 `.output` 被 `nuxt dev` 占用，build 可能失败，先停掉 dev
- 改 `public/`、`pages/`、`nuxt.config.ts` 后必须重新 build 再 deploy
- 用户常要求改完就部署；上线前自检关键路径（logo、cdn、接口）是否 200
