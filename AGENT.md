# AGENT.md

给 AI 开发者阅读的项目指引。后续规则与约定会持续补充，开发时请优先遵循本文。

## 项目定位

本项目是企业门户网站，核心产品为机械润滑油。

这是面向 Google 的独立站（非平台店铺），用于海外获客与品牌展示；内容与结构需兼顾搜索可见性，但不要做成关键词堆砌站。

目标不是做成普通企业站模板，而是做出有品牌感、有信任感的工业科技门户。页面整体气质要大气、克制、专业，可参考苹果官网等一线品牌站的表现方式：大留白、强层级、精致动效、少而准的信息密度。

## 设计方向

- 视觉大气、干净，强调品牌与产品专业感
- 参考苹果官网的页面节奏：大标题、清晰分区、滚动叙事、重点内容突出
- 避免廉价模板感、信息堆叠、过度花哨装饰
- 面向海外 B2B 客户，传达技术实力、品质稳定性与行业可信度
- 气质定位：高端工业站，不是 SaaS 模板风
- 字体：Inter；色板：深墨海军 + 石墨灰 + 克制金属感，品牌青只作弱强调
- 英文默认时弱化微信 / 备案露出；强调认证、检测、出口供货能力
- 图片统一偏冷工业影调；避免空白占位框

## 技术栈

- 框架：Nuxt
- 语言：TypeScript
- 样式：SCSS

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

首期页面：

- 首页
- 关于
- 产品列表 `/products`
- 产品详情 `/products/[slug]`
- 新闻列表 `/news`
- 新闻详情 `/news/[slug]`
- 服务
- 优势
- 联系

产品列表与详情已接 `/api/products`；分类与产品可通过 `/admin` 管理。

## 品牌与素材

- Logo 已有，位于 `public` 目录
- 主色、字体、产品图等其余品牌资产暂无
- 缺失素材时，使用克制、专业的占位方案，保持大气视觉，不使用廉价装饰图

## 国际化

- 默认语言：英文
- 必须保留中英文切换
- 中文保留完整切换；文案以英文优先，中文同步维护

## 内容策略

- 先使用合理占位内容完成页面结构与视觉
- 真实公司信息、产品参数、联系方式等，后期由人工填写替换

## 动效策略

- 动效要克制、干净，参考苹果官网节奏，避免花哨弹跳
- 滚动显现使用 `@vueuse/motion`（如 `v-motion-slide-visible-once-bottom`）
- 页面切换用轻量 fade/slide

## 模板规范

- 前台页面优先使用语义化 HTML，兼顾 SEO 与可访问性
- 布局骨架可用 `header` / `main` / `footer` / `nav` / `section`
- 每页保留一个主标题 `h1`；区块标题用 `h2`；卡片/子项标题用 `h3`
- 正文用 `p`；列表用 `ul` / `ol` / `li`；可点击操作优先用 `button` 或链接
- 表单用 `form` / `label` / `input` / `textarea` / `select` / `button`
- 视觉仍由 class 控制；不要依赖标签默认样式
- 后台 `/admin` 可相对宽松，但仍建议关键交互用 `button`

## 代码风格

- 追求最简洁的代码，不做多余封装和啰嗦写法
- 样式优先写固定值，不使用 `clamp()` 这类复杂表达式
- 能直写就直写，避免为了“更完善”增加理解成本


## 数据与接口

- 数据库：Cloudflare D1
  - binding：`DB`
  - database_name：`cerotd`
  - database_id：`f1c1d1b6-4952-401e-a005-49cad234dfa6`
  - migrations：`database/migrations`
- 本地开发通过 `nitro-cloudflare-dev` + `wrangler.toml` 直连线上 D1/R2（`remote = true`；读写即生产数据）
- 数据库 schema 只维护一份：`database/migrations/0001_schema.sql`（新环境执行一次即可）
- 产品分类接口：`/api/product-categories`（表：`products_categories`；后台 `/admin/product-categories`）
- 产品接口：`/api/products`
- 新闻接口：`/api/news`（公开列表/详情；写接口需 admin token）
- 新闻分类：`/api/news-categories`（前台公开已发布分类；后台可增删改）
- 联系接口：`/api/contact`（公开 POST，写入 D1 `inquiries`）
- 管理后台：`/admin`（登录后管理分类、产品、新闻与留言，支持中英文切换）
- 留言查看：`/admin/inquiries`（读取 D1 `inquiries`）
- 写接口（POST/PUT/DELETE）需要请求头 `Authorization: Bearer <ADMIN_API_TOKEN>`
- `ADMIN_API_TOKEN` 是 Cloudflare Worker Secret（生产环境在控制台配置），本地写在 `.dev.vars`；不要把真实 token 提交进仓库
- 本地可复制 `.dev.vars.example` 为 `.dev.vars`
- 图片存储：Cloudflare R2
  - bucket：`cerotd-media`
  - binding：`MEDIA`
  - 上传接口：`POST /api/upload`（admin token；multipart `file` + 可选 `folder`）
  - 访问路径：`/cdn/<key>`（由 Worker 从 R2 读取）
  - 业务表仍只存最终 URL（如 `cover_url` / `images` / 新闻 HTML 内图片地址）
- 新闻正文使用 TipTap 富文本（HTML）；正文插图支持直接上传到 R2

## 部署与域名

- 部署目标：Cloudflare Workers（不是 Pages）
- Worker 名：`cerotd-web`
- 构建：`npm run build`
- 部署：`npx wrangler deploy`（或 `npm run deploy`）
- 正式域名：
  - `https://moonc.love`（主站）
  - `https://www.moonc.love`（已绑定）
  - 当前不做 www → apex 的 301
- `NUXT_PUBLIC_SITE_URL = "https://moonc.love"`（写在 `wrangler.toml` `[vars]`）
- 对外只走自定义域；保持关闭：
  - `workers_dev = false`
  - `preview_urls = false`
- SEO 基础：`/robots.txt`、`/sitemap.xml`、页面 title/description/canonical；后台 `/admin` 为 noindex
- 后续可做：Google Search Console 验证 + 提交 sitemap；产品结构化数据；R2 图片存储
