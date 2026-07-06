> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ChatSystemMessageContent - TypeScript SDK

> ChatSystemMessageContent type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

System message content

## Supported Types

### `string`

```typescript lines theme={null}
const value: string = "You are a helpful assistant.";
```

### `models.ChatContentText[]`

```typescript lines theme={null}
const value: models.ChatContentText[] = [
  {
    text: "Hello, world!",
    type: "text",
  },
];
```
