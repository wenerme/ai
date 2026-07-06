> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# BaseInputsUnion1 - TypeScript SDK

> BaseInputsUnion1 type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Supported Types

### `models.BaseInputsMessage`

```typescript lines theme={null}
const value: models.BaseInputsMessage = {
  content: "<value>",
  role: "user",
};
```

### `models.OpenAIResponseInputMessageItem`

```typescript lines theme={null}
const value: models.OpenAIResponseInputMessageItem = {
  content: [
    {
      text: "Hello, how are you?",
      type: "input_text",
    },
  ],
  id: "msg-abc123",
  role: "user",
};
```

### `models.OpenAIResponseFunctionToolCallOutput`

```typescript lines theme={null}
const value: models.OpenAIResponseFunctionToolCallOutput = {
  callId: "call-abc123",
  output: "{\"temperature\":72,\"conditions\":\"sunny\"}",
  type: "function_call_output",
};
```

### `models.OpenAIResponseFunctionToolCall`

```typescript lines theme={null}
const value: models.OpenAIResponseFunctionToolCall = {
  arguments: "{\"location\":\"San Francisco\"}",
  callId: "call-abc123",
  name: "get_weather",
  type: "function_call",
};
```

### `models.OutputItemImageGenerationCall`

```typescript lines theme={null}
const value: models.OutputItemImageGenerationCall = {
  id: "imagegen-abc123",
  result:
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
  status: "completed",
  type: "image_generation_call",
};
```

### `models.OutputMessage`

```typescript lines theme={null}
const value: models.OutputMessage = {
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

### `models.OpenAIResponseCustomToolCall`

```typescript lines theme={null}
const value: models.OpenAIResponseCustomToolCall = {
  callId: "call-abc123",
  input: "*** Begin Patch\n*** End Patch",
  name: "apply_patch",
  type: "custom_tool_call",
};
```

### `models.OpenAIResponseCustomToolCallOutput`

```typescript lines theme={null}
const value: models.OpenAIResponseCustomToolCallOutput = {
  callId: "call-abc123",
  output: "patch applied successfully",
  type: "custom_tool_call_output",
};
```

### `models.ApplyPatchCallItem`

```typescript lines theme={null}
const value: models.ApplyPatchCallItem = {
  callId: "call_abc123",
  operation: {
    diff: "@@ function main() {\n+  console.log(\"hi\");\n }",
    path: "/src/main.ts",
    type: "update_file",
  },
  status: "completed",
  type: "apply_patch_call",
};
```

### `models.ApplyPatchCallOutputItem`

```typescript lines theme={null}
const value: models.ApplyPatchCallOutputItem = {
  callId: "call_abc123",
  status: "completed",
  type: "apply_patch_call_output",
};
```
