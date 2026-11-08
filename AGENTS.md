---
title: Repository Guidelines
description: 公司静态官网的架构、维护约定与验证入口
---

# Repository Guidelines

## Project Overview

进程使命公司展示型官网，使用 Astro、TypeScript、原生 CSS 和 Markdown；不使用 CMS、SSR、database 或运行时 backend。启动、构建与发布入口见 [README](README.md)。

## Architecture & Data Flow

- `src/content/` 的 Markdown 是业务内容单一来源；frontmatter 保存 metadata、排序和关联，正文保存介绍、列表和链接。Content Collections 的 glob loader 和 Zod schema 在构建时校验内容。
- `src/data/content.ts` 通过 `getEntry()` / `getCollection()` 派生公司信息、目录与共享数据；页面通过 `render()` 输出 Markdown。不要在 TS 或模板中另存一份业务正文。
- 产品和行业详情由 `getStaticPaths()` 生成。Markdown 文件名决定 entry ID 和详情 slug，`order` 决定目录顺序，产品 `group` 对应共享分组；行业推荐通过 `reference('products')` 和 `getEntries()` 关联产品。
- `BaseLayout.astro` 统一 metadata、导航、页脚与 `ClientRouter`。`src/data/navigation.ts` 定义栏目及锚点，产品和行业菜单从目录派生；新增普通内容页还需添加实际 Astro 路由和入口，不能只增加 Markdown。
- 模板中的站内逻辑路径和 public 资源用 `withBase()` 输出；菜单和 frontmatter 保留 `/products/` 等逻辑路径。Markdown 正文链接按实际渲染页面使用相对路径，例如产品详情中的 `../../architecture/`；不要写死 `/company-website/`。

## Key Directories

| 路径 | 维护职责 |
| --- | --- |
| `src/content/` | 产品、行业、栏目、MFCP、共享信息及分段正文；优先在此修改文案 |
| `src/assets/` | 本地插画源文件，交由 Astro 优化并生成发布资源 |
| `src/data/` | collection 派生数据与共享导航配置，不维护重复正文 |
| `src/pages/`、`src/layouts/`、`src/components/` | 静态路由、公共页面结构与展示组件 |
| `src/styles/`、`src/scripts/` | 主题与导航样式、原生浏览器交互及生命周期 |
| `public/` | 直接发布的静态资源；不要放入私有 PPT、凭据或内部资料 |

## Development Commands

在仓库根目录运行：

```sh
npm ci
npm run dev -- --host 0.0.0.0 --port 4321
node src/utils/paths.test.mjs
npm run check
npm run build
npm run preview -- --port 4322
```

`check` 检查 Astro/TypeScript，`build` 输出 `dist/`，`preview` 仅检查静态产物，不是生产服务。后台 dev/preview 的状态、日志及停止命令分别为 `npm run dev -- status` / `logs` / `stop` 和 `npm run preview -- status` / `logs` / `stop`；修改 collection 配置后重启 dev。

模拟 GitHub Pages 时，构建和 preview 使用同一组变量，访问 preview 地址下的 `/company-website/`：

```sh
SITE_URL=https://processmission.github.io SITE_BASE=/company-website npm run build
SITE_URL=https://processmission.github.io SITE_BASE=/company-website npm run preview -- --port 4322
```

切换部署模式前停止已有 preview；普通根路径构建不设置这两个变量，重新 build 和 preview。没有 `npm test`、lint 或 format script，不要编造对应命令。

## Code Conventions & Common Patterns

- 沿用两空格缩进、JS/TS 单引号与分号、HTML 属性双引号。Astro 组件使用 PascalCase 文件名，内容 slug 使用小写/kebab-case；不顺手重排或格式化无关代码。
- Astro frontmatter 使用顶层 `await` 读取和渲染内容；动态详情使用 `CollectionEntry` 和 typed `Props`。依赖通过 ESM import 与 Props 传递，没有 DI container 或 UI framework；优先复用现有组件、schema 和 helper。
- 保留 Markdown 中已有 class、id 和容器配对；不要把列表后的 HTML 缩进成列表内容。schema 是内容校验边界，不用空值 fallback 掩盖缺失条目或错误关联；未知公开资料使用 `ContentPlaceholder.astro`，不编造联系方式、客户、资质、账号或认证结论。
- 产品和行业配图通过 frontmatter 的 `image` / `imageAlt` 与原生 `image()` schema 关联，模板使用 `astro:assets` 的 `Image`；Markdown 正文使用标准图片语法引用 `src/assets/`，不热链图片或将源文件路径直接传给 HTML `img`。插图以 [SystemDiagram](src/components/SystemDiagram.astro) 和[行业 OS SVG](src/assets/site/os.svg) 的浅色渐变、边缘高光、柔和阴影为渲染基准，保留透明外底、图内 Helvetica Neue / Arial 字体和适度留白，各图按主题组织内容，不机械复制同一构图。
- 导航状态集中在 `src/scripts/navigation.ts` 的 `Map` 和 `setOpen()`；事件通过 `AbortController` 清理。保留 `astro:before-swap` 清理、`astro:page-load` 重绑及动画取消，避免连续切页后积累监听器；不要另建状态层。
- 保持现有浅色主题、系统字体 fallback、原生 `details` / `summary`、键盘和 reduced-motion 行为；不要将内容调整扩展为视觉重设计。

先确认变更范围再实现，只修改本仓库。Git 沿用 Conventional Commits，英文标题和 body 每行不超过 72 字符，使用 `git commit -s`；提交须单独确认，不把网站行为修改混入纯 CI 提交。

## Important Files

- 内容契约：[src/content.config.ts](src/content.config.ts)、[src/content/page-collections.ts](src/content/page-collections.ts)；共享数据入口：[src/data/content.ts](src/data/content.ts)。
- 页面公共入口：[BaseLayout.astro](src/layouts/BaseLayout.astro)；菜单定义：[navigation.ts](src/data/navigation.ts)；交互实现：[navigation.ts](src/scripts/navigation.ts)。
- 路径处理：[paths.ts](src/utils/paths.ts)；构建配置：[astro.config.mjs](astro.config.mjs)；发布流程：[deploy.yml](.github/workflows/deploy.yml)。

## Runtime/Tooling Preferences

- 使用 Node.js `>=22.23.4`，优先采用 [.nvmrc](.nvmrc)；包管理器是 npm，依赖以 `package-lock.json` 为准。不要把 Bun、其他 lockfile 或新的 UI/动画/Markdown framework 当作现有工具链。
- `SITE_URL` 和 `SITE_BASE` 由构建环境传入，配置读取 `process.env`；默认分别为未设置和 `/`。GitHub Pages workflow 从 Pages metadata 获取 origin/base；仅发布 `dist/`。
- `node_modules/`、`dist/`、`.astro/`、`.npm-cache/`、`.astrotation/`、环境文件及日志是忽略内容，不作为源码提交。
- Astrotation 仅用于 dev，MCP 在本机 `127.0.0.1:7133/mcp`，配置见 [.omp/mcp.json](.omp/mcp.json)。暴露 dev 只限可信 LAN/VPN；读取批注后按指令处理，不自动 watch。批注状态通过 MCP/网页修改，不直接编辑存储 JSON；源码位置可能指向模板而非 Markdown 行。

## Testing & QA

- 唯一现有自动化测试是 `node src/utils/paths.test.mjs`，使用 `node:assert/strict`，覆盖前缀、根路径、query/hash、外链、相对路径与幂等性；没有测试框架或 coverage 阈值，也不覆盖页面、导航、视觉或 helper 的默认环境参数。
- 代码/内容修改按影响运行路径测试、`npm run check` 和 `npm run build`；路径变化还需分别验证根路径与 Pages 子路径。CI 执行路径测试、check、build，但不是 PR 检查 workflow；只在 `main` 执行部署。
- UI/导航变化用实际浏览器检查受影响页面、链接/锚点、当前栏目、desktop/mobile、键盘、连续切页和返回行为。构建通过不能替代浏览器验证；保留无 JS 导航和 reduced-motion 行为。
- 仅文档修改检查内容、相对链接和命令即可；未运行的检查不得声称通过。新增测试针对可观察行为和真实边界，不为静态文案或简单转发引入测试框架。
