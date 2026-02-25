# 常见库升级 Breaking Changes

## Zod 4

```typescript
// z.record() 现在需要两个参数
z.record(z.string()); // ❌ Zod 3
z.record(z.string(), z.string()); // ✓ Zod 4

// z.nullable() → z.nullish() (推荐)
z.string().nullable(); // 不推荐
z.string().nullish(); // ✓ 包含 null | undefined
```

## react-resizable-panels v4

```typescript
// 组件重命名
import { PanelGroup, PanelResizeHandle } from 'react-resizable-panels'; // ❌ v3
import { Group, Separator } from 'react-resizable-panels'; // ✓ v4

// order 属性移除
<Panel order={1} /> // ❌ v4 不支持
<Panel id="panel-1" /> // ✓ 使用 id 代替
```

## vitest 4

```typescript
// ArgumentsType 已移除
import { ArgumentsType } from 'vitest'; // ❌

// 修复: 使用 Parameters
type Args = Parameters<typeof myFunction>;
// 或显式定义类型
```

## TypeScript 5.x ArrayBuffer/Buffer 更严格的类型

```typescript
// 问题: Uint8Array<ArrayBufferLike> 不兼容 BufferSource
const buf = resolveData(data);
ArrayBuffers.toBase64(buf); // ❌ 类型不兼容

// 修复: 使用类型断言
ArrayBuffers.toBase64(buf as BufferSource); // ✓

// 问题: Buffer 不兼容 BlobPart
new Blob([buffer]); // ❌

// 修复: 转换为 Uint8Array
new Blob([new Uint8Array(buffer)]); // ✓
```

## @orpc/json-schema

```typescript
// 实验性前缀移除
import { experimental_SmartCoercionPlugin } from '@orpc/json-schema'; // ❌
import { SmartCoercionPlugin } from '@orpc/json-schema'; // ✓
```

## react-router v7 / @remix-run/router

```typescript
// LazyRouteFunction 类型变化
import type { LazyRouteFunction } from '@remix-run/router'; // ❌
import type { LazyRouteFunction, RouteObject } from 'react-router-dom'; // ✓
```
