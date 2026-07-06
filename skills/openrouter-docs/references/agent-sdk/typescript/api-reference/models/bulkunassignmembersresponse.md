> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# BulkUnassignMembersResponse - TypeScript SDK

> BulkUnassignMembersResponse type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { BulkUnassignMembersResponse } from "@openrouter/sdk/models";

let value: BulkUnassignMembersResponse = {
  unassignedCount: 2,
};
```

## Fields

| Field             | Type     | Required             | Description                               | Example |
| ----------------- | -------- | -------------------- | ----------------------------------------- | ------- |
| `unassignedCount` | *number* | :heavy\_check\_mark: | Number of members successfully unassigned | 2       |
