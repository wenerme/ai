> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ObservabilityWebhookDestinationConfig - TypeScript SDK

> ObservabilityWebhookDestinationConfig type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { ObservabilityWebhookDestinationConfig } from "@openrouter/sdk/models";

let value: ObservabilityWebhookDestinationConfig = {
  url: "https://pink-nucleotidase.info/",
};
```

## Fields

| Field     | Type                                                               | Required             | Description |
| --------- | ------------------------------------------------------------------ | -------------------- | ----------- |
| `headers` | `Record<string, *string*>`                                         | :heavy\_minus\_sign: | N/A         |
| `method`  | [models.Method](/docs/agent-sdk/typescript/api-reference/models/method) | :heavy\_minus\_sign: | N/A         |
| `url`     | *string*                                                           | :heavy\_check\_mark: | N/A         |
