> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# WorkspaceMember - TypeScript SDK

> WorkspaceMember type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { WorkspaceMember } from "@openrouter/sdk/models";

let value: WorkspaceMember = {
  createdAt: "2025-08-24T10:30:00Z",
  id: "660e8400-e29b-41d4-a716-446655440000",
  role: "member",
  userId: "user_abc123",
  workspaceId: "550e8400-e29b-41d4-a716-446655440000",
};
```

## Fields

| Field         | Type                                                                                         | Required             | Description                                           | Example                              |
| ------------- | -------------------------------------------------------------------------------------------- | -------------------- | ----------------------------------------------------- | ------------------------------------ |
| `createdAt`   | *string*                                                                                     | :heavy\_check\_mark: | ISO 8601 timestamp of when the membership was created | 2025-08-24T10:30:00Z                 |
| `id`          | *string*                                                                                     | :heavy\_check\_mark: | Unique identifier for the workspace membership        | 660e8400-e29b-41d4-a716-446655440000 |
| `role`        | [models.WorkspaceMemberRole](/docs/agent-sdk/typescript/api-reference/models/workspacememberrole) | :heavy\_check\_mark: | Role of the member in the workspace                   | member                               |
| `userId`      | *string*                                                                                     | :heavy\_check\_mark: | Clerk user ID of the member                           | user\_abc123                         |
| `workspaceId` | *string*                                                                                     | :heavy\_check\_mark: | ID of the workspace                                   | 550e8400-e29b-41d4-a716-446655440000 |
