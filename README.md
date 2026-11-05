---
title: 进程使命公司官网
description: 基于 Astro、TypeScript 和原生 CSS 的中文静态官网
---

# 进程使命公司官网

公司展示型官网，使用 Astro 生成静态 HTML。首页提供品牌与核心能力摘要；产品与平台、行业方案、技术架构、资料与支持、开源社区和公司介绍分别使用独立栏目页面，五类产品和五类行业方案各有详情页，另提供 404 页面。

正式网站不使用 CMS、database、SSR 或运行时 backend，不加载外部字体或第三方脚本。页面构建为静态 HTML，浏览器端使用 Astro 内置 `ClientRouter` 提供页面切换，并通过原生导航脚本处理菜单动画、焦点和当前锚点状态；没有额外 UI framework 或动画依赖。开发环境另启用 Astro Dev Toolbar 和 Astrotation 页面标注。

## 本地开发

需要 Node.js 22.23.4 或更新版本，以及 npm。`.nvmrc` 固定了构建使用的 Node.js 版本。

```sh
npm ci
npm run dev
```

访问终端输出的本地地址，默认是 `http://localhost:4321/`。

### 局域网开发与页面评论

Astrotation 作为固定版本 devDependency 接入 `astro.config.mjs`，随 Astro dev 启动；不在正式构建或 preview 中加载。

```sh
npm run dev -- --host 0.0.0.0 --port 4321
```

在 Mac 浏览器中打开 Linux 主机的 `http://<Linux-IP>:4321/`。页面和标注通过同一个 Astro 开发服务通信，无需在 Mac 安装插件或额外模块。开发服务暴露源码上下文和评论，仅在可信局域网或 VPN 中使用，不作为公网正式服务。

1. 点击页面底部 Astro Dev Toolbar 中的 **Astrotation**。
2. 点击需要反馈的元素，输入评论，按 Enter 提交；Shift+Enter 换行。
3. 在 Agent 中发出「读取未处理评论，核实后修改」指令。不会自动通知 Agent 或启动 watch 模式。
4. Agent 可回复评论或交回验收；在网页面板中回复、确认 resolve 或删除评论。

评论保存在 `.astrotation/annotations.json`，包含页面地址、元素 selector、样式及可获取的 Astro 源文件位置；该目录已加入 `.gitignore`。刷新页面后评论仍保留。

### Agent 读取入口

Astrotation MCP 使用 Streamable HTTP，随开发服务启动，仅监听 Linux 本机：

- MCP：`http://127.0.0.1:7133/mcp`
- 健康检查：`http://127.0.0.1:7133/health`

Agent 可通过本机 MCP 的 `astrotation_list` / `astrotation_get` 读取评论，通过 `astrotation_reply` 回复，通过 `astrotation_feedback` 交回验收。只需读内容时也可读取本项目的评论 JSON；修改状态应通过 MCP 或网页完成，不直接改存储文件。

项目不修改任何全局 Agent 配置。需要在 Agent 的工具列表中常驻显示这些工具时，在所用客户端注册上述 MCP 地址；手动通过本机 HTTP MCP 读取和回复也可使用。

4321 被静态 preview 占用时，先执行 `npm run preview -- stop` 再启动 dev。停止当前开发服务使用 `npm run dev -- stop`。

## 检查与构建

```sh
npm run check
npm run build
npm run preview
```

`check` 执行 Astro 和 TypeScript 检查；`build` 将可发布的网站生成到 `dist/`；`preview` 仅用于本地检查构建产物，不是生产环境 application server。

## 页面路由

首页为 `/`，六个栏目页面如下。各页面可以直接访问和刷新，共用导航、页脚与 metadata 布局。

| 栏目 | 路径 |
| --- | --- |
| 产品与平台 | `/products/` |
| 行业方案 | `/industries/` |
| 技术架构 | `/architecture/` |
| 资料与支持 | `/resources/` |
| 开源社区 | `/community/` |
| 关于我们 | `/about/` |

产品详情由 `src/pages/products/[slug].astro` 在构建时生成，按两组展示：

| 分组 | 产品 | 详情路径 |
| --- | --- | --- |
| 系统软件 | 行业操作系统 | `/products/os/` |
| 系统软件 | Hypervisor | `/products/hypervisor/` |
| 工程平台 | DevOps 平台 | `/products/devops/` |
| 工程平台 | 调度确定性优化 | `/products/scheduling/` |
| 工程平台 | 认证工程与安全论证平台 | `/products/safety-assurance/` |

产品页说明定位、核心能力、接口适配、交付物和验证范围；行业页说明任务组合并链接相关产品；技术架构页通过 `#linux`、`#zephyr`、`#hypervisor` 解释底层机制。Hypervisor 同时具有独立产品页和技术章节，两者职责不同。

五个行业详情由 `src/pages/industries/[slug].astro` 在构建时生成：

| 行业 | 详情路径 |
| --- | --- |
| 航空机载 | `/industries/avionics/` |
| 航天星载 | `/industries/space/` |
| 具身机器人 | `/industries/robotics/` |
| 智能汽车 | `/industries/automotive/` |
| 工业边缘 | `/industries/industrial/` |

首页产品卡片和行业入口均进入对应详情。详情页保留标题、简介、正文及页底返回入口，不重复添加面包屑。产品总览保留 `#engineering` 工程交付章节。发布时使用多页面静态路由，不要配置将所有路径重写到首页的 SPA 规则。

栏目标题、产品卡片、行业卡片和架构要点不使用装饰性序号；编号仅用于表达真实流程阶段，例如产品总览的工程交付流程。社区页聚焦开源社区介绍，不设置通往商业产品工程方法的入口。

## 企业信息与待补内容

缺少已确认资料的栏目显示「需要补充更多内容」及具体待补项目。占位内容是公开的待完善说明，不代表已有账号、客户、资质、岗位、文档下载或支持服务；不生成假二维码、不填写推测的联系方式、不设置空链接。

| 位置 | 内容入口 |
| --- | --- |
| `/about/` | `#contact` 联系方式、`#channels` 官方账号、`#news` 公司动态、`#careers` 加入我们、`#partners` 合作伙伴、`#qualifications` 资质信息 |
| `/resources/` | `#product-materials` 产品资料、`#docs` 技术文档、`#videos` 视频演示、`#faq` 常见问题、`#support` 技术支持 |
| `/industries/#cases` | 经授权的客户案例与项目成果 |
| `/community/` | `#projects` 开源项目、`#docs` 社区文档、`#contributing` 参与贡献、`#discussion` 交流渠道 |
| 全站页脚 | 分组导航、联系方式、官方账号、备案信息、隐私说明与使用条款 |

社区名称为 **MissionHub**，定位为「面向关键任务领域的开源社区」，统一维护于 `src/content/pages/community.md` 的 frontmatter。公司名称、定位与介绍统一维护于 `src/content/pages/about.md`；联系方式、官方账号及页脚待补信息维护于 `src/content/shared/site.md`。微信公众号和 B站的具体占位位于 `/about/#wechat`、`/about/#bilibili`，页脚链接到这些真实页面位置。

`ContentPlaceholder.astro` 统一呈现待补内容，栏目标题与待补字段保持可读。收到真实资料后替换对应占位，账号与文件地址核实后再提供外链或下载；正式发布前逐项审核可公开范围。

## 配色与导航

配色使用公司 PPT 正文中的白底、深蓝灰、蓝灰与橙红：`#FFFFFF`、`#17232B`、`#274B61`、`#B64926`，浅灰底为 `#F2F5F6`。基础色板维护于 `src/styles/global.css` 的 `:root`，导航专用前景色维护于 `.site-header`。

首页和栏目标题区使用蓝灰、橙红柔光渐变；卡片、架构图与社区图形通过边缘高光和分层阴影建立层次。行业详情正文维持白底，局部面板使用轻量渐变与阴影。光影由静态 CSS 实现，不使用持续动画或动效库。

顶部导航由公司 Logo、六个栏目入口及窄屏折叠菜单组成，处于普通文档流中，随页面滚动，不吸顶或固定。Desktop 一级条目的外轮廓保持满高直角矩形，文字垂直居中、16px，不随 hover 位移或缩放。默认无凹陷效果，当前栏目仅保留文字高亮；鼠标悬浮或键盘可见焦点位于条目及其菜单中时，在矩形范围内通过上半弧阴影、中心浅暗与下缘柔和高光表现曲面下凹。装饰层不使用圆角或椭圆外轮廓，以 180ms 淡入淡出至 0.9 透明度，不参与鼠标命中；文字不受光影层透明度影响。

支持精细鼠标悬浮的 desktop 设备上，「产品与平台」「行业方案」「技术架构」「资料与支持」「关于我们」在移入时展开菜单，无需点击；进入下拉面板后保持展开，离开整个区域后收起。菜单面板内提供总览与内容入口；「开源社区」直接跳转。触控或无 hover 能力的设备保留点击开关；900px 及以下使用同一份数据嵌套展开。原生 `details` / `summary` 保留键盘与无脚本导航能力。站内按钮和文字链接不附带外链装饰图标。

Desktop 下拉面板统一使用 `0.5rem` 外框内边距，条目占满所在行并左对齐，左右内边距各 `1.25rem`，分组标题与条目文字对齐；选中标记使用内阴影，不占据文字布局。短菜单最小宽度为 `11rem`，长内容自然撑开，最大宽度不超过导航容器；产品菜单保留双列。面板顶部为直角，与导航项衔接，底部使用 `0.25rem` 小圆角。面板优先与触发栏目左侧对齐，空间不足时向内收拢，打开菜单和窗口缩放时更新位置。高度随内容增长并受可用屏幕高度限制。Mobile 子菜单保持原有内边距及嵌套布局，不应用 desktop 定位偏移。

键盘通过 Tab 移动、Enter 或空格展开，Escape 关闭当前层并将焦点还给对应标题。脚本处理外部点击、焦点离开导航区域、链接跳转、断点切换和历史恢复时的关闭状态；原生链接仍支持新标签打开。菜单采用 Web Animations API：展开为 180ms 淡入和 4px 轻微位移，收起为 140ms 退出，箭头同步旋转。动画可以中断或反向；关闭中的面板不接受点击或焦点。导航开始时立即收起菜单，避免面板进入页面切换画面。禁用 JavaScript 后仍可使用原生菜单和链接。

主导航沿用首屏同系的浅蓝灰、暖色柔光，不使用独立深色底或明显分割线。文字为深蓝灰，橙红仅用于当前栏目和 hover 等小面积强调；窄屏菜单保持浅色。系统高对比度模式下，Logo 区域保留白色衬底以保证深字标识可见，其他导航文字遵循系统颜色。

### Logo 与字号

| 用途 | Desktop | Mobile |
| --- | --- | --- |
| Logo 容器宽度 | 250px | 不超过 210px，按可用空间缩放 |
| 正文与简介 | 18px | 16px |
| 卡片说明与按钮 | 16px | 16px |
| 辅助说明与图示标签 | 至少 14px | 至少 14px |

字号使用 `rem`，保留浏览器字号与缩放设置；窄屏通过换行和布局重排容纳内容，不缩小信息文字。

### 系统字体

正文、导航与控件统一优先使用 `system-ui` 及操作系统原生字体候选，平台中文字体候选排在显式 Noto / Source Han 候选之前；Noto / Source Han 仅作后备。字体栈统一维护在 `--font-ui`，正文通过 `--font-sans` 复用同一优先级，避免两套顺序漂移。等宽文字优先使用 `ui-monospace`。实际字体由系统和已安装字体提供，不进行 UA 判断或外部字体下载。

## 页面切换

`BaseLayout` 使用 Astro 内置 `ClientRouter` 和 `fallback="animate"`。同源页面导航与浏览器前进、后退在当前文档内切换；内容区使用 280ms 的淡出和淡入，导航与页脚不跟随内容闪烁，不做页面滑动、缩放或尺寸插值。缺少原生 View Transition API 时，由 Astro 执行先淡出、替换内容、再淡入的动画回退。

导航脚本在 `astro:before-swap` 清理旧事件与菜单动画，并在 `astro:page-load` 绑定新页面，避免连续导航后菜单失效或重复处理事件。页面仍可直接访问、刷新和独立部署；禁用 JavaScript 时使用普通整页导航。

启用 `prefers-reduced-motion: reduce` 时关闭页面过渡、菜单动画和流畅滚动。首次加载、刷新及地址栏导航保持浏览器原有行为。Astrotation 仍仅在开发环境启用，批注按当前页面地址与源码上下文保存。

## 内容与样式维护

业务内容通过 Astro 原生 Content Collections 管理。17 个业务页面的正文与结构化内容由 Markdown 提供，`.astro` 保留路由、布局、组件与交互；404 页面仍是独立 Astro 模板。不使用 MDX、CMS 或额外 Markdown parser。

| 路径 | 用途 |
| --- | --- |
| `src/content/products/*.md`、`src/content/industries/*.md` | 五个产品与五个行业详情；frontmatter 提供目录摘要、排序和关联，正文提供详情 |
| `src/content/pages/*.md`、`src/content/prose/*.md` | 首页与六个栏目；`prose` 保存被架构图、卡片等组件分开的正文片段 |
| `src/content/shared/site.md` | 共享联系方式、官方账号、产品分组、工程阶段、架构图文字与页脚待补信息 |
| `src/content.config.ts`、`src/content/page-collections.ts` | 原生 `glob` loader、frontmatter schema 与产品关联校验 |
| `src/data/content.ts`、`src/data/navigation.ts` | 从集合读取内容，以及共享菜单的界面配置；不另存一份业务正文 |
| `src/pages/`、`src/layouts/`、`src/components/` | 静态路由、metadata、共享布局及卡片、架构图、占位等展示组件 |
| `src/styles/`、`src/scripts/navigation.ts` | 主题与排版、菜单样式、动画、焦点及 ClientRouter 生命周期处理 |

日常修改正文时编辑对应 `.md`，标题、摘要、排序、卡片字段和待补项目在文件顶部的 YAML frontmatter 中维护。正文使用 Markdown 段落、列表与链接；为保留分栏、说明面板和已有锚点，部分内容使用少量 HTML 容器或带 `id` 的标题。修改文字时保留这些容器的 class、id 与配对关系；列表后的 HTML 容器不要缩进为列表内容。

新增产品或行业时，复制同类 Markdown 文件并使用新的文件名作为 slug；文件名决定详情 URL，不再维护 TS 目录副本。`order` 决定目录顺序，产品 `group` 对应共享产品分组。行业 frontmatter 的 `recommendations` 使用产品文件名作为 `product`，并填写推荐理由；原生 `reference('products')` 与详情构建检查关联是否有效。推荐组合不作为硬件兼容性或认证清单。修改后运行 `npm run check` 和 `npm run build`。

Astrotation 可继续批注渲染后的 Markdown 元素；源码位置可能指向承载内容的 `.astro` 模板，而不是 `.md` 的准确行号。定位正文时结合页面 URL、元素文字与对应 Markdown 文件。调整集合配置后重启开发服务；普通 Markdown 内容修改由开发服务同步更新。

当前导航使用 `public/company-logo.webp` 透明深字红标版，反白版本另存于 `public/company-logo-reverse.webp`。两者均由公司介绍 PPT 中的原始 Logo 生成，保留原有比例和红色标记。装饰图形使用原生 CSS 绘制，不依赖第三方图片服务。

公司事实依据 `进程使命介绍202609-完整.pptx` 正文第 1–33 页。行业详情依据第 17–21 页；工程平台依据第 22–24 页；技术专题与 Hypervisor 产品依据第 26–32 页。讨论稿、已废弃参考页、竞品评价和内部商业模式不作为官网内容。页面保留原文中的迁移前提、验证范围与安全边界，不把认证目标表述为已获认证。

## 部署到腾讯云 EdgeOne Makers

使用平台的静态站点构建与发布能力，不需要部署适配器或配置 Functions。

- Framework：Astro。
- Node.js：满足 `package.json` 的 `engines.node`；可使用仓库中的 `.nvmrc`。
- 安装命令：`npm ci`。
- 构建命令：`npm run build`。
- 输出目录：`dist`。

发布资源仅使用 `dist/`，不要将公司介绍 PPT 放入 `public/` 或作为下载资源上传。若使用 Git 集成构建，应确认源仓库的访问权限；源仓库与公开的网站产物是不同的访问边界。

正式域名未提供，因此未设置虚构的 canonical URL 或 sitemap。正式发布时应使用实际域名配置这些信息，并补充经确认的 ICP 备案信息与公开联系渠道。网站没有占位联系表单或虚构联系方式。

## 视觉与源码参考

视觉结构参考 [Astro 官网源码仓库](https://github.com/withastro/astro.build/tree/bde5315fafb342cf191dda4995604f066958bd24)，包括居中首屏、受控行宽、分区组合、边框卡片和响应式 grid；配色以公司 PPT 为准。导航与首屏的背景协调思路参考其 [MainLayout](https://github.com/withastro/astro.build/blob/bde5315fafb342cf191dda4995604f066958bd24/src/layouts/MainLayout.astro)，不移植其深色主题、紫色色板或品牌素材。

具体参考：

- [首页 Hero](https://github.com/withastro/astro.build/blob/bde5315fafb342cf191dda4995604f066958bd24/src/pages/_components/landing-page/Hero.astro)。
- [FeatureCard](https://github.com/withastro/astro.build/blob/bde5315fafb342cf191dda4995604f066958bd24/src/pages/_components/landing-page/feature-cards/FeatureCard.astro)。
- [设计变量与布局配置](https://github.com/withastro/astro.build/blob/bde5315fafb342cf191dda4995604f066958bd24/tailwind.config.ts)。

本项目独立实现页面与 CSS，未复制该仓库的源码、字体、Logo、第三方客户 Logo 或插画。Astro 框架的许可证不能自动视为其官网仓库及素材的复制许可。
