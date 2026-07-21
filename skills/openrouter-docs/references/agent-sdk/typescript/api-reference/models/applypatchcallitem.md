> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ApplyPatchCallItem - TypeScript SDK

> ApplyPatchCallItem type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

A tool call emitted by the model requesting a V4A patch operation. The client applies the patch and echoes an `apply_patch_call_output` on the next turn.

## Example Usage

```typescript lines theme={null}
import { ApplyPatchCallItem } from "@openrouter/sdk/models";

let value: ApplyPatchCallItem = {
  callId: "call_abc123",
  operation: {
    diff: "@@ function main() {\n+  console.log(\"hi\");\n }",
    path: "/src/main.ts",
    type: "update_file",
  },
  status: "completed",
  type: "apply_patch_call",
};
```

## Fields

| Field       | Type                                                                                               | Required             | Description                                                                                                                       | Example                                                                                                                         |
| ----------- | -------------------------------------------------------------------------------------------------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `callId`    | *string*                                                                                           | :heavy\_check\_mark: | N/A                                                                                                                               |                                                                                                                                 |
| `id`        | *string*                                                                                           | :heavy\_minus\_sign: | N/A                                                                                                                               |                                                                                                                                 |
| `operation` | *models.ApplyPatchCallOperation*                                                                   | :heavy\_check\_mark: | The patch operation requested by an `apply_patch_call`. `create_file` and `update_file` carry a V4A diff; `delete_file` omits it. | `{"diff": "@@ function main() {\n+  console.log(\"hi\");\n }`",<br />"path": "/src/main.ts",<br />"type": "update\_file"<br />} |
| `status`    | [models.ApplyPatchCallStatus](/docs/agent-sdk/typescript/api-reference/models/applypatchcallstatus)     | :heavy\_check\_mark: | Lifecycle state of an `apply_patch_call` output item.                                                                             | completed                                                                                                                       |
| `type`      | [models.ApplyPatchCallItemType](/docs/agent-sdk/typescript/api-reference/models/applypatchcallitemtype) | :heavy\_check\_mark: | N/A                                                                                                                               |                                                                                                                                 |
