> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# McpApprovalRequestItem - TypeScript SDK

> McpApprovalRequestItem type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Request for approval to execute an MCP tool

## Example Usage

```typescript lines theme={null}
import { McpApprovalRequestItem } from "@openrouter/sdk/models";

let value: McpApprovalRequestItem = {
  arguments: "{\"id\":\"123\"}",
  id: "approval-abc123",
  name: "delete_record",
  serverLabel: "database-server",
  type: "mcp_approval_request",
};
```

## Fields

| Field         | Type                                                                                                       | Required             | Description |
| ------------- | ---------------------------------------------------------------------------------------------------------- | -------------------- | ----------- |
| `arguments`   | *string*                                                                                                   | :heavy\_check\_mark: | N/A         |
| `id`          | *string*                                                                                                   | :heavy\_check\_mark: | N/A         |
| `name`        | *string*                                                                                                   | :heavy\_check\_mark: | N/A         |
| `serverLabel` | *string*                                                                                                   | :heavy\_check\_mark: | N/A         |
| `type`        | [models.McpApprovalRequestItemType](/docs/agent-sdk/typescript/api-reference/models/mcpapprovalrequestitemtype) | :heavy\_check\_mark: | N/A         |
