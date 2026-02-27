# 完整 API 变更对照表

## 包替换

| v6 包 | v7 包 | 说明 |
|-------|-------|------|
| `@mikro-orm/knex` | `@mikro-orm/sql` | 重命名 |
| `@mikro-orm/better-sqlite` | 移除 | 使用 `@mikro-orm/sqlite` 或 `@mikro-orm/sql` |
| — | `@mikro-orm/decorators` | 新包，装饰器拆分 |
| — | `@mikro-orm/knex-compat` | 兼容层（可选） |

## EntityManager 方法

```diff
- em.persistAndFlush(entity)
+ em.persist(entity).flush()

- em.removeAndFlush(entity)
+ em.remove(entity).flush()

- em.nativeInsert(Entity, data)
+ em.insert(Entity, data)
# 注意: nativeUpdate / nativeDelete 方法名不变

- em.getKnex()
+ em.getKysely()

- em.find('User', { ... })
+ em.find(User, { ... })

- em.addFilter('name', cond, Entity)
+ em.addFilter({ name: 'name', cond, entity: Entity })

- em.findByCursor(User, { email: '...' }, { first: 3 })
+ em.findByCursor(User, { where: { email: '...' }, first: 3 })
```

## MikroORM 初始化

```diff
- const orm = MikroORM.initSync({ ... })
+ const orm = new MikroORM({ ... })

- const orm = await MikroORM.init()           // 无参
+ const orm = await MikroORM.init(config)     // 必须传参
```

- `connect` 选项移除，连接始终懒初始化

## ORM Getters / Schema / Migrator / Seeder

| v6 | v7 |
|----|----|
| `orm.getSchemaGenerator()` | `orm.schema` |
| `orm.getMigrator()` | `orm.migrator` |
| `orm.getSeeder()` | `orm.seeder` |
| `orm.getEntityGenerator()` | `orm.entityGenerator` |
| `orm.schema.createSchema()` | `orm.schema.create()` |
| `orm.schema.updateSchema()` | `orm.schema.update()` |
| `orm.schema.dropSchema()` | `orm.schema.drop()` |
| `orm.schema.clearDatabase()` | `orm.schema.clear()` |
| `orm.schema.refreshDatabase()` | `orm.schema.refresh()` |
| `orm.seeder.createSeeder()` | `orm.seeder.create()` |
| `orm.migrator.createMigration()` | `orm.migrator.create()` |
| `orm.migrator.createInitialMigration()` | `orm.migrator.createInitial()` |
| `orm.migrator.getExecutedMigration()` | `orm.migrator.getExecuted()` |
| `orm.migrator.getPendingMigration()` | `orm.migrator.getPending()` |
| `orm.migrator.checkMigrationNeeded()` | `orm.migrator.checkSchema()` |

## QueryBuilder

```diff
# 不再可直接 await
- const result = await qb;
+ const result = await qb.execute();
+ const result = await qb.getResult();

# qb.as() 签名变更
- qb.as('User.fullName')
+ qb.as(User, 'fullName')

# 顶层 $in 不再允许
- qb.where({ $in: [1, 2] })
+ qb.where({ id: { $in: [1, 2] } })

# 混合 orderBy 不再允许
- em.findAll(User, { orderBy: { email: 'asc', [raw('...')]: 'asc' } })
+ em.findAll(User, { orderBy: [{ email: 'asc' }, { [raw('...')]: 'asc' }] })

# raw() 返回 RawQueryFragment（非 any）
- author.age = raw(`age + 1`)
+ author.age = raw<number>(`age + 1`)
# em.create / em.assign 中无需显式类型

# raw 片段别名自动引用
- raw('...').as('"alias"')
+ raw('...').as('alias')
```

## knex → kysely 迁移

```diff
- em.getKnex()
+ em.getKysely()

- qb.getKnexQuery()  # 完全移除，无直接替代
```

依赖 Knex 内部 API（如 `knex.client.acquireConnection()`）的代码需要重写：
- 简单 raw query：使用 `em.execute('SQL')` 或 QueryBuilder
- 临时兼容：安装 `@mikro-orm/knex-compat` 包

## 字符串引用 → 类引用

```diff
- em.find('User')
+ em.find(User)

- @ManyToOne('User')
+ @ManyToOne(() => User)

- @ManyToMany({ entity: 'Tag' })
+ @ManyToMany({ entity: () => Tag })
```

## Formula / Index / Check 回调签名

参数顺序调整：**columns 在前，table 在后**。使用 `quote` 辅助函数：

```diff
# Formula
- import { Entity, Formula } from '@mikro-orm/core';
+ import { Entity, Formula, quote } from '@mikro-orm/core';

- @Formula(alias => `${alias}.price * 1.19`)
+ @Formula(cols => quote`${cols.price} * 1.19`)

# Index
- expression: (table, columns, name) => `create index ${name} on ${table} (${columns.email})`
+ expression: (columns, table, name) => quote`create index ${name} on ${table} (${columns.email})`

# Check
- check: columns => `${columns.price} > 0`
+ check: (columns, table) => quote`${columns.price} > 0`

# Generated Column
- generated: columns => `${columns.firstName} || ' ' || ${columns.lastName}`
+ generated: (columns, table) => quote`${columns.firstName} || ' ' || ${columns.lastName}`
```

## 装饰器 Import 路径

```diff
# Legacy 装饰器
- import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
- import { Entity, PrimaryKey, Property } from '@mikro-orm/sqlite';
+ import { Entity, PrimaryKey, Property } from '@mikro-orm/decorators/legacy';

# ReflectMetadataProvider
- import { ReflectMetadataProvider } from '@mikro-orm/core';
+ import { ReflectMetadataProvider } from '@mikro-orm/decorators/legacy';

# 平台类
- import { BaseSqlitePlatform } from '@mikro-orm/sql';
+ import { SqlitePlatform } from '@mikro-orm/sql';
```

## Connection / Migration 类型

```diff
# 文件加载
- await orm.driver.getConnection().loadFile('schema.sql')
+ import { readFile } from 'node:fs/promises';
+ const buf = await readFile('schema.sql');
+ await orm.driver.getConnection().executeDump(buf.toString());

# UmzugMigration 类型
- import type { UmzugMigration } from '@mikro-orm/core';
+ import type { MigrationInfo } from '@mikro-orm/core';

# AbstractSchemaGenerator
- import { AbstractSchemaGenerator } from '@mikro-orm/core';
+ import { AbstractSchemaGenerator } from '@mikro-orm/core/schema';

# DataloaderUtils
- import { DataloaderUtils } from '@mikro-orm/core';
+ import { DataloaderUtils } from '@mikro-orm/core/dataloader';

# ArrayCollection
- import { ArrayCollection } from '@mikro-orm/core';
+ import { Collection } from '@mikro-orm/core';  // 已合并
```

## Hidden 类型品牌

```diff
@Entity()
class User {
+  [HiddenProps]?: 'secretData' | 'hiddenDate';

   @Property({ hidden: true })
   password!: Hidden<string>;  // 原始类型仍可用

   @Property({ type: JsonType, hidden: true })
-  secretData!: Hidden<Record<string, unknown>>;
+  secretData!: Record<string, unknown>;  // 对象类型改用 HiddenProps

   @Property({ hidden: true })
-  hiddenDate!: Hidden<Date>;
+  hiddenDate!: Date;  // 对象类型改用 HiddenProps
}
```

## em.create / em.assign 更严格的类型检查

```typescript
// v6: 自定义 DTO 类型静默忽略拼写错误
type CreateUserDto = { firstName: string; lastNme?: string }; // typo
em.create(User, dto); // 无错误

// v7: TypeScript 捕获拼写错误
em.create(User, dto); // TS 报错：lastNme 不存在于 User 上

// Dictionary / Record<string, any> 仍可绕过
em.create(User, dto as Record<string, any>); // 无检查
```

## CLI 变更

```diff
# TS 加载器
- npm install ts-node
+ npm install @swc-node/register  # 或 tsx / jiti / tsimp

# 配置选项
- tsNode: true
+ preferTs: true

# 环境变量
- MIKRO_ORM_CLI_USE_TS_NODE
+ MIKRO_ORM_CLI_PREFER_TS

# ESM CLI 脚本
- npx mikro-orm-esm migration:create
+ npx mikro-orm migration:create  # 统一为标准 CLI

# --config 参数
- npx mikro-orm --config path/to/config.ts
+ MIKRO_ORM_CLI_CONFIG=path/to/config.ts npx mikro-orm
```

## MongoDB 特有变更

```diff
# MongoConnection 方法签名
- connection.find(entityName, where, orderBy, limit, offset, fields, ctx, loggerContext)
+ connection.find(entityName, where, { orderBy, limit, offset, fields, ctx, loggerContext })

- connection.countDocuments(entityName, where, ctx)
+ connection.countDocuments(entityName, where, { ctx })
```

## 配置选项变更

| 移除的选项 | 替代 |
|-----------|------|
| `connect` | 连接始终懒初始化 |
| `validate` | 始终启用 |
| `strict` | 始终启用 |
| `hashAlgorithm` | 固定为 FNV-1a 64-bit |
| `trackChanges` | 标量属性需显式 `em.persist()` |
| `tsNode` | `preferTs` |
| `disableDynamicFileAccess` | 移除 |
| `requireEntitiesArray` | 移除 |
| `alwaysAnalyseProperties` | 移除 |
| `checkDuplicateEntities` | 移除 |

## 外键规则推断变更

```diff
# v6: 从 cascade 推断
@ManyToOne({ cascade: [Cascade.REMOVE] })  // 隐含 deleteRule: 'cascade'

# v7: 必须显式设置（或配置全局默认）
@ManyToOne({ deleteRule: 'cascade', updateRule: 'cascade' })

# 或全局配置
MikroORM.init({
  schemaGenerator: {
    defaultDeleteRule: 'cascade',
    defaultUpdateRule: 'cascade',
  },
});
```

## 类型重命名

| v6 | v7 |
|----|----|
| `MikroORMOptions` | `Options` + `RequiredOptions` |
| `UmzugMigration` | `MigrationInfo` |
| `ArrayCollection` | `Collection`（已合并） |

## 其他移除

- `.env` 自动加载已移除 — 需手动调用 `dotenv` 或使用运行时的 env 支持
- `dataloader` 变为可选 peer dependency — 需要时手动安装

## SQLite 特定变更

- Version 属性的 `Date` 类型存储从日期字符串改为毫秒时间戳
- `BaseSqlitePlatform` → `SqlitePlatform`
- `LibSqlPlatform` 移除，使用 `SqlitePlatform`
- `quoteVersionValue` 方法 → `convertVersionValue`
