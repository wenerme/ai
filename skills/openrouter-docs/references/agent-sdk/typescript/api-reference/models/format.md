> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Format - TypeScript SDK

> Format type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Supported Types

### `models.FormatText`

```typescript lines theme={null}
const value: models.FormatText = {
  type: "text",
};
```

### `models.FormatGrammar`

```typescript lines theme={null}
const value: models.FormatGrammar = {
  definition: "<value>",
  syntax: "lark",
  type: "grammar",
};
```
