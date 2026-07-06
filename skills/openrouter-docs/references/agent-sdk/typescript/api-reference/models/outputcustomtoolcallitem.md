> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# OutputCustomToolCallItem - TypeScript SDK

> OutputCustomToolCallItem type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

A call to a custom (freeform-grammar) tool created by the model — distinct from `function_call`. Used for tools like Codex CLI's `apply_patch` whose payload is opaque text rather than JSON arguments.

## Example Usage

```typescript lines theme={null}
import { OutputCustomToolCallItem } from "@openrouter/sdk/models";

let value: OutputCustomToolCallItem = {
  callId: "call-abc123",
  input: "*** Begin Patch\n*** End Patch",
  name: "apply_patch",
  type: "custom_tool_call",
};
```

## Fields

| Field       | Type                                                                                                           | Required             | Description                                                                                     |
| ----------- | -------------------------------------------------------------------------------------------------------------- | -------------------- | ----------------------------------------------------------------------------------------------- |
| `callId`    | *string*                                                                                                       | :heavy\_check\_mark: | N/A                                                                                             |
| `id`        | *string*                                                                                                       | :heavy\_minus\_sign: | N/A                                                                                             |
| `input`     | *string*                                                                                                       | :heavy\_check\_mark: | N/A                                                                                             |
| `name`      | *string*                                                                                                       | :heavy\_check\_mark: | N/A                                                                                             |
| `namespace` | *string*                                                                                                       | :heavy\_minus\_sign: | Namespace qualifier for tools registered as part of a namespace tool group (e.g. an MCP server) |
| `type`      | [models.OutputCustomToolCallItemType](/agent-sdk/typescript/api-reference/models/outputcustomtoolcallitemtype) | :heavy\_check\_mark: | N/A                                                                                             |
