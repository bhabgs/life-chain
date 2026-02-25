# CI 配置说明

> 本目录包含不同 Git 平台的 CI 配置模板

---

## 📂 目录结构

```
ci/
├── README.md              # 本文件
├── gitlab-ci.yml         # GitLab CI 配置模板
├── gitee-go.yml          # Gitee Go 配置模板
└── (更多平台配置...)
```

---

## 🚀 快速开始

### 方法 1：使用 GitHub Actions（已配置）

如果你的项目托管在 GitHub，已经有现成的配置：

```
.github/
└── workflows/
    └── check-protected-files.yml  # 已配置好
```

**无需额外操作**，推送代码后自动运行。

---

### 方法 2：使用 GitLab CI

#### 步骤 1：复制配置文件

```bash
# 从模板复制
cp ci/gitlab-ci.yml .gitlab-ci.yml
```

#### 步骤 2：调整配置

编辑 `.gitlab-ci.yml`，根据项目需求调整：
- 分支名称（main/master）
- Node 版本
- 构建命令
- 测试命令

#### 步骤 3：推送到 GitLab

```bash
git add .gitlab-ci.yml
git commit -m "chore: 添加 GitLab CI 配置"
git push
```

#### 步骤 4：查看 CI 运行

访问 GitLab 项目页面 → CI/CD → Pipelines

---

### 方法 3：使用 Gitee Go

#### 步骤 1：创建目录

```bash
mkdir -p .gitee/workflows
```

#### 步骤 2：复制配置文件

```bash
# 从模板复制
cp ci/gitee-go.yml .gitee/workflows/check-protected-files.yml
```

#### 步骤 3：启用 Gitee Go

1. 访问 Gitee 项目设置
2. 找到 "Gitee Go" 选项
3. 启用 Gitee Go（企业版功能）

#### 步骤 4：推送到 Gitee

```bash
git add .gitee/
git commit -m "chore: 添加 Gitee Go 配置"
git push
```

#### 步骤 5：查看运行状态

访问 Gitee 项目页面 → Gitee Go

---

### 方法 4：使用 Jenkins

#### 步骤 1：创建 Jenkinsfile

```groovy
pipeline {
    agent any

    stages {
        stage('检查受保护文件') {
            steps {
                sh 'bash scripts/check-protected-files.sh'
            }
        }

        stage('代码规范检查') {
            steps {
                sh 'npm ci'
                sh 'npm run lint'
            }
        }

        stage('单元测试') {
            steps {
                sh 'npm run test'
            }
        }

        stage('构建') {
            steps {
                sh 'npm run build'
            }
        }
    }
}
```

#### 步骤 2：配置 Jenkins

1. 在 Jenkins 中创建新项目
2. 选择 "Pipeline"
3. 配置 Git 仓库
4. 指定 Jenkinsfile 路径
5. 保存并构建

---

## 🔧 配置说明

### GitLab CI 配置项

```yaml
stages:
  - check        # 检查阶段
  - test         # 测试阶段
  - build        # 构建阶段

check-protected-files:
  stage: check
  script:
    - bash scripts/check-protected-files.sh
  only:
    - merge_requests  # 仅在 MR 时运行
```

**关键配置**:
- `only`: 指定何时运行（merge_requests, main, develop 等）
- `tags`: 指定运行器标签
- `cache`: 配置缓存以加速构建

### Gitee Go 配置项

```yaml
on:
  pull_request:
    branches:
      - master      # 目标分支
      - develop

jobs:
  check-protected-files:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: bash scripts/check-protected-files.sh
```

**关键配置**:
- `on`: 触发条件
- `runs-on`: 运行环境
- `needs`: 任务依赖关系

---

## 📋 检查脚本说明

所有 CI 配置都调用同一个通用脚本：

```bash
scripts/check-protected-files.sh
```

### 功能

1. ✅ 自动检测 Git 平台（GitHub/GitLab/Gitee）
2. ✅ 获取变更文件列表
3. ✅ 检查是否包含受保护文件
4. ✅ 显示警告信息
5. ✅ 在 CI 环境中作为警告（不阻塞）

### 环境变量

脚本会自动读取以下环境变量：

| 变量 | 平台 | 说明 |
|-----|------|------|
| `GITHUB_ACTIONS` | GitHub | GitHub Actions 标识 |
| `GITLAB_CI` | GitLab | GitLab CI 标识 |
| `GITEE_GO` | Gitee | Gitee Go 标识 |
| `JENKINS_HOME` | Jenkins | Jenkins 标识 |
| `CI` | 通用 | CI 环境标识 |

---

## ⚙️ 自定义配置

### 添加受保护文件

编辑 `scripts/check-protected-files.sh`：

```bash
PROTECTED_PATTERNS=(
  "CLAUDE.md"
  "docs/*.md"
  # 添加新的文件模式
  "your/protected/file.txt"
)
```

### 修改检查逻辑

在 `scripts/check-protected-files.sh` 中修改：

```bash
# 自定义检查逻辑
if [ 某个条件 ]; then
  echo "执行特殊检查"
fi
```

### 添加额外的检查步骤

在 CI 配置中添加新的 stage/job：

```yaml
# GitLab CI 示例
security-scan:
  stage: check
  script:
    - npm audit
    - npm run security-scan
```

---

## 🔍 故障排除

### 问题 1：脚本没有执行权限

```bash
# 解决方法
chmod +x scripts/check-protected-files.sh
```

### 问题 2：找不到 Git 命令

确保 CI 环境中安装了 Git：

```yaml
# GitLab CI
before_script:
  - apk add --no-cache git  # Alpine
  - apt-get update && apt-get install -y git  # Debian/Ubuntu

# GitHub Actions / Gitee Go
- uses: actions/checkout@v3  # 自动包含 Git
```

### 问题 3：无法获取变更文件

检查 fetch-depth 配置：

```yaml
- uses: actions/checkout@v3
  with:
    fetch-depth: 0  # 获取完整历史
```

### 问题 4：分支名称不匹配

不同平台默认分支名可能不同：
- GitHub: `main`
- Gitee: `master`
- GitLab: `main` 或 `master`

**解决方法**：在配置中同时支持：

```yaml
on:
  pull_request:
    branches:
      - main
      - master
      - develop
```

---

## 📊 性能优化

### 1. 使用缓存

```yaml
# GitLab CI
cache:
  key: ${CI_COMMIT_REF_SLUG}
  paths:
    - node_modules/

# GitHub Actions / Gitee Go
- uses: actions/cache@v3
  with:
    path: node_modules
    key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
```

### 2. 并行执行

```yaml
# GitLab CI
parallel:
  matrix:
    - NODE_VERSION: ['16', '18', '20']
```

### 3. 条件执行

```yaml
# 只在特定条件下运行
only:
  changes:
    - "src/**/*"
    - "package.json"
```

---

## 🎯 最佳实践

### 1. 轻量级检查

检查脚本应该快速执行：
- ✅ 只检查文件名
- ✅ 避免复杂的逻辑
- ✅ 不执行耗时操作

### 2. 清晰的输出

输出应该清晰易懂：
- ✅ 使用颜色区分（警告/错误/成功）
- ✅ 列出具体的文件
- ✅ 给出明确的下一步操作

### 3. 不阻塞流程

在 CI 中：
- ✅ 作为警告而非错误
- ✅ 让 CODEOWNERS 来强制审查
- ✅ 记录日志供后续审查

### 4. 平台无关

脚本应该：
- ✅ 自动检测平台
- ✅ 适配不同的环境变量
- ✅ 使用通用的命令

---

## 📞 获取帮助

如有问题：

1. 查看脚本输出的错误信息
2. 检查 CI 日志
3. 参考平台文档：
   - [GitLab CI 文档](https://docs.gitlab.com/ee/ci/)
   - [Gitee Go 文档](https://gitee.com/help/articles/4379)
   - [Jenkins 文档](https://www.jenkins.io/doc/)
4. 提交 Issue

---

**最后更新**: 2026-02-24
**维护者**: DevOps 团队
