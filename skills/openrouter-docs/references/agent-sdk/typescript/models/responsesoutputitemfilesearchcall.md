> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ResponsesOutputItemFileSearchCall - TypeScript SDK

> ResponsesOutputItemFileSearchCall method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { ResponsesOutputItemFileSearchCall } from "@openrouter/sdk/models";

let value: ResponsesOutputItemFileSearchCall = {
  type: "file_search_call",
  id: "filesearch-abc123",
  queries: [
    "machine learning algorithms",
    "neural networks",
  ],
  status: "completed",
};
```

## Fields

| Field     | Type                                                                                                               | Required             | Description | Example   |
| --------- | ------------------------------------------------------------------------------------------------------------------ | -------------------- | ----------- | --------- |
| `type`    | [models.ResponsesOutputItemFileSearchCallType](/agent-sdk/typescript/models/responsesoutputitemfilesearchcalltype) | :heavy\_check\_mark: | N/A         |           |
| `id`      | *string*                                                                                                           | :heavy\_check\_mark: | N/A         |           |
| `queries` | *string*\[]                                                                                                        | :heavy\_check\_mark: | N/A         |           |
| `status`  | [models.WebSearchStatus](/agent-sdk/typescript/models/websearchstatus)                                             | :heavy\_check\_mark: | N/A         | completed |
