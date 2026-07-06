> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# GenerationResponseData - TypeScript SDK

> GenerationResponseData type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Generation data

## Example Usage

```typescript expandable lines theme={null}
import { GenerationResponseData } from "@openrouter/sdk/models";

let value: GenerationResponseData = {
  apiType: "tts",
  appId: 12345,
  cacheDiscount: 0.0002,
  cancelled: false,
  createdAt: "2024-07-15T23:33:19.433273+00:00",
  externalUser: "user-123",
  finishReason: "stop",
  generationTime: 1200,
  httpReferer: "<value>",
  id: "gen-3bhGkxlo4XFrqiabUM7NDtwDzWwG",
  isByok: false,
  latency: 1250,
  model: "sao10k/l3-stheno-8b",
  moderationLatency: 50,
  nativeFinishReason: "stop",
  nativeTokensCached: 3,
  nativeTokensCompletion: 25,
  nativeTokensCompletionImages: 0,
  nativeTokensPrompt: 10,
  nativeTokensReasoning: 5,
  numFetches: 0,
  numInputAudioPrompt: 0,
  numMediaCompletion: 0,
  numMediaPrompt: 1,
  numSearchResults: 5,
  origin: "https://openrouter.ai/",
  presetId: "a9e8d400-592a-494f-908c-375efa66cafd",
  providerName: "Infermatic",
  providerResponses: [
    {
      status: 200,
    },
  ],
  router: "openrouter/auto",
  serviceTier: "priority",
  streamed: true,
  tokensCompletion: 25,
  tokensPrompt: 10,
  totalCost: 0.0015,
  upstreamId: "chatcmpl-791bcf62-080e-4568-87d0-94c72e3b4946",
  upstreamInferenceCost: 0.0012,
  usage: 0.0015,
  userAgent: "<value>",
  webSearchEngine: "exa",
};
```

## Fields

| Field                          | Type                                                                                      | Required             | Description                                                                                             | Example                                          |
| ------------------------------ | ----------------------------------------------------------------------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| `apiType`                      | [models.ApiType](/agent-sdk/typescript/api-reference/models/apitype)                      | :heavy\_check\_mark: | Type of API used for the generation                                                                     |                                                  |
| `appId`                        | *number*                                                                                  | :heavy\_check\_mark: | ID of the app that made the request                                                                     | 12345                                            |
| `cacheDiscount`                | *number*                                                                                  | :heavy\_check\_mark: | Discount applied due to caching                                                                         | 0.0002                                           |
| `cancelled`                    | *boolean*                                                                                 | :heavy\_check\_mark: | Whether the generation was cancelled                                                                    | false                                            |
| `createdAt`                    | *string*                                                                                  | :heavy\_check\_mark: | ISO 8601 timestamp of when the generation was created                                                   | 2024-07-15T23:33:19.433273+00:00                 |
| `externalUser`                 | *string*                                                                                  | :heavy\_check\_mark: | External user identifier                                                                                | user-123                                         |
| `finishReason`                 | *string*                                                                                  | :heavy\_check\_mark: | Reason the generation finished                                                                          | stop                                             |
| `generationTime`               | *number*                                                                                  | :heavy\_check\_mark: | Time taken for generation in milliseconds                                                               | 1200                                             |
| `httpReferer`                  | *string*                                                                                  | :heavy\_check\_mark: | Referer header from the request                                                                         |                                                  |
| `id`                           | *string*                                                                                  | :heavy\_check\_mark: | Unique identifier for the generation                                                                    | gen-3bhGkxlo4XFrqiabUM7NDtwDzWwG                 |
| `isByok`                       | *boolean*                                                                                 | :heavy\_check\_mark: | Whether this used bring-your-own-key                                                                    | false                                            |
| `latency`                      | *number*                                                                                  | :heavy\_check\_mark: | Total latency in milliseconds                                                                           | 1250                                             |
| `model`                        | *string*                                                                                  | :heavy\_check\_mark: | Model used for the generation                                                                           | sao10k/l3-stheno-8b                              |
| `moderationLatency`            | *number*                                                                                  | :heavy\_check\_mark: | Moderation latency in milliseconds                                                                      | 50                                               |
| `nativeFinishReason`           | *string*                                                                                  | :heavy\_check\_mark: | Native finish reason as reported by provider                                                            | stop                                             |
| `nativeTokensCached`           | *number*                                                                                  | :heavy\_check\_mark: | Native cached tokens as reported by provider                                                            | 3                                                |
| `nativeTokensCompletion`       | *number*                                                                                  | :heavy\_check\_mark: | Native completion tokens as reported by provider                                                        | 25                                               |
| `nativeTokensCompletionImages` | *number*                                                                                  | :heavy\_check\_mark: | Native completion image tokens as reported by provider                                                  | 0                                                |
| `nativeTokensPrompt`           | *number*                                                                                  | :heavy\_check\_mark: | Native prompt tokens as reported by provider                                                            | 10                                               |
| `nativeTokensReasoning`        | *number*                                                                                  | :heavy\_check\_mark: | Native reasoning tokens as reported by provider                                                         | 5                                                |
| `numFetches`                   | *number*                                                                                  | :heavy\_check\_mark: | Number of web fetches performed                                                                         | 0                                                |
| `numInputAudioPrompt`          | *number*                                                                                  | :heavy\_check\_mark: | Number of audio inputs in the prompt                                                                    | 0                                                |
| `numMediaCompletion`           | *number*                                                                                  | :heavy\_check\_mark: | Number of media items in the completion                                                                 | 0                                                |
| `numMediaPrompt`               | *number*                                                                                  | :heavy\_check\_mark: | Number of media items in the prompt                                                                     | 1                                                |
| `numSearchResults`             | *number*                                                                                  | :heavy\_check\_mark: | Number of search results included                                                                       | 5                                                |
| `origin`                       | *string*                                                                                  | :heavy\_check\_mark: | Origin URL of the request                                                                               | [https://openrouter.ai/](https://openrouter.ai/) |
| `presetId`                     | *string*                                                                                  | :heavy\_check\_mark: | ID of the preset used for this generation, null if no preset was used                                   | a9e8d400-592a-494f-908c-375efa66cafd             |
| `providerName`                 | *string*                                                                                  | :heavy\_check\_mark: | Name of the provider that served the request                                                            | Infermatic                                       |
| `providerResponses`            | [models.ProviderResponse](/agent-sdk/typescript/api-reference/models/providerresponse)\[] | :heavy\_check\_mark: | List of provider responses for this generation, including fallback attempts                             |                                                  |
| `requestId`                    | *string*                                                                                  | :heavy\_minus\_sign: | Unique identifier grouping all generations from a single API request                                    | req-1727282430-aBcDeFgHiJkLmNoPqRsT              |
| `responseCacheSourceId`        | *string*                                                                                  | :heavy\_minus\_sign: | If this generation was served from response cache, contains the original generation ID. Null otherwise. |                                                  |
| `router`                       | *string*                                                                                  | :heavy\_check\_mark: | Router used for the request (e.g., openrouter/auto)                                                     | openrouter/auto                                  |
| `serviceTier`                  | *string*                                                                                  | :heavy\_check\_mark: | Service tier the upstream provider reported running this request on, or null if it did not report one.  | priority                                         |
| `sessionId`                    | *string*                                                                                  | :heavy\_minus\_sign: | Session identifier grouping multiple generations in the same session                                    |                                                  |
| `streamed`                     | *boolean*                                                                                 | :heavy\_check\_mark: | Whether the response was streamed                                                                       | true                                             |
| `tokensCompletion`             | *number*                                                                                  | :heavy\_check\_mark: | Number of tokens in the completion                                                                      | 25                                               |
| `tokensPrompt`                 | *number*                                                                                  | :heavy\_check\_mark: | Number of tokens in the prompt                                                                          | 10                                               |
| `totalCost`                    | *number*                                                                                  | :heavy\_check\_mark: | Total cost of the generation in USD                                                                     | 0.0015                                           |
| `upstreamId`                   | *string*                                                                                  | :heavy\_check\_mark: | Upstream provider's identifier for this generation                                                      | chatcmpl-791bcf62-080e-4568-87d0-94c72e3b4946    |
| `upstreamInferenceCost`        | *number*                                                                                  | :heavy\_check\_mark: | Cost charged by the upstream provider                                                                   | 0.0012                                           |
| `usage`                        | *number*                                                                                  | :heavy\_check\_mark: | Usage amount in USD                                                                                     | 0.0015                                           |
| `userAgent`                    | *string*                                                                                  | :heavy\_check\_mark: | User-Agent header from the request                                                                      |                                                  |
| `webSearchEngine`              | *string*                                                                                  | :heavy\_check\_mark: | The resolved web search engine used for this generation (e.g. exa, firecrawl, parallel)                 | exa                                              |
