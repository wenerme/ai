> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ObservabilityClickhouseDestinationConfig - TypeScript SDK

> ObservabilityClickhouseDestinationConfig type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { ObservabilityClickhouseDestinationConfig } from "@openrouter/sdk/models";

let value: ObservabilityClickhouseDestinationConfig = {
  database: "<value>",
  host: "evil-airbus.net",
  password: "cQ0oWoWiZp9fa9C",
  username: "Hyman.Stroman",
};
```

## Fields

| Field      | Type                       | Required             | Description                                                                            |
| ---------- | -------------------------- | -------------------- | -------------------------------------------------------------------------------------- |
| `database` | *string*                   | :heavy\_check\_mark: | N/A                                                                                    |
| `headers`  | `Record<string, *string*>` | :heavy\_minus\_sign: | Custom HTTP headers to include in requests to this destination.                        |
| `host`     | *string*                   | :heavy\_check\_mark: | N/A                                                                                    |
| `password` | *string*                   | :heavy\_check\_mark: | N/A                                                                                    |
| `table`    | *string*                   | :heavy\_minus\_sign: | N/A                                                                                    |
| `username` | *string*                   | :heavy\_check\_mark: | If you have not set a specific username in ClickHouse, simply type in 'default' below. |
