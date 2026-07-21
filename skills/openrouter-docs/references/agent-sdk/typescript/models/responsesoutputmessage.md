> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ResponsesOutputMessage - TypeScript SDK

> ResponsesOutputMessage method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

An output message item

## Example Usage

```typescript lines theme={null}
import { ResponsesOutputMessage } from "@openrouter/sdk/models";

let value: ResponsesOutputMessage = {
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

## Fields

| Field     | Type                                                                                         | Required             | Description |
| --------- | -------------------------------------------------------------------------------------------- | -------------------- | ----------- |
| `id`      | *string*                                                                                     | :heavy\_check\_mark: | N/A         |
| `role`    | [models.ResponsesOutputMessageRole](/docs/agent-sdk/typescript/models/responsesoutputmessagerole) | :heavy\_check\_mark: | N/A         |
| `type`    | [models.ResponsesOutputMessageType](/docs/agent-sdk/typescript/models/responsesoutputmessagetype) | :heavy\_check\_mark: | N/A         |
| `status`  | *models.ResponsesOutputMessageStatusUnion*                                                   | :heavy\_minus\_sign: | N/A         |
| `content` | *models.ResponsesOutputMessageContent*\[]                                                    | :heavy\_check\_mark: | N/A         |
