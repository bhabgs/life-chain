# GitHub 配置说明

这个目录包含了项目的 GitHub 相关配置。

## 📂 目录结构

```
.github/
├── CODEOWNERS                    # 代码所有者配置
├── hooks/                        # Git Hooks
│   └── pre-commit               # Pre-commit 钩子
├── workflows/                    # GitHub Actions
│   └── check-protected-files.yml # 检查受保护文件
└── README.md                     # 本文件
```

---

## 🛡️ CODEOWNERS - 代码所有者

### 作用

定义哪些文件需要特定人员审查才能合并到主分支。

### 配置方式

在 `CODEOWNERS` 文件中定义：

```
# 格式：文件路径  @审查者用户名

CLAUDE.md                    @project-owner @tech-lead
docs/技术架构设计.md         @tech-lead
**/prisma/schema.prisma      @backend-lead @dba
```

### 使用说明

1. **角色定义**（需要在 GitHub 中创建对应的用户名）：
   - `@project-owner` - 项目负责人
   - `@tech-lead` - 技术负责人
   - `@frontend-lead` - 前端负责人
   - `@backend-lead` - 后端负责人
   - `@security` - 安全负责人
   - `@devops` - DevOps 负责人
   - `@dba` - 数据库管理员

2. **修改受保护文件的 PR**：
   - GitHub 会自动添加对应的审查者
   - 必须获得所有指定审查者的批准
   - 无法绕过审查直接合并

3. **更新 CODEOWNERS**：
   - 修改此文件本身也需要项目负责人审批
   - 确保角色分配合理

---

## 🪝 Git Hooks

### 作用

在本地提交前自动检查是否修改了受保护的文件。

### 安装方式

```bash
# 从项目根目录运行
bash scripts/install-hooks.sh
```

### 工作原理

1. **Pre-commit Hook**：
   - 在 `git commit` 之前自动运行
   - 检查暂存区的文件
   - 如果发现受保护文件被修改，会：
     - 显示警告信息
     - 列出被修改的文件
     - 询问是否继续提交

2. **受保护的文件列表**：
   ```bash
   PROTECTED_FILES=(
     "CLAUDE.md"
     ".claude/skills/*.md"
     "docs/*.md"
     "package.json"
     "**/prisma/schema.prisma"
   )
   ```

3. **绕过 Hook**（不推荐）：
   ```bash
   git commit --no-verify -m "message"
   ```

### 更新 Hook

如果修改了 `.github/hooks/pre-commit`：

```bash
# 重新安装
bash scripts/install-hooks.sh
```

---

## 🤖 GitHub Actions

### check-protected-files.yml

#### 作用

在 Pull Request 中自动检查受保护文件的修改。

#### 工作流程

1. **触发条件**：
   - 针对 `main` 或 `develop` 分支的 PR
   - PR 更新时

2. **检查步骤**：
   ```
   获取变更文件
      ↓
   检查是否包含受保护文件
      ↓
   如果包含 → 添加警告评论
      ↓
   检查 PR 描述是否完整
      ↓
   添加"需要特别审查"标签
   ```

3. **PR 评论示例**：
   ```markdown
   ## ⚠️ 受保护文件修改警告

   这个 PR 修改了受保护的文件，需要特别审查。

   ### 📋 修改的受保护文件：
   - `CLAUDE.md`
   - `docs/技术架构设计.md`

   ### ✅ 检查清单：
   - [ ] 已与相关负责人沟通
   - [ ] 在 PR 描述中详细说明了修改原因
   ...
   ```

4. **失败条件**：
   - PR 描述过于简短（< 100 字符）
   - 缺少修改说明关键词

---

## 📝 修改受保护文件的完整流程

### 步骤 1：本地开发

```bash
# 1. 创建分支
git checkout -b feature/update-docs

# 2. 修改文件
vim docs/技术架构设计.md

# 3. 提交（会触发 pre-commit hook）
git add docs/技术架构设计.md
git commit -m "[PROTECTED] docs: 更新技术架构设计

修改原因：XXX
影响范围：XXX"

# 4. 确认警告并继续

# 5. 推送到远程
git push origin feature/update-docs
```

### 步骤 2：创建 PR

1. **在 GitHub 上创建 PR**
2. **填写 PR 描述**（使用模板）：
   ```markdown
   ## 📋 修改的受保护文件
   - [x] docs/技术架构设计.md

   ## 📝 修改原因
   更新 XXX 技术栈...

   ## ✅ 检查清单
   - [x] 已与 @tech-lead 沟通
   - [x] 修改已在团队中知晓
   ```

3. **添加审查者**：
   - GitHub 会根据 CODEOWNERS 自动添加
   - 也可以手动添加额外的审查者

### 步骤 3：等待审查

1. **CI 检查运行**：
   - 自动添加警告评论
   - 添加标签

2. **审查者审查**：
   - 查看修改内容
   - 评论或批准

3. **所有审查者批准后**：
   - 可以合并到主分支

---

## 🔧 维护指南

### 更新受保护文件列表

1. **修改 CODEOWNERS**：
   ```bash
   vim .github/CODEOWNERS
   ```

2. **修改 Pre-commit Hook**：
   ```bash
   vim .github/hooks/pre-commit
   # 更新 PROTECTED_FILES 数组
   ```

3. **修改 GitHub Actions**：
   ```bash
   vim .github/workflows/check-protected-files.yml
   # 更新 files 列表
   ```

4. **通知团队**：
   - 在团队群中说明变更
   - 要求团队成员重新安装 hooks

### 添加新的审查者角色

1. **在 GitHub 中创建用户或团队**
2. **在 CODEOWNERS 中引用**：
   ```
   path/to/file  @new-role
   ```

### 临时禁用检查（不推荐）

如果需要临时禁用检查：

```bash
# 禁用 pre-commit hook
rm .git/hooks/pre-commit

# 在 PR 描述中说明原因
```

---

## ❓ 常见问题

### Q: Hook 没有执行？

A: 检查：
1. Hook 文件是否存在：`ls -la .git/hooks/pre-commit`
2. Hook 是否可执行：`chmod +x .git/hooks/pre-commit`
3. 重新安装：`bash scripts/install-hooks.sh`

### Q: 如何跳过 Hook？

A: 使用 `--no-verify`（仅限紧急情况）：
```bash
git commit --no-verify -m "message"
```

### Q: PR 被 CI 阻止合并？

A: 检查：
1. PR 描述是否足够详细（> 100 字符）
2. 是否包含修改说明关键词
3. 完善 PR 描述后 CI 会重新运行

### Q: 审查者不在线怎么办？

A:
1. 联系项目负责人临时指定其他审查者
2. 在团队群中说明紧急情况
3. 事后补充完整的审查流程

---

## 📞 联系方式

如有问题，请联系：
- 项目负责人：@project-owner
- 技术负责人：@tech-lead

或在 Issues 中提问。
