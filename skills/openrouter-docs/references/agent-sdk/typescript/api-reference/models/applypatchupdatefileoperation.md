> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ApplyPatchUpdateFileOperation - TypeScript SDK

> ApplyPatchUpdateFileOperation type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

The `update_file` variant of an `apply_patch_call.operation`. Carries a V4A diff describing edits to an existing file.

## Example Usage

```typescript lines theme={null}
import { ApplyPatchUpdateFileOperation } from "@openrouter/sdk/models";

let value: ApplyPatchUpdateFileOperation = {
  diff: "@@ function main() {\n+  console.log(\"hi\");\n }",
  path: "/src/main.ts",
  type: "update_file",
};
```

## Fields

| Field  | Type             | Required             | Description |
| ------ | ---------------- | -------------------- | ----------- |
| `diff` | *string*         | :heavy\_check\_mark: | N/A         |
| `path` | *string*         | :heavy\_check\_mark: | N/A         |
| `type` | *"update\_file"* | :heavy\_check\_mark: | N/A         |
