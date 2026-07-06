> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# OpenAIResponsesToolChoiceUnion - TypeScript SDK

> OpenAIResponsesToolChoiceUnion type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Supported Types

### `models.OpenAIResponsesToolChoiceAuto`

```typescript lines theme={null}
const value: models.OpenAIResponsesToolChoiceAuto = "auto";
```

### `models.OpenAIResponsesToolChoiceNone`

```typescript lines theme={null}
const value: models.OpenAIResponsesToolChoiceNone = "none";
```

### `models.OpenAIResponsesToolChoiceRequired`

```typescript lines theme={null}
const value: models.OpenAIResponsesToolChoiceRequired = "required";
```

### `models.OpenAIResponsesToolChoiceFunction`

```typescript lines theme={null}
const value: models.OpenAIResponsesToolChoiceFunction = {
  name: "<value>",
  type: "function",
};
```

### `models.OpenAIResponsesToolChoice`

```typescript lines theme={null}
const value: models.OpenAIResponsesToolChoice = {
  type: "web_search_preview",
};
```

### `models.ToolChoiceAllowed`

```typescript lines theme={null}
const value: models.ToolChoiceAllowed = {
  mode: "auto",
  tools: [
    {
      "name": "get_weather",
      "type": "function",
    },
  ],
  type: "allowed_tools",
};
```

### `models.OpenAIResponsesToolChoiceApplyPatch`

```typescript lines theme={null}
const value: models.OpenAIResponsesToolChoiceApplyPatch = {
  type: "apply_patch",
};
```

### `models.OpenAIResponsesToolChoiceShell`

```typescript lines theme={null}
const value: models.OpenAIResponsesToolChoiceShell = {
  type: "shell",
};
```
