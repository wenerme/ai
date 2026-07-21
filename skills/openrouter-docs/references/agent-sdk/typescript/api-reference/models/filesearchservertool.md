> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# FileSearchServerTool - TypeScript SDK

> FileSearchServerTool type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

File search tool configuration

## Example Usage

```typescript lines theme={null}
import { FileSearchServerTool } from "@openrouter/sdk/models";

let value: FileSearchServerTool = {
  type: "file_search",
  vectorStoreIds: [
    "vs_abc123",
  ],
};
```

## Fields

| Field            | Type                                                                               | Required             | Description |
| ---------------- | ---------------------------------------------------------------------------------- | -------------------- | ----------- |
| `filters`        | *models.FiltersUnion*                                                              | :heavy\_minus\_sign: | N/A         |
| `maxNumResults`  | *number*                                                                           | :heavy\_minus\_sign: | N/A         |
| `rankingOptions` | [models.RankingOptions](/docs/agent-sdk/typescript/api-reference/models/rankingoptions) | :heavy\_minus\_sign: | N/A         |
| `type`           | *"file\_search"*                                                                   | :heavy\_check\_mark: | N/A         |
| `vectorStoreIds` | *string*\[]                                                                        | :heavy\_check\_mark: | N/A         |
