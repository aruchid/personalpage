# 针灸穴位关键点检测系统 - 模型概述

## English Abstract

The Acupuncture Point Key Point Detection System is a deep learning-based computer vision solution that addresses the precision challenges in traditional Chinese acupuncture therapy. The system integrates infrared imaging technology with advanced deep learning algorithms to achieve automated and precise detection of acupuncture points. Built on ResNet18 backbone architecture, it incorporates innovative modules including residual connections, domain adaptation layers, and attention mechanisms. The system achieves over 85% detection accuracy with positioning errors less than 5 pixels, delivering real-time performance at 30 FPS in GPU mode. This technology provides objective and precise positioning references for acupuncture treatment, promoting the modernization and standardization of traditional Chinese medicine.

## 模型概述

### 核心架构
针灸穴位关键点检测系统采用基于ResNet18的深度学习架构，通过多模态数据融合技术，结合红外成像和可见光图像信息，实现对针灸穴位的精确检测和定位。

### 技术特点
- **多模态融合**: 红外与可见光图像配准，提高检测精度
- **注意力机制**: 空间和通道注意力，突出关键特征
- **域适应技术**: 自适应处理不同成像条件
- **实时处理**: 30FPS实时性能，满足临床需求

### 性能指标
- 检测准确率: 85%+
- 定位误差: <5像素
- 实时性能: 30FPS (GPU模式)
- 响应延迟: <100ms

### 应用价值
该系统为中医针灸的现代化和标准化提供了重要的技术支撑，通过客观、精确的定位参考，显著提升了针灸治疗的精度和效果，推动了传统医学与现代技术的深度融合。

### 创新点
1. 提出了适合穴位检测的深度学习架构
2. 实现了红外和可见光图像的有效配准
3. 建立了高质量的穴位标注数据集
4. 验证了多模态融合在医学图像处理中的有效性

该系统代表了传统中医与现代人工智能技术的成功结合，为医疗辅助、教学培训、研究应用和标准化推广等场景提供了强有力的技术支持。 