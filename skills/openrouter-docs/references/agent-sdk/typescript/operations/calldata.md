> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# CallData - TypeScript SDK

> CallData method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { CallData } from "@openrouter/sdk/models/operations";

let value: CallData = {
  deadline: "<value>",
  feeAmount: "<value>",
  id: "<id>",
  operator: "<value>",
  prefix: "<value>",
  recipient: "<value>",
  recipientAmount: "<value>",
  recipientCurrency: "<value>",
  refundDestination: "<value>",
  signature: "<value>",
};
```

## Fields

| Field               | Type     | Required             | Description |
| ------------------- | -------- | -------------------- | ----------- |
| `deadline`          | *string* | :heavy\_check\_mark: | N/A         |
| `feeAmount`         | *string* | :heavy\_check\_mark: | N/A         |
| `id`                | *string* | :heavy\_check\_mark: | N/A         |
| `operator`          | *string* | :heavy\_check\_mark: | N/A         |
| `prefix`            | *string* | :heavy\_check\_mark: | N/A         |
| `recipient`         | *string* | :heavy\_check\_mark: | N/A         |
| `recipientAmount`   | *string* | :heavy\_check\_mark: | N/A         |
| `recipientCurrency` | *string* | :heavy\_check\_mark: | N/A         |
| `refundDestination` | *string* | :heavy\_check\_mark: | N/A         |
| `signature`         | *string* | :heavy\_check\_mark: | N/A         |
