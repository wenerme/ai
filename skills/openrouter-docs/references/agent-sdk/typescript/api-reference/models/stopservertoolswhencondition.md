> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# StopServerToolsWhenCondition - TypeScript SDK

> StopServerToolsWhenCondition type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

A single condition that, when met, halts the server-tool agent loop.

## Supported Types

### `models.StopServerToolsWhenFinishReasonIs`

```typescript lines theme={null}
const value: models.StopServerToolsWhenFinishReasonIs = {
  reason: "<value>",
  type: "finish_reason_is",
};
```

### `models.StopServerToolsWhenHasToolCall`

```typescript lines theme={null}
const value: models.StopServerToolsWhenHasToolCall = {
  toolName: "<value>",
  type: "has_tool_call",
};
```

### `models.StopServerToolsWhenMaxCost`

```typescript lines theme={null}
const value: models.StopServerToolsWhenMaxCost = {
  maxCostInDollars: 1543.31,
  type: "max_cost",
};
```

### `models.StopServerToolsWhenMaxTokensUsed`

```typescript lines theme={null}
const value: models.StopServerToolsWhenMaxTokensUsed = {
  maxTokens: 577706,
  type: "max_tokens_used",
};
```

### `models.StopServerToolsWhenStepCountIs`

```typescript lines theme={null}
const value: models.StopServerToolsWhenStepCountIs = {
  stepCount: 5,
  type: "step_count_is",
};
```
