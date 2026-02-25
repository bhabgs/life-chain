# 生命链项目 - Claude Skills

这个目录包含了针对生命链项目开发的自定义 Claude 技能（Skills）。

## 📋 技能列表

### 1. 项目初始化

#### `/init-project`
初始化生命链项目的 Monorepo 结构。

**使用方法**:
```
/init-project
```

**功能**:
- 创建 Monorepo 根配置
- 创建 shared 包
- 创建移动端/小程序/Web 包
- 配置 TypeScript、ESLint、Prettier
- 初始化 Git

---

### 2. 后端开发

#### `/create-service <service_name> [description]`
创建 NestJS 后端服务模块。

**使用方法**:
```
/create-service user "用户管理服务"
/create-service memory "记忆管理服务"
```

**生成内容**:
- Controller（控制器）
- Service（业务逻辑）
- Repository（数据访问）
- DTO（数据传输对象）
- 单元测试

---

#### `/db-design <table_name> [description]`
设计数据库表结构（Prisma Schema）。

**使用方法**:
```
/db-design users "用户表"
/db-design memories "记忆表"
```

**功能**:
- 生成 Prisma 模型定义
- 配置字段类型和约束
- 设置索引和关系
- 生成迁移文件

---

### 3. 前端开发

#### `/create-component <component_name> <package_name> [component_type]`
创建 React 组件。

**使用方法**:
```
/create-component MemoryCard mobile ui
/create-component ChatBubble miniapp business
/create-component PageLayout web-admin layout
```

**参数说明**:
- `component_name`: 组件名（PascalCase）
- `package_name`: mobile / miniapp / web-admin
- `component_type`: ui / business / layout

**生成内容**:
- 组件主文件
- 类型定义
- 样式文件
- 测试文件

---

#### `/create-page <page_name> <package_name> <page_path>`
创建页面。

**使用方法**:
```
/create-page MemoryList mobile memory/list
/create-page ChatRoom miniapp chat/room
/create-page Dashboard web-admin dashboard
```

**生成内容**:
- 页面主文件
- 自定义 Hooks
- 类型定义
- 样式文件
- 路由配置

---

### 4. 代码质量

#### `/review <file_path>`
对指定文件进行全面的代码审查。

**使用方法**:
```
/review src/services/user.service.ts
/review packages/mobile/src/pages/home/index.tsx
```

**审查维度**:
- ✅ 代码规范
- ✅ 功能实现
- ✅ 性能优化
- ✅ 安全性
- ✅ 可维护性
- ✅ 测试完整性

**输出**:
- 详细的审查报告
- 问题严重程度标注
- 具体修改建议
- 综合评分

---

### 5. 文档生成

#### `/api-doc <service_name> [output_format]`
生成或更新 API 文档。

**使用方法**:
```
/api-doc user markdown
/api-doc memory openapi
```

**输出格式**:
- `markdown`: Markdown 格式文档
- `openapi`: OpenAPI 3.0 规范
- `swagger`: Swagger JSON

**生成内容**:
- 接口列表
- 请求参数说明
- 响应格式说明
- 错误码说明
- 调用示例（cURL、JavaScript、TypeScript）

---

## 🚀 快速开始

### 1. 初始化项目

```bash
# 使用技能初始化项目结构
/init-project

# 或者手动创建目录
mkdir -p packages/{shared,mobile,miniapp,web-admin}
mkdir -p server/services
```

### 2. 创建后端服务

```bash
# 创建用户服务
/create-service user "用户管理服务"

# 设计用户表
/db-design users "用户表"
```

### 3. 创建前端组件

```bash
# 创建移动端组件
/create-component MemoryCard mobile ui

# 创建小程序页面
/create-page MemoryList miniapp memory/list
```

### 4. 代码审查

```bash
# 审查代码
/review src/services/user.service.ts
```

### 5. 生成文档

```bash
# 生成 API 文档
/api-doc user markdown
```

---

## 📖 技能使用技巧

### 1. 组合使用

可以连续使用多个技能完成一个功能：

```
1. /db-design memories "设计记忆表"
2. /create-service memory "创建记忆服务"
3. /api-doc memory "生成API文档"
4. /create-page MemoryList mobile memory/list
```

### 2. 参数说明

- 必填参数：`<parameter>`
- 可选参数：`[parameter]`
- 参数带空格时用引号：`"带空格的描述"`

### 3. 路径参数

- 相对路径：从项目根目录开始
- 绝对路径：完整的文件系统路径

### 4. 包名约定

- `mobile`: React Native 移动端
- `miniapp`: Taro 小程序
- `web-admin`: React Web 管理后台
- `shared`: 共享代码包

---

## 🎯 最佳实践

### 1. 遵循项目规范

所有技能生成的代码都遵循 `CLAUDE.md` 中定义的规范：
- TypeScript 严格模式
- 统一的命名规范
- 代码风格配置
- 测试要求

### 2. 分步实现

复杂功能建议分步实现：
1. 先设计数据库（/db-design）
2. 再创建服务（/create-service）
3. 然后创建前端页面（/create-page）
4. 最后审查和优化（/review）

### 3. 及时文档化

代码完成后及时生成文档：
- API 文档（/api-doc）
- 组件文档（在组件中添加 JSDoc）
- 更新 README

### 4. 代码审查

提交代码前使用 `/review` 进行自查：
- 检查代码规范
- 发现潜在问题
- 优化性能
- 提升质量

---

## 🔧 自定义技能

### 创建新技能

1. 在 `.claude/skills/` 目录创建新文件
2. 使用 YAML frontmatter 定义技能元数据
3. 编写技能说明和执行步骤

**模板**:
```markdown
---
skill: my-skill
description: 技能描述
args: [arg1, arg2]
---

# 技能标题

技能详细说明...

## 参数说明

- `arg1`: 参数1说明
- `arg2`: 参数2说明

## 执行步骤

1. 步骤1
2. 步骤2
...
```

### 示例：创建测试技能

```markdown
---
skill: run-tests
description: 运行项目测试
args: [test_type, package_name]
---

# 运行测试

运行指定包的测试。

## 参数说明

- `test_type`: 测试类型（unit / integration / e2e）
- `package_name`: 包名（mobile / miniapp / web-admin）

## 执行步骤

1. 切换到包目录
2. 运行测试命令
3. 输出测试结果
```

---

## 📚 相关文档

- [CLAUDE.md](../../CLAUDE.md) - 项目工作指南
- [技术架构设计](../../docs/技术架构设计.md)
- [页面功能目录](../../docs/页面功能目录.md)

---

## ❓ 常见问题

### Q: 技能无法使用？
A: 确保文件名和 frontmatter 中的 skill 名称一致。

### Q: 如何查看所有可用技能？
A: 查看 `.claude/skills/` 目录下的所有 `.md` 文件。

### Q: 生成的代码不符合预期？
A: 检查参数是否正确，或手动调整生成的代码。

### Q: 可以修改技能吗？
A: 可以，直接编辑 `.claude/skills/` 下的技能文件。

---

**最后更新**: 2026-02-24
**维护者**: 开发团队
