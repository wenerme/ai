> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# McpListToolsItem - TypeScript SDK

> McpListToolsItem type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

List of available MCP tools from a server

## Example Usage

```typescript lines theme={null}
import { McpListToolsItem } from "@openrouter/sdk/models";

let value: McpListToolsItem = {
  id: "mcp-list-abc123",
  serverLabel: "database-server",
  tools: [
    {
      inputSchema: {
        "properties": {
          "query": {
            "type": "string",
          },
        },
        "type": "object",
      },
      name: "query_database",
    },
  ],
  type: "mcp_list_tools",
};
```

## Fields

| Field         | Type                                                                                              | Required             | Description |
| ------------- | ------------------------------------------------------------------------------------------------- | -------------------- | ----------- |
| `error`       | *string*                                                                                          | :heavy\_minus\_sign: | N/A         |
| `id`          | *string*                                                                                          | :heavy\_check\_mark: | N/A         |
| `serverLabel` | *string*                                                                                          | :heavy\_check\_mark: | N/A         |
| `tools`       | [models.McpListToolsItemTool](/docs/agent-sdk/typescript/api-reference/models/mcplisttoolsitemtool)\[] | :heavy\_check\_mark: | N/A         |
| `type`        | [models.McpListToolsItemType](/docs/agent-sdk/typescript/api-reference/models/mcplisttoolsitemtype)    | :heavy\_check\_mark: | N/A         |
