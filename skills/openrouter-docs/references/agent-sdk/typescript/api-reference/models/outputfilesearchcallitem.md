> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# OutputFileSearchCallItem - TypeScript SDK

> OutputFileSearchCallItem type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { OutputFileSearchCallItem } from "@openrouter/sdk/models";

let value: OutputFileSearchCallItem = {
  id: "fs-abc123",
  queries: [
    "search term",
  ],
  status: "completed",
  type: "file_search_call",
};
```

## Fields

| Field     | Type                                                                                                           | Required             | Description | Example   |
| --------- | -------------------------------------------------------------------------------------------------------------- | -------------------- | ----------- | --------- |
| `id`      | *string*                                                                                                       | :heavy\_check\_mark: | N/A         |           |
| `queries` | *string*\[]                                                                                                    | :heavy\_check\_mark: | N/A         |           |
| `status`  | [models.WebSearchStatus](/agent-sdk/typescript/api-reference/models/websearchstatus)                           | :heavy\_check\_mark: | N/A         | completed |
| `type`    | [models.OutputFileSearchCallItemType](/agent-sdk/typescript/api-reference/models/outputfilesearchcallitemtype) | :heavy\_check\_mark: | N/A         |           |
