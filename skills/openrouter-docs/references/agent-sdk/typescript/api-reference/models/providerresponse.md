> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ProviderResponse - TypeScript SDK

> ProviderResponse type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Details of a provider response for a generation attempt

## Example Usage

```typescript lines theme={null}
import { ProviderResponse } from "@openrouter/sdk/models";

let value: ProviderResponse = {
  status: 200,
};
```

## Fields

| Field            | Type                                                                                                           | Required             | Description                                   | Example         |
| ---------------- | -------------------------------------------------------------------------------------------------------------- | -------------------- | --------------------------------------------- | --------------- |
| `endpointId`     | *string*                                                                                                       | :heavy\_minus\_sign: | Internal endpoint identifier                  | ep\_abc123      |
| `id`             | *string*                                                                                                       | :heavy\_minus\_sign: | Upstream provider response identifier         | chatcmpl-abc123 |
| `isByok`         | *boolean*                                                                                                      | :heavy\_minus\_sign: | Whether the request used a bring-your-own-key | false           |
| `latency`        | *number*                                                                                                       | :heavy\_minus\_sign: | Response latency in milliseconds              | 1200            |
| `modelPermaslug` | *string*                                                                                                       | :heavy\_minus\_sign: | Canonical model slug                          | openai/gpt-4    |
| `providerName`   | [models.ProviderResponseProviderName](/docs/agent-sdk/typescript/api-reference/models/providerresponseprovidername) | :heavy\_minus\_sign: | Name of the provider                          | OpenAI          |
| `status`         | *number*                                                                                                       | :heavy\_check\_mark: | HTTP status code from the provider            | 200             |
