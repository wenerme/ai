> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ListMemberAssignmentsResponse - TypeScript SDK

> ListMemberAssignmentsResponse type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { ListMemberAssignmentsResponse } from "@openrouter/sdk/models";

let value: ListMemberAssignmentsResponse = {
  data: [
    {
      assignedBy: "user_abc123",
      createdAt: "2025-08-24T10:30:00Z",
      guardrailId: "550e8400-e29b-41d4-a716-446655440001",
      id: "550e8400-e29b-41d4-a716-446655440000",
      organizationId: "org_xyz789",
      userId: "user_abc123",
    },
  ],
  totalCount: 1,
};
```

## Fields

| Field        | Type                                                                                      | Required             | Description                        | Example |
| ------------ | ----------------------------------------------------------------------------------------- | -------------------- | ---------------------------------- | ------- |
| `data`       | [models.MemberAssignment](/docs/agent-sdk/typescript/api-reference/models/memberassignment)\[] | :heavy\_check\_mark: | List of member assignments         |         |
| `totalCount` | *number*                                                                                  | :heavy\_check\_mark: | Total number of member assignments | 10      |
