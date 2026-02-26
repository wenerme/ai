# 装饰器迁移: ES vs Legacy vs defineEntity

## 三种实体定义方式对比

| 特性 | Legacy Decorators | ES Spec Decorators | `defineEntity` |
|------|-------------------|-------------------|----------------|
| Import 路径 | `@mikro-orm/decorators/legacy` | `@mikro-orm/decorators/es` | `@mikro-orm/core` |
| 需要 `reflect-metadata` | 可选（配合 `ReflectMetadataProvider`） | 不需要 | 不需要 |
| TypeScript 配置 | `experimentalDecorators: true` | 默认即可（TS 5.0+） | 无需装饰器支持 |
| 类型推断 | 手动声明 `type` 或依赖 metadata | 自动从装饰器推断 | **最佳**，自动推断接口 |
| 运行时兼容 | 所有环境 | Node 22.6+（原生支持） | 所有环境 |
| 适用场景 | 现有项目迁移、已有大量 decorator 实体 | 新项目 + 现代环境 | 新项目、无 class 偏好 |

## 1. Legacy Decorators（迁移首选）

### 何时使用

- 现有 v6 项目迁移（最小改动）
- 使用 SWC / esbuild / Babel 等编译器
- 团队习惯 decorator 语法

### Import 变更

```diff
- import { Entity, PrimaryKey, Property, ManyToOne, OneToMany, Unique } from '@mikro-orm/core';
+ import { Entity, PrimaryKey, Property, ManyToOne, OneToMany, Unique } from '@mikro-orm/decorators/legacy';
+ import { BaseEntity, Collection, Cascade, type Opt, type Rel } from '@mikro-orm/core';
```

**核心规则**: 装饰器（`@Entity`, `@Property`, `@ManyToOne` 等）从 `@mikro-orm/decorators/legacy` 导入；类型和工具类（`BaseEntity`, `Collection`, `Opt`, `Rel`, `Cascade`）仍从 `@mikro-orm/core` 导入。

### TypeScript 配置

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": false
  }
}
```

> `emitDecoratorMetadata` 不再需要（除非显式使用 `ReflectMetadataProvider`）。

### Vitest / SWC 配置

使用 `@vitejs/plugin-react-swc` 时必须启用 `tsDecorators`:

```typescript
// vitest.config.ts
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [
    react({
      tsDecorators: true,
    }),
  ],
});
```

不启用会导致 `SyntaxError: Expression expected` 编译错误。

### esbuild 配置

esbuild 默认不支持装饰器元数据。需要关注的设置：

```typescript
// esbuild.config.ts
{
  // 通常无需额外配置，esbuild 默认支持 experimentalDecorators
  // 但需要确认 tsconfig 的 experimentalDecorators: true
}
```

### ReflectMetadataProvider（可选）

如果之前依赖 `reflect-metadata` 自动推断属性类型：

```typescript
import { ReflectMetadataProvider } from '@mikro-orm/decorators/legacy';

export default defineConfig({
  metadataProvider: ReflectMetadataProvider,
});
```

**推荐做法**: 不再使用 `ReflectMetadataProvider`，在 `@Property` 中显式声明 `type`：

```diff
- @Property()  // 依赖 reflect-metadata 推断类型
- name!: string;
+ @Property({ type: 'text' })
+ name!: string;
```

### 完整 Entity 示例

```typescript
import { BaseEntity, Collection, Cascade, type Opt, type Rel } from '@mikro-orm/core';
import {
  Entity, PrimaryKey, Property, ManyToOne, OneToMany, Unique,
} from '@mikro-orm/decorators/legacy';

@Entity({ tableName: 'file_node_meta' })
@Unique({ properties: ['tid', 'parent', 'filename'] })
export class FileNodeMetaEntity extends BaseEntity {
  @PrimaryKey({ type: 'text', onCreate: () => crypto.randomUUID() })
  id!: string & Opt;

  @Property({ type: 'text', nullable: true })
  tid?: string;

  @Property({ type: 'text', nullable: false })
  filename!: string;

  @Property({ type: 'text', nullable: false, default: 'file' })
  kind!: ('file' | 'directory') & Opt;

  @Property({ type: 'integer', nullable: true })
  size?: number;

  @Property({ type: 'json', nullable: true })
  metadata?: Record<string, any>;

  @Property({ type: 'blob', nullable: true })
  content?: Buffer;

  @ManyToOne(() => FileNodeMetaEntity, { nullable: true })
  parent?: Rel<FileNodeMetaEntity>;

  @OneToMany(() => FileNodeMetaEntity, (child) => child.parent, {
    cascade: [Cascade.ALL],
    orphanRemoval: true,
  })
  children = new Collection<FileNodeMetaEntity>(this);

  @Property({ type: 'datetime' })
  mtime!: Date;

  @Property({ type: 'datetime' })
  ctime!: Date;
}
```

### Property `type` 字符串值参考

v7 中推荐使用字符串字面量而非 TypeMapping 对象：

| 类型 | `type` 值 | TypeScript 类型 |
|------|-----------|-----------------|
| 字符串 | `'text'` / `'string'` | `string` |
| 整数 | `'integer'` | `number` |
| 浮点 | `'double'` / `'float'` | `number` |
| 布尔 | `'boolean'` | `boolean` |
| 日期时间 | `'datetime'` | `Date` |
| UUID | `'uuid'` | `string` |
| JSON | `'json'` | `Record<string, any>` |
| 二进制 | `'blob'` | `Buffer` / `Uint8Array` |
| 大文本 | `'text'` | `string` |

## 2. ES Spec Decorators

### 何时使用

- 新项目 + Node.js 22.6+ 原生 decorator 支持
- 不希望依赖 `experimentalDecorators` 编译器选项
- TC39 标准化方向

### Import 路径

```typescript
import { Entity, PrimaryKey, Property } from '@mikro-orm/decorators/es';
```

### TypeScript 配置

```json
{
  "compilerOptions": {
    // 不要设置 experimentalDecorators
    // ES decorator 是 TS 5.0+ 默认行为
  }
}
```

### 关键差异

1. **不支持 `reflect-metadata`**: 必须在每个 `@Property` 中显式声明 `type`
2. **参数装饰器不可用**: ES spec 不支持参数装饰器，某些高级模式不可用
3. **装饰器执行顺序不同**: ES spec 装饰器从外到内执行（legacy 从内到外）

### 示例

```typescript
import { Entity, PrimaryKey, Property } from '@mikro-orm/decorators/es';

@Entity()
class User {
  @PrimaryKey({ type: 'uuid' })
  id!: string;

  @Property({ type: 'text' })
  name!: string;

  @Property({ type: 'datetime', onCreate: () => new Date() })
  createdAt!: Date;
}
```

## 3. `defineEntity`（推荐新项目）

### 何时使用

- 新项目、无历史装饰器代码
- 需要最佳类型推断
- 不希望引入装饰器语法

### 示例

```typescript
import { defineEntity, p } from '@mikro-orm/core';

const UserEntity = defineEntity({
  class: class User {},
  tableName: 'user',
  properties: {
    id: p.uuid().primary(),
    name: p.string(),
    email: p.string().nullable(),
    age: p.integer().nullable(),
    metadata: p.json<Record<string, unknown>>().nullable(),
    createdAt: p.datetime().onCreate(() => new Date()),
    updatedAt: p.datetime().onCreate(() => new Date()).onUpdate(() => new Date()),
  },
});
```

### 关系定义

```typescript
const BookEntity = defineEntity({
  class: class Book {},
  properties: {
    id: p.uuid().primary(),
    title: p.string(),
    author: () => p.manyToOne(UserEntity),
    tags: () => p.manyToMany(TagEntity).owner(),
  },
});
```

### 关键特性

- 属性建造器的布尔方法不再接受 `true` 参数，直接调用即可：

```diff
- name: p.string().nullable(true),
+ name: p.string().nullable(),

- id: p.integer().primary(true).autoincrement(true),
+ id: p.integer().primary().autoincrement(),
```

- `lazy()` 不再隐含 `ref()`：

```diff
- bio: p.text().lazy(),        // v6: 自动包装 ScalarReference
+ bio: p.text().lazy(),        // v7: 普通 lazy 标量
+ bio: p.text().lazy().ref(),  // v7: 需要 ScalarReference 时显式链式调用
```

## 迁移 v6 Decorator → v7 的最小改动清单

1. `pnpm add @mikro-orm/decorators`
2. 装饰器 import 改为 `@mikro-orm/decorators/legacy`
3. 类型/工具类 import 保持 `@mikro-orm/core`
4. 移除对 `reflect-metadata` 的依赖（或显式配置 `ReflectMetadataProvider`）
5. 在所有 `@Property` 中显式声明 `type`
6. 构建工具添加 decorator 支持（SWC: `tsDecorators: true`）
7. 运行 typecheck 验证
