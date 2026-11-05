---
order: 2
title: "Hypervisor"
group: "系统软件"
category: "分区隔离 · 存量系统承接"
description: "统一配置分区资源与执行时序，承接满足指令架构与虚拟硬件条件的存量系统，支撑混合部署。"
features:
  - "核、内存、设备与中断配置"
  - "分区调度与跨层观测"
  - "Guest 管理、隔离与恢复"
summary: "为 Linux、Zephyr 与存量系统提供可观测、可配置的分区执行基础，统一管理资源、隔离边界与执行时序。"
---

<section class="detail-section" aria-labelledby="positioning-title">

<h2 id="positioning-title">产品定位</h2>

<div class="section-description">

Hypervisor 是独立的系统软件产品，用于混合关键任务部署与存量系统承接。它管理分区资源和执行时序，Guest 操作系统继续调度分区内部任务，并可与调度确定性优化平台联合分析跨层时序。

</div>

</section>

<section class="detail-section" aria-labelledby="capabilities-title">

<h2 id="capabilities-title">核心能力</h2>

<div class="detail-list">

- 统一配置分区的核、内存与设备归属，以及中断路由和隔离边界。
- 开放时间预算、分区调度表、分区切换与策略参数入口，支持分区调度和 Guest 内部任务调度联合优化。
- 定制分区切换、虚拟中断等观测点，关联 Guest 内部事件，区分分区等待、Guest 调度与中断处理延迟。
- 提供内存隔离、设备直通或虚拟设备配置，按策略执行分区启动、重启与恢复；独立 Monitor 可监测 Guest 状态并触发处置。

</div>

</section>

<section class="detail-section" aria-labelledby="adaptation-title">

<h2 id="adaptation-title">接口与适配</h2>

<div class="detail-list">

- 对接目标硬件 / BSP 的 CPU、DRAM、IOMMU、中断控制器与外设，结合 SoC 能力及分区配置确定设备映射和隔离方式。
- 通过旧硬件兼容层适配设备树、设备接口与启动环境，为存量系统提供匹配的虚拟平台。
- 在指令架构兼容且虚拟硬件匹配时，可复用原系统镜像与驱动。
- 与 Guest 观测、调参入口及 DevOps 构建测试流程衔接，将分区与 Guest 配置绑定到同一实验版本。

</div>

</section>

<section class="detail-section" aria-labelledby="delivery-title">

<h2 id="delivery-title">交付与验证</h2>

<div class="detail-delivery">
<div>

### 交付内容

<div class="detail-list">

- 目标硬件上的 Hypervisor 运行基线与 BSP 适配。
- 核、内存、设备、中断及分区调度配置，以及项目所需的虚拟硬件适配。
- Guest 启动与恢复策略配置，以及隔离、迁移和关键时序验证记录。

</div>

</div>
<div>

### 验证重点

<div class="detail-list">

- 结合目标 SoC、IOMMU 和设备配置验证内存、设备与中断隔离效果。
- 验证 Guest 启动、重启与恢复行为，以及独立 Monitor 触发的处置路径。
- 比较分区等待、Guest 任务执行与中断延迟，分析混合负载下的时序干扰。
- 存量系统迁移需验证匹配的虚拟硬件、原驱动行为以及迁移前后的功能和时序。

</div>

</div>
</div>

</section>

<section class="detail-section" aria-labelledby="boundary-title">

<h2 id="boundary-title">适用范围与限制</h2>

<div class="detail-boundary">

隔离效果与恢复行为需要结合目标 SoC、外设和分区配置验证，不能仅凭虚拟化架构推定。原镜像与驱动无需修改的迁移以指令架构兼容、虚拟硬件匹配为前提；安全与认证范围按项目定义。

</div>

</section>

<section class="detail-section" aria-labelledby="related-title">

<h2 id="related-title">相关架构与方案</h2>

<div class="detail-list related-links">

- [了解分区与运行时技术架构](../../architecture/#hypervisor)
- [查看分区与 Guest 联合调度优化](../../products/scheduling/)
- [航空机载的分区与隔离应用](../../industries/avionics/)
- [智能汽车的混合部署与系统承接](../../industries/automotive/)
- [工业边缘的存量系统部署](../../industries/industrial/)

</div>

</section>
