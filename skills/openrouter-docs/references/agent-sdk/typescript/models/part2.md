> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Part2 - TypeScript SDK

> Part2 method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Supported Types

### `models.ResponseOutputText`

```typescript lines theme={null}
const value: models.ResponseOutputText = {
  type: "output_text",
  text: "The capital of France is Paris.",
};
```

### `models.ReasoningTextContent`

```typescript lines theme={null}
const value: models.ReasoningTextContent = {
  type: "reasoning_text",
  text: "Let me think step by step about this problem...",
};
```

### `models.OpenAIResponsesRefusalContent`

```typescript lines theme={null}
const value: models.OpenAIResponsesRefusalContent = {
  type: "refusal",
  refusal: "I'm sorry, I cannot assist with that request",
};
```
