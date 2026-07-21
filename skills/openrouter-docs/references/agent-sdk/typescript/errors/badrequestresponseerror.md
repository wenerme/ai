> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# BadRequestResponseError - TypeScript SDK

> BadRequestResponseError method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Bad Request - Invalid request parameters or malformed input

## Example Usage

```typescript lines theme={null}
import { BadRequestResponseError } from "@openrouter/sdk/models/errors";

// No examples available for this model
```

## Fields

| Field    | Type                                                                                           | Required             | Description                       | Example                                                 |
| -------- | ---------------------------------------------------------------------------------------------- | -------------------- | --------------------------------- | ------------------------------------------------------- |
| `error`  | [models.BadRequestResponseErrorData](/docs/agent-sdk/typescript/models/badrequestresponseerrordata) | :heavy\_check\_mark: | Error data for BadRequestResponse | `{"code": 400,"message": "Invalid request parameters"}` |
| `userId` | *string*                                                                                       | :heavy\_minus\_sign: | N/A                               |                                                         |
