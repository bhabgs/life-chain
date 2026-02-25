---
skill: init-project
description: 初始化生命链项目结构（Monorepo）
args: [package_name]
---

# 初始化项目结构

根据生命链项目的技术架构，初始化 Monorepo 项目结构。

## 执行步骤

1. **读取项目配置**
   - 阅读 CLAUDE.md 了解项目结构
   - 阅读 docs/技术架构设计.md 了解技术栈

2. **创建 Monorepo 根配置**
   - 创建 package.json（根配置）
   - 创建 pnpm-workspace.yaml
   - 创建 .gitignore
   - 创建 .eslintrc.js
   - 创建 .prettierrc
   - 创建 tsconfig.base.json

3. **创建 shared 包**
   ```
   packages/shared/
   ├── src/
   │   ├── types/          # TypeScript类型定义
   │   ├── constants/      # 常量
   │   ├── utils/          # 工具函数
   │   ├── api/            # API接口定义
   │   └── business/       # 业务逻辑
   ├── package.json
   └── tsconfig.json
   ```

4. **创建移动端包（如果指定）**
   ```
   packages/mobile/
   ├── src/
   │   ├── pages/
   │   ├── components/
   │   ├── services/
   │   ├── stores/
   │   ├── utils/
   │   └── assets/
   ├── package.json
   └── tsconfig.json
   ```

5. **创建小程序包（如果指定）**
   ```
   packages/miniapp/
   ├── src/
   │   ├── pages/
   │   ├── components/
   │   ├── services/
   │   ├── stores/
   │   └── assets/
   ├── package.json
   ├── project.config.json
   └── tsconfig.json
   ```

6. **创建 Web 管理后台包（如果指定）**
   ```
   packages/web-admin/
   ├── src/
   │   ├── pages/
   │   ├── components/
   │   ├── services/
   │   ├── stores/
   │   └── assets/
   ├── index.html
   ├── package.json
   ├── vite.config.ts
   └── tsconfig.json
   ```

7. **创建文档目录**
   - 将现有文档移动到 docs/ 目录

8. **初始化 Git**
   - git init（如果未初始化）
   - 创建初始提交

## 注意事项

- 使用 TypeScript 作为开发语言
- 统一代码风格配置（ESLint + Prettier）
- 配置合适的 tsconfig.json 继承关系
- 设置 pnpm workspace 依赖关系

## 完成后

1. 运行 `pnpm install` 安装依赖
2. 验证 workspace 配置正确
3. 输出项目结构供用户确认
