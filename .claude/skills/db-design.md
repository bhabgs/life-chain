---
skill: db-design
description: 设计数据库表结构（PostgreSQL + Prisma）
args: [table_name, description]
---

# 数据库设计

根据生命链项目需求，设计数据库表结构。

## 参数说明

- `table_name`: 表名（例如：users, memories, personalities）
- `description`: 表描述

## 执行步骤

1. **阅读相关文档**
   - 查看 docs/页面功能目录.md 了解业务需求
   - 查看 docs/技术架构设计.md 了解数据库设计

2. **分析表需求**
   - 确定表的字段
   - 确定字段类型
   - 确定约束条件
   - 确定索引
   - 确定与其他表的关系

3. **创建 Prisma Schema**

   在 `server/prisma/schema.prisma` 中添加模型定义：

   ```prisma
   model {TableName} {
     // 主键（UUID）
     id        String   @id @default(uuid())

     // 基础字段
     // 根据需求添加

     // 关系字段
     // 根据需求添加外键关系

     // 时间戳
     createdAt DateTime @default(now()) @map("created_at")
     updatedAt DateTime @updatedAt @map("updated_at")

     // 索引
     @@index([字段名])
     @@map("{table_name}")
   }
   ```

4. **常见表设计模板**

   **用户表（users）**:
   ```prisma
   model User {
     id            String    @id @default(uuid())
     email         String    @unique
     passwordHash  String    @map("password_hash")
     username      String    @unique
     avatar        String?
     birthDate     DateTime? @map("birth_date")
     gender        String?
     status        String    @default("active") // active, suspended, deleted
     role          String    @default("user")   // user, admin

     // 关系
     personality   Personality?
     memories      Memory[]

     // 时间戳
     createdAt     DateTime  @default(now()) @map("created_at")
     updatedAt     DateTime  @updatedAt @map("updated_at")

     @@index([email])
     @@index([username])
     @@map("users")
   }
   ```

   **记忆表（memories）**:
   ```prisma
   model Memory {
     id           String   @id @default(uuid())
     userId       String   @map("user_id")
     type         String   // text, voice, image, video, event
     content      String?  @db.Text
     metadata     Json?    // 元数据（地点、人物、标签等）
     emotion      String?  // 情绪标签
     stage        String?  // 人生阶段
     privacyLevel Int      @default(2) @map("privacy_level") // 1:仅自己 2:继承人 3:公开

     // 媒体文件
     mediaUrls    String[] @map("media_urls")

     // 关系
     user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)

     // 时间戳
     createdAt    DateTime @default(now()) @map("created_at")
     updatedAt    DateTime @updatedAt @map("updated_at")

     // 索引
     @@index([userId])
     @@index([type])
     @@index([stage])
     @@index([createdAt])
     @@map("memories")
   }
   ```

   **数字人格表（personalities）**:
   ```prisma
   model Personality {
     id              String   @id @default(uuid())
     userId          String   @unique @map("user_id")

     // 五大人格维度
     openness        Float    @default(0.5)        // 开放性
     conscientiousness Float  @default(0.5)        // 尽责性
     extraversion    Float    @default(0.5)        // 外向性
     agreeableness   Float    @default(0.5)        // 宜人性
     neuroticism     Float    @default(0.5)        // 神经质

     // 自定义维度
     warmth          Float    @default(0.5)        // 温暖度
     rationality     Float    @default(0.5)        // 理性度
     humorousness    Float    @default(0.5)        // 幽默感

     // 行为风格
     behaviorStyle   Json?    @map("behavior_style")

     // 关系设置
     relationship    String   @default("friend")   // friend, recorder, companion
     nickname        String?

     // 版本控制
     version         String   @default("1.0.0")

     // 关系
     user            User     @relation(fields: [userId], references: [id], onDelete: Cascade)

     // 时间戳
     createdAt       DateTime @default(now()) @map("created_at")
     updatedAt       DateTime @updatedAt @map("updated_at")

     @@map("personalities")
   }
   ```

   **继承人表（heirs）**:
   ```prisma
   model Heir {
     id              String   @id @default(uuid())
     userId          String   @map("user_id")      // 已故用户ID
     heirUserId      String   @map("heir_user_id") // 继承人用户ID

     // 权限设置
     permissions     String[] // view_memories, export, etc.
     privacyLevel    Int      @default(2)          // 可访问的隐私等级

     // 验证状态
     verified        Boolean  @default(false)
     verifiedAt      DateTime? @map("verified_at")

     // 访问期限
     accessExpiresAt DateTime? @map("access_expires_at")

     // 关系
     user            User     @relation("UserHeirs", fields: [userId], references: [id], onDelete: Cascade)
     heirUser        User     @relation("HeirOf", fields: [heirUserId], references: [id], onDelete: Cascade)

     // 时间戳
     createdAt       DateTime @default(now()) @map("created_at")
     updatedAt       DateTime @updatedAt @map("updated_at")

     @@unique([userId, heirUserId])
     @@index([userId])
     @@index([heirUserId])
     @@map("heirs")
   }
   ```

5. **字段类型选择指南**

   | 数据类型 | Prisma类型 | PostgreSQL类型 | 说明 |
   |---------|-----------|---------------|------|
   | ID | String @id @default(uuid()) | UUID | 主键 |
   | 短文本 | String | VARCHAR(255) | 标题、名称 |
   | 长文本 | String @db.Text | TEXT | 内容、描述 |
   | 整数 | Int | INTEGER | 数量、状态码 |
   | 浮点数 | Float | DOUBLE PRECISION | 分数、百分比 |
   | 布尔值 | Boolean | BOOLEAN | 是否标志 |
   | 日期时间 | DateTime | TIMESTAMP | 时间戳 |
   | JSON | Json | JSONB | 复杂对象 |
   | 数组 | String[] | TEXT[] | 标签、URL列表 |

6. **索引策略**
   - 主键自动创建索引
   - 外键建议创建索引
   - 经常查询的字段创建索引
   - 联合查询考虑复合索引
   - 避免过度索引（影响写入性能）

7. **生成迁移文件**
   ```bash
   npx prisma migrate dev --name add_{table_name}_table
   ```

8. **生成 Prisma Client**
   ```bash
   npx prisma generate
   ```

## 数据库设计原则

### 命名规范
- 表名：小写+下划线（snake_case）
- 字段名：小写+下划线（snake_case）
- 主键：id
- 外键：{关联表}_id
- 时间戳：created_at, updated_at

### 设计原则
1. **三范式**：消除冗余，保持数据一致性
2. **外键约束**：保证数据完整性
3. **软删除**：重要数据使用 deletedAt 而不是物理删除
4. **时间戳**：所有表都应有 createdAt 和 updatedAt
5. **索引优化**：根据查询模式创建合适的索引
6. **类型选择**：选择合适的数据类型，避免浪费

### 性能考虑
- 避免 SELECT *，只查询需要的字段
- 大表考虑分表策略
- 热数据和冷数据分离
- JSONB 字段适合存储非结构化数据
- 使用连接池

### 安全考虑
- 密码字段必须加密
- 敏感字段考虑加密存储
- 使用参数化查询防止SQL注入
- 实施行级安全策略

## 常见表关系

### 一对一（1:1）
```prisma
model User {
  id          String      @id
  personality Personality?
}

model Personality {
  id     String @id
  userId String @unique
  user   User   @relation(fields: [userId], references: [id])
}
```

### 一对多（1:N）
```prisma
model User {
  id       String   @id
  memories Memory[]
}

model Memory {
  id     String @id
  userId String
  user   User   @relation(fields: [userId], references: [id])
}
```

### 多对多（M:N）
```prisma
model User {
  id        String        @id
  followers UserFollower[] @relation("Following")
  following UserFollower[] @relation("Follower")
}

model UserFollower {
  followerId  String
  followingId String

  follower    User @relation("Follower", fields: [followerId], references: [id])
  following   User @relation("Following", fields: [followingId], references: [id])

  @@id([followerId, followingId])
}
```

## 完成后

1. 检查 schema 语法正确
2. 运行 prisma validate 验证
3. 运行 migrate dev 生成迁移
4. 查看生成的 SQL 文件
5. 输出表结构说明
