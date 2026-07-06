> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ApplyPatchCallOperationDiffDeltaEvent - TypeScript SDK

> ApplyPatchCallOperationDiffDeltaEvent type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Incremental chunk of `operation.diff` for an `apply_patch_call`. Matches OpenAI's streaming shape.

## Example Usage

```typescript lines theme={null}
import { ApplyPatchCallOperationDiffDeltaEvent } from "@openrouter/sdk/models";

let value: ApplyPatchCallOperationDiffDeltaEvent = {
  delta: "<value>",
  itemId: "<id>",
  outputIndex: 790412,
  sequenceNumber: 0,
  type: "response.apply_patch_call_operation_diff.delta",
};
```

## Fields

| Field            | Type                                                   | Required             | Description |
| ---------------- | ------------------------------------------------------ | -------------------- | ----------- |
| `delta`          | *string*                                               | :heavy\_check\_mark: | N/A         |
| `itemId`         | *string*                                               | :heavy\_check\_mark: | N/A         |
| `outputIndex`    | *number*                                               | :heavy\_check\_mark: | N/A         |
| `sequenceNumber` | *number*                                               | :heavy\_check\_mark: | N/A         |
| `type`           | *"response.apply\_patch\_call\_operation\_diff.delta"* | :heavy\_check\_mark: | N/A         |
