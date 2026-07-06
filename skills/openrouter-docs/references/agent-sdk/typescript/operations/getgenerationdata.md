> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# GetGenerationData - TypeScript SDK

> GetGenerationData method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Generation data

## Example Usage

```typescript expandable lines theme={null}
import { GetGenerationData } from "@openrouter/sdk/models/operations";

let value: GetGenerationData = {
  id: "gen-3bhGkxlo4XFrqiabUM7NDtwDzWwG",
  upstreamId: "chatcmpl-791bcf62-080e-4568-87d0-94c72e3b4946",
  totalCost: 0.0015,
  cacheDiscount: 0.0002,
  upstreamInferenceCost: 0.0012,
  createdAt: "2024-07-15T23:33:19.433273+00:00",
  model: "sao10k/l3-stheno-8b",
  appId: 12345,
  streamed: true,
  cancelled: false,
  providerName: "Infermatic",
  latency: 1250,
  moderationLatency: 50,
  generationTime: 1200,
  finishReason: "stop",
  tokensPrompt: 10,
  tokensCompletion: 25,
  nativeTokensPrompt: 10,
  nativeTokensCompletion: 25,
  nativeTokensCompletionImages: 0,
  nativeTokensReasoning: 5,
  nativeTokensCached: 3,
  numMediaPrompt: 1,
  numInputAudioPrompt: 0,
  numMediaCompletion: 0,
  numSearchResults: 5,
  origin: "https://openrouter.ai/",
  usage: 0.0015,
  isByok: false,
  nativeFinishReason: "stop",
  externalUser: "user-123",
  apiType: "completions",
  router: "openrouter/auto",
};
```

## Fields

| Field                          | Type                                                           | Required             | Description                                            | Example                                          |
| ------------------------------ | -------------------------------------------------------------- | -------------------- | ------------------------------------------------------ | ------------------------------------------------ |
| `id`                           | *string*                                                       | :heavy\_check\_mark: | Unique identifier for the generation                   | gen-3bhGkxlo4XFrqiabUM7NDtwDzWwG                 |
| `upstreamId`                   | *string*                                                       | :heavy\_check\_mark: | Upstream provider's identifier for this generation     | chatcmpl-791bcf62-080e-4568-87d0-94c72e3b4946    |
| `totalCost`                    | *number*                                                       | :heavy\_check\_mark: | Total cost of the generation in USD                    | 0.0015                                           |
| `cacheDiscount`                | *number*                                                       | :heavy\_check\_mark: | Discount applied due to caching                        | 0.0002                                           |
| `upstreamInferenceCost`        | *number*                                                       | :heavy\_check\_mark: | Cost charged by the upstream provider                  | 0.0012                                           |
| `createdAt`                    | *string*                                                       | :heavy\_check\_mark: | ISO 8601 timestamp of when the generation was created  | 2024-07-15T23:33:19.433273+00:00                 |
| `model`                        | *string*                                                       | :heavy\_check\_mark: | Model used for the generation                          | sao10k/l3-stheno-8b                              |
| `appId`                        | *number*                                                       | :heavy\_check\_mark: | ID of the app that made the request                    | 12345                                            |
| `streamed`                     | *boolean*                                                      | :heavy\_check\_mark: | Whether the response was streamed                      | true                                             |
| `cancelled`                    | *boolean*                                                      | :heavy\_check\_mark: | Whether the generation was cancelled                   | false                                            |
| `providerName`                 | *string*                                                       | :heavy\_check\_mark: | Name of the provider that served the request           | Infermatic                                       |
| `latency`                      | *number*                                                       | :heavy\_check\_mark: | Total latency in milliseconds                          | 1250                                             |
| `moderationLatency`            | *number*                                                       | :heavy\_check\_mark: | Moderation latency in milliseconds                     | 50                                               |
| `generationTime`               | *number*                                                       | :heavy\_check\_mark: | Time taken for generation in milliseconds              | 1200                                             |
| `finishReason`                 | *string*                                                       | :heavy\_check\_mark: | Reason the generation finished                         | stop                                             |
| `tokensPrompt`                 | *number*                                                       | :heavy\_check\_mark: | Number of tokens in the prompt                         | 10                                               |
| `tokensCompletion`             | *number*                                                       | :heavy\_check\_mark: | Number of tokens in the completion                     | 25                                               |
| `nativeTokensPrompt`           | *number*                                                       | :heavy\_check\_mark: | Native prompt tokens as reported by provider           | 10                                               |
| `nativeTokensCompletion`       | *number*                                                       | :heavy\_check\_mark: | Native completion tokens as reported by provider       | 25                                               |
| `nativeTokensCompletionImages` | *number*                                                       | :heavy\_check\_mark: | Native completion image tokens as reported by provider | 0                                                |
| `nativeTokensReasoning`        | *number*                                                       | :heavy\_check\_mark: | Native reasoning tokens as reported by provider        | 5                                                |
| `nativeTokensCached`           | *number*                                                       | :heavy\_check\_mark: | Native cached tokens as reported by provider           | 3                                                |
| `numMediaPrompt`               | *number*                                                       | :heavy\_check\_mark: | Number of media items in the prompt                    | 1                                                |
| `numInputAudioPrompt`          | *number*                                                       | :heavy\_check\_mark: | Number of audio inputs in the prompt                   | 0                                                |
| `numMediaCompletion`           | *number*                                                       | :heavy\_check\_mark: | Number of media items in the completion                | 0                                                |
| `numSearchResults`             | *number*                                                       | :heavy\_check\_mark: | Number of search results included                      | 5                                                |
| `origin`                       | *string*                                                       | :heavy\_check\_mark: | Origin URL of the request                              | [https://openrouter.ai/](https://openrouter.ai/) |
| `usage`                        | *number*                                                       | :heavy\_check\_mark: | Usage amount in USD                                    | 0.0015                                           |
| `isByok`                       | *boolean*                                                      | :heavy\_check\_mark: | Whether this used bring-your-own-key                   | false                                            |
| `nativeFinishReason`           | *string*                                                       | :heavy\_check\_mark: | Native finish reason as reported by provider           | stop                                             |
| `externalUser`                 | *string*                                                       | :heavy\_check\_mark: | External user identifier                               | user-123                                         |
| `apiType`                      | [operations.ApiType](/agent-sdk/typescript/operations/apitype) | :heavy\_check\_mark: | Type of API used for the generation                    |                                                  |
| `router`                       | *string*                                                       | :heavy\_check\_mark: | Router used for the request (e.g., openrouter/auto)    | openrouter/auto                                  |
