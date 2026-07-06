> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ResponsesRequestToolUnion - TypeScript SDK

> ResponsesRequestToolUnion type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Supported Types

### `models.ResponsesRequestToolFunction`

```typescript expandable lines theme={null}
const value: models.ResponsesRequestToolFunction = {
  name: "get_weather",
  parameters: {
    "properties": {
      "location": {
        "description": "The city and state",
        "type": "string",
      },
      "unit": {
        "enum": [
          "celsius",
          "fahrenheit",
        ],
        "type": "string",
        "x-speakeasy-unknown-values": "allow",
      },
    },
    "required": [
      "location",
    ],
    "type": "object",
  },
  type: "function",
};
```

### `models.PreviewWebSearchServerTool`

```typescript lines theme={null}
const value: models.PreviewWebSearchServerTool = {
  type: "web_search_preview",
};
```

### `models.Preview20250311WebSearchServerTool`

```typescript lines theme={null}
const value: models.Preview20250311WebSearchServerTool = {
  type: "web_search_preview_2025_03_11",
};
```

### `models.LegacyWebSearchServerTool`

```typescript lines theme={null}
const value: models.LegacyWebSearchServerTool = {
  type: "web_search",
};
```

### `models.WebSearchServerTool`

```typescript lines theme={null}
const value: models.WebSearchServerTool = {
  type: "web_search_2025_08_26",
};
```

### `models.FileSearchServerTool`

```typescript lines theme={null}
const value: models.FileSearchServerTool = {
  type: "file_search",
  vectorStoreIds: [
    "vs_abc123",
  ],
};
```

### `models.ComputerUseServerTool`

```typescript lines theme={null}
const value: models.ComputerUseServerTool = {
  displayHeight: 768,
  displayWidth: 1024,
  environment: "linux",
  type: "computer_use_preview",
};
```

### `models.CodeInterpreterServerTool`

```typescript lines theme={null}
const value: models.CodeInterpreterServerTool = {
  container: "auto",
  type: "code_interpreter",
};
```

### `models.McpServerTool`

```typescript lines theme={null}
const value: models.McpServerTool = {
  serverLabel: "my-server",
  type: "mcp",
};
```

### `models.ImageGenerationServerTool`

```typescript lines theme={null}
const value: models.ImageGenerationServerTool = {
  type: "image_generation",
};
```

### `models.CodexLocalShellTool`

```typescript lines theme={null}
const value: models.CodexLocalShellTool = {
  type: "local_shell",
};
```

### `models.ShellServerTool`

```typescript lines theme={null}
const value: models.ShellServerTool = {
  type: "shell",
};
```

### `models.ApplyPatchServerTool`

```typescript lines theme={null}
const value: models.ApplyPatchServerTool = {
  type: "apply_patch",
};
```

### `models.CustomTool`

```typescript lines theme={null}
const value: models.CustomTool = {
  name: "my_tool",
  type: "custom",
};
```

### `models.DatetimeServerTool`

```typescript lines theme={null}
const value: models.DatetimeServerTool = {
  type: "openrouter:datetime",
};
```

### `models.FusionServerToolOpenRouter`

```typescript lines theme={null}
const value: models.FusionServerToolOpenRouter = {
  type: "openrouter:fusion",
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

### `models.WebSearchServerToolOpenRouter`

```typescript lines theme={null}
const value: models.WebSearchServerToolOpenRouter = {
  type: "openrouter:web_search",
};
```

### `models.ApplyPatchServerToolOpenRouter`

```typescript lines theme={null}
const value: models.ApplyPatchServerToolOpenRouter = {
  type: "openrouter:apply_patch",
};
```
