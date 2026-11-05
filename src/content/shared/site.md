---
contactItems:
  - id: business
    title: 商务咨询
    needed: 公开商务联系邮箱及咨询方式
  - id: technical
    title: 技术咨询
    needed: 技术咨询渠道、受理方式及适用范围
  - id: phone
    title: 联系电话
    needed: 对外联系电话及接听时间
  - id: office
    title: 办公地址
    needed: 对外办公地址与来访联系信息
officialChannels:
  - id: wechat
    title: 微信公众号
    needed: 公众号名称、微信号及官方二维码
  - id: bilibili
    title: B站
    needed: 官方账号名称及主页链接
productGroups:
  - id: system-software
    title: 系统软件
  - id: engineering-platforms
    title: 工程平台
engineeringStages:
  - number: '01'
    title: 设备运行
    description: 镜像、BSP 与运行配置
  - number: '02'
    title: 研发验证
    description: 构建产物与验证记录
  - number: '03'
    title: 安全论证
    description: 追溯关系与证据包
  - number: '04'
    title: 部署运维
    description: 受控版本与现场反馈
diagram:
  title: 混合关键性计算
  stack: Linux + RTOS
  workloads:
    - 智能计算与复杂应用
    - 实时控制与设备 I/O
  runtimes:
    - label: 复杂应用域
      name: Linux
      description: AI / ROS 2 / 应用生态
    - label: 确定性控制域
      name: Zephyr
      description: 实时任务 / 采集 / 通信
  hypervisor:
    name: Hypervisor
    description: 分区调度 · 内存与设备隔离
    tag: 受控协同
  hardware: 硬件 / BSP
  architectures: ARM · x86 · RISC-V
  note: 共用计算平台，明确运行边界。
footer:
  contactNeeded: 公开联系邮箱、电话及办公地址
  legal:
    - title: 备案信息
      needed: 适用的备案号及查询链接
    - title: 隐私说明
      needed: 本站实际信息处理方式及隐私联系渠道
    - title: 使用条款
      needed: 网站内容使用与版权说明
---
