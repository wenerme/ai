> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# OutputMessageItem - TypeScript SDK

> OutputMessageItem type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

An output message item

## Example Usage

```typescript lines theme={null}
import { OutputMessageItem } from "@openrouter/sdk/models";

let value: OutputMessageItem = {
  content: [
    {
      text: "Hello! How can I help you today?",
      type: "output_text",
    },
  ],
  id: "msg-abc123",
  role: "assistant",
  type: "message",
};
```

## Fields

| Field     | Type                                                                                             | Required             | Description                                                                                                                                                                                                                                                                                                                            |
| --------- | ------------------------------------------------------------------------------------------------ | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `content` | *models.OutputMessageItemContent*\[]                                                             | :heavy\_check\_mark: | N/A                                                                                                                                                                                                                                                                                                                                    |
| `id`      | *string*                                                                                         | :heavy\_check\_mark: | N/A                                                                                                                                                                                                                                                                                                                                    |
| `phase`   | *models.OutputMessageItemPhaseUnion*                                                             | :heavy\_minus\_sign: | The phase of an assistant message. Use `commentary` for an intermediate assistant message and `final_answer` for the final assistant message. For follow-up requests with models like `gpt-5.3-codex` and later, preserve and resend phase on all assistant messages. Omitting it can degrade performance. Not used for user messages. |
| `role`    | [models.OutputMessageItemRole](/docs/agent-sdk/typescript/api-reference/models/outputmessageitemrole) | :heavy\_check\_mark: | N/A                                                                                                                                                                                                                                                                                                                                    |
| `status`  | *models.OutputMessageItemStatusUnion*                                                            | :heavy\_minus\_sign: | N/A                                                                                                                                                                                                                                                                                                                                    |
| `type`    | *"message"*                                                                                      | :heavy\_check\_mark: | N/A                                                                                                                                                                                                                                                                                                                                    |
