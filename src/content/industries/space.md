---
order: 2
title: 航天星载
label: SPACE
description: 面向星载任务与设备控制，以多副本、故障恢复和在环验证支撑任务持续运行。
interfaces: CCSDS / CFDP · 遥测诊断
image: ../../assets/site/space.svg
imageAlt: 卫星与星载冗余计算模块、故障恢复路径示意
heading: 航天星载
summary: 面向星载任务软件、采集与执行控制，在有限算力下协调任务运行，通过多层容错、在轨检测与预设恢复策略应对异常。
recommendationsDescription: 推荐组合仅供方案选型；接口、硬件适配与验证范围按项目确定，不代表兼容性或认证结论。
recommendations:
  - product: os
    reason: 星载任务软件、采集与执行控制。
  - product: hypervisor
    reason: 任务分区、设备资源与分区恢复。
  - product: devops
    reason: 镜像和任务配置版本、仿真及实机恢复记录。
  - product: scheduling
    reason: 有限算力下的任务布局与时间预算。
---

<section class="detail-section" aria-labelledby="benefits-title">

<h2 id="benefits-title">应用价值</h2>

减少对地面即时处置的依赖，复用星载系统基线与接口配置，降低新型号适配工作。

</section>

<section class="detail-section" aria-labelledby="runtime-title">

<h2 id="runtime-title">运行架构</h2>

<dl class="detail-runtime">
  <div><dt>Linux</dt><dd>星载任务软件与应用。</dd></div>
  <div><dt>Zephyr</dt><dd>采集与执行控制。</dd></div>
  <div><dt>Hypervisor</dt><dd>任务分区与设备隔离。</dd></div>
</dl>

<p class="detail-hardware"><strong>硬件 / BSP</strong><span>星载计算机、容错内存与存储、测控通信接口。</span></p>

</section>

<section class="detail-section" aria-labelledby="capabilities-title">

<h2 id="capabilities-title">关键能力与行业接口</h2>

结合任务与数据多副本、状态表决、完整性校验、看门狗和故障切换，降低异常导致的任务中断风险。

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

星载镜像与 BSP、任务及调度配置、关键时序记录。

</div>

<div>

### 验证重点

在仿真与实机在环验证中，通过故障注入检查状态一致性、切换恢复与任务时序。

</div>

</div>

</section>

<section class="detail-section" aria-labelledby="agentic-title">

<h2 id="agentic-title">AI 辅助与安全边界</h2>

<div class="detail-boundary">

Agent 关联遥测、进程状态和日志，辅助定位异常并建议隔离、重启或副本切换；恢复动作由预设策略执行，不由 Agent 替代确定性控制。多副本与软件容错用于降低故障影响，不代表任务可靠性或认证结论。

</div>

</section>
