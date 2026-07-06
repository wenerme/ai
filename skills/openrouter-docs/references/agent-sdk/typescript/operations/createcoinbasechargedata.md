> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# CreateCoinbaseChargeData - TypeScript SDK

> CreateCoinbaseChargeData method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript expandable lines theme={null}
import { CreateCoinbaseChargeData } from "@openrouter/sdk/models/operations";

let value: CreateCoinbaseChargeData = {
  id: "<id>",
  createdAt: "1730810681036",
  expiresAt: "1742058293127",
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
};
```

## Fields

| Field       | Type                                                             | Required             | Description |
| ----------- | ---------------------------------------------------------------- | -------------------- | ----------- |
| `id`        | *string*                                                         | :heavy\_check\_mark: | N/A         |
| `createdAt` | *string*                                                         | :heavy\_check\_mark: | N/A         |
| `expiresAt` | *string*                                                         | :heavy\_check\_mark: | N/A         |
| `web3Data`  | [operations.Web3Data](/agent-sdk/typescript/operations/web3data) | :heavy\_check\_mark: | N/A         |
