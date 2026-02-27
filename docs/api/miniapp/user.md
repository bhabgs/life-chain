# 用户接口

> 模块：用户信息与设置管理
> Base URL：`/api/v1`

---

## 目录

- [GET /user/profile - 获取用户信息](#get-userprofile---获取用户信息)
- [PUT /user/profile - 更新用户信息](#put-userprofile---更新用户信息)
- [GET /user/settings - 获取用户设置](#get-usersettings---获取用户设置)
- [PUT /user/settings - 保存用户设置](#put-usersettings---保存用户设置)
- [数据模型](#数据模型)
- [错误码说明](#错误码说明)

---

## GET /user/profile - 获取用户信息

获取当前登录用户的完整个人资料信息。

### 基本信息

| 项目 | 说明 |
|------|------|
| 请求路径 | `GET /api/v1/user/profile` |
| 鉴权要求 | 是，需携带 `Authorization: Bearer <token>` |
| Content-Type | `application/json` |

### 请求参数

无。

### 响应示例

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "id": "user_001",
    "email": "zhangsan@example.com",
    "phone": "13800138000",
    "username": "zhangsan",
    "nickname": "张三",
    "avatar": "https://cdn.example.com/avatars/zhangsan.jpg",
    "birthDate": "1995-06-15",
    "gender": "male",
    "status": "active",
    "role": "user",
    "createdAt": "2026-01-01T08:00:00.000Z",
    "updatedAt": "2026-02-20T10:30:00.000Z"
  }
}
```

### TypeScript 调用示例

```typescript
import { userService } from '@/services/user';

const res = await userService.getProfile();
console.log(res.data.nickname); // "张三"
```

### 错误响应

| code | message | 说明 |
|------|---------|------|
| 401 | 未授权，请先登录 | Token 缺失或已过期 |
| 500 | 服务器内部错误 | 服务端异常 |

---

## PUT /user/profile - 更新用户信息

更新当前登录用户的个人资料，支持部分字段更新。

### 基本信息

| 项目 | 说明 |
|------|------|
| 请求路径 | `PUT /api/v1/user/profile` |
| 鉴权要求 | 是，需携带 `Authorization: Bearer <token>` |
| Content-Type | `application/json` |

### 请求体

类型：`Partial<IUser>`

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| nickname | string | 否 | 用户昵称 |
| avatar | string | 否 | 头像 URL |
| birthDate | string | 否 | 出生日期，格式 `YYYY-MM-DD` |
| gender | string | 否 | 性别，可选值：`male` / `female` / `other` |

### 请求示例

```json
{
  "nickname": "小张同学",
  "avatar": "https://cdn.example.com/avatars/new-avatar.jpg"
}
```

### 响应示例

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "id": "user_001",
    "email": "zhangsan@example.com",
    "phone": "13800138000",
    "username": "zhangsan",
    "nickname": "小张同学",
    "avatar": "https://cdn.example.com/avatars/new-avatar.jpg",
    "birthDate": "1995-06-15",
    "gender": "male",
    "status": "active",
    "role": "user",
    "createdAt": "2026-01-01T08:00:00.000Z",
    "updatedAt": "2026-02-26T14:00:00.000Z"
  }
}
```

### TypeScript 调用示例

```typescript
import { userService } from '@/services/user';

const res = await userService.updateProfile({
  nickname: '小张同学',
  avatar: 'https://cdn.example.com/avatars/new-avatar.jpg',
});
console.log(res.data.nickname); // "小张同学"
```

### 错误响应

| code | message | 说明 |
|------|---------|------|
| 400 | 请求参数错误 | 参数格式不正确 |
| 401 | 未授权，请先登录 | Token 缺失或已过期 |
| 500 | 服务器内部错误 | 服务端异常 |

---

## GET /user/settings - 获取用户设置

获取当前登录用户的个性化设置，包括通知、隐私、主题、语言及字体大小等配置。

### 基本信息

| 项目 | 说明 |
|------|------|
| 请求路径 | `GET /api/v1/user/settings` |
| 鉴权要求 | 是，需携带 `Authorization: Bearer <token>` |
| Content-Type | `application/json` |

### 请求参数

无。

### 响应示例

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "notifications": {
      "newMemory": true,
      "dailyReminder": true,
      "weeklyReport": false,
      "systemNotice": true
    },
    "privacy": {
      "defaultLevel": 1,
      "allowSearch": true
    },
    "theme": "system",
    "language": "zh-CN",
    "fontSize": "medium"
  }
}
```

### TypeScript 调用示例

```typescript
import { settingsService } from '@/services/settings';

const res = await settingsService.get();
console.log(res.data.theme); // "system"
console.log(res.data.privacy.defaultLevel); // 1
```

### 错误响应

| code | message | 说明 |
|------|---------|------|
| 401 | 未授权，请先登录 | Token 缺失或已过期 |
| 500 | 服务器内部错误 | 服务端异常 |

---

## PUT /user/settings - 保存用户设置

更新当前登录用户的设置，支持部分字段更新。传入的字段将与现有设置进行深度合并。

### 基本信息

| 项目 | 说明 |
|------|------|
| 请求路径 | `PUT /api/v1/user/settings` |
| 鉴权要求 | 是，需携带 `Authorization: Bearer <token>` |
| Content-Type | `application/json` |

### 请求体

类型：`Partial<IUserSettings>`

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| notifications | object | 否 | 通知设置 |
| notifications.newMemory | boolean | 否 | 新记忆通知 |
| notifications.dailyReminder | boolean | 否 | 每日提醒 |
| notifications.weeklyReport | boolean | 否 | 每周报告 |
| notifications.systemNotice | boolean | 否 | 系统通知 |
| privacy | object | 否 | 隐私设置 |
| privacy.defaultLevel | number | 否 | 默认隐私等级，可选值：`1`（公开）/ `2`（好友可见）/ `3`（私密） |
| privacy.allowSearch | boolean | 否 | 是否允许被搜索 |
| theme | string | 否 | 主题模式，可选值：`light` / `dark` / `system` |
| language | string | 否 | 语言，如 `zh-CN`、`en-US` |
| fontSize | string | 否 | 字体大小，可选值：`small` / `medium` / `large` |

### 请求示例

```json
{
  "theme": "dark",
  "notifications": {
    "weeklyReport": true
  }
}
```

### 响应示例

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "notifications": {
      "newMemory": true,
      "dailyReminder": true,
      "weeklyReport": true,
      "systemNotice": true
    },
    "privacy": {
      "defaultLevel": 1,
      "allowSearch": true
    },
    "theme": "dark",
    "language": "zh-CN",
    "fontSize": "medium"
  }
}
```

### TypeScript 调用示例

```typescript
import { settingsService } from '@/services/settings';

const res = await settingsService.update({
  theme: 'dark',
  notifications: {
    weeklyReport: true,
  },
});
console.log(res.data.theme); // "dark"
console.log(res.data.notifications.weeklyReport); // true
```

### 错误响应

| code | message | 说明 |
|------|---------|------|
| 400 | 请求参数错误 | 参数格式不正确或取值不合法 |
| 401 | 未授权，请先登录 | Token 缺失或已过期 |
| 500 | 服务器内部错误 | 服务端异常 |

---

## 数据模型

### IUser

```typescript
interface IUser {
  /** 用户唯一标识 */
  id: string;
  /** 邮箱 */
  email: string;
  /** 手机号 */
  phone: string;
  /** 用户名 */
  username: string;
  /** 昵称 */
  nickname: string;
  /** 头像 URL */
  avatar: string;
  /** 出生日期，格式 YYYY-MM-DD */
  birthDate: string;
  /** 性别：male / female / other */
  gender: string;
  /** 账户状态：active / inactive / banned */
  status: string;
  /** 角色：user / admin */
  role: string;
  /** 创建时间，ISO 8601 */
  createdAt: string;
  /** 更新时间，ISO 8601 */
  updatedAt: string;
}
```

### IUserSettings

```typescript
interface IUserSettings {
  /** 通知设置 */
  notifications: {
    /** 新记忆通知 */
    newMemory: boolean;
    /** 每日提醒 */
    dailyReminder: boolean;
    /** 每周报告 */
    weeklyReport: boolean;
    /** 系统通知 */
    systemNotice: boolean;
  };
  /** 隐私设置 */
  privacy: {
    /** 默认隐私等级：1-公开 2-好友可见 3-私密 */
    defaultLevel: 1 | 2 | 3;
    /** 是否允许被搜索 */
    allowSearch: boolean;
  };
  /** 主题模式 */
  theme: 'light' | 'dark' | 'system';
  /** 语言 */
  language: string;
  /** 字体大小 */
  fontSize: 'small' | 'medium' | 'large';
}
```

---

## 错误码说明

| code | 说明 |
|------|------|
| 0 | 成功 |
| 400 | 请求参数错误 |
| 401 | 未授权（Token 缺失或过期） |
| 403 | 无权限访问 |
| 500 | 服务器内部错误 |

---

> 最后更新：2026-02-26
