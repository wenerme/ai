> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# OutputMcpServerToolItem - TypeScript SDK

> OutputMcpServerToolItem type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

An openrouter:mcp server tool output item

## Example Usage

```typescript lines theme={null}
import { OutputMcpServerToolItem } from "@openrouter/sdk/models";

let value: OutputMcpServerToolItem = {
  status: "completed",
  type: "openrouter:mcp",
};
```

## Fields

| Field         | Type                                                                                                         | Required             | Description | Example   |
| ------------- | ------------------------------------------------------------------------------------------------------------ | -------------------- | ----------- | --------- |
| `id`          | *string*                                                                                                     | :heavy\_minus\_sign: | N/A         |           |
| `serverLabel` | *string*                                                                                                     | :heavy\_minus\_sign: | N/A         |           |
| `status`      | [models.ToolCallStatus](/agent-sdk/typescript/api-reference/models/toolcallstatus)                           | :heavy\_check\_mark: | N/A         | completed |
| `toolName`    | *string*                                                                                                     | :heavy\_minus\_sign: | N/A         |           |
| `type`        | [models.OutputMcpServerToolItemType](/agent-sdk/typescript/api-reference/models/outputmcpservertoolitemtype) | :heavy\_check\_mark: | N/A         |           |
