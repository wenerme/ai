> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# OpenAIResponseInputMessageItem - TypeScript SDK

> OpenAIResponseInputMessageItem type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { OpenAIResponseInputMessageItem } from "@openrouter/sdk/models";

let value: OpenAIResponseInputMessageItem = {
  content: [
    {
      text: "Hello, how are you?",
      type: "input_text",
    },
  ],
  id: "msg-abc123",
  role: "user",
};
```

## Fields

| Field     | Type                                                                                                                       | Required             | Description |
| --------- | -------------------------------------------------------------------------------------------------------------------------- | -------------------- | ----------- |
| `content` | *models.OpenAIResponseInputMessageItemContent*\[]                                                                          | :heavy\_check\_mark: | N/A         |
| `id`      | *string*                                                                                                                   | :heavy\_check\_mark: | N/A         |
| `role`    | *models.OpenAIResponseInputMessageItemRoleUnion*                                                                           | :heavy\_check\_mark: | N/A         |
| `type`    | [models.OpenAIResponseInputMessageItemType](/docs/agent-sdk/typescript/api-reference/models/openairesponseinputmessageitemtype) | :heavy\_minus\_sign: | N/A         |
