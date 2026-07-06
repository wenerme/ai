> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ConflictResponseError - TypeScript SDK

> ConflictResponseError type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Conflict - Resource conflict or concurrent modification

## Example Usage

```typescript lines theme={null}
import { ConflictResponseError } from "@openrouter/sdk/models/errors";

// No examples available for this model
```

## Fields

| Field                | Type                                                                                                     | Required             | Description                     | Example                                                                 |
| -------------------- | -------------------------------------------------------------------------------------------------------- | -------------------- | ------------------------------- | ----------------------------------------------------------------------- |
| `error`              | [models.ConflictResponseErrorData](/agent-sdk/typescript/api-reference/models/conflictresponseerrordata) | :heavy\_check\_mark: | Error data for ConflictResponse | `{"code": 409,"message": "Resource conflict. Please try again later."}` |
| `openrouterMetadata` | `Record<string, *any*>`                                                                                  | :heavy\_minus\_sign: | N/A                             |                                                                         |
| `userId`             | *string*                                                                                                 | :heavy\_minus\_sign: | N/A                             |                                                                         |
