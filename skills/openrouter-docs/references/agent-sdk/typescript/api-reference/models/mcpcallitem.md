> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# McpCallItem - TypeScript SDK

> McpCallItem type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

An MCP tool call with its output or error

## Example Usage

```typescript lines theme={null}
import { McpCallItem } from "@openrouter/sdk/models";

let value: McpCallItem = {
  arguments: "{\"query\":\"SELECT * FROM users\"}",
  id: "mcp-call-abc123",
  name: "query_database",
  serverLabel: "database-server",
  type: "mcp_call",
};
```

## Fields

| Field         | Type                                                                                 | Required             | Description |
| ------------- | ------------------------------------------------------------------------------------ | -------------------- | ----------- |
| `arguments`   | *string*                                                                             | :heavy\_check\_mark: | N/A         |
| `error`       | *string*                                                                             | :heavy\_minus\_sign: | N/A         |
| `id`          | *string*                                                                             | :heavy\_check\_mark: | N/A         |
| `name`        | *string*                                                                             | :heavy\_check\_mark: | N/A         |
| `output`      | *string*                                                                             | :heavy\_minus\_sign: | N/A         |
| `serverLabel` | *string*                                                                             | :heavy\_check\_mark: | N/A         |
| `type`        | [models.McpCallItemType](/agent-sdk/typescript/api-reference/models/mcpcallitemtype) | :heavy\_check\_mark: | N/A         |
