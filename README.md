---
title: 进程使命公司官网
description: 项目介绍、开发与发布入口
---

# 进程使命公司官网

使用 Astro 构建的进程使命公司官网。

网站：https://processmission.github.io/company-website/

## 本地开发

使用 npm，Node.js 版本见 [.nvmrc](.nvmrc)。

```sh
npm ci
npm run dev
```

访问终端输出的地址，默认是 `http://localhost:4321/`。

需要从其他设备预览时，使用 `npm run dev -- --host 0.0.0.0 --port 4321`，仅在可信网络中开放。开发时可通过 Astro Dev Toolbar 中的 Astrotation 提交页面批注。

## 检查与构建

```sh
node src/utils/paths.test.mjs
npm run check
npm run build
npm run preview -- --port 4322
```

构建产物位于 `dist/`，preview 用于本地预览。

## 内容编辑

页面文案维护在 `src/content/` 的 Markdown 文件中。开发约定见 [AGENTS.md](AGENTS.md)。

## 发布

`main` 分支更新后，[GitHub Actions](https://github.com/processmission/company-website/actions) 会检查、构建并发布到 GitHub Pages；也可在 Actions 页面手动触发。发布流程见 [deploy.yml](.github/workflows/deploy.yml)。
