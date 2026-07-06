> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ListMemberAssignmentsData - TypeScript SDK

> ListMemberAssignmentsData method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { ListMemberAssignmentsData } from "@openrouter/sdk/models/operations";

let value: ListMemberAssignmentsData = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  userId: "user_abc123",
  organizationId: "org_xyz789",
  guardrailId: "550e8400-e29b-41d4-a716-446655440001",
  assignedBy: "user_abc123",
  createdAt: "2025-08-24T10:30:00Z",
};
```

## Fields

| Field            | Type     | Required             | Description                                           | Example                              |
| ---------------- | -------- | -------------------- | ----------------------------------------------------- | ------------------------------------ |
| `id`             | *string* | :heavy\_check\_mark: | Unique identifier for the assignment                  | 550e8400-e29b-41d4-a716-446655440000 |
| `userId`         | *string* | :heavy\_check\_mark: | Clerk user ID of the assigned member                  | user\_abc123                         |
| `organizationId` | *string* | :heavy\_check\_mark: | Organization ID                                       | org\_xyz789                          |
| `guardrailId`    | *string* | :heavy\_check\_mark: | ID of the guardrail                                   | 550e8400-e29b-41d4-a716-446655440001 |
| `assignedBy`     | *string* | :heavy\_check\_mark: | User ID of who made the assignment                    | user\_abc123                         |
| `createdAt`      | *string* | :heavy\_check\_mark: | ISO 8601 timestamp of when the assignment was created | 2025-08-24T10:30:00Z                 |
