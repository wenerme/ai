> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# RequestTimeoutResponseError - TypeScript SDK

> RequestTimeoutResponseError type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Request Timeout - Operation exceeded time limit

## Example Usage

```typescript lines theme={null}
import { RequestTimeoutResponseError } from "@openrouter/sdk/models/errors";

// No examples available for this model
```

## Fields

| Field                | Type                                                                                                                 | Required             | Description                           | Example                                                                   |
| -------------------- | -------------------------------------------------------------------------------------------------------------------- | -------------------- | ------------------------------------- | ------------------------------------------------------------------------- |
| `error`              | [models.RequestTimeoutResponseErrorData](/docs/agent-sdk/typescript/api-reference/models/requesttimeoutresponseerrordata) | :heavy\_check\_mark: | Error data for RequestTimeoutResponse | `{"code": 408,"message": "Operation timed out. Please try again later."}` |
| `openrouterMetadata` | `Record<string, *any*>`                                                                                              | :heavy\_minus\_sign: | N/A                                   |                                                                           |
| `userId`             | *string*                                                                                                             | :heavy\_minus\_sign: | N/A                                   |                                                                           |
