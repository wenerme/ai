> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ChatToolChoice - TypeScript SDK

> ChatToolChoice type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Tool choice configuration

## Supported Types

### `models.ChatToolChoiceNone`

```typescript lines theme={null}
const value: models.ChatToolChoiceNone = "none";
```

### `models.ChatToolChoiceAuto`

```typescript lines theme={null}
const value: models.ChatToolChoiceAuto = "auto";
```

### `models.ChatToolChoiceRequired`

```typescript lines theme={null}
const value: models.ChatToolChoiceRequired = "required";
```

### `models.ChatNamedToolChoice`

```typescript lines theme={null}
const value: models.ChatNamedToolChoice = {
  function: {
    name: "get_weather",
  },
  type: "function",
};
```

### `models.ChatServerToolChoice`

```typescript lines theme={null}
const value: models.ChatServerToolChoice = {
  type: "openrouter:web_search",
};
```
