> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# CreateRerankResponse - TypeScript SDK

> CreateRerankResponse type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Supported Types

### `operations.CreateRerankResponseBody`

```typescript lines theme={null}
const value: operations.CreateRerankResponseBody = {
  model: "cohere/rerank-v3.5",
  results: [
    {
      document: {
        text: "Paris is the capital of France.",
      },
      index: 0,
      relevanceScore: 0.98,
    },
  ],
};
```

### `string`

```typescript lines theme={null}
const value: string = "<value>";
```
