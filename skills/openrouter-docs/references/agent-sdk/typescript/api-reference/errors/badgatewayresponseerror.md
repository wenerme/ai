> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# BadGatewayResponseError - TypeScript SDK

> BadGatewayResponseError type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Bad Gateway - Provider/upstream API failure

## Example Usage

```typescript lines theme={null}
import { BadGatewayResponseError } from "@openrouter/sdk/models/errors";

// No examples available for this model
```

## Fields

| Field                | Type                                                                                                         | Required             | Description                       | Example                                              |
| -------------------- | ------------------------------------------------------------------------------------------------------------ | -------------------- | --------------------------------- | ---------------------------------------------------- |
| `error`              | [models.BadGatewayResponseErrorData](/agent-sdk/typescript/api-reference/models/badgatewayresponseerrordata) | :heavy\_check\_mark: | Error data for BadGatewayResponse | `{"code": 502,"message": "Provider returned error"}` |
| `openrouterMetadata` | `Record<string, *any*>`                                                                                      | :heavy\_minus\_sign: | N/A                               |                                                      |
| `userId`             | *string*                                                                                                     | :heavy\_minus\_sign: | N/A                               |                                                      |
