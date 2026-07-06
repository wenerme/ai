> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ChatToolMessage - TypeScript SDK

> ChatToolMessage type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Tool response message

## Example Usage

```typescript lines theme={null}
import { ChatToolMessage } from "@openrouter/sdk/models";

let value: ChatToolMessage = {
  content: "What is the capital of France?",
  role: "tool",
  toolCallId: "call_abc123",
};
```

## Fields

| Field        | Type                            | Required             | Description                                                    | Example                                         |
| ------------ | ------------------------------- | -------------------- | -------------------------------------------------------------- | ----------------------------------------------- |
| `content`    | *models.ChatToolMessageContent* | :heavy\_check\_mark: | Tool response content                                          | The weather in San Francisco is 72°F and sunny. |
| `role`       | *"tool"*                        | :heavy\_check\_mark: | N/A                                                            |                                                 |
| `toolCallId` | *string*                        | :heavy\_check\_mark: | ID of the assistant message tool call this message responds to | call\_abc123                                    |
