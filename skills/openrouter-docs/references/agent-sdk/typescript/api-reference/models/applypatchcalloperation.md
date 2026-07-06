> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ApplyPatchCallOperation - TypeScript SDK

> ApplyPatchCallOperation type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

The patch operation requested by an `apply_patch_call`. `create_file` and `update_file` carry a V4A diff; `delete_file` omits it.

## Supported Types

### `models.ApplyPatchCreateFileOperation`

```typescript lines theme={null}
const value: models.ApplyPatchCreateFileOperation = {
  diff: "@@ function main() {\n+  console.log(\"hi\");\n }",
  path: "/src/main.ts",
  type: "create_file",
};
```

### `models.ApplyPatchDeleteFileOperation`

```typescript lines theme={null}
const value: models.ApplyPatchDeleteFileOperation = {
  path: "/src/main.ts",
  type: "delete_file",
};
```

### `models.ApplyPatchUpdateFileOperation`

```typescript lines theme={null}
const value: models.ApplyPatchUpdateFileOperation = {
  diff: "@@ function main() {\n+  console.log(\"hi\");\n }",
  path: "/src/main.ts",
  type: "update_file",
};
```
