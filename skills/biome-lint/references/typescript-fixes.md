# TypeScript 类型检查修复详解

## 运行命令

```bash
# 单个包
pnpm tsgo -p tsconfig.json --skipLibCheck --maxNodeModuleJsDepth 0 --noEmit

# 所有包 (使用 just)
pnpm -r exec just typecheck

# 或直接执行
pnpm -r exec sh -c 'pwd; tsgo -p tsconfig.json --skipLibCheck --maxNodeModuleJsDepth 0 --noEmit 2>&1 || true'
```

## tsconfig.json 要求

tsgo 不支持某些 tsc 选项，需要移除：

```json
// 移除 baseUrl
{
  "compilerOptions": {
    // "baseUrl": ".",  // tsgo 不支持
    "rootDir": "./src"
  }
}
```

## TS2322: Type 'X' is not assignable to type 'Y'

```typescript
// 问题: Record<string, unknown> 不能赋值给 Record<string, string>
const headers: Record<string, string> = config.headers; // ❌

// 修复: 使用类型断言或过滤
const headers = config.headers as Record<string, string>; // ✓
// 或
const headers = Object.fromEntries(
  Object.entries(config.headers || {}).filter(([_, v]) => typeof v === 'string')
) as Record<string, string>;
```

## TS2416: Property in type is not assignable to same property in base type

```typescript
// 问题: 子类方法签名与基类不兼容
class MyFS implements IFileSystem {
  // ❌ 签名不匹配
  writeFile(path: string, data: string | Buffer): Promise<void> {}
}

// 修复: 使用基类定义的类型，内部处理转换
class MyFS implements IFileSystem {
  async writeFile(path: string, data: WritableData, options?: WriteFileOptions): Promise<void> {
    // 内部转换处理
    if (data instanceof ReadableStream) {
      data = await this.streamToBuffer(data);
    }
    // ...
  }
}
```

## TS2345: Argument of type 'X | undefined' is not assignable to type 'X'

```typescript
// 问题
function process(s: string) {}
process(maybeString); // ❌ string | undefined

// 修复: 非空断言或默认值
process(maybeString!); // ✓
process(maybeString ?? ''); // ✓
process(maybeString || ''); // ✓
```

## TS7030: Not all code paths return a value

```typescript
// 问题
function getValue(cond: boolean) { // ❌
  if (cond) return 'yes';
}

// 修复: 添加明确的返回
function getValue(cond: boolean) { // ✓
  if (cond) return 'yes';
  return undefined;
}
```

## TS2339: Property 'X' does not exist on type 'Y'

```typescript
// 问题: 访问可能不存在的属性
if (obj.webcrypto) {} // ❌ Crypto 类型没有 webcrypto

// 修复: 类型断言
const nodeCrypto = getNodeCrypto() as
  | (typeof import('node:crypto') & { webcrypto?: Crypto })
  | undefined;
if (nodeCrypto?.webcrypto) {} // ✓

// 问题: Web API 方法未在 TypeScript 中定义
for await (const entry of handle.values()) {} // ❌ values() 不存在

// 修复: 使用 any 断言 (API 存在但类型定义滞后)
for await (const entry of (handle as any).values()) {} // ✓
```

## TS6133/TS6196: 'X' is declared but never used

```typescript
// 问题: 变量/类型声明但未使用
function _unusedHelper() {} // ❌ 仍然报错

// 修复: 导出或删除
export function unusedHelper() {} // ✓
// 或直接删除
```

## TS2352: Conversion may be a mistake

```typescript
// 问题: 类型断言不安全
const crypto = nodeCrypto.webcrypto as Crypto; // ❌

// 修复: 使用 unknown 中转
const crypto = nodeCrypto.webcrypto as unknown as Crypto; // ✓
```

## TS2742: Inferred type cannot be named without reference to internal module

```typescript
// 问题: 返回类型引用内部模块路径
export function withMixin<T>(f: () => T) { // ❌ 无法推断返回类型
  return <TBase>(Base: TBase) => {
    class Mixin extends Base {}
    return Mixin;
  };
}

// 修复: 添加显式返回类型
export function withMixin<T>(
  f: () => T
): <TBase extends Constructor>(Base: TBase) => TBase & Constructor<T> {
  return <TBase extends Constructor>(Base: TBase): TBase & Constructor<T> => {
    class Mixin extends Base {}
    return Mixin as TBase & Constructor<T>;
  };
}
```

## TS4058: Return type has or is using name from external module but cannot be named

```typescript
// 问题: 返回类型使用了未导出的内部类型
export function parse(hash: string) { // ❌
  return PHC.deserialize(hash); // DeserializeResult 未导出
}

// 修复: 导出所需的类型
export namespace PHC {
  export interface DeserializeResult { // ← 添加 export
    id: string;
    // ...
  }
}
```

## TS18048: 'X' is possibly undefined

```typescript
// 问题
data.value.trim(); // ❌ data 可能是 undefined

// 修复: 非空检查或断言
if (data) {
  data.value.trim(); // ✓
}
data?.value?.trim(); // ✓
data!.value.trim(); // ✓ (确定不为空时)
```

## TS2305: Module has no exported member

```typescript
// 问题: 模块没有导出该成员
import { Logger } from '@wener/utils'; // ❌

// 修复: 检查导出并添加
// 在 @wener/utils/index.ts 中添加:
export { Logger } from './logging';
```

## TS2554: Expected X arguments, but got Y

```typescript
// 问题: Zod parse 签名变化
z.string().parse(value); // ❌ tsgo 可能需要更多参数

// 修复: 检查库版本或使用 safeParse
const result = z.string().safeParse(value);
if (result.success) {
  const data = result.data;
}
```

## ES 版本相关问题

### Object.hasOwn (ES2022)

```typescript
// 问题
if (Object.hasOwn(obj, key)) {} // ❌ tsgo 可能不识别

// 修复: 使用 hasOwnProperty
if (Object.prototype.hasOwnProperty.call(obj, key)) {} // ✓
```

### String.replaceAll (ES2021)

```typescript
// 问题
str.replaceAll(' ', ''); // ❌

// 修复: 使用 split/join
str.split(' ').join(''); // ✓
```

### Promise.withResolvers (ES2024)

```typescript
// 问题
const { promise, resolve } = Promise.withResolvers(); // ❌

// 修复: 使用 polyfill 或手动实现
const P = Promise as unknown as {
  new <T>(executor: (...) => void): Promise<T>;
  withResolvers?<T>(): PromiseWithResolvers<T>;
};
if (P.withResolvers) {
  return P.withResolvers<T>();
}
// fallback implementation
```

### ArrayBuffer with maxByteLength (ES2024)

```typescript
// 问题
new ArrayBuffer(0, { maxByteLength: 1024 }); // ❌

// 修复: 类型断言
type ArrayBufferWithMaxLengthConstructor = new (
  byteLength: number,
  options?: { maxByteLength?: number }
) => ArrayBuffer;
new (ArrayBuffer as ArrayBufferWithMaxLengthConstructor)(0, { maxByteLength: 1024 }); // ✓
```

### Error 类 cause 属性

```typescript
// 问题: cause 在旧版本中不存在
class MyError extends Error {
  constructor(msg: string, cause?: Error) {
    super(msg, { cause }); // ❌ 可能不识别
  }
}

// 修复: 手动设置
class MyError extends Error {
  constructor(msg: string, cause?: Error) {
    super(msg);
    (this as any).cause = cause; // ✓
  }
}
```

## 测试文件类型问题

```typescript
// 问题: 测试文件缺少类型定义
describe('test', () => {}); // ❌ Cannot find name 'describe'

// 修复: 在 tsconfig.json 中排除测试文件
{
  "exclude": ["**/*.test.ts", "**/*.spec.ts"]
}

// 或添加类型引用
/// <reference types="vitest/globals" />
```

## 跨包依赖问题

### 循环依赖导致模块找不到

```typescript
// 问题: A 包引用 B 包，B 包又依赖 A 包
import { Entity } from '@wener/server/entity'; // ❌ 模块找不到

// 修复方案:
// 1. 在 tsconfig.json 中排除有问题的文件
{
  "exclude": ["src/problematic-file.ts"]
}

// 2. 将代码移到正确的包中
// 3. 使用 peer dependencies
```
