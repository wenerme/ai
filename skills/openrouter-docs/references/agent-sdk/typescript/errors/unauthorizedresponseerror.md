> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# UnauthorizedResponseError - TypeScript SDK

> UnauthorizedResponseError method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Unauthorized - Authentication required or invalid credentials

## Example Usage

```typescript lines theme={null}
import { UnauthorizedResponseError } from "@openrouter/sdk/models/errors";

// No examples available for this model
```

## Fields

| Field    | Type                                                                                               | Required             | Description                         | Example                                                    |
| -------- | -------------------------------------------------------------------------------------------------- | -------------------- | ----------------------------------- | ---------------------------------------------------------- |
| `error`  | [models.UnauthorizedResponseErrorData](/agent-sdk/typescript/models/unauthorizedresponseerrordata) | :heavy\_check\_mark: | Error data for UnauthorizedResponse | `{"code": 401,"message": "Missing Authentication header"}` |
| `userId` | *string*                                                                                           | :heavy\_minus\_sign: | N/A                                 |                                                            |
