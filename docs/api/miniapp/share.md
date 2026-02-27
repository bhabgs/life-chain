# 分享接口

> 模块：记忆分享与邀请管理
> Base URL：`/api/v1`

---

## 目录

- [POST /share/generate-card - 生成记忆分享卡片](#post-sharegenerate-card---生成记忆分享卡片)
- [GET /share/invite-code - 获取邀请码](#get-shareinvite-code---获取邀请码)
- [POST /share/verify-invite - 验证邀请码](#post-shareverify-invite---验证邀请码)
- [错误码说明](#错误码说明)

---

## POST /share/generate-card - 生成记忆分享卡片

根据指定的记忆 ID 和样式生成一张分享卡片图片，返回卡片的访问 URL。

### 基本信息

| 项目 | 说明 |
|------|------|
| 请求路径 | `POST /api/v1/share/generate-card` |
| 鉴权要求 | 是，需携带 `Authorization: Bearer <token>` |
| Content-Type | `application/json` |

### 请求体

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| memoryId | string | 是 | 要分享的记忆 ID |
| style | string | 否 | 卡片样式，默认 `default`，可选值：`default` / `minimal` / `warm` 等 |

### 请求示例

```json
{
  "memoryId": "mem_20260225_001",
  "style": "warm"
}
```

### 响应示例

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "cardUrl": "https://cdn.example.com/share-cards/card_x7y8z9.png",
    "memoryId": "mem_20260225_001",
    "style": "warm"
  }
}
```

### 响应字段说明

| 字段 | 类型 | 说明 |
|------|------|------|
| cardUrl | string | 生成的分享卡片图片 URL |
| memoryId | string | 关联的记忆 ID |
| style | string | 使用的卡片样式 |

### TypeScript 调用示例

```typescript
import { shareService } from '@/services/share';

const res = await shareService.generateCard({
  memoryId: 'mem_20260225_001',
  style: 'warm',
});
console.log(res.data.cardUrl); // "https://cdn.example.com/share-cards/card_x7y8z9.png"
```

### 错误响应

| code | message | 说明 |
|------|---------|------|
| 400 | 请求参数错误 | 请求体格式不正确 |
| 401 | 未授权，请先登录 | Token 缺失或已过期 |
| 1022 | 缺少 memoryId 参数 | 未提供 memoryId 字段 |
| 404 | 记忆不存在 | 指定的 memoryId 不存在 |
| 500 | 服务器内部错误 | 服务端异常 |

---

## GET /share/invite-code - 获取邀请码

获取当前用户的邀请码信息。每个用户拥有一个邀请码，可用于邀请新用户注册。

### 基本信息

| 项目 | 说明 |
|------|------|
| 请求路径 | `GET /api/v1/share/invite-code` |
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
    "code": "LIFE2026ABC",
    "expiredAt": "2026-03-28T23:59:59.000Z",
    "maxUses": 10,
    "usedCount": 3
  }
}
```

### 响应字段说明

| 字段 | 类型 | 说明 |
|------|------|------|
| code | string | 邀请码字符串 |
| expiredAt | string | 过期时间，ISO 8601 格式 |
| maxUses | number | 最大可使用次数 |
| usedCount | number | 已使用次数 |

### TypeScript 调用示例

```typescript
import { shareService } from '@/services/share';

const res = await shareService.getInviteCode();
console.log(res.data.code);      // "LIFE2026ABC"
console.log(res.data.maxUses);   // 10
console.log(res.data.usedCount); // 3

const remaining = res.data.maxUses - res.data.usedCount;
console.log(`剩余可用次数：${remaining}`); // "剩余可用次数：7"
```

### 错误响应

| code | message | 说明 |
|------|---------|------|
| 401 | 未授权，请先登录 | Token 缺失或已过期 |
| 500 | 服务器内部错误 | 服务端异常 |

---

## POST /share/verify-invite - 验证邀请码

验证输入的邀请码是否有效。此接口无需鉴权，可供未注册用户在注册前验证邀请码。

### 基本信息

| 项目 | 说明 |
|------|------|
| 请求路径 | `POST /api/v1/share/verify-invite` |
| 鉴权要求 | 否，无需携带 Token |
| Content-Type | `application/json` |

### 请求体

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| code | string | 是 | 待验证的邀请码 |

### 请求示例

```json
{
  "code": "LIFE2026ABC"
}
```

### 响应示例（邀请码有效）

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "valid": true,
    "inviterNickname": "张三",
    "message": "邀请码有效"
  }
}
```

### 响应示例（邀请码无效）

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "valid": false,
    "inviterNickname": null,
    "message": "邀请码无效或已过期"
  }
}
```

### 响应字段说明

| 字段 | 类型 | 说明 |
|------|------|------|
| valid | boolean | 邀请码是否有效 |
| inviterNickname | string \| null | 邀请人昵称，无效时为 `null` |
| message | string | 验证结果描述 |

### TypeScript 调用示例

```typescript
import { shareService } from '@/services/share';

const res = await shareService.verifyInvite({ code: 'LIFE2026ABC' });

if (res.data.valid) {
  console.log(`邀请人：${res.data.inviterNickname}`); // "邀请人：张三"
  // 继续注册流程
} else {
  console.log(res.data.message); // "邀请码无效或已过期"
  // 提示用户重新输入
}
```

### 错误响应

| code | message | 说明 |
|------|---------|------|
| 400 | 请求参数错误 | code 字段缺失或为空 |
| 500 | 服务器内部错误 | 服务端异常 |

---

## 错误码说明

| code | 说明 |
|------|------|
| 0 | 成功 |
| 400 | 请求参数错误 |
| 401 | 未授权（Token 缺失或过期） |
| 404 | 资源不存在 |
| 1022 | 缺少 memoryId 参数（生成分享卡片接口专用） |
| 500 | 服务器内部错误 |

---

> 最后更新：2026-02-26
