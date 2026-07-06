> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# OutputApplyPatchCallItem - TypeScript SDK

> OutputApplyPatchCallItem type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

A native `apply_patch_call` output item matching OpenAI's Responses API shape. Emitted when the client requested the `apply_patch` shorthand.

## Example Usage

```typescript lines theme={null}
import { OutputApplyPatchCallItem } from "@openrouter/sdk/models";

let value: OutputApplyPatchCallItem = {
  callId: "<id>",
  id: "msg-abc123",
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

| Field       | Type                                                                                           | Required             | Description                                                                                                                       | Example                                                                                                                         |
| ----------- | ---------------------------------------------------------------------------------------------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `callId`    | *string*                                                                                       | :heavy\_check\_mark: | N/A                                                                                                                               |                                                                                                                                 |
| `id`        | *string*                                                                                       | :heavy\_check\_mark: | N/A                                                                                                                               |                                                                                                                                 |
| `operation` | *models.ApplyPatchCallOperation*                                                               | :heavy\_check\_mark: | The patch operation requested by an `apply_patch_call`. `create_file` and `update_file` carry a V4A diff; `delete_file` omits it. | `{"diff": "@@ function main() {\n+  console.log(\"hi\");\n }`",<br />"path": "/src/main.ts",<br />"type": "update\_file"<br />} |
| `status`    | [models.ApplyPatchCallStatus](/agent-sdk/typescript/api-reference/models/applypatchcallstatus) | :heavy\_check\_mark: | Lifecycle state of an `apply_patch_call` output item.                                                                             | completed                                                                                                                       |
| `type`      | *"apply\_patch\_call"*                                                                         | :heavy\_check\_mark: | N/A                                                                                                                               |                                                                                                                                 |
