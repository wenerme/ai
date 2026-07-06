> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ObservabilityArizeDestinationConfig - TypeScript SDK

> ObservabilityArizeDestinationConfig type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { ObservabilityArizeDestinationConfig } from "@openrouter/sdk/models";

let value: ObservabilityArizeDestinationConfig = {
  apiKey: "<value>",
  modelId: "<id>",
  spaceKey: "<value>",
};
```

## Fields

| Field      | Type                       | Required             | Description                                                     |
| ---------- | -------------------------- | -------------------- | --------------------------------------------------------------- |
| `apiKey`   | *string*                   | :heavy\_check\_mark: | N/A                                                             |
| `baseUrl`  | *string*                   | :heavy\_minus\_sign: | N/A                                                             |
| `headers`  | `Record<string, *string*>` | :heavy\_minus\_sign: | Custom HTTP headers to include in requests to this destination. |
| `modelId`  | *string*                   | :heavy\_check\_mark: | N/A                                                             |
| `spaceKey` | *string*                   | :heavy\_check\_mark: | N/A                                                             |
