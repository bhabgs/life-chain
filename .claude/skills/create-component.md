---
skill: create-component
description: 创建React组件（支持移动端、小程序、Web）
args: [component_name, package_name, component_type]
---

# 创建 React 组件

创建符合生命链项目规范的 React 组件。

## 参数说明

- `component_name`: 组件名称（PascalCase，例如：MemoryCard）
- `package_name`: 所属包（mobile, miniapp, web-admin）
- `component_type`: 组件类型（ui, business, layout）

## 执行步骤

1. **确定组件位置**
   ```
   packages/{package_name}/src/components/
   ├── ui/              # UI组件（纯展示）
   ├── business/        # 业务组件（有逻辑）
   └── layout/          # 布局组件
   ```

2. **创建组件文件**
   ```
   components/{component_type}/{ComponentName}/
   ├── index.tsx                    # 组件主文件
   ├── {ComponentName}.styles.ts    # 样式文件（如果需要）
   ├── {ComponentName}.types.ts     # 类型定义
   ├── {ComponentName}.test.tsx     # 测试文件
   └── index.ts                     # 导出文件
   ```

3. **创建组件代码**

   **基础组件模板（移动端/小程序）**:
   ```typescript
   import React from 'react';
   import { View, Text } from 'react-native'; // 或 @tarojs/components
   import { {ComponentName}Props } from './{ComponentName}.types';
   import { styles } from './{ComponentName}.styles';

   /**
    * {组件描述}
    *
    * @example
    * <{ComponentName} prop1="value" />
    */
   export const {ComponentName}: React.FC<{ComponentName}Props> = ({
     // props
   }) => {
     return (
       <View style={styles.container}>
         <Text>{ComponentName} Component</Text>
       </View>
     );
   };

   {ComponentName}.displayName = '{ComponentName}';
   ```

   **基础组件模板（Web）**:
   ```typescript
   import React from 'react';
   import { {ComponentName}Props } from './{ComponentName}.types';
   import styles from './{ComponentName}.module.css'; // 或使用 styled-components

   /**
    * {组件描述}
    *
    * @example
    * <{ComponentName} prop1="value" />
    */
   export const {ComponentName}: React.FC<{ComponentName}Props> = ({
     // props
   }) => {
     return (
       <div className={styles.container}>
         {ComponentName} Component
       </div>
     );
   };

   {ComponentName}.displayName = '{ComponentName}';
   ```

4. **创建类型定义文件**
   ```typescript
   export interface {ComponentName}Props {
     // 定义组件的 props 类型
     className?: string;
     style?: React.CSSProperties;
     children?: React.ReactNode;
   }
   ```

5. **创建样式文件**

   **React Native / Taro**:
   ```typescript
   import { StyleSheet } from 'react-native';

   export const styles = StyleSheet.create({
     container: {
       // 样式定义
     },
   });
   ```

   **Web (CSS Modules)**:
   ```css
   .container {
     /* 样式定义 */
   }
   ```

6. **创建测试文件**
   ```typescript
   import React from 'react';
   import { render } from '@testing-library/react';
   import { {ComponentName} } from './';

   describe('{ComponentName}', () => {
     it('should render correctly', () => {
       const { getByText } = render(<{ComponentName} />);
       expect(getByText('{ComponentName} Component')).toBeTruthy();
     });
   });
   ```

7. **创建导出文件**
   ```typescript
   export { {ComponentName} } from './{ComponentName}';
   export type { {ComponentName}Props } from './{ComponentName}.types';
   ```

8. **更新父级 index.ts**
   在 `components/{component_type}/index.ts` 中添加导出：
   ```typescript
   export * from './{ComponentName}';
   ```

## 组件开发规范

### 命名规范
- 组件名：PascalCase
- 文件名：PascalCase
- Props接口：{ComponentName}Props
- 样式对象：styles

### 代码规范
- 使用函数组件 + Hooks
- Props 使用 TypeScript 定义类型
- 复杂组件拆分为小组件
- 添加 JSDoc 注释
- 添加 displayName

### 性能优化
- 使用 React.memo 优化渲染
- 使用 useMemo/useCallback 优化计算
- 避免在 render 中创建函数或对象
- 列表使用虚拟滚动（长列表）

### 可访问性
- 添加合适的 aria 属性
- 支持键盘导航
- 颜色对比度符合标准

## 常见组件类型

### UI组件示例
- Button - 按钮
- Input - 输入框
- Card - 卡片
- Modal - 模态框
- Loading - 加载指示器

### 业务组件示例
- MemoryCard - 记忆卡片
- ChatBubble - 聊天气泡
- TimelineItem - 时间轴项
- EmotionTag - 情绪标签
- PersonalityAvatar - 人格头像

### 布局组件示例
- PageLayout - 页面布局
- Header - 页头
- Footer - 页脚
- Sidebar - 侧边栏

## 注意事项

- 移动端和小程序组件使用 View/Text 等基础组件
- Web 组件可以使用 div/span 等 HTML 元素
- 样式使用 StyleSheet (RN/Taro) 或 CSS Modules (Web)
- 确保组件可复用、可测试
- 添加必要的 PropTypes 验证

## 完成后

1. 运行 linter 检查代码
2. 运行测试确保通过
3. 在 Storybook 中查看组件（如果有）
4. 输出组件文件路径
