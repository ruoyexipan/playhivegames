#!/usr/bin/env python3
"""
IndexNow URL 提交脚本
提交网站 URL 到 Bing、Yandex 等搜索引擎
"""

import json
import requests
from pathlib import Path

# IndexNow 配置
API_KEY = "24b6968b72d148148a4b677789a6fccf"
SITE_URL = "https://playhivegames.com"
KEY_LOCATION = f"{SITE_URL}/{API_KEY}.txt"

# IndexNow 提交端点
INDEXNOW_ENDPOINTS = [
    "https://api.indexnow.org/IndexNow",
    "https://www.bing.com/IndexNow",
    "https://yandex.com/indexnow",
]

DATA_DIR = Path(__file__).parent.parent / "data"
GAMES_FILE = DATA_DIR / "games.json"


def submit_urls(urls, batch_size=100):
    """提交 URL 到 IndexNow"""
    total_submitted = 0
    total_errors = 0
    
    for i in range(0, len(urls), batch_size):
        batch = urls[i:i + batch_size]
        
        payload = {
            "host": "playhivegames.com",
            "key": API_KEY,
            "keyLocation": KEY_LOCATION,
            "urlList": batch
        }
        
        for endpoint in INDEXNOW_ENDPOINTS:
            try:
                response = requests.post(
                    endpoint,
                    json=payload,
                    headers={"Content-Type": "application/json"},
                    timeout=30
                )
                
                if response.status_code in [200, 202]:
                    print(f"  ✅ 提交成功 ({endpoint}): {len(batch)} URLs")
                    total_submitted += len(batch)
                else:
                    print(f"  ⚠️ 提交失败 ({endpoint}): {response.status_code}")
                    total_errors += 1
                    
            except Exception as e:
                print(f"  ❌ 错误 ({endpoint}): {e}")
                total_errors += 1
    
    return total_submitted, total_errors


def main():
    print("=" * 60)
    print("IndexNow URL 提交脚本")
    print("=" * 60)
    print(f"API Key: {API_KEY}")
    print(f"站点: {SITE_URL}")
    print()
    
    # 加载游戏数据
    with open(GAMES_FILE, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    games = data.get('games', [])
    print(f"游戏数量: {len(games)}")
    
    # 生成所有 URL
    urls = [
        f"{SITE_URL}/",
        f"{SITE_URL}/about",
        f"{SITE_URL}/contact",
        f"{SITE_URL}/faq",
        f"{SITE_URL}/play-free-games",
        f"{SITE_URL}/privacy",
        f"{SITE_URL}/terms",
    ]
    
    # 添加分类 URL
    categories = ['3d', 'action', 'adventure', 'arcade', 'archery', 'boys', 
                  'bubble-shooter', 'clicker', 'desktop', 'driving', 'fighting',
                  'girls', 'html5', 'hypercasual', 'logic', 'multiplayer', 
                  'puzzle', 'racing', 'shooting', 'sports', 'strategy', 'stunt']
    
    for cat in categories:
        urls.append(f"{SITE_URL}/category/{cat}")
    
    # 添加游戏 URL
    for game in games:
        slug = game.get('slug', '')
        if slug:
            urls.append(f"{SITE_URL}/game/{slug}")
    
    print(f"总 URL 数: {len(urls)}")
    print()
    
    # 提交 URL
    print("开始提交到 IndexNow...")
    submitted, errors = submit_urls(urls)
    
    print()
    print("=" * 60)
    print(f"提交完成: {submitted} 成功, {errors} 失败")
    print("=" * 60)


if __name__ == "__main__":
    main()
