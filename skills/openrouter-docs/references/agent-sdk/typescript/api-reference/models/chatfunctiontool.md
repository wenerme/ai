> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ChatFunctionTool - TypeScript SDK

> ChatFunctionTool type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Tool definition for function calling (regular function or OpenRouter built-in server tool)

## Supported Types

### `models.ChatFunctionToolFunction`

```typescript lines theme={null}
const value: models.ChatFunctionToolFunction = {
  function: {
    name: "get_weather",
  },
  type: "function",
};
```

### `models.DatetimeServerTool`

```typescript lines theme={null}
const value: models.DatetimeServerTool = {
  type: "openrouter:datetime",
};
```

### `models.ImageGenerationServerToolOpenRouter`

```typescript lines theme={null}
const value: models.ImageGenerationServerToolOpenRouter = {
  type: "openrouter:image_generation",
};
```

### `models.ChatSearchModelsServerTool`

```typescript lines theme={null}
const value: models.ChatSearchModelsServerTool = {
  type: "openrouter:experimental__search_models",
};
```

### `models.WebFetchServerTool`

```typescript lines theme={null}
const value: models.WebFetchServerTool = {
  type: "openrouter:web_fetch",
};
```

### `models.OpenRouterWebSearchServerTool`

```typescript lines theme={null}
const value: models.OpenRouterWebSearchServerTool = {
  type: "openrouter:web_search",
};
```

### `models.ChatWebSearchShorthand`

```typescript lines theme={null}
const value: models.ChatWebSearchShorthand = {
  type: "web_search",
};
```
