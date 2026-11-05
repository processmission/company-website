---
order: 3
title: 具身机器人
label: ROBOTICS
description: Linux 承载模型与 ROS 2，Zephyr 承载实时运动控制，联合验证感知至控制的完整时序。
interfaces: ROS 2 / DDS · micro-ROS · EtherCAT
heading: 具身机器人：模型运行与实时控制协同
summary: 面向机器人从样机到产品的系统适配，复用模型运行环境、设备接口与控制软件，将端侧推理和实时运动控制分域部署，并联合分析感知、计算到控制的完整时序。
recommendationsDescription: 以下为围绕本行业任务的推荐组合；具体接口、硬件适配与验证范围按项目确定，不代表兼容性或认证结论。
recommendations:
  - product: os
    reason: 连接模型运行环境、ROS 2 与实时运动控制，复用传感器和执行器接口。
  - product: hypervisor
    reason: 隔离智能计算与控制负载，并明确跨域通信和设备边界。
  - product: devops
    reason: 将模型运行环境、设备接口及目标镜像绑定为可复现的验证版本。
  - product: scheduling
    reason: 关联感知、计算与控制事件，比较端到端延迟及智能负载干扰。
---

<section class="detail-section" aria-labelledby="benefits-title">

<h2 id="benefits-title">应用价值</h2>

<div class="detail-benefits">

- 为机器人模型提供运行环境，减少从样机到产品的适配工作。
- 联合优化感知、计算与控制时序，降低动作延迟与波动。
- 复用设备接口与控制软件，减少跨型号集成工作。

</div>

</section>

<section class="detail-section" aria-labelledby="runtime-title">

<h2 id="runtime-title">运行架构</h2>

<dl class="detail-runtime">
  <div><dt>Linux</dt><dd>承载机器人模型与 ROS 2。</dd></div>
  <div><dt>Zephyr</dt><dd>承载实时运动控制。</dd></div>
  <div><dt>Hypervisor</dt><dd>隔离智能计算与控制负载。</dd></div>
</dl>

<p class="detail-hardware"><strong>硬件 / BSP</strong><span>硬件与 BSP，覆盖 CPU / GPU / NPU、传感器、伺服驱动与执行器。</span></p>

</section>

<section class="detail-section" aria-labelledby="capabilities-title">

<h2 id="capabilities-title">关键能力与行业接口</h2>

<div class="detail-list">

- 支持模型加载、端侧推理、GPU / NPU 资源管理与运行监测。
- 联合配置分区与任务调度，分析感知至控制链路的时延与智能负载干扰。

</div>

<div class="detail-interface">

### 接口与生态

对接 ROS 2 / DDS、micro-ROS、EtherCAT、TSN，并通过受控接口进行跨域通信。

</div>

</section>

<section class="detail-section" aria-labelledby="delivery-title">

<h2 id="delivery-title">交付与验证</h2>

<div class="detail-delivery">

<div>

### 交付内容

<div class="detail-list">

- 目标镜像与模型运行环境。
- 设备接口与调度配置。

</div>

</div>

<div>

### 验证重点

<div class="detail-list">

- 验证感知至控制的端到端时序，以及智能负载对控制链路的干扰。

</div>

</div>

</div>

</section>

<section class="detail-section" aria-labelledby="agentic-title">

<h2 id="agentic-title">AI 辅助与安全边界</h2>

<div class="section-description">

任务 Agent 通过受控接口调用模型；控制环与安全停机保持独立。

</div>

<div class="detail-boundary">

操作系统负责模型运行环境和系统接口，不承担模型训练或算法效果；实时控制与安全停机保持确定性边界。

</div>

</section>
