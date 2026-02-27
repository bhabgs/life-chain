# 小程序端 API 接口文档

> 生命链 (LifeChain) 小程序端后端接口总览文档

---

## 项目简介

生命链是一个跨世代数字人格陪伴系统，小程序端为用户提供记忆采集、AI 对话、人生回顾、分享传承等核心功能。本文档描述小程序端调用的全部后端 API 接口规范。

---

## Base URL

```
https://api.lifechain.com/api/v1
```

---

## 接口模块列表

| 模块 | 前缀 | 说明 | 文档链接 |
|------|------|------|----------|
| Auth（认证） | `/auth` | 登录、注销、Token 刷新、验证码 | [auth.md](./auth.md) |
| Memory（记忆） | `/memories` | 记忆的增删改查、统计 | [memory.md](./memory.md) |
| Chat（对话） | `/chat` | AI 对话会话与消息管理 | [chat.md](./chat.md) |
| User（用户） | `/user` | 用户个人资料与设置 | [user.md](./user.md) |
| Review（回顾） | `/review` | 人生时间线与阶段总结 | [review.md](./review.md) |
| Upload（上传） | `/upload` | 图片上传、语音转写 | [upload.md](./upload.md) |
| Share（分享） | `/share` | 分享卡片生成、邀请码 | [share.md](./share.md) |

---

## 统一响应格式

所有接口均返回如下 JSON 结构：

```json
{
  "code": 0,
  "message": "success",
  "data": { ... }
}
```

### 字段说明

| 字段 | 类型 | 说明 |
|------|------|------|
| `code` | `number` | 状态码，`0` 表示成功，非零表示错误 |
| `message` | `string` | 状态描述 |
| `data` | `T \| null` | 业务数据，失败时可能为 `null` |

### TypeScript 类型定义

```typescript
interface IApiResponse<T> {
  code: number
  message: string
  data: T
}
```

---

## 鉴权说明

接口采用 **Bearer Token** 方式鉴权。登录成功后服务端返回 `accessToken` 和 `refreshToken`，客户端在后续请求的 HTTP Header 中携带：

```
Authorization: Bearer <accessToken>
```

### Token 生命周期

| Token 类型 | 有效期 | 用途 |
|-----------|--------|------|
| `accessToken` | 2 小时 | 业务接口鉴权 |
| `refreshToken` | 7 天 | 刷新 accessToken |

### Token 刷新流程

1. 客户端检测到 `accessToken` 过期（响应 code 为 `1001`）
2. 使用 `refreshToken` 调用 `POST /auth/refresh` 获取新 Token 对
3. 更新本地存储的 Token
4. 重试原请求

---

## 分页说明

列表类接口统一使用以下分页参数和响应格式。

### 请求参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `page` | `number` | `1` | 页码，从 1 开始 |
| `pageSize` | `number` | `20` | 每页数量，最大 100 |

### 响应格式

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "items": [ ... ],
    "total": 100,
    "page": 1,
    "pageSize": 20,
    "totalPages": 5
  }
}
```

### 字段说明

| 字段 | 类型 | 说明 |
|------|------|------|
| `items` | `T[]` | 当前页数据列表 |
| `total` | `number` | 总记录数 |
| `page` | `number` | 当前页码 |
| `pageSize` | `number` | 每页数量 |
| `totalPages` | `number` | 总页数 |

### TypeScript 类型定义

```typescript
interface IPaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}
```

---

## 错误码说明

| 错误码 | 名称 | 说明 |
|--------|------|------|
| `0` | SUCCESS | 请求成功 |
| `1001` | UNAUTHORIZED | 未登录或 Token 已过期 |
| `1003` | FORBIDDEN | 无权限访问 |
| `1004` | NOT_FOUND | 请求的资源不存在 |
| `1022` | VALIDATION_ERROR | 请求参数校验失败 |
| `2000` | SERVER_ERROR | 服务端内部错误 |

### 错误响应示例

```json
{
  "code": 1001,
  "message": "Token 已过期，请重新登录",
  "data": null
}
```

```json
{
  "code": 1022,
  "message": "参数校验失败",
  "data": {
    "details": {
      "email": ["邮箱格式不正确"],
      "password": ["密码长度不能少于 6 位"]
    }
  }
}
```

### TypeScript 类型定义

```typescript
interface IApiError {
  code: number
  message: string
  details?: Record<string, string[]>
}
```

---

## 相关资源

- [OpenAPI 规范文档](../openapi.yaml)
- [技术架构设计](../../技术架构设计.md)
- [页面功能目录](../../页面功能目录.md)

---

**最后更新**：2026-02-26
