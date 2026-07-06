> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ChatUserMessageContent - TypeScript SDK

> ChatUserMessageContent type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

User message content

## Supported Types

### `string`

```typescript lines theme={null}
const value: string = "What is the capital of France?";
```

### `models.ChatContentItems[]`

```typescript lines theme={null}
const value: models.ChatContentItems[] = [
  {
    text: "Hello, world!",
    type: "text",
  },
];
```
