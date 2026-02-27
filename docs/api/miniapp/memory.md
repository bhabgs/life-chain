# 记忆接口 (Memory)

> 小程序端记忆管理相关接口，包括记忆的增删改查与统计

**Base URL**: `/api/v1`

**Service 文件**: `packages/miniapp/src/services/memory.service.ts`

---

## 目录

- [GET /memories - 获取记忆列表](#get-memories---获取记忆列表)
- [GET /memories/stats - 获取记忆统计](#get-memoriesstats---获取记忆统计)
- [GET /memories/:id - 获取记忆详情](#get-memoriesid---获取记忆详情)
- [POST /memories - 创建记忆](#post-memories---创建记忆)
- [PUT /memories/:id - 编辑记忆](#put-memoriesid---编辑记忆)
- [DELETE /memories/:id - 删除记忆](#delete-memoriesid---删除记忆)
- [数据模型参考](#数据模型参考)

---

## GET /memories - 获取记忆列表

获取当前用户的记忆列表，支持分页、按类型/阶段/关键词筛选。

- **鉴权**: 需要（Bearer Token）

### 请求参数 (Query)

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `page` | `number` | 否 | `1` | 页码，从 1 开始 |
| `pageSize` | `number` | 否 | `20` | 每页数量，最大 100 |
| `type` | `string` | 否 | - | 记忆类型：`text` / `image` / `voice` / `video` / `event` |
| `stage` | `string` | 否 | - | 人生阶段：`childhood` / `adolescence` / `youth` / `middle_age` / `old_age` |
| `keyword` | `string` | 否 | - | 搜索关键词（匹配标题和内容） |
| `startDate` | `string` | 否 | - | 起始日期（ISO 8601 格式） |
| `endDate` | `string` | 否 | - | 结束日期（ISO 8601 格式） |
| `privacyLevel` | `number` | 否 | - | 隐私等级：`1` 仅自己 / `2` 继承人可见 / `3` 公开 |

### 请求示例

```
GET /api/v1/memories?page=1&pageSize=10&type=text&keyword=旅行
```

### 响应

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "items": [
      {
        "id": "mem_001",
        "userId": "usr_abc123",
        "type": "text",
        "title": "第一次独自旅行",
        "content": "那年夏天，我背上背包去了云南...",
        "emotion": "happy",
        "stage": "youth",
        "privacyLevel": 1,
        "mediaUrls": [],
        "metadata": {
          "tags": ["旅行", "云南", "夏天"],
          "location": "云南大理",
          "people": ["自己"]
        },
        "createdAt": "2026-02-20T10:30:00.000Z",
        "updatedAt": "2026-02-20T10:30:00.000Z",
        "deletedAt": null
      }
    ],
    "total": 56,
    "page": 1,
    "pageSize": 10,
    "totalPages": 6
  }
}
```

### TypeScript 调用示例

```typescript
import { memoryService } from '@/services/memory.service'

// 基础分页查询
const res = await memoryService.getList({ page: 1, pageSize: 10 })
console.log(res.data.items)   // IMemory[]
console.log(res.data.total)   // 总数

// 带筛选条件
const res2 = await memoryService.getList({
  page: 1,
  pageSize: 20,
  type: 'text',
  stage: 'youth',
  keyword: '旅行',
})
```

### 错误响应

| 错误码 | 说明 |
|--------|------|
| `1001` | 未登录或 Token 已过期 |
| `1022` | 参数校验失败（如 type 值不合法） |

---

## GET /memories/stats - 获取记忆统计

获取当前用户的记忆统计数据，包括按类型、阶段、情绪维度的分布。

- **鉴权**: 需要（Bearer Token）

### 请求参数

无

### 响应

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "total": 128,
    "byType": {
      "text": 65,
      "image": 38,
      "voice": 15,
      "video": 8,
      "event": 2
    },
    "byStage": {
      "childhood": 12,
      "adolescence": 25,
      "youth": 56,
      "middle_age": 30,
      "old_age": 5
    },
    "byEmotion": {
      "happy": 45,
      "nostalgic": 30,
      "peaceful": 25,
      "sad": 15,
      "excited": 13
    }
  }
}
```

#### 响应字段说明

| 字段 | 类型 | 说明 |
|------|------|------|
| `total` | `number` | 记忆总数 |
| `byType` | `Record<string, number>` | 按记忆类型分布 |
| `byStage` | `Record<string, number>` | 按人生阶段分布 |
| `byEmotion` | `Record<string, number>` | 按情绪标签分布 |

### TypeScript 调用示例

```typescript
import { memoryService } from '@/services/memory.service'

const res = await memoryService.getStats()
console.log('记忆总数:', res.data.total)
console.log('文字记忆数:', res.data.byType.text)
console.log('青年阶段:', res.data.byStage.youth)
```

### 错误响应

| 错误码 | 说明 |
|--------|------|
| `1001` | 未登录或 Token 已过期 |

---

## GET /memories/:id - 获取记忆详情

根据记忆 ID 获取单条记忆的完整信息。

- **鉴权**: 需要（Bearer Token）

### 路径参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `id` | `string` | 是 | 记忆 ID |

### 请求示例

```
GET /api/v1/memories/mem_001
```

### 响应

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "id": "mem_001",
    "userId": "usr_abc123",
    "type": "image",
    "title": "毕业合影",
    "content": "大学四年的最后一天，我们在校门口拍了这张照片...",
    "emotion": "nostalgic",
    "stage": "youth",
    "privacyLevel": 2,
    "mediaUrls": [
      "https://cdn.lifechain.com/memories/graduation_001.jpg",
      "https://cdn.lifechain.com/memories/graduation_002.jpg"
    ],
    "metadata": {
      "tags": ["毕业", "大学", "合影"],
      "location": "北京大学",
      "people": ["小王", "小李", "老师"],
      "weather": "晴天",
      "mood": "感动"
    },
    "createdAt": "2026-02-15T08:00:00.000Z",
    "updatedAt": "2026-02-15T08:00:00.000Z",
    "deletedAt": null
  }
}
```

### TypeScript 调用示例

```typescript
import { memoryService } from '@/services/memory.service'

const res = await memoryService.getById('mem_001')
console.log(res.data.title)      // "毕业合影"
console.log(res.data.mediaUrls)  // 媒体文件列表
console.log(res.data.metadata?.tags)  // ["毕业", "大学", "合影"]
```

### 错误响应

| 错误码 | 说明 |
|--------|------|
| `1001` | 未登录或 Token 已过期 |
| `1004` | 记忆不存在 |
| `1003` | 无权限访问该记忆（不属于当前用户） |

```json
{
  "code": 1004,
  "message": "记忆不存在",
  "data": null
}
```

---

## POST /memories - 创建记忆

创建一条新的记忆。

- **鉴权**: 需要（Bearer Token）

### 请求参数

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `type` | `string` | 是 | 记忆类型：`text` / `image` / `voice` / `video` / `event` |
| `title` | `string` | 是 | 记忆标题 |
| `content` | `string` | 是 | 记忆内容 |
| `emotion` | `string` | 否 | 情绪标签，如 `happy` / `sad` / `nostalgic` 等 |
| `tags` | `string[]` | 否 | 标签列表 |
| `mediaUrls` | `string[]` | 否 | 媒体文件 URL 列表（通过上传接口获取） |

### 请求示例

```json
{
  "type": "text",
  "title": "第一次做饭",
  "content": "今天自己第一次尝试做了一道番茄炒蛋，虽然有点咸，但成就感满满！",
  "emotion": "happy",
  "tags": ["生活", "做饭", "第一次"],
  "mediaUrls": []
}
```

### 响应

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "id": "mem_new001",
    "userId": "usr_abc123",
    "type": "text",
    "title": "第一次做饭",
    "content": "今天自己第一次尝试做了一道番茄炒蛋，虽然有点咸，但成就感满满！",
    "emotion": "happy",
    "stage": "youth",
    "privacyLevel": 1,
    "mediaUrls": [],
    "metadata": {
      "tags": ["生活", "做饭", "第一次"]
    },
    "createdAt": "2026-02-26T12:00:00.000Z",
    "updatedAt": "2026-02-26T12:00:00.000Z",
    "deletedAt": null
  }
}
```

### TypeScript 调用示例

```typescript
import { memoryService } from '@/services/memory.service'

const res = await memoryService.create({
  type: 'text',
  title: '第一次做饭',
  content: '今天自己第一次尝试做了一道番茄炒蛋...',
  emotion: 'happy',
  tags: ['生活', '做饭', '第一次'],
})
console.log('新记忆 ID:', res.data.id)
```

### 错误响应

| 错误码 | 说明 |
|--------|------|
| `1001` | 未登录或 Token 已过期 |
| `1022` | 参数校验失败（如 type 值不合法、title 为空） |

```json
{
  "code": 1022,
  "message": "参数校验失败",
  "data": {
    "details": {
      "title": ["标题不能为空"],
      "type": ["记忆类型不合法"]
    }
  }
}
```

---

## PUT /memories/:id - 编辑记忆

更新指定记忆的内容，仅支持更新部分字段。

- **鉴权**: 需要（Bearer Token）

### 路径参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `id` | `string` | 是 | 记忆 ID |

### 请求参数

所有字段均为可选，仅更新传入的字段。

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `title` | `string` | 否 | 记忆标题 |
| `content` | `string` | 否 | 记忆内容 |
| `emotion` | `string` | 否 | 情绪标签 |
| `tags` | `string[]` | 否 | 标签列表（整体替换） |

### 请求示例

```
PUT /api/v1/memories/mem_001
```

```json
{
  "title": "第一次独自旅行（改）",
  "emotion": "nostalgic",
  "tags": ["旅行", "云南", "夏天", "独自"]
}
```

### 响应

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "id": "mem_001",
    "userId": "usr_abc123",
    "type": "text",
    "title": "第一次独自旅行（改）",
    "content": "那年夏天，我背上背包去了云南...",
    "emotion": "nostalgic",
    "stage": "youth",
    "privacyLevel": 1,
    "mediaUrls": [],
    "metadata": {
      "tags": ["旅行", "云南", "夏天", "独自"]
    },
    "createdAt": "2026-02-20T10:30:00.000Z",
    "updatedAt": "2026-02-26T14:00:00.000Z",
    "deletedAt": null
  }
}
```

### TypeScript 调用示例

```typescript
import { memoryService } from '@/services/memory.service'

const res = await memoryService.update('mem_001', {
  title: '第一次独自旅行（改）',
  emotion: 'nostalgic',
  tags: ['旅行', '云南', '夏天', '独自'],
})
console.log('更新后标题:', res.data.title)
```

### 错误响应

| 错误码 | 说明 |
|--------|------|
| `1001` | 未登录或 Token 已过期 |
| `1003` | 无权限编辑该记忆 |
| `1004` | 记忆不存在 |
| `1022` | 参数校验失败 |

---

## DELETE /memories/:id - 删除记忆

删除指定的记忆（软删除）。

- **鉴权**: 需要（Bearer Token）

### 路径参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `id` | `string` | 是 | 记忆 ID |

### 请求示例

```
DELETE /api/v1/memories/mem_001
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
import { memoryService } from '@/services/memory.service'

await memoryService.delete('mem_001')
// 记忆已删除（软删除）
```

### 错误响应

| 错误码 | 说明 |
|--------|------|
| `1001` | 未登录或 Token 已过期 |
| `1003` | 无权限删除该记忆 |
| `1004` | 记忆不存在 |

---

## 数据模型参考

### IMemory

```typescript
interface IMemory {
  id: string
  userId: string
  type: 'text' | 'image' | 'voice' | 'video' | 'event'
  title?: string
  content?: string
  emotion?: string
  stage?: 'childhood' | 'adolescence' | 'youth' | 'middle_age' | 'old_age'
  privacyLevel: 1 | 2 | 3   // 1:仅自己 2:继承人可见 3:公开
  mediaUrls: string[]
  metadata?: IMemoryMetadata
  createdAt: string           // ISO 8601
  updatedAt: string           // ISO 8601
  deletedAt?: string | null   // 软删除标记
}
```

### IMemoryMetadata

```typescript
interface IMemoryMetadata {
  location?: string
  people?: string[]
  tags?: string[]
  weather?: string
  mood?: string
}
```

### IMemoryQueryParams

```typescript
interface IMemoryQueryParams {
  page?: number
  pageSize?: number
  userId?: string
  type?: 'text' | 'voice' | 'image' | 'video' | 'event'
  stage?: 'childhood' | 'adolescence' | 'youth' | 'middle_age' | 'old_age'
  keyword?: string
  startDate?: string
  endDate?: string
  privacyLevel?: 1 | 2 | 3
}
```

---

**最后更新**：2026-02-26
