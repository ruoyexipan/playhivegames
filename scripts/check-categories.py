#!/usr/bin/env python3
"""
检查分类标签，补充缺失的游戏
"""

import json
import requests
from pathlib import Path
from datetime import datetime

DATA_DIR = Path(__file__).parent.parent / "data"
GAMES_FILE = DATA_DIR / "games.json"

# API 配置
API_URL = "https://tubhai.com/includes/fetch.php"
HEADERS = {
    "Content-Type": "application/x-www-form-urlencoded",
    "Referer": "https://tubhai.com/",
    "Origin": "https://tubhai.com",
    "X-Requested-With": "XMLHttpRequest",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
}

# 分类映射
CATEGORY_MAP = {
    "3D": "3d",
    "Action": "action",
    "Adventure": "adventure",
    "Arcade": "arcade",
    "Archery": "archery",
    "Boys": "boys",
    "Bubble Shooter": "bubble-shooter",
    "Clicker": "clicker",
    "Desktop": "desktop",
    "Driving": "driving",
    "Fighting": "fighting",
    "Girls": "girls",
    "HTML5": "html5",
    "Hypercasual": "hypercasual",
    "Logic": "logic",
    "Multiplayer": "multiplayer",
    "Puzzle": "puzzle",
    "Racing": "racing",
    "Shooting": "shooting",
    "Sports": "sports",
    "Strategy": "strategy",
    "Stunt": "stunt",
}

def load_games():
    """加载游戏数据"""
    if not GAMES_FILE.exists():
        return []
    
    with open(GAMES_FILE, 'r', encoding='utf-8') as f:
        data = json.load(f)
    return data.get("games", [])

def save_games(games, categories):
    """保存游戏数据"""
    data = {
        "last_updated": datetime.now().isoformat(),
        "total_games": len(games),
        "categories": categories,
        "games": games
    }
    
    with open(GAMES_FILE, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

def fetch_games_by_category(category, limit=50):
    """从 API 拉取特定分类的游戏"""
    # tubhai API 不支持按分类筛选，所以我们拉取所有游戏然后过滤
    all_games = []
    offset = 0
    
    while offset < 500:
        data = {
            "amount": 50,
            "offset": offset,
            "sort_by": "new"
        }
        
        try:
            response = requests.post(API_URL, headers=HEADERS, data=data, timeout=30)
            if response.text:
                batch = response.json()
                if not batch:
                    break
                
                for game in batch:
                    categories_raw = game.get("category", "")
                    game_categories = []
                    for cat in categories_raw.split(","):
                        cat = cat.strip()
                        if cat in CATEGORY_MAP:
                            game_categories.append(CATEGORY_MAP[cat])
                        else:
                            game_categories.append(cat.lower().replace(" ", "-"))
                    
                    if category in game_categories:
                        all_games.append(game)
                
                if len(batch) < 50:
                    break
            else:
                break
        except Exception as e:
            print(f"Error fetching: {e}")
            break
        
        offset += 50
    
    return all_games[:limit]

def convert_game(raw_game):
    """转换游戏数据格式"""
    categories_raw = raw_game.get("category", "")
    categories = []
    for cat in categories_raw.split(","):
        cat = cat.strip()
        if cat in CATEGORY_MAP:
            mapped = CATEGORY_MAP[cat]
            if mapped not in categories:
                categories.append(mapped)
        else:
            cat_lower = cat.lower().replace(" ", "-")
            if cat_lower not in categories:
                categories.append(cat_lower)
    
    thumb = raw_game.get("thumb_2", "")
    if thumb and not thumb.startswith("http"):
        thumb = f"https://tubhai.com{thumb}"
    
    return {
        "id": raw_game.get("id"),
        "title": raw_game.get("title", ""),
        "slug": raw_game.get("slug", ""),
        "category": categories,
        "thumbnail": thumb,
        "iframe": raw_game.get("url", ""),
        "description": raw_game.get("description", "")[:500],
        "views": raw_game.get("views", 0),
        "upvote": raw_game.get("upvote", 0),
        "downvote": raw_game.get("downvote", 0),
        "source": "tubhai"
    }

def check_and_fill_categories():
    """检查并补充缺失分类的游戏"""
    print("=" * 60)
    print("分类标签检查脚本")
    print("=" * 60)
    print(f"执行时间: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print()
    
    # 加载现有游戏
    games = load_games()
    print(f"现有游戏数: {len(games)}")
    
    # 统计每个分类的游戏数
    category_counts = {}
    for game in games:
        for cat in game.get("category", []):
            category_counts[cat] = category_counts.get(cat, 0) + 1
    
    print("\n当前分类统计:")
    for cat, count in sorted(category_counts.items(), key=lambda x: x[1], reverse=True):
        status = "✓" if count >= 5 else "⚠️"
        print(f"  {status} {cat}: {count} 个游戏")
    
    # 找出空分类或游戏数少的分类
    empty_categories = []
    low_categories = []
    
    for cat_id in CATEGORY_MAP.values():
        count = category_counts.get(cat_id, 0)
        if count == 0:
            empty_categories.append(cat_id)
        elif count < 5:
            low_categories.append((cat_id, count))
    
    if empty_categories:
        print(f"\n⚠️ 空分类 ({len(empty_categories)}):")
        for cat in empty_categories:
            print(f"  - {cat}")
    
    if low_categories:
        print(f"\n⚠️ 游戏数较少的分类 ({len(low_categories)}):")
        for cat, count in low_categories:
            print(f"  - {cat}: {count} 个游戏")
    
    # 补充缺失分类的游戏
    if empty_categories or low_categories:
        print("\n开始补充缺失分类的游戏...")
        
        categories_to_fill = empty_categories + [cat for cat, _ in low_categories]
        new_games_added = 0
        existing_ids = {g["id"] for g in games}
        
        for category in categories_to_fill:
            print(f"\n拉取 {category} 分类的游戏...")
            raw_games = fetch_games_by_category(category, limit=10)
            
            for raw_game in raw_games:
                game = convert_game(raw_game)
                if game["id"] not in existing_ids:
                    games.append(game)
                    existing_ids.add(game["id"])
                    new_games_added += 1
                    print(f"  新增: {game['title']}")
        
        print(f"\n共新增 {new_games_added} 个游戏")
    
    # 更新分类列表
    categories = [
        {"id": "3d", "name": "3D", "icon": "🎮"},
        {"id": "action", "name": "Action", "icon": "⚔️"},
        {"id": "adventure", "name": "Adventure", "icon": "🧭"},
        {"id": "arcade", "name": "Arcade", "icon": "🕹️"},
        {"id": "archery", "name": "Archery", "icon": "🏹"},
        {"id": "boys", "name": "Boys", "icon": "👦"},
        {"id": "bubble-shooter", "name": "Bubble Shooter", "icon": "🫧"},
        {"id": "clicker", "name": "Clicker", "icon": "👆"},
        {"id": "desktop", "name": "Desktop", "icon": "💻"},
        {"id": "driving", "name": "Driving", "icon": "🏎️"},
        {"id": "fighting", "name": "Fighting", "icon": "🥊"},
        {"id": "girls", "name": "Girls", "icon": "👧"},
        {"id": "html5", "name": "HTML5", "icon": "🌐"},
        {"id": "hypercasual", "name": "Hypercasual", "icon": "🎯"},
        {"id": "logic", "name": "Logic", "icon": "🧠"},
        {"id": "multiplayer", "name": "Multiplayer", "icon": "👥"},
        {"id": "puzzle", "name": "Puzzle", "icon": "🧩"},
        {"id": "racing", "name": "Racing", "icon": "🏁"},
        {"id": "shooting", "name": "Shooting", "icon": "🔫"},
        {"id": "sports", "name": "Sports", "icon": "⚽"},
        {"id": "strategy", "name": "Strategy", "icon": "♟️"},
        {"id": "stunt", "name": "Stunt", "icon": "🤸"},
    ]
    
    # 保存更新后的数据
    save_games(games, categories)
    print(f"\n已保存 {len(games)} 个游戏")
    
    # 最终统计
    print("\n" + "=" * 60)
    print("最终分类统计:")
    category_counts_final = {}
    for game in games:
        for cat in game.get("category", []):
            category_counts_final[cat] = category_counts_final.get(cat, 0) + 1
    
    for cat in categories:
        count = category_counts_final.get(cat["id"], 0)
        status = "✓" if count >= 5 else "⚠️" if count > 0 else "❌"
        print(f"  {status} {cat['name']}: {count}")
    
    print("\n" + "=" * 60)
    print("分类检查完成!")

if __name__ == "__main__":
    check_and_fill_categories()
