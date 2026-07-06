> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ResponsesWebSearchCallOutput - TypeScript SDK

> ResponsesWebSearchCallOutput method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { ResponsesWebSearchCallOutput } from "@openrouter/sdk/models";

let value: ResponsesWebSearchCallOutput = {
  type: "web_search_call",
  id: "search-abc123",
  status: "completed",
};
```

## Fields

| Field    | Type                                                                                                     | Required             | Description | Example   |
| -------- | -------------------------------------------------------------------------------------------------------- | -------------------- | ----------- | --------- |
| `type`   | [models.ResponsesWebSearchCallOutputType](/agent-sdk/typescript/models/responseswebsearchcalloutputtype) | :heavy\_check\_mark: | N/A         |           |
| `id`     | *string*                                                                                                 | :heavy\_check\_mark: | N/A         |           |
| `status` | [models.WebSearchStatus](/agent-sdk/typescript/models/websearchstatus)                                   | :heavy\_check\_mark: | N/A         | completed |
