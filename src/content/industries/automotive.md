---
order: 4
title: 智能汽车
label: AUTOMOTIVE
description: 支撑中央计算与区域控制协同，复用已有汽车软件资产，隔离智能负载与关键控制。
interfaces: AUTOSAR 兼容 · SOME/IP · CAN
heading: 智能汽车：中央计算与区域控制协同
summary: 面向中央与区域控制器的混合部署，复用已有汽车软件资产，以接口兼容、存量系统承接和分区调度协调高算力应用与关键车控，减少跨控制器集成及量产风险。
recommendationsDescription: 以下为围绕本行业任务的推荐组合；具体接口、硬件适配与验证范围按项目确定，不代表兼容性或认证结论。
recommendations:
  - product: os
    reason: 衔接中央计算与区域控制，按车型适配汽车软件接口。
  - product: hypervisor
    reason: 配置车控与智能负载的分区及设备资源，在满足迁移前提时承接存量系统。
  - product: scheduling
    reason: 联合配置分区和车控任务，分析高算力负载对关键车控时序的影响。
  - product: safety-assurance
    reason: 追溯系统迁移及配置变更对功能安全的影响，整理对应验证证据。
---

<section class="detail-section" aria-labelledby="benefits-title">

<h2 id="benefits-title">应用价值</h2>

<div class="detail-benefits">

- 支撑中央计算与区域控制整合，减少跨控制器重复开发。
- 通过接口兼容与旧系统承接，复用已有汽车软件资产。
- 联合优化分区与任务调度，减少智能负载对关键车控的干扰。

</div>

</section>

<section class="detail-section" aria-labelledby="runtime-title">

<h2 id="runtime-title">运行架构</h2>

<dl class="detail-runtime">
  <div><dt>Linux</dt><dd>承载高算力服务与应用。</dd></div>
  <div><dt>Zephyr</dt><dd>承载区域与设备控制。</dd></div>
  <div><dt>Hypervisor</dt><dd>提供任务分区与设备分配。</dd></div>
</dl>

<p class="detail-hardware"><strong>硬件 / BSP</strong><span>车载硬件与 BSP，覆盖中央 / 区域控制器、车规 SoC / MCU、传感 I/O 与车载网络。</span></p>

</section>

<section class="detail-section" aria-labelledby="capabilities-title">

<h2 id="capabilities-title">关键能力与行业接口</h2>

<div class="detail-list">

- 支持混合关键任务隔离、故障处置，以及中央计算与区域控制协同。
- 通过旧硬件兼容层承接存量系统，联合优化分区与控制任务时序。

</div>

<div class="detail-interface">

### 接口与生态

提供 POSIX / AUTOSAR / VxWorks 兼容接口，对接 SOME/IP 与 IP / CAN / Ethernet；DDS / ROS 2 按车型场景接入。

</div>

</section>

<section class="detail-section" aria-labelledby="delivery-title">

<h2 id="delivery-title">交付与验证</h2>

<div class="detail-delivery">

<div>

### 交付内容

<div class="detail-list">

- 车载镜像与 BSP。
- 接口适配与调度配置。

</div>

</div>

<div>

### 验证重点

<div class="detail-list">

- 验证系统迁移、启动恢复、接口互通与时序。
- 分析系统变更对功能安全的影响。

</div>

</div>

</div>

</section>

<section class="detail-section" aria-labelledby="agentic-title">

<h2 id="agentic-title">AI 辅助与安全边界</h2>

<div class="section-description">

座舱与维保 Agent 辅助语音编排、故障解释和维修建议；智能体与驾驶安全控制分开部署和验证。

</div>

<div class="detail-boundary">

原系统迁移以指令架构兼容、虚拟硬件匹配为前提。DDS / ROS 2 按车型场景接入，智能体与驾驶安全控制分开部署和验证。

</div>

</section>
