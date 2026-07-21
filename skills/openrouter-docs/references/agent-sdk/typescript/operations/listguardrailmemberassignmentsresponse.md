> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ListGuardrailMemberAssignmentsResponse - TypeScript SDK

> ListGuardrailMemberAssignmentsResponse method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

List of member assignments

## Example Usage

```typescript lines theme={null}
import { ListGuardrailMemberAssignmentsResponse } from "@openrouter/sdk/models/operations";

let value: ListGuardrailMemberAssignmentsResponse = {
  data: [
    {
      id: "550e8400-e29b-41d4-a716-446655440000",
      userId: "user_abc123",
      organizationId: "org_xyz789",
      guardrailId: "550e8400-e29b-41d4-a716-446655440001",
      assignedBy: "user_abc123",
      createdAt: "2025-08-24T10:30:00Z",
    },
  ],
  totalCount: 10,
};
```

## Fields

| Field        | Type                                                                                                                    | Required             | Description                        | Example |
| ------------ | ----------------------------------------------------------------------------------------------------------------------- | -------------------- | ---------------------------------- | ------- |
| `data`       | [operations.ListGuardrailMemberAssignmentsData](/docs/agent-sdk/typescript/operations/listguardrailmemberassignmentsdata)\[] | :heavy\_check\_mark: | List of member assignments         |         |
| `totalCount` | *number*                                                                                                                | :heavy\_check\_mark: | Total number of member assignments | 10      |
