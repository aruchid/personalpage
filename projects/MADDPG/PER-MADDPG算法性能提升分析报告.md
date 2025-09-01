## PER－MADDPG 算法性能提升分析报告

## 一．算法改进概述

在原始 MADDPG 算法的基础上，我们实现了以下关键改进：

1．添加优先经验回放机制（PER）
2．为每个 Agent 建立独立的经验池
3．实现基于 TD 误差的优先级更新
4．引入重要性采样权重

二．性能提升分析
2.1 收敛速度对比
![](https://cdn.mathpix.com/cropped/2025_08_22_560db090eac8765d841bg-1.jpg?height=772&width=1218&top_left_y=1182&top_left_x=399)

从图中可以看出：

- PER－MADDPG 在约 500 步时达到较高性能水平
- 原始 MADDPG 需要约 1000 步才能达到类似水平
- PER－MADDPG 的收敛过程更加平滑


## 2.2 利润水平提升

![](https://cdn.mathpix.com/cropped/2025_08_22_560db090eac8765d841bg-2.jpg?height=772&width=1218&top_left_y=314&top_left_x=399)

各类型机组的利润提升情况：
-300 MW 机组： 480 元 $\rightarrow 600$ 元（提升 $25 \%$ ）
-600 MW 机组： 1500 元 $\rightarrow 3000$ 元（提升 $100 \%$ ）
-1000 MW 机组： 1700 元 $\rightarrow 3200$ 元（提升 $88 \%$ ）

## 2.3 交易量稳定性

![](https://cdn.mathpix.com/cropped/2025_08_22_560db090eac8765d841bg-2.jpg?height=774&width=1221&top_left_y=1559&top_left_x=396)

交易量稳定性分析：

- 大容量机组（G11、G12）保持稳定在 1000 MWH 左右
- 中等容量机组（G7－G10）保持在 $500-600 \mathrm{MWH}$
- 小容量机组（G1－G6）保持在 $150-300 \mathrm{MWH}$
2.4 市场效率指标

市场效率对比
![](https://cdn.mathpix.com/cropped/2025_08_22_560db090eac8765d841bg-3.jpg?height=741&width=1218&top_left_y=456&top_left_x=399)

市场效率提升：

- 总利润波动减小约 $40 \%$
- 利润分配更加均衡
- 交易量分配更加合理

三．具体数据对比

指标
原始 MADDPG
PER－MADDPG
提升幅度

| 初始利润 | 3700 元 | 3700 元 | － |
| :--- | :--- | :--- | :--- |
| 最终利润 | 6800 元 | 7000 元 | ＋2．9\％ |
| 收敛步数 | 1000 步 | 500 步 | －50\％ |
| 利润波动 | 高 | 低 | －40\％ |

交易量稳定性 中等 高＋30\％

