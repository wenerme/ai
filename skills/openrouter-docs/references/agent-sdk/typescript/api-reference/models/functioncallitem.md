> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# FunctionCallItem - TypeScript SDK

> FunctionCallItem type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

A function call initiated by the model

## Example Usage

```typescript lines theme={null}
import { FunctionCallItem } from "@openrouter/sdk/models";

let value: FunctionCallItem = {
  arguments: "{\"location\":\"San Francisco\"}",
  callId: "call-abc123",
  id: "call-abc123",
  name: "get_weather",
  type: "function_call",
};
```

## Fields

| Field       | Type                                                                                           | Required             | Description                                                                                     | Example   |
| ----------- | ---------------------------------------------------------------------------------------------- | -------------------- | ----------------------------------------------------------------------------------------------- | --------- |
| `arguments` | *string*                                                                                       | :heavy\_check\_mark: | N/A                                                                                             |           |
| `callId`    | *string*                                                                                       | :heavy\_check\_mark: | N/A                                                                                             |           |
| `id`        | *string*                                                                                       | :heavy\_check\_mark: | N/A                                                                                             |           |
| `name`      | *string*                                                                                       | :heavy\_check\_mark: | N/A                                                                                             |           |
| `namespace` | *string*                                                                                       | :heavy\_minus\_sign: | Namespace qualifier for tools registered as part of a namespace tool group (e.g. an MCP server) |           |
| `status`    | [models.ToolCallStatus](/agent-sdk/typescript/api-reference/models/toolcallstatus)             | :heavy\_minus\_sign: | N/A                                                                                             | completed |
| `type`      | [models.FunctionCallItemType](/agent-sdk/typescript/api-reference/models/functioncallitemtype) | :heavy\_check\_mark: | N/A                                                                                             |           |
