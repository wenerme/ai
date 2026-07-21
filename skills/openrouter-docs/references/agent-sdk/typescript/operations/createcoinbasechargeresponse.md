> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# CreateCoinbaseChargeResponse - TypeScript SDK

> CreateCoinbaseChargeResponse method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Returns the calldata to fulfill the transaction

## Example Usage

```typescript expandable lines theme={null}
import { CreateCoinbaseChargeResponse } from "@openrouter/sdk/models/operations";

let value: CreateCoinbaseChargeResponse = {
  data: {
    id: "<id>",
    createdAt: "1723897831264",
    expiresAt: "1744713163031",
    web3Data: {
      transferIntent: {
        callData: {
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
        },
        metadata: {
          chainId: 7497.17,
          contractAddress: "<value>",
          sender: "<value>",
        },
      },
    },
  },
};
```

## Fields

| Field  | Type                                                                                             | Required             | Description |
| ------ | ------------------------------------------------------------------------------------------------ | -------------------- | ----------- |
| `data` | [operations.CreateCoinbaseChargeData](/docs/agent-sdk/typescript/operations/createcoinbasechargedata) | :heavy\_check\_mark: | N/A         |
