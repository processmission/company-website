---
order: 2
title: 航天星载
label: SPACE
description: 面向星载任务与设备控制，结合多副本、故障恢复与在环验证，支撑任务持续运行。
interfaces: CCSDS / CFDP · 遥测诊断
heading: 航天星载：容错与恢复支撑任务持续运行
summary: 面向星载任务软件、采集与执行控制，以多层容错、在轨检测和预设恢复策略应对运行异常，减少对地面即时处置的依赖，并在有限算力下协调任务执行与设备控制。
recommendationsDescription: 以下为围绕本行业任务的推荐组合；具体接口、硬件适配与验证范围按项目确定，不代表兼容性或认证结论。
recommendations:
  - product: os
    reason: 分工承载星载任务软件、传感采集与执行控制。
  - product: hypervisor
    reason: 划分任务和设备资源，配合预设策略执行分区恢复。
  - product: devops
    reason: 绑定星载镜像与任务配置，在仿真和实机验证中保留故障注入与切换恢复记录。
  - product: scheduling
    reason: 分析有限算力下的任务布局与时间预算，协调任务执行和设备控制。
---

<section class="detail-section" aria-labelledby="benefits-title">

<h2 id="benefits-title">应用价值</h2>

<div class="detail-benefits">

- 通过多层容错降低运行异常导致的任务中断风险。
- 结合在轨检测与自主恢复，减少对地面即时处置的依赖。
- 复用星载系统基线与接口配置，减少新型号适配工作。

</div>

</section>

<section class="detail-section" aria-labelledby="runtime-title">

<h2 id="runtime-title">运行架构</h2>

<dl class="detail-runtime">
  <div><dt>Linux</dt><dd>承载星载任务软件与应用。</dd></div>
  <div><dt>Zephyr</dt><dd>承载采集与执行控制。</dd></div>
  <div><dt>Hypervisor</dt><dd>提供任务分区与设备隔离。</dd></div>
</dl>

<p class="detail-hardware"><strong>硬件 / BSP</strong><span>星载硬件与 BSP，覆盖星载计算机、容错内存与存储、测控通信接口。</span></p>

</section>

<section class="detail-section" aria-labelledby="capabilities-title">

<h2 id="capabilities-title">关键能力与行业接口</h2>

<div class="detail-list">

- 结合任务与数据多副本、状态表决、完整性校验、看门狗与故障切换，降低故障影响。
- 在有限算力下优化任务布局与时间预算，协调任务执行和设备控制。

</div>

<div class="detail-interface">

### 接口与生态

对接星载任务软件接口，适配 CCSDS 数据标准与 CFDP 文件传输。

</div>

</section>

<section class="detail-section" aria-labelledby="delivery-title">

<h2 id="delivery-title">交付与验证</h2>

<div class="detail-delivery">

<div>

### 交付内容

<div class="detail-list">

- 星载镜像与 BSP。
- 任务与调度配置。
- 关键时序记录。

</div>

</div>

<div>

### 验证重点

<div class="detail-list">

- 通过故障注入验证状态一致性和切换恢复。

</div>

</div>

</div>

</section>

<section class="detail-section" aria-labelledby="agentic-title">

<h2 id="agentic-title">AI 辅助与安全边界</h2>

<div class="section-description">

Agent 关联系统遥测、进程状态与故障日志，辅助定位异常并建议隔离、重启或副本切换；恢复动作由预设策略执行。

</div>

<div class="detail-boundary">

多副本与软件容错降低故障影响；恢复动作由预设策略执行，Agent 辅助诊断。

</div>

</section>
