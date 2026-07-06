> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# FilePath - TypeScript SDK

> FilePath method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { FilePath } from "@openrouter/sdk/models";

let value: FilePath = {
  type: "file_path",
  fileId: "file-xyz789",
  index: 0,
};
```

## Fields

| Field    | Type           | Required             | Description |
| -------- | -------------- | -------------------- | ----------- |
| `type`   | *"file\_path"* | :heavy\_check\_mark: | N/A         |
| `fileId` | *string*       | :heavy\_check\_mark: | N/A         |
| `index`  | *number*       | :heavy\_check\_mark: | N/A         |
