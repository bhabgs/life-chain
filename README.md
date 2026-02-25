# 生命链 (LifeChain)

> 跨世代数字人格陪伴系统

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18+-61dafb.svg)](https://reactjs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-10+-e0234e.svg)](https://nestjs.com/)

---

## 📖 项目简介

生命链是一个创新的数字人格陪伴系统，旨在为用户提供跨越整个生命周期的智能陪伴体验。通过AI技术、记忆管理和情绪识别，生命链能够记录、理解并陪伴用户的人生旅程，并支持跨代传承。

### 核心特性

- 🤖 **数字人格系统**：可定制的AI人格，与用户建立长期稳定的陪伴关系
- 📝 **人生记忆管理**：智能记录、结构化存储、语义检索用户的人生记忆
- 💭 **情绪识别与共情**：多模态情绪识别，提供温暖的情感陪伴
- 👶 **全生命周期陪伴**：从儿童到老年，不同阶段提供针对性功能
- 💎 **数字资产传承**：支持人格冻结和记忆传承给继承人
- 📱 **多端协同**：移动APP、小程序、Web管理后台无缝同步

---

## 🏗️ 技术架构

### 前端

- **移动端APP**: React Native + TypeScript
- **小程序**: Taro 3.x + React + TypeScript
- **Web管理后台**: React 18 + Ant Design + Vite
- **状态管理**: Zustand + React Query
- **代码组织**: Monorepo (pnpm workspace)

### 后端

- **开发框架**: NestJS (Node.js + TypeScript)
- **主数据库**: PostgreSQL 15+
- **缓存**: Redis 7.x
- **向量数据库**: Milvus（记忆检索）
- **图数据库**: Neo4j（人物关系）
- **消息队列**: RabbitMQ
- **对象存储**: MinIO / 阿里云OSS

### AI能力

- **大语言模型**: OpenAI GPT-4 / 国产大模型
- **AI框架**: LangChain
- **语音识别**: Azure ASR / 阿里云
- **情绪识别**: 自研模型 + 第三方API

### 基础设施

- **容器化**: Docker + Kubernetes
- **CI/CD**: GitHub Actions
- **监控**: Prometheus + Grafana
- **日志**: ELK Stack

---

## 📂 项目结构

```
life-chain/
├── .claude/                     # Claude Code 配置
│   └── skills/                  # 自定义技能
├── docs/                        # 项目文档
│   ├── 页面功能目录.md          # 功能结构文档
│   ├── 技术架构设计.md          # 技术架构文档
│   └── 多端策略分析.md          # 多端策略文档
├── packages/                    # 前端 Monorepo（待创建）
│   ├── shared/                  # 共享代码
│   ├── mobile/                  # React Native APP
│   ├── miniapp/                 # Taro 小程序
│   └── web-admin/               # React Web 管理后台
├── server/                      # 后端服务（待创建）
│   ├── services/                # 微服务
│   │   ├── user-service/        # 用户服务
│   │   ├── memory-service/      # 记忆服务
│   │   ├── chat-service/        # 对话服务
│   │   └── ...
│   └── shared/                  # 后端共享代码
├── CLAUDE.md                    # Claude 工作指南
├── README.md                    # 本文件
└── package.json                 # Monorepo 根配置
```

---

## 🚀 快速开始

### 环境要求

- Node.js >= 18.0.0
- pnpm >= 8.0.0
- PostgreSQL >= 15.0
- Redis >= 7.0
- Docker（可选）

### 安装依赖

```bash
# 安装 pnpm（如果未安装）
npm install -g pnpm

# 克隆项目
git clone https://github.com/your-org/life-chain.git
cd life-chain

# 安装依赖
pnpm install
```

### 开发环境

```bash
# 启动移动端开发服务器
pnpm --filter @lifechain/mobile dev

# 启动小程序开发服务器
pnpm --filter @lifechain/miniapp dev:weapp

# 启动Web管理后台
pnpm --filter @lifechain/web-admin dev

# 启动后端服务
pnpm --filter @lifechain/server dev
```

### 构建

```bash
# 构建所有包
pnpm build

# 构建指定包
pnpm --filter @lifechain/mobile build
```

### 测试

```bash
# 运行所有测试
pnpm test

# 运行单元测试
pnpm test:unit

# 运行集成测试
pnpm test:integration

# 查看测试覆盖率
pnpm test:coverage
```

---

## 📚 文档

### 核心文档

- [技术架构设计](./docs/技术架构设计.md) - 完整的技术架构方案
- [页面功能目录](./docs/页面功能目录.md) - 各端页面和功能结构
- [多端策略分析](./docs/多端策略分析.md) - 多端开发策略

### 开发指南

- [Claude 工作指南](./CLAUDE.md) - Claude Code 使用指南
- [技能使用说明](./.claude/skills/README.md) - 自定义技能说明
- [文件保护机制](./docs/文件保护机制说明.md) - 关键文件保护说明

### 平台配置

- [多平台适配说明](./docs/多平台适配说明.md) - GitHub、GitLab、Gitee 等平台支持
- [CI 配置说明](./ci/README.md) - 不同平台的 CI 配置
- [GitHub 配置说明](./.github/README.md) - GitHub 特定配置

---

## 🛠️ 开发工具

### Claude Code Skills

项目配置了多个自定义 Claude 技能，提高开发效率：

- `/init-project` - 初始化项目结构
- `/create-service` - 创建后端服务
- `/create-component` - 创建React组件
- `/create-page` - 创建页面
- `/db-design` - 设计数据库表
- `/review` - 代码审查
- `/api-doc` - 生成API文档

详见 [技能使用说明](./.claude/skills/README.md)

---

## 🎯 开发路线图

### 第一阶段：MVP（3个月）

- [x] 技术架构设计
- [ ] 项目脚手架搭建
- [ ] 用户认证系统
- [ ] 基础对话功能
- [ ] 记忆采集与浏览
- [ ] 移动端APP（核心功能）
- [ ] Web管理后台（基础功能）

### 第二阶段：功能完善（6个月）

- [ ] 小程序开发
- [ ] 语音对话功能
- [ ] 情绪识别系统
- [ ] 向量检索系统
- [ ] 知识图谱
- [ ] 阶段陪伴功能

### 第三阶段：高级功能（9个月）

- [ ] 数字遗产与传承
- [ ] 硬件设备联动
- [ ] VR空间
- [ ] 模型fine-tuning
- [ ] 多租户支持

---

## 🤝 贡献指南

我们欢迎所有形式的贡献！

### 提交代码

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'feat: add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

### 提交规范

遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

- `feat:` 新功能
- `fix:` 修复bug
- `docs:` 文档更新
- `style:` 代码格式调整
- `refactor:` 重构
- `test:` 测试相关
- `chore:` 构建/工具链相关

### 代码审查

所有代码必须经过审查才能合并：

- TypeScript类型完整
- 单元测试覆盖
- 遵循项目规范
- 文档同步更新

---

## 📄 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

---

## 👥 团队

- **项目负责人**: [@bhabgs](https://github.com/bhabgs)
- **技术架构**: [@bhabgs](https://github.com/bhabgs)
- **前端开发**: [@bhabgs](https://github.com/bhabgs)
- **后端开发**: [@bhabgs](https://github.com/bhabgs)
- **AI工程师**: [@bhabgs](https://github.com/bhabgs)

---

## 📧 联系方式

- **官网**:
- **邮箱**:
- **Issues**:
- **Discussion**:

---

## ⭐ Star History

如果这个项目对你有帮助，请给我们一个 Star ⭐

[![Star History Chart](https://api.star-history.com/svg?repos=bhabgs/life-chain&type=Date)](https://star-history.com/#bhabgs/life-chain&Date)

---

**Built with ❤️ by LifeChain Team**
