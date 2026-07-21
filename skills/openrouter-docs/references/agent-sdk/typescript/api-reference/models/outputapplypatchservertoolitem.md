> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# OutputApplyPatchServerToolItem - TypeScript SDK

> OutputApplyPatchServerToolItem type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

An openrouter:apply\_patch server tool output item. The turn halts when validation succeeds so the client can apply the patch and echo an `apply_patch_call_output` on the next turn.

## Example Usage

```typescript lines theme={null}
import { OutputApplyPatchServerToolItem } from "@openrouter/sdk/models";

let value: OutputApplyPatchServerToolItem = {
  status: "completed",
  type: "openrouter:apply_patch",
};
```

## Fields

| Field       | Type                                                                                                                       | Required             | Description                                                                                                                       | Example                                                                                                                         |
| ----------- | -------------------------------------------------------------------------------------------------------------------------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `callId`    | *string*                                                                                                                   | :heavy\_minus\_sign: | N/A                                                                                                                               |                                                                                                                                 |
| `id`        | *string*                                                                                                                   | :heavy\_minus\_sign: | N/A                                                                                                                               |                                                                                                                                 |
| `operation` | *models.ApplyPatchCallOperation*                                                                                           | :heavy\_minus\_sign: | The patch operation requested by an `apply_patch_call`. `create_file` and `update_file` carry a V4A diff; `delete_file` omits it. | `{"diff": "@@ function main() {\n+  console.log(\"hi\");\n }`",<br />"path": "/src/main.ts",<br />"type": "update\_file"<br />} |
| `status`    | [models.ToolCallStatus](/docs/agent-sdk/typescript/api-reference/models/toolcallstatus)                                         | :heavy\_check\_mark: | N/A                                                                                                                               | completed                                                                                                                       |
| `type`      | [models.OutputApplyPatchServerToolItemType](/docs/agent-sdk/typescript/api-reference/models/outputapplypatchservertoolitemtype) | :heavy\_check\_mark: | N/A                                                                                                                               |                                                                                                                                 |
