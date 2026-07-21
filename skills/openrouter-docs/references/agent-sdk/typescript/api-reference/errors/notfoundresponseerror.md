> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# NotFoundResponseError - TypeScript SDK

> NotFoundResponseError type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Not Found - Resource does not exist

## Example Usage

```typescript lines theme={null}
import { NotFoundResponseError } from "@openrouter/sdk/models/errors";

// No examples available for this model
```

## Fields

| Field                | Type                                                                                                     | Required             | Description                     | Example                                         |
| -------------------- | -------------------------------------------------------------------------------------------------------- | -------------------- | ------------------------------- | ----------------------------------------------- |
| `error`              | [models.NotFoundResponseErrorData](/docs/agent-sdk/typescript/api-reference/models/notfoundresponseerrordata) | :heavy\_check\_mark: | Error data for NotFoundResponse | `{"code": 404,"message": "Resource not found"}` |
| `openrouterMetadata` | `Record<string, *any*>`                                                                                  | :heavy\_minus\_sign: | N/A                             |                                                 |
| `userId`             | *string*                                                                                                 | :heavy\_minus\_sign: | N/A                             |                                                 |
