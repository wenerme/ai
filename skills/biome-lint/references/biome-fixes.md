# Biome Lint 修复详解

## noImplicitAnyLet

```typescript
// 修复前
let result;
let client;

// 修复后 - 从使用推断类型
let result: sql.IResult<T>;
let client: Client;
```

## noUnusedVariables（类型/接口）

```typescript
// 修复前
interface UnusedInterface { }
type UnusedType = string;

// 修复后
interface _UnusedInterface { }
type _UnusedType = string;
```

## noUnusedFunctionParameters

```typescript
// 修复前
function foo({ used, unused }) { return used; }

// 修复后
function foo({ used, unused: _unused }) { return used; }
```

## noEmptyPattern

```typescript
// 修复前
test('name', async ({}) => { });

// 修复后
test('name', async (_ctx) => { });
```

## noUnreachable

```typescript
// 修复前
beforeAll(() => {
  return;
  setupCode(); // 不可达代码
});

// 修复后
beforeAll(() => {
  return;
  /* 已禁用
  setupCode();
  */
});
```

## noInvalidUseBeforeDeclaration

```typescript
// 修复前
@Module({ imports: [MyModule.Entities] })
export class MyModule {
  static Entities = [Entity];
}

// 修复后
const MyModuleEntities = [Entity];
@Module({ imports: [MyModuleEntities] })
export class MyModule {
  static Entities = MyModuleEntities;
}
```

## biome-ignore 注释

当故意的代码触发错误时：

```typescript
// biome-ignore lint/suspicious/noSelfCompare: 故意的 NaN 检查
return x !== x;

// biome-ignore lint/correctness/noConstructorReturn: 故意的代理模式
return new Proxy();

// biome-ignore lint/suspicious/noThenProperty: 故意的 thenable 实现
then: () => { }
```

## 包级别规则覆盖

对于有大量 A11y 警告的 React 包，创建本地 `biome.json`：

```json
{
  "extends": ["../../biome.json"],
  "linter": {
    "rules": {
      "a11y": {
        "useButtonType": "warn",
        "useKeyWithClickEvents": "warn"
      }
    }
  }
}
```

对于有特殊 hook 模式的包：

```json
{
  "extends": ["../../biome.json"],
  "linter": {
    "rules": {
      "correctness": {
        "useHookAtTopLevel": "warn"
      }
    }
  }
}
```
