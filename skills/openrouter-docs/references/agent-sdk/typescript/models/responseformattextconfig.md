> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ResponseFormatTextConfig - TypeScript SDK

> ResponseFormatTextConfig method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Text response format configuration

## Supported Types

### `models.ResponsesFormatText`

```typescript lines theme={null}
const value: models.ResponsesFormatText = {
  type: "text",
};
```

### `models.ResponsesFormatJSONObject`

```typescript lines theme={null}
const value: models.ResponsesFormatJSONObject = {
  type: "json_object",
};
```

### `models.ResponsesFormatTextJSONSchemaConfig`

```typescript lines theme={null}
const value: models.ResponsesFormatTextJSONSchemaConfig = {
  type: "json_schema",
  name: "<value>",
  schema: {
    "key": "<value>",
    "key1": "<value>",
  },
};
```
