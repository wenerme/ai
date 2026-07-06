> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ChatMessages - TypeScript SDK

> ChatMessages type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Chat completion message with role-based discrimination

## Supported Types

### `models.ChatAssistantMessage`

```typescript lines theme={null}
const value: models.ChatAssistantMessage = {
  role: "assistant",
};
```

### `models.ChatDeveloperMessage`

```typescript lines theme={null}
const value: models.ChatDeveloperMessage = {
  content: "What is the capital of France?",
  role: "developer",
};
```

### `models.ChatSystemMessage`

```typescript lines theme={null}
const value: models.ChatSystemMessage = {
  content: "What is the capital of France?",
  role: "system",
};
```

### `models.ChatToolMessage`

```typescript lines theme={null}
const value: models.ChatToolMessage = {
  content: "What is the capital of France?",
  role: "tool",
  toolCallId: "call_abc123",
};
```

### `models.ChatUserMessage`

```typescript lines theme={null}
const value: models.ChatUserMessage = {
  content: "What is the capital of France?",
  role: "user",
};
```
