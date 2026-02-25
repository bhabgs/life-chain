#!/bin/bash
#
# 安装 Git Hooks
#
# 使用方法：
#   bash scripts/install-hooks.sh

set -e

# 颜色定义
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}安装 Git Hooks${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# 检查是否在 Git 仓库中
if [ ! -d ".git" ]; then
  echo -e "${YELLOW}错误：当前目录不是 Git 仓库${NC}"
  exit 1
fi

# 创建 .git/hooks 目录（如果不存在）
mkdir -p .git/hooks

# 复制 pre-commit hook
echo -e "📋 安装 pre-commit hook..."
cp hooks/pre-commit .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit

echo -e "${GREEN}✓ pre-commit hook 已安装${NC}"
echo ""

# 测试 hook 是否可执行
if [ -x .git/hooks/pre-commit ]; then
  echo -e "${GREEN}✓ Hook 已设置为可执行${NC}"
else
  echo -e "${YELLOW}⚠️  设置 hook 为可执行失败，请手动执行：${NC}"
  echo -e "   chmod +x .git/hooks/pre-commit"
fi

echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✓ Git Hooks 安装完成！${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${YELLOW}说明：${NC}"
echo -e "  当你尝试提交受保护的文件时，会收到警告提示"
echo -e "  受保护的文件包括："
echo -e "    - CLAUDE.md"
echo -e "    - .claude/skills/*.md"
echo -e "    - docs/*.md"
echo -e "    - 配置文件（package.json, tsconfig.json 等）"
echo -e "    - 数据库 schema"
echo ""
