> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# AssistantMessage - TypeScript SDK

> AssistantMessage method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { AssistantMessage } from "@openrouter/sdk/models";

let value: AssistantMessage = {
  role: "assistant",
};
```

## Fields

| Field              | Type                                                                              | Required             | Description |
| ------------------ | --------------------------------------------------------------------------------- | -------------------- | ----------- |
| `role`             | *"assistant"*                                                                     | :heavy\_check\_mark: | N/A         |
| `content`          | *models.AssistantMessageContent*                                                  | :heavy\_minus\_sign: | N/A         |
| `name`             | *string*                                                                          | :heavy\_minus\_sign: | N/A         |
| `toolCalls`        | [models.ChatMessageToolCall](/agent-sdk/typescript/models/chatmessagetoolcall)\[] | :heavy\_minus\_sign: | N/A         |
| `refusal`          | *string*                                                                          | :heavy\_minus\_sign: | N/A         |
| `reasoning`        | *string*                                                                          | :heavy\_minus\_sign: | N/A         |
| `reasoningDetails` | *models.Schema2*\[]                                                               | :heavy\_minus\_sign: | N/A         |
