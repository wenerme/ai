> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# EasyInputMessage - TypeScript SDK

> EasyInputMessage type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { EasyInputMessage } from "@openrouter/sdk/models";

let value: EasyInputMessage = {
  role: "user",
};
```

## Fields

| Field     | Type                                                                                                         | Required             | Description                                                                                                                                                                                                                                                                                                                            | Example       |
| --------- | ------------------------------------------------------------------------------------------------------------ | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `content` | *models.EasyInputMessageContentUnion2*                                                                       | :heavy\_minus\_sign: | N/A                                                                                                                                                                                                                                                                                                                                    |               |
| `phase`   | *models.EasyInputMessagePhaseUnion*                                                                          | :heavy\_minus\_sign: | The phase of an assistant message. Use `commentary` for an intermediate assistant message and `final_answer` for the final assistant message. For follow-up requests with models like `gpt-5.3-codex` and later, preserve and resend phase on all assistant messages. Omitting it can degrade performance. Not used for user messages. | final\_answer |
| `role`    | *models.EasyInputMessageRoleUnion*                                                                           | :heavy\_check\_mark: | N/A                                                                                                                                                                                                                                                                                                                                    |               |
| `type`    | [models.EasyInputMessageTypeMessage](/docs/agent-sdk/typescript/api-reference/models/easyinputmessagetypemessage) | :heavy\_minus\_sign: | N/A                                                                                                                                                                                                                                                                                                                                    |               |
