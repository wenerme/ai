> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# OpenResponsesInput1 - TypeScript SDK

> OpenResponsesInput1 method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Supported Types

### `models.OpenResponsesReasoning`

```typescript lines theme={null}
const value: models.OpenResponsesReasoning = {
  type: "reasoning",
  id: "reasoning-abc123",
  summary: [
    {
      type: "summary_text",
      text: "Analyzed the problem using first principles",
    },
  ],
};
```

### `models.OpenResponsesEasyInputMessage`

```typescript lines theme={null}
const value: models.OpenResponsesEasyInputMessage = {
  role: "system",
  content: "<value>",
};
```

### `models.OpenResponsesInputMessageItem`

```typescript lines theme={null}
const value: models.OpenResponsesInputMessageItem = {
  role: "system",
  content: [
    {
      type: "input_text",
      text: "Hello, how can I help you?",
    },
  ],
};
```

### `models.OpenResponsesFunctionToolCall`

```typescript lines theme={null}
const value: models.OpenResponsesFunctionToolCall = {
  type: "function_call",
  callId: "call-abc123",
  name: "get_weather",
  arguments: "{\"location\":\"San Francisco\"}",
  id: "call-abc123",
};
```

### `models.OpenResponsesFunctionCallOutput`

```typescript lines theme={null}
const value: models.OpenResponsesFunctionCallOutput = {
  type: "function_call_output",
  callId: "call-abc123",
  output: "{\"temperature\":72,\"conditions\":\"sunny\"}",
};
```

### `models.ResponsesOutputMessage`

```typescript lines theme={null}
const value: models.ResponsesOutputMessage = {
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

### `models.ResponsesOutputItemReasoning`

```typescript lines theme={null}
const value: models.ResponsesOutputItemReasoning = {
  type: "reasoning",
  id: "reasoning-abc123",
  summary: [
    {
      type: "summary_text",
      text: "Analyzed the problem using first principles",
    },
  ],
};
```

### `models.ResponsesOutputItemFunctionCall`

```typescript lines theme={null}
const value: models.ResponsesOutputItemFunctionCall = {
  type: "function_call",
  name: "get_weather",
  arguments: "{\"location\":\"San Francisco\",\"unit\":\"celsius\"}",
  callId: "call-abc123",
};
```

### `models.ResponsesWebSearchCallOutput`

```typescript lines theme={null}
const value: models.ResponsesWebSearchCallOutput = {
  type: "web_search_call",
  id: "search-abc123",
  status: "completed",
};
```

### `models.ResponsesOutputItemFileSearchCall`

```typescript lines theme={null}
const value: models.ResponsesOutputItemFileSearchCall = {
  type: "file_search_call",
  id: "filesearch-abc123",
  queries: [
    "machine learning algorithms",
    "neural networks",
  ],
  status: "completed",
};
```

### `models.ResponsesImageGenerationCall`

```typescript lines theme={null}
const value: models.ResponsesImageGenerationCall = {
  type: "image_generation_call",
  id: "imagegen-abc123",
  result:
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
  status: "completed",
};
```
