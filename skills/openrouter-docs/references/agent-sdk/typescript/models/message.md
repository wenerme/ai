> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Message - TypeScript SDK

> Message method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Supported Types

### `models.SystemMessage`

```typescript lines theme={null}
const value: models.SystemMessage = {
  role: "system",
  content: [],
};
```

### `models.UserMessage`

```typescript lines theme={null}
const value: models.UserMessage = {
  role: "user",
  content: "<value>",
};
```

### `models.MessageDeveloper`

```typescript lines theme={null}
const value: models.MessageDeveloper = {
  role: "developer",
  content: [],
};
```

### `models.AssistantMessage`

```typescript lines theme={null}
const value: models.AssistantMessage = {
  role: "assistant",
};
```

### `models.ToolResponseMessage`

```typescript lines theme={null}
const value: models.ToolResponseMessage = {
  role: "tool",
  content: [],
  toolCallId: "<id>",
};
```
