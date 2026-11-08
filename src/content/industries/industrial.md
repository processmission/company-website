---
order: 5
title: 工业边缘
label: INDUSTRIAL
description: 衔接工业应用、现场通信与实时控制，减少系统适配和现场联调工作。
interfaces: OPC UA · EtherCAT / TSN · Modbus
image: ../../assets/site/industrial.svg
imageAlt: 工业边缘计算机、控制器、现场总线与分布式 I/O 协同示意
heading: 工业边缘
summary: 面向工控机、控制器与分布式 I/O，通过协议适配、计算与控制隔离及存量系统承接，让工业应用与现场设备协同运行。
recommendationsDescription: 推荐组合仅供方案选型；接口、硬件适配与验证范围按项目确定，不代表兼容性或认证结论。
recommendations:
  - product: os
    reason: 工业应用、现场通信与实时 I/O。
  - product: hypervisor
    reason: 计算与控制隔离、存量系统虚拟硬件。
  - product: devops
    reason: 现场版本、日志与迁移回归记录关联。
  - product: scheduling
    reason: 控制周期、任务调度与现场总线时序分析。
---

<section class="detail-section" aria-labelledby="benefits-title">

<h2 id="benefits-title">应用价值</h2>

复用 PLC / DCS、运动控制与机器视觉软件，减少应用迁移、现场联调和长期维护工作。

</section>

<section class="detail-section" aria-labelledby="runtime-title">

<h2 id="runtime-title">运行架构</h2>

<dl class="detail-runtime">
  <div><dt>Linux</dt><dd>SCADA / HMI、机器视觉与边缘应用。</dd></div>
  <div><dt>Zephyr</dt><dd>运动控制、现场通信与实时 I/O。</dd></div>
  <div><dt>Hypervisor</dt><dd>边缘计算与控制负载隔离。</dd></div>
</dl>

<p class="detail-hardware"><strong>硬件 / BSP</strong><span>工控机 / 控制器、分布式 I/O、工业网络与驱动设备。</span></p>

</section>

<section class="detail-section" aria-labelledby="capabilities-title">

<h2 id="capabilities-title">关键能力与行业接口</h2>

联合优化控制周期与通信时序，支持故障监测与恢复；旧硬件兼容层提供存量系统所需的虚拟平台。

<div class="detail-interface">

### 接口与生态

提供 POSIX / VxWorks 兼容层，适配 OPC UA、EtherCAT、TSN、Modbus / PROFINET。

</div>

</section>

<section class="detail-section" aria-labelledby="delivery-title">

<h2 id="delivery-title">交付与验证</h2>

<div class="detail-delivery">

<div>

### 交付内容

目标镜像、兼容 API、虚拟硬件与协议适配、调度配置。

</div>

<div>

### 验证重点

确认项目所需 API 覆盖范围，在目标硬件上对比迁移前后功能、控制周期与现场总线时序。

</div>

</div>

</section>

<section class="detail-section" aria-labelledby="agentic-title">

<h2 id="agentic-title">AI 辅助与安全边界</h2>

<div class="detail-boundary">

设备 Agent 汇总告警、日志与工艺知识，执行前须进行权限校验，不替代确定性控制环。原镜像复用须满足指令架构兼容、虚拟硬件匹配；API 覆盖范围由项目验证，智能诊断与控制分层。

</div>

</section>
