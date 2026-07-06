> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Action - TypeScript SDK

> Action type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Supported Types

### `models.OutputWebSearchCallItemActionSearch`

```typescript lines theme={null}
const value: models.OutputWebSearchCallItemActionSearch = {
  query: "<value>",
  type: "search",
};
```

### `models.ActionOpenPage`

```typescript lines theme={null}
const value: models.ActionOpenPage = {
  type: "open_page",
};
```

### `models.ActionFindInPage`

```typescript lines theme={null}
const value: models.ActionFindInPage = {
  pattern: "<value>",
  type: "find_in_page",
  url: "https://qualified-king.org",
};
```
