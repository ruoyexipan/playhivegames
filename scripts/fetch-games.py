#!/usr/bin/env python3
"""
从 tubhai.com API 拉取游戏数据
支持增量更新和全量拉取
"""

import json
import os
import requests
from datetime import datetime
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor, as_completed

# 配置
API_URL = "https://tubhai.com/includes/fetch.php"
BATCH_SIZE = 50  # 每次拉取数量
MAX_GAMES = 5000  # 最大拉取数量
DATA_DIR = Path(__file__).parent.parent / "data"
GAMES_FILE = DATA_DIR / "games.json"

# 请求头（模拟浏览器）
HEADERS = {
    "Content-Type": "application/x-www-form-urlencoded",
    "Referer": "https://tubhai.com/",
    "Origin": "https://tubhai.com",
    "X-Requested-With": "XMLHttpRequest",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
}

# 分类映射（tubhai -> playhive）
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
    "Car": "driving",
    "Racing": "racing",
    "Runner": "arcade",
    "Simulation": "simulation",
    "Casual": "casual",
    "Board": "board",
    "Card": "card",
    "Educational": "educational",
}

def fetch_games_batch(offset, amount=BATCH_SIZE, sort_by="new"):
    """从 API 拉取一批游戏"""
    data = {
        "amount": amount,
        "offset": offset,
        "sort_by": sort_by
    }
    
    try:
        response = requests.post(API_URL, headers=HEADERS, data=data, timeout=30)
        response.raise_for_status()
        
        if response.text:
            games = response.json()
            return games if isinstance(games, list) else []
        return []
    except Exception as e:
        print(f"Error fetching batch at offset {offset}: {e}")
        return []

def convert_game_data(raw_game):
    """将 API 数据转换为我们的格式"""
    # 处理分类
    categories_raw = raw_game.get("category", "")
    categories = []
    for cat in categories_raw.split(","):
        cat = cat.strip()
        if cat in CATEGORY_MAP:
            mapped = CATEGORY_MAP[cat]
            if mapped not in categories:
                categories.append(mapped)
        else:
            # 尝试小写匹配
            cat_lower = cat.lower().replace(" ", "-")
            if cat_lower not in categories:
                categories.append(cat_lower)
    
    # 处理缩略图
    thumb = raw_game.get("thumb_2", "")
    if thumb and not thumb.startswith("http"):
        thumb = f"https://tubhai.com{thumb}"
    
    # 处理 iframe URL
    iframe_url = raw_game.get("url", "")
    
    # 生成 slug
    slug = raw_game.get("slug", "")
    if not slug:
        slug = raw_game.get("title", "").lower().replace(" ", "-").replace(":", "").replace("'", "")
    
    return {
        "id": raw_game.get("id"),
        "title": raw_game.get("title", ""),
        "slug": slug,
        "category": categories,
        "thumbnail": thumb,
        "iframe": iframe_url,
        "description": raw_game.get("description", "")[:500],
        "instructions": raw_game.get("instructions", ""),
        "views": raw_game.get("views", 0),
        "upvote": raw_game.get("upvote", 0),
        "downvote": raw_game.get("downvote", 0),
        "is_mobile": raw_game.get("is_mobile", True),
        "created_date": raw_game.get("createdDate", ""),
        "source": "tubhai"
    }

def load_existing_games():
    """加载现有游戏数据"""
    if GAMES_FILE.exists():
        with open(GAMES_FILE, 'r', encoding='utf-8') as f:
            data = json.load(f)
            return data.get("games", []), data.get("categories", [])
    return [], []

def check_game_accessible(game, timeout=10):
    """
    检查游戏是否可访问
    返回: (game, is_accessible)
    
    注意：只检查 playgama.com 和 playhop.com 的链接
    其他来源的链接默认保留（因为可能无法通过 HEAD 请求检查）
    """
    iframe_url = game.get("iframe", "")
    if not iframe_url:
        return game, False
    
    # 只检查 playgama.com 和 playhop.com 的链接
    if "playgama.com" not in iframe_url and "playhop.com" not in iframe_url:
        # 其他来源默认保留
        return game, True
    
    try:
        response = requests.get(
            iframe_url, 
            headers=HEADERS, 
            timeout=timeout,
            allow_redirects=True
        )
        
        # 检查状态码
        if response.status_code >= 500:
            return game, False
        
        # 检查页面内容是否包含错误信息
        content = response.text.lower()
        error_indicators = [
            "internal server error",
            "500 internal server error",
            "the server encountered an error",
            "error 500",
            "502 bad gateway",
            "503 service unavailable",
            "504 gateway timeout"
        ]
        
        for indicator in error_indicators:
            if indicator in content:
                return game, False
        
        return game, True
    except requests.exceptions.Timeout:
        return game, False
    except requests.exceptions.RequestException:
        return game, False
    except Exception:
        return game, False

def filter_accessible_games(games, max_workers=20):
    """
    过滤出可访问的游戏
    使用多线程并发检查以提高速度
    """
    print(f"\n检查游戏可访问性 (共 {len(games)} 个)...")
    
    accessible_games = []
    inaccessible_games = []
    
    # 使用线程池并发检查
    with ThreadPoolExecutor(max_workers=max_workers) as executor:
        # 提交所有任务
        future_to_game = {
            executor.submit(check_game_accessible, game): game 
            for game in games
        }
        
        # 处理完成的任务
        completed = 0
        for future in as_completed(future_to_game):
            completed += 1
            if completed % 100 == 0:
                print(f"  已检查 {completed}/{len(games)} 个游戏...")
            
            game, is_accessible = future.result()
            if is_accessible:
                accessible_games.append(game)
            else:
                inaccessible_games.append(game)
    
    # 打印结果
    print(f"\n可访问性检查结果:")
    print(f"  ✓ 可访问: {len(accessible_games)} 个游戏")
    print(f"  ✗ 不可访问: {len(inaccessible_games)} 个游戏")
    
    if inaccessible_games:
        print(f"\n删除的不可访问游戏 (前20个):")
        for game in inaccessible_games[:20]:
            print(f"  - {game['title']}: {game.get('iframe', '')[:60]}...")
        if len(inaccessible_games) > 20:
            print(f"  ... 还有 {len(inaccessible_games) - 20} 个")
    
    return accessible_games

def save_games(games, categories):
    """保存游戏数据"""
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    
    # 按 ID 去重并排序
    seen_ids = set()
    unique_games = []
    for game in games:
        if game["id"] not in seen_ids:
            seen_ids.add(game["id"])
            unique_games.append(game)
    
    # 按 views 排序（热门优先）
    unique_games.sort(key=lambda x: x.get("views", 0), reverse=True)
    
    data = {
        "last_updated": datetime.now().isoformat(),
        "total_games": len(unique_games),
        "categories": categories,
        "games": unique_games
    }
    
    with open(GAMES_FILE, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    
    return unique_games

def fetch_all_games():
    """拉取所有游戏"""
    print("开始拉取游戏数据...")
    
    all_games = []
    offset = 0
    
    while offset < MAX_GAMES:
        print(f"拉取第 {offset} - {offset + BATCH_SIZE} 个游戏...")
        batch = fetch_games_batch(offset)
        
        if not batch:
            print("没有更多游戏数据")
            break
        
        for raw_game in batch:
            game = convert_game_data(raw_game)
            if game["title"] and game["iframe"]:
                all_games.append(game)
        
        offset += BATCH_SIZE
        
        # 如果返回数量少于请求数量，说明已经到底
        if len(batch) < BATCH_SIZE:
            break
    
    print(f"共拉取 {len(all_games)} 个游戏")
    return all_games

def merge_games(existing_games, new_games):
    """合并现有游戏和新游戏"""
    # 以新游戏为主，保留现有游戏的自定义字段
    existing_map = {g["id"]: g for g in existing_games}
    
    merged = []
    for new_game in new_games:
        game_id = new_game["id"]
        if game_id in existing_map:
            # 合并：保留现有游戏的 trending/popular/new 标记
            existing = existing_map[game_id]
            new_game["trending"] = existing.get("trending", False)
            new_game["popular"] = existing.get("popular", False)
            new_game["new"] = existing.get("new", False)
            new_game["section"] = existing.get("section", "")
        merged.append(new_game)
    
    return merged

def remove_playhop_games(games):
    """
    移除所有 playhop.com 来源的游戏（无条件删除）
    """
    print("\n移除 playhop.com 游戏...")
    before = len(games)
    games = [g for g in games if "playhop.com" not in g.get("iframe", "")]
    removed = before - len(games)
    if removed > 0:
        print(f"  已移除 {removed} 个 playhop.com 游戏")
    else:
        print("  没有 playhop.com 游戏")
    return games

def update_categories(games):
    """更新分类列表"""
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
    
    # 统计每个分类的游戏数
    category_counts = {}
    for game in games:
        for cat in game.get("category", []):
            category_counts[cat] = category_counts.get(cat, 0) + 1
    
    # 添加有游戏的分类
    for cat_id, count in category_counts.items():
        if count > 0 and not any(c["id"] == cat_id for c in categories):
            categories.append({
                "id": cat_id,
                "name": cat_id.replace("-", " ").title(),
                "icon": "🎮"
            })
    
    return categories

def main():
    """主函数"""
    print("=" * 60)
    print("PlayHive Games 数据更新脚本")
    print("=" * 60)
    print(f"执行时间: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print()
    
    # 1. 加载现有数据
    existing_games, existing_categories = load_existing_games()
    print(f"现有游戏数: {len(existing_games)}")
    
    # 2. 拉取新数据
    new_games = fetch_all_games()
    
    if not new_games:
        print("警告: 未拉取到任何游戏数据")
        return
    
    # 3. 合并数据
    merged_games = merge_games(existing_games, new_games)
    print(f"合并后游戏数: {len(merged_games)}")
    
    # 4. 移除 playhop.com 游戏（无条件）
    merged_games = remove_playhop_games(merged_games)
    print(f"移除 playhop 后: {len(merged_games)} 个游戏")
    
    # 5. 安全检查：如果新游戏数低于当前游戏数，不执行更新
    current_game_count = len(existing_games)
    new_game_count = len(merged_games)
    
    if new_game_count < current_game_count:
        print("\n" + "=" * 60)
        print("⚠️ 安全检查未通过！")
        print(f"  当前游戏数: {current_game_count}")
        print(f"  新游戏数: {new_game_count}")
        print(f"  差异: {current_game_count - new_game_count} 个游戏")
        print("  本次更新已取消，保留现有数据。")
        print("=" * 60)
        return
    
    print(f"✅ 安全检查通过: {current_game_count} -> {new_game_count}")
    
    # 6. 检查游戏可访问性，删除不可访问的游戏
    merged_games = filter_accessible_games(merged_games)
    print(f"过滤后游戏数: {len(merged_games)}")
    
    # 7. 更新分类
    categories = update_categories(merged_games)
    print(f"分类数: {len(categories)}")
    
    # 8. 保存数据
    saved_games = save_games(merged_games, categories)
    print(f"已保存 {len(saved_games)} 个游戏到 {GAMES_FILE}")
    
    # 9. 统计信息
    print("\n" + "=" * 60)
    print("更新完成统计:")
    print(f"  新增游戏: {len(new_games) - len(existing_games)}")
    print(f"  总游戏数: {len(saved_games)}")
    print(f"  分类数: {len(categories)}")
    
    # 统计链接来源
    playgama_count = len([g for g in saved_games if "playgama.com" in g.get("iframe", "")])
    playhop_count = len([g for g in saved_games if "playhop.com" in g.get("iframe", "")])
    other_count = len(saved_games) - playgama_count - playhop_count
    
    print(f"\n链接来源统计:")
    print(f"  playgama.com: {playgama_count}")
    print(f"  playhop.com: {playhop_count}")
    print(f"  其他: {other_count}")
    
    # 显示分类统计
    print("\n分类统计:")
    for cat in categories:
        count = len([g for g in saved_games if cat["id"] in g.get("category", [])])
        if count > 0:
            print(f"  {cat['name']}: {count}")
    
    print("\n" + "=" * 60)
    print("脚本执行完成!")

if __name__ == "__main__":
    main()
