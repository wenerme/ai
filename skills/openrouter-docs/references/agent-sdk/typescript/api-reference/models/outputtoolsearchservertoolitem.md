> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# OutputToolSearchServerToolItem - TypeScript SDK

> OutputToolSearchServerToolItem type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

An openrouter:tool\_search server tool output item

## Example Usage

```typescript lines theme={null}
import { OutputToolSearchServerToolItem } from "@openrouter/sdk/models";

let value: OutputToolSearchServerToolItem = {
  status: "completed",
  type: "openrouter:tool_search",
};
```

## Fields

| Field    | Type                                                                                                                       | Required             | Description | Example   |
| -------- | -------------------------------------------------------------------------------------------------------------------------- | -------------------- | ----------- | --------- |
| `id`     | *string*                                                                                                                   | :heavy\_minus\_sign: | N/A         |           |
| `query`  | *string*                                                                                                                   | :heavy\_minus\_sign: | N/A         |           |
| `status` | [models.ToolCallStatus](/agent-sdk/typescript/api-reference/models/toolcallstatus)                                         | :heavy\_check\_mark: | N/A         | completed |
| `type`   | [models.OutputToolSearchServerToolItemType](/agent-sdk/typescript/api-reference/models/outputtoolsearchservertoolitemtype) | :heavy\_check\_mark: | N/A         |           |
