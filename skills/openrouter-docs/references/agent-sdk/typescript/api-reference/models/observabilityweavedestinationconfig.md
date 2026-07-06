> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ObservabilityWeaveDestinationConfig - TypeScript SDK

> ObservabilityWeaveDestinationConfig type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { ObservabilityWeaveDestinationConfig } from "@openrouter/sdk/models";

let value: ObservabilityWeaveDestinationConfig = {
  apiKey: "<value>",
  entity: "<value>",
  project: "<value>",
};
```

## Fields

| Field     | Type                       | Required             | Description                                                     |
| --------- | -------------------------- | -------------------- | --------------------------------------------------------------- |
| `apiKey`  | *string*                   | :heavy\_check\_mark: | N/A                                                             |
| `baseUrl` | *string*                   | :heavy\_minus\_sign: | N/A                                                             |
| `entity`  | *string*                   | :heavy\_check\_mark: | N/A                                                             |
| `headers` | `Record<string, *string*>` | :heavy\_minus\_sign: | Custom HTTP headers to include in requests to this destination. |
| `project` | *string*                   | :heavy\_check\_mark: | N/A                                                             |
