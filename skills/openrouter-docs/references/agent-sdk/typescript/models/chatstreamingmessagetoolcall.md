> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ChatStreamingMessageToolCall - TypeScript SDK

> ChatStreamingMessageToolCall method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { ChatStreamingMessageToolCall } from "@openrouter/sdk/models";

let value: ChatStreamingMessageToolCall = {
  index: 3974.82,
};
```

## Fields

| Field      | Type                                                                                                             | Required             | Description |
| ---------- | ---------------------------------------------------------------------------------------------------------------- | -------------------- | ----------- |
| `index`    | *number*                                                                                                         | :heavy\_check\_mark: | N/A         |
| `id`       | *string*                                                                                                         | :heavy\_minus\_sign: | N/A         |
| `type`     | *"function"*                                                                                                     | :heavy\_minus\_sign: | N/A         |
| `function` | [models.ChatStreamingMessageToolCallFunction](/docs/agent-sdk/typescript/models/chatstreamingmessagetoolcallfunction) | :heavy\_minus\_sign: | N/A         |
