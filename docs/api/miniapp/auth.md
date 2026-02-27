# 认证接口 (Auth)

> 小程序端认证相关接口，包括登录、注销、Token 刷新、发送验证码

**Base URL**: `/api/v1`

**Service 文件**: `packages/miniapp/src/services/auth.service.ts`

---

## 目录

- [POST /auth/login - 登录](#post-authlogin---登录)
- [POST /auth/send-code - 发送验证码](#post-authsend-code---发送验证码)
- [POST /auth/logout - 退出登录](#post-authlogout---退出登录)
- [POST /auth/refresh - 刷新 Token](#post-authrefresh---刷新-token)

---

## POST /auth/login - 登录

支持两种登录方式：**邮箱密码登录**和**手机验证码登录**，根据请求体字段自动识别。

- **鉴权**: 不需要

### 方式一：邮箱密码登录

#### 请求参数

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `email` | `string` | 是 | 邮箱地址 |
| `password` | `string` | 是 | 密码（6-32 位） |

#### 请求示例

```json
{
  "email": "user@example.com",
  "password": "your_password"
}
```

### 方式二：手机验证码登录

#### 请求参数

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `phone` | `string` | 是 | 手机号码 |
| `code` | `string` | 是 | 短信验证码（6 位数字） |

#### 请求示例

```json
{
  "phone": "13800138000",
  "code": "123456"
}
```

### 响应

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": "usr_abc123",
      "email": "user@example.com",
      "username": "zhangsan",
      "nickname": "小张",
      "avatar": "https://cdn.lifechain.com/avatars/default.png",
      "role": "user"
    }
  }
}
```

#### 响应字段说明

| 字段 | 类型 | 说明 |
|------|------|------|
| `accessToken` | `string` | 访问令牌，有效期 2 小时 |
| `refreshToken` | `string` | 刷新令牌，有效期 7 天 |
| `user.id` | `string` | 用户 ID |
| `user.email` | `string` | 邮箱地址 |
| `user.username` | `string` | 用户名 |
| `user.nickname` | `string` | 昵称（可选） |
| `user.avatar` | `string` | 头像 URL（可选） |
| `user.role` | `string` | 用户角色：`user` / `admin` / `auditor` |

### TypeScript 调用示例

```typescript
import { authService } from '@/services/auth.service'

// 邮箱密码登录
const res = await authService.login('user@example.com', 'your_password')
console.log(res.data.accessToken)
console.log(res.data.user.nickname)

// 手机验证码登录
const res2 = await authService.loginByPhone('13800138000', '123456')
console.log(res2.data.accessToken)
```

### 错误响应

| 错误码 | 说明 |
|--------|------|
| `1022` | 参数校验失败（邮箱格式错误、密码为空等） |
| `1005` | 邮箱或密码错误 |
| `1006` | 验证码错误或已过期 |
| `1007` | 账号已被禁用 |

```json
{
  "code": 1005,
  "message": "邮箱或密码错误",
  "data": null
}
```

---

## POST /auth/send-code - 发送验证码

向指定手机号发送短信验证码，用于手机号登录。验证码有效期为 5 分钟，同一手机号 60 秒内不可重复发送。

- **鉴权**: 不需要

### 请求参数

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `phone` | `string` | 是 | 手机号码 |

### 请求示例

```json
{
  "phone": "13800138000"
}
```

### 响应

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "message": "验证码已发送"
  }
}
```

### TypeScript 调用示例

```typescript
import { authService } from '@/services/auth.service'

const res = await authService.sendCode('13800138000')
console.log(res.data.message) // "验证码已发送"
```

### 错误响应

| 错误码 | 说明 |
|--------|------|
| `1022` | 手机号格式不正确 |
| `1008` | 发送过于频繁，请 60 秒后重试 |
| `2000` | 短信服务异常 |

```json
{
  "code": 1008,
  "message": "发送过于频繁，请 60 秒后重试",
  "data": null
}
```

---

## POST /auth/logout - 退出登录

使当前用户的 Token 失效，退出登录状态。

- **鉴权**: 需要（Bearer Token）

### 请求参数

无

### 请求头

```
Authorization: Bearer <accessToken>
```

### 响应

```json
{
  "code": 0,
  "message": "success",
  "data": null
}
```

### TypeScript 调用示例

```typescript
import { authService } from '@/services/auth.service'

await authService.logout()
// 清除本地存储的 Token 和用户信息
```

### 错误响应

| 错误码 | 说明 |
|--------|------|
| `1001` | 未登录或 Token 已过期 |

---

## POST /auth/refresh - 刷新 Token

使用 `refreshToken` 获取新的 Token 对。原 Token 对将在新 Token 签发后失效。

- **鉴权**: 不需要

### 请求参数

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `refreshToken` | `string` | 是 | 刷新令牌 |

### 请求示例

```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

### 响应

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIs...(new)",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs...(new)",
    "user": {
      "id": "usr_abc123",
      "email": "user@example.com",
      "username": "zhangsan",
      "nickname": "小张",
      "avatar": "https://cdn.lifechain.com/avatars/default.png",
      "role": "user"
    }
  }
}
```

### TypeScript 调用示例

```typescript
import { authService } from '@/services/auth.service'

const currentRefreshToken = '...' // 从本地存储获取
const res = await authService.refreshToken(currentRefreshToken)

// 更新本地存储
const { accessToken, refreshToken } = res.data
console.log('新 accessToken:', accessToken)
```

### 错误响应

| 错误码 | 说明 |
|--------|------|
| `1001` | refreshToken 无效或已过期 |
| `1022` | refreshToken 不能为空 |

```json
{
  "code": 1001,
  "message": "refreshToken 无效或已过期，请重新登录",
  "data": null
}
```

---

## 数据模型参考

### ILoginResponse

```typescript
interface ILoginResponse {
  accessToken: string
  refreshToken: string
  user: {
    id: string
    email: string
    username: string
    nickname?: string
    avatar?: string
    role: string  // 'user' | 'admin' | 'auditor'
  }
}
```

---

**最后更新**：2026-02-26
