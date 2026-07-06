> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# OpenAIResponseCustomToolCall - TypeScript SDK

> OpenAIResponseCustomToolCall type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { OpenAIResponseCustomToolCall } from "@openrouter/sdk/models";

let value: OpenAIResponseCustomToolCall = {
  callId: "call-abc123",
  input: "*** Begin Patch\n*** End Patch",
  name: "apply_patch",
  type: "custom_tool_call",
};
```

## Fields

| Field       | Type                                                                                                                   | Required             | Description                                                                                     |
| ----------- | ---------------------------------------------------------------------------------------------------------------------- | -------------------- | ----------------------------------------------------------------------------------------------- |
| `callId`    | *string*                                                                                                               | :heavy\_check\_mark: | N/A                                                                                             |
| `id`        | *string*                                                                                                               | :heavy\_minus\_sign: | N/A                                                                                             |
| `input`     | *string*                                                                                                               | :heavy\_check\_mark: | N/A                                                                                             |
| `name`      | *string*                                                                                                               | :heavy\_check\_mark: | N/A                                                                                             |
| `namespace` | *string*                                                                                                               | :heavy\_minus\_sign: | Namespace qualifier for tools registered as part of a namespace tool group (e.g. an MCP server) |
| `type`      | [models.OpenAIResponseCustomToolCallType](/agent-sdk/typescript/api-reference/models/openairesponsecustomtoolcalltype) | :heavy\_check\_mark: | N/A                                                                                             |
