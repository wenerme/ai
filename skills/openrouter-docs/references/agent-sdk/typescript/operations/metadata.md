> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Metadata - TypeScript SDK

> Metadata method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { Metadata } from "@openrouter/sdk/models/operations";

let value: Metadata = {
  chainId: 5773.31,
  contractAddress: "<value>",
  sender: "<value>",
};
```

## Fields

| Field             | Type     | Required             | Description |
| ----------------- | -------- | -------------------- | ----------- |
| `chainId`         | *number* | :heavy\_check\_mark: | N/A         |
| `contractAddress` | *string* | :heavy\_check\_mark: | N/A         |
| `sender`          | *string* | :heavy\_check\_mark: | N/A         |
