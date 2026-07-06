> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ResponseFormat - TypeScript SDK

> ResponseFormat type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Response format configuration

## Supported Types

### `models.ChatFormatGrammarConfig`

```typescript lines theme={null}
const value: models.ChatFormatGrammarConfig = {
  grammar: "root ::= \"yes\" | \"no\"",
  type: "grammar",
};
```

### `models.FormatJsonObjectConfig`

```typescript lines theme={null}
const value: models.FormatJsonObjectConfig = {
  type: "json_object",
};
```

### `models.ChatFormatJsonSchemaConfig`

```typescript lines theme={null}
const value: models.ChatFormatJsonSchemaConfig = {
  jsonSchema: {
    name: "math_response",
  },
  type: "json_schema",
};
```

### `models.ChatFormatPythonConfig`

```typescript lines theme={null}
const value: models.ChatFormatPythonConfig = {
  type: "python",
};
```

### `models.ChatFormatTextConfig`

```typescript lines theme={null}
const value: models.ChatFormatTextConfig = {
  type: "text",
};
```
