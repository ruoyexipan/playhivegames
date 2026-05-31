#!/usr/bin/env python3
"""
检查所有游戏，删除返回 Internal Server Error 的游戏
"""

import json
import requests
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime

DATA_DIR = Path(__file__).parent.parent / "data"
GAMES_FILE = DATA_DIR / "games.json"

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
}

def check_game(game, timeout=15):
    """
    检查游戏是否返回错误
    返回: (game, is_ok, status_code, error_msg)
    """
    iframe_url = game.get("iframe", "")
    if not iframe_url:
        return game, False, 0, "No URL"
    
    try:
        response = requests.get(
            iframe_url, 
            headers=HEADERS, 
            timeout=timeout,
            allow_redirects=True
        )
        
        # 检查状态码
        if response.status_code >= 500:
            return game, False, response.status_code, f"Server Error {response.status_code}"
        
        # 检查页面内容是否包含错误信息
        content = response.text.lower()
        error_indicators = [
            "internal server error",
            "500 internal server error",
            "server error",
            "the server encountered an error",
            "error 500",
            "502 bad gateway",
            "503 service unavailable",
            "504 gateway timeout"
        ]
        
        for indicator in error_indicators:
            if indicator in content:
                return game, False, response.status_code, f"Contains: {indicator}"
        
        return game, True, response.status_code, None
        
    except requests.exceptions.Timeout:
        return game, False, 0, "Timeout"
    except requests.exceptions.ConnectionError:
        return game, False, 0, "Connection Error"
    except requests.exceptions.RequestException as e:
        return game, False, 0, str(e)[:50]
    except Exception as e:
        return game, False, 0, str(e)[:50]

def main():
    print("=" * 60)
    print("游戏服务器错误检查脚本")
    print("=" * 60)
    print(f"执行时间: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print()
    
    # 加载游戏数据
    if not GAMES_FILE.exists():
        print(f"错误: 找不到游戏数据文件 {GAMES_FILE}")
        return
    
    with open(GAMES_FILE, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    games = data.get("games", [])
    print(f"总游戏数: {len(games)}")
    print()
    
    # 并发检查所有游戏
    print("开始检查游戏可访问性...")
    ok_games = []
    error_games = []
    
    with ThreadPoolExecutor(max_workers=30) as executor:
        future_to_game = {
            executor.submit(check_game, game): game 
            for game in games
        }
        
        completed = 0
        for future in as_completed(future_to_game):
            completed += 1
            if completed % 100 == 0:
                print(f"  已检查 {completed}/{len(games)} 个游戏...")
            
            game, is_ok, status_code, error_msg = future.result()
            if is_ok:
                ok_games.append(game)
            else:
                error_games.append((game, status_code, error_msg))
    
    # 打印结果
    print("\n" + "=" * 60)
    print("检查结果:")
    print(f"  ✓ 正常: {len(ok_games)} 个游戏")
    print(f"  ✗ 错误: {len(error_games)} 个游戏")
    
    if error_games:
        print(f"\n删除的错误游戏 (前30个):")
        for game, status, error in error_games[:30]:
            print(f"  - [{status}] {game['title']}: {error}")
        if len(error_games) > 30:
            print(f"  ... 还有 {len(error_games) - 30} 个")
    
    # 保存过滤后的数据
    data["games"] = ok_games
    data["total_games"] = len(ok_games)
    data["last_updated"] = datetime.now().isoformat()
    
    with open(GAMES_FILE, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    
    print(f"\n已保存 {len(ok_games)} 个游戏到 {GAMES_FILE}")
    
    # 统计
    print("\n" + "=" * 60)
    print("最终统计:")
    print(f"  原游戏数: {len(games)}")
    print(f"  删除数: {len(error_games)}")
    print(f"  保留数: {len(ok_games)}")
    print("=" * 60)
    print("检查完成!")

if __name__ == "__main__":
    main()
