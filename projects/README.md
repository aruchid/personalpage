# 项目目录与标签分析

下列项目基于 `/projects` 实际目录与站点元数据（标题、分类、概述）重新整理。每条包含：目录名（便于定位）、展示标题、标签与一句话简介。

统一标签集合（控制在适度规模，保证互相覆盖）：
- Computer Vision, Medical Imaging, Hyperspectral Imaging, Sensor Fusion, Robotics, Optimization & Planning, Reinforcement Learning, Distributed Systems, Edge & Embedded, Industrial Inspection, Signal & Optics, NLP & Data

1. `m2-beam-quality-analysis` — M2 Beam Quality Analysis
   - 标签: Signal & Optics, Industrial Inspection
   - 概述: This project provides a practical toolkit for laser beam quality characterization centered on the M² factor following ISO 11146 guidelines. It supports automated beam waist detection, second-moment diameter calculations, and multi-position propagation fitting with robust outlier handling. The pipeline integrates camera calibration, background subtraction, and centroid/ellipse-based profiling to improve accuracy for real-world benches. Results are summarized into interactive plots and configurable PDF/CSV reports suitable for lab documentation or production quality gates. The design emphasizes repeatability and traceability: each run captures acquisition parameters, device identifiers, and calibration versions to ensure audits are straightforward. The software targets both R&D experiments and inline inspections, making it easy to standardize M² evaluation across teams and devices.

2. `langchain-bmp-db-extraction` — Langchain BMP DB Extraction
   - 标签: NLP & Data, Distributed Systems
   - 概述: A document ingestion and knowledge extraction system that transforms heterogeneous literature into a curated Bone Morphogenetic Protein (BMP) knowledge base. It uses LangChain to orchestrate parsing, section-aware chunking, citation retention, and multi-hop question answering to resolve ambiguous references. Custom entity recognizers and relation extractors map proteins, pathways, measurements, and experimental contexts into a normalized schema with provenance attached at the field level. The pipeline scales horizontally for large corpora, with queue-based batching, vector search indexing, and retryable tasks. Quality gates include schema conformance checks, leakage detection, and human-in-the-loop spot audits. The resulting database facilitates downstream analytics, such as trend analysis or cross-study comparisons, while keeping links back to original passages for verification.

3. `imu-mujoco-motion-tracking` — IMU Mujoco Motion Tracking
   - 标签: Sensor Fusion, Robotics
   - 概述: A simulated and partially real-to-sim motion tracking stack that fuses inertial measurements to estimate pose and visualize dynamics in MuJoCo. The system implements a modular extended/unscented Kalman filter with carefully tuned process and measurement models for gyroscopes and accelerometers. It supports bias estimation, gravity alignment, and zero-velocity updates for drift mitigation. Synthetic datasets generated in MuJoCo are used to benchmark filter stability and latency, while optional serial or ROS inputs can drive the same pipeline using physical IMUs. Visual overlays show pose trajectories, uncertainty ellipsoids, and error metrics versus ground truth, enabling rapid iteration on filter parameters and sensor placements. The codebase is organized for reproducible experiments and easy algorithm swapping.

4. `game-theory-control-optimization` — Game Theory Control Optimization
   - 标签: Optimization & Planning, Robotics
   - 概述: A framework for designing controllers under strategic interactions, where multiple agents or objectives negotiate trade-offs. It provides Nash and Stackelberg formulations, Pareto-front exploration, and constraint handling across state, input, and safety envelopes. The optimization layer combines convex relaxations with nonlinear solvers and warm-start heuristics to reach good solutions quickly. Typical applications include multi-robot coordination, shared resources, and human-in-the-loop assistance. The library includes example environments, performance benchmarks, and visualization of equilibria and sensitivity analyses. Emphasis is placed on interpretability: users can inspect payoff structures, dual variables, and constraint activity to understand why a particular operating point emerges, and how small changes in incentives or penalties shift system behavior.

5. `game-player-survival-analysis` — Game Player Survival Analysis
   - 标签: NLP & Data, Optimization & Planning
   - 概述: This project applies survival analysis techniques to study player retention, churn risk, and lifecycle dynamics in games. It combines Kaplan–Meier curves, Cox proportional hazards models, and modern gradient boosting survival methods to evaluate how events, content updates, or monetization features influence session longevity. Feature engineering includes time-varying covariates, cohort segmentation, and natural language embeddings of patch notes or community posts to encode sentiment and expectations. The pipeline addresses censoring, competing risks, and seasonality, producing interpretable reports for product decisions. Results are actionable: identify high-value cohorts, forecast churn windows, and prioritize interventions such as targeted offers or content pacing. A flexible evaluation harness supports offline policy comparison and A/B test monitoring.

6. `electromagnetic-radiation-detection` — Electromagnetic Radiation Detection
   - 标签: Signal & Optics, Edge & Embedded
   - 概述: A signal processing toolkit for low-noise detection of electromagnetic radiation in embedded systems. It includes streaming filters, adaptive baselines, and Kalman-based smoothing to stabilize counts or analog readings under varying environmental conditions. Sensor drivers expose calibrated measurements, while diagnostics visualize spectra, temporal patterns, and detector health. The architecture supports fixed-point implementations for MCUs and vectorized paths for Linux-based edge devices. Emphasis is placed on robustness: watchdogs, range checks, and self-test routines catch hardware anomalies early. Developers can simulate fault conditions and tune parameters using recorded traces. The system is designed for continuous operation with minimal power consumption and clear APIs for integration into larger monitoring or control platforms.

7. `dual-camera-real-time-stitching` — Dual Camera Real Time Stitching
   - 标签: Computer Vision, Industrial Inspection
   - 概述: A real-time panorama stitching pipeline optimized for dual, fixed-lens cameras in industrial or retail settings. It couples fast feature extraction with robust correspondence filtering and a smooth warping/blending stage to minimize visible seams under changing exposure. Hardware-aware optimizations maintain low latency on commodity GPUs or edge accelerators. The system supports online calibration refinement, rolling shutter compensation, and optional IMU hints to improve stability in the presence of vibration. Diagnostics display alignment quality and parallax stress, allowing operators to adjust mounts or fields of view. Typical use cases include wide-aisle monitoring, conveyor coverage, and shelf analytics, where consistent geometry and high uptime are critical.

8. `dental-segmentation` — Dental Segmentation
   - 标签: Medical Imaging, Computer Vision
   - 概述: A clinically oriented dental segmentation pipeline that leverages transformer-based architectures (e.g., SegFormer variants) to delineate teeth, gingiva, and surrounding structures from intraoral or panoramic images. The project focuses on robust generalization across devices and acquisition protocols via augmentations, domain randomization, and test-time adaptation. Post-processing enforces anatomical plausibility and separates touching teeth using learned distance maps or watershed priors. The toolkit provides model cards, uncertainty maps, and visual overlays for chairside review, plus export to standard formats for downstream CAD/CAM or treatment planning. It aims to reduce manual annotation burden, accelerate diagnosis, and improve measurement consistency across clinicians and clinics.

9. `depression-audio-classifier` — Depression Audio Classifier
   - 标签: NLP & Data, Distributed Systems
   - 概述: An audio-based mental health screening research tool that detects depression-related biomarkers from speech. It extracts prosodic, spectral, and temporal features alongside learned embeddings from self-supervised audio models. The system handles noisy, real-world recordings with voice activity detection, enhancement, and speaker normalization. Model training emphasizes fairness and calibration, with subgroup analyses and confidence reporting to avoid overreach. A scalable data pipeline manages consented datasets, anonymization, and feature stores for reproducibility. The project is intended for research and triage support, not diagnosis, and includes clear disclaimers and human-in-the-loop review workflows to ensure responsible use and minimize harm.

10. `deepfake-face-detection` — Deepfake Face Detection
    - 标签: Computer Vision, Industrial Inspection
    - 概述: A deep learning toolkit to detect manipulated facial media across common generation and editing pipelines. It combines spatial cues (e.g., blending artifacts, color inconsistencies) with temporal signatures such as micro-expression dynamics and eye-gaze patterns. The system supports multi-backbone ensembles and test-time augmentations to improve generalization to unseen generators. Datasets are curated with strict train/test separation and post-processing to simulate platform transcodes. Outputs include calibrated confidence, localization heatmaps, and explanation guides for operators. The code integrates with MLOps tooling for dataset versioning, active learning, and periodic drift checks to keep models effective as generative methods evolve.

11. `box-palletizing-system` — Box Palletizing System
    - 标签: Robotics, Optimization & Planning
    - 概述: An automated palletizing planner and execution stack for boxes of varying dimensions, weights, and constraints. It formulates stable, efficient layer patterns subject to center-of-mass and stackability rules, balancing fill rate with handling safety. A vision module verifies dimensions and detects damage, while trajectory generation produces collision-free, time-parameterized paths for robot arms or gantries. The system supports multi-pallet scheduling, exception handling for mispicks, and recovery strategies. Performance dashboards track throughput, error rates, and cycle time distributions. Configuration files capture SKU catalogs, pallet templates, and grasp strategies, making the deployment portable across facilities and robot models.

12. `sam-road-segmentation` — SAM Road Segmentation
    - 标签: Computer Vision, Optimization & Planning
    - 概述: A road layout extraction pipeline built around the Segment Anything Model (SAM) paired with task-specific refinement. Initial masks are generated using prompt strategies and then consolidated into a topological representation of lanes and drivable areas. Graph-based post-processing removes spurious detections, enforces continuity, and aligns with map priors where available. The system supports diverse sensors and viewpoints, including aerial, roadside, and vehicle-mounted cameras. Evaluation focuses on topology metrics and connectivity rather than only pixel IoU, aligning results with downstream planning needs. The code includes profiling tools to reach real-time or near-real-time performance on embedded accelerators.

13. `TransReconstruct-SegTransformer-Neutrino-Event` — SegTransformer Neutrino Event
    - 标签: Distributed Systems, Computer Vision
    - 概述: A reconstruction framework for neutrino experiments using SegTransformer-like models to identify interaction vertices and estimate particle directions from detector readouts. The pipeline manages high-throughput data ingestion, windowing, and calibration, then fuses spatial-temporal cues to produce event candidates with uncertainty estimates. Special attention is paid to domain-specific artifacts, noise patterns, and synchronization between subdetectors. Distributed training recipes enable scale-out on clusters, while experiment logs capture hyperparameters and detector conditions for later cross-runs analysis. The output format is compatible with downstream physics analyses, including cut flows and significance calculations, with transparent provenance for each reconstruction step.

14. `parallel-computing-correlation-analysis` — Parallel Computing Correlation Analysis
    - 标签: Distributed Systems, NLP & Data
    - 概述: A high-performance correlation analysis suite designed to process large tables and time series with parallel and vectorized execution. It implements memory-efficient tiling, approximate sketches for early pruning, and streaming reducers to operate within bounded resources. Users can compute correlation matrices, partial correlations, and lag-aware measures at scale, with automatic handling of missingness and type heterogeneity. Integrations with columnar storage and distributed schedulers enable near-linear scaling on commodity clusters. The library surfaces clear diagnostics and effect-size interpretations, helping analysts avoid spurious relationships and p-hacking. Benchmarks and reproducible notebooks illustrate performance trade-offs and accuracy settings for different data regimes.

15. `MADDPG` — MADDPG
    - 标签: Reinforcement Learning, Optimization & Planning
    - 概述: An implementation of Multi-Agent Deep Deterministic Policy Gradients with prioritized replay and stabilized training tricks. The codebase provides modular environments, reward shaping templates, and curriculum learning hooks for complex coordination tasks. It includes population-based training options, target network smoothing, and noise scheduling to encourage exploration without destabilization. Logging captures episode returns, diversity metrics, and inter-agent credit assignment signals to diagnose learning pathologies. Trained policies can be exported for evaluation in external simulators or deployed in simplified real-world setups. Emphasis is placed on clarity and reproducibility so that researchers can extend components and fairly compare ablations.

16. `deep-learning-super-resolution` — Deep Learning Super Resolution
    - 标签: Computer Vision, Signal & Optics
    - 概述: A set of models and utilities for super-resolution and accelerated reconstruction, including applications to Fourier single-pixel imaging. The pipeline covers training data synthesis, physics-informed losses, and plug-and-play denoisers to reduce artifacts. Runtime paths exploit FFT optimizations and mixed precision to meet tight latency budgets. Validation emphasizes perceptual metrics, task-driven scores, and robustness to sensor nonidealities. The project demonstrates how deep priors can compensate for sparse or multiplexed measurements, enabling higher-resolution results from modest hardware. Clear interfaces allow swapping backbone architectures and reconstruction operators to adapt to different imaging modalities or bandwidth constraints.

17. `vision-language-path-optimization` — Vision Language Path Optimization
    - 标签: Optimization & Planning, Computer Vision
    - 概述: A research prototype that uses vision-language models to interpret scene goals, constraints, and semantic affordances, and then converts them into path planning objectives. It links language-derived constraints to geometric planners, letting users specify high-level instructions such as “avoid crowded aisles” or “prioritize fire exits.” The system supports cost-map fusion from detections, maps, and textual guidance. Safety constraints and explainability are key: the planner returns annotated paths showing which phrases influenced which segments. Benchmarks measure success rates and instruction fidelity across environments. The aim is to bridge human-intuitive commands with formal optimization to reduce friction in deploying autonomous systems in semantically rich spaces.

18. `brushless-motor-drive-system` — Brushless Motor Drive System
    - 标签: Edge & Embedded, Robotics
    - 概述: A BLDC motor control stack targeting STM32-class MCUs with dual-loop PID (current and speed) and optional field-oriented control. It includes startup routines, sensor/sensorless modes, and safe fault handling for overcurrent and thermal limits. The firmware is structured for clarity, with HAL abstractions, ISR timing guards, and unit tests against hardware-in-the-loop traces. A companion PC tool visualizes waveforms, BEMF estimates, and controller states for tuning. Emphasis is on deterministic timing and reliable commutation under load, making the system suitable for educational labs, robotics projects, and light industrial applications. Porting guides help adapt to other microcontrollers.

19. `rk3588-algorithm-deployment-platform` — RK3588 Algorithm Deployment Platform
    - 标签: Edge & Embedded, Distributed Systems
    - 概述: A deployment framework tailored for Rockchip RK3588 SoCs, focusing on computer vision and signal processing models. It packages cross-compilation, hardware acceleration (NPU/GPU), and runtime orchestration into a repeatable workflow. Model converters handle quantization and operator mapping, while profiling tools reveal bottlenecks across memory, compute, and IO. The platform supports OTA updates, health checks, and sandboxed rollbacks to protect field devices. A plugin system makes it easy to integrate new models with standardized IO contracts. Example apps demonstrate end-to-end pipelines from camera capture to visualization, enabling teams to move quickly from prototypes to robust edge deployments.

20. `shelf-image-stitching-system` — Shelf Image Stitching System
   - 标签: Computer Vision, Industrial Inspection
   - 概述: A production-oriented panorama and analytics pipeline for retail shelves. It aligns overlapping images from fixed or mobile cameras into consistent, high-resolution mosaics and then runs product and price tag recognition. The system addresses real-world complications such as lens distortion, rolling shutter, occlusion, and lighting variations with calibration, exposure correction, and robust blending. Quality metrics and alerts help operators quickly identify misalignments or missing coverage. Results feed into SKU counting, planogram compliance checks, and restocking recommendations. The architecture is modular, allowing swapping detectors and OCR engines to meet performance, cost, or privacy requirements across deployments.

21. `acupuncture-point-location` — Acupuncture Point Location
   - 标签: Medical Imaging, Computer Vision
   - 概述: A deep learning system for localizing acupuncture points using visible and possibly thermal or depth modalities. The model predicts anatomically plausible keypoints with confidence scores and uncertainty estimates, supporting clinician review. Training focuses on cross-subject generalization with careful landmark definitions and inter-annotator agreement analysis. The interface overlays guidance onto images or live video and can export standardized coordinates. Ethical considerations include privacy safeguards and clear scope: assisting practitioners rather than replacing clinical judgment. The project aims to reduce variability in point placement and provide educational feedback for trainees through visual explanations and comparative analytics.

22. `xray-detection` — Xray Detection
    - 标签: Industrial Inspection, Edge & Embedded
    - 概述: An industrial X-ray inspection pipeline optimized for embedded inference using OpenVINO and similar toolchains. It segments and detects defects or foreign objects in materials or packaged goods while accounting for noise, scatter, and contrast limitations. Preprocessing includes flat-field correction and denoising; post-processing provides dimensional measurements and severity estimates. The system supports real-time operation with watchdogs, logging, and secure configuration. Model and calibration management ensure traceable, repeatable results across devices. Dashboards present pass/fail rates, defect taxonomies, and actionable trends to guide process improvements and maintenance.

23. `laser-line-scan-camera` — Laser Line Scan Camera
    - 标签: Signal & Optics, Edge & Embedded
    - 概述: A reference implementation for integrating a laser line source with a line-scan camera to reconstruct profiles or surface topography. It handles synchronization, exposure control, and geometric calibration to convert line positions into physical measurements. Real-time processing extracts subpixel peaks, rejects spurious reflections, and estimates confidence. The design targets edge devices with efficient memory pipelines and optional hardware acceleration. Typical applications include dimensional inspection, weld seam analysis, and conveyor-based sorting. Utilities are provided for alignment, focus assessment, and routine calibration checks to maintain accuracy over long deployments.

24. `hyperspectral-seed-sorting-device` — Hyperspectral Seed Sorting Device
   - 标签: Hyperspectral Imaging, Industrial Inspection
   - 概述: An integrated device concept that combines hyperspectral imaging with machine learning to assess seed quality and perform on-the-fly sorting. The optical path and illumination are designed for consistent spectra, while calibration converts raw sensor data into reflectance. Models classify defects, moisture levels, or varietal differences, and decisions trigger actuators to divert seeds in real time. The software stack includes throughput-optimized buffers, health monitoring, and a UI for operators to set thresholds and review samples. Emphasis is placed on explainability and traceability so that agronomists can understand classification drivers and audit batches.

25. `laser-beam-analyzer` — Laser Beam Analyzer
   - 标签: Signal & Optics, Computer Vision
   - 概述: A general-purpose laser beam analysis toolkit that measures beam size, divergence, ellipticity, and propagation parameters from camera or sensor inputs. It provides multiple profiling methods (second-moment, knife-edge emulation, iso-intensity contours) and integrates device calibration and background correction. Time-series tools track stability and mode hopping, while reporting exports publication-ready figures. The system complements the M² project but emphasizes broader metrics and flexible hardware support. Interfaces and configuration files make it accessible for both research labs and production test stands, with reproducible pipelines for comparison across devices and sessions.

26. `stereo-vision-ranging` — Stereo Vision Ranging
    - 标签: Computer Vision, Signal & Optics
    - 概述: A stereo depth estimation system targeting automotive or mobile robotics scenarios. It implements rectification, efficient correspondence search, and subpixel disparity refinement to obtain accurate ranges with controlled latency. Domain-specific priors such as road plane constraints and epipolar filtering improve robustness. The code supports dataset evaluation against ground truth and includes metrics beyond raw error, such as outlier rates and completeness. Visualization utilities render disparity maps, confidence, and 3D point clouds for debugging and demos. Options are provided to accelerate on GPUs or embedded platforms without sacrificing determinism.

27. `multi-agent-charging-system` — Multi Agent Charging System
    - 标签: Multi-Agent Systems, Optimization & Planning
    - 概述: A coordination framework for scheduling the charging of fleets—such as robots, drones, or electric vehicles—under power and availability constraints. Agents negotiate time slots and charging rates to optimize fleet readiness, cost, and infrastructure utilization. The system includes predictive models for demand and travel time, and supports priority overrides for mission-critical agents. Optimization runs in rolling horizons with resilience to communication delays and dropouts. Dashboards present queue lengths, state-of-charge distributions, and SLA adherence. APIs integrate with dispatching systems to close the loop between operations and energy management.

28. `RTKinertion` — RTKinertion
    - 标签: Sensor Fusion, Robotics
    - 概述: A real-time inertial tracking toolkit focused on kinematics estimation for limbs or tools. It fuses IMU data with simple biomechanical constraints to reduce drift and provide smooth motion estimates for interactive applications. The architecture supports wired or wireless sensors, time synchronization, and per-sensor calibration. Visualizations show joint angles and trajectories, with latency metrics to guide optimizations. The code is designed to be portable and extensible, making it straightforward to integrate new sensor modules or export data to animation and analytics software. Example configurations target motion capture and rehabilitation scenarios.

29. `specim-hyperspectral-segmentation` — SPECIM Hyperspectral Segmentation
    - 标签: Hyperspectral Imaging, Computer Vision
    - 概述: A GPU-accelerated segmentation pipeline tailored to SPECIM FX series cameras. It handles sensor-specific calibration, band selection, and dimensionality reduction to create compact yet informative feature sets. Spatial-spectral models separate materials or defects at high throughput, while uncertainty estimates help flag ambiguous regions for review. The project demonstrates end-to-end performance from acquisition to visualization, including memory-optimized buffers for sustained capture. Exported results include masks, spectra summaries, and statistics for process monitoring or scientific analysis.

30. `stereo-line-matching` — Stereo Line Matching
    - 标签: Computer Vision, Optimization & Planning
    - 概述: A robust stereo line feature matching system that improves depth estimation in texture-poor environments. It detects reliable line segments, enforces geometric consistency, and refines correspondences with local optimization. The approach complements point-based methods and can be fused for hybrid matching. Evaluations demonstrate gains in structural scenes such as corridors, facades, and industrial interiors. The implementation exposes tunable parameters and diagnostics to ease deployment and domain adaptation. Downstream modules benefit from denser and more stable geometry in challenging areas.

31. `trainsphere` — TrainSphere
    - 标签: Distributed Systems, NLP & Data
    - 概述: A distributed deep learning training platform that orchestrates experiments across heterogeneous clusters. It supports elastic scaling, spot-instance tolerance, and checkpoint-aware scheduling. Users define experiments declaratively; the platform handles container builds, dataset staging, and metric collection. Integrations with popular frameworks make it easy to run standard recipes while capturing lineage for models and data. Observability includes timelines for throughput, GPU utilization, and communication overhead, enabling informed performance tuning. Guardrails and quotas prevent resource contention and promote fair sharing among teams.

32. `multi-modal-image-stitching` — Multi Modal Image Stitching
    - 标签: Computer Vision, Hyperspectral Imaging
    - 概述: A research codebase for stitching and fusing images from different sensing modalities, such as RGB, NIR, and hyperspectral bands. It explores modality-aware features, mutual information objectives, and learned alignment to handle appearance gaps. The pipeline can output both composite images and registered stacks for downstream analysis. Applications include remote sensing, agriculture, and material inspection where combining modalities reveals structures not visible in single channels. Tools are provided for evaluating registration accuracy and visualizing cross-modal consistency, helping practitioners select appropriate strategies for their data.

---

按标签分组（每个标签覆盖多个项目）：

- Computer Vision: `dual-camera-real-time-stitching`, `dental-segmentation`, `sam-road-segmentation`, `TransReconstruct-SegTransformer-Neutrino-Event`, `deep-learning-super-resolution`, `vision-language-path-optimization`, `shelf-image-stitching-system`, `acupuncture-point-location`, `laser-beam-analyzer`, `stereo-vision-ranging`, `stereo-line-matching`, `multi-modal-image-stitching`, `deepfake-face-detection`

- Medical Imaging: `dental-segmentation`, `acupuncture-point-location`

- Hyperspectral Imaging: `hyperspectral-seed-sorting-device`, `specim-hyperspectral-segmentation`, `multi-modal-image-stitching`

- Sensor Fusion: `imu-mujoco-motion-tracking`, `RTKinertion`

- Robotics: `imu-mujoco-motion-tracking`, `box-palletizing-system`, `brushless-motor-drive-system`, `game-theory-control-optimization`, `RTKinertion`

- Optimization & Planning: `game-theory-control-optimization`, `game-player-survival-analysis`, `box-palletizing-system`, `sam-road-segmentation`, `MADDPG`, `vision-language-path-optimization`, `multi-agent-charging-system`, `stereo-line-matching`

- Reinforcement Learning: `MADDPG`

- Distributed Systems: `langchain-bmp-db-extraction`, `TransReconstruct-SegTransformer-Neutrino-Event`, `parallel-computing-correlation-analysis`, `rk3588-algorithm-deployment-platform`, `trainsphere`, `depression-audio-classifier`

- Edge & Embedded: `electromagnetic-radiation-detection`, `brushless-motor-drive-system`, `rk3588-algorithm-deployment-platform`, `xray-detection`, `laser-line-scan-camera`

- Industrial Inspection: `m2-beam-quality-analysis`, `dual-camera-real-time-stitching`, `shelf-image-stitching-system`, `xray-detection`, `hyperspectral-seed-sorting-device`, `deepfake-face-detection`

- Signal & Optics: `m2-beam-quality-analysis`, `electromagnetic-radiation-detection`, `deep-learning-super-resolution`, `laser-line-scan-camera`, `laser-beam-analyzer`, `stereo-vision-ranging`

- NLP & Data: `langchain-bmp-db-extraction`, `parallel-computing-correlation-analysis`, `game-player-survival-analysis`, `trainsphere`, `depression-audio-classifier`

---

优秀项目分配（基于代表性、落地性与多样性）：
- `m2-beam-quality-analysis`: 光学计量落地成熟，覆盖实验与质检，报告完备。
- `shelf-image-stitching-system`: 工业与零售场景泛化强，实时性与稳定性兼顾。
- `dental-segmentation`: 临床导向清晰，模型与可视化闭环完整，可用于演示。
- `xray-detection`: 工业X射线检测链路齐全，嵌入式优化与质控可展示。
- `hyperspectral-seed-sorting-device`: 软硬一体方案，体现高光谱优势与可解释性。
- `rk3588-algorithm-deployment-platform`: 端侧部署能力突出，适合展示工程规模化交付。
- `stereo-vision-ranging`: 车载/机器人通用能力，指标与可视化易于理解。
- `trainsphere`: 分布式训练平台，展示工程体系化、可观测性与复现性。
- `vision-language-path-optimization`: 研究前沿示例，体现多模态与可解释规划。
- `langchain-bmp-db-extraction`: 数据智能+知识库构建，强调质量闸口与溯源。

分配建议：
- 面向业务/甲方演示：优先 `dual-camera-real-time-stitching`, `xray-detection`, `m2-beam-quality-analysis`, `rk3588-algorithm-deployment-platform`。
- 面向科研/评审：优先 `dental-segmentation`, `vision-language-path-optimization`, `hyperspectral-seed-sorting-device`。
- 面向平台/工程化：优先 `trainsphere`, `rk3588-algorithm-deployment-platform`, `langchain-bmp-db-extraction`。

---

说明:
- 每个项目分配 2–3 个精炼标签；每个标签下至少涵盖 2 个以上项目，避免“孤儿标签”。
- 若需将标签进一步拆分（如将 NLP 与 Audio 拆分），建议在新增至少 3 个项目后再扩展标签集合以避免稀疏。


