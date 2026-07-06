> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# McpApprovalResponseItem - TypeScript SDK

> McpApprovalResponseItem type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

User response to an MCP tool approval request

## Example Usage

```typescript lines theme={null}
import { McpApprovalResponseItem } from "@openrouter/sdk/models";

let value: McpApprovalResponseItem = {
  approvalRequestId: "approval-abc123",
  approve: true,
  type: "mcp_approval_response",
};
```

## Fields

| Field               | Type                                                                                                         | Required             | Description |
| ------------------- | ------------------------------------------------------------------------------------------------------------ | -------------------- | ----------- |
| `approvalRequestId` | *string*                                                                                                     | :heavy\_check\_mark: | N/A         |
| `approve`           | *boolean*                                                                                                    | :heavy\_check\_mark: | N/A         |
| `id`                | *string*                                                                                                     | :heavy\_minus\_sign: | N/A         |
| `reason`            | *string*                                                                                                     | :heavy\_minus\_sign: | N/A         |
| `type`              | [models.McpApprovalResponseItemType](/agent-sdk/typescript/api-reference/models/mcpapprovalresponseitemtype) | :heavy\_check\_mark: | N/A         |
