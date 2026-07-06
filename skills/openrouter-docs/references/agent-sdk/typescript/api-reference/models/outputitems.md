> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# OutputItems - TypeScript SDK

> OutputItems type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

An output item from the response

## Supported Types

### `models.OutputApplyPatchCallItem`

```typescript lines theme={null}
const value: models.OutputApplyPatchCallItem = {
  callId: "<id>",
  id: "msg-abc123",
  operation: {
    diff: "@@ function main() {\n+  console.log(\"hi\");\n }",
    path: "/src/main.ts",
    type: "update_file",
  },
  status: "completed",
  type: "apply_patch_call",
};
```

### `models.OutputCodeInterpreterCallItem`

```typescript lines theme={null}
const value: models.OutputCodeInterpreterCallItem = {
  code: "print(\"hello\")",
  containerId: "ctr-xyz789",
  id: "ci-abc123",
  outputs: [
    {
      logs: "hello\n",
      type: "logs",
    },
  ],
  status: "completed",
  type: "code_interpreter_call",
};
```

### `models.OutputComputerCallItem`

```typescript lines theme={null}
const value: models.OutputComputerCallItem = {
  callId: "call-abc123",
  pendingSafetyChecks: [],
  status: "completed",
  type: "computer_call",
};
```

### `models.OutputCustomToolCallItem`

```typescript lines theme={null}
const value: models.OutputCustomToolCallItem = {
  callId: "call-abc123",
  input: "*** Begin Patch\n*** End Patch",
  name: "apply_patch",
  type: "custom_tool_call",
};
```

### `models.OutputFileSearchCallItem`

```typescript lines theme={null}
const value: models.OutputFileSearchCallItem = {
  id: "fs-abc123",
  queries: [
    "search term",
  ],
  status: "completed",
  type: "file_search_call",
};
```

### `models.OutputFunctionCallItem`

```typescript lines theme={null}
const value: models.OutputFunctionCallItem = {
  arguments: "{\"location\":\"San Francisco\"}",
  callId: "call-abc123",
  name: "get_weather",
  type: "function_call",
};
```

### `models.OutputImageGenerationCallItem`

```typescript lines theme={null}
const value: models.OutputImageGenerationCallItem = {
  id: "img-abc123",
  status: "completed",
  type: "image_generation_call",
};
```

### `models.OutputMessageItem`

```typescript lines theme={null}
const value: models.OutputMessageItem = {
  content: [
    {
      text: "Hello! How can I help you today?",
      type: "output_text",
    },
  ],
  id: "msg-abc123",
  role: "assistant",
  type: "message",
};
```

### `models.OutputApplyPatchServerToolItem`

```typescript lines theme={null}
const value: models.OutputApplyPatchServerToolItem = {
  status: "completed",
  type: "openrouter:apply_patch",
};
```

### `models.OutputBashServerToolItem`

```typescript lines theme={null}
const value: models.OutputBashServerToolItem = {
  status: "completed",
  type: "openrouter:bash",
};
```

### `models.OutputBrowserUseServerToolItem`

```typescript lines theme={null}
const value: models.OutputBrowserUseServerToolItem = {
  status: "completed",
  type: "openrouter:browser_use",
};
```

### `models.OutputCodeInterpreterServerToolItem`

```typescript lines theme={null}
const value: models.OutputCodeInterpreterServerToolItem = {
  status: "completed",
  type: "openrouter:code_interpreter",
};
```

### `models.OutputDatetimeItem`

```typescript lines theme={null}
const value: models.OutputDatetimeItem = {
  datetime: "2026-03-12T14:30:00.000Z",
  status: "completed",
  timezone: "UTC",
  type: "openrouter:datetime",
};
```

### `models.OutputSearchModelsServerToolItem`

```typescript lines theme={null}
const value: models.OutputSearchModelsServerToolItem = {
  status: "completed",
  type: "openrouter:experimental__search_models",
};
```

### `models.OutputFileSearchServerToolItem`

```typescript lines theme={null}
const value: models.OutputFileSearchServerToolItem = {
  status: "completed",
  type: "openrouter:file_search",
};
```

### `models.OutputFusionServerToolItem`

```typescript lines theme={null}
const value: models.OutputFusionServerToolItem = {
  status: "completed",
  type: "openrouter:fusion",
};
```

### `models.OutputImageGenerationServerToolItem`

```typescript lines theme={null}
const value: models.OutputImageGenerationServerToolItem = {
  status: "completed",
  type: "openrouter:image_generation",
};
```

### `models.OutputMcpServerToolItem`

```typescript lines theme={null}
const value: models.OutputMcpServerToolItem = {
  status: "completed",
  type: "openrouter:mcp",
};
```

### `models.OutputMemoryServerToolItem`

```typescript lines theme={null}
const value: models.OutputMemoryServerToolItem = {
  status: "completed",
  type: "openrouter:memory",
};
```

### `models.OutputTextEditorServerToolItem`

```typescript lines theme={null}
const value: models.OutputTextEditorServerToolItem = {
  status: "completed",
  type: "openrouter:text_editor",
};
```

### `models.OutputToolSearchServerToolItem`

```typescript lines theme={null}
const value: models.OutputToolSearchServerToolItem = {
  status: "completed",
  type: "openrouter:tool_search",
};
```

### `models.OutputWebFetchServerToolItem`

```typescript lines theme={null}
const value: models.OutputWebFetchServerToolItem = {
  status: "completed",
  type: "openrouter:web_fetch",
};
```

### `models.OutputWebSearchServerToolItem`

```typescript lines theme={null}
const value: models.OutputWebSearchServerToolItem = {
  status: "completed",
  type: "openrouter:web_search",
};
```

### `models.OutputReasoningItem`

```typescript lines theme={null}
const value: models.OutputReasoningItem = {
  id: "msg-abc123",
  summary: [
    {
      text: "Analyzed the problem using first principles",
      type: "summary_text",
    },
  ],
  type: "reasoning",
};
```

### `models.OutputWebSearchCallItem`

```typescript lines theme={null}
const value: models.OutputWebSearchCallItem = {
  action: {
    pattern: "<value>",
    type: "find_in_page",
    url: "https://tragic-requirement.com/",
  },
  id: "ws-abc123",
  status: "completed",
  type: "web_search_call",
};
```
