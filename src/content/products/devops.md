---
order: 3
title: "DevOps 平台"
group: "工程平台"
category: "研发验证 · 部署运维"
description: "连接构建、仿真、实机验证与现场版本，保留可复现的工程记录。"
features:
  - "QEMU / 板卡 / HIL 验证"
  - "统一工程基线与自动回归"
  - "受控发布、设备管理与诊断"
summary: "用版本化工程基线贯通研发验证与部署运维，追溯交付结果和问题修复。"
image: "../../assets/site/devops.svg"
imageAlt: "版本化工程基线经构建、QEMU 与实机验证到受控部署，并通过运行反馈追溯版本的流程示意"
---

<section class="detail-section" aria-labelledby="positioning-title">

<h2 id="positioning-title">产品定位</h2>

<div class="section-description">

统一管理配置、工具链、依赖、制品、测试和设备版本。调度优化平台选择候选方案，DevOps 执行构建、部署、测试与归档。

</div>

</section>

<section class="detail-section" aria-labelledby="capabilities-title">

<h2 id="capabilities-title">核心能力</h2>

<div class="detail-list">

- 锁定源码、BSP、配置与依赖，构建镜像并管理制品。
- 编排本地 / 云端 QEMU、板卡和 HIL 测试，支持故障注入、复现与自动回归。
- 管理签名发布、分批更新、设备状态、日志与回退恢复记录。
- 开发、测试与运维 Agent 分别辅助编码调试、实验复现及告警处置建议。

</div>

</section>

<section class="detail-section" aria-labelledby="adaptation-title">

<h2 id="adaptation-title">接口与适配</h2>

<div class="detail-list">

- 接入 SDK / BSP、IDE、构建系统与测试环境，保留硬件、工具链及虚拟 / 实机条件。
- 关联调度候选、认证证据和审计记录；Linux、Zephyr 分别构建，配套发布与诊断。

</div>

</section>

<section class="detail-section" aria-labelledby="delivery-title">

<h2 id="delivery-title">交付与验证</h2>

<div class="detail-delivery">
<div>

### 交付内容

<div class="detail-list">

- 镜像、制品及配置依赖记录，配套测试、回归与复现路径。
- 受控现场版本、设备版本分布及问题修复记录。

</div>

</div>
<div>

### 验证重点

<div class="detail-list">

- 用锁定基线复建镜像，在对应 QEMU、板卡或 HIL 环境复测并归档。
- 验证项目所用发布、更新、回退和恢复路径，核对设备状态与版本。

</div>

</div>
</div>

</section>

<section class="detail-section" aria-labelledby="boundary-title">

<h2 id="boundary-title">适用范围与限制</h2>

<div class="detail-boundary">

虚拟目标结果不能替代目标硬件时序验证。Agent 仅辅助开发、实验和处置建议，不替代确定性安全控制或项目审核；设备、发布策略与验证范围按项目配置。

</div>

</section>

<section class="detail-section" aria-labelledby="related-title">

<h2 id="related-title">相关架构与方案</h2>

<div class="detail-list related-links">

- [了解运行系统与工程工具的连接](../../architecture/)
- [查看候选方案生成与调度优化](../../products/scheduling/)
- [查看版本化证据与安全论证](../../products/safety-assurance/)
- [具身机器人的双系统集成与验证](../../industries/robotics/)

</div>

</section>
