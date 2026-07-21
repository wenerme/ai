> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# PublicEndpoint - TypeScript SDK

> PublicEndpoint type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Information about a specific model endpoint

## Example Usage

```typescript expandable lines theme={null}
import { PublicEndpoint } from "@openrouter/sdk/models";

let value: PublicEndpoint = {
  contextLength: 8192,
  latencyLast30m: {
    p50: 0.25,
    p75: 0.35,
    p90: 0.48,
    p99: 0.85,
  },
  maxCompletionTokens: 4096,
  maxPromptTokens: 8192,
  modelId: "openai/gpt-4",
  modelName: "GPT-4",
  name: "OpenAI: GPT-4",
  pricing: {
    completion: "0.00006",
    prompt: "0.00003",
  },
  providerName: "OpenAI",
  quantization: "fp16",
  supportedParameters: [
    "temperature",
    "top_p",
    "max_tokens",
  ],
  supportsImplicitCaching: true,
  tag: "openai",
  throughputLast30m: {
    p50: 45.2,
    p75: 38.5,
    p90: 28.3,
    p99: 15.1,
  },
  uptimeLast1d: 99.8,
  uptimeLast30m: 99.5,
  uptimeLast5m: 100,
};
```

## Fields

| Field                     | Type                                                                                                       | Required             | Description                                                                                                                                                                                               | Example                                             |
| ------------------------- | ---------------------------------------------------------------------------------------------------------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| `contextLength`           | *number*                                                                                                   | :heavy\_check\_mark: | N/A                                                                                                                                                                                                       |                                                     |
| `latencyLast30m`          | [models.PercentileStats](/docs/agent-sdk/typescript/api-reference/models/percentilestats)                       | :heavy\_check\_mark: | Latency percentiles in milliseconds over the last 30 minutes. Latency measures time to first token. Only visible when authenticated with an API key or cookie; returns null for unauthenticated requests. | `{"p50": 25.5,"p75": 35.2,"p90": 48.7,"p99": 85.3}` |
| `maxCompletionTokens`     | *number*                                                                                                   | :heavy\_check\_mark: | N/A                                                                                                                                                                                                       |                                                     |
| `maxPromptTokens`         | *number*                                                                                                   | :heavy\_check\_mark: | N/A                                                                                                                                                                                                       |                                                     |
| `modelId`                 | *string*                                                                                                   | :heavy\_check\_mark: | The unique identifier for the model (permaslug)                                                                                                                                                           | openai/gpt-4                                        |
| `modelName`               | *string*                                                                                                   | :heavy\_check\_mark: | N/A                                                                                                                                                                                                       |                                                     |
| `name`                    | *string*                                                                                                   | :heavy\_check\_mark: | N/A                                                                                                                                                                                                       |                                                     |
| `pricing`                 | [models.Pricing](/docs/agent-sdk/typescript/api-reference/models/pricing)                                       | :heavy\_check\_mark: | N/A                                                                                                                                                                                                       |                                                     |
| `providerName`            | [models.ProviderName](/docs/agent-sdk/typescript/api-reference/models/providername)                             | :heavy\_check\_mark: | N/A                                                                                                                                                                                                       | OpenAI                                              |
| `quantization`            | [models.PublicEndpointQuantization](/docs/agent-sdk/typescript/api-reference/models/publicendpointquantization) | :heavy\_check\_mark: | N/A                                                                                                                                                                                                       | fp16                                                |
| `status`                  | [models.EndpointStatus](/docs/agent-sdk/typescript/api-reference/models/endpointstatus)                         | :heavy\_minus\_sign: | N/A                                                                                                                                                                                                       | 0                                                   |
| `supportedParameters`     | [models.Parameter](/docs/agent-sdk/typescript/api-reference/models/parameter)\[]                                | :heavy\_check\_mark: | N/A                                                                                                                                                                                                       |                                                     |
| `supportsImplicitCaching` | *boolean*                                                                                                  | :heavy\_check\_mark: | N/A                                                                                                                                                                                                       |                                                     |
| `tag`                     | *string*                                                                                                   | :heavy\_check\_mark: | N/A                                                                                                                                                                                                       |                                                     |
| `throughputLast30m`       | [models.PercentileStats](/docs/agent-sdk/typescript/api-reference/models/percentilestats)                       | :heavy\_check\_mark: | N/A                                                                                                                                                                                                       | `{"p50": 25.5,"p75": 35.2,"p90": 48.7,"p99": 85.3}` |
| `uptimeLast1d`            | *number*                                                                                                   | :heavy\_check\_mark: | Uptime percentage over the last 1 day, calculated as successful requests / (successful + error requests) \* 100. Rate-limited requests are excluded. Returns null if insufficient data.                   |                                                     |
| `uptimeLast30m`           | *number*                                                                                                   | :heavy\_check\_mark: | N/A                                                                                                                                                                                                       |                                                     |
| `uptimeLast5m`            | *number*                                                                                                   | :heavy\_check\_mark: | Uptime percentage over the last 5 minutes, calculated as successful requests / (successful + error requests) \* 100. Rate-limited requests are excluded. Returns null if insufficient data.               |                                                     |
