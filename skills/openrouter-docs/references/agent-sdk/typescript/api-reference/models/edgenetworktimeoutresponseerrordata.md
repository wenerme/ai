> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# EdgeNetworkTimeoutResponseErrorData - TypeScript SDK

> EdgeNetworkTimeoutResponseErrorData type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Error data for EdgeNetworkTimeoutResponse

## Example Usage

```typescript lines theme={null}
import { EdgeNetworkTimeoutResponseErrorData } from "@openrouter/sdk/models";

let value: EdgeNetworkTimeoutResponseErrorData = {
  code: 524,
  message: "Request timed out. Please try again later.",
};
```

## Fields

| Field      | Type                    | Required             | Description |
| ---------- | ----------------------- | -------------------- | ----------- |
| `code`     | *number*                | :heavy\_check\_mark: | N/A         |
| `message`  | *string*                | :heavy\_check\_mark: | N/A         |
| `metadata` | `Record<string, *any*>` | :heavy\_minus\_sign: | N/A         |
