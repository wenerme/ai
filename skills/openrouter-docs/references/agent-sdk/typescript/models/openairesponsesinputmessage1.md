> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# OpenAIResponsesInputMessage1 - TypeScript SDK

> OpenAIResponsesInputMessage1 method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { OpenAIResponsesInputMessage1 } from "@openrouter/sdk/models";

let value: OpenAIResponsesInputMessage1 = {
  role: "assistant",
  content: "<value>",
};
```

## Fields

| Field     | Type                                                                                                     | Required             | Description |
| --------- | -------------------------------------------------------------------------------------------------------- | -------------------- | ----------- |
| `type`    | [models.OpenAIResponsesInputTypeMessage1](/docs/agent-sdk/typescript/models/openairesponsesinputtypemessage1) | :heavy\_minus\_sign: | N/A         |
| `role`    | *models.OpenAIResponsesInputRoleUnion1*                                                                  | :heavy\_check\_mark: | N/A         |
| `content` | *models.OpenAIResponsesInputContent2*                                                                    | :heavy\_check\_mark: | N/A         |
