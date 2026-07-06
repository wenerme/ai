> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ApplyPatchCreateFileOperation - TypeScript SDK

> ApplyPatchCreateFileOperation type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

The `create_file` variant of an `apply_patch_call.operation`. Carries a V4A diff describing the new file contents.

## Example Usage

```typescript lines theme={null}
import { ApplyPatchCreateFileOperation } from "@openrouter/sdk/models";

let value: ApplyPatchCreateFileOperation = {
  diff: "@@ function main() {\n+  console.log(\"hi\");\n }",
  path: "/src/main.ts",
  type: "create_file",
};
```

## Fields

| Field  | Type             | Required             | Description |
| ------ | ---------------- | -------------------- | ----------- |
| `diff` | *string*         | :heavy\_check\_mark: | N/A         |
| `path` | *string*         | :heavy\_check\_mark: | N/A         |
| `type` | *"create\_file"* | :heavy\_check\_mark: | N/A         |
