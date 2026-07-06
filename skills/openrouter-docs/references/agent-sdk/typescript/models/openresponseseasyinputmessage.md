> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# OpenResponsesEasyInputMessage - TypeScript SDK

> OpenResponsesEasyInputMessage method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { OpenResponsesEasyInputMessage } from "@openrouter/sdk/models";

let value: OpenResponsesEasyInputMessage = {
  role: "system",
  content: "<value>",
};
```

## Fields

| Field     | Type                                                                                                                     | Required             | Description |
| --------- | ------------------------------------------------------------------------------------------------------------------------ | -------------------- | ----------- |
| `type`    | [models.OpenResponsesEasyInputMessageTypeMessage](/agent-sdk/typescript/models/openresponseseasyinputmessagetypemessage) | :heavy\_minus\_sign: | N/A         |
| `role`    | *models.OpenResponsesEasyInputMessageRoleUnion*                                                                          | :heavy\_check\_mark: | N/A         |
| `content` | *models.OpenResponsesEasyInputMessageContentUnion2*                                                                      | :heavy\_check\_mark: | N/A         |
