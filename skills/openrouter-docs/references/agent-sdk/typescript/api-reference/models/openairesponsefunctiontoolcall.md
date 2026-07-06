> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# OpenAIResponseFunctionToolCall - TypeScript SDK

> OpenAIResponseFunctionToolCall type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { OpenAIResponseFunctionToolCall } from "@openrouter/sdk/models";

let value: OpenAIResponseFunctionToolCall = {
  arguments: "{\"location\":\"San Francisco\"}",
  callId: "call-abc123",
  name: "get_weather",
  type: "function_call",
};
```

## Fields

| Field       | Type                                                                                                                       | Required             | Description                                                                                     | Example   |
| ----------- | -------------------------------------------------------------------------------------------------------------------------- | -------------------- | ----------------------------------------------------------------------------------------------- | --------- |
| `arguments` | *string*                                                                                                                   | :heavy\_check\_mark: | N/A                                                                                             |           |
| `callId`    | *string*                                                                                                                   | :heavy\_check\_mark: | N/A                                                                                             |           |
| `id`        | *string*                                                                                                                   | :heavy\_minus\_sign: | N/A                                                                                             |           |
| `name`      | *string*                                                                                                                   | :heavy\_check\_mark: | N/A                                                                                             |           |
| `namespace` | *string*                                                                                                                   | :heavy\_minus\_sign: | Namespace qualifier for tools registered as part of a namespace tool group (e.g. an MCP server) |           |
| `status`    | [models.ToolCallStatus](/agent-sdk/typescript/api-reference/models/toolcallstatus)                                         | :heavy\_minus\_sign: | N/A                                                                                             | completed |
| `type`      | [models.OpenAIResponseFunctionToolCallType](/agent-sdk/typescript/api-reference/models/openairesponsefunctiontoolcalltype) | :heavy\_check\_mark: | N/A                                                                                             |           |
