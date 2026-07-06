> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ApplyPatchCallOperationDiffDoneEvent - TypeScript SDK

> ApplyPatchCallOperationDiffDoneEvent type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Emitted when `operation.diff` streaming completes for an `apply_patch_call`.

## Example Usage

```typescript lines theme={null}
import { ApplyPatchCallOperationDiffDoneEvent } from "@openrouter/sdk/models";

let value: ApplyPatchCallOperationDiffDoneEvent = {
  diff: "<value>",
  itemId: "<id>",
  outputIndex: 170720,
  sequenceNumber: 0,
  type: "response.apply_patch_call_operation_diff.done",
};
```

## Fields

| Field            | Type                                                  | Required             | Description |
| ---------------- | ----------------------------------------------------- | -------------------- | ----------- |
| `diff`           | *string*                                              | :heavy\_check\_mark: | N/A         |
| `itemId`         | *string*                                              | :heavy\_check\_mark: | N/A         |
| `outputIndex`    | *number*                                              | :heavy\_check\_mark: | N/A         |
| `sequenceNumber` | *number*                                              | :heavy\_check\_mark: | N/A         |
| `type`           | *"response.apply\_patch\_call\_operation\_diff.done"* | :heavy\_check\_mark: | N/A         |
