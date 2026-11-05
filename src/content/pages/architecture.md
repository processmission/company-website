---
title: 技术架构｜进程使命
description: 让 Linux 发挥复杂软件生态优势，让 Zephyr 承担确定性控制，由 Hypervisor 管理分区资源与隔离边界。
eyebrow: 运行底座
heading: 技术架构
---
<section id="linux" class="detail-section" aria-labelledby="linux-title">

  <h2 id="linux-title">Linux：可裁剪的复杂应用运行环境</h2>
  <p class="section-description">Linux 承载业务应用、AI 推理、网络服务与人机交互。按行业需求裁剪内核、驱动和用户态，再通过配置引入应用与 GPU / NPU 软件栈，避免把全部生态组件纳入每个设备的系统基线。</p>

- <strong>受控扩展：</strong>区分共用系统基线与项目应用配置，减少跨产品重复适配，并限定需要验证和持续维护的组件范围。
- <strong>独立隔离与监测：</strong>由 Hypervisor 隔离 Linux 运行环境，独立 Monitor 监测故障并触发安全处置；复杂应用不直接承担关键控制域的安全判定。
- <strong>保留恢复路径：</strong>通过冗余启动、完整性校验、升级回退与故障恢复处理启动和更新异常，并将配置关联到需求、设计与测试记录。

<p class="detail-boundary">裁剪、隔离和故障恢复需要结合目标硬件与配置验证；认证适用范围和证据要求由行业项目分别定义，不将 Linux 运行环境视为已获认证的完整系统。</p>
<div class="chapter-links">
  <a class="text-link" href="../products/os/">查看行业操作系统</a>
  <a class="text-link" href="../products/devops/">查看构建与版本管理</a>
  <a class="text-link" href="../products/safety-assurance/">查看认证工程与安全论证</a>
</div>

</section>

<section id="zephyr" class="detail-section" aria-labelledby="zephyr-title">

  <h2 id="zephyr-title">Zephyr：可观测、可配置的实时控制</h2>
  <p class="section-description">Zephyr 承载实时控制、传感采集与现场通信。将强实时模块从 Linux 迁入 Zephyr，其余业务继续使用 Linux 生态；两侧通过任务指令与状态反馈协作，控制闭环在本地完成。</p>

- <strong>在关键路径采样：</strong>在调度、中断、同步与 IPC 路径定制 hook 和采样点，区分任务执行、等待与中断带来的时序问题。
- <strong>开放调度入口：</strong>配置优先级、核分配与时间预算，选择调度表和调度器方案；结合 QEMU 与实机数据迭代配置，而非仅观察最终响应时间。
- <strong>复用工程配置：</strong>通过 Devicetree 描述硬件、Kconfig 选择组件、west 管理工程与依赖。增强 POSIX 及既有 RTOS 兼容接口以减少源码迁移工作，Linux 与 Zephyr 仍分别构建目标产物。

<p class="detail-boundary">迁移需核对项目所需接口与硬件行为；调度优化需检查采样开销，并用实机结果校准仿真模型、验证时序约束。</p>
<div class="chapter-links">
  <a class="text-link" href="../products/os/">查看行业操作系统</a>
  <a class="text-link" href="../products/scheduling/">查看调度分析与配置优化</a>
  <a class="text-link" href="../products/devops/">查看双系统构建与验证</a>
</div>

</section>

<section id="hypervisor" class="detail-section" aria-labelledby="hypervisor-title">

  <h2 id="hypervisor-title">Hypervisor：分区执行与跨层时序边界</h2>
  <p class="section-description">Hypervisor 管理分区资源与执行时序，Linux、Zephyr 和存量系统各自调度分区内部任务。两层调度需要联合分析：分区尚未获得执行时间，与 Guest 内部任务正在等待，是不同的延迟来源。</p>

- <strong>配置资源归属：</strong>统一配置核、内存与设备，设置中断路由、设备直通或虚拟设备，明确分区的空间与设备隔离边界。
- <strong>关联跨层事件：</strong>开放时间预算、分区调度表与切换策略参数，采样分区切换和虚拟中断，并关联 Guest 内部事件，区分分区等待、Guest 调度及中断处理延迟。
- <strong>承接与恢复：</strong>旧硬件兼容层提供匹配的设备树、设备接口与启动环境；独立 Monitor 监测 Guest 状态并触发处置，由 Hypervisor 按策略执行分区启动、重启与恢复。

<p class="detail-boundary">原镜像与驱动复用以指令架构兼容、虚拟硬件匹配为前提。内存、设备与中断隔离效果需结合目标 SoC、IOMMU 和分区配置验证。</p>
<div class="chapter-links">
  <a class="text-link" href="../products/hypervisor/">查看 Hypervisor 产品</a>
  <a class="text-link" href="../products/scheduling/">查看分区与 Guest 联合优化</a>
</div>

</section>
