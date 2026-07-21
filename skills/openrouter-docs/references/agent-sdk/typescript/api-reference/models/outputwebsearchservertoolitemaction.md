> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# OutputWebSearchServerToolItemAction - TypeScript SDK

> OutputWebSearchServerToolItemAction type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

The search action performed, matching OpenAI web\_search\_call.action shape. Includes the query the model issued and optional source URLs returned by the search provider.

## Example Usage

```typescript lines theme={null}
import { OutputWebSearchServerToolItemAction } from "@openrouter/sdk/models";

let value: OutputWebSearchServerToolItemAction = {
  query: "<value>",
  type: "search",
};
```

## Fields

| Field     | Type                                                                                                                                 | Required             | Description |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------ | -------------------- | ----------- |
| `query`   | *string*                                                                                                                             | :heavy\_check\_mark: | N/A         |
| `sources` | [models.OutputWebSearchServerToolItemSource](/docs/agent-sdk/typescript/api-reference/models/outputwebsearchservertoolitemsource)\[]      | :heavy\_minus\_sign: | N/A         |
| `type`    | [models.OutputWebSearchServerToolItemTypeSearch](/docs/agent-sdk/typescript/api-reference/models/outputwebsearchservertoolitemtypesearch) | :heavy\_check\_mark: | N/A         |
