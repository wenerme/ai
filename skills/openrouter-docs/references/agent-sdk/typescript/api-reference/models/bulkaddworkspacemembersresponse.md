> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# BulkAddWorkspaceMembersResponse - TypeScript SDK

> BulkAddWorkspaceMembersResponse type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { BulkAddWorkspaceMembersResponse } from "@openrouter/sdk/models";

let value: BulkAddWorkspaceMembersResponse = {
  addedCount: 1,
  data: [
    {
      createdAt: "2025-08-24T10:30:00Z",
      id: "660e8400-e29b-41d4-a716-446655440000",
      role: "member",
      userId: "user_abc123",
      workspaceId: "550e8400-e29b-41d4-a716-446655440000",
    },
  ],
};
```

## Fields

| Field        | Type                                                                                    | Required             | Description                                        | Example |
| ------------ | --------------------------------------------------------------------------------------- | -------------------- | -------------------------------------------------- | ------- |
| `addedCount` | *number*                                                                                | :heavy\_check\_mark: | Number of workspace memberships created or updated | 2       |
| `data`       | [models.WorkspaceMember](/agent-sdk/typescript/api-reference/models/workspacemember)\[] | :heavy\_check\_mark: | List of added workspace memberships                |         |
