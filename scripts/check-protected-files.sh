#!/bin/bash
#
# 通用的受保护文件检查脚本
# 可在任何 CI 环境中使用（GitHub Actions, GitLab CI, Gitee Go, Jenkins 等）
#
# 环境变量：
#   CI_MERGE_REQUEST_IID / PULL_REQUEST_NUMBER - PR/MR 编号
#   CI_PROJECT_DIR / GITHUB_WORKSPACE - 项目目录
#   CI_COMMIT_REF_NAME / GITHUB_BASE_REF - 目标分支

set -e

# 颜色定义
RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
NC='\033[0m'

# 受保护的文件模式列表
PROTECTED_PATTERNS=(
  "CLAUDE.md"
  ".claude/skills/*.md"
  "docs/技术架构设计.md"
  "docs/页面功能目录.md"
  "docs/多端策略分析.md"
  "package.json"
  "pnpm-workspace.yaml"
  "tsconfig.base.json"
  "CODEOWNERS"
  ".github/workflows/*.yml"
  ".gitlab-ci.yml"
  ".gitee/workflows/*.yml"
  "**/prisma/schema.prisma"
  "**/migrations/**"
)

echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}检查受保护文件${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# 检测 Git 平台
detect_platform() {
  if [ -n "$GITHUB_ACTIONS" ]; then
    echo "github"
  elif [ -n "$GITLAB_CI" ]; then
    echo "gitlab"
  elif [ -n "$GITEE_GO" ]; then
    echo "gitee"
  elif [ -n "$JENKINS_HOME" ]; then
    echo "jenkins"
  else
    echo "unknown"
  fi
}

PLATFORM=$(detect_platform)
echo -e "📍 检测到的平台: ${GREEN}$PLATFORM${NC}"
echo ""

# 获取变更的文件列表
get_changed_files() {
  local base_branch="${1:-main}"

  # 尝试不同的方式获取变更文件
  if command -v git >/dev/null 2>&1; then
    # 如果有 git，使用 git diff
    if git rev-parse --verify "origin/$base_branch" >/dev/null 2>&1; then
      git diff --name-only "origin/$base_branch...HEAD" 2>/dev/null || \
      git diff --name-only HEAD~1 2>/dev/null || \
      git ls-files -m
    else
      # 如果没有远程分支，比较最近的提交
      git diff --name-only HEAD~1 2>/dev/null || git ls-files -m
    fi
  else
    echo "错误: 未找到 git 命令" >&2
    exit 1
  fi
}

# 检查文件是否匹配受保护模式
is_protected() {
  local file="$1"
  for pattern in "${PROTECTED_PATTERNS[@]}"; do
    # 使用 bash 通配符匹配
    if [[ $file == $pattern ]]; then
      return 0
    fi
    # 使用 grep 正则匹配
    if echo "$file" | grep -qE "^${pattern//\*/.*}$"; then
      return 0
    fi
  done
  return 1
}

# 获取变更文件
BASE_BRANCH="${CI_COMMIT_REF_NAME:-${GITHUB_BASE_REF:-main}}"
CHANGED_FILES=$(get_changed_files "$BASE_BRANCH")

if [ -z "$CHANGED_FILES" ]; then
  echo -e "${GREEN}✓ 没有检测到文件变更${NC}"
  exit 0
fi

echo -e "📋 检测到以下文件变更:"
echo "$CHANGED_FILES" | while read -r file; do
  echo "  - $file"
done
echo ""

# 检查受保护的文件
PROTECTED_MODIFIED=()
while IFS= read -r file; do
  if [ -n "$file" ] && is_protected "$file"; then
    PROTECTED_MODIFIED+=("$file")
  fi
done <<< "$CHANGED_FILES"

# 如果没有修改受保护的文件
if [ ${#PROTECTED_MODIFIED[@]} -eq 0 ]; then
  echo -e "${GREEN}✓ 没有修改受保护的文件${NC}"
  echo ""
  exit 0
fi

# 显示警告
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${YELLOW}⚠️  警告：检测到受保护文件被修改${NC}"
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${RED}以下受保护的文件被修改：${NC}"
echo ""

for file in "${PROTECTED_MODIFIED[@]}"; do
  echo -e "  ${RED}✗${NC} $file"
done

echo ""
echo -e "${YELLOW}⚠️  请确保：${NC}"
echo -e "  1. 已与相关负责人沟通"
echo -e "  2. 在 PR/MR 描述中详细说明修改原因"
echo -e "  3. 已添加必要的审查人员（参考 CODEOWNERS）"
echo -e "  4. 团队成员已知晓此修改"
echo ""

# 检查是否在 PR/MR 模式
if [ "$PLATFORM" = "github" ] && [ -n "$GITHUB_EVENT_NAME" ] && [ "$GITHUB_EVENT_NAME" = "pull_request" ]; then
  echo -e "${YELLOW}💡 提示：GitHub Actions 将自动添加审查标签${NC}"
elif [ "$PLATFORM" = "gitlab" ] && [ -n "$CI_MERGE_REQUEST_IID" ]; then
  echo -e "${YELLOW}💡 提示：请确保 MR 描述完整${NC}"
elif [ "$PLATFORM" = "gitee" ]; then
  echo -e "${YELLOW}💡 提示：请确保 PR 描述完整${NC}"
fi

echo ""
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# 根据环境决定是否失败
# 在 CI 环境中，作为警告而不是错误（让 CODEOWNERS 来强制审查）
if [ -n "$CI" ]; then
  echo -e "${YELLOW}⚠️  继续执行（需要代码审查）${NC}"
  exit 0
else
  # 在本地环境，询问是否继续
  read -p "$(echo -e ${YELLOW}是否继续？[y/N]:${NC} )" -n 1 -r
  echo ""
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${GREEN}✓ 继续${NC}"
    exit 0
  else
    echo -e "${RED}✗ 已取消${NC}"
    exit 1
  fi
fi
