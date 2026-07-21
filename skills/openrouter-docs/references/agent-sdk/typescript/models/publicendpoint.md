> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# PublicEndpoint - TypeScript SDK

> PublicEndpoint method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Information about a specific model endpoint

## Example Usage

```typescript expandable lines theme={null}
import { PublicEndpoint } from "@openrouter/sdk/models";

let value: PublicEndpoint = {
  name: "OpenAI: GPT-4",
  modelName: "GPT-4",
  contextLength: 8192,
  pricing: {
    prompt: "0.00003",
    completion: "0.00006",
  },
  providerName: "OpenAI",
  tag: "openai",
  quantization: "fp16",
  maxCompletionTokens: 4096,
  maxPromptTokens: 8192,
  supportedParameters: [
    "temperature",
    "top_p",
    "max_tokens",
  ],
  uptimeLast30m: 99.5,
  supportsImplicitCaching: true,
  latencyLast30m: {
    p50: 0.25,
    p75: 0.35,
    p90: 0.48,
    p99: 0.85,
  },
  throughputLast30m: {
    p50: 45.2,
    p75: 38.5,
    p90: 28.3,
    p99: 15.1,
  },
};
```

## Fields

| Field                     | Type                                                                                         | Required             | Description                                                                                                                                                                                               | Example |
| ------------------------- | -------------------------------------------------------------------------------------------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `name`                    | *string*                                                                                     | :heavy\_check\_mark: | N/A                                                                                                                                                                                                       |         |
| `modelName`               | *string*                                                                                     | :heavy\_check\_mark: | N/A                                                                                                                                                                                                       |         |
| `contextLength`           | *number*                                                                                     | :heavy\_check\_mark: | N/A                                                                                                                                                                                                       |         |
| `pricing`                 | [models.Pricing](/docs/agent-sdk/typescript/models/pricing)                                       | :heavy\_check\_mark: | N/A                                                                                                                                                                                                       |         |
| `providerName`            | [models.ProviderName](/docs/agent-sdk/typescript/models/providername)                             | :heavy\_check\_mark: | N/A                                                                                                                                                                                                       | OpenAI  |
| `tag`                     | *string*                                                                                     | :heavy\_check\_mark: | N/A                                                                                                                                                                                                       |         |
| `quantization`            | [models.PublicEndpointQuantization](/docs/agent-sdk/typescript/models/publicendpointquantization) | :heavy\_check\_mark: | N/A                                                                                                                                                                                                       | fp16    |
| `maxCompletionTokens`     | *number*                                                                                     | :heavy\_check\_mark: | N/A                                                                                                                                                                                                       |         |
| `maxPromptTokens`         | *number*                                                                                     | :heavy\_check\_mark: | N/A                                                                                                                                                                                                       |         |
| `supportedParameters`     | [models.Parameter](/docs/agent-sdk/typescript/models/parameter)\[]                                | :heavy\_check\_mark: | N/A                                                                                                                                                                                                       |         |
| `status`                  | [models.EndpointStatus](/docs/agent-sdk/typescript/models/endpointstatus)                         | :heavy\_minus\_sign: | N/A                                                                                                                                                                                                       | 0       |
| `uptimeLast30m`           | *number*                                                                                     | :heavy\_check\_mark: | N/A                                                                                                                                                                                                       |         |
| `supportsImplicitCaching` | *boolean*                                                                                    | :heavy\_check\_mark: | N/A                                                                                                                                                                                                       |         |
| `latencyLast30m`          | [models.PercentileStats](/docs/agent-sdk/typescript/models/percentilestats)                       | :heavy\_check\_mark: | Latency percentiles in milliseconds over the last 30 minutes. Latency measures time to first token. Only visible when authenticated with an API key or cookie; returns null for unauthenticated requests. |         |
| `throughputLast30m`       | [models.PercentileStats](/docs/agent-sdk/typescript/models/percentilestats)                       | :heavy\_check\_mark: | N/A                                                                                                                                                                                                       |         |
