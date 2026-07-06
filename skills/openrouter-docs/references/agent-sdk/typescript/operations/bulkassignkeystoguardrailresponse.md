> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# BulkAssignKeysToGuardrailResponse - TypeScript SDK

> BulkAssignKeysToGuardrailResponse method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Assignment result

## Example Usage

```typescript lines theme={null}
import { BulkAssignKeysToGuardrailResponse } from "@openrouter/sdk/models/operations";

let value: BulkAssignKeysToGuardrailResponse = {
  assignedCount: 3,
};
```

## Fields

| Field           | Type     | Required             | Description                          | Example |
| --------------- | -------- | -------------------- | ------------------------------------ | ------- |
| `assignedCount` | *number* | :heavy\_check\_mark: | Number of keys successfully assigned | 3       |
