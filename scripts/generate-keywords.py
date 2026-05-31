#!/usr/bin/env python3
"""Generate SEO keywords for all games"""

import json
from collections import Counter

# Common SEO keyword patterns for games
KEYWORD_PATTERNS = {
    "play": "play {game} online",
    "free": "play {game} for free",
    "online": "{game} online game",
    "free_online": "play {game} online free",
    "no_download": "play {game} no download",
    "browser": "{game} browser game",
    "html5": "{game} HTML5 game",
    "unblocked": "{game} unblocked",
    "cool_math": "cool math games {game}",
    "poki": "poki {game}",
    "crazy_games": "crazy games {game}",
    "description": "{game} {category} game",
    "how_to_play": "how to play {game}",
    "tips": "{game} tips and tricks",
    "walkthrough": "{game} walkthrough",
    "controls": "{game} controls",
    "high_score": "{game} high score",
    "strategy": "{game} strategy guide",
    "best": "best {category} games",
    "top": "top {category} games",
    "new": "new {category} games",
    "free_games": "free {category} games online",
    "play_now": "play {category} games now"
}

# Category-specific keywords
CATEGORY_KEYWORDS = {
    "action": ["action games", "fighting games", "battle games", "combat games", "war games"],
    "adventure": ["adventure games", "quest games", "exploration games", "story games"],
    "arcade": ["arcade games", "classic games", "retro games", "coin-op games"],
    "puzzle": ["puzzle games", "brain games", "logic games", "thinking games", "match 3"],
    "racing": ["racing games", "car games", "driving games", "speed games", "kart games"],
    "shooting": ["shooting games", "fps games", "gun games", "sniper games", "shooter games"],
    "sports": ["sports games", "ball games", "athletic games", "competition games"],
    "strategy": ["strategy games", "tower defense", "rts games", "tactical games"],
    "simulation": ["simulation games", "sim games", "management games", "tycoon games"],
    "casual": ["casual games", "simple games", "easy games", "relaxing games"],
    "3d": ["3D games", "3D online games", "3D browser games"],
    "multiplayer": ["multiplayer games", "online games", "2 player games", "pvp games"],
    "girls": ["girls games", "dress up games", "makeup games", "fashion games"],
    "boys": ["boys games", "cool games", "exciting games"],
    "clicker": ["clicker games", "idle games", "incremental games", "clicking games"],
    "hypercasual": ["hyper casual games", "quick games", "instant games"],
    "logic": ["logic games", "brain teasers", "puzzle solving"],
    "desktop": ["desktop games", "pc games", "computer games"],
    "bubble-shooter": ["bubble shooter games", "bubble pop games", "bubble games"],
    "archery": ["archery games", "bow and arrow games", "target games"],
    "running": ["running games", "endless runner", "temple run style games"],
    "board": ["board games", "tabletop games", "classic board games"],
    "card": ["card games", "solitaire", "card matching games"],
    "educational": ["educational games", "learning games", "kids games", "educational fun"]
}

def generate_keywords(game):
    """Generate keywords for a single game"""
    title = game["title"]
    categories = game.get("category", [])
    description = game.get("description", "")
    slug = game.get("slug", "")
    
    keywords = []
    
    # 1. Direct game name variations
    keywords.append(title.lower())
    keywords.append(title)
    keywords.append(f"play {title.lower()}")
    keywords.append(f"{title.lower()} online")
    keywords.append(f"{title.lower()} game")
    
    # 2. Long-tail keywords from patterns
    for pattern_name, pattern in KEYWORD_PATTERNS.items():
        if "{game}" in pattern:
            # Use first category if available
            category = categories[0] if categories else "game"
            keyword = pattern.format(game=title, category=category)
            keywords.append(keyword)
    
    # 3. Category-based keywords
    for cat in categories:
        if cat in CATEGORY_KEYWORDS:
            keywords.extend(CATEGORY_KEYWORDS[cat])
            # Combine game name with category
            keywords.append(f"{title.lower()} {cat} game")
            keywords.append(f"play {title.lower()} {cat}")
    
    # 4. Description-based keywords (extract key phrases)
    if description:
        # Extract potential keywords from description
        desc_words = description.lower().split()
        # Look for common game-related terms
        game_terms = ["game", "play", "fun", "exciting", "challenging", "addictive", 
                     "online", "free", "browser", "html5", "simulation", "puzzle",
                     "action", "adventure", "racing", "shooting", "strategy"]
        
        for term in game_terms:
            if term in desc_words:
                keywords.append(f"{title.lower()} {term}")
    
    # 5. Competitor/platform keywords
    platforms = ["poki", "crazy games", "cool math games", "y8", "kizi", "friv"]
    for platform in platforms:
        keywords.append(f"{platform} {title.lower()}")
    
    # 6. Common search variations
    keywords.append(f"{title.lower()} unblocked")
    keywords.append(f"{title.lower()} free online")
    keywords.append(f"{title.lower()} no download")
    keywords.append(f"{title.lower()} browser game")
    keywords.append(f"{title.lower()} html5")
    
    # 7. Long-tail question keywords
    keywords.append(f"how to play {title.lower()}")
    keywords.append(f"{title.lower()} tips")
    keywords.append(f"{title.lower()} cheats")
    keywords.append(f"{title.lower()} walkthrough")
    keywords.append(f"{title.lower()} controls")
    
    # Remove duplicates and empty strings
    keywords = list(set([k.strip() for k in keywords if k.strip()]))
    
    return keywords

def main():
    # Load games data
    with open('/home/zlh/playhivegames/data/games.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    games = data['games']
    print(f"Total games: {len(games)}")
    
    # Generate keywords for all games
    all_keywords = {}
    keyword_counter = Counter()
    
    for game in games:
        game_id = game['id']
        title = game['title']
        keywords = generate_keywords(game)
        all_keywords[game_id] = {
            "title": title,
            "slug": game.get('slug', ''),
            "categories": game.get('category', []),
            "keywords": keywords,
            "keyword_count": len(keywords)
        }
        
        # Count keyword frequency
        for kw in keywords:
            keyword_counter[kw] += 1
    
    # Save keywords to file
    output_path = '/home/zlh/playhivegames/data/game-keywords.json'
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(all_keywords, f, indent=2, ensure_ascii=False)
    
    print(f"Keywords generated for {len(all_keywords)} games")
    print(f"Total unique keywords: {len(keyword_counter)}")
    print(f"Average keywords per game: {sum(v['keyword_count'] for v in all_keywords.values()) / len(all_keywords):.1f}")
    
    # Show top 50 most common keywords
    print("\nTop 50 most common keywords:")
    for kw, count in keyword_counter.most_common(50):
        print(f"  {count:4d} - {kw}")
    
    # Show sample game keywords
    print("\nSample game keywords (first 3 games):")
    for game_id in list(all_keywords.keys())[:3]:
        game_data = all_keywords[game_id]
        print(f"\n{game_data['title']}:")
        print(f"  Categories: {', '.join(game_data['categories'])}")
        print(f"  Keywords ({game_data['keyword_count']}):")
        for kw in game_data['keywords'][:10]:  # Show first 10
            print(f"    - {kw}")
        if len(game_data['keywords']) > 10:
            print(f"    ... and {len(game_data['keywords']) - 10} more")
    
    # Generate keyword statistics by category
    print("\n\nKeyword Statistics by Category:")
    category_stats = {}
    for game_data in all_keywords.values():
        for cat in game_data['categories']:
            if cat not in category_stats:
                category_stats[cat] = {'games': 0, 'total_keywords': 0}
            category_stats[cat]['games'] += 1
            category_stats[cat]['total_keywords'] += game_data['keyword_count']
    
    for cat, stats in sorted(category_stats.items(), key=lambda x: x[1]['games'], reverse=True):
        avg_kw = stats['total_keywords'] / stats['games'] if stats['games'] > 0 else 0
        print(f"  {cat}: {stats['games']} games, {stats['total_keywords']} total keywords, {avg_kw:.1f} avg/game")

if __name__ == "__main__":
    main()
