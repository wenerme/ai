> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ChatNamedToolChoice - TypeScript SDK

> ChatNamedToolChoice type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Named tool choice for specific function

## Example Usage

```typescript lines theme={null}
import { ChatNamedToolChoice } from "@openrouter/sdk/models";

let value: ChatNamedToolChoice = {
  function: {
    name: "get_weather",
  },
  type: "function",
};
```

## Fields

| Field      | Type                                                                                                         | Required             | Description |
| ---------- | ------------------------------------------------------------------------------------------------------------ | -------------------- | ----------- |
| `function` | [models.ChatNamedToolChoiceFunction](/docs/agent-sdk/typescript/api-reference/models/chatnamedtoolchoicefunction) | :heavy\_check\_mark: | N/A         |
| `type`     | [models.ChatNamedToolChoiceType](/docs/agent-sdk/typescript/api-reference/models/chatnamedtoolchoicetype)         | :heavy\_check\_mark: | N/A         |
