# 🌐 多平台支持总览

> 本项目支持 GitHub、GitLab、Gitee 等主流 Git 平台

---

## ✅ 支持的平台

| 平台 | Git Hooks | CODEOWNERS | CI 检查 | 完整度 |
|-----|-----------|------------|---------|--------|
| **GitHub** | ✅ | ✅ | ✅ | 100% |
| **GitLab** | ✅ | ✅ | ✅ | 100% |
| **Gitee（码云）** | ✅ | ✅ | ✅ | 100% |
| **Bitbucket** | ✅ | ✅ | ⚠️ | 80% |
| **Azure DevOps** | ✅ | ❌ | ⚠️ | 60% |
| **自建 Git** | ✅ | ❌ | ⚠️ | 40% |

---

## 📂 文件位置兼容性

### 通用文件（所有平台）

```
life-chain/
├── CODEOWNERS                        # ✅ 所有平台（根目录）
├── hooks/                            # ✅ 所有平台
│   └── pre-commit
└── scripts/                          # ✅ 所有平台
    ├── check-protected-files.sh      # 通用检查脚本
    └── install-hooks.sh              # 通用安装脚本
```

### 平台特定文件

```
life-chain/
├── .github/                          # GitHub 专用
│   └── workflows/
│       └── check-protected-files.yml
├── .gitlab-ci.yml                    # GitLab 专用（从 ci/ 复制）
└── .gitee/                           # Gitee 专用
    └── workflows/
        └── check-protected-files.yml # （从 ci/ 复制）
```

### CI 配置模板

```
ci/
├── README.md                 # CI 配置说明
├── gitlab-ci.yml            # GitLab CI 模板
└── gitee-go.yml             # Gitee Go 模板
```

---

## 🚀 快速配置（按平台）

### GitHub（已配置，无需操作）

✅ **已完成配置**，推送即可使用！

```
# 已有的配置
.github/workflows/check-protected-files.yml
CODEOWNERS
hooks/pre-commit
```

**只需安装 Hooks**：
```bash
bash scripts/install-hooks.sh
```

---

### GitLab（3步配置）

#### 1️⃣ 复制 CI 配置

```bash
cp ci/gitlab-ci.yml .gitlab-ci.yml
```

#### 2️⃣ 调整配置（可选）

编辑 `.gitlab-ci.yml`：
- 修改分支名（main/master）
- 调整构建命令

#### 3️⃣ 推送代码

```bash
git add .gitlab-ci.yml
git commit -m "chore: 添加 GitLab CI"
git push
```

**完成！** 在 GitLab 的 CI/CD → Pipelines 查看运行状态。

---

### Gitee（4步配置）

#### 1️⃣ 创建目录

```bash
mkdir -p .gitee/workflows
```

#### 2️⃣ 复制配置

```bash
cp ci/gitee-go.yml .gitee/workflows/check-protected-files.yml
```

#### 3️⃣ 启用 Gitee Go

在 Gitee 项目设置中启用 Gitee Go（需要企业版）

#### 4️⃣ 推送代码

```bash
git add .gitee/
git commit -m "chore: 添加 Gitee Go"
git push
```

**完成！** 在 Gitee 的 Gitee Go 页面查看运行状态。

---

### Bitbucket

#### 使用 Pipelines

创建 `bitbucket-pipelines.yml`：

```yaml
pipelines:
  pull-requests:
    '**':
      - step:
          name: 检查受保护文件
          script:
            - bash scripts/check-protected-files.sh
```

---

### 其他平台

#### 仅使用 Git Hooks

```bash
# 安装 Hooks
bash scripts/install-hooks.sh

# 可选：配置服务器端 Hooks
# 在 Git 服务器上配置 pre-receive 或 update hooks
```

---

## 🛡️ 保护机制对比

### GitHub（三层保护）

```
1️⃣ 本地提交 → Git Hooks 检查
2️⃣ 创建 PR → GitHub Actions 检查
3️⃣ 代码审查 → CODEOWNERS 强制审查
```

✅ **最强保护**

### GitLab（三层保护）

```
1️⃣ 本地提交 → Git Hooks 检查
2️⃣ 创建 MR → GitLab CI 检查
3️⃣ 代码审查 → CODEOWNERS 强制审查
```

✅ **最强保护**

### Gitee（三层保护）

```
1️⃣ 本地提交 → Git Hooks 检查
2️⃣ 创建 PR → Gitee Go 检查
3️⃣ 代码审查 → CODEOWNERS 强制审查（企业版）
```

✅ **最强保护**（需要企业版）

### 自建 Git（单层保护）

```
1️⃣ 本地提交 → Git Hooks 检查
```

⚠️ **基础保护**（可以被绕过）

---

## 📋 迁移指南

### 从 GitHub 迁移到 GitLab

```bash
# 1. 复制 CI 配置
cp ci/gitlab-ci.yml .gitlab-ci.yml

# 2. CODEOWNERS 已在根目录（无需移动）

# 3. 调整分支名
sed -i 's/main/master/g' .gitlab-ci.yml  # 如果需要

# 4. 推送到 GitLab
git remote add gitlab https://gitlab.com/your/repo.git
git push gitlab main
```

### 从 GitHub 迁移到 Gitee

```bash
# 1. 创建 Gitee workflows 目录
mkdir -p .gitee/workflows

# 2. 复制配置
cp ci/gitee-go.yml .gitee/workflows/check-protected-files.yml

# 3. CODEOWNERS 已在根目录（无需移动）

# 4. 调整分支名
sed -i 's/main/master/g' .gitee/workflows/check-protected-files.yml

# 5. 推送到 Gitee
git remote add gitee https://gitee.com/your/repo.git
git push gitee master
```

### 从 GitLab 迁移到 GitHub

```bash
# 1. GitHub Actions 已有配置（无需操作）

# 2. CODEOWNERS 已在根目录（无需移动）

# 3. 推送到 GitHub
git remote add github https://github.com/your/repo.git
git push github main
```

---

## 🔍 测试保护机制

### 测试 Git Hooks

```bash
# 1. 安装 Hooks
bash scripts/install-hooks.sh

# 2. 测试修改受保护文件
echo "test" >> CLAUDE.md
git add CLAUDE.md
git commit -m "test"

# 应该看到警告 ⚠️

# 3. 取消修改
git reset HEAD~1
git checkout -- CLAUDE.md
```

### 测试 CI 检查

```bash
# 1. 创建测试分支
git checkout -b test/protected-files

# 2. 修改受保护文件
echo "test" >> CLAUDE.md
git add CLAUDE.md
git commit -m "test: 测试保护机制"

# 3. 推送并创建 PR/MR
git push origin test/protected-files

# 4. 在平台上创建 PR/MR
# 应该看到 CI 检查和警告评论

# 5. 清理
git checkout main
git branch -D test/protected-files
git push origin --delete test/protected-files
```

---

## 📚 详细文档

| 文档 | 说明 |
|-----|------|
| [多平台适配说明](./docs/多平台适配说明.md) | 详细的平台适配方案 |
| [CI 配置说明](./ci/README.md) | CI 配置详细指南 |
| [文件保护机制](./docs/文件保护机制说明.md) | 保护机制完整说明 |
| [FILE_PROTECTION.md](./FILE_PROTECTION.md) | 快速参考卡片 |

---

## ❓ 常见问题

### Q1: 我使用的平台不在列表中怎么办？

**A**: 使用 Git Hooks 方案：
1. 安装 Hooks：`bash scripts/install-hooks.sh`
2. 可选：配置服务器端 Hooks
3. 通过代码审查流程补充保护

### Q2: 必须使用所有三层保护吗？

**A**: 不必须，但推荐：
- **最低要求**：Git Hooks（本地保护）
- **推荐配置**：Git Hooks + CODEOWNERS
- **最佳实践**：完整三层保护

### Q3: 不同平台可以同时使用吗？

**A**: 可以！配置文件互不冲突：
```
.github/      # GitHub
.gitlab-ci.yml   # GitLab
.gitee/       # Gitee
CODEOWNERS    # 全部通用
```

### Q4: 如何自定义受保护文件列表？

**A**: 编辑两个地方：
1. `hooks/pre-commit` - 本地检查
2. `scripts/check-protected-files.sh` - CI 检查

### Q5: 可以临时禁用保护吗？

**A**:
- 本地：使用 `--no-verify`（不推荐）
- CI：修改配置文件（需要审查）
- 最好：通过正常流程，说明原因

---

## 🎯 推荐配置

### 开源项目
```
✅ GitHub/GitLab（完整三层保护）
✅ 公开的 CODEOWNERS
✅ 自动化 CI 检查
```

### 企业内部项目
```
✅ GitLab/Gitee 企业版（完整保护）
✅ CODEOWNERS + LDAP 集成
✅ 强制代码审查
```

### 小团队项目
```
✅ 任意平台
✅ Git Hooks（基础保护）
✅ 简单的 CODEOWNERS
```

---

## 🆘 获取帮助

- 📖 查看文档：`docs/` 目录
- 💬 提交 Issue：项目 Issue 页面
- 📧 联系管理员：@project-owner

---

**最后更新**: 2026-02-24
**支持的平台**: GitHub, GitLab, Gitee, Bitbucket, 自建 Git
