# 🛡️ 文件保护快速参考

> 关键文件修改必读

---

## ⚠️ 受保护的文件

### 🔴 高保护（必须经过严格审查）

```
CLAUDE.md
.claude/skills/*.md
docs/技术架构设计.md
docs/页面功能目录.md
docs/多端策略分析.md
**/prisma/schema.prisma
**/auth/**
```

### 🟡 中保护（需要技术负责人审查）

```
package.json
pnpm-workspace.yaml
tsconfig.base.json
.github/**
Dockerfile
```

---

## 📋 修改流程（3步）

### 1️⃣ 事前沟通

```bash
# 与负责人讨论
# 在团队会议说明
# 获得初步同意
```

### 2️⃣ 创建 PR

```bash
git checkout -b feature/update-docs
git add docs/技术架构设计.md
git commit -m "[PROTECTED] docs: 更新技术架构

修改原因：XXX
影响范围：XXX"
git push origin feature/update-docs
```

### 3️⃣ 等待审查

```
GitHub 自动添加审查者
         ↓
审查者批准
         ↓
合并到主分支
```

---

## 🚀 快速命令

### 安装 Git Hooks

```bash
bash scripts/install-hooks.sh
```

### 检查受保护文件

```bash
# 查看最近修改
git log --oneline --name-only | grep -E "(CLAUDE|docs|prisma)"
```

### 绕过 Hook（仅限紧急）

```bash
git commit --no-verify -m "[URGENT] 紧急修复"
```

---

## 💡 PR 模板

```markdown
## 📋 修改的受保护文件
- [x] CLAUDE.md

## 📝 修改原因
XXX

## 📊 影响范围
- 模块：XXX
- 团队：XXX

## ✅ 检查清单
- [x] 已沟通
- [x] 已通知团队
- [x] 已添加审查者

## 👥 审查者
@tech-lead @project-owner
```

---

## ❓ 常见问题

**Q: 只改一个错别字也要审查吗？**
A: 是的。但审查会很快。

**Q: 审查者不在线怎么办？**
A: 联系项目负责人指定其他人。

**Q: 如何跳过检查？**
A: 使用 `--no-verify`，但仅限紧急情况。

---

## 📞 需要帮助？

- 项目负责人：@project-owner
- 技术负责人：@tech-lead
- 提交 Issue：[GitHub Issues](https://github.com/your-org/life-chain/issues)

---

## 🌐 支持的平台

✅ **GitHub** - 完整支持（Hooks + CODEOWNERS + Actions）
✅ **GitLab** - 完整支持（Hooks + CODEOWNERS + CI）
✅ **Gitee** - 完整支持（Hooks + CODEOWNERS + Go）
✅ **其他平台** - 基础支持（仅 Hooks）

查看 [多平台适配说明](./docs/多平台适配说明.md)

## 📚 详细文档

- [完整保护机制说明](./docs/文件保护机制说明.md)
- [多平台适配说明](./docs/多平台适配说明.md)
- [CI 配置说明](./ci/README.md)
- [CLAUDE 工作指南](./CLAUDE.md)

---

**记住**: 保护机制是为了项目稳定，不是为了阻碍开发。❤️
