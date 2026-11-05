---
order: 1
title: 航空机载
label: AVIONICS
description: 面向机载计算与混合关键任务，结合分区隔离、健康监测与时序验证，支持适航证据准备。
interfaces: ARINC 653 / APEX · ARINC 429 / 664
heading: 航空机载：异构冗余与混合关键任务
summary: 面向飞控计算机与航电计算模块，结合独立异构部署、分区隔离与调度配置，控制型号研制中的故障风险，并为适航分析和衍生型号验证准备系统基线与证据。
recommendationsDescription: 以下为围绕本行业任务的推荐组合；具体接口、硬件适配与验证范围按项目确定，不代表兼容性或认证结论。
recommendations:
  - product: os
    reason: 承载航电服务与确定性控制，配套机载接口及目标 BSP。
  - product: hypervisor
    reason: 配置时间与空间分区、设备归属和健康监测边界。
  - product: scheduling
    reason: 联合分析分区等待与控制任务调度，验证关键执行链路时序。
  - product: safety-assurance
    reason: 关联型号需求、系统基线与验证记录，准备项目范围内的适航证据。
---

<section class="detail-section" aria-labelledby="benefits-title">

<h2 id="benefits-title">应用价值</h2>

<div class="detail-benefits">

- 配套适航分析与验证证据，减少型号取证准备工作。
- 支持异构冗余部署与故障隔离，控制故障扩散。
- 复用软件与系统基线，降低衍生型号及硬件升级的重复验证与适配工作。

</div>

</section>

<section class="detail-section" aria-labelledby="runtime-title">

<h2 id="runtime-title">运行架构</h2>

<dl class="detail-runtime">
  <div><dt>Linux</dt><dd>承载航电服务与智能应用。</dd></div>
  <div><dt>Zephyr</dt><dd>承载确定性控制任务。</dd></div>
  <div><dt>Hypervisor</dt><dd>提供时间与空间分区及设备隔离。</dd></div>
</dl>

<p class="detail-hardware"><strong>硬件 / BSP</strong><span>独立异构硬件与 BSP，覆盖飞控计算机、航电计算模块、机载通信与 I/O。</span></p>

</section>

<section class="detail-section" aria-labelledby="capabilities-title">

<h2 id="capabilities-title">关键能力与行业接口</h2>

<div class="detail-list">

- 结合异构部署、时间与空间分区、设备隔离及健康监测，划分任务与故障影响范围。
- 联合配置分区与控制任务调度，分析并验证关键执行链路时序。

</div>

<div class="detail-interface">

### 接口与生态

应用侧支持 ARINC 653 / APEX、POSIX / VxWorks 接口；机载通信侧适配 ARINC 429 / 664。

</div>

</section>

<section class="detail-section" aria-labelledby="delivery-title">

<h2 id="delivery-title">交付与验证</h2>

<div class="detail-delivery">

<div>

### 交付内容

<div class="detail-list">

- 目标镜像与 BSP。
- 分区与任务调度配置。
- 项目范围内的认证证据及关键链路时序对比记录。

</div>

</div>

<div>

### 验证重点

<div class="detail-list">

- 对比关键执行链路时序，验证分区与任务调度配置。
- 验证隔离与故障恢复行为。

</div>

</div>

</div>

</section>

<section class="detail-section" aria-labelledby="agentic-title">

<h2 id="agentic-title">AI 辅助与安全边界</h2>

<div class="section-description">

在非安全关键域辅助分析故障并提出维护建议；执行受规则与人工确认约束。

</div>

<div class="detail-boundary">

原系统迁移以指令架构兼容、虚拟硬件匹配为前提。飞控闭环与安全关键判定由确定性软件承担，认证范围按项目定义。

</div>

</section>
