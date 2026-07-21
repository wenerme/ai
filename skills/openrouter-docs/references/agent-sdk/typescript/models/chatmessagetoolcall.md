> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ChatMessageToolCall - TypeScript SDK

> ChatMessageToolCall method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { ChatMessageToolCall } from "@openrouter/sdk/models";

let value: ChatMessageToolCall = {
  id: "<id>",
  type: "function",
  function: {
    name: "<value>",
    arguments: "<value>",
  },
};
```

## Fields

| Field      | Type                                                                                           | Required             | Description |
| ---------- | ---------------------------------------------------------------------------------------------- | -------------------- | ----------- |
| `id`       | *string*                                                                                       | :heavy\_check\_mark: | N/A         |
| `type`     | *"function"*                                                                                   | :heavy\_check\_mark: | N/A         |
| `function` | [models.ChatMessageToolCallFunction](/docs/agent-sdk/typescript/models/chatmessagetoolcallfunction) | :heavy\_check\_mark: | N/A         |
