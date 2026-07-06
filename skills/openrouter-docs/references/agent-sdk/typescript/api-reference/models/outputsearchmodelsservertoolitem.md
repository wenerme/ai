> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# OutputSearchModelsServerToolItem - TypeScript SDK

> OutputSearchModelsServerToolItem type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

An openrouter:experimental\_\_search\_models server tool output item

## Example Usage

```typescript lines theme={null}
import { OutputSearchModelsServerToolItem } from "@openrouter/sdk/models";

let value: OutputSearchModelsServerToolItem = {
  status: "completed",
  type: "openrouter:experimental__search_models",
};
```

## Fields

| Field       | Type                                                                                                                           | Required             | Description                                                                 | Example   |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------ | -------------------- | --------------------------------------------------------------------------- | --------- |
| `arguments` | *string*                                                                                                                       | :heavy\_minus\_sign: | The JSON arguments submitted to the search tool (e.g. `{"query":"Claude"}`) |           |
| `id`        | *string*                                                                                                                       | :heavy\_minus\_sign: | N/A                                                                         |           |
| `query`     | *string*                                                                                                                       | :heavy\_minus\_sign: | N/A                                                                         |           |
| `status`    | [models.ToolCallStatus](/agent-sdk/typescript/api-reference/models/toolcallstatus)                                             | :heavy\_check\_mark: | N/A                                                                         | completed |
| `type`      | [models.OutputSearchModelsServerToolItemType](/agent-sdk/typescript/api-reference/models/outputsearchmodelsservertoolitemtype) | :heavy\_check\_mark: | N/A                                                                         |           |
