> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# InputUnion - TypeScript SDK

> InputUnion type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Text, token, or multimodal input(s) to embed

## Supported Types

### `string`

```typescript lines theme={null}
const value: string = "The quick brown fox jumps over the lazy dog";
```

### `string[]`

```typescript lines theme={null}
const value: string[] = [
  "<value 1>",
  "<value 2>",
];
```

### `number[]`

```typescript lines theme={null}
const value: number[] = [
  3390.48,
  1336.21,
  9437.99,
];
```

### `number[][]`

```typescript lines theme={null}
const value: number[][] = [
  [
    6206.15,
  ],
  [
    8419.72,
    5863.71,
  ],
  [
    2540.22,
  ],
];
```

### `operations.Input[]`

```typescript lines theme={null}
const value: operations.Input[] = [
  {
    content: [],
  },
];
```
