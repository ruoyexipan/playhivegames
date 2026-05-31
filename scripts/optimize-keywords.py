#!/usr/bin/env python3
"""
优化游戏关键词
为每个游戏生成 SEO 优化的关键词
"""

import json
import re
from pathlib import Path
from collections import Counter

DATA_DIR = Path(__file__).parent.parent / "data"
GAMES_FILE = DATA_DIR / "games.json"

# 停用词
STOP_WORDS = {
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
    'of', 'with', 'by', 'from', 'is', 'are', 'was', 'were', 'be', 'been',
    'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would',
    'could', 'should', 'may', 'might', 'shall', 'can', 'this', 'that',
    'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they'
}

# 高价值关键词模板
KEYWORD_TEMPLATES = {
    "play": "play {game} online",
    "free": "play {game} for free",
    "online": "{game} online game",
    "free_online": "play {game} online free",
    "no_download": "play {game} no download",
    "browser": "{game} browser game",
    "html5": "{game} HTML5 game",
    "unblocked": "{game} unblocked",
    "how_to_play": "how to play {game}",
    "tips": "{game} tips and tricks",
    "controls": "{game} controls",
}

# 分类相关关键词
CATEGORY_KEYWORDS = {
    "action": ["action games", "fighting games", "battle games", "combat games"],
    "adventure": ["adventure games", "quest games", "exploration games"],
    "arcade": ["arcade games", "classic games", "retro games"],
    "puzzle": ["puzzle games", "brain games", "logic games", "match 3"],
    "racing": ["racing games", "car games", "driving games", "speed games"],
    "shooting": ["shooting games", "fps games", "gun games", "shooter games"],
    "sports": ["sports games", "ball games", "athletic games"],
    "strategy": ["strategy games", "tower defense", "tactical games"],
    "simulation": ["simulation games", "sim games", "management games"],
    "casual": ["casual games", "simple games", "easy games"],
    "3d": ["3D games", "3D online games", "3D browser games"],
    "multiplayer": ["multiplayer games", "online games", "2 player games"],
    "girls": ["girls games", "dress up games", "makeup games"],
    "boys": ["boys games", "cool games", "exciting games"],
    "clicker": ["clicker games", "idle games", "incremental games"],
    "hypercasual": ["hyper casual games", "quick games", "instant games"],
    "logic": ["logic games", "brain teasers", "puzzle solving"],
    "bubble-shooter": ["bubble shooter games", "bubble pop games"],
    "archery": ["archery games", "bow and arrow games"],
    "driving": ["driving games", "car simulator", "truck games"],
    "fighting": ["fighting games", "boxing games", "martial arts games"],
    "stunt": ["stunt games", "trick games", "extreme games"],
}

def extract_keywords_from_text(text, max_keywords=10):
    """从文本中提取关键词"""
    if not text:
        return []
    
    # 清理文本
    text = re.sub(r'[^\w\s]', ' ', text.lower())
    words = text.split()
    
    # 过滤停用词和短词
    keywords = [w for w in words if w not in STOP_WORDS and len(w) > 2]
    
    # 统计词频
    word_counts = Counter(keywords)
    
    # 返回最常用的词
    return [word for word, count in word_counts.most_common(max_keywords)]

def generate_game_keywords(game):
    """为单个游戏生成关键词"""
    title = game.get("title", "")
    categories = game.get("category", [])
    description = game.get("description", "")
    
    keywords = set()
    
    # 1. 游戏名变体
    title_lower = title.lower()
    keywords.add(title_lower)
    keywords.add(f"play {title_lower}")
    keywords.add(f"{title_lower} online")
    keywords.add(f"{title_lower} game")
    keywords.add(f"{title_lower} free")
    
    # 2. 长尾关键词
    for template in KEYWORD_TEMPLATES.values():
        keyword = template.format(game=title_lower)
        keywords.add(keyword)
    
    # 3. 分类关键词
    for cat in categories:
        if cat in CATEGORY_KEYWORDS:
            keywords.update(CATEGORY_KEYWORDS[cat])
            keywords.add(f"{title_lower} {cat} game")
    
    # 4. 从描述中提取关键词
    desc_keywords = extract_keywords_from_text(description, 5)
    for kw in desc_keywords:
        keywords.add(f"{title_lower} {kw}")
    
    # 5. 竞品平台关键词
    platforms = ["poki", "crazy games", "cool math games", "y8"]
    for platform in platforms:
        keywords.add(f"{platform} {title_lower}")
    
    # 6. 常见搜索变体
    keywords.add(f"{title_lower} unblocked")
    keywords.add(f"{title_lower} no download")
    keywords.add(f"{title_lower} browser game")
    
    # 7. 问题关键词
    keywords.add(f"how to play {title_lower}")
    keywords.add(f"{title_lower} tips")
    keywords.add(f"{title_lower} controls")
    
    # 清理和排序
    keywords = sorted([k.strip() for k in keywords if k.strip()])
    
    return keywords

def generate_seo_tags(game, keywords):
    """生成 SEO 标签"""
    title = game.get("title", "")
    categories = game.get("category", [])
    description = game.get("description", "")
    slug = game.get("slug", "")
    
    primary_category = categories[0] if categories else "game"
    
    # Meta title (30-60 chars)
    meta_title = f"{title} - Play Free Online | PlayHive"
    if len(meta_title) > 60:
        meta_title = f"{title} | PlayHive Games"
    if len(meta_title) > 60:
        meta_title = title[:50] + "..."
    
    # Meta description (120-155 chars)
    if description:
        desc_short = description[:100].rsplit(' ', 1)[0]
        meta_description = f"Play {title} online for free! {desc_short} No download required on PlayHive Games."
    else:
        meta_description = f"Play {title} online for free! Enjoy this {primary_category} game in your browser. No download required."
    
    if len(meta_description) > 155:
        meta_description = f"Play {title} online for free! Enjoy this {primary_category} game in your browser. No download on PlayHive."
    
    if len(meta_description) > 155:
        meta_description = f"Play {title} online for free! No download required on PlayHive Games."
    
    return {
        "game_id": game.get("id"),
        "title": title,
        "slug": slug,
        "meta_title": meta_title,
        "meta_description": meta_description,
        "keywords": keywords[:10],
        "url": f"https://playhivegames.com/game?slug={slug}",
        "canonical": f"https://playhivegames.com/game?slug={slug}",
        "json_ld": {
            "@context": "https://schema.org",
            "@type": "VideoGame",
            "name": title,
            "description": description[:300] if description else f"Play {title} online for free",
            "url": f"https://playhivegames.com/game?slug={slug}",
            "genre": primary_category,
            "gamePlatform": "Web Browser",
            "applicationCategory": "Game",
            "operatingSystem": "Any",
            "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
            }
        }
    }

def main():
    """主函数"""
    print("=" * 60)
    print("游戏关键词优化脚本")
    print("=" * 60)
    
    # 加载游戏数据
    if not GAMES_FILE.exists():
        print(f"错误: 找不到游戏数据文件 {GAMES_FILE}")
        return
    
    with open(GAMES_FILE, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    games = data.get("games", [])
    print(f"加载 {len(games)} 个游戏")
    
    # 为每个游戏生成关键词
    all_keywords = {}
    all_seo_tags = []
    
    for game in games:
        game_id = str(game.get("id"))
        keywords = generate_game_keywords(game)
        seo_tags = generate_seo_tags(game, keywords)
        
        all_keywords[game_id] = {
            "title": game.get("title"),
            "slug": game.get("slug"),
            "categories": game.get("category", []),
            "keywords": keywords,
            "keyword_count": len(keywords)
        }
        
        all_seo_tags.append(seo_tags)
    
    # 保存关键词数据
    keywords_file = DATA_DIR / "game-keywords.json"
    with open(keywords_file, 'w', encoding='utf-8') as f:
        json.dump(all_keywords, f, ensure_ascii=False, indent=2)
    print(f"已保存关键词到 {keywords_file}")
    
    # 保存 SEO 标签
    seo_file = DATA_DIR / "game-seo-tags.json"
    with open(seo_file, 'w', encoding='utf-8') as f:
        json.dump(all_seo_tags, f, ensure_ascii=False, indent=2)
    print(f"已保存 SEO 标签到 {seo_file}")
    
    # 生成 CSV 导出
    csv_file = DATA_DIR / "game-keywords.csv"
    with open(csv_file, 'w', encoding='utf-8') as f:
        f.write("Game ID,Title,Slug,Categories,Keyword Count,Top Keywords\n")
        for game_id, kw_data in all_keywords.items():
            title = kw_data['title'].replace('"', '""')
            slug = kw_data['slug']
            categories = '|'.join(kw_data['categories'])
            count = kw_data['keyword_count']
            top_kw = '|'.join(kw_data['keywords'][:5])
            f.write(f'{game_id},"{title}","{slug}","{categories}",{count},"{top_kw}"\n')
    print(f"已导出 CSV 到 {csv_file}")
    
    # 统计信息
    print("\n" + "=" * 60)
    print("关键词优化统计:")
    print(f"  总游戏数: {len(all_keywords)}")
    
    total_keywords = sum(kw['keyword_count'] for kw in all_keywords.values())
    avg_keywords = total_keywords / len(all_keywords) if all_keywords else 0
    print(f"  总关键词数: {total_keywords}")
    print(f"  每游戏平均关键词: {avg_keywords:.1f}")
    
    # 显示前10个游戏的关键词示例
    print("\n示例（前3个游戏）:")
    for i, (game_id, kw_data) in enumerate(list(all_keywords.items())[:3]):
        print(f"\n  {kw_data['title']}:")
        print(f"    分类: {', '.join(kw_data['categories'])}")
        print(f"    关键词数: {kw_data['keyword_count']}")
        print(f"    示例: {', '.join(kw_data['keywords'][:5])}")
    
    print("\n" + "=" * 60)
    print("关键词优化完成!")

if __name__ == "__main__":
    main()
