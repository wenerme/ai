> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ChatToolCall - TypeScript SDK

> ChatToolCall type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Tool call made by the assistant

## Example Usage

```typescript lines theme={null}
import { ChatToolCall } from "@openrouter/sdk/models";

let value: ChatToolCall = {
  function: {
    arguments: "{\"location\": \"Boston, MA\"}",
    name: "get_current_weather",
  },
  id: "call_abc123",
  type: "function",
};
```

## Fields

| Field      | Type                                                                                           | Required             | Description          |
| ---------- | ---------------------------------------------------------------------------------------------- | -------------------- | -------------------- |
| `function` | [models.ChatToolCallFunction](/agent-sdk/typescript/api-reference/models/chattoolcallfunction) | :heavy\_check\_mark: | N/A                  |
| `id`       | *string*                                                                                       | :heavy\_check\_mark: | Tool call identifier |
| `type`     | [models.ChatToolCallType](/agent-sdk/typescript/api-reference/models/chattoolcalltype)         | :heavy\_check\_mark: | N/A                  |
