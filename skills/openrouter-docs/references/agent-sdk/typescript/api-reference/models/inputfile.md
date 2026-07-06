> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# InputFile - TypeScript SDK

> InputFile type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

File input content item

## Example Usage

```typescript lines theme={null}
import { InputFile } from "@openrouter/sdk/models";

let value: InputFile = {
  type: "input_file",
};
```

## Fields

| Field      | Type            | Required             | Description |
| ---------- | --------------- | -------------------- | ----------- |
| `fileData` | *string*        | :heavy\_minus\_sign: | N/A         |
| `fileId`   | *string*        | :heavy\_minus\_sign: | N/A         |
| `fileUrl`  | *string*        | :heavy\_minus\_sign: | N/A         |
| `filename` | *string*        | :heavy\_minus\_sign: | N/A         |
| `type`     | *"input\_file"* | :heavy\_check\_mark: | N/A         |
