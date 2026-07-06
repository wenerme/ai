> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# InputUnion - TypeScript SDK

> InputUnion type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

The input to the generation — either a prompt string or an array of messages

## Supported Types

### `models.Input1`

```typescript lines theme={null}
const value: models.Input1 = {
  prompt: "What is the meaning of life?",
};
```

### `models.Input2`

```typescript lines theme={null}
const value: models.Input2 = {
  messages: [
    {
      "content": "What is the meaning of life?",
      "role": "user",
    },
  ],
};
```
