---
order: 4
title: 智能汽车
label: AUTOMOTIVE
description: 衔接中央计算与区域控制，复用汽车软件资产，隔离智能负载与关键车控。
interfaces: AUTOSAR 兼容 · SOME/IP · CAN
image: ../../assets/site/automotive.svg
imageAlt: 汽车中央计算、区域控制模块与车载网络的概念示意
heading: 智能汽车
summary: 面向中央与区域控制器的混合部署，以接口兼容和存量系统承接连接高算力应用与关键车控，减少跨控制器集成工作。
recommendationsDescription: 推荐组合仅供方案选型；接口、硬件适配与验证范围按项目确定，不代表兼容性或认证结论。
recommendations:
  - product: os
    reason: 按车型适配中央计算与区域控制接口。
  - product: hypervisor
    reason: 分区、设备资源与满足迁移前提的存量系统承接。
  - product: scheduling
    reason: 高算力负载与关键车控的联合时序分析。
  - product: safety-assurance
    reason: 系统变更的功能安全影响与验证证据追溯。
---

<section class="detail-section" aria-labelledby="benefits-title">

<h2 id="benefits-title">应用价值</h2>

复用已有汽车软件资产，减少重复开发，并通过分区与任务调度控制智能负载对车控的干扰。

</section>

<section class="detail-section" aria-labelledby="runtime-title">

<h2 id="runtime-title">运行架构</h2>

<dl class="detail-runtime">
  <div><dt>Linux</dt><dd>高算力服务与应用。</dd></div>
  <div><dt>Zephyr</dt><dd>区域与设备控制。</dd></div>
  <div><dt>Hypervisor</dt><dd>任务分区与设备分配。</dd></div>
</dl>

<p class="detail-hardware"><strong>硬件 / BSP</strong><span>中央 / 区域控制器、车规 SoC / MCU、传感 I/O 与车载网络。</span></p>

</section>

<section class="detail-section" aria-labelledby="capabilities-title">

<h2 id="capabilities-title">关键能力与行业接口</h2>

支持混合关键任务隔离与故障处置，通过旧硬件兼容层承接存量系统。

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

车载镜像与 BSP、接口适配和调度配置。

</div>

<div>

### 验证重点

验证系统迁移、启动恢复、接口互通及目标硬件时序，分析变更对功能安全的影响。

</div>

</div>

</section>

<section class="detail-section" aria-labelledby="agentic-title">

<h2 id="agentic-title">AI 辅助与安全边界</h2>

<div class="detail-boundary">

座舱与维保 Agent 辅助语音编排、故障解释和维修建议，与驾驶安全控制分开部署和验证，不替代安全控制。原系统迁移须满足指令架构兼容、虚拟硬件匹配；功能安全分析不代表已取得认证。

</div>

</section>
