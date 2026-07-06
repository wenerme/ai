> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# MessagesRequestToolUnion - TypeScript SDK

> MessagesRequestToolUnion type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Supported Types

### `models.ToolCustom`

```typescript lines theme={null}
const value: models.ToolCustom = {
  inputSchema: {},
  name: "<value>",
};
```

### `models.ToolBash20250124`

```typescript lines theme={null}
const value: models.ToolBash20250124 = {
  name: "bash",
  type: "bash_20250124",
};
```

### `models.ToolTextEditor20250124`

```typescript lines theme={null}
const value: models.ToolTextEditor20250124 = {
  name: "str_replace_editor",
  type: "text_editor_20250124",
};
```

### `models.ToolWebSearch20250305`

```typescript lines theme={null}
const value: models.ToolWebSearch20250305 = {
  name: "web_search",
  type: "web_search_20250305",
};
```

### `models.ToolWebSearch20260209`

```typescript lines theme={null}
const value: models.ToolWebSearch20260209 = {
  name: "web_search",
  type: "web_search_20260209",
};
```

### `models.ToolAdvisor20260301`

```typescript lines theme={null}
const value: models.ToolAdvisor20260301 = {
  model: "Fortwo",
  name: "advisor",
  type: "advisor_20260301",
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

### `models.MessagesRequestTool`

```typescript lines theme={null}
const value: models.MessagesRequestTool = {
  type: "<value>",
};
```
