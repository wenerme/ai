> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# TooManyRequestsResponseError - TypeScript SDK

> TooManyRequestsResponseError method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Too Many Requests - Rate limit exceeded

## Example Usage

```typescript lines theme={null}
import { TooManyRequestsResponseError } from "@openrouter/sdk/models/errors";

// No examples available for this model
```

## Fields

| Field    | Type                                                                                                     | Required             | Description                            | Example                                          |
| -------- | -------------------------------------------------------------------------------------------------------- | -------------------- | -------------------------------------- | ------------------------------------------------ |
| `error`  | [models.TooManyRequestsResponseErrorData](/docs/agent-sdk/typescript/models/toomanyrequestsresponseerrordata) | :heavy\_check\_mark: | Error data for TooManyRequestsResponse | `{"code": 429,"message": "Rate limit exceeded"}` |
| `userId` | *string*                                                                                                 | :heavy\_minus\_sign: | N/A                                    |                                                  |
