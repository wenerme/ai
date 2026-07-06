> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ChatResponse - TypeScript SDK

> ChatResponse method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { ChatResponse } from "@openrouter/sdk/models";

let value: ChatResponse = {
  id: "<id>",
  choices: [],
  created: 9184.01,
  model: "Focus",
  object: "chat.completion",
};
```

## Fields

| Field               | Type                                                                                     | Required             | Description |
| ------------------- | ---------------------------------------------------------------------------------------- | -------------------- | ----------- |
| `id`                | *string*                                                                                 | :heavy\_check\_mark: | N/A         |
| `choices`           | [models.ChatResponseChoice](/agent-sdk/typescript/models/chatresponsechoice)\[]          | :heavy\_check\_mark: | N/A         |
| `created`           | *number*                                                                                 | :heavy\_check\_mark: | N/A         |
| `model`             | *string*                                                                                 | :heavy\_check\_mark: | N/A         |
| `object`            | *"chat.completion"*                                                                      | :heavy\_check\_mark: | N/A         |
| `systemFingerprint` | *string*                                                                                 | :heavy\_minus\_sign: | N/A         |
| `usage`             | [models.ChatGenerationTokenUsage](/agent-sdk/typescript/models/chatgenerationtokenusage) | :heavy\_minus\_sign: | N/A         |
