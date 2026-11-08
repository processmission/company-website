---
order: 1
title: "行业操作系统"
group: "系统软件"
category: "设备运行"
description: "按行业任务配置 Linux、Zephyr 与隔离环境，连接复杂应用和实时控制。"
features:
  - "Linux / Zephyr / Hypervisor"
  - "行业接口与存量系统承接"
  - "目标镜像、BSP 与运行配置"
summary: "面向行业设备，交付连接复杂应用、实时控制与现场接口的系统运行基线。"
image: "../../assets/site/os.svg"
imageAlt: "按项目组合应用与行业接口、Linux/Zephyr 运行环境、BSP 驱动和镜像配置的系统交付示意"
---

<section class="detail-section" aria-labelledby="positioning-title">

<h2 id="positioning-title">产品定位</h2>

<div class="section-description">

Linux 承载复杂应用、智能计算与网络服务，Zephyr 承载实时控制、采集与现场通信；混合部署时，由 Hypervisor 管理分区资源。

</div>

</section>

<section class="detail-section" aria-labelledby="capabilities-title">

<h2 id="capabilities-title">核心能力</h2>

<div class="detail-list">

- 裁剪 Linux 内核、驱动与用户态，配置模型运行环境及 GPU / NPU 加速。
- 配置 Zephyr 实时环境、任务优先级、核分配与时间预算，通过通信和时间同步连接应用与控制模块。
- 按项目配置故障监测、完整性校验、启动恢复与升级回退，关联版本和验证记录。

</div>

</section>

<section class="detail-section" aria-labelledby="adaptation-title">

<h2 id="adaptation-title">接口与适配</h2>

<div class="detail-list">

- 面向 ARM、x86、RISC-V 平台适配 BSP、加速器和外设；用 Devicetree、Kconfig、west、Yocto 管理硬件与构建配置。
- 按既有应用需求确定 POSIX、VxWorks 及 Zephyr 侧 Linux / AUTOSAR / RTOS 兼容接口覆盖。
- 按场景选配 ROS 2 / DDS、micro-ROS、AUTOSAR / SOME/IP、ARINC 653 / APEX、CCSDS / CFDP、OPC UA / EtherCAT，不作为默认全量配置。

</div>

</section>

<section class="detail-section" aria-labelledby="delivery-title">

<h2 id="delivery-title">交付与验证</h2>

<div class="detail-delivery">
<div>

### 交付内容

<div class="detail-list">

- 系统镜像、BSP、工具链与版本基线，配套项目所需接口和运行环境。
- 分区、调度与通信配置，以及项目范围内的时序、恢复和需求追溯证据。

</div>

</div>
<div>

### 验证重点

<div class="detail-list">

- 在目标板卡验证启动、外设、互通和恢复；比较关键链路延迟、抖动及智能负载干扰。
- 分别评估源码移植与原镜像承接，核对 API 覆盖及迁移前后的功能、时序和版本。

</div>

</div>
</div>

</section>

<section class="detail-section" aria-labelledby="boundary-title">

<h2 id="boundary-title">适用范围与限制</h2>

<div class="detail-boundary">

原镜像复用须满足指令架构兼容、虚拟硬件匹配；硬件与兼容接口须经项目验证。模型运行环境不保障训练或算法效果；实时控制和安全关键判定保持确定性边界，认证目标、范围与证据要求按行业项目定义。

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
