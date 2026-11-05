---
order: 5
title: 工业边缘
label: INDUSTRIAL
description: 让 SCADA / HMI、机器视觉与实时控制协同运行，减少应用适配、现场联调与长期维护工作。
interfaces: OPC UA · EtherCAT / TSN · Modbus
heading: 工业边缘：工业应用、现场通信与实时控制协同
summary: 面向工控机、控制器与分布式 I/O，让 PLC / DCS、SCADA / HMI、机器视觉和现场设备协同运行。通过计算与控制隔离、协议适配及存量系统承接，减少应用适配与现场联调工作。
recommendationsDescription: 以下为围绕本行业任务的推荐组合；具体接口、硬件适配与验证范围按项目确定，不代表兼容性或认证结论。
recommendations:
  - product: os
    reason: 衔接 SCADA / HMI、机器视觉、现场通信与实时 I/O。
  - product: hypervisor
    reason: 隔离边缘计算和控制负载，并按存量系统需求配置虚拟硬件。
  - product: devops
    reason: 关联现场版本、日志和回归记录，复现协议适配与迁移问题。
  - product: scheduling
    reason: 联合检查控制周期、任务调度和现场总线时序。
---

<section class="detail-section" aria-labelledby="benefits-title">

<h2 id="benefits-title">应用价值</h2>

<div class="detail-benefits">

- 覆盖 PLC / DCS、SCADA / HMI、运动控制与机器视觉，减少应用与运行平台的适配工作。
- 通过 OPC UA、EtherCAT / TSN、Modbus / PROFINET 连接工业应用、控制器与现场设备。
- 隔离计算与控制负载，联合优化任务和通信时序，支持故障监测与恢复。

</div>

</section>

<section class="detail-section" aria-labelledby="runtime-title">

<h2 id="runtime-title">运行架构</h2>

<dl class="detail-runtime">
  <div><dt>Linux</dt><dd>承载 SCADA / HMI、机器视觉与边缘应用。</dd></div>
  <div><dt>Zephyr</dt><dd>承载运动控制、现场通信与实时 I/O。</dd></div>
  <div><dt>Hypervisor</dt><dd>隔离边缘计算与控制负载。</dd></div>
</dl>

<p class="detail-hardware"><strong>硬件 / BSP</strong><span>工业硬件与 BSP，覆盖工控机 / 控制器、分布式 I/O、工业网络与驱动设备。</span></p>

</section>

<section class="detail-section" aria-labelledby="capabilities-title">

<h2 id="capabilities-title">关键能力与行业接口</h2>

<div class="detail-list">

- 隔离边缘智能与实时控制，联合优化控制周期与现场通信。
- 通过旧硬件兼容层提供匹配的虚拟平台，支持存量系统部署。

</div>

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

<div class="detail-list">

- 目标镜像与兼容 API。
- 虚拟硬件与协议适配。
- 调度配置。

</div>

</div>

<div>

### 验证重点

<div class="detail-list">

- 验证项目所需的 API 覆盖范围。
- 对比迁移前后的功能及时序表现。
- 验证现场总线时序。

</div>

</div>

</div>

</section>

<section class="detail-section" aria-labelledby="agentic-title">

<h2 id="agentic-title">AI 辅助与安全边界</h2>

<div class="section-description">

设备 Agent 汇总告警、日志和工艺知识；执行前进行权限校验，智能诊断与确定性控制环分层。

</div>

<div class="detail-boundary">

原镜像复用以指令架构兼容、虚拟硬件匹配为前提。API 覆盖范围由项目验证，智能诊断与确定性控制环分层。

</div>

</section>
