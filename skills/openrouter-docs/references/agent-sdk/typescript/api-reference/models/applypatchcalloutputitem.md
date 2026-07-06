> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ApplyPatchCallOutputItem - TypeScript SDK

> ApplyPatchCallOutputItem type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

The client's echo of an `apply_patch_call` after applying the patch. `output` is an optional human-readable log; `status` is `completed` when the patch was applied successfully, `failed` otherwise.

## Example Usage

```typescript lines theme={null}
import { ApplyPatchCallOutputItem } from "@openrouter/sdk/models";

let value: ApplyPatchCallOutputItem = {
  callId: "call_abc123",
  status: "completed",
  type: "apply_patch_call_output",
};
```

## Fields

| Field    | Type                                                                                                               | Required             | Description |
| -------- | ------------------------------------------------------------------------------------------------------------------ | -------------------- | ----------- |
| `callId` | *string*                                                                                                           | :heavy\_check\_mark: | N/A         |
| `id`     | *string*                                                                                                           | :heavy\_minus\_sign: | N/A         |
| `output` | *string*                                                                                                           | :heavy\_minus\_sign: | N/A         |
| `status` | [models.ApplyPatchCallOutputItemStatus](/agent-sdk/typescript/api-reference/models/applypatchcalloutputitemstatus) | :heavy\_check\_mark: | N/A         |
| `type`   | [models.ApplyPatchCallOutputItemType](/agent-sdk/typescript/api-reference/models/applypatchcalloutputitemtype)     | :heavy\_check\_mark: | N/A         |
