> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# GetUserActivityRequest - TypeScript SDK

> GetUserActivityRequest method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { GetUserActivityRequest } from "@openrouter/sdk/models/operations";

let value: GetUserActivityRequest = {
  date: "2025-08-24T00:00:00Z",
  apiKeyHash: "abc123def456...",
  userId: "user_abc123",
  groupBy: "workspace",
  workspaceId: "550e8400-e29b-41d4-a716-446655440000",
};
```

## Fields

| Field         | Type                                                           | Required             | Description                                                                                                                                                                                                                                                                        | Example                              |
| ------------- | -------------------------------------------------------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| `date`        | *string*                                                       | :heavy\_minus\_sign: | Filter by a single UTC date in the last 30 days (YYYY-MM-DD format).                                                                                                                                                                                                               | 2025-08-24 00:00:00 +0000 UTC        |
| `apiKeyHash`  | *string*                                                       | :heavy\_minus\_sign: | Filter by API key hash (SHA-256 hex string, as returned by the keys API).                                                                                                                                                                                                          | abc123def456...                      |
| `userId`      | *string*                                                       | :heavy\_minus\_sign: | Filter by org member user ID. Only applicable for organization accounts.                                                                                                                                                                                                           | user\_abc123                         |
| `groupBy`     | [operations.GroupBy](/docs/agent-sdk/typescript/operations/groupby) | :heavy\_minus\_sign: | Set to 'workspace' to split each row per workspace and include `workspace_id` on every item. Omitted by default, in which case rows are aggregated across workspaces (by date, model, and endpoint) and `workspace_id` is not returned — preserving the historical response shape. | workspace                            |
| `workspaceId` | *string*                                                       | :heavy\_minus\_sign: | Filter by workspace ID (UUID). Returns only activity attributed to that workspace. The workspace must belong to the authenticated account.                                                                                                                                         | 550e8400-e29b-41d4-a716-446655440000 |
