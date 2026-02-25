---
skill: api-doc
description: 生成或更新API文档
args: [service_name, output_format]
---

# 生成API文档

为指定服务生成或更新API文档。

## 参数说明

- `service_name`: 服务名称（例如：user, memory, chat）
- `output_format`: 输出格式（markdown, openapi, swagger）

## 执行步骤

1. **扫描服务代码**
   - 读取 controller 文件
   - 分析路由定义
   - 提取接口信息

2. **收集接口信息**
   - HTTP方法（GET, POST, PUT, PATCH, DELETE）
   - 路径
   - 请求参数
   - 请求体
   - 响应体
   - 状态码
   - 错误信息
   - 鉴权要求

3. **生成Markdown文档**

```markdown
# {ServiceName} API 文档

## 概述

{服务描述}

**Base URL**: `/api/v1/{service_name}`

---

## 接口列表

### 1. {接口名称}

**描述**: {接口描述}

**HTTP方法**: `{METHOD}`

**路径**: `/{path}`

**鉴权**: ✅ 需要 / ❌ 不需要

#### 请求参数

##### Path参数
| 参数名 | 类型 | 必填 | 说明 |
|-------|------|-----|------|
| id | string | 是 | 资源ID |

##### Query参数
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|-------|------|-----|--------|------|
| page | number | 否 | 1 | 页码 |
| pageSize | number | 否 | 20 | 每页数量 |

##### Headers
| 参数名 | 类型 | 必填 | 说明 |
|-------|------|-----|------|
| Authorization | string | 是 | Bearer token |

#### 请求体

```json
{
  "field1": "value1",
  "field2": "value2"
}
```

**字段说明**:
| 字段 | 类型 | 必填 | 说明 |
|-----|------|-----|------|
| field1 | string | 是 | 字段1说明 |
| field2 | string | 否 | 字段2说明 |

#### 响应

##### 成功响应（200 OK）

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "id": "uuid",
    "field1": "value1"
  }
}
```

**字段说明**:
| 字段 | 类型 | 说明 |
|-----|------|------|
| code | number | 状态码，0表示成功 |
| message | string | 响应消息 |
| data | object | 响应数据 |

##### 错误响应

###### 400 Bad Request
```json
{
  "code": 400,
  "message": "参数错误",
  "errors": [
    {
      "field": "email",
      "message": "邮箱格式不正确"
    }
  ]
}
```

###### 401 Unauthorized
```json
{
  "code": 401,
  "message": "未授权访问"
}
```

###### 403 Forbidden
```json
{
  "code": 403,
  "message": "权限不足"
}
```

###### 404 Not Found
```json
{
  "code": 404,
  "message": "资源不存在"
}
```

###### 500 Internal Server Error
```json
{
  "code": 500,
  "message": "服务器内部错误"
}
```

#### 示例

##### cURL
```bash
curl -X {METHOD} \
  'https://api.lifechain.com/api/v1/{service_name}/{path}' \
  -H 'Authorization: Bearer YOUR_TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
    "field1": "value1"
  }'
```

##### JavaScript (fetch)
```javascript
const response = await fetch('https://api.lifechain.com/api/v1/{service_name}/{path}', {
  method: '{METHOD}',
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    field1: 'value1'
  })
});

const data = await response.json();
console.log(data);
```

##### TypeScript (axios)
```typescript
import axios from 'axios';

const response = await axios.{method}<ResponseType>('/{path}', {
  field1: 'value1'
}, {
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN'
  }
});

console.log(response.data);
```

---

## 数据模型

### {ModelName}

| 字段 | 类型 | 必填 | 说明 |
|-----|------|-----|------|
| id | string | 是 | 唯一标识 |
| field1 | string | 是 | 字段1 |
| createdAt | string | 是 | 创建时间（ISO 8601） |
| updatedAt | string | 是 | 更新时间（ISO 8601） |

---

## 错误码说明

| 错误码 | 说明 |
|-------|------|
| 0 | 成功 |
| 400 | 请求参数错误 |
| 401 | 未授权 |
| 403 | 权限不足 |
| 404 | 资源不存在 |
| 409 | 资源冲突 |
| 422 | 参数验证失败 |
| 429 | 请求过于频繁 |
| 500 | 服务器内部错误 |
| 503 | 服务不可用 |

---

## 通用说明

### 鉴权

所有需要鉴权的接口都需要在请求头中携带 JWT Token：

```
Authorization: Bearer {token}
```

Token 可以通过登录接口获取。

### 分页

列表接口支持分页，使用 `page` 和 `pageSize` 参数：

```
GET /api/v1/{service_name}?page=1&pageSize=20
```

响应格式：
```json
{
  "code": 0,
  "message": "success",
  "data": {
    "items": [...],
    "total": 100,
    "page": 1,
    "pageSize": 20,
    "totalPages": 5
  }
}
```

### 时间格式

所有时间字段使用 ISO 8601 格式：

```
2026-02-24T10:30:00.000Z
```

### 排序

列表接口支持排序，使用 `sortBy` 和 `sortOrder` 参数：

```
GET /api/v1/{service_name}?sortBy=createdAt&sortOrder=desc
```

### 筛选

列表接口支持筛选，使用 `filter` 参数：

```
GET /api/v1/{service_name}?filter[status]=active&filter[type]=text
```

---

## 变更日志

### v1.0.0 (2026-02-24)
- 初始版本
- 添加基础CRUD接口

---

**最后更新**: 2026-02-24
**维护者**: 后端团队
```

4. **生成OpenAPI规范（可选）**

```yaml
openapi: 3.0.0
info:
  title: {ServiceName} API
  description: {服务描述}
  version: 1.0.0
servers:
  - url: https://api.lifechain.com/api/v1
    description: 生产环境
  - url: https://api-dev.lifechain.com/api/v1
    description: 开发环境

paths:
  /{service_name}:
    get:
      summary: 获取列表
      tags:
        - {ServiceName}
      security:
        - bearerAuth: []
      parameters:
        - name: page
          in: query
          schema:
            type: integer
            default: 1
        - name: pageSize
          in: query
          schema:
            type: integer
            default: 20
      responses:
        '200':
          description: 成功
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ListResponse'

components:
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT

  schemas:
    ListResponse:
      type: object
      properties:
        code:
          type: integer
        message:
          type: string
        data:
          type: object
```

## 文档组织结构

```
docs/api/
├── README.md                 # API文档总览
├── authentication.md         # 鉴权说明
├── common.md                 # 通用说明
├── services/
│   ├── user.md              # 用户服务API
│   ├── memory.md            # 记忆服务API
│   ├── chat.md              # 对话服务API
│   └── ...
└── openapi/
    ├── user.yaml            # OpenAPI规范
    └── ...
```

## 文档规范

1. **清晰性**：接口描述清晰，参数说明详细
2. **完整性**：包含所有请求参数和响应字段
3. **示例**：提供多种语言的调用示例
4. **更新性**：代码变更时同步更新文档
5. **版本化**：记录API版本和变更历史

## 自动化文档

如果使用 Swagger/OpenAPI 装饰器，可以自动生成文档：

```typescript
// NestJS Swagger示例
@ApiTags('memories')
@Controller('memories')
export class MemoriesController {
  @Get()
  @ApiOperation({ summary: '获取记忆列表' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiResponse({ status: 200, description: '成功', type: [MemoryDto] })
  async findAll(@Query('page') page: number) {
    // ...
  }
}
```

## 完成后

1. 检查文档完整性
2. 验证示例代码可运行
3. 更新变更日志
4. 提交文档到版本控制
