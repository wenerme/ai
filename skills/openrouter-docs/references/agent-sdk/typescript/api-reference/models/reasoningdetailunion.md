> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ReasoningDetailUnion - TypeScript SDK

> ReasoningDetailUnion type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Reasoning detail union schema

## Supported Types

### `models.ReasoningDetailEncrypted`

```typescript lines theme={null}
const value: models.ReasoningDetailEncrypted = {
  data: "<value>",
  type: "reasoning.encrypted",
};
```

### `models.ReasoningDetailSummary`

```typescript lines theme={null}
const value: models.ReasoningDetailSummary = {
  summary:
    "The model analyzed the problem by first identifying key constraints, then evaluating possible solutions...",
  type: "reasoning.summary",
};
```

### `models.ReasoningDetailText`

```typescript lines theme={null}
const value: models.ReasoningDetailText = {
  type: "reasoning.text",
};
```
