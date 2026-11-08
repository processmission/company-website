---
order: 2
title: "Hypervisor"
group: "系统软件"
category: "分区隔离 · 存量系统承接"
description: "配置分区资源与执行时序，隔离 Guest，并承接满足迁移条件的存量系统。"
features:
  - "核、内存、设备与中断配置"
  - "分区调度与跨层观测"
  - "Guest 管理、隔离与恢复"
summary: "独立的分区执行基础，为 Linux、Zephyr 与存量系统配置资源、隔离和恢复策略。"
image: "../../assets/site/hypervisor.svg"
imageAlt: "硬件平台上的独立 Guest 分区及计算、内存和 I/O 资源分配示意"
---

<section class="detail-section" aria-labelledby="positioning-title">

<h2 id="positioning-title">产品定位</h2>

<div class="section-description">

面向混合关键任务部署：Hypervisor 调度分区，Guest 调度内部任务；跨层时序可交由调度确定性优化平台联合分析。

</div>

</section>

<section class="detail-section" aria-labelledby="capabilities-title">

<h2 id="capabilities-title">核心能力</h2>

<div class="detail-list">

- 配置核、内存、设备归属及中断路由，提供设备直通或虚拟设备。
- 开放时间预算、分区调度表和切换参数；关联 Guest 事件，区分分区等待、任务调度与中断延迟。
- 按策略启动、重启与恢复分区，支持独立 Monitor 监测 Guest 并触发处置。

</div>

</section>

<section class="detail-section" aria-labelledby="adaptation-title">

<h2 id="adaptation-title">接口与适配</h2>

<div class="detail-list">

- 对接目标 BSP、CPU、DRAM、IOMMU、中断控制器与外设，确定设备映射和隔离方式。
- 通过旧硬件兼容层适配设备树、接口与启动环境，承接存量系统。
- 连接 Guest 观测、调参与 DevOps 流程，将跨层配置绑定到同一实验版本。

</div>

</section>

<section class="detail-section" aria-labelledby="delivery-title">

<h2 id="delivery-title">交付与验证</h2>

<div class="detail-delivery">
<div>

### 交付内容

<div class="detail-list">

- Hypervisor / BSP 运行基线、资源与调度配置、项目所需虚拟硬件适配。
- Guest 启动恢复策略及隔离、迁移、时序验证记录。

</div>

</div>
<div>

### 验证重点

<div class="detail-list">

- 在目标 SoC、IOMMU 和外设配置下验证内存、设备、中断隔离及 Monitor 恢复路径。
- 比较混合负载时序干扰；核对迁移后虚拟硬件、原驱动、功能和时序。

</div>

</div>
</div>

</section>

<section class="detail-section" aria-labelledby="boundary-title">

<h2 id="boundary-title">适用范围与限制</h2>

<div class="detail-boundary">

隔离与恢复效果须在目标硬件和分区配置下验证，不能由虚拟化架构推定。原镜像、驱动免修改复用须满足指令架构兼容和虚拟硬件匹配；安全与认证范围按项目定义。

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
