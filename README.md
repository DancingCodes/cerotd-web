# Cerotd Web

Nuxt SSR 门户，正式域名为 `https://cerotd.dancingcodes.cn`，后台 API 地址为 `https://cerotdadmin.dancingcodes.cn`。

## 目标市场

重点目标地区为中亚、南美和东南亚。以下按地理区域列出主权国家，不代表当前已覆盖或已有客户。

- 中亚（5 国）：哈萨克斯坦、吉尔吉斯斯坦、塔吉克斯坦、土库曼斯坦、乌兹别克斯坦。
- 南美（12 国）：阿根廷、玻利维亚、巴西、智利、哥伦比亚、厄瓜多尔、圭亚那、巴拉圭、秘鲁、苏里南、乌拉圭、委内瑞拉。
- 东南亚（11 国）：文莱、柬埔寨、印度尼西亚、老挝、马来西亚、缅甸、菲律宾、新加坡、泰国、东帝汶、越南。

## 构建与部署

运行 `npm run build` 构建 SSR 服务，`npm run start` 可本地启动构建产物。生产环境使用 Dockerfile 构建镜像，容器运行 Node 服务并监听 8080 端口；Nginx 将门户域名代理到 `cerotd-web:8080`。

前端 `/api/**` 请求由 Nuxt 代理到后台。后台发布产品或新闻后，SSR 页面会读取最新内容，无需重新构建 Web。后台 `.env` 中的 `NUXT_PORTAL_ORIGIN` 应设置为 `https://cerotd.dancingcodes.cn`。

Web 自行提供 `/robots.txt` 和 `/sitemap.xml`。网站地图包含固定栏目页以及后台已发布的产品、新闻详情页；后台内容更新后需刷新 CDN 中的 `/sitemap.xml` 缓存。

## CDN 与资源

门户域名经腾讯云 CDN 加速。后台发布产品或新闻后，在 admin 点击“刷新数据缓存”，刷新相关页面和接口，并提交页面预热。Web 发版后点击“刷新资源缓存”，清除门户域名的 CDN 缓存，并提交首页及其引用资源的预热。预热提交后不等待任务全部完成。

产品图片使用腾讯云 COS 的 `cerotd/` 前缀，公开图片域名为 `cdn.dancingcodes.cn`。
