> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# MessagesMessageParam - TypeScript SDK

> MessagesMessageParam type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Anthropic message with OpenRouter extensions

## Example Usage

```typescript lines theme={null}
import { MessagesMessageParam } from "@openrouter/sdk/models";

let value: MessagesMessageParam = {
  content: "Hello, how are you?",
  role: "user",
};
```

## Fields

| Field     | Type                                                                                                   | Required             | Description |
| --------- | ------------------------------------------------------------------------------------------------------ | -------------------- | ----------- |
| `content` | *models.MessagesMessageParamContentUnion5*                                                             | :heavy\_check\_mark: | N/A         |
| `role`    | [models.MessagesMessageParamRole](/docs/agent-sdk/typescript/api-reference/models/messagesmessageparamrole) | :heavy\_check\_mark: | N/A         |
