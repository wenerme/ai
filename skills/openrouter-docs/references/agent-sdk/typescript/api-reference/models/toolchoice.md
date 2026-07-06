> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ToolChoice - TypeScript SDK

> ToolChoice type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Supported Types

### `models.ToolChoiceAuto`

```typescript lines theme={null}
const value: models.ToolChoiceAuto = {
  type: "auto",
};
```

### `models.ToolChoiceAny`

```typescript lines theme={null}
const value: models.ToolChoiceAny = {
  type: "any",
};
```

### `models.ToolChoiceNone`

```typescript lines theme={null}
const value: models.ToolChoiceNone = {
  type: "none",
};
```

### `models.ToolChoiceTool`

```typescript lines theme={null}
const value: models.ToolChoiceTool = {
  name: "<value>",
  type: "tool",
};
```
