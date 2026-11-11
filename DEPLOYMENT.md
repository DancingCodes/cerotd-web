# Cerotd 门户部署

门户 `cerotd-web` 使用 Nuxt SSR，由 Docker 中的 Node 服务运行，监听 8080 端口。Nginx 将 `https://cerotd.dancingcodes.cn` 代理到 `cerotd-web:8080`。

## 构建与发布

在项目目录运行 `npm run build` 构建 SSR 服务，或使用 Dockerfile 构建镜像。容器启动命令为 `node .output/server/index.mjs`。后台 API 地址配置在 `nuxt.config.ts`，前端 `/api/**` 请求由 Nuxt 代理至后台。

后台发布产品或新闻后，SSR 页面在后续请求中读取最新内容，无需重新生成静态文件。后台生产环境的 `NUXT_PORTAL_ORIGIN` 应为 `https://cerotd.dancingcodes.cn`。

产品图片使用腾讯云 COS 的 `cerotd/` 前缀，公开图片域名为 `cdn.dancingcodes.cn`。
