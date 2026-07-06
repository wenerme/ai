> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ObservabilitySnowflakeDestinationConfig - TypeScript SDK

> ObservabilitySnowflakeDestinationConfig type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { ObservabilitySnowflakeDestinationConfig } from "@openrouter/sdk/models";

let value: ObservabilitySnowflakeDestinationConfig = {
  account: "93697714",
  token: "<value>",
};
```

## Fields

| Field       | Type                       | Required             | Description                                                     |
| ----------- | -------------------------- | -------------------- | --------------------------------------------------------------- |
| `account`   | *string*                   | :heavy\_check\_mark: | N/A                                                             |
| `database`  | *string*                   | :heavy\_minus\_sign: | N/A                                                             |
| `headers`   | `Record<string, *string*>` | :heavy\_minus\_sign: | Custom HTTP headers to include in requests to this destination. |
| `schema`    | *string*                   | :heavy\_minus\_sign: | N/A                                                             |
| `table`     | *string*                   | :heavy\_minus\_sign: | N/A                                                             |
| `token`     | *string*                   | :heavy\_check\_mark: | N/A                                                             |
| `warehouse` | *string*                   | :heavy\_minus\_sign: | N/A                                                             |
