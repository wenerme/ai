> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# OutputFunctionCallItem - TypeScript SDK

> OutputFunctionCallItem type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { OutputFunctionCallItem } from "@openrouter/sdk/models";

let value: OutputFunctionCallItem = {
  arguments: "{\"location\":\"San Francisco\"}",
  callId: "call-abc123",
  name: "get_weather",
  type: "function_call",
};
```

## Fields

| Field       | Type                                                                                                       | Required             | Description                                                                                     |
| ----------- | ---------------------------------------------------------------------------------------------------------- | -------------------- | ----------------------------------------------------------------------------------------------- |
| `arguments` | *string*                                                                                                   | :heavy\_check\_mark: | N/A                                                                                             |
| `callId`    | *string*                                                                                                   | :heavy\_check\_mark: | N/A                                                                                             |
| `id`        | *string*                                                                                                   | :heavy\_minus\_sign: | N/A                                                                                             |
| `name`      | *string*                                                                                                   | :heavy\_check\_mark: | N/A                                                                                             |
| `namespace` | *string*                                                                                                   | :heavy\_minus\_sign: | Namespace qualifier for tools registered as part of a namespace tool group (e.g. an MCP server) |
| `status`    | *models.OutputFunctionCallItemStatusUnion*                                                                 | :heavy\_minus\_sign: | N/A                                                                                             |
| `type`      | [models.OutputFunctionCallItemType](/agent-sdk/typescript/api-reference/models/outputfunctioncallitemtype) | :heavy\_check\_mark: | N/A                                                                                             |
