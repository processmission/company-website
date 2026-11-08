---
order: 3
title: 具身机器人
label: ROBOTICS
description: 分域部署模型运行与实时运动控制，联合验证感知至控制的完整时序。
interfaces: ROS 2 / DDS · micro-ROS · EtherCAT
image: ../../assets/site/robotics.svg
imageAlt: 传感器、推理计算、实时控制器与机器人执行器闭环示意
heading: 具身机器人
summary: 面向机器人从样机到产品的系统适配，连接端侧推理、传感器与执行器，让智能计算和实时控制分工运行。
recommendationsDescription: 推荐组合仅供方案选型；接口、硬件适配与验证范围按项目确定，不代表兼容性或认证结论。
recommendations:
  - product: os
    reason: 模型运行环境、ROS 2 与实时运动控制。
  - product: hypervisor
    reason: 跨域通信、设备边界与负载隔离。
  - product: devops
    reason: 模型环境、设备接口及目标镜像的可复现版本。
  - product: scheduling
    reason: 端到端延迟与智能负载干扰分析。
---

<section class="detail-section" aria-labelledby="benefits-title">

<h2 id="benefits-title">应用价值</h2>

复用模型运行环境、设备接口与控制软件，减少跨型号集成工作，并定位动作延迟与波动来源。

</section>

<section class="detail-section" aria-labelledby="runtime-title">

<h2 id="runtime-title">运行架构</h2>

<dl class="detail-runtime">
  <div><dt>Linux</dt><dd>机器人模型与 ROS 2。</dd></div>
  <div><dt>Zephyr</dt><dd>实时运动控制。</dd></div>
  <div><dt>Hypervisor</dt><dd>智能计算与控制负载隔离。</dd></div>
</dl>

<p class="detail-hardware"><strong>硬件 / BSP</strong><span>CPU / GPU / NPU、传感器、伺服驱动与执行器。</span></p>

</section>

<section class="detail-section" aria-labelledby="capabilities-title">

<h2 id="capabilities-title">关键能力与行业接口</h2>

支持模型加载、端侧推理、GPU / NPU 资源管理与运行监测，联合配置分区和任务调度。

<div class="detail-interface">

### 接口与生态

对接 ROS 2 / DDS、micro-ROS、EtherCAT、TSN；跨域通信通过受控接口进行。

</div>

</section>

<section class="detail-section" aria-labelledby="delivery-title">

<h2 id="delivery-title">交付与验证</h2>

<div class="detail-delivery">

<div>

### 交付内容

目标镜像与模型运行环境、设备接口和调度配置。

</div>

<div>

### 验证重点

在目标硬件上测量感知至控制的端到端时序，验证智能负载对控制链路的干扰。

</div>

</div>

</section>

<section class="detail-section" aria-labelledby="agentic-title">

<h2 id="agentic-title">AI 辅助与安全边界</h2>

<div class="detail-boundary">

任务 Agent 通过受控接口调用模型，不替代独立的实时控制环与安全停机。操作系统提供模型运行环境和系统接口，不承担模型训练或算法效果；控制与安全停机保持确定性边界。

</div>

</section>
