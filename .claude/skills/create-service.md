---
skill: create-service
description: 创建NestJS后端服务模块
args: [service_name, description]
---

# 创建后端服务

根据生命链项目的后端架构，创建标准的 NestJS 服务模块。

## 参数说明

- `service_name`: 服务名称（例如：user, memory, chat）
- `description`: 服务描述

## 执行步骤

1. **阅读项目规范**
   - 查看 CLAUDE.md 中的开发规范
   - 查看 docs/技术架构设计.md 中的服务层设计

2. **创建服务目录结构**
   ```
   server/services/{service_name}/
   ├── src/
   │   ├── controllers/           # 控制器
   │   ├── services/              # 业务逻辑
   │   ├── repositories/          # 数据访问层
   │   ├── entities/              # 实体模型
   │   ├── dto/                   # 数据传输对象
   │   │   ├── create-{name}.dto.ts
   │   │   ├── update-{name}.dto.ts
   │   │   └── {name}-response.dto.ts
   │   ├── interfaces/            # 接口定义
   │   ├── guards/                # 守卫（权限）
   │   ├── decorators/            # 自定义装饰器
   │   ├── filters/               # 异常过滤器
   │   ├── pipes/                 # 管道（验证）
   │   ├── {service_name}.module.ts
   │   └── main.ts
   ├── test/                      # 测试文件
   │   ├── unit/
   │   └── integration/
   ├── package.json
   ├── tsconfig.json
   ├── nest-cli.json
   └── README.md
   ```

3. **创建核心文件**

   **Controller**:
   ```typescript
   @Controller('{service_name}')
   @ApiTags('{service_name}')
   export class {ServiceName}Controller {
     constructor(private readonly service: {ServiceName}Service) {}

     @Get()
     async findAll(): Promise<{Name}ResponseDto[]> {
       return this.service.findAll();
     }

     @Get(':id')
     async findOne(@Param('id') id: string): Promise<{Name}ResponseDto> {
       return this.service.findOne(id);
     }

     @Post()
     async create(@Body() dto: Create{Name}Dto): Promise<{Name}ResponseDto> {
       return this.service.create(dto);
     }

     @Patch(':id')
     async update(
       @Param('id') id: string,
       @Body() dto: Update{Name}Dto
     ): Promise<{Name}ResponseDto> {
       return this.service.update(id, dto);
     }

     @Delete(':id')
     async remove(@Param('id') id: string): Promise<void> {
       return this.service.remove(id);
     }
   }
   ```

   **Service**:
   ```typescript
   @Injectable()
   export class {ServiceName}Service {
     constructor(
       private readonly repository: {ServiceName}Repository,
       private readonly logger: Logger
     ) {}

     async findAll(): Promise<{Name}[]> {
       // 实现逻辑
     }

     async findOne(id: string): Promise<{Name}> {
       // 实现逻辑
     }

     async create(dto: Create{Name}Dto): Promise<{Name}> {
       // 实现逻辑
     }

     async update(id: string, dto: Update{Name}Dto): Promise<{Name}> {
       // 实现逻辑
     }

     async remove(id: string): Promise<void> {
       // 实现逻辑
     }
   }
   ```

   **Repository**:
   ```typescript
   @Injectable()
   export class {ServiceName}Repository {
     constructor(private readonly prisma: PrismaService) {}

     async findAll(): Promise<{Name}[]> {
       return this.prisma.{name}.findMany();
     }

     async findById(id: string): Promise<{Name} | null> {
       return this.prisma.{name}.findUnique({ where: { id } });
     }

     async create(data: Create{Name}Dto): Promise<{Name}> {
       return this.prisma.{name}.create({ data });
     }

     async update(id: string, data: Update{Name}Dto): Promise<{Name}> {
       return this.prisma.{name}.update({ where: { id }, data });
     }

     async delete(id: string): Promise<void> {
       await this.prisma.{name}.delete({ where: { id } });
     }
   }
   ```

4. **创建 DTO 文件**
   - CreateDto: 创建所需字段
   - UpdateDto: 更新所需字段（部分可选）
   - ResponseDto: 返回数据结构

5. **创建测试文件**
   - 单元测试
   - 集成测试

6. **更新文档**
   - 在服务的 README.md 中添加说明
   - 使用 Swagger 装饰器添加 API 文档

## 注意事项

- 遵循 NestJS 最佳实践
- 使用 TypeScript 严格模式
- 添加完整的类型定义
- 使用 class-validator 进行参数验证
- 添加适当的错误处理
- 使用 Swagger 装饰器生成 API 文档
- 编写单元测试

## 完成后

1. 检查代码符合规范
2. 运行 linter 和 formatter
3. 运行测试确保通过
4. 输出创建的文件列表
