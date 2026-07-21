> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# OutputMessage - TypeScript SDK

> OutputMessage method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { OutputMessage } from "@openrouter/sdk/models";

let value: OutputMessage = {
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

| Field     | Type                                                                       | Required             | Description |
| --------- | -------------------------------------------------------------------------- | -------------------- | ----------- |
| `id`      | *string*                                                                   | :heavy\_check\_mark: | N/A         |
| `role`    | [models.OutputMessageRole](/docs/agent-sdk/typescript/models/outputmessagerole) | :heavy\_check\_mark: | N/A         |
| `type`    | [models.OutputMessageType](/docs/agent-sdk/typescript/models/outputmessagetype) | :heavy\_check\_mark: | N/A         |
| `status`  | *models.OutputMessageStatusUnion*                                          | :heavy\_minus\_sign: | N/A         |
| `content` | *models.OutputMessageContent*\[]                                           | :heavy\_check\_mark: | N/A         |
