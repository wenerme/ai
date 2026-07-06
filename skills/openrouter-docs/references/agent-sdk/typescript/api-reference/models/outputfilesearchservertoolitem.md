> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# OutputFileSearchServerToolItem - TypeScript SDK

> OutputFileSearchServerToolItem type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

An openrouter:file\_search server tool output item

## Example Usage

```typescript lines theme={null}
import { OutputFileSearchServerToolItem } from "@openrouter/sdk/models";

let value: OutputFileSearchServerToolItem = {
  status: "completed",
  type: "openrouter:file_search",
};
```

## Fields

| Field     | Type                                                                                                                       | Required             | Description | Example   |
| --------- | -------------------------------------------------------------------------------------------------------------------------- | -------------------- | ----------- | --------- |
| `id`      | *string*                                                                                                                   | :heavy\_minus\_sign: | N/A         |           |
| `queries` | *string*\[]                                                                                                                | :heavy\_minus\_sign: | N/A         |           |
| `status`  | [models.ToolCallStatus](/agent-sdk/typescript/api-reference/models/toolcallstatus)                                         | :heavy\_check\_mark: | N/A         | completed |
| `type`    | [models.OutputFileSearchServerToolItemType](/agent-sdk/typescript/api-reference/models/outputfilesearchservertoolitemtype) | :heavy\_check\_mark: | N/A         |           |
