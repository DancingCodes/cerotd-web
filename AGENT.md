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
- 面向 B2B 客户，传达技术实力、品质稳定性与行业可信度

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
- 服务
- 优势
- 联系

产品列表现阶段在页面内临时写死，文案在 `i18n/locales/*/products.catalog`；后续改为接口数据。

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
- 尊重 `prefers-reduced-motion`

## 模板规范

- 除 Nuxt 组件（如 `NuxtLink` / `NuxtPage` / `NuxtLayout`）外，页面结构统一使用 `div`
- 不要使用 `section` / `h1` / `p` / `ul` / `li` / `header` / `footer` / `nav` / `button` 等语义标签
- `img` / `input` / `textarea` 等必要功能标签可保留

## 代码风格

- 追求最简洁的代码，不做多余封装和啰嗦写法
- 样式优先写固定值，不使用 `clamp()` 这类复杂表达式
- 能直写就直写，避免为了“更完善”增加理解成本


## 数据与接口

- 数据库：Cloudflare D1（binding 名 `DB`）
- 本地开发通过 `nitro-cloudflare-dev` + `wrangler.toml` 使用本地 D1
- 商品分类接口：`/api/categories`
- 写接口（POST/PUT/DELETE）需要请求头 `Authorization: Bearer <ADMIN_API_TOKEN>`
- 本地可复制 `.dev.vars.example` 为 `.dev.vars`
- 图片先存 URL 字段（如 `cover_url`），对象存储后续再接
- 部署 Cloudflare 时使用 `npm run build:cf`，并在控制台创建 D1 后把 `wrangler.toml` 里的 `database_id` 换成真实 ID
