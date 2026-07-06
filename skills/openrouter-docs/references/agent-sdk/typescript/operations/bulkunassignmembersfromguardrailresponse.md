> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# BulkUnassignMembersFromGuardrailResponse - TypeScript SDK

> BulkUnassignMembersFromGuardrailResponse method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Unassignment result

## Example Usage

```typescript lines theme={null}
import { BulkUnassignMembersFromGuardrailResponse } from "@openrouter/sdk/models/operations";

let value: BulkUnassignMembersFromGuardrailResponse = {
  unassignedCount: 2,
};
```

## Fields

| Field             | Type     | Required             | Description                               | Example |
| ----------------- | -------- | -------------------- | ----------------------------------------- | ------- |
| `unassignedCount` | *number* | :heavy\_check\_mark: | Number of members successfully unassigned | 2       |
