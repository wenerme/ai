> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# CompletionCreateParamsResponseFormatUnion - TypeScript SDK

> CompletionCreateParamsResponseFormatUnion method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Supported Types

### `models.CompletionCreateParamsResponseFormatText`

```typescript lines theme={null}
const value: models.CompletionCreateParamsResponseFormatText = {
  type: "text",
};
```

### `models.CompletionCreateParamsResponseFormatJSONObject`

```typescript lines theme={null}
const value: models.CompletionCreateParamsResponseFormatJSONObject = {
  type: "json_object",
};
```

### `models.ResponseFormatJSONSchema`

```typescript lines theme={null}
const value: models.ResponseFormatJSONSchema = {
  type: "json_schema",
  jsonSchema: {
    name: "<value>",
  },
};
```

### `models.ResponseFormatTextGrammar`

```typescript lines theme={null}
const value: models.ResponseFormatTextGrammar = {
  type: "grammar",
  grammar: "<value>",
};
```

### `models.CompletionCreateParamsResponseFormatPython`

```typescript lines theme={null}
const value: models.CompletionCreateParamsResponseFormatPython = {
  type: "python",
};
```
