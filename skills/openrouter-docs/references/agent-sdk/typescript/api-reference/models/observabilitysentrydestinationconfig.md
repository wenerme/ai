> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ObservabilitySentryDestinationConfig - TypeScript SDK

> ObservabilitySentryDestinationConfig type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { ObservabilitySentryDestinationConfig } from "@openrouter/sdk/models";

let value: ObservabilitySentryDestinationConfig = {
  dsn: "<value>",
  otlpEndpoint: "<value>",
};
```

## Fields

| Field          | Type                       | Required             | Description                                                     |
| -------------- | -------------------------- | -------------------- | --------------------------------------------------------------- |
| `dsn`          | *string*                   | :heavy\_check\_mark: | N/A                                                             |
| `headers`      | `Record<string, *string*>` | :heavy\_minus\_sign: | Custom HTTP headers to include in requests to this destination. |
| `otlpEndpoint` | *string*                   | :heavy\_check\_mark: | N/A                                                             |
