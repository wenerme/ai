> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Formats - TypeScript SDK

> Formats type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Text response format configuration

## Supported Types

### `models.FormatTextConfig`

```typescript lines theme={null}
const value: models.FormatTextConfig = {
  type: "text",
};
```

### `models.FormatJsonObjectConfig`

```typescript lines theme={null}
const value: models.FormatJsonObjectConfig = {
  type: "json_object",
};
```

### `models.FormatJsonSchemaConfig`

```typescript lines theme={null}
const value: models.FormatJsonSchemaConfig = {
  name: "<value>",
  schema: {},
  type: "json_schema",
};
```
