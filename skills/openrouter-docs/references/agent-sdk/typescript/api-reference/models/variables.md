> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Variables - TypeScript SDK

> Variables type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Supported Types

### `string`

```typescript lines theme={null}
const value: string = "<value>";
```

### `models.InputText`

```typescript lines theme={null}
const value: models.InputText = {
  text: "Hello, how can I help you?",
  type: "input_text",
};
```

### `models.InputImage`

```typescript lines theme={null}
const value: models.InputImage = {
  detail: "auto",
  type: "input_image",
};
```

### `models.InputFile`

```typescript lines theme={null}
const value: models.InputFile = {
  type: "input_file",
};
```
