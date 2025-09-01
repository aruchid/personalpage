#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
图像全景拼接算法系统主图生成脚本
生成展示算法流程和系统架构的图表
"""

import matplotlib.pyplot as plt
import matplotlib.patches as patches
from matplotlib.patches import FancyBboxPatch, ConnectionPatch
import numpy as np
from matplotlib.patches import Rectangle, Circle, FancyArrowPatch
import matplotlib.patches as mpatches

# 设置中文字体
plt.rcParams['font.sans-serif'] = ['SimHei', 'DejaVu Sans', 'Arial Unicode MS']
plt.rcParams['axes.unicode_minus'] = False

def create_main_diagram():
    """创建主图"""
    fig, ax = plt.subplots(1, 1, figsize=(16, 12))
    ax.set_xlim(0, 16)
    ax.set_ylim(0, 12)
    ax.axis('off')
    
    # 设置背景色
    ax.set_facecolor('#f8f8f8')
    fig.patch.set_facecolor('#f8f8f8')
    
    # 标题
    ax.text(8, 11.5, '图像全景拼接算法系统架构', 
            fontsize=24, fontweight='bold', ha='center', color='#333')
    
    # 1. 输入图像区域
    input_box = FancyBboxPatch((0.5, 9.5), 3, 1.5, 
                               boxstyle="round,pad=0.1", 
                               facecolor='#ffffff', 
                               edgecolor='#e0e0e0', 
                               linewidth=2)
    ax.add_patch(input_box)
    ax.text(2, 10.25, '输入图像序列', fontsize=14, fontweight='bold', ha='center', color='#333')
    ax.text(2, 9.9, '多张重叠图像', fontsize=10, ha='center', color='#666')
    
    # 输入图像示例
    for i in range(3):
        img_rect = Rectangle((0.8 + i*0.8, 9.7), 0.6, 0.8, 
                           facecolor='#f0f0f0', edgecolor='#ccc', linewidth=1)
        ax.add_patch(img_rect)
        ax.text(1.1 + i*0.8, 10.1, f'Img{i+1}', fontsize=8, ha='center', color='#666')
    
    # 2. 特征检测区域
    feature_box = FancyBboxPatch((5, 9.5), 3, 1.5, 
                                boxstyle="round,pad=0.1", 
                                facecolor='#ffffff', 
                                edgecolor='#e0e0e0', 
                                linewidth=2)
    ax.add_patch(feature_box)
    ax.text(6.5, 10.25, '特征点检测', fontsize=14, fontweight='bold', ha='center', color='#333')
    ax.text(6.5, 9.9, 'SURF/SIFT算法', fontsize=10, ha='center', color='#666')
    
    # 特征点示例
    for i in range(8):
        x = 5.3 + (i % 4) * 0.6
        y = 9.8 + (i // 4) * 0.6
        feature_point = Circle((x, y), 0.08, facecolor='#ff6b6b', edgecolor='#e74c3c', linewidth=1)
        ax.add_patch(feature_point)
    
    # 3. 特征匹配区域
    match_box = FancyBboxPatch((9.5, 9.5), 3, 1.5, 
                              boxstyle="round,pad=0.1", 
                              facecolor='#ffffff', 
                              edgecolor='#e0e0e0', 
                              linewidth=2)
    ax.add_patch(match_box)
    ax.text(11, 10.25, '特征匹配', fontsize=14, fontweight='bold', ha='center', color='#333')
    ax.text(11, 9.9, 'KNN + RANSAC', fontsize=10, ha='center', color='#666')
    
    # 匹配线示例
    for i in range(4):
        x1, y1 = 9.8, 10.1 - i*0.2
        x2, y2 = 10.8, 10.1 - i*0.2
        match_line = FancyArrowPatch((x1, y1), (x2, y2), 
                                    arrowstyle='<->', color='#3498db', 
                                    linewidth=2, mutation_scale=15)
        ax.add_patch(match_line)
    
    # 4. 几何变换区域
    transform_box = FancyBboxPatch((14, 9.5), 1.5, 1.5, 
                                  boxstyle="round,pad=0.1", 
                                  facecolor='#ffffff', 
                                  edgecolor='#e0e0e0', 
                                  linewidth=2)
    ax.add_patch(transform_box)
    ax.text(14.75, 10.25, '几何变换', fontsize=12, fontweight='bold', ha='center', color='#333')
    ax.text(14.75, 9.9, '单应性矩阵', fontsize=9, ha='center', color='#666')
    
    # 5. 图像配准区域
    align_box = FancyBboxPatch((0.5, 7.5), 6, 1.5, 
                              boxstyle="round,pad=0.1", 
                              facecolor='#ffffff', 
                              edgecolor='#e0e0e0', 
                              linewidth=2)
    ax.add_patch(align_box)
    ax.text(3.5, 8.25, '图像配准与对齐', fontsize=16, fontweight='bold', ha='center', color='#333')
    ax.text(3.5, 7.9, '投影变换 + 空间对齐', fontsize=11, ha='center', color='#666')
    
    # 配准后的图像示例
    aligned_img = Rectangle((1, 7.7), 4, 1, facecolor='#e8f5e8', edgecolor='#4caf50', linewidth=2)
    ax.add_patch(aligned_img)
    ax.text(3, 8.1, '对齐后的图像', fontsize=10, ha='center', color='#2e7d32')
    
    # 6. 图像融合区域
    fusion_box = FancyBboxPatch((7.5, 7.5), 6, 1.5, 
                               boxstyle="round,pad=0.1", 
                               facecolor='#ffffff', 
                               edgecolor='#e0e0e0', 
                               linewidth=2)
    ax.add_patch(fusion_box)
    ax.text(10.5, 8.25, '图像融合与拼接', fontsize=16, fontweight='bold', ha='center', color='#333')
    ax.text(10.5, 7.9, '最大流图割 + Pyramid融合', fontsize=11, ha='center', color='#666')
    
    # 融合过程示例
    for i in range(3):
        x = 8 + i*1.5
        fusion_step = Rectangle((x, 7.7), 1.2, 1, facecolor='#fff3e0', edgecolor='#ff9800', linewidth=1)
        ax.add_patch(fusion_step)
        ax.text(x + 0.6, 8.1, f'Step{i+1}', fontsize=9, ha='center', color='#e65100')
    
    # 7. 全景输出区域
    output_box = FancyBboxPatch((14.5, 7.5), 1, 1.5, 
                               boxstyle="round,pad=0.1", 
                               facecolor='#ffffff', 
                               edgecolor='#e0e0e0', 
                               linewidth=2)
    ax.add_patch(output_box)
    ax.text(15, 8.25, '全景输出', fontsize=12, fontweight='bold', ha='center', color='#333')
    
    # 8. 算法流程步骤
    steps = [
        '特征点检测', '特征匹配', '几何变换', '图像配准', '图像融合', '全景输出'
    ]
    
    for i, step in enumerate(steps):
        step_box = FancyBboxPatch((0.5 + i*2.5, 5.5), 2, 0.8, 
                                 boxstyle="round,pad=0.05", 
                                 facecolor='#f0f0f0', 
                                 edgecolor='#ccc', 
                                 linewidth=1)
        ax.add_patch(step_box)
        ax.text(1.5 + i*2.5, 5.9, step, fontsize=10, fontweight='bold', ha='center', color='#333')
        
        # 添加步骤编号
        ax.text(0.7 + i*2.5, 5.7, f'{i+1}', fontsize=12, fontweight='bold', ha='center', color='#666')
    
    # 9. 技术特点区域
    tech_box = FancyBboxPatch((0.5, 4), 7, 1.2, 
                             boxstyle="round,pad=0.1", 
                             facecolor='#ffffff', 
                             edgecolor='#e0e0e0', 
                             linewidth=2)
    ax.add_patch(tech_box)
    ax.text(4, 4.6, '核心技术特点', fontsize=14, fontweight='bold', ha='center', color='#333')
    
    tech_features = [
        'SURF/SIFT特征提取', 'RANSAC错误剔除', '单应性矩阵计算', 'Pyramid融合技术'
    ]
    
    for i, feature in enumerate(tech_features):
        x = 1 + i*1.5
        feature_circle = Circle((x, 4.3), 0.15, facecolor='#e3f2fd', edgecolor='#2196f3', linewidth=1)
        ax.add_patch(feature_circle)
        ax.text(x, 4.3, f'{i+1}', fontsize=8, fontweight='bold', ha='center', color='#1976d2')
        ax.text(x, 4.1, feature, fontsize=8, ha='center', color='#666', wrap=True)
    
    # 10. 应用场景区域
    app_box = FancyBboxPatch((8.5, 4), 7, 1.2, 
                            boxstyle="round,pad=0.1", 
                            facecolor='#ffffff', 
                            edgecolor='#e0e0e0', 
                            linewidth=2)
    ax.add_patch(app_box)
    ax.text(12, 4.6, '应用场景与成果', fontsize=14, fontweight='bold', ha='center', color='#333')
    
    app_items = [
        '货架商品识别', 'SKU自动统计', '移动端实时处理', '性能提升3倍'
    ]
    
    for i, item in enumerate(app_items):
        x = 9 + i*1.5
        item_rect = Rectangle((x, 4.2), 1.2, 0.4, facecolor='#f3e5f5', edgecolor='#9c27b0', linewidth=1)
        ax.add_patch(item_rect)
        ax.text(x + 0.6, 4.4, item, fontsize=8, ha='center', color='#7b1fa2')
    
    # 11. 连接箭头
    # 输入到特征检测
    arrow1 = FancyArrowPatch((3.5, 10.25), (5, 10.25), 
                            arrowstyle='->', color='#666', 
                            linewidth=2, mutation_scale=20)
    ax.add_patch(arrow1)
    
    # 特征检测到特征匹配
    arrow2 = FancyArrowPatch((8, 10.25), (9.5, 10.25), 
                            arrowstyle='->', color='#666', 
                            linewidth=2, mutation_scale=20)
    ax.add_patch(arrow2)
    
    # 特征匹配到几何变换
    arrow3 = FancyArrowPatch((12.5, 10.25), (14, 10.25), 
                            arrowstyle='->', color='#666', 
                            linewidth=2, mutation_scale=20)
    ax.add_patch(arrow3)
    
    # 几何变换到配准
    arrow4 = FancyArrowPatch((14.75, 9.5), (13, 8.25), 
                            arrowstyle='->', color='#666', 
                            linewidth=2, mutation_scale=20)
    ax.add_patch(arrow4)
    
    # 配准到融合
    arrow5 = FancyArrowPatch((6.5, 7.5), (7.5, 7.5), 
                            arrowstyle='->', color='#666', 
                            linewidth=2, mutation_scale=20)
    ax.add_patch(arrow5)
    
    # 融合到输出
    arrow6 = FancyArrowPatch((13.5, 7.5), (14.5, 7.5), 
                            arrowstyle='->', color='#666', 
                            linewidth=2, mutation_scale=20)
    ax.add_patch(arrow6)
    
    # 12. 底部说明
    ax.text(8, 2.5, '基于计算机视觉技术的智能图像拼接系统', 
            fontsize=16, fontweight='bold', ha='center', color='#333')
    ax.text(8, 2.1, '专为货架商品识别场景设计，实现多视角图像无缝拼接和自动化SKU统计', 
            fontsize=12, ha='center', color='#666')
    
    # 13. 性能指标
    performance_box = FancyBboxPatch((0.5, 0.5), 15, 1.2, 
                                   boxstyle="round,pad=0.1", 
                                   facecolor='#e8f5e8', 
                                   edgecolor='#4caf50', 
                                   linewidth=2)
    ax.add_patch(performance_box)
    
    metrics = [
        ('处理速度', '提升3倍'),
        ('拼接精度', '显著提升'),
        ('移动端支持', '实时处理'),
        ('计算资源', '降低消耗'),
        ('商业价值', '效率提升')
    ]
    
    for i, (metric, value) in enumerate(metrics):
        x = 1.5 + i*2.8
        ax.text(x, 1.1, metric, fontsize=11, fontweight='bold', ha='center', color='#2e7d32')
        ax.text(x, 0.8, value, fontsize=10, ha='center', color='#4caf50')
    
    return fig

def main():
    """主函数"""
    print("正在生成图像全景拼接算法系统主图...")
    
    # 创建图表
    fig = create_main_diagram()
    
    # 保存图表
    output_path = 'main_diagram.png'
    fig.savefig(output_path, dpi=300, bbox_inches='tight', 
                facecolor='#f8f8f8', edgecolor='none')
    
    print(f"主图已保存到: {output_path}")
    print("图片尺寸: 16x12 英寸, 分辨率: 300 DPI")
    
    # 显示图表
    plt.show()

if __name__ == "__main__":
    main() 