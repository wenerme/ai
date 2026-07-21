> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# PaymentRequiredResponseError - TypeScript SDK

> PaymentRequiredResponseError type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Payment Required - Insufficient credits or quota to complete request

## Example Usage

```typescript lines theme={null}
import { PaymentRequiredResponseError } from "@openrouter/sdk/models/errors";

// No examples available for this model
```

## Fields

| Field                | Type                                                                                                                   | Required             | Description                            | Example                                                                                         |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------- | -------------------- | -------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `error`              | [models.PaymentRequiredResponseErrorData](/docs/agent-sdk/typescript/api-reference/models/paymentrequiredresponseerrordata) | :heavy\_check\_mark: | Error data for PaymentRequiredResponse | `{"code": 402,"message": "Insufficient credits. Add more using https://openrouter.ai/credits"}` |
| `openrouterMetadata` | `Record<string, *any*>`                                                                                                | :heavy\_minus\_sign: | N/A                                    |                                                                                                 |
| `userId`             | *string*                                                                                                               | :heavy\_minus\_sign: | N/A                                    |                                                                                                 |
