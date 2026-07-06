> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# PayloadTooLargeResponseError - TypeScript SDK

> PayloadTooLargeResponseError type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Payload Too Large - Request payload exceeds size limits

## Example Usage

```typescript lines theme={null}
import { PayloadTooLargeResponseError } from "@openrouter/sdk/models/errors";

// No examples available for this model
```

## Fields

| Field                | Type                                                                                                                   | Required             | Description                            | Example                                                |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------- | -------------------- | -------------------------------------- | ------------------------------------------------------ |
| `error`              | [models.PayloadTooLargeResponseErrorData](/agent-sdk/typescript/api-reference/models/payloadtoolargeresponseerrordata) | :heavy\_check\_mark: | Error data for PayloadTooLargeResponse | `{"code": 413,"message": "Request payload too large"}` |
| `openrouterMetadata` | `Record<string, *any*>`                                                                                                | :heavy\_minus\_sign: | N/A                                    |                                                        |
| `userId`             | *string*                                                                                                               | :heavy\_minus\_sign: | N/A                                    |                                                        |
