> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# OutputWebSearchCallItem - TypeScript SDK

> OutputWebSearchCallItem type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { OutputWebSearchCallItem } from "@openrouter/sdk/models";

let value: OutputWebSearchCallItem = {
  action: {
    pattern: "<value>",
    type: "find_in_page",
    url: "https://faraway-deduction.net",
  },
  id: "ws-abc123",
  status: "completed",
  type: "web_search_call",
};
```

## Fields

| Field    | Type                                                                                     | Required             | Description | Example   |
| -------- | ---------------------------------------------------------------------------------------- | -------------------- | ----------- | --------- |
| `action` | *models.Action*                                                                          | :heavy\_check\_mark: | N/A         |           |
| `id`     | *string*                                                                                 | :heavy\_check\_mark: | N/A         |           |
| `status` | [models.WebSearchStatus](/agent-sdk/typescript/api-reference/models/websearchstatus)     | :heavy\_check\_mark: | N/A         | completed |
| `type`   | [models.TypeWebSearchCall](/agent-sdk/typescript/api-reference/models/typewebsearchcall) | :heavy\_check\_mark: | N/A         |           |
