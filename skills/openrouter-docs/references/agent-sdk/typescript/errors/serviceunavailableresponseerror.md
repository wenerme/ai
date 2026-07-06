> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ServiceUnavailableResponseError - TypeScript SDK

> ServiceUnavailableResponseError method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Service Unavailable - Service temporarily unavailable

## Example Usage

```typescript lines theme={null}
import { ServiceUnavailableResponseError } from "@openrouter/sdk/models/errors";

// No examples available for this model
```

## Fields

| Field    | Type                                                                                                           | Required             | Description                               | Example                                                      |
| -------- | -------------------------------------------------------------------------------------------------------------- | -------------------- | ----------------------------------------- | ------------------------------------------------------------ |
| `error`  | [models.ServiceUnavailableResponseErrorData](/agent-sdk/typescript/models/serviceunavailableresponseerrordata) | :heavy\_check\_mark: | Error data for ServiceUnavailableResponse | `{"code": 503,"message": "Service temporarily unavailable"}` |
| `userId` | *string*                                                                                                       | :heavy\_minus\_sign: | N/A                                       |                                                              |
