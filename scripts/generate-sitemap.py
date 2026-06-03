#!/usr/bin/env python3
"""Generate optimized sitemap for all games"""

import json
from datetime import datetime

def main():
    # Load games data
    with open('/home/zlh/playhivegames/data/games.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    games = data['games']
    print(f"Generating sitemap for {len(games)} games...")
    
    # 按浏览量排序 - 热门游戏优先
    sorted_games = sorted(games, key=lambda x: x.get('views', 0), reverse=True)
    
    # Current date for lastmod
    current_date = datetime.now().strftime('%Y-%m-%d')
    
    # Start building main sitemap (only static pages)
    sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n'
    sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    
    # Homepage - 最高优先级
    sitemap += f'''  <url>
    <loc>https://playhivegames.com/</loc>
    <lastmod>{current_date}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
'''
    
    # Static pages
    static_pages = [
        ('about', 'monthly', '0.5'),
        ('contact', 'monthly', '0.5'),
        ('faq', 'monthly', '0.6'),
        ('play-free-games', 'weekly', '0.8'),
        ('privacy', 'monthly', '0.3'),
        ('terms', 'monthly', '0.3'),
        ('disclaimer', 'monthly', '0.3'),
        ('cookie-policy', 'monthly', '0.3'),
    ]
    
    for page, changefreq, priority in static_pages:
        sitemap += f'''  <url>
    <loc>https://playhivegames.com/{page}</loc>
    <lastmod>{current_date}</lastmod>
    <changefreq>{changefreq}</changefreq>
    <priority>{priority}</priority>
  </url>
'''
    
    # Category pages - 高优先级
    categories = ['3d', 'action', 'adventure', 'arcade', 'archery', 'boys', 'bubble-shooter', 
                  'clicker', 'desktop', 'driving', 'fighting', 'girls', 'html5', 'hypercasual',
                  'logic', 'multiplayer', 'puzzle', 'racing', 'shooting', 'sports', 'strategy', 'stunt']
    
    for cat in categories:
        sitemap += f'''  <url>
    <loc>https://playhivegames.com/category/{cat}</loc>
    <lastmod>{current_date}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
'''
    
    # Close main sitemap
    sitemap += '</urlset>'
    
    # Save main sitemap
    output_path = '/home/zlh/playhivegames/public/sitemap.xml'
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(sitemap)
    
    print(f"Main sitemap generated with {len(static_pages) + len(categories) + 1} URLs")
    print(f"Saved to: {output_path}")
    
    # Generate chunk sitemaps for games - 按热门度分片
    sitemap_index = '<?xml version="1.0" encoding="UTF-8"?>\n'
    sitemap_index += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    
    # Split games into chunks of 1000
    chunk_size = 1000
    num_chunks = (len(sorted_games) + chunk_size - 1) // chunk_size
    
    for i in range(num_chunks):
        chunk_games = sorted_games[i*chunk_size:(i+1)*chunk_size]
        chunk_filename = f'sitemap-games-{i+1}.xml'
        
        # Generate chunk sitemap
        chunk_sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n'
        chunk_sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        
        for game in chunk_games:
            slug = game.get('slug', '')
            views = game.get('views', 0)
            
            if slug:
                # 热门游戏优先级更高
                if views > 10000:
                    priority = '0.9'
                elif views > 1000:
                    priority = '0.8'
                elif views > 100:
                    priority = '0.7'
                else:
                    priority = '0.6'
                
                chunk_sitemap += f'''  <url>
    <loc>https://playhivegames.com/game/{slug}</loc>
    <lastmod>{current_date}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>{priority}</priority>
  </url>
'''
        
        chunk_sitemap += '</urlset>'
        
        # Save chunk sitemap
        chunk_path = f'/home/zlh/playhivegames/public/{chunk_filename}'
        with open(chunk_path, 'w', encoding='utf-8') as f:
            f.write(chunk_sitemap)
        
        # Add to sitemap index
        sitemap_index += f'''  <sitemap>
    <loc>https://playhivegames.com/{chunk_filename}</loc>
    <lastmod>{current_date}</lastmod>
  </sitemap>
'''
        
        print(f"Generated {chunk_filename} with {len(chunk_games)} games (hot games first)")
    
    sitemap_index += '</sitemapindex>'
    
    # Save sitemap index
    index_path = '/home/zlh/playhivegames/public/sitemap-index.xml'
    with open(index_path, 'w', encoding='utf-8') as f:
        f.write(sitemap_index)
    
    print(f"\nGenerated sitemap index: {index_path}")
    print(f"Sitemap index contains {num_chunks} chunk sitemaps")
    
    # 显示热门游戏统计
    hot_games = [g for g in sorted_games if g.get('views', 0) > 1000]
    print(f"\nHot games (views > 1000): {len(hot_games)}")
    print(f"Top 10 games by views:")
    for i, game in enumerate(sorted_games[:10]):
        print(f"  {i+1}. {game['title']}: {game.get('views', 0)} views")

if __name__ == "__main__":
    main()
