# Cerotd Web

Nuxt SSR 门户，后台 API 地址为 `https://cerotdadmin.dancingcodes.cn`。运行 `npm run build` 构建 Node 服务，`npm run start` 启动服务；生产环境使用 Docker，容器监听 8080 端口，由 Nginx 代理网站请求。

页面请求由服务端实时读取后台内容，后台发布内容后无需重新构建 web。前端 `/api/**` 请求由 Nuxt 代理到后台。后台的 `NUXT_PORTAL_ORIGIN` 应设置为 `https://cerotd.dancingcodes.cn`。产品图片使用腾讯云 COS 的 `cerotd/` 目录。
