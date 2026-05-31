#!/bin/bash
# PlayHive Games 自动更新脚本
# 功能：拉取游戏数据 + 优化关键词 + 检查分类

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
LOG_DIR="$PROJECT_DIR/logs"
LOG_FILE="$LOG_DIR/update-$(date +%Y%m%d-%H%M%S).log"

# 创建日志目录
mkdir -p "$LOG_DIR"

echo "========================================" | tee -a "$LOG_FILE"
echo "PlayHive Games 自动更新" | tee -a "$LOG_FILE"
echo "执行时间: $(date '+%Y-%m-%d %H:%M:%S')" | tee -a "$LOG_FILE"
echo "========================================" | tee -a "$LOG_FILE"

# 1. 拉取游戏数据
echo "" | tee -a "$LOG_FILE"
echo "步骤 1/3: 拉取游戏数据" | tee -a "$LOG_FILE"
echo "----------------------------------------" | tee -a "$LOG_FILE"
python3 "$SCRIPT_DIR/fetch-games.py" 2>&1 | tee -a "$LOG_FILE"

# 2. 优化关键词
echo "" | tee -a "$LOG_FILE"
echo "步骤 2/3: 优化关键词" | tee -a "$LOG_FILE"
echo "----------------------------------------" | tee -a "$LOG_FILE"
python3 "$SCRIPT_DIR/optimize-keywords.py" 2>&1 | tee -a "$LOG_FILE"

# 3. 检查分类
echo "" | tee -a "$LOG_FILE"
echo "步骤 3/3: 检查分类标签" | tee -a "$LOG_FILE"
echo "----------------------------------------" | tee -a "$LOG_FILE"
python3 "$SCRIPT_DIR/check-categories.py" 2>&1 | tee -a "$LOG_FILE"

# 4. 生成 sitemap
echo "" | tee -a "$LOG_FILE"
echo "步骤 4: 生成 Sitemap" | tee -a "$LOG_FILE"
echo "----------------------------------------" | tee -a "$LOG_FILE"
python3 "$SCRIPT_DIR/generate-sitemap.py" 2>&1 | tee -a "$LOG_FILE"

# 5. 构建项目
echo "" | tee -a "$LOG_FILE"
echo "步骤 5: 构建项目" | tee -a "$LOG_FILE"
echo "----------------------------------------" | tee -a "$LOG_FILE"
cd "$PROJECT_DIR"
npm run build 2>&1 | tee -a "$LOG_FILE"

# 6. 部署到 Cloudflare Pages
echo "" | tee -a "$LOG_FILE"
echo "步骤 6: 部署到 Cloudflare Pages" | tee -a "$LOG_FILE"
echo "----------------------------------------" | tee -a "$LOG_FILE"
wrangler pages deploy out --project-name=playhivegames --branch=main 2>&1 | tee -a "$LOG_FILE"

echo "" | tee -a "$LOG_FILE"
echo "========================================" | tee -a "$LOG_FILE"
echo "更新完成!" | tee -a "$LOG_FILE"
echo "完成时间: $(date '+%Y-%m-%d %H:%M:%S')" | tee -a "$LOG_FILE"
echo "日志文件: $LOG_FILE" | tee -a "$LOG_FILE"
echo "========================================" | tee -a "$LOG_FILE"

# 清理旧日志（保留最近7天）
find "$LOG_DIR" -name "update-*.log" -mtime +7 -delete 2>/dev/null || true
