> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# BulkAssignMembersToGuardrailResponse - TypeScript SDK

> BulkAssignMembersToGuardrailResponse method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Assignment result

## Example Usage

```typescript lines theme={null}
import { BulkAssignMembersToGuardrailResponse } from "@openrouter/sdk/models/operations";

let value: BulkAssignMembersToGuardrailResponse = {
  assignedCount: 2,
};
```

## Fields

| Field           | Type     | Required             | Description                             | Example |
| --------------- | -------- | -------------------- | --------------------------------------- | ------- |
| `assignedCount` | *number* | :heavy\_check\_mark: | Number of members successfully assigned | 2       |
