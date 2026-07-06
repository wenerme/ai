> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ForbiddenResponseError - TypeScript SDK

> ForbiddenResponseError type definition

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

| Field                | Type                                                                                                       | Required             | Description                      | Example                                                                      |
| -------------------- | ---------------------------------------------------------------------------------------------------------- | -------------------- | -------------------------------- | ---------------------------------------------------------------------------- |
| `error`              | [models.ForbiddenResponseErrorData](/agent-sdk/typescript/api-reference/models/forbiddenresponseerrordata) | :heavy\_check\_mark: | Error data for ForbiddenResponse | `{"code": 403,"message": "Only management keys can perform this operation"}` |
| `openrouterMetadata` | `Record<string, *any*>`                                                                                    | :heavy\_minus\_sign: | N/A                              |                                                                              |
| `userId`             | *string*                                                                                                   | :heavy\_minus\_sign: | N/A                              |                                                                              |
