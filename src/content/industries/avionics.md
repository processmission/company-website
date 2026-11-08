---
order: 1
title: 航空机载
label: AVIONICS
description: 面向飞控与航电计算，以分区隔离、健康监测和时序验证支撑混合关键任务。
interfaces: ARINC 653 / APEX · ARINC 429 / 664
image: ../../assets/site/avionics.svg
imageAlt: 飞机轮廓与独立隔离的航电计算模块示意
heading: 航空机载
summary: 面向飞控计算机与航电计算模块，划分应用、控制与故障影响范围，为型号研制和适航分析准备可追溯的系统基线。
recommendationsDescription: 推荐组合仅供方案选型；接口、硬件适配与验证范围按项目确定，不代表兼容性或认证结论。
recommendations:
  - product: os
    reason: 航电服务、确定性控制与目标 BSP。
  - product: hypervisor
    reason: 分区、设备归属与健康监测边界。
  - product: scheduling
    reason: 分区等待与控制任务的联合时序分析。
  - product: safety-assurance
    reason: 型号需求、系统基线与适航验证证据关联。
---

<section class="detail-section" aria-labelledby="benefits-title">

<h2 id="benefits-title">应用价值</h2>

复用软件、接口与验证基线，减少衍生型号和硬件升级的重复适配工作。

</section>

<section class="detail-section" aria-labelledby="runtime-title">

<h2 id="runtime-title">运行架构</h2>

<dl class="detail-runtime">
  <div><dt>Linux</dt><dd>航电服务与智能应用。</dd></div>
  <div><dt>Zephyr</dt><dd>确定性控制任务。</dd></div>
  <div><dt>Hypervisor</dt><dd>时间与空间分区、设备隔离。</dd></div>
</dl>

<p class="detail-hardware"><strong>硬件 / BSP</strong><span>独立异构硬件，覆盖飞控计算机、航电计算模块、机载通信与 I/O。</span></p>

</section>

<section class="detail-section" aria-labelledby="capabilities-title">

<h2 id="capabilities-title">关键能力与行业接口</h2>

以异构冗余、隔离和健康监测控制故障扩散，联合配置分区与控制任务调度。

<div class="detail-interface">

### 接口与生态

应用侧支持 ARINC 653 / APEX、POSIX / VxWorks 接口；通信侧适配 ARINC 429 / 664。

</div>

</section>

<section class="detail-section" aria-labelledby="delivery-title">

<h2 id="delivery-title">交付与验证</h2>

<div class="detail-delivery">

<div>

### 交付内容

目标镜像与 BSP、分区及任务调度配置、项目范围内的认证证据和关键链路时序对比记录。

</div>

<div>

### 验证重点

在目标硬件上验证关键执行链路时序、分区隔离与故障恢复行为。

</div>

</div>

</section>

<section class="detail-section" aria-labelledby="agentic-title">

<h2 id="agentic-title">AI 辅助与安全边界</h2>

<div class="detail-boundary">

AI 仅在非安全关键域辅助故障分析与维护建议，执行受规则和人工确认约束；飞控闭环与安全关键判定由确定性软件承担。原系统迁移须满足指令架构兼容、虚拟硬件匹配；认证范围按项目定义，证据准备不代表已取得认证。

</div>

</section>
