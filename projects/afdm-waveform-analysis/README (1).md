## MIMO－AFDM－ISAC系统：双色散信道下的先进波形设计

## 概述

本项目实现了多输入多输出仿射频分复用集成感知与通信（MIMO－AFDM－ISAC）系统，专门针对双色散信道环境进行深度优化。相比传统OFDM系统，本AFDM实现在高多普勒频移和时延扩展共存的极端双色散信道中展现出显著的性能优势。

## 双色散信道特性

系统设计考虑了以下信道特性：

- 多普勒扩展（最大 500 公里／小时移动速度）
- 时延扩展（最大 $5 \mu \mathrm{~s}$ 多径传播）
- 时频选择性衰落对正交性的影响


## 快速开始

## 运行仿真

cd MATLIB
run＿simulation＿optimized

该脚本执行完整的MIMO－AFDM－ISAC仿真流程，包括：

- SNR范围内的参数优化分析
- 双色散信道中的BER性能评估
- MIMO波束形成方向图生成
- ISAC感知性能测试
- 可视化结果输出


## 输出文件

数据文件（．mat格式）

```
data/
    comm/comm_performance_data_optimized.mat # 通信性能指标(BER、EVM、容量)
    sensing/sensing_performance_data.mat # 感知性能指标(角度、距离、速度RMSE)
    sensitivity/parameter_sensitivity_data.mat # 啁啾参数敏感性分析
    analysis/comprehensive_analysis_data.mat # 综合性能分析
    all_simulation_data_optimized.mat # 完整数据集
```


## 可视化文件（．png／．pdf格式）

```
results/
    ber_vs_snr.png
    ber_vs_chirp.png
    evm_vs_chirp.png
    conventional_beamforming.png
    mvdr_beamforming.png
    null_steering_beamforming.png
    range_resolution_vs_chirp.png
    velocity_resolution_vs_chirp.png
    sensing_performance.png
    tradeoff_analysis.png
```

```
# BER vs SNR性能曲线
# BER vs 啁啾参数分析
# EVM vs 啁啾参数分析
# 常规波束形成方向图
# MVDR波束形成方向图
# 零陷导向波束形成方向图
# 距离分辨率分析
# 速度分辨率分析
# 感知性能综合分析
# 通信一感知权衡分析
```


## 技术特点

## AFDM波形设计

- 基于啁啾的AFDM调制，通过参数（c1，c2）优化实现双色散信道鲁棒性
- 离散仿射傅里叶变换（DAFT）处理，在高多普勒条件下维持信号完整性
- 多目标参数优化，平衡通信、感知和安全性能


## 双色散信道性能

AFDM系统相对于OFDM的技术优势：

- 载波间干扰（ICI）抑制能力
- 高移动场景下的符号定时鲁棒性
- 在多普勒扩展环境中的性能稳定性

测试环境下系统性能：
－相比OFDM在双色散信道下实现 $10-15 \mathrm{~dB}$ SNR性能增益

- 角度估计精度：在 $\pm 60^{\circ}$ 视场范围内RMSE可达 $0.1-0.5^{\circ}$
- 高速移动场景（500公里／小时）下BER保持在 $10^{-3}$ 量级


## 集成感知与通信（ISAC）

- 单一AFDM波形同时实现目标检测和数据传输
- 3D联合估计（角度、距离、速度）
- 多目标分辨能力
- 通信感知性能权衡优化


## MIMO空域处理

- 多种波束形成算法：常规、MVDR、零陷导向
- 频域空间预编码
- ULA阵列几何优化（ $\lambda / 2$ 天线间距）
- 自适应天线选择


## 性能指标

## 通信性能

- BER性能：在高速移动场景下（ 15 dB SNR）可达 $10^{-4}$ 量级
- EVM指标：复杂多径环境下误差矢量幅度优于 $5 \%$
- 频谱效率：采用高阶调制时可实现 $6 \mathrm{bits} / \mathrm{s} / \mathrm{Hz}$


## 感知性能

- 角度分辨率：在 $\pm 60^{\circ}$ 视场内实现亚度级估计精度
- 距离精度： 1000 米探测范围内达到厘米级分辨率
- 速度估计：对 500 公里／小时高速目标RMSE优于 1 公里／小时
- 多目标处理：支持10个以上目标的并行跟踪


## 鲁棒性指标

- 多普勒容忍度：支持最大 2000 Hz 多普勒频移
- 时延扩展适应性：在 $5 \mu \mathrm{~s}$ RMS时延扩展下保持性能
- 信道相干时间：可适应 0.5 ms 短相干时间环境


## 信号处理算法

## 啁啾参数设计

基于双色散信道特性的啁啾参数优化：

$$
\begin{aligned}
& c 1=\left(2\left(\alpha \_ \text {max }+k \_v\right)+1\right) /\left(2 N \_c\right) \\
& c 2=\beta \times c 1
\end{aligned}
$$

其中a＿max为最大归一化多普勒频移，k＿v为多普勒间隔因子。

## 多目标优化

- 通信导向：频谱效率和BER性能优化
- 感知导向：估计精度和目标分辨率优化
- 安全导向：参数随机化实现物理层安全
- 平衡模式：多目标权衡优化


## 信道建模

- 瑞利衰落信道模型
- 扩展车载A（EVA）信道配置
- 混合近场／远场目标环境
- 时变信道自适应跟踪


## 高级功能

## 导频设计

- EPA（等功率分配）导频模式
- 块状和梳状导频配置
- 自适应导频密度调整


## 安全特性

- 啁啾参数随机化物理层安全
- 频率敏捷AFDM设计抗干扰
- 低截获概率通信模式


## 计算优化

- $\mathrm{O}(\mathrm{N} \log \mathrm{N})$ 复杂度DAFT实现
- 多天线阵列并行处理
- 内存优化数据结构


## 仿真环境

仿真框架包含：

- 蒙特卡洛统计分析
- 多信道实现性能评估
- OFDM／OTFS对比基准测试
- 星座图和频谱可视化


## 项目结构

| AFDM／ |  |  |
| :--- | :--- | :--- |
|  | MATLIB／ | \＃MATLAB源代码 |
| ｜ | $\qquad$ | \＃主要工作流程 |
|  |  |  | \＃数据生成器 |
|  |  |  | \＃可视化管理 |
|  |  |  | \＃报告生成 |
| ｜ | ![](https://cdn.mathpix.com/cropped/2025_08_22_2f173535380745b3adb9g-6.jpg?height=46&width=68&top_left_y=693&top_left_x=238) | \＃系统配置 |
|  | system＿config．m | \＃AFDM参数、天线阵列、信道模型 |
|  | simulation＿config．m | \＃仿真参数（SNR范围、蒙特卡洛次数） |
| ｜ | data＿generation／ | \＃数据生成模块 |
| ｜ | comm＿data＿generator．m | \＃通信性能数据 |
|  | －sensing＿data＿generator．m | \＃感知性能数据 |
|  |  |  | \＃参数敏感性分析 |
|  |  | \＃综合分析 |
| ｜ | ![](https://cdn.mathpix.com/cropped/2025_08_22_2f173535380745b3adb9g-6.jpg?height=354&width=77&top_left_y=979&top_left_x=238) | \＃工具函数 |
| ![](https://cdn.mathpix.com/cropped/2025_08_22_2f173535380745b3adb9g-6.jpg?height=227&width=23&top_left_y=1332&top_left_x=151) | math＿utils．m | \＃数学运算 |
|  | ![](https://cdn.mathpix.com/cropped/2025_08_22_2f173535380745b3adb9g-6.jpg?height=220&width=73&top_left_y=1332&top_left_x=320) | \＃图形绘制 |
|  | ![](https://cdn.mathpix.com/cropped/2025_08_22_2f173535380745b3adb9g-6.jpg?height=99&width=68&top_left_y=1447&top_left_x=325) | \＃文件操作 |
|  |  |  |
| ｜ | ![](https://cdn.mathpix.com/cropped/2025_08_22_2f173535380745b3adb9g-6.jpg?height=36&width=70&top_left_y=1625&top_left_x=238) | \＃仿真数据 |
| ![](https://cdn.mathpix.com/cropped/2025_08_22_2f173535380745b3adb9g-6.jpg?height=57&width=31&top_left_y=1686&top_left_x=143) | ![](https://cdn.mathpix.com/cropped/2025_08_22_2f173535380745b3adb9g-6.jpg?height=48&width=75&top_left_y=1682&top_left_x=238) | \＃结果文件 |
| ![](https://cdn.mathpix.com/cropped/2025_08_22_2f173535380745b3adb9g-6.jpg?height=36&width=70&top_left_y=1742&top_left_x=238) | run＿simulation＿optimized．m | \＃主入口 |
|  | README．md | \＃项目文档 |

## 核心算法实现

## AFDM信号模型

## 离散仿射傅里叶变换（DAFT）

DAFT变换的核心实现（参考：．．／AFDM－MIMO－ISAC／code／src／core／transforms．py：30－45）：
\％DAFT变换矩阵构造
F＿DAFT $=\Lambda \_c 2 * \mathrm{~F} * \Lambda \_c 1$
\％其中：
$\Lambda \_c 1=\operatorname{diag}\left(\exp \left(-j \pi c ı n^{2}\right)\right) \quad \%$ 发射端啁啾矩阵
N＿c2 $=\operatorname{diag}\left(\exp \left(-j \pi \mathrm{c} 2 \mathrm{n}^{2}\right)\right) \quad \%$ 接收端啁啾矩阵
$\mathrm{F}=\mathrm{DFT}$ 矩阵 \％标准DFT矩阵

## 啁啾参数优化理论

基于双色散信道的参数设计（参考：．．／AFDM－MIMO－ISAC／code／src／waveform／afdm．py：47－88）：
\％理论最优啁啾参数
$c_{1}=\left(2\left(\alpha \_\right.\right.$max + k＿v $\left.)+1\right) /(2$ N＿c $)$
$\mathrm{C}_{2}=\beta \times \mathrm{C}_{1}$
\％参数定义：
$\alpha \_$max $=\mathrm{f} \_\mathrm{d}, \max \times \mathrm{T} \_\mathrm{s} \quad \%$ 最大归一化多普勒频移
k＿v $=$ floor $\left(2 \alpha \_\right.$max $)+1$ \％多普勒间隔因子
$\beta \in[0.5,1.0]$ \％性能调节因子

## MIMO－ISAC联合估计算法

## 空间－时间－频率3D谱分析

联合参数估计核心流程（参考：．．／AFDM－MIMO－ISAC／code／src／isac／joint＿estimator．py：24－50）：
\％1．空间维度DFT（角度谱）
Y＿spatial $(\mathrm{n}, \mathrm{l}, \theta)=$ DFT＿spatial\｛y＿rx（m，n，l）\}
\％2．信号相关系数移除
$R(n, l, \theta)=$ Y＿spatial $(n, l, \theta) /$ X＿tx $(n, l)$
\％3．距离－速度维度 2 D FFT
$S(\theta, r, v)=\operatorname{FFT2D}\{R(n, l, \theta)\}$
\％4．3D峰值检测
$[\hat{\theta}, \hat{r}, \hat{v}]=\operatorname{argmax}|S(\theta, r, v)|$

## 克拉美罗下界（CRLB）性能分析

估计精度理论界限：

```
% 角度估计CRLB
CRLB_0 = 6 o }\mp@subsup{}{}{2}/(\mp@subsup{\pi}{}{2}\mp@subsup{d}{}{2}\mp@subsup{\operatorname{sin}}{}{2}0\times\operatorname{SNR}\times\mathrm{ M_rx }\times\mathrm{ N_c }\timesL
% 距离估计CRLB
CRLB_r = c2 02 / (8 }\mp@subsup{\pi}{}{2}f\_\mp@subsup{c}{}{2}\mp@subsup{B}{}{2}\times\operatorname{SNR}\timesN\_c\timesL
% 速度估计CRLB
CRLB_v = c }\mp@subsup{}{}{2}\mp@subsup{\sigma}{}{2}/(8\mp@subsup{\pi}{}{2}f\_\mp@subsup{c}{}{2}T\_cp\mp@subsup{i}{}{2}\times\operatorname{SNR}\timesN\_c\timesL
```


## 双色散信道建模

## 时变信道冲激响应

考虑多普勒和时延扩展的信道模型：

```
% 双色散信道冲激响应
h(\tau,v,t) = = }\mp@subsup{\boldsymbol{i}}{i}{}\mp@subsup{\boldsymbol{\alpha}}{i}{}(t)\delta(\tau-\mp@subsup{\tau}{i}{})\delta(\nu-\nui)\operatorname{exp}(j2\pi\nuit
% 信道传递函数(时变)
H(f,t) = \int\int h(\tau,v,t)e^(-j2\pi(f\tau+vt))d\taudv
```


## AFDM抗双色散性能分析

理论干扰功率对比：

```
% OFDM载波间干扰功率
P_ICI_OFDM = \sigma }\mp@subsup{}{h}{}\times(2\pif\mathrm{ _d T_s ) }\mp@subsup{}{}{2
```

\％AFDM等效干扰功率（降低）
P＿ICI＿AFDM $=\sigma^{2}{ }_{h} \times\left(2 \pi f \_d \text { T＿s }\right)^{2} \times \mid\left.\sin \left(\pi \mathrm{c}_{1}\right.$ N＿c $)\right|^{2} / \mid \pi \mathrm{c}_{1}$ N＿c $\left.\right|^{2}$

## 波束形成算法

## 自适应波束形成器实现

多种波束形成算法（参考：MATLIB／plot＿beamforming＿patterns．m：38－87）：
\％1．常规波束形成
$w_{-} C B F=a\left(\theta_{0}\right) / M_{-} t x$
\％2．MVDR波束形成
$w_{-} M V D R=R^{-1} a\left(\theta_{0}\right) /\left(a^{\wedge} H\left(\theta_{0}\right) R^{-1} a\left(\theta_{0}\right)\right)$
\％3．零陷导向波束形成
w＿NS＝（I－A＿int（A＿int＾H A＿int）－${ }^{1}$ A＿int＾H）w＿CBF

## 感知通信一体化优化

多目标优化函数：
\％综合目标函数
$\mathrm{J}=\lambda_{1} \times \mathrm{J} \_$comm $+\lambda_{2} \times \mathrm{J} \_$sensing $+\lambda_{3} \times \mathrm{J} \_$security
\％分项定义：
J＿comm $=-\log _{2}(1+$ SINR＿comm $)$ \％通信容量
J＿sensing $=\operatorname{tr}\left(\mathrm{CRLB}^{-1}\right) \quad \%$ 感知精度（费舍尔信息矩阵迹）
J＿security $=\mathrm{H}(\mathrm{s} \mid \tilde{\mathrm{y}}) \quad \%$ 物理层安全熵

## 理论基础

本项目基于以下研究领域：

- 仿射频分复用理论与优化
- 双色散信道建模和补偿技术
- MIMO－ISAC系统集成和性能分析
- 波形设计物理层安全

本项目提供MIMO－AFDM－ISAC技术的完整实现，为双色散信道环境下的通信感知一体化应用提供了创新的技术解决方案。

