> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# MemberAssignment - TypeScript SDK

> MemberAssignment type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { MemberAssignment } from "@openrouter/sdk/models";

let value: MemberAssignment = {
  assignedBy: "user_abc123",
  createdAt: "2025-08-24T10:30:00Z",
  guardrailId: "550e8400-e29b-41d4-a716-446655440001",
  id: "550e8400-e29b-41d4-a716-446655440000",
  organizationId: "org_xyz789",
  userId: "user_abc123",
};
```

## Fields

| Field            | Type     | Required             | Description                                           | Example                              |
| ---------------- | -------- | -------------------- | ----------------------------------------------------- | ------------------------------------ |
| `assignedBy`     | *string* | :heavy\_check\_mark: | User ID of who made the assignment                    | user\_abc123                         |
| `createdAt`      | *string* | :heavy\_check\_mark: | ISO 8601 timestamp of when the assignment was created | 2025-08-24T10:30:00Z                 |
| `guardrailId`    | *string* | :heavy\_check\_mark: | ID of the guardrail                                   | 550e8400-e29b-41d4-a716-446655440001 |
| `id`             | *string* | :heavy\_check\_mark: | Unique identifier for the assignment                  | 550e8400-e29b-41d4-a716-446655440000 |
| `organizationId` | *string* | :heavy\_check\_mark: | Organization ID                                       | org\_xyz789                          |
| `userId`         | *string* | :heavy\_check\_mark: | Clerk user ID of the assigned member                  | user\_abc123                         |
