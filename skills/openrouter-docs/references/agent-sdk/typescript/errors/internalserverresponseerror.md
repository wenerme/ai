> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# InternalServerResponseError - TypeScript SDK

> InternalServerResponseError method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Internal Server Error - Unexpected server error

## Example Usage

```typescript lines theme={null}
import { InternalServerResponseError } from "@openrouter/sdk/models/errors";

// No examples available for this model
```

## Fields

| Field    | Type                                                                                                   | Required             | Description                           | Example                                            |
| -------- | ------------------------------------------------------------------------------------------------------ | -------------------- | ------------------------------------- | -------------------------------------------------- |
| `error`  | [models.InternalServerResponseErrorData](/agent-sdk/typescript/models/internalserverresponseerrordata) | :heavy\_check\_mark: | Error data for InternalServerResponse | `{"code": 500,"message": "Internal Server Error"}` |
| `userId` | *string*                                                                                               | :heavy\_minus\_sign: | N/A                                   |                                                    |
