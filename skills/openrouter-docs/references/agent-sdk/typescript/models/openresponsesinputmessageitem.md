> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# OpenResponsesInputMessageItem - TypeScript SDK

> OpenResponsesInputMessageItem method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { OpenResponsesInputMessageItem } from "@openrouter/sdk/models";

let value: OpenResponsesInputMessageItem = {
  role: "system",
  content: [
    {
      type: "input_text",
      text: "Hello, how can I help you?",
    },
  ],
};
```

## Fields

| Field     | Type                                                                                                                     | Required             | Description |
| --------- | ------------------------------------------------------------------------------------------------------------------------ | -------------------- | ----------- |
| `id`      | *string*                                                                                                                 | :heavy\_minus\_sign: | N/A         |
| `type`    | [models.OpenResponsesInputMessageItemTypeMessage](/docs/agent-sdk/typescript/models/openresponsesinputmessageitemtypemessage) | :heavy\_minus\_sign: | N/A         |
| `role`    | *models.OpenResponsesInputMessageItemRoleUnion*                                                                          | :heavy\_check\_mark: | N/A         |
| `content` | *models.OpenResponsesInputMessageItemContentUnion*\[]                                                                    | :heavy\_check\_mark: | N/A         |
