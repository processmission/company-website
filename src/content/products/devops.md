---
order: 3
title: "DevOps 平台"
group: "工程平台"
category: "研发验证 · 部署运维"
description: "贯通配置、构建、仿真、实机验证与现场版本，让问题更易复现，让交付更可追溯。"
features:
  - "QEMU / 板卡 / HIL 验证"
  - "统一工程基线与自动回归"
  - "受控发布、设备管理与诊断"
summary: "以版本化工程基线连接配置、构建、仿真、实机验证与现场运维，让交付结果与问题修复可复现、可追溯。"
---

<section class="detail-section" aria-labelledby="positioning-title">

<h2 id="positioning-title">产品定位</h2>

<div class="section-description">

DevOps 平台承接研发验证与部署运维流程，统一管理配置、工具链、依赖、构建产物、测试结果及设备版本。调度优化工具生成和选择候选方案，DevOps 负责执行构建、部署、测试及结果归档。

</div>

</section>

<section class="detail-section" aria-labelledby="capabilities-title">

<h2 id="capabilities-title">核心能力</h2>

<div class="detail-list">

- 从硬件 / BSP、系统配置、依赖和源代码形成版本锁定的构建基线，执行镜像构建、部署编排与制品管理。
- 编排 QEMU 本地或云端仿真、板卡与 HIL 验证，采集结果，支持故障注入、问题复现及自动回归。
- 连接签名发布、分批更新、状态与版本分布管理，关联日志追踪、修复、回退与恢复记录。
- 开发 Agent 辅助编码和调试，测试 Agent 编排实验并汇总复现路径，运维 Agent 关联告警、日志与版本并提出处置建议。

</div>

</section>

<section class="detail-section" aria-labelledby="adaptation-title">

<h2 id="adaptation-title">接口与适配</h2>

<div class="detail-list">

- 接入项目 SDK / BSP、IDE、构建系统与依赖配置，保留目标硬件和工具链版本。
- 对接 QEMU、目标板卡和 HIL 环境，分别记录虚拟与实机验证条件。
- 将调度候选方案、认证证据、设备版本与审计记录关联到工程基线；Linux 与 Zephyr 目标产物分别构建、配套发布与诊断。

</div>

</section>

<section class="detail-section" aria-labelledby="delivery-title">

<h2 id="delivery-title">交付与验证</h2>

<div class="detail-delivery">
<div>

### 交付内容

<div class="detail-list">

- 可复现镜像、构建产物及对应配置、工具链和依赖记录。
- 版本化测试结果、自动回归记录与问题复现路径。
- 受控现场版本、设备版本分布，以及可追溯的问题、修复和恢复记录。

</div>

</div>
<div>

### 验证重点

<div class="detail-list">

- 依据锁定的配置、依赖与工具链复现候选镜像，关联测试结果和制品版本。
- 在对应 QEMU、板卡或 HIL 环境复测问题与修复，保留环境及回归结果。
- 验证项目所用发布、更新、回退与恢复路径，关联设备状态和版本。

</div>

</div>
</div>

</section>

<section class="detail-section" aria-labelledby="boundary-title">

<h2 id="boundary-title">适用范围与限制</h2>

<div class="detail-boundary">

仿真、板卡和 HIL 的验证条件需分别记录；虚拟目标结果不能替代目标硬件上的时序验证。Agent 输出用于辅助开发、实验编排与处置建议，不代替安全关键控制或项目审核。具体设备、发布策略和验证范围按项目配置。

</div>

</section>

<section class="detail-section" aria-labelledby="related-title">

<h2 id="related-title">相关架构与方案</h2>

<div class="detail-list related-links">

- [了解运行系统与工程工具的连接](/architecture/)
- [查看候选方案生成与调度优化](/products/scheduling/)
- [查看版本化证据与安全论证](/products/safety-assurance/)
- [具身机器人的双系统集成与验证](/industries/robotics/)

</div>

</section>
