> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# BulkUnassignKeysRequest - TypeScript SDK

> BulkUnassignKeysRequest type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { BulkUnassignKeysRequest } from "@openrouter/sdk/models";

let value: BulkUnassignKeysRequest = {
  keyHashes: [
    "c56454edb818d6b14bc0d61c46025f1450b0f4012d12304ab40aacb519fcbc93",
  ],
};
```

## Fields

| Field       | Type        | Required             | Description                                            | Example                                                                           |
| ----------- | ----------- | -------------------- | ------------------------------------------------------ | --------------------------------------------------------------------------------- |
| `keyHashes` | *string*\[] | :heavy\_check\_mark: | Array of API key hashes to unassign from the guardrail | \[<br />"c56454edb818d6b14bc0d61c46025f1450b0f4012d12304ab40aacb519fcbc93"<br />] |
