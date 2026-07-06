> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# BulkUnassignKeysResponse - TypeScript SDK

> BulkUnassignKeysResponse type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { BulkUnassignKeysResponse } from "@openrouter/sdk/models";

let value: BulkUnassignKeysResponse = {
  unassignedCount: 3,
};
```

## Fields

| Field             | Type     | Required             | Description                            | Example |
| ----------------- | -------- | -------------------- | -------------------------------------- | ------- |
| `unassignedCount` | *number* | :heavy\_check\_mark: | Number of keys successfully unassigned | 3       |
