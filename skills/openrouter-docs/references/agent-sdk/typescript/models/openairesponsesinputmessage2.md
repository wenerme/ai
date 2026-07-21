> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# OpenAIResponsesInputMessage2 - TypeScript SDK

> OpenAIResponsesInputMessage2 method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { OpenAIResponsesInputMessage2 } from "@openrouter/sdk/models";

let value: OpenAIResponsesInputMessage2 = {
  id: "<id>",
  role: "user",
  content: [
    {
      type: "input_text",
      text: "Hello, how can I help you?",
    },
  ],
};
```

## Fields

| Field     | Type                                                                                                     | Required             | Description |
| --------- | -------------------------------------------------------------------------------------------------------- | -------------------- | ----------- |
| `id`      | *string*                                                                                                 | :heavy\_check\_mark: | N/A         |
| `type`    | [models.OpenAIResponsesInputTypeMessage2](/docs/agent-sdk/typescript/models/openairesponsesinputtypemessage2) | :heavy\_minus\_sign: | N/A         |
| `role`    | *models.OpenAIResponsesInputRoleUnion2*                                                                  | :heavy\_check\_mark: | N/A         |
| `content` | *models.OpenAIResponsesInputContent3*\[]                                                                 | :heavy\_check\_mark: | N/A         |
