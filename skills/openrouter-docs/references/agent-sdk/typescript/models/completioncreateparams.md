> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# CompletionCreateParams - TypeScript SDK

> CompletionCreateParams method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { CompletionCreateParams } from "@openrouter/sdk/models";

let value: CompletionCreateParams = {
  prompt: [],
};
```

## Fields

| Field              | Type                                                               | Required             | Description |
| ------------------ | ------------------------------------------------------------------ | -------------------- | ----------- |
| `model`            | *string*                                                           | :heavy\_minus\_sign: | N/A         |
| `models`           | *string*\[]                                                        | :heavy\_minus\_sign: | N/A         |
| `prompt`           | *models.Prompt*                                                    | :heavy\_check\_mark: | N/A         |
| `bestOf`           | *number*                                                           | :heavy\_minus\_sign: | N/A         |
| `echo`             | *boolean*                                                          | :heavy\_minus\_sign: | N/A         |
| `frequencyPenalty` | *number*                                                           | :heavy\_minus\_sign: | N/A         |
| `logitBias`        | `Record<string, *number*>`                                         | :heavy\_minus\_sign: | N/A         |
| `logprobs`         | *number*                                                           | :heavy\_minus\_sign: | N/A         |
| `maxTokens`        | *number*                                                           | :heavy\_minus\_sign: | N/A         |
| `n`                | *number*                                                           | :heavy\_minus\_sign: | N/A         |
| `presencePenalty`  | *number*                                                           | :heavy\_minus\_sign: | N/A         |
| `seed`             | *number*                                                           | :heavy\_minus\_sign: | N/A         |
| `stop`             | *models.CompletionCreateParamsStop*                                | :heavy\_minus\_sign: | N/A         |
| `stream`           | *boolean*                                                          | :heavy\_minus\_sign: | N/A         |
| `streamOptions`    | [models.StreamOptions](/agent-sdk/typescript/models/streamoptions) | :heavy\_minus\_sign: | N/A         |
| `suffix`           | *string*                                                           | :heavy\_minus\_sign: | N/A         |
| `temperature`      | *number*                                                           | :heavy\_minus\_sign: | N/A         |
| `topP`             | *number*                                                           | :heavy\_minus\_sign: | N/A         |
| `user`             | *string*                                                           | :heavy\_minus\_sign: | N/A         |
| `metadata`         | `Record<string, *string*>`                                         | :heavy\_minus\_sign: | N/A         |
| `responseFormat`   | *models.CompletionCreateParamsResponseFormatUnion*                 | :heavy\_minus\_sign: | N/A         |
