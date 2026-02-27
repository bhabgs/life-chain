# 上传接口

> 模块：文件上传与语音转文字
> Base URL：`/api/v1`

---

## 目录

- [POST /upload/image - 上传图片](#post-uploadimage---上传图片)
- [POST /upload/voice-transcribe - 语音转文字](#post-uploadvoice-transcribe---语音转文字)
- [错误码说明](#错误码说明)

---

## POST /upload/image - 上传图片

上传图片文件并返回可访问的图片 URL。

> **备注**：正式环境中应使用 `multipart/form-data` 进行文件上传，当前 Mock 阶段简化为 JSON 请求体传递小程序临时文件路径。

### 基本信息

| 项目 | 说明 |
|------|------|
| 请求路径 | `POST /api/v1/upload/image` |
| 鉴权要求 | 是，需携带 `Authorization: Bearer <token>` |
| Content-Type | `application/json`（Mock 阶段）/ `multipart/form-data`（正式环境） |

### 请求体

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| filePath | string | 是 | 小程序临时文件路径，如 `http://tmp/wx123abc.png` |

### 请求示例

```json
{
  "filePath": "http://tmp/wx123abc.png"
}
```

### 响应示例

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "url": "https://cdn.example.com/uploads/2026/02/26/img_a1b2c3d4.jpg",
    "filename": "img_a1b2c3d4.jpg"
  }
}
```

### 响应字段说明

| 字段 | 类型 | 说明 |
|------|------|------|
| url | string | 上传成功后的图片访问 URL |
| filename | string | 服务端生成的文件名 |

### TypeScript 调用示例

```typescript
import { uploadService } from '@/services/upload';

const res = await uploadService.uploadImage({
  filePath: 'http://tmp/wx123abc.png',
});
console.log(res.data.url);      // "https://cdn.example.com/uploads/2026/02/26/img_a1b2c3d4.jpg"
console.log(res.data.filename); // "img_a1b2c3d4.jpg"
```

### 错误响应

| code | message | 说明 |
|------|---------|------|
| 400 | 请求参数错误 | filePath 缺失或格式不正确 |
| 401 | 未授权，请先登录 | Token 缺失或已过期 |
| 413 | 文件大小超出限制 | 图片大小超过允许的上限 |
| 415 | 不支持的文件格式 | 文件格式非允许的图片类型 |
| 500 | 服务器内部错误 | 服务端异常 |

---

## POST /upload/voice-transcribe - 语音转文字

上传语音文件并进行语音识别，返回转写后的文字内容、音频时长及识别置信度。

### 基本信息

| 项目 | 说明 |
|------|------|
| 请求路径 | `POST /api/v1/upload/voice-transcribe` |
| 鉴权要求 | 是，需携带 `Authorization: Bearer <token>` |
| Content-Type | `application/json` |

### 请求体

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| filePath | string | 是 | 语音文件路径，如 `http://tmp/wx456def.mp3` |

### 请求示例

```json
{
  "filePath": "http://tmp/wx456def.mp3"
}
```

### 响应示例

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "text": "今天天气很好，和朋友一起去公园散步了，心情特别愉快。",
    "duration": 8.5,
    "confidence": 0.96
  }
}
```

### 响应字段说明

| 字段 | 类型 | 说明 |
|------|------|------|
| text | string | 语音转写后的文字内容 |
| duration | number | 音频时长，单位为秒 |
| confidence | number | 识别置信度，取值范围 0~1，越接近 1 表示识别结果越可靠 |

### TypeScript 调用示例

```typescript
import { uploadService } from '@/services/upload';

const res = await uploadService.transcribeVoice({
  filePath: 'http://tmp/wx456def.mp3',
});
console.log(res.data.text);       // "今天天气很好，和朋友一起去公园散步了，心情特别愉快。"
console.log(res.data.duration);   // 8.5
console.log(res.data.confidence); // 0.96
```

### 错误响应

| code | message | 说明 |
|------|---------|------|
| 400 | 请求参数错误 | filePath 缺失或格式不正确 |
| 401 | 未授权，请先登录 | Token 缺失或已过期 |
| 413 | 文件大小超出限制 | 语音文件大小超过允许的上限 |
| 415 | 不支持的文件格式 | 文件格式非允许的音频类型 |
| 500 | 服务器内部错误 | 服务端异常 |

---

## 错误码说明

| code | 说明 |
|------|------|
| 0 | 成功 |
| 400 | 请求参数错误 |
| 401 | 未授权（Token 缺失或过期） |
| 413 | 文件大小超出限制 |
| 415 | 不支持的文件格式 |
| 500 | 服务器内部错误 |

---

> 最后更新：2026-02-26
