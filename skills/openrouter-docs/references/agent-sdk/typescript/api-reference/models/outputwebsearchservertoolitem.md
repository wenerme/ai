> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# OutputWebSearchServerToolItem - TypeScript SDK

> OutputWebSearchServerToolItem type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

An openrouter:web\_search server tool output item

## Example Usage

```typescript lines theme={null}
import { OutputWebSearchServerToolItem } from "@openrouter/sdk/models";

let value: OutputWebSearchServerToolItem = {
  status: "completed",
  type: "openrouter:web_search",
};
```

## Fields

| Field    | Type                                                                                                                                                           | Required             | Description                                                                                                                                                                | Example   |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `action` | [models.OutputWebSearchServerToolItemAction](/agent-sdk/typescript/api-reference/models/outputwebsearchservertoolitemaction)                                   | :heavy\_minus\_sign: | The search action performed, matching OpenAI web\_search\_call.action shape. Includes the query the model issued and optional source URLs returned by the search provider. |           |
| `id`     | *string*                                                                                                                                                       | :heavy\_minus\_sign: | N/A                                                                                                                                                                        |           |
| `status` | [models.ToolCallStatus](/agent-sdk/typescript/api-reference/models/toolcallstatus)                                                                             | :heavy\_check\_mark: | N/A                                                                                                                                                                        | completed |
| `type`   | [models.OutputWebSearchServerToolItemTypeOpenrouterWebSearch](/agent-sdk/typescript/api-reference/models/outputwebsearchservertoolitemtypeopenrouterwebsearch) | :heavy\_check\_mark: | N/A                                                                                                                                                                        |           |
