> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# UnprocessableEntityResponseError - TypeScript SDK

> UnprocessableEntityResponseError type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Unprocessable Entity - Semantic validation failure

## Example Usage

```typescript lines theme={null}
import { UnprocessableEntityResponseError } from "@openrouter/sdk/models/errors";

// No examples available for this model
```

## Fields

| Field                | Type                                                                                                                           | Required             | Description                                | Example                                       |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------ | -------------------- | ------------------------------------------ | --------------------------------------------- |
| `error`              | [models.UnprocessableEntityResponseErrorData](/agent-sdk/typescript/api-reference/models/unprocessableentityresponseerrordata) | :heavy\_check\_mark: | Error data for UnprocessableEntityResponse | `{"code": 422,"message": "Invalid argument"}` |
| `openrouterMetadata` | `Record<string, *any*>`                                                                                                        | :heavy\_minus\_sign: | N/A                                        |                                               |
| `userId`             | *string*                                                                                                                       | :heavy\_minus\_sign: | N/A                                        |                                               |
