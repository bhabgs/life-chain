---
skill: create-page
description: 创建页面（支持移动端、小程序、Web）
args: [page_name, package_name, page_path]
---

# 创建页面

创建符合生命链项目规范的页面。

## 参数说明

- `page_name`: 页面名称（例如：MemoryList, ChatRoom）
- `package_name`: 所属包（mobile, miniapp, web-admin）
- `page_path`: 页面路径（例如：memory/list）

## 执行步骤

1. **确定页面位置**
   ```
   packages/{package_name}/src/pages/{page_path}/
   ```

2. **创建页面文件结构**
   ```
   {page_path}/
   ├── index.tsx                    # 页面主文件
   ├── {PageName}.styles.ts         # 样式文件
   ├── {PageName}.types.ts          # 类型定义
   ├── {PageName}.hooks.ts          # 自定义Hooks（可选）
   ├── {PageName}.utils.ts          # 工具函数（可选）
   ├── components/                  # 页面私有组件
   │   └── {ComponentName}/
   └── __tests__/                   # 测试文件
       └── {PageName}.test.tsx
   ```

3. **创建页面主文件**

   **移动端页面模板（React Native）**:
   ```typescript
   import React, { useEffect } from 'react';
   import { View, Text, ScrollView, SafeAreaView } from 'react-native';
   import { useNavigation } from '@react-navigation/native';
   import { {PageName}Props } from './{PageName}.types';
   import { use{PageName} } from './{PageName}.hooks';
   import { styles } from './{PageName}.styles';

   /**
    * {页面描述}
    */
   export const {PageName}: React.FC<{PageName}Props> = ({ route }) => {
     const navigation = useNavigation();
     const { data, loading, error, fetchData } = use{PageName}();

     useEffect(() => {
       fetchData();
     }, []);

     if (loading) {
       return (
         <View style={styles.container}>
           <Text>加载中...</Text>
         </View>
       );
     }

     if (error) {
       return (
         <View style={styles.container}>
           <Text>错误: {error.message}</Text>
         </View>
       );
     }

     return (
       <SafeAreaView style={styles.container}>
         <ScrollView>
           <Text>{PageName} Page</Text>
         </ScrollView>
       </SafeAreaView>
     );
   };

   {PageName}.displayName = '{PageName}';
   ```

   **小程序页面模板（Taro）**:
   ```typescript
   import { View, Text, ScrollView } from '@tarojs/components';
   import { useLoad, useReady } from '@tarojs/taro';
   import { use{PageName} } from './{PageName}.hooks';
   import './index.scss';

   /**
    * {页面描述}
    */
   export default function {PageName}() {
     const { data, loading, error, fetchData } = use{PageName}();

     useLoad(() => {
       console.log('Page loaded.');
     });

     useReady(() => {
       fetchData();
     });

     if (loading) {
       return (
         <View className="container">
           <Text>加载中...</Text>
         </View>
       );
     }

     if (error) {
       return (
         <View className="container">
           <Text>错误: {error.message}</Text>
         </View>
       );
     }

     return (
       <ScrollView className="container">
         <Text>{PageName} Page</Text>
       </ScrollView>
     );
   }
   ```

   **Web页面模板（React）**:
   ```typescript
   import React, { useEffect } from 'react';
   import { useNavigate } from 'react-router-dom';
   import { {PageName}Props } from './{PageName}.types';
   import { use{PageName} } from './{PageName}.hooks';
   import styles from './{PageName}.module.css';

   /**
    * {页面描述}
    */
   export const {PageName}: React.FC<{PageName}Props> = () => {
     const navigate = useNavigate();
     const { data, loading, error, fetchData } = use{PageName}();

     useEffect(() => {
       fetchData();
     }, []);

     if (loading) {
       return <div className={styles.loading}>加载中...</div>;
     }

     if (error) {
       return <div className={styles.error}>错误: {error.message}</div>;
     }

     return (
       <div className={styles.container}>
         <h1>{PageName} Page</h1>
       </div>
     );
   };

   {PageName}.displayName = '{PageName}';
   ```

4. **创建自定义Hooks**
   ```typescript
   import { useState, useCallback } from 'react';
   import { {ServiceName}Service } from '@/services/{service}.service';

   export const use{PageName} = () => {
     const [data, setData] = useState<any>(null);
     const [loading, setLoading] = useState(false);
     const [error, setError] = useState<Error | null>(null);

     const fetchData = useCallback(async () => {
       try {
         setLoading(true);
         setError(null);
         const result = await {ServiceName}Service.fetchData();
         setData(result);
       } catch (err) {
         setError(err as Error);
       } finally {
         setLoading(false);
       }
     }, []);

     return {
       data,
       loading,
       error,
       fetchData,
     };
   };
   ```

5. **创建类型定义**
   ```typescript
   export interface {PageName}Props {
     // 页面 props
   }

   export interface {PageName}Data {
     // 页面数据类型
   }
   ```

6. **创建样式文件**

   **React Native / Taro**:
   ```typescript
   import { StyleSheet } from 'react-native';

   export const styles = StyleSheet.create({
     container: {
       flex: 1,
       padding: 16,
     },
     loading: {
       flex: 1,
       justifyContent: 'center',
       alignItems: 'center',
     },
     error: {
       flex: 1,
       justifyContent: 'center',
       alignItems: 'center',
       color: 'red',
     },
   });
   ```

7. **配置路由**

   **移动端（React Navigation）**:
   在 `navigation/index.tsx` 中添加：
   ```typescript
   <Stack.Screen
     name="{PageName}"
     component={{PageName}}
     options={{ title: '{页面标题}' }}
   />
   ```

   **小程序（Taro）**:
   在 `app.config.ts` 中添加：
   ```typescript
   pages: [
     'pages/{page_path}/index',
     // ...
   ],
   ```

   **Web（React Router）**:
   在 `router/index.tsx` 中添加：
   ```typescript
   {
     path: '/{page_path}',
     element: <{PageName} />,
   }
   ```

8. **创建测试文件**
   ```typescript
   import React from 'react';
   import { render, waitFor } from '@testing-library/react';
   import { {PageName} } from '../';

   describe('{PageName}', () => {
     it('should render correctly', async () => {
       const { getByText } = render(<{PageName} />);
       await waitFor(() => {
         expect(getByText('{PageName} Page')).toBeTruthy();
       });
     });
   });
   ```

## 页面开发规范

### 文件结构
- index.tsx: 页面主文件
- *.hooks.ts: 自定义Hooks（逻辑复用）
- *.types.ts: 类型定义
- *.styles.ts: 样式文件
- components/: 页面私有组件
- __tests__/: 测试文件

### 代码规范
- 使用函数组件 + Hooks
- 逻辑抽取到自定义Hooks
- 状态管理使用 Zustand 或 Context
- API调用放在 service 层
- 添加加载、错误、空状态处理

### 性能优化
- 使用 React.memo 优化组件
- 大列表使用虚拟滚动
- 图片懒加载
- 避免不必要的重渲染

### 用户体验
- 添加加载指示器
- 添加错误提示
- 添加空状态提示
- 添加下拉刷新、上拉加载

## 常见页面类型

### 列表页面
- 记忆列表
- 对话列表
- 用户列表

### 详情页面
- 记忆详情
- 用户详情
- 设置详情

### 表单页面
- 记忆创建
- 个人信息编辑
- 人格配置

### 仪表盘页面
- 管理后台首页
- 数据统计页

## 注意事项

- 根据不同平台使用不同的组件库
- 移动端注意安全区域（SafeAreaView）
- 小程序注意页面配置（app.config.ts）
- Web注意SEO和无障碍访问
- 添加页面埋点（如果需要）

## 完成后

1. 检查路由配置正确
2. 运行页面确认正常
3. 运行测试确保通过
4. 输出页面文件路径和访问路径
