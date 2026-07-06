> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# FileCitation - TypeScript SDK

> FileCitation method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { FileCitation } from "@openrouter/sdk/models";

let value: FileCitation = {
  type: "file_citation",
  fileId: "file-abc123",
  filename: "research_paper.pdf",
  index: 0,
};
```

## Fields

| Field      | Type               | Required             | Description |
| ---------- | ------------------ | -------------------- | ----------- |
| `type`     | *"file\_citation"* | :heavy\_check\_mark: | N/A         |
| `fileId`   | *string*           | :heavy\_check\_mark: | N/A         |
| `filename` | *string*           | :heavy\_check\_mark: | N/A         |
| `index`    | *number*           | :heavy\_check\_mark: | N/A         |
