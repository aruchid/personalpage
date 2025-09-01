#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
SAM-Road 创新算法实现报告图片下载脚本
自动下载Markdown文件中的所有图片链接
"""

import os
import re
import requests
from urllib.parse import urlparse
from pathlib import Path
import time

def download_image(url, save_dir, filename=None):
    """
    下载单个图片
    
    Args:
        url: 图片URL
        save_dir: 保存目录
        filename: 文件名（可选）
    
    Returns:
        bool: 下载是否成功
    """
    try:
        # 设置请求头，模拟浏览器访问
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        
        # 发送请求
        response = requests.get(url, headers=headers, timeout=30)
        response.raise_for_status()
        
        # 如果没有指定文件名，从URL中提取
        if filename is None:
            parsed_url = urlparse(url)
            filename = os.path.basename(parsed_url.path)
            if not filename or '.' not in filename:
                filename = f"image_{int(time.time())}.jpg"
        
        # 确保文件名有扩展名
        if '.' not in filename:
            filename += '.jpg'
        
        # 保存文件
        filepath = os.path.join(save_dir, filename)
        with open(filepath, 'wb') as f:
            f.write(response.content)
        
        print(f"✓ 成功下载: {filename}")
        return True
        
    except Exception as e:
        print(f"✗ 下载失败 {url}: {str(e)}")
        return False

def extract_image_urls(markdown_file):
    """
    从Markdown文件中提取所有图片URL
    
    Args:
        markdown_file: Markdown文件路径
    
    Returns:
        list: 图片URL列表
    """
    image_urls = []
    
    try:
        with open(markdown_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 匹配Markdown图片语法 ![alt](url)
        pattern1 = r'!\[([^\]]*)\]\(([^)]+)\)'
        matches1 = re.findall(pattern1, content)
        for alt, url in matches1:
            if url.startswith('http'):
                image_urls.append(url)
        
        # 匹配HTML img标签
        pattern2 = r'<img[^>]+src=[\'"]([^\'"]+)[\'"][^>]*>'
        matches2 = re.findall(pattern2, content)
        for url in matches2:
            if url.startswith('http'):
                image_urls.append(url)
        
        # 匹配直接链接（以http开头，以常见图片扩展名结尾）
        pattern3 = r'https?://[^\s\)]+\.(?:jpg|jpeg|png|gif|bmp|webp)'
        matches3 = re.findall(pattern3, content)
        for url in matches3:
            image_urls.append(url)
        
        # 去重
        image_urls = list(set(image_urls))
        
        print(f"找到 {len(image_urls)} 个图片链接")
        return image_urls
        
    except Exception as e:
        print(f"读取Markdown文件失败: {str(e)}")
        return []

def main():
    """主函数"""
    # 设置路径
    script_dir = Path(__file__).parent
    markdown_file = script_dir / "🚀 SAM-Road 创新算法实现报告.md"
    images_dir = script_dir / "downloaded_images"
    
    # 检查Markdown文件是否存在
    if not markdown_file.exists():
        print(f"错误: 找不到Markdown文件: {markdown_file}")
        return
    
    # 创建图片保存目录
    images_dir.mkdir(exist_ok=True)
    print(f"图片将保存到: {images_dir}")
    
    # 提取图片URL
    print("正在分析Markdown文件...")
    image_urls = extract_image_urls(markdown_file)
    
    if not image_urls:
        print("未找到任何图片链接")
        return
    
    # 显示找到的图片链接
    print("\n找到的图片链接:")
    for i, url in enumerate(image_urls, 1):
        print(f"{i}. {url}")
    
    # 下载图片
    print(f"\n开始下载 {len(image_urls)} 张图片...")
    success_count = 0
    
    for i, url in enumerate(image_urls, 1):
        print(f"\n[{i}/{len(image_urls)}] 正在下载: {url}")
        
        # 生成文件名
        filename = f"image_{i:02d}.jpg"
        
        # 下载图片
        if download_image(url, images_dir, filename):
            success_count += 1
        
        # 添加延迟，避免请求过于频繁
        time.sleep(1)
    
    # 下载完成统计
    print(f"\n下载完成!")
    print(f"成功: {success_count}/{len(image_urls)}")
    print(f"图片保存在: {images_dir}")

if __name__ == "__main__":
    main() 