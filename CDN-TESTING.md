# CDN 对比与优化记录

这份文档记录腾讯云 CDN 与 Cloudflare 的对比测试，供后续排查或新会话继续使用。测试输出是特定时间、特定测试机和特定 CDN 节点的样本，不应外推为所有地区的固定表现。

## 当前架构

- 正式站点：`https://cerotd.dancingcodes.cn/`，经腾讯云 CDN 回源到 `1.15.86.112` 上的 Nginx，再代理至 Docker 容器 `cerotd-web:8080`。
- Cloudflare 测试站点：`https://dcodes.top/`，同样指向 `1.15.86.112`；Nginx 增加了 `dcodes.top` 虚拟主机并代理至 `cerotd-web:8080`。
- Cloudflare SSL/TLS 当前使用“完全”模式。源站当前复用 `dancingcodes.cn` 证书，暂未配置 `dcodes.top` 的 Cloudflare Origin Certificate；不要在未更换源站证书前切换“完整（严格）”。
- Cloudflare HTML 缓存规则尚未配置。最近一次首页测试返回 `CF-Cache-Status: DYNAMIC`，说明 Cloudflare 当时只是代理，没有缓存该 HTML。
- 用户反馈腾讯云节点缓存有效期已改为 10 年；修改范围和当前生效规则应以腾讯云控制台为准。源站是否已设置匹配的 `Cache-Control` 响应头尚未验证。
- 后台缓存按钮调用腾讯云 CDN API，不会清理 Cloudflare 缓存。Cloudflare 仅作测试时影响有限；若将来切为正式流量，需设计 Cloudflare 缓存刷新或避免缓存动态页面。

## 服务器与地域选型记录

- 当前源站地址为 `1.15.86.112`；用户此前报告现有实例规格为 `2C4G6M`（2 核、4 GiB、6 Mbps）。这轮对话没有确认该源站实例的腾讯云地域，不能把测试机地域当作源站地域。
- 已讨论的生产选型建议：网站需要国内用户可访问，海外重点为中亚、南美、东南亚，静态和页面流量主要由 CDN 承接；因此建议源站优先选中国大陆广州、包月或包年固定实例，2 核 4 GiB、5–6 Mbps 起步。该建议不是已购买记录，实际地域和计费方式待用户在腾讯云实例详情确认。
- 出带宽监控样本最高约 `4.508 Mbps`，平均约 `0.172 Mbps`；若对应 5 Mbps 实例，峰值曾短暂接近上限；若对应报告的 6 Mbps 实例，则没有跑满带宽的证据。该样本不足以证明持续带宽瓶颈，建议后续只有在持续贴近上限时再升级，不要仅为 CDN 预热升级。
- 海外测试机包括曼谷一区 `VM-0-14`、新山 `VM-0-11`、硅谷 `VM-0-6`。`VM-0-3` 曾用于 Cloudflare/Tencent/源站三方测试，但当时没有记录实例地域；`CF-Ray` 为 `SIN` 只能说明 Cloudflare 从新加坡站点处理请求，不能据此确认测试机在新加坡。
- 曾用香港 5 Mbps 测试机测试 1 MiB 文件，下载较慢；那是测试机线路/带宽表现，不能直接推导现有源站或广州实例表现。

## 腾讯云预热

腾讯云工程师说明：URL 预热先把资源推送到中间层，不会直接填充所有边缘节点。边缘节点首次请求可能返回 `x-cache-lookup: Cache Miss`，再从中间层获取；同一边缘节点后续请求才可能 `Cache Hit`。因此预热任务显示完成，不等于所有边缘节点首个请求都会显示 Hit，Miss 本身也不证明请求回源到源站。低访问量下各边缘节点请求稀疏，缓存命中率可能较低。

腾讯云建议为静态资源设置明确的源站缓存头，例如 `Cache-Control: public, max-age=31536000`。带哈希文件名的 JS/CSS 适合长缓存；URL 不变但内容可能替换的资源需确保更新流程会刷新对应缓存。源站响应头是否被 CDN 缓存规则采用，仍以控制台配置为准。

DNS 查询返回的是候选地址，CDN 调度可能变化。以每次 `curl` 输出的 `remote_ip` 为这次实际连接地址；IP 地理位置库和拨测平台的城市标注只能作参考，不能单独证明机房物理位置。Cloudflare 使用 Anycast IP，应结合 `CF-Ray` 后缀查看实际处理请求的 Cloudflare 站点代码。

## 已测结果

### Cloudflare 与腾讯云：首页请求

测试机：`VM-0-3-debian`，实际地域尚未记录。两边都请求首页，各测 5 次。

| 路径 | 缓存结果 | TTFB 样本 | 实际连接/节点信息 |
|---|---|---:|---|
| Cloudflare `dcodes.top` | 5 次均 `CF-Cache-Status: DYNAMIC` | 1.202、1.494、1.394、0.479、0.564 秒 | Cloudflare `CF-Ray` 均为 `SIN`；连接 IP 在 `104.21.75.51` 与 `172.67.214.108` 间变化 |
| 腾讯云 `cerotd.dancingcodes.cn` | 前两次 Miss，后三次 Hit | Miss：1.663、2.032 秒；Hit：0.032、0.044、0.036 秒 | 实际连接 `43.174.187.101`、`43.174.62.19` |
| 源站直连 `1.15.86.112` | 绕过 CDN | 0.654、2.084、8.439、1.137、9.151 秒 | 同一源站 IP；总耗时 4.4 至 19.8 秒 |

结论：这组数据**不能说明未缓存的 Cloudflare 比命中缓存的腾讯云快**。腾讯云缓存命中时的 TTFB 明显最低。Cloudflare 当时没有缓存 HTML，实际测的是代理到源站的动态请求；源站直连这组样本波动很大。测试机地域未知，所以不要据此作全球结论。

### 不同地区 DNS / 节点观察

- 曼谷测试机 `VM-0-14` 的腾讯云 `dig` 返回过 `43.174.8.12` 和 `43.174.104.41`；多个 GeoIP 数据库把它们标为东京。一次首页测试两次均 Hit。
- 新山测试机 `VM-0-11` 的 `dig` / `getent` 返回一组被 GeoIP 标为马来西亚的 IP；另一轮 `curl` 实际连接到 `43.174.8.12` 和 `43.168.55.89`（被标为东京）。首页曾出现 Miss 后 Hit。CDN DNS/调度结果会变化，需逐次记录 `remote_ip`，不能只凭一次 `dig` 判定固定落点。
- 硅谷测试机 `VM-0-6` 的 DNS 候选地址被 GeoIP 标为美国不同城市；首页两次分别连接到不同 IP，都是 Miss，因此不是同一节点的重复命中测试。
- Cloudflare 测试中 `CF-Ray` 后缀 `SIN` 表示由新加坡站点处理该请求；Cloudflare 公网 Anycast IP 本身不代表单一城市节点。

## 复测命令

在同一台目标地区服务器上运行，比较 Cloudflare、腾讯云 CDN 和源站直连。源站直连加 `-k` 是因为当前源站证书不覆盖 `dcodes.top`。

```bash
probe() {
  name="$1"
  url="$2"
  shift 2
  for i in 1 2 3 4 5; do
    echo "=== $name 第 $i 次 ==="
    curl --noproxy '*' "$@" -sS -o /dev/null -D - \
      -w '连接IP: %{remote_ip} TTFB: %{time_starttransfer}s 总耗时: %{time_total}s\n' \
      "$url" | grep -Ei 'HTTP/|cf-cache-status:|cf-ray:|x-cache-lookup:|age:|连接IP:'
  done
}

probe Cloudflare https://dcodes.top/
probe 腾讯云CDN https://cerotd.dancingcodes.cn/
probe 源站直连 https://dcodes.top/ --resolve dcodes.top:443:1.15.86.112 -k
```

也对同一个静态资源重复测试，例如 `/images/home/hero-bg.webp`。先确认两个 CDN 的缓存状态相同，再比较暖缓存性能；每个请求记录连接 IP、缓存头、TTFB 和总耗时。对比首页时应区分首个 Miss 与 Hit，不要把腾讯云 Hit 和 Cloudflare DYNAMIC 直接称为同条件缓存比较。

## 后续优化 / 待办

1. 在 Cloudflare 为测试域名单独创建 Cache Rule，先缓存首页 `GET /`，Edge TTL 设为便于测试的时间；避免对 `/api/`、询盘 POST 或后台路径缓存。确认响应变为 `CF-Cache-Status: HIT` 后再与腾讯云暖缓存比较。
2. 分别从曼谷、新山、硅谷及目标市场的其他实际测试机复测；同一地区至少运行 5 次并保留完整输出。DNS 候选 IP 不等于本次连接 IP。
3. 静态资源可测试更长的 `Cache-Control` / CDN TTL；优先长缓存带内容哈希的 `_nuxt` JS/CSS。固定 URL 内容发生变化时，确保后台或发布流程刷新对应 CDN URL。
4. 若考虑正式迁移至 Cloudflare，先解决后台缓存按钮只刷新腾讯云的问题，并验证产品/新闻更新后的 HTML、接口和 sitemap 不会过期展示。生产切换前还需验证中国大陆访问表现。
5. 需要进一步比较源站时，在同一测试机、相近时间使用 `--resolve` 固定源站 IP，并记录网络区域；一次源站直连样本不能代表长期性能。
