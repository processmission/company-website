---
title: "MFCP 开源贡献者成长计划｜MissionHub｜进程使命"
heading: "MFCP 开源贡献者成长计划"
description: "进程使命发起的开源贡献者成长计划，通过开源学习、导师指导、真实项目实践和贡献评估，帮助参与者积累工程经验。"
---

<section class="detail-section">

## 计划定位

MFCP（Mission Forge Contributor Program）围绕真实开源贡献组织学习与实践。参与者从注册和申领任务开始，在导师指导下完成开发、验证与评审，通过贡献成果记录成长。

MFCP 仓库管理参与规则、项目资料、培养记录和贡献追踪；代码贡献提交到对应项目的上游仓库。配套指南目前使用中文。

[访问计划网站](https://missionhub-oss.github.io/mfcp/) · [查看 MFCP 仓库](https://github.com/missionhub-oss/mfcp) · [阅读参与指南](https://github.com/missionhub-oss/mfcp/blob/main/docs/program.md)

</section>

<section class="detail-section">

## 四个实践方向

- [Zephyr](https://github.com/missionhub-oss/mfcp/blob/main/projects/zephyr/README.md)：探索板级支持、设备驱动与示例，在嵌入式平台上验证运行结果，完善测试与文档。
- [Linux](https://github.com/missionhub-oss/mfcp/blob/main/projects/linux/README.md)：参与内核问题分析、驱动开发、测试与文档，也支持 openRuyi 软件包维护和 RISC-V 系统验证。
- [Yocto Project](https://github.com/missionhub-oss/mfcp/blob/main/projects/yocto/README.md)：编写配方、组织软件层、生成系统镜像，并针对目标平台验证构建结果。
- [Humanize](https://github.com/missionhub-oss/mfcp/blob/main/projects/humanize/README.md)：参与编程 Agent 协作工具开发，围绕协作流程、命令行和桌面工具改进 Agent 接入、测试与文档，按上游流程提交成果。

</section>

<section class="detail-section">

## 参与前提与提交规范

注册审核通过是参与前置条件。未注册账号创建的 Issue 会自动关闭，其 Issue 评论会自动删除；PR 讨论保持开放。自动处理在提交后执行，内容可能短暂可见。

DCO 签署必须使用本人真实姓名的英文全称；中文姓名使用完整拼音。Git `user.name`、commit 作者姓名与 `Signed-off-by` 姓名须一致，签署邮箱须与 commit 作者邮箱一致。GitHub 用户名、昵称和代号不能代替真实姓名；身份文件的 `github_login` 则填写 GitHub 用户名。

每个 commit 和 PR 标题使用 `module: subject` 格式。commit 标题、正文和 DCO 每行均不得超过 72 个字符，标题与正文之间空一行，正文说明修改内容和目的。提交时使用 `git commit -s` 添加 DCO 签署，必过的 `Progression integrity` 检查会逐个验证 PR 中的 commit、作者 DCO 和 PR 标题。

注册文件、姓名示例及较长 DCO 的换行方式，见[注册说明](https://github.com/missionhub-oss/mfcp/blob/main/participants/README.md)与[提交格式及 DCO 规范](https://github.com/missionhub-oss/mfcp/blob/main/CONTRIBUTING.md#提交格式与-dco)。

</section>

<section class="detail-section">

## 从注册到上游贡献

1. **通过 PR 注册。** Fork MFCP 仓库并创建分支，在 `participants/` 添加本人 GitHub 身份文件，推送到个人 Fork，再向 MFCP 仓库的 `main` 分支提交注册 PR。维护者审核合并后获得参与资格。
2. **选择实践方向。** 阅读对应项目的资料与实践指南，并查看[年度培养安排](https://github.com/missionhub-oss/mfcp/blob/main/programs/2026/README.md)。
3. **申领实践任务。** 选择原生 Type 为 `Task` 的开放 Issue，按项目和难度筛选，在评论中说明经验、可参与时间与开发条件。导师确认后，由维护者设置 Assignee，并记录约定范围与目标。具体步骤见[申领指南](https://github.com/missionhub-oss/mfcp/blob/main/CONTRIBUTING.md#申领任务)。
4. **完成实践并提交证据。** 将代码贡献提交到对应上游项目，记录实际验证结果，提供上游贡献链接，参与评审与成果评估。

</section>

<section class="detail-section">

## 成长、评估与支持

贡献者等级按任务成果评估。培养机制和参与者职责以官方文档为准：

- [贡献者等级](https://github.com/missionhub-oss/mfcp/blob/main/docs/levels.md)：L0–L4 的能力描述与晋升依据。
- [贡献评估](https://github.com/missionhub-oss/mfcp/blob/main/docs/assessment.md)：工程质量、验证、协作与成果价值的评估标准。
- [导师指导](https://github.com/missionhub-oss/mfcp/blob/main/docs/mentorship.md)：导师和参与者的职责，以及沟通与协调安排。
- [津贴与奖励](https://github.com/missionhub-oss/mfcp/blob/main/docs/stipends.md)：激励公告及发放条件的说明要求，具体安排以正式公告为准。

</section>

<section class="detail-section">

## 年度安排与交流入口

2026 年招募公告尚未发布。具体时间、导师、任务和激励安排将在[2026 年培养安排](https://github.com/missionhub-oss/mfcp/blob/main/programs/2026/README.md)中公布。

入门问题、任务讨论和实践进展可在 MFCP 开源贡献者交流群交流。前往[官方 README 的入群入口](https://github.com/missionhub-oss/mfcp/blob/main/README.zh-CN.md#加入贡献者交流群)，使用飞书扫描其中的二维码；往届活动、回放和学习资料也可通过交流群了解。

本页根据 [MFCP 中文 README](https://github.com/missionhub-oss/mfcp/blob/main/README.zh-CN.md)整理，参与规则与年度安排请以官方文档及公告为准。

</section>
