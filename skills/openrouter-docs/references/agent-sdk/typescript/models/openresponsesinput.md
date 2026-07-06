> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# OpenResponsesInput - TypeScript SDK

> OpenResponsesInput method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Input for a response request - can be a string or array of items

## Supported Types

### `string`

```typescript lines theme={null}
const value: string =
  "[{\"role\":\"user\",\"content\":\"What is the weather today?\"}]";
```

### `models.OpenResponsesInput1[]`

```typescript lines theme={null}
const value: models.OpenResponsesInput1[] = [
  {
    role: "user",
    content: "What is the weather today?",
  },
];
```
