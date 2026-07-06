> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# EdgeNetworkTimeoutResponseError - TypeScript SDK

> EdgeNetworkTimeoutResponseError method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Infrastructure Timeout - Provider request timed out at edge network

## Example Usage

```typescript lines theme={null}
import { EdgeNetworkTimeoutResponseError } from "@openrouter/sdk/models/errors";

// No examples available for this model
```

## Fields

| Field    | Type                                                                                                           | Required             | Description                               | Example                                                                 |
| -------- | -------------------------------------------------------------------------------------------------------------- | -------------------- | ----------------------------------------- | ----------------------------------------------------------------------- |
| `error`  | [models.EdgeNetworkTimeoutResponseErrorData](/agent-sdk/typescript/models/edgenetworktimeoutresponseerrordata) | :heavy\_check\_mark: | Error data for EdgeNetworkTimeoutResponse | `{"code": 524,"message": "Request timed out. Please try again later."}` |
| `userId` | *string*                                                                                                       | :heavy\_minus\_sign: | N/A                                       |                                                                         |
