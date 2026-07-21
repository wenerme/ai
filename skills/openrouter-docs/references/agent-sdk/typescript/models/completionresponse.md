> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# CompletionResponse - TypeScript SDK

> CompletionResponse method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { CompletionResponse } from "@openrouter/sdk/models";

let value: CompletionResponse = {
  id: "<id>",
  object: "text_completion",
  created: 7985.17,
  model: "Taurus",
  choices: [],
};
```

## Fields

| Field               | Type                                                                        | Required             | Description |
| ------------------- | --------------------------------------------------------------------------- | -------------------- | ----------- |
| `id`                | *string*                                                                    | :heavy\_check\_mark: | N/A         |
| `object`            | *"text\_completion"*                                                        | :heavy\_check\_mark: | N/A         |
| `created`           | *number*                                                                    | :heavy\_check\_mark: | N/A         |
| `model`             | *string*                                                                    | :heavy\_check\_mark: | N/A         |
| `provider`          | *string*                                                                    | :heavy\_minus\_sign: | N/A         |
| `systemFingerprint` | *string*                                                                    | :heavy\_minus\_sign: | N/A         |
| `choices`           | [models.CompletionChoice](/docs/agent-sdk/typescript/models/completionchoice)\[] | :heavy\_check\_mark: | N/A         |
| `usage`             | [models.CompletionUsage](/docs/agent-sdk/typescript/models/completionusage)      | :heavy\_minus\_sign: | N/A         |
