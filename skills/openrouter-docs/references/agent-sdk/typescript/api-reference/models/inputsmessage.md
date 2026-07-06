> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# InputsMessage - TypeScript SDK

> InputsMessage type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

An output message item

## Example Usage

```typescript lines theme={null}
import { InputsMessage } from "@openrouter/sdk/models";

let value: InputsMessage = {
  content: [
    {
      text: "Hello! How can I help you?",
      type: "output_text",
    },
  ],
  id: "msg-123",
  role: "assistant",
  type: "message",
};
```

## Fields

| Field     | Type                                                                                     | Required             | Description                                                                                                                                                                                                                                                                                                                            |
| --------- | ---------------------------------------------------------------------------------------- | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `content` | *models.InputsContent2*                                                                  | :heavy\_check\_mark: | N/A                                                                                                                                                                                                                                                                                                                                    |
| `id`      | *string*                                                                                 | :heavy\_check\_mark: | N/A                                                                                                                                                                                                                                                                                                                                    |
| `phase`   | *models.InputsPhaseUnion*                                                                | :heavy\_minus\_sign: | The phase of an assistant message. Use `commentary` for an intermediate assistant message and `final_answer` for the final assistant message. For follow-up requests with models like `gpt-5.3-codex` and later, preserve and resend phase on all assistant messages. Omitting it can degrade performance. Not used for user messages. |
| `role`    | [models.InputsRole](/agent-sdk/typescript/api-reference/models/inputsrole)               | :heavy\_check\_mark: | N/A                                                                                                                                                                                                                                                                                                                                    |
| `status`  | *models.InputsStatusUnion1*                                                              | :heavy\_minus\_sign: | N/A                                                                                                                                                                                                                                                                                                                                    |
| `type`    | [models.InputsTypeMessage](/agent-sdk/typescript/api-reference/models/inputstypemessage) | :heavy\_check\_mark: | N/A                                                                                                                                                                                                                                                                                                                                    |
