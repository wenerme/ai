> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Trigger - TypeScript SDK

> Trigger type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Supported Types

### `models.AnthropicInputTokensTrigger`

```typescript lines theme={null}
const value: models.AnthropicInputTokensTrigger = {
  type: "input_tokens",
  value: 100000,
};
```

### `models.AnthropicToolUsesTrigger`

```typescript lines theme={null}
const value: models.AnthropicToolUsesTrigger = {
  type: "tool_uses",
  value: 10,
};
```
