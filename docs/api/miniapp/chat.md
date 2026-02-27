# 对话接口 (Chat)

> 小程序端 AI 对话相关接口，包括会话管理与消息收发

**Base URL**: `/api/v1`

**Service 文件**: `packages/miniapp/src/services/chat.service.ts`

---

## 目录

- [GET /chat/sessions - 获取会话列表](#get-chatsessions---获取会话列表)
- [POST /chat/sessions - 创建新会话](#post-chatsessions---创建新会话)
- [GET /chat/sessions/:id/messages - 获取会话消息列表](#get-chatsessionsidmessages---获取会话消息列表)
- [POST /chat/sessions/:id/messages - 发送消息](#post-chatsessionsidmessages---发送消息)
- [数据模型参考](#数据模型参考)

---

## GET /chat/sessions - 获取会话列表

获取当前用户的所有对话会话，按最近活跃时间倒序排列。

- **鉴权**: 需要（Bearer Token）

### 请求参数

无

### 请求示例

```
GET /api/v1/chat/sessions
```

### 响应

```json
{
  "code": 0,
  "message": "success",
  "data": [
    {
      "id": "sess_001",
      "userId": "usr_abc123",
      "title": "关于童年记忆的聊天",
      "mode": "normal",
      "status": "active",
      "messageCount": 24,
      "lastMessageAt": "2026-02-26T10:30:00.000Z",
      "createdAt": "2026-02-20T08:00:00.000Z",
      "updatedAt": "2026-02-26T10:30:00.000Z"
    },
    {
      "id": "sess_002",
      "userId": "usr_abc123",
      "title": "深夜倾诉",
      "mode": "night",
      "status": "active",
      "messageCount": 12,
      "lastMessageAt": "2026-02-25T23:15:00.000Z",
      "createdAt": "2026-02-25T22:00:00.000Z",
      "updatedAt": "2026-02-25T23:15:00.000Z"
    },
    {
      "id": "sess_003",
      "userId": "usr_abc123",
      "title": "倾听模式体验",
      "mode": "listen",
      "status": "archived",
      "messageCount": 8,
      "lastMessageAt": "2026-02-18T14:00:00.000Z",
      "createdAt": "2026-02-18T13:00:00.000Z",
      "updatedAt": "2026-02-18T14:00:00.000Z"
    }
  ]
}
```

#### 响应字段说明

| 字段 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 会话 ID |
| `userId` | `string` | 用户 ID |
| `title` | `string` | 会话标题（可选，AI 自动生成或用户指定） |
| `mode` | `string` | 对话模式：`normal` 普通 / `night` 深夜 / `silent` 静默 / `listen` 倾听 |
| `status` | `string` | 会话状态：`active` 活跃 / `archived` 已归档 / `deleted` 已删除 |
| `messageCount` | `number` | 消息总数 |
| `lastMessageAt` | `string` | 最后一条消息时间（ISO 8601，可选） |
| `createdAt` | `string` | 创建时间（ISO 8601） |
| `updatedAt` | `string` | 更新时间（ISO 8601） |

### TypeScript 调用示例

```typescript
import { chatService } from '@/services/chat.service'

const res = await chatService.getSessions()
const sessions = res.data  // IChatSession[]

sessions.forEach((session) => {
  console.log(`${session.title} - ${session.messageCount} 条消息`)
})
```

### 错误响应

| 错误码 | 说明 |
|--------|------|
| `1001` | 未登录或 Token 已过期 |

---

## POST /chat/sessions - 创建新会话

创建一个新的对话会话。

- **鉴权**: 需要（Bearer Token）

### 请求参数

| 字段 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `title` | `string` | 否 | 系统自动生成 | 会话标题 |
| `mode` | `string` | 否 | `"normal"` | 对话模式：`normal` / `night` / `silent` / `listen` |

### 请求示例

```json
{
  "title": "晚间聊天",
  "mode": "night"
}
```

### 响应

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "id": "sess_new001",
    "userId": "usr_abc123",
    "title": "晚间聊天",
    "mode": "night",
    "status": "active",
    "messageCount": 0,
    "lastMessageAt": null,
    "createdAt": "2026-02-26T21:00:00.000Z",
    "updatedAt": "2026-02-26T21:00:00.000Z"
  }
}
```

### TypeScript 调用示例

```typescript
import { chatService } from '@/services/chat.service'

// 创建普通对话
const res = await chatService.createSession()
console.log('新会话 ID:', res.data.id)

// 创建指定模式的对话
const res2 = await chatService.createSession('晚间聊天', 'night')
console.log('深夜模式会话:', res2.data.id)
```

### 错误响应

| 错误码 | 说明 |
|--------|------|
| `1001` | 未登录或 Token 已过期 |
| `1022` | 参数校验失败（如 mode 值不合法） |

---

## GET /chat/sessions/:id/messages - 获取会话消息列表

获取指定会话的全部消息记录，按时间正序排列。

- **鉴权**: 需要（Bearer Token）

### 路径参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `id` | `string` | 是 | 会话 ID |

### 请求示例

```
GET /api/v1/chat/sessions/sess_001/messages
```

### 响应

```json
{
  "code": 0,
  "message": "success",
  "data": [
    {
      "id": "msg_001",
      "sessionId": "sess_001",
      "role": "user",
      "content": "你好，我想聊聊我的童年",
      "emotion": null,
      "createdAt": "2026-02-20T08:01:00.000Z"
    },
    {
      "id": "msg_002",
      "sessionId": "sess_001",
      "role": "assistant",
      "content": "你好呀！童年是人生中最珍贵的时光之一。你愿意和我分享一些童年的记忆吗？比如，有什么特别难忘的事情？",
      "emotion": "warm",
      "createdAt": "2026-02-20T08:01:02.000Z"
    },
    {
      "id": "msg_003",
      "sessionId": "sess_001",
      "role": "user",
      "content": "记得小时候每年暑假都去外婆家，她会做很好吃的红烧肉",
      "emotion": null,
      "createdAt": "2026-02-20T08:02:30.000Z"
    },
    {
      "id": "msg_004",
      "sessionId": "sess_001",
      "role": "assistant",
      "content": "外婆的红烧肉，那一定是充满爱的味道。暑假去外婆家听起来是一段很温馨的回忆。外婆家在什么地方呀？那里的夏天是什么样的？",
      "emotion": "nostalgic",
      "createdAt": "2026-02-20T08:02:33.000Z"
    }
  ]
}
```

#### 响应字段说明

| 字段 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 消息 ID |
| `sessionId` | `string` | 所属会话 ID |
| `role` | `string` | 消息角色：`user` 用户 / `assistant` AI 助手 |
| `content` | `string` | 消息内容 |
| `emotion` | `string \| null` | AI 识别的情绪标签（可选） |
| `createdAt` | `string` | 消息创建时间（ISO 8601） |

### TypeScript 调用示例

```typescript
import { chatService } from '@/services/chat.service'

const res = await chatService.getMessages('sess_001')
const messages = res.data  // IChatMessage[]

messages.forEach((msg) => {
  const sender = msg.role === 'user' ? '我' : 'AI'
  console.log(`[${sender}] ${msg.content}`)
})
```

### 错误响应

| 错误码 | 说明 |
|--------|------|
| `1001` | 未登录或 Token 已过期 |
| `1003` | 无权限访问该会话 |
| `1004` | 会话不存在 |

```json
{
  "code": 1004,
  "message": "会话不存在",
  "data": null
}
```

---

## POST /chat/sessions/:id/messages - 发送消息

向指定会话发送一条消息，服务端将调用 AI 模型生成回复，同时返回用户消息和 AI 回复。

- **鉴权**: 需要（Bearer Token）

### 路径参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `id` | `string` | 是 | 会话 ID |

### 请求参数

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `content` | `string` | 是 | 消息内容 |

### 请求示例

```
POST /api/v1/chat/sessions/sess_001/messages
```

```json
{
  "content": "记得小时候每年暑假都去外婆家，她会做很好吃的红烧肉"
}
```

### 响应

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "userMessage": {
      "id": "msg_005",
      "sessionId": "sess_001",
      "role": "user",
      "content": "记得小时候每年暑假都去外婆家，她会做很好吃的红烧肉",
      "emotion": null,
      "createdAt": "2026-02-26T14:00:00.000Z"
    },
    "aiReply": {
      "id": "msg_006",
      "sessionId": "sess_001",
      "role": "assistant",
      "content": "外婆的红烧肉，那一定是充满爱的味道。暑假去外婆家听起来是一段很温馨的回忆。外婆家在什么地方呀？那里的夏天是什么样的？",
      "emotion": "nostalgic",
      "createdAt": "2026-02-26T14:00:02.000Z"
    }
  }
}
```

#### 响应字段说明

| 字段 | 类型 | 说明 |
|------|------|------|
| `userMessage` | `IChatMessage` | 用户发送的消息对象 |
| `aiReply` | `IChatMessage` | AI 生成的回复消息对象 |

### TypeScript 调用示例

```typescript
import { chatService } from '@/services/chat.service'

const res = await chatService.sendMessage('sess_001', '记得小时候每年暑假都去外婆家')
const { userMessage, aiReply } = res.data

console.log('我:', userMessage.content)
console.log('AI:', aiReply.content)
console.log('AI 情绪:', aiReply.emotion)  // "nostalgic"
```

### 错误响应

| 错误码 | 说明 |
|--------|------|
| `1001` | 未登录或 Token 已过期 |
| `1003` | 无权限访问该会话 |
| `1004` | 会话不存在 |
| `1022` | 消息内容不能为空 |
| `2000` | AI 服务暂时不可用 |
| `2001` | AI 生成超时，请重试 |

```json
{
  "code": 2000,
  "message": "AI 服务暂时不可用，请稍后重试",
  "data": null
}
```

---

## 数据模型参考

### IChatSession

```typescript
interface IChatSession {
  id: string
  userId: string
  title?: string
  mode: 'normal' | 'night' | 'silent' | 'listen'
  status: 'active' | 'archived' | 'deleted'
  messageCount: number
  lastMessageAt?: string    // ISO 8601
  createdAt: string         // ISO 8601
  updatedAt: string         // ISO 8601
}
```

#### 对话模式说明

| 模式 | 值 | 说明 |
|------|-----|------|
| 普通模式 | `normal` | 日常对话，AI 主动引导话题 |
| 深夜模式 | `night` | 语气更温柔，适合深夜倾诉 |
| 静默模式 | `silent` | AI 减少主动提问，用户主导 |
| 倾听模式 | `listen` | AI 专注倾听，给予共情回应 |

### IChatMessage

```typescript
interface IChatMessage {
  id: string
  sessionId: string
  role: 'user' | 'assistant' | 'system'
  content: string
  emotion?: string
  metadata?: Record<string, unknown>
  createdAt: string          // ISO 8601
}
```

#### 消息角色说明

| 角色 | 值 | 说明 |
|------|-----|------|
| 用户 | `user` | 用户发送的消息 |
| AI 助手 | `assistant` | AI 生成的回复 |
| 系统 | `system` | 系统消息（如会话状态变更提示） |

---

**最后更新**：2026-02-26
