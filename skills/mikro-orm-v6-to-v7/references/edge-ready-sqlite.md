# Edge-Ready SQLite 配置

MikroORM v7 通过 `@mikro-orm/sql` 的 `SqliteDriver` + Kysely dialect 实现了 Edge-Ready 的 SQLite 支持。不再需要 `better-sqlite3` 这类 native 依赖。

## 架构概览

```
MikroORM
  └─ @mikro-orm/sql (SqliteDriver)
       └─ Kysely Dialect (可替换)
            ├─ NodeSqliteDialect      → node:sqlite (Node 22.5+)
            ├─ BunSqliteDialect       → bun:sqlite
            ├─ D1Dialect              → Cloudflare D1
            ├─ SqliteDialect (kysely) → better-sqlite3 / turso-compat
            └─ 自定义 Kysely Dialect
```

## 驱动选择指南

| 运行时 / 平台 | 推荐驱动 | 包依赖 | Native 依赖 |
|---------------|---------|--------|-------------|
| Node.js 22.5+ | `NodeSqliteDialect` | `@mikro-orm/sql`, `kysely` | 无 |
| Bun | `BunSqliteDialect` | `@mikro-orm/sql`, `kysely`, `kysely-bun-sqlite` | 无 |
| Cloudflare Workers / D1 | `D1Dialect` | `@mikro-orm/sql`, `kysely`, `kysely-d1` | 无 |
| Node.js (性能优先) | `@mikro-orm/sqlite` | `@mikro-orm/sqlite` | `better-sqlite3` |
| libSQL / Turso | `@mikro-orm/libsql` | `@mikro-orm/libsql` | 无 |

## node:sqlite 配置

```typescript
import { MikroORM, SqliteDriver, NodeSqliteDialect } from '@mikro-orm/sql';

const orm = await MikroORM.init({
  driver: SqliteDriver,
  entities: [UserEntity, PostEntity],
  dbName: ':memory:',  // 或文件路径
  driverOptions: new NodeSqliteDialect(':memory:'),
});
```

### 注意事项

- `node:sqlite` 要求 Node.js 22.5+
- Blob 数据返回 `Uint8Array` 而非 `Buffer`，处理时需注意转换（见 [known-issues.md](known-issues.md)）
- 需要 `kysely` 作为 peer dependency

## Bun SQLite 配置

```typescript
import { MikroORM, SqliteDriver } from '@mikro-orm/sql';
import { BunSqliteDialect } from 'kysely-bun-sqlite';
import { Database } from 'bun:sqlite';

const orm = await MikroORM.init({
  driver: SqliteDriver,
  entities: [UserEntity, PostEntity],
  dbName: 'my-database.sqlite3',
  driverOptions: new BunSqliteDialect({
    database: new Database('my-database.sqlite3'),
  }),
});
```

### 注意事项

- `bun:sqlite` 和 `kysely-bun-sqlite` 在 Node.js 下不可用，仅 Bun 运行时
- 打包时需标记为 external（esbuild: `external: ['bun:sqlite', 'kysely-bun-sqlite']`）

## Cloudflare D1 配置

```typescript
import { MikroORM, SqliteDriver } from '@mikro-orm/sql';
import { D1Dialect } from 'kysely-d1';

export default {
  async fetch(request: Request, env: Env) {
    const orm = await MikroORM.init({
      driver: SqliteDriver,
      entities: [...],
      dbName: 'd1',  // dbName 在使用 dialect 时不实际使用，但仍为必需
      driverOptions: new D1Dialect({ database: env.DB }),
      implicitTransactions: false,  // D1 不支持显式事务
    });
  },
};
```

### D1 限制

- **无事务支持**: 必须设置 `implicitTransactions: false`，`em.transactional()` 无原子性保证
- **无查询流**: 大结果集必须全量加载到内存
- **有限 ALTER TABLE**: 不支持 `ALTER COLUMN` / `ADD CONSTRAINT`
- 也支持延迟创建 dialect: `driverOptions: () => new D1Dialect({ database: env.DB })`

## 运行时自适应 SQLite Dialect

在同时支持 Node.js 和 Bun 的项目中，可创建工具函数自动选择：

```typescript
import type { Dialect } from 'kysely';

export async function createSqliteDialect(dbName: string): Promise<Dialect> {
  // Bun 运行时
  if (typeof globalThis.Bun !== 'undefined') {
    const { BunSqliteDialect } = await import('kysely-bun-sqlite');
    const { Database } = await import('bun:sqlite');
    return new BunSqliteDialect({
      database: new Database(dbName),
    });
  }

  // Node.js 运行时 (22.5+)
  const { NodeSqliteDialect } = await import('@mikro-orm/sql');
  return new NodeSqliteDialect(dbName);
}
```

### 使用方式

```typescript
import { MikroORM } from '@mikro-orm/core';
import { SqliteDriver } from '@mikro-orm/sql';

const orm = await MikroORM.init({
  driver: SqliteDriver,
  entities: [...],
  dbName: ':memory:',
  driverOptions: await createSqliteDialect(':memory:'),
});
```

### 打包配置

同时支持 Bun 和 Node.js 时，打包工具需处理 Bun 专有模块：

```typescript
// esbuild
{
  external: ['bun:sqlite', 'kysely-bun-sqlite', 'better-sqlite3'],
}

// tsdown (自动处理 node_modules 为 external)
// 通常无需额外配置
```

## libSQL / Turso 配置

### 使用 @mikro-orm/libsql（推荐）

```typescript
import { defineConfig } from '@mikro-orm/libsql';

export default defineConfig({
  dbName: process.env.LIBSQL_URL,
  password: process.env.LIBSQL_AUTH_TOKEN,
});
```

### 使用 Turso embedded database

```typescript
import { MikroORM, SqliteDriver } from '@mikro-orm/sql';
import { SqliteDialect } from 'kysely';
import Database from '@tursodatabase/database/compat';

const orm = await MikroORM.init({
  driver: SqliteDriver,
  entities: [...],
  dbName: 'local.db',
  driverOptions: new SqliteDialect({ database: new Database('local.db') }),
});
```

## driverOptions 结构变更

v7 中 `driverOptions` 不再使用 `connection` 嵌套（这是 knex 的遗留结构）：

```diff
// PostgreSQL 示例
driverOptions: {
-  connection: {
-    ssl: { ca: '...' },
-  },
+  ssl: { ca: '...' },
}
```

对于 SQLite 系驱动，`driverOptions` 直接传入 Kysely dialect 实例：

```typescript
driverOptions: new NodeSqliteDialect(':memory:'),
// 或
driverOptions: new BunSqliteDialect({ database: new Database(':memory:') }),
```

## SQLite Extensions

```typescript
const orm = await MikroORM.init({
  onCreateConnection(connection) {
    connection.loadExtension('/path/to/sqlean');
  },
});
```

## v6 → v7 SQLite 迁移对照

| v6 | v7 | 说明 |
|----|-----|------|
| `@mikro-orm/better-sqlite` | 已移除 | 使用 `@mikro-orm/sqlite` |
| `@mikro-orm/sqlite` (better-sqlite3) | `@mikro-orm/sqlite` (仍为 better-sqlite3) | 包名不变，内部实现调整 |
| 无 node:sqlite 支持 | `SqliteDriver` + `NodeSqliteDialect` | Edge-ready |
| 无 bun:sqlite 支持 | `SqliteDriver` + `BunSqliteDialect` | Edge-ready |
| `@mikro-orm/knex` | `@mikro-orm/sql` | 包重命名 |
| `driverOptions: { connection: {...} }` | `driverOptions: dialect实例` | 结构变更 |
