# 已知问题与解决方案

## 1. Blob 数据 `TypedArray.prototype.join` 错误

### 症状

```
DriverException: Method %TypedArray%.prototype.join called on incompatible receiver [object Object]
```

### 原因

`node:sqlite` 和部分 SQLite 驱动返回 blob 数据为 `Uint8Array`。MikroORM 内部的 `clone()` 函数（用于实体快照）会将 `Uint8Array` 转为普通对象，丢失原型链。当后续 `SqlitePlatform.escape()` 尝试处理这个"伪 Uint8Array"时，调用 `TypedArray.prototype.join` 失败。

### 触发场景

- `em.create()` 包含 blob 数据
- 复制包含 blob 字段的实体（`_copyNode` 等操作）
- 从数据库加载的 blob 数据（`Uint8Array`）直接传入新实体的 `em.create()`

### 修复

在将 blob 数据传给 `em.create()` / `em.assign()` 前，显式转换为 `Buffer`：

```typescript
// 从数据库读取的 blob 是 Uint8Array
const existingEntity = await em.findOneOrFail(MyEntity, id);

// ❌ 直接传递 Uint8Array 会导致 clone() 出错
const newEntity = em.create(MyEntity, {
  content: existingEntity.content,  // Uint8Array → clone 时出错
});

// ✅ 转换为 Buffer
const newEntity = em.create(MyEntity, {
  content: existingEntity.content ? Buffer.from(existingEntity.content) : undefined,
});
```

### 读取 Blob 数据时的类型处理

```typescript
// node:sqlite 返回 Uint8Array，better-sqlite3 返回 Buffer
const data = entity.content;

// ✅ 安全的字符串转换
const buf = Buffer.isBuffer(data) ? data : Buffer.from(data);
const text = buf.toString('utf-8');

// ❌ Uint8Array 没有 toString('utf-8') 方法
const text = data.toString('utf-8');  // 输出 "78,101,119,..."
```

## 2. Entity ID `Value for X.id is required` 错误

### 症状

```
ValidationError: Value for FileNodeMetaEntity.id is required, 'undefined' found
```

### 原因

v7 中 `processOnCreateHooksEarly` 默认启用，`onCreate` 钩子在 `em.create()` 中立即执行。但如果实体没有配置 ID 生成策略（如从 v6 的基类继承 UUID 生成），则在 `em.create()` 时 ID 为 `undefined`。

### 修复

在 `@PrimaryKey` 中显式定义 `onCreate`：

```typescript
// ✅ 应用层面生成 UUID
@PrimaryKey({ type: 'uuid', onCreate: () => crypto.randomUUID() })
id!: string & Opt;

// ✅ 也可用于 text 类型 PK
@PrimaryKey({ type: 'text', onCreate: () => crypto.randomUUID() })
id!: string & Opt;
```

**注意**: 不要使用 `defaultRaw` 在 SQLite 中生成 UUID（如 `hex(randomblob(16))`），MikroORM schema generator 可能无法正确解析。

## 3. Decorator SyntaxError（SWC / Vite / Vitest）

### 症状

```
SyntaxError: Expression expected
// 指向 @ 装饰器语法位置
```

### 原因

构建工具未配置支持 TypeScript legacy decorators。

### 修复

#### Vitest + @vitejs/plugin-react-swc

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

#### Vite

```typescript
// vite.config.ts
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [
    react({
      tsDecorators: true,
    }),
  ],
});
```

#### tsconfig.json

```json
{
  "compilerOptions": {
    "experimentalDecorators": true
  }
}
```

## 4. `Cannot find module '@mikro-orm/knex'`

### 修复

```diff
- import { ... } from '@mikro-orm/knex';
+ import { ... } from '@mikro-orm/sql';
```

## 5. `persistAndFlush is not a function`

### 修复

```diff
- await em.persistAndFlush(entity);
+ await em.persist(entity).flush();

- await em.removeAndFlush(entity);
+ await em.remove(entity).flush();
```

## 6. `forceUtcTimezone` 导致现有数据时间错误

### 症状

升级后，从数据库读取的时间戳偏移了本地时区差值。

### 原因

v7 默认启用 `forceUtcTimezone: true`。如果现有数据以本地时区存储，会被错误解读为 UTC。

### 修复

```typescript
// 保持与现有数据一致
MikroORM.init({
  forceUtcTimezone: false,  // 保持 v6 行为
});

// 或迁移数据到 UTC 后保持默认值
```

## 7. Schema Diff 出现意外变更

### 常见原因

- `forceUtcTimezone` 默认值变更 → 日期列的默认表达式可能变化
- `prefixMode` 变更 → 嵌入属性列名变化
- SQLite version 日期存储从字符串改为时间戳
- FK 规则不再从 `cascade` 推断 → 外键约束可能变化
- 数组属性默认为 JSON（在对象嵌入中）

### 处理方式

```bash
# 先查看 diff
npx mikro-orm schema:update --dump

# 仔细审查每个变更，确认是否预期
# 不要盲目应用 diff
```

## 8. `@CreateRequestContext` 报错

### 症状

```
TypeError: @CreateRequestContext requires async function
```

### 原因

v7 要求被装饰的函数必须是 `async`。

### 修复

```diff
- @CreateRequestContext()
- someMethod() { ... }
+ @CreateRequestContext()
+ async someMethod() { ... }
```

## 9. 自动变更检测失效

### 症状

修改实体标量属性后 `em.flush()` 不产生 UPDATE 语句。

### 原因

v7 移除了标量属性的自动变更检测，需要显式调用 `em.persist()`。

### 修复

```diff
const user = await em.findOneOrFail(User, id);
user.name = 'New Name';
+ em.persist(user);
await em.flush();
```

## 10. EntityManager 状态泄漏（测试场景）

### 症状

测试间产生数据污染，后续测试意外读取到前一个测试的数据。

### 修复

每个测试使用 `em.fork()` 获取隔离的 EntityManager：

```typescript
beforeEach(async () => {
  const { em: baseEm } = await loadTestDatabase();

  fs = createDatabaseFileSystem({
    getEntityManager: () => baseEm.fork(),  // 每次操作获取独立 EM
  });
});
```

## 11. 打包时 `bun:sqlite` / `node:sqlite` 报错

### 症状

```
Could not resolve "bun:sqlite"
// 或
Could not resolve "node:sqlite"
```

### 原因

打包工具尝试解析运行时专有模块。

### 修复

```typescript
// esbuild
{
  external: ['bun:sqlite', 'kysely-bun-sqlite', 'better-sqlite3', 'node:sqlite'],
}

// tsdown: 通常自动处理 node_modules 为 external
```

## 12. `globby` / Brace Expansion 不可用

### 症状

```
entities: ['src/{entities,modules}/*.ts']  // 不再生效
```

### 原因

v7 使用原生 Node.js glob，不支持 brace expansion。

### 修复

```typescript
// 方式 1: 安装 tinyglobby（会被自动检测使用）
// pnpm add tinyglobby

// 方式 2: 手动展开
import { glob } from 'tinyglobby';
entities: await glob(['src/{entities,modules}/*.ts']),
```

## 13. `dataloader` 缺失

### 症状

```
Cannot find module 'dataloader'
```

### 原因

`dataloader` 改为可选 peer dependency。

### 修复

```bash
pnpm add dataloader
```

## 14. Typecheck 常见错误汇总

| 错误信息 | 修复 |
|---------|------|
| `Property 'persistAndFlush' does not exist` | `em.persist(entity).flush()` |
| `Property 'removeAndFlush' does not exist` | `em.remove(entity).flush()` |
| `Property 'getKnex' does not exist` | `em.getKysely()` |
| `Property 'createSchema' does not exist` | `orm.schema.create()` |
| `Property 'getSchemaGenerator' does not exist` | `orm.schema` |
| `Argument of type 'string' is not assignable` (entity name) | 改为类引用 |
| `Type 'RawQueryFragment' is not assignable to type 'number'` | `raw<number>(...)` |
| `Property 'loadFile' does not exist on type 'Connection'` | `connection.executeDump(content)` |
| `Cannot find name 'ArrayCollection'` | 使用 `Collection` |
| `Module '"@mikro-orm/core"' has no exported member 'Entity'` | 从 `@mikro-orm/decorators/legacy` 导入 |
