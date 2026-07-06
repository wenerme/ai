> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Thinking - TypeScript SDK

> Thinking type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Supported Types

### `models.ThinkingEnabled`

```typescript lines theme={null}
const value: models.ThinkingEnabled = {
  budgetTokens: 599839,
  type: "enabled",
};
```

### `models.ThinkingDisabled`

```typescript lines theme={null}
const value: models.ThinkingDisabled = {
  type: "disabled",
};
```

### `models.ThinkingAdaptive`

```typescript lines theme={null}
const value: models.ThinkingAdaptive = {
  type: "adaptive",
};
```
