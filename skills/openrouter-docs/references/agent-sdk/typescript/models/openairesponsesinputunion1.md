> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# OpenAIResponsesInputUnion1 - TypeScript SDK

> OpenAIResponsesInputUnion1 method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Supported Types

### `models.OpenAIResponsesInputMessage1`

```typescript lines theme={null}
const value: models.OpenAIResponsesInputMessage1 = {
  role: "assistant",
  content: "<value>",
};
```

### `models.OpenAIResponsesInputMessage2`

```typescript lines theme={null}
const value: models.OpenAIResponsesInputMessage2 = {
  id: "<id>",
  role: "user",
  content: [
    {
      type: "input_text",
      text: "Hello, how can I help you?",
    },
  ],
};
```

### `models.OpenAIResponsesInputFunctionCallOutput`

```typescript lines theme={null}
const value: models.OpenAIResponsesInputFunctionCallOutput = {
  type: "function_call_output",
  callId: "<id>",
  output: "<value>",
};
```

### `models.OpenAIResponsesInputFunctionCall`

```typescript lines theme={null}
const value: models.OpenAIResponsesInputFunctionCall = {
  type: "function_call",
  callId: "<id>",
  name: "<value>",
  arguments: "<value>",
};
```

### `models.OutputItemImageGenerationCall`

```typescript lines theme={null}
const value: models.OutputItemImageGenerationCall = {
  type: "image_generation_call",
  id: "imagegen-abc123",
  result:
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
  status: "completed",
};
```

### `models.OutputMessage`

```typescript lines theme={null}
const value: models.OutputMessage = {
  id: "msg-abc123",
  role: "assistant",
  type: "message",
  content: [
    {
      type: "output_text",
      text: "Hello! How can I help you today?",
    },
  ],
};
```
