> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ListGuardrailKeyAssignmentsResponse - TypeScript SDK

> ListGuardrailKeyAssignmentsResponse method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

List of key assignments

## Example Usage

```typescript lines theme={null}
import { ListGuardrailKeyAssignmentsResponse } from "@openrouter/sdk/models/operations";

let value: ListGuardrailKeyAssignmentsResponse = {
  data: [
    {
      id: "550e8400-e29b-41d4-a716-446655440000",
      keyHash:
        "c56454edb818d6b14bc0d61c46025f1450b0f4012d12304ab40aacb519fcbc93",
      guardrailId: "550e8400-e29b-41d4-a716-446655440001",
      keyName: "Production Key",
      keyLabel: "prod-key",
      assignedBy: "user_abc123",
      createdAt: "2025-08-24T10:30:00Z",
    },
  ],
  totalCount: 25,
};
```

## Fields

| Field        | Type                                                                                                              | Required             | Description                                        | Example |
| ------------ | ----------------------------------------------------------------------------------------------------------------- | -------------------- | -------------------------------------------------- | ------- |
| `data`       | [operations.ListGuardrailKeyAssignmentsData](/docs/agent-sdk/typescript/operations/listguardrailkeyassignmentsdata)\[] | :heavy\_check\_mark: | List of key assignments                            |         |
| `totalCount` | *number*                                                                                                          | :heavy\_check\_mark: | Total number of key assignments for this guardrail | 25      |
