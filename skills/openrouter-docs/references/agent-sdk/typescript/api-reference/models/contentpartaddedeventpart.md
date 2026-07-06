> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ContentPartAddedEventPart - TypeScript SDK

> ContentPartAddedEventPart type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Supported Types

### `models.ResponseOutputText`

```typescript lines theme={null}
const value: models.ResponseOutputText = {
  text: "The capital of France is Paris.",
  type: "output_text",
};
```

### `models.ReasoningTextContent`

```typescript lines theme={null}
const value: models.ReasoningTextContent = {
  text: "Let me think step by step about this problem...",
  type: "reasoning_text",
};
```

### `models.OpenAIResponsesRefusalContent`

```typescript lines theme={null}
const value: models.OpenAIResponsesRefusalContent = {
  refusal: "I'm sorry, I cannot assist with that request",
  type: "refusal",
};
```
