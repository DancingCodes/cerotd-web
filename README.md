# Cerotd Web

提供两种打包模式，后台 API 地址已配置为 `https://cerotdadmin.dancingcodes.cn`：

| 命令 | 部署产物 | 内容更新 |
| --- | --- | --- |
| `npm run build:api` | 运行 `node .output/server/index.mjs`，需要 Node 服务 | 服务端在访问页面时从后台 API 获取最新产品和新闻 |
| `npm run build:static` | 发布 `.output/public/` 中的文件 | 构建时读取后台 API；内容修改后需重新生成并发布 |

两个命令都使用 `.output`，切换模式时请重新构建。直连接口版通过 Dockerfile 构建，容器内由 Node 常驻运行，监听 8080 端口；Nginx 将网站请求代理到该服务。静态版只需发布 `.output/public/`，不使用 Docker。静态版的联系表单直接提交到后台公网 API。后台的 `NUXT_PORTAL_ORIGIN` 应设置为 `https://cerotd.dancingcodes.cn`。产品图片使用腾讯云 COS 的 `cerotd/` 目录。
