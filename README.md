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

正式门户域名 `cerotd.dancingcodes.cn` 经腾讯云 CDN 加速。后台发布产品或新闻后，在 admin 点击“刷新数据缓存”；Web 发版后点击“刷新资源缓存”。后台预热按每批最多 3 个 URL 排队，等待当前批次的腾讯云任务状态后再提交下一批。腾讯云说明预热先推送到中间层，边缘首次请求仍可能显示 `Miss`，之后同一边缘节点再请求才可能 `Hit`；`Miss` 不一定代表回源到源站。

`dcodes.top` 是 Cloudflare 对比测试域名，DNS 代理到 `1.15.86.112`，服务器 Nginx 将它转发到现有 `cerotd-web:8080` Nuxt 容器。Cloudflare 当前尚未为 HTML 配置缓存规则；测试中首页返回 `CF-Cache-Status: DYNAMIC`。不要把它当作已缓存的 Cloudflare 与腾讯云缓存命中对比。测试记录、命令和优化待办见 [CDN-TESTING.md](CDN-TESTING.md)。正式域名目前仍使用腾讯云 CDN；admin 的缓存刷新逻辑不清理 Cloudflare 缓存。

如需在新会话继续 CDN 排查，先读 [CDN-TESTING.md](CDN-TESTING.md)，再使用测试机重新采样；不要把不同测试机或不同缓存状态的数据直接比较。

产品图片使用腾讯云 COS 的 `cerotd/` 前缀，公开图片域名为 `cdn.dancingcodes.cn`。
