#!/usr/bin/env python3
"""
更新游戏数据中的图片 URL，使用 CDN 代理
"""

import json
from pathlib import Path
from urllib.parse import quote

DATA_DIR = Path(__file__).parent.parent / "data"
GAMES_FILE = DATA_DIR / "games.json"

# CDN 代理地址（部署后替换）
CDN_PROXY = "https://img.playhivegames.com"

def proxy_url(original_url):
    """将原始 URL 转换为代理 URL"""
    if not original_url:
        return original_url
    
    # 已经是代理 URL 的跳过
    if CDN_PROXY in original_url:
        return original_url
    
    # 编码原始 URL
    encoded = quote(original_url, safe='')
    return f"{CDN_PROXY}?url={encoded}"

def main():
    print("=" * 60)
    print("更新图片 URL 为 CDN 代理")
    print("=" * 60)
    
    # 加载游戏数据
    with open(GAMES_FILE, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    games = data.get("games", [])
    print(f"总游戏数: {len(games)}")
    
    # 更新图片 URL
    updated_count = 0
    for game in games:
        original_thumb = game.get("thumbnail", "")
        if original_thumb:
            new_thumb = proxy_url(original_thumb)
            if new_thumb != original_thumb:
                game["thumbnail"] = new_thumb
                updated_count += 1
    
    print(f"更新了 {updated_count} 个图片 URL")
    
    # 保存
    with open(GAMES_FILE, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    
    print(f"已保存到 {GAMES_FILE}")
    
    # 显示示例
    print("\n示例 URL 转换:")
    for game in games[:3]:
        print(f"  {game['title']}:")
        print(f"    {game['thumbnail'][:80]}...")

if __name__ == "__main__":
    main()
