# Cerotd Web

本地先启动 `cerotd-admin`（默认 `http://127.0.0.1:3001`），再运行 `npm run generate`。生成时从后台公开接口读取已发布产品和新闻，生成列表与详情页。静态文件位于 `.output/public/`。

部署时设置 `NUXT_PUBLIC_ADMIN_API_ORIGIN` 为后台的公网域名，供联系表单直接提交；后台的 `NUXT_PORTAL_ORIGIN` 应设为门户域名。产品图片使用腾讯云 COS 的 `cerotd/` 目录。
