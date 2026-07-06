> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# CreateChargeRequest - TypeScript SDK

> CreateChargeRequest method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Create a Coinbase charge for crypto payment

## Example Usage

```typescript lines theme={null}
import { CreateChargeRequest } from "@openrouter/sdk/models";

let value: CreateChargeRequest = {
  amount: 100,
  sender: "0x1234567890123456789012345678901234567890",
  chainId: 1,
};
```

## Fields

| Field     | Type                                                   | Required             | Description |
| --------- | ------------------------------------------------------ | -------------------- | ----------- |
| `amount`  | *number*                                               | :heavy\_check\_mark: | N/A         |
| `sender`  | *string*                                               | :heavy\_check\_mark: | N/A         |
| `chainId` | [models.ChainId](/agent-sdk/typescript/models/chainid) | :heavy\_check\_mark: | N/A         |
