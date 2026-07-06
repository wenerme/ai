> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# FiltersUnion - TypeScript SDK

> FiltersUnion type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Supported Types

### `models.Filters`

```typescript lines theme={null}
const value: models.Filters = {
  key: "<key>",
  type: "eq",
  value: [],
};
```

### `models.CompoundFilter`

```typescript lines theme={null}
const value: models.CompoundFilter = {
  filters: [
    {
      "key": "author",
      "type": "eq",
      "value": "Alice",
    },
  ],
  type: "and",
};
```

### `any`

```typescript lines theme={null}
const value: any = "<value>";
```
