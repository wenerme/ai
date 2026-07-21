> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ChatStreamToolCall - TypeScript SDK

> ChatStreamToolCall type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Tool call delta for streaming responses

## Example Usage

```typescript lines theme={null}
import { ChatStreamToolCall } from "@openrouter/sdk/models";

let value: ChatStreamToolCall = {
  index: 0,
};
```

## Fields

| Field      | Type                                                                                                       | Required             | Description                  | Example      |
| ---------- | ---------------------------------------------------------------------------------------------------------- | -------------------- | ---------------------------- | ------------ |
| `function` | [models.ChatStreamToolCallFunction](/docs/agent-sdk/typescript/api-reference/models/chatstreamtoolcallfunction) | :heavy\_minus\_sign: | Function call details        |              |
| `id`       | *string*                                                                                                   | :heavy\_minus\_sign: | Tool call identifier         | call\_abc123 |
| `index`    | *number*                                                                                                   | :heavy\_check\_mark: | Tool call index in the array | 0            |
| `type`     | [models.ChatStreamToolCallType](/docs/agent-sdk/typescript/api-reference/models/chatstreamtoolcalltype)         | :heavy\_minus\_sign: | Tool call type               | function     |
