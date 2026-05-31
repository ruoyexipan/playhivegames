#!/usr/bin/env python3
"""Generate SEO meta tags for all games"""

import json

def generate_meta_tags(game, keywords):
    """Generate SEO meta tags for a game"""
    title = game["title"]
    categories = game.get("category", [])
    description = game.get("description", "")
    slug = game.get("slug", "")
    
    # Primary category
    primary_category = categories[0] if categories else "game"
    
    # Meta title (50-60 characters)
    meta_title = f"Play {title} Online Free - HTML5 Game | PlayHive Games"
    if len(meta_title) > 60:
        meta_title = f"Play {title} Free Online | PlayHive Games"
    
    # Meta description (150-160 characters)
    if description:
        # Use first 120 chars of description + CTA
        desc_short = description[:120].rsplit(' ', 1)[0]
        meta_description = f"{desc_short} Play {title} online for free on PlayHive Games. No download required!"
    else:
        meta_description = f"Play {title} online for free! Enjoy this exciting {primary_category} game directly in your browser. No download or registration needed."
    
    if len(meta_description) > 160:
        meta_description = f"Play {title} online for free! Enjoy this {primary_category} game in your browser. No download required on PlayHive Games."
    
    # Keywords (top 10 most relevant)
    top_keywords = keywords[:10] if len(keywords) >= 10 else keywords
    
    # H1 tag
    h1 = f"{title} - Play Free Online"
    
    # URL
    url = f"https://playhivegames.com/game?slug={slug}"
    
    # Canonical URL
    canonical = url
    
    return {
        "game_id": game["id"],
        "title": title,
        "slug": slug,
        "meta_title": meta_title,
        "meta_description": meta_description,
        "keywords": top_keywords,
        "h1": h1,
        "url": url,
        "canonical": canonical,
        "og_title": meta_title,
        "og_description": meta_description,
        "og_url": url,
        "twitter_title": meta_title,
        "twitter_description": meta_description,
        "twitter_url": url,
        "json_ld": {
            "@context": "https://schema.org",
            "@type": "VideoGame",
            "name": title,
            "description": description[:500] if description else f"Play {title} online for free",
            "url": url,
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
    # Load games data
    with open('/home/zlh/playhivegames/data/games.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # Load keywords
    with open('/home/zlh/playhivegames/data/game-keywords.json', 'r', encoding='utf-8') as f:
        keywords_data = json.load(f)
    
    games = data['games']
    print(f"Generating SEO tags for {len(games)} games...")
    
    # Generate meta tags for all games
    all_meta_tags = []
    
    for game in games:
        game_id = str(game['id'])
        if game_id in keywords_data:
            keywords = keywords_data[game_id]['keywords']
        else:
            keywords = []
        
        meta_tags = generate_meta_tags(game, keywords)
        all_meta_tags.append(meta_tags)
    
    # Save to JSON file
    output_path = '/home/zlh/playhivegames/data/game-seo-tags.json'
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(all_meta_tags, f, indent=2, ensure_ascii=False)
    
    print(f"SEO tags generated for {len(all_meta_tags)} games")
    print(f"Output saved to: {output_path}")
    
    # Generate sample HTML for first 5 games
    print("\n\nSample HTML Meta Tags (First 5 Games):")
    print("=" * 80)
    
    for i, meta in enumerate(all_meta_tags[:5]):
        print(f"\n--- Game {i+1}: {meta['title']} ---")
        print(f"URL: {meta['url']}")
        print(f"\n<!-- HTML Meta Tags -->")
        print(f"<title>{meta['meta_title']}</title>")
        print(f'<meta name="description" content="{meta["meta_description"]}">')
        print(f'<meta name="keywords" content="{", ".join(meta["keywords"][:5])}">')
        print(f'<link rel="canonical" href="{meta["canonical"]}">')
        print(f"\n<!-- Open Graph Meta Tags -->")
        print(f'<meta property="og:title" content="{meta["og_title"]}">')
        print(f'<meta property="og:description" content="{meta["og_description"]}">')
        print(f'<meta property="og:url" content="{meta["og_url"]}">')
        print(f"\n<!-- Twitter Meta Tags -->")
        print(f'<meta name="twitter:title" content="{meta["twitter_title"]}">')
        print(f'<meta name="twitter:description" content="{meta["twitter_description"]}">')
        print(f'<meta name="twitter:url" content="{meta["twitter_url"]}">')
        print(f"\n<!-- JSON-LD Schema -->")
        print(f'<script type="application/ld+json">')
        print(json.dumps(meta["json_ld"], indent=2, ensure_ascii=False))
        print(f'</script>')
    
    # Generate CSV export
    csv_path = '/home/zlh/playhivegames/data/game-keywords.csv'
    with open(csv_path, 'w', encoding='utf-8') as f:
        f.write("Game ID,Title,Slug,Categories,Meta Title,Meta Description,Top Keywords\n")
        for meta in all_meta_tags:
            game_id = meta['game_id']
            title = meta['title'].replace('"', '""')
            slug = meta['slug']
            categories = '|'.join(meta.get('categories', []))
            meta_title = meta['meta_title'].replace('"', '""')
            meta_desc = meta['meta_description'].replace('"', '""')
            keywords = '|'.join(meta['keywords'][:5])
            
            f.write(f'{game_id},"{title}","{slug}","{categories}","{meta_title}","{meta_desc}","{keywords}"\n')
    
    print(f"\n\nCSV export saved to: {csv_path}")
    
    # Generate keyword statistics
    print("\n\nKeyword Statistics:")
    print("=" * 80)
    
    # Count unique keywords across all games
    all_keywords_flat = []
    for meta in all_meta_tags:
        all_keywords_flat.extend(meta['keywords'])
    
    from collections import Counter
    keyword_counts = Counter(all_keywords_flat)
    
    print(f"Total keyword instances: {len(all_keywords_flat)}")
    print(f"Unique keywords: {len(keyword_counts)}")
    print(f"\nTop 20 most used keywords:")
    for kw, count in keyword_counts.most_common(20):
        print(f"  {count:4d} - {kw}")
    
    # Generate sitemap entries
    sitemap_path = '/home/zlh/playhivegames/data/game-sitemap-entries.txt'
    with open(sitemap_path, 'w', encoding='utf-8') as f:
        for meta in all_meta_tags:
            f.write(f'{meta["url"]}\n')
    
    print(f"\n\nSitemap entries saved to: {sitemap_path}")
    print(f"Total URLs: {len(all_meta_tags)}")

if __name__ == "__main__":
    main()
