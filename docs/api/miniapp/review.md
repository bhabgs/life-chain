# 回顾接口

> 模块：人生回顾与阶段总结
> Base URL：`/api/v1`

---

## 目录

- [GET /review/timeline - 获取时间轴数据](#get-reviewtimeline---获取时间轴数据)
- [GET /review/summary - 获取阶段总结](#get-reviewsummary---获取阶段总结)
- [数据模型](#数据模型)
- [错误码说明](#错误码说明)

---

## GET /review/timeline - 获取时间轴数据

获取当前用户的记忆时间轴数据，按月份分组返回，每组包含当月的记忆高亮条目。

### 基本信息

| 项目 | 说明 |
|------|------|
| 请求路径 | `GET /api/v1/review/timeline` |
| 鉴权要求 | 是，需携带 `Authorization: Bearer <token>` |
| Content-Type | `application/json` |

### 请求参数

无。

### 响应示例

```json
{
  "code": 0,
  "message": "success",
  "data": [
    {
      "month": "2026-02",
      "label": "2026年2月",
      "count": 15,
      "highlights": [
        {
          "id": "mem_20260225_001",
          "title": "和家人一起过元宵节",
          "date": "2026-02-25",
          "type": "life",
          "isImportant": true
        },
        {
          "id": "mem_20260220_003",
          "title": "完成了年度计划书",
          "date": "2026-02-20",
          "type": "work",
          "isImportant": false
        }
      ]
    },
    {
      "month": "2026-01",
      "label": "2026年1月",
      "count": 22,
      "highlights": [
        {
          "id": "mem_20260101_001",
          "title": "新年第一天的感悟",
          "date": "2026-01-01",
          "type": "thought",
          "isImportant": true
        },
        {
          "id": "mem_20260115_002",
          "title": "学会了做红烧肉",
          "date": "2026-01-15",
          "type": "life",
          "isImportant": false
        }
      ]
    }
  ]
}
```

### TypeScript 调用示例

```typescript
import { reviewService } from '@/services/review';

const res = await reviewService.getTimeline();

// 遍历时间轴分组
res.data.forEach((group) => {
  console.log(`${group.label}：共 ${group.count} 条记忆`);
  group.highlights.forEach((item) => {
    console.log(`  - ${item.title} (${item.date})`);
  });
});
```

### 错误响应

| code | message | 说明 |
|------|---------|------|
| 401 | 未授权，请先登录 | Token 缺失或已过期 |
| 500 | 服务器内部错误 | 服务端异常 |

---

## GET /review/summary - 获取阶段总结

获取指定时间周期的阶段性总结，包括记忆统计、对话统计、情绪分布、关键词及高亮事件。

### 基本信息

| 项目 | 说明 |
|------|------|
| 请求路径 | `GET /api/v1/review/summary` |
| 鉴权要求 | 是，需携带 `Authorization: Bearer <token>` |
| Content-Type | `application/json` |

### 请求参数（Query）

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| period | string | 否 | `30d` | 统计周期，可选值：`30d`（近30天）/ `90d`（近90天） |

### 请求示例

```
GET /api/v1/review/summary?period=30d
```

### 响应示例

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "id": "summary_202602",
    "period": "30d",
    "periodLabel": "近30天",
    "memoryCount": 28,
    "chatCount": 156,
    "emotionDistribution": {
      "happy": 45,
      "calm": 30,
      "sad": 10,
      "anxious": 8,
      "excited": 7
    },
    "keywords": [
      "工作",
      "家庭",
      "运动",
      "阅读",
      "旅行"
    ],
    "highlights": [
      "完成了一次重要的项目汇报",
      "和老朋友重新取得联系",
      "坚持跑步打卡21天"
    ]
  }
}
```

### TypeScript 调用示例

```typescript
import { reviewService } from '@/services/review';

// 获取近30天总结
const res30d = await reviewService.getSummary();
console.log(`近30天记录了 ${res30d.data.memoryCount} 条记忆`);

// 获取近90天总结
const res90d = await reviewService.getSummary({ period: '90d' });
console.log(`近90天关键词：${res90d.data.keywords.join('、')}`);
```

### 错误响应

| code | message | 说明 |
|------|---------|------|
| 400 | 请求参数错误 | period 取值不合法 |
| 401 | 未授权，请先登录 | Token 缺失或已过期 |
| 500 | 服务器内部错误 | 服务端异常 |

---

## 数据模型

### ITimelineGroup

```typescript
interface ITimelineGroup {
  /** 月份标识，格式 YYYY-MM */
  month: string;
  /** 月份显示文本，如 "2026年2月" */
  label: string;
  /** 当月记忆总条数 */
  count: number;
  /** 当月高亮记忆条目 */
  highlights: ITimelineHighlight[];
}

interface ITimelineHighlight {
  /** 记忆唯一标识 */
  id: string;
  /** 记忆标题 */
  title: string;
  /** 记忆日期，格式 YYYY-MM-DD */
  date: string;
  /** 记忆类型，如 life / work / thought 等 */
  type: string;
  /** 是否为重要记忆 */
  isImportant: boolean;
}
```

### IStageSummary

```typescript
interface IStageSummary {
  /** 总结唯一标识 */
  id: string;
  /** 统计周期：30d / 90d */
  period: string;
  /** 周期显示文本，如 "近30天" */
  periodLabel: string;
  /** 记忆条数 */
  memoryCount: number;
  /** 对话次数 */
  chatCount: number;
  /** 情绪分布，key 为情绪名称，value 为百分比或计数 */
  emotionDistribution: Record<string, number>;
  /** 关键词列表 */
  keywords: string[];
  /** 高亮事件描述 */
  highlights: string[];
}
```

---

## 错误码说明

| code | 说明 |
|------|------|
| 0 | 成功 |
| 400 | 请求参数错误 |
| 401 | 未授权（Token 缺失或过期） |
| 500 | 服务器内部错误 |

---

> 最后更新：2026-02-26
