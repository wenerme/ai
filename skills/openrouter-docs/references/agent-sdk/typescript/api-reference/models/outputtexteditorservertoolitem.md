> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# OutputTextEditorServerToolItem - TypeScript SDK

> OutputTextEditorServerToolItem type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

An openrouter:text\_editor server tool output item

## Example Usage

```typescript lines theme={null}
import { OutputTextEditorServerToolItem } from "@openrouter/sdk/models";

let value: OutputTextEditorServerToolItem = {
  status: "completed",
  type: "openrouter:text_editor",
};
```

## Fields

| Field      | Type                                                                                                                       | Required             | Description | Example   |
| ---------- | -------------------------------------------------------------------------------------------------------------------------- | -------------------- | ----------- | --------- |
| `command`  | [models.Command](/docs/agent-sdk/typescript/api-reference/models/command)                                                       | :heavy\_minus\_sign: | N/A         |           |
| `filePath` | *string*                                                                                                                   | :heavy\_minus\_sign: | N/A         |           |
| `id`       | *string*                                                                                                                   | :heavy\_minus\_sign: | N/A         |           |
| `status`   | [models.ToolCallStatus](/docs/agent-sdk/typescript/api-reference/models/toolcallstatus)                                         | :heavy\_check\_mark: | N/A         | completed |
| `type`     | [models.OutputTextEditorServerToolItemType](/docs/agent-sdk/typescript/api-reference/models/outputtexteditorservertoolitemtype) | :heavy\_check\_mark: | N/A         |           |
