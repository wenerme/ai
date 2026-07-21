> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# McpServerTool - TypeScript SDK

> McpServerTool type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

MCP (Model Context Protocol) tool configuration

## Example Usage

```typescript lines theme={null}
import { McpServerTool } from "@openrouter/sdk/models";

let value: McpServerTool = {
  serverLabel: "my-server",
  type: "mcp",
};
```

## Fields

| Field               | Type                                                                         | Required             | Description |
| ------------------- | ---------------------------------------------------------------------------- | -------------------- | ----------- |
| `allowedTools`      | *models.AllowedToolsUnion*                                                   | :heavy\_minus\_sign: | N/A         |
| `authorization`     | *string*                                                                     | :heavy\_minus\_sign: | N/A         |
| `connectorId`       | [models.ConnectorId](/docs/agent-sdk/typescript/api-reference/models/connectorid) | :heavy\_minus\_sign: | N/A         |
| `headers`           | `Record<string, *string*>`                                                   | :heavy\_minus\_sign: | N/A         |
| `requireApproval`   | *models.RequireApprovalUnion*                                                | :heavy\_minus\_sign: | N/A         |
| `serverDescription` | *string*                                                                     | :heavy\_minus\_sign: | N/A         |
| `serverLabel`       | *string*                                                                     | :heavy\_check\_mark: | N/A         |
| `serverUrl`         | *string*                                                                     | :heavy\_minus\_sign: | N/A         |
| `type`              | *"mcp"*                                                                      | :heavy\_check\_mark: | N/A         |
