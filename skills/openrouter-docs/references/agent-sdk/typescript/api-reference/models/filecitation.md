> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# FileCitation - TypeScript SDK

> FileCitation type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { FileCitation } from "@openrouter/sdk/models";

let value: FileCitation = {
  fileId: "file-abc123",
  filename: "research_paper.pdf",
  index: 0,
  type: "file_citation",
};
```

## Fields

| Field      | Type               | Required             | Description |
| ---------- | ------------------ | -------------------- | ----------- |
| `fileId`   | *string*           | :heavy\_check\_mark: | N/A         |
| `filename` | *string*           | :heavy\_check\_mark: | N/A         |
| `index`    | *number*           | :heavy\_check\_mark: | N/A         |
| `type`     | *"file\_citation"* | :heavy\_check\_mark: | N/A         |
