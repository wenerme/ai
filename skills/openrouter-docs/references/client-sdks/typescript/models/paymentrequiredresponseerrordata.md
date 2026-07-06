> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# PaymentRequiredResponseErrorData - TypeScript SDK

> PaymentRequiredResponseErrorData method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Error data for PaymentRequiredResponse

## Example Usage

```typescript lines theme={null}
import { PaymentRequiredResponseErrorData } from "@openrouter/sdk/models";

let value: PaymentRequiredResponseErrorData = {
  code: 402,
  message: "Insufficient credits. Add more using https://openrouter.ai/credits",
};
```

## Fields

| Field      | Type                    | Required             | Description |
| ---------- | ----------------------- | -------------------- | ----------- |
| `code`     | *number*                | :heavy\_check\_mark: | N/A         |
| `message`  | *string*                | :heavy\_check\_mark: | N/A         |
| `metadata` | `Record<string, *any*>` | :heavy\_minus\_sign: | N/A         |
