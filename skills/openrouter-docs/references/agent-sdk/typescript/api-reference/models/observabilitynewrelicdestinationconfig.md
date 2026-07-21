> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ObservabilityNewrelicDestinationConfig - TypeScript SDK

> ObservabilityNewrelicDestinationConfig type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { ObservabilityNewrelicDestinationConfig } from "@openrouter/sdk/models";

let value: ObservabilityNewrelicDestinationConfig = {
  licenseKey: "<value>",
};
```

## Fields

| Field        | Type                                                               | Required             | Description                                                     |
| ------------ | ------------------------------------------------------------------ | -------------------- | --------------------------------------------------------------- |
| `headers`    | `Record<string, *string*>`                                         | :heavy\_minus\_sign: | Custom HTTP headers to include in requests to this destination. |
| `licenseKey` | *string*                                                           | :heavy\_check\_mark: | N/A                                                             |
| `region`     | [models.Region](/docs/agent-sdk/typescript/api-reference/models/region) | :heavy\_minus\_sign: | N/A                                                             |
