> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# OutputMemoryServerToolItem - TypeScript SDK

> OutputMemoryServerToolItem type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

An openrouter:memory server tool output item

## Example Usage

```typescript lines theme={null}
import { OutputMemoryServerToolItem } from "@openrouter/sdk/models";

let value: OutputMemoryServerToolItem = {
  status: "completed",
  type: "openrouter:memory",
};
```

## Fields

| Field    | Type                                                                                                               | Required             | Description | Example   |
| -------- | ------------------------------------------------------------------------------------------------------------------ | -------------------- | ----------- | --------- |
| `action` | [models.ActionEnum](/agent-sdk/typescript/api-reference/models/actionenum)                                         | :heavy\_minus\_sign: | N/A         |           |
| `id`     | *string*                                                                                                           | :heavy\_minus\_sign: | N/A         |           |
| `key`    | *string*                                                                                                           | :heavy\_minus\_sign: | N/A         |           |
| `status` | [models.ToolCallStatus](/agent-sdk/typescript/api-reference/models/toolcallstatus)                                 | :heavy\_check\_mark: | N/A         | completed |
| `type`   | [models.OutputMemoryServerToolItemType](/agent-sdk/typescript/api-reference/models/outputmemoryservertoolitemtype) | :heavy\_check\_mark: | N/A         |           |
| `value`  | *any*                                                                                                              | :heavy\_minus\_sign: | N/A         |           |
