# 生命链项目 - Claude 工作指南

> 本文档为 Claude Code 提供项目上下文和开发规范

---

## 📋 项目概述

**项目名称**：生命链 (LifeChain)

**项目定位**：跨世代数字人格陪伴系统

**核心功能**：
- 数字人格核心系统（人格建模、关系建模、情绪识别）
- 人生记忆系统（记忆采集、结构化、回顾）
- 阶段化人生陪伴（儿童→青少年→青年→中年→老年）
- 数字资产与跨代传承
- 多端协同（移动APP、小程序、Web管理后台）

**项目阶段**：技术架构设计阶段

---

## 🏗️ 技术架构

### 前端技术栈
- **移动端**：React Native + TypeScript
- **小程序**：Taro 3.x + React + TypeScript
- **Web管理后台**：React 18 + TypeScript + Ant Design + Vite
- **状态管理**：Zustand + React Query
- **代码组织**：Monorepo (pnpm workspace)

### 后端技术栈
- **开发语言**：Node.js + TypeScript
- **开发框架**：NestJS
- **数据库**：PostgreSQL 15+ (主库)
- **缓存**：Redis 7.x
- **向量数据库**：Milvus (记忆检索)
- **图数据库**：Neo4j (人物关系)
- **消息队列**：RabbitMQ
- **对象存储**：MinIO / 阿里云OSS

### AI能力
- **大语言模型**：OpenAI GPT-4 / 国产大模型
- **AI框架**：LangChain
- **语音识别**：Azure ASR / 阿里云
- **语音合成**：Azure TTS / 腾讯云
- **情绪识别**：自研模型 + 第三方API

### 基础设施
- **容器化**：Docker + Kubernetes
- **CI/CD**：GitHub Actions
- **监控**：Prometheus + Grafana
- **日志**：ELK Stack
- **API网关**：Kong / APISIX

---

## 📂 项目结构

```
/Volumes/codes/xn/life-chain/
├── CLAUDE.md                    # 本文件
├── .claude/                     # Claude配置目录
│   └── skills/                  # 自定义技能
├── docs/                        # 文档目录
│   ├── project.md               # 产品需求文档
│   ├── 页面功能目录.md          # 页面功能结构
│   ├── 技术架构设计.md          # 技术架构方案
│   └── 多端策略分析.md          # 多端策略
├── packages/                    # Monorepo包目录（待创建）
│   ├── shared/                  # 共享代码
│   ├── mobile/                  # React Native APP
│   ├── miniapp/                 # Taro 小程序
│   └── web-admin/               # React Web管理后台
└── server/                      # 后端服务（待创建）
    ├── services/                # 微服务
    └── shared/                  # 后端共享代码
```

---

## 🎯 开发规范

### 代码风格
- **语言**：全部使用 TypeScript，严格类型检查
- **命名规范**：
  - 文件名：kebab-case (例：user-service.ts)
  - 组件名：PascalCase (例：MemoryCard.tsx)
  - 变量/函数：camelCase (例：getUserById)
  - 常量：UPPER_SNAKE_CASE (例：MAX_RETRY_COUNT)
  - 接口：以 I 开头 (例：IUserRepository)
  - 类型：以 T 开头或直接 PascalCase (例：TMemory, UserDTO)

### Git提交规范
使用 Conventional Commits 规范：
```
feat: 新功能
fix: 修复bug
docs: 文档更新
style: 代码格式调整
refactor: 重构
test: 测试相关
chore: 构建/工具链相关
perf: 性能优化
```

示例：
```bash
feat(memory): 添加记忆语音识别功能
fix(chat): 修复对话上下文丢失问题
docs: 更新API文档
```

### 分支管理
- `main` - 主分支，保护分支
- `develop` - 开发分支
- `feature/*` - 功能分支
- `fix/*` - 修复分支
- `release/*` - 发布分支

### 代码审查要点
1. ✅ TypeScript类型完整，无any滥用
2. ✅ 错误处理完善
3. ✅ 关键逻辑有单元测试
4. ✅ API有文档注释
5. ✅ 性能考虑（避免N+1查询、大循环等）
6. ✅ 安全考虑（SQL注入、XSS、权限检查）
7. ✅ 代码可读性（复杂逻辑有注释）

---

## 🔐 安全与隐私

### 核心原则
1. **数据加密**：敏感数据必须加密存储
2. **最小权限**：遵循最小权限原则
3. **隐私保护**：用户数据严格隔离，记忆分级管理
4. **审计日志**：关键操作必须记录
5. **内容审核**：UGC内容必须审核

### 敏感数据处理
- 密码：bcrypt加密，不可逆
- Token：JWT，短期有效期（2小时）
- 记忆数据：用户级隔离，支持隐私等级
- 继承人数据：严格身份验证

---

## 🛡️ 文件保护机制

为了保证项目的稳定性和一致性，关键文件受到多重保护。

### 受保护的文件

以下文件受到保护，修改需要特定权限人员审批：

#### 核心配置文件
- `CLAUDE.md` - 项目工作指南（项目负责人）
- `.claude/skills/*.md` - Claude 技能定义（项目负责人）
- `package.json` - 根配置文件（技术负责人）
- `pnpm-workspace.yaml` - Monorepo 配置（技术负责人）
- `tsconfig.base.json` - TypeScript 基础配置（技术负责人）

#### 核心文档
- `docs/技术架构设计.md` - 技术架构文档（技术负责人）
- `docs/页面功能目录.md` - 功能结构文档（产品负责人）
- `docs/多端策略分析.md` - 多端策略文档（技术负责人）

#### 数据库相关
- `**/prisma/schema.prisma` - 数据库结构（后端负责人 + DBA）
- `**/migrations/` - 数据库迁移（后端负责人 + DBA）

#### CI/CD 配置
- `.github/workflows/**` - GitHub Actions（DevOps）
- `.github/CODEOWNERS` - 代码所有者配置（项目负责人）
- `Dockerfile` - Docker 配置（DevOps）

### 保护机制

#### 1. CODEOWNERS（GitHub/GitLab）
在 `.github/CODEOWNERS` 中定义了文件所有者：
- 修改受保护文件的 PR 需要指定审查者批准
- 无法绕过审查直接合并

#### 2. Git Hooks（本地检查）
Pre-commit hook 会在提交前检查：
- 检测是否修改了受保护的文件
- 给出警告并要求确认
- 提示需要的审批流程

**安装 Git Hooks**:
```bash
bash scripts/install-hooks.sh
```

#### 3. CI 检查（自动化）
GitHub Actions 会自动检查：
- 检测受保护文件的修改
- 在 PR 中添加警告评论
- 检查 PR 描述是否包含修改说明
- 添加"需要特别审查"标签
- PR 描述不完整时阻止合并

### 修改受保护文件的流程

如果你确实需要修改受保护的文件：

1. **事前沟通**
   - 与相关负责人讨论修改必要性
   - 在团队会议中说明修改计划
   - 获得初步同意

2. **创建分支**
   ```bash
   git checkout -b feature/update-protected-file
   ```

3. **修改文件**
   - 进行必要的修改
   - 确保修改经过充分测试

4. **提交时确认**
   - Git hook 会提示警告
   - 确认继续提交
   - Commit message 添加 `[PROTECTED]` 标签
   ```bash
   git commit -m "[PROTECTED] docs: 更新技术架构设计文档

   修改原因：
   - XXX 技术栈更新
   - XXX 架构调整

   影响范围：
   - XXX

   审查者：@tech-lead"
   ```

5. **创建 PR**
   - 在 PR 描述中详细说明修改原因
   - 列出影响范围
   - @ 相关审查人员
   - 添加必要的上下文

6. **等待审查**
   - CODEOWNERS 中指定的人员会收到通知
   - CI 会自动添加评论和标签
   - 需要所有指定审查者批准才能合并

### PR 描述模板（修改受保护文件）

```markdown
## 📋 修改的受保护文件

- [ ] CLAUDE.md
- [ ] docs/技术架构设计.md
- [ ] ...

## 📝 修改原因

详细说明为什么需要修改这些文件...

## 🎯 修改内容

1. XXX
2. XXX

## 📊 影响范围

- 影响的模块：XXX
- 影响的团队成员：XXX

## ✅ 检查清单

- [ ] 已与相关负责人沟通
- [ ] 修改已在团队中知晓
- [ ] 相关文档已同步更新
- [ ] 已添加必要的审查人员

## 👥 审查者

@tech-lead @project-owner
```

### 紧急情况处理

如果遇到紧急情况需要快速修改受保护文件：

1. **临时绕过 Hook**（不推荐）
   ```bash
   git commit --no-verify -m "message"
   ```

2. **紧急修复流程**
   - 立即通知项目负责人
   - 创建 PR 并标记为 `[URGENT]`
   - 在团队群中说明情况
   - 事后补充完整的说明文档

### 注意事项

⚠️ **重要提示**：
1. 不要频繁修改受保护的文件
2. 每次修改都要有充分的理由
3. 修改前一定要备份
4. 修改后要同步通知团队
5. 不要使用 `--no-verify` 绕过检查（除非紧急情况）

---

## 📝 开发任务优先级

### 第一阶段（MVP - 3个月）
**优先级1：移动端APP（React Native）**
- [ ] 用户注册/登录系统
- [ ] 数字人人格初始化
- [ ] 基础对话功能
- [ ] 记忆采集（文字、图片）
- [ ] 记忆浏览与时间轴

**优先级2：Web管理后台（React）**
- [ ] 管理员登录
- [ ] 用户管理
- [ ] 人格模板配置
- [ ] 系统监控

**优先级3：后端服务（NestJS）**
- [ ] 认证授权服务
- [ ] 用户服务
- [ ] 记忆服务
- [ ] 对话服务（LLM集成）
- [ ] 数据库设计与ORM

### 第二阶段（功能完善 - 6个月）
- [ ] 小程序开发（Taro）
- [ ] 语音对话功能
- [ ] 情绪识别系统
- [ ] 向量检索（Milvus）
- [ ] 知识图谱（Neo4j）
- [ ] 阶段陪伴功能

### 第三阶段（高级功能 - 9个月）
- [ ] 数字遗产与传承
- [ ] 硬件设备联动
- [ ] VR空间（可选）
- [ ] 模型fine-tuning

---

## 🛠️ 开发工作流

### 1. 新功能开发流程
```bash
# 1. 创建功能分支
git checkout -b feature/memory-voice-recognition

# 2. 开发功能（使用Claude Code辅助）
# - 编写代码
# - 编写测试
# - 本地测试

# 3. 提交代码
git add .
git commit -m "feat(memory): 添加记忆语音识别功能"

# 4. 推送并创建PR
git push origin feature/memory-voice-recognition
# 在GitHub创建Pull Request

# 5. 代码审查通过后合并
```

### 2. Bug修复流程
```bash
# 1. 创建修复分支
git checkout -b fix/chat-context-loss

# 2. 修复bug
# 3. 添加测试防止回归
# 4. 提交并创建PR
```

### 3. 使用Claude Code的最佳实践
- 📖 **阅读文档优先**：开发前先阅读相关设计文档
- 🧪 **测试驱动**：编写功能时同步编写测试
- 📝 **代码注释**：复杂逻辑添加注释
- 🔍 **代码审查**：让Claude审查代码质量
- 📚 **文档同步**：代码变更同步更新文档

---

## 🚀 常用命令（待创建skills后使用）

### 项目管理
- `/start-feature [功能名]` - 开始新功能开发
- `/review-code` - 代码审查
- `/generate-api-doc` - 生成API文档
- `/create-test` - 创建测试文件

### 代码生成
- `/create-service [服务名]` - 创建后端服务
- `/create-page [页面名]` - 创建前端页面
- `/create-component [组件名]` - 创建React组件
- `/create-api [接口名]` - 创建API接口

### 数据库
- `/design-table [表名]` - 设计数据库表
- `/generate-migration` - 生成数据库迁移
- `/create-seed` - 创建种子数据

---

## 📊 性能指标

### 前端性能目标
- FCP (First Contentful Paint): < 1.5s
- LCP (Largest Contentful Paint): < 2.5s
- TTI (Time to Interactive): < 3.5s
- 包体积: 移动端 < 50MB，小程序 < 10MB

### 后端性能目标
- API响应时间: P95 < 200ms
- 数据库查询: P95 < 50ms
- 并发支持: 1000 QPS
- 可用性: 99.9%

### AI服务性能目标
- 对话生成: 首字延迟 < 1s
- 语音识别: 延迟 < 500ms
- 情绪识别: 延迟 < 100ms

---

## 🧪 测试策略

### 测试金字塔
```
           /\
          /E2E\          - 端到端测试 (10%)
         /------\
        /集成测试 \       - 集成测试 (30%)
       /----------\
      /  单元测试   \     - 单元测试 (60%)
     /--------------\
```

### 测试要求
- **单元测试**：核心业务逻辑覆盖率 > 80%
- **集成测试**：API接口测试覆盖所有端点
- **E2E测试**：核心用户流程自动化测试
- **性能测试**：关键接口压力测试

---

## 📖 重要文档链接

- [页面功能目录](./docs/页面功能目录.md)
- [技术架构设计](./docs/技术架构设计.md)
- [多端策略分析](./docs/多端策略分析.md)

---

## 🤝 协作指南

### 与Claude协作的最佳方式
1. **明确任务**：清晰描述要完成的功能
2. **提供上下文**：引用相关文档（使用@符号）
3. **分步实现**：复杂功能分解为小任务
4. **及时反馈**：代码问题及时沟通调整
5. **保持同步**：重要变更更新CLAUDE.md

### 代码审查检查清单
```markdown
- [ ] 功能是否符合需求
- [ ] 代码是否符合规范
- [ ] 类型定义是否完整
- [ ] 错误处理是否完善
- [ ] 是否有单元测试
- [ ] 性能是否有考虑
- [ ] 安全是否有保障
- [ ] 文档是否已更新
```

---

## 🎨 设计系统

### 颜色规范
```typescript
const colors = {
  primary: '#FF8A5B',      // 主色调：温暖橙色
  secondary: '#5BA3FF',    // 辅助色：柔和蓝色
  success: '#52C41A',      // 成功
  warning: '#FAAD14',      // 警告
  error: '#F5222D',        // 错误
  text: {
    primary: '#262626',    // 主文本
    secondary: '#8C8C8C',  // 次要文本
    disabled: '#BFBFBF',   // 禁用文本
  },
  background: {
    default: '#FFFFFF',    // 默认背景
    secondary: '#FAFAFA',  // 次要背景
  }
};
```

### 间距规范
```typescript
const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};
```

### 字体规范
```typescript
const fontSize = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
};
```

---

## 🔄 数据同步策略

### 多端数据一致性
1. **实时同步**：关键数据（记忆、对话）立即同步
2. **增量同步**：定期同步非关键数据
3. **冲突解决**：服务端时间戳 + 版本号
4. **离线支持**：本地缓存 + 网络恢复后同步

### 缓存策略
- **热数据**：Redis缓存，TTL 1小时
- **温数据**：Redis缓存，TTL 24小时
- **冷数据**：不缓存，直接查询数据库

---

## 📞 问题处理

### 遇到问题时
1. **查阅文档**：先查看项目文档
2. **搜索代码**：使用Grep搜索类似实现
3. **询问Claude**：描述问题，寻求解决方案
4. **记录问题**：重要问题记录到文档

### 常见问题
- **TypeScript类型错误**：检查类型定义是否完整
- **API调用失败**：检查网络、权限、参数
- **性能问题**：使用性能分析工具定位
- **内存泄漏**：检查事件监听、定时器清理

---

## 📅 项目里程碑

- ✅ 2026-02-24：完成技术架构设计
- ⏳ 2026-03-01：启动MVP开发
- ⏳ 2026-06-01：MVP上线测试
- ⏳ 2026-09-01：小程序上线
- ⏳ 2026-12-01：完整功能上线

---

## 💡 注意事项

### 开发注意事项
1. **不要过度工程**：保持简单，只做必要的抽象
2. **安全第一**：敏感数据必须加密，权限必须检查
3. **用户体验**：考虑加载状态、错误提示、空状态
4. **性能优化**：避免过早优化，先实现功能
5. **代码复用**：利用Monorepo复用代码

### AI使用注意事项
1. **成本控制**：缓存相同输入，避免重复调用
2. **结果验证**：AI生成内容需要验证和审核
3. **降级策略**：AI服务故障时的备用方案
4. **隐私保护**：用户数据不泄露到第三方AI

---

**最后更新**：2026-02-24
**维护者**：开发团队
**文档版本**：v1.0
