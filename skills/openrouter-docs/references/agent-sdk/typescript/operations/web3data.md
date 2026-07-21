> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Web3Data - TypeScript SDK

> Web3Data method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript expandable lines theme={null}
import { Web3Data } from "@openrouter/sdk/models/operations";

let value: Web3Data = {
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
};
```

## Fields

| Field            | Type                                                                         | Required             | Description |
| ---------------- | ---------------------------------------------------------------------------- | -------------------- | ----------- |
| `transferIntent` | [operations.TransferIntent](/docs/agent-sdk/typescript/operations/transferintent) | :heavy\_check\_mark: | N/A         |
