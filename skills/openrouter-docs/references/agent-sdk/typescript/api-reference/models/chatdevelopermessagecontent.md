> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ChatDeveloperMessageContent - TypeScript SDK

> ChatDeveloperMessageContent type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Developer message content

## Supported Types

### `string`

```typescript lines theme={null}
const value: string = "This is a message from the developer.";
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
