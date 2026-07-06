> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ChatToolMessageContent - TypeScript SDK

> ChatToolMessageContent type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Tool response content

## Supported Types

### `string`

```typescript lines theme={null}
const value: string = "The weather in San Francisco is 72°F and sunny.";
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
