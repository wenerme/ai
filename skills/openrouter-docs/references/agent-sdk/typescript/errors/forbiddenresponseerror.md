> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ForbiddenResponseError - TypeScript SDK

> ForbiddenResponseError method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Forbidden - Authentication successful but insufficient permissions

## Example Usage

```typescript lines theme={null}
import { ForbiddenResponseError } from "@openrouter/sdk/models/errors";

// No examples available for this model
```

## Fields

| Field    | Type                                                                                         | Required             | Description                      | Example                                                                        |
| -------- | -------------------------------------------------------------------------------------------- | -------------------- | -------------------------------- | ------------------------------------------------------------------------------ |
| `error`  | [models.ForbiddenResponseErrorData](/docs/agent-sdk/typescript/models/forbiddenresponseerrordata) | :heavy\_check\_mark: | Error data for ForbiddenResponse | `{"code": 403,"message": "Only provisioning keys can perform this operation"}` |
| `userId` | *string*                                                                                     | :heavy\_minus\_sign: | N/A                              |                                                                                |
