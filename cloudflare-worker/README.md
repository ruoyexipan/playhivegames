# PlayHive Games 图片 CDN 代理

## 功能

- 代理外部图片（tubhai.com, playgama.com, playhop.com）
- 自动缓存到 Cloudflare CDN（7天）
- 支持 WebP 格式转换
- 支持图片压缩（lossy）
- 移动端优化（mirage）

## 部署步骤

### 1. 安装 Wrangler CLI

```bash
npm install -g wrangler
```

### 2. 登录 Cloudflare

```bash
wrangler login
```

### 3. 部署 Worker

```bash
cd cloudflare-worker
wrangler deploy
```

### 4. 配置自定义域名（可选）

在 Cloudflare Dashboard 中：
1. 进入 Workers & Pages
2. 选择 playhive-image-proxy
3. 添加自定义域名：`img.playhivegames.com`

### 5. 更新游戏数据

```bash
cd ..
python3 scripts/update-image-urls.py
```

## 测试

```bash
# 测试代理
curl "https://img.playhivegames.com?url=https://tubhai.com/thumbs/test.jpg"

# 检查缓存头
curl -I "https://img.playhivegames.com?url=https://tubhai.com/thumbs/test.jpg"
```

## 性能预期

| 指标 | 优化前 | 优化后 |
|------|--------|--------|
| 图片加载时间 | 2-3秒 | 0.1-0.3秒 |
| 缓存命中率 | 0% | 95%+ |
| 首屏加载 | 3-5秒 | 1-2秒 |
