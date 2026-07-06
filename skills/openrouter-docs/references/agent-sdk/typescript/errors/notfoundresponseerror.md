> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# NotFoundResponseError - TypeScript SDK

> NotFoundResponseError method reference

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

| Field    | Type                                                                                       | Required             | Description                     | Example                                         |
| -------- | ------------------------------------------------------------------------------------------ | -------------------- | ------------------------------- | ----------------------------------------------- |
| `error`  | [models.NotFoundResponseErrorData](/agent-sdk/typescript/models/notfoundresponseerrordata) | :heavy\_check\_mark: | Error data for NotFoundResponse | `{"code": 404,"message": "Resource not found"}` |
| `userId` | *string*                                                                                   | :heavy\_minus\_sign: | N/A                             |                                                 |
