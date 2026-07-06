> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ApplyPatchDeleteFileOperation - TypeScript SDK

> ApplyPatchDeleteFileOperation type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

The `delete_file` variant of an `apply_patch_call.operation`. Identifies the file to remove; no diff is required.

## Example Usage

```typescript lines theme={null}
import { ApplyPatchDeleteFileOperation } from "@openrouter/sdk/models";

let value: ApplyPatchDeleteFileOperation = {
  path: "/src/main.ts",
  type: "delete_file",
};
```

## Fields

| Field  | Type             | Required             | Description |
| ------ | ---------------- | -------------------- | ----------- |
| `path` | *string*         | :heavy\_check\_mark: | N/A         |
| `type` | *"delete\_file"* | :heavy\_check\_mark: | N/A         |
