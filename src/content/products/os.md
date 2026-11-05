---
order: 1
title: "行业操作系统"
group: "系统软件"
category: "设备运行"
description: "将复杂应用与实时控制部署在共同的计算平台上，按目标硬件与行业任务配置交付。"
features:
  - "Linux / Zephyr / Hypervisor"
  - "行业接口与存量系统承接"
  - "目标镜像、BSP 与运行配置"
summary: "按行业任务与目标硬件配置 Linux、Zephyr 及隔离环境，连接复杂应用、实时控制与现场接口，形成可追溯的设备运行基线。"
---

<section class="detail-section" aria-labelledby="positioning-title">

<h2 id="positioning-title">产品定位</h2>

<div class="section-description">

行业操作系统面向航空机载、航天星载、具身机器人、智能汽车与工业边缘。Linux 承载复杂应用、智能计算与网络服务，Zephyr 承载确定性控制、采集与现场通信；需要混合部署时，由 Hypervisor 管理分区资源与隔离边界。

</div>

</section>

<section class="detail-section" aria-labelledby="capabilities-title">

<h2 id="capabilities-title">核心能力</h2>

<div class="detail-list">

- 按产品需求裁剪 Linux 内核、驱动与用户态，配置业务应用、模型运行环境及 GPU / NPU 加速能力。
- 基于 Zephyr 提供实时控制运行环境，结合内核观测、优先级、核分配与时间预算入口分析任务时序。
- 通过跨系统通信与时间同步连接应用和控制模块，分别构建目标产物，按实时性需求选择运行位置。
- 结合项目配置提供故障监测、完整性校验、启动恢复与升级回退，并关联软硬件版本和验证记录。

</div>

</section>

<section class="detail-section" aria-labelledby="adaptation-title">

<h2 id="adaptation-title">接口与适配</h2>

<div class="detail-list">

- 硬件与 BSP 面向 ARM、x86、RISC-V 等目标平台，具体 CPU、加速器、存储和外设需结合目标板卡适配与验证。
- 应用侧采用 POSIX、VxWorks 兼容接口等适配路径；Zephyr 侧的 Linux、AUTOSAR 及其他 RTOS 兼容接口按既有应用需求确定覆盖范围。
- 行业侧按场景配置 ROS 2 / DDS、micro-ROS、AUTOSAR / SOME/IP、ARINC 653 / APEX、CCSDS / CFDP 或 OPC UA / EtherCAT 等接口，不将接口列表视为所有项目的默认配置。
- Devicetree、Kconfig、west 与 Yocto 等工程机制用于硬件描述、组件裁剪和构建；源码移植与原镜像承接分别评估。

</div>

</section>

<section class="detail-section" aria-labelledby="delivery-title">

<h2 id="delivery-title">交付与验证</h2>

<div class="detail-delivery">
<div>

### 交付内容

<div class="detail-list">

- 目标系统镜像、BSP、组件与工具链配置，以及对应的版本基线。
- 项目所需的行业接口、模型运行环境或兼容接口适配。
- 分区、任务调度与跨系统通信配置，以及关键链路时序和恢复验证记录。
- 项目范围内的需求追溯、分析和认证支持证据。

</div>

</div>
<div>

### 验证重点

<div class="detail-list">

- 在目标硬件上验证启动、设备与接口行为、跨系统互通及故障恢复。
- 比较关键控制链路的延迟、抖动与智能负载干扰，验证任务及通信时序。
- 针对迁移场景验证 API 覆盖与迁移前后的功能、时序表现，关联配置及测试版本。

</div>

</div>
</div>

</section>

<section class="detail-section" aria-labelledby="boundary-title">

<h2 id="boundary-title">适用范围与限制</h2>

<div class="detail-boundary">

原镜像复用以指令架构兼容、虚拟硬件匹配为前提；兼容接口覆盖范围由项目验证。模型运行环境不等于模型训练或算法效果保障。实时控制与安全关键判定保持确定性边界，认证目标、适用范围与证据要求由行业项目分别定义。

</div>

</section>

<section class="detail-section" aria-labelledby="related-title">

<h2 id="related-title">相关架构与方案</h2>

<div class="detail-list related-links">

- [了解 Linux、Zephyr 与 Hypervisor 技术架构](../../architecture/)
- [查看独立 Hypervisor 产品](../../products/hypervisor/)
- [按行业查看操作系统方案](../../industries/)

</div>

</section>
