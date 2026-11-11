# Cerotd Web

Nuxt SSR 门户，正式域名为 `https://cerotd.dancingcodes.cn`，后台 API 地址为 `https://cerotdadmin.dancingcodes.cn`。

## 构建与部署

运行 `npm run build` 构建 SSR 服务，`npm run start` 可本地启动构建产物。生产环境使用 Dockerfile 构建镜像，容器运行 Node 服务并监听 8080 端口；Nginx 将门户域名代理到 `cerotd-web:8080`。

前端 `/api/**` 请求由 Nuxt 代理到后台。后台发布产品或新闻后，SSR 页面会读取最新内容，无需重新构建 Web。后台 `.env` 中的 `NUXT_PORTAL_ORIGIN` 应设置为 `https://cerotd.dancingcodes.cn`。

## CDN 与资源

门户域名经腾讯云 CDN 加速。后台发布内容或 Web 发版后，在 admin 点击“立即同步数据”：后台刷新 `cerotd.dancingcodes.cn` 全站缓存，完成后提交首页、栏目页、已发布产品/新闻详情页及 GET API 的全球预热。预热提交后不等待预热任务全部完成。

产品图片使用腾讯云 COS 的 `cerotd/` 前缀，公开图片域名为 `cdn.dancingcodes.cn`。
