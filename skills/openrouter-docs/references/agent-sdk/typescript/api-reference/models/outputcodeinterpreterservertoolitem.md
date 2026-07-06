> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# OutputCodeInterpreterServerToolItem - TypeScript SDK

> OutputCodeInterpreterServerToolItem type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

An openrouter:code\_interpreter server tool output item

## Example Usage

```typescript lines theme={null}
import { OutputCodeInterpreterServerToolItem } from "@openrouter/sdk/models";

let value: OutputCodeInterpreterServerToolItem = {
  status: "completed",
  type: "openrouter:code_interpreter",
};
```

## Fields

| Field      | Type                                                                                                                                 | Required             | Description | Example   |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------ | -------------------- | ----------- | --------- |
| `code`     | *string*                                                                                                                             | :heavy\_minus\_sign: | N/A         |           |
| `exitCode` | *number*                                                                                                                             | :heavy\_minus\_sign: | N/A         |           |
| `id`       | *string*                                                                                                                             | :heavy\_minus\_sign: | N/A         |           |
| `language` | *string*                                                                                                                             | :heavy\_minus\_sign: | N/A         |           |
| `status`   | [models.ToolCallStatus](/agent-sdk/typescript/api-reference/models/toolcallstatus)                                                   | :heavy\_check\_mark: | N/A         | completed |
| `stderr`   | *string*                                                                                                                             | :heavy\_minus\_sign: | N/A         |           |
| `stdout`   | *string*                                                                                                                             | :heavy\_minus\_sign: | N/A         |           |
| `type`     | [models.OutputCodeInterpreterServerToolItemType](/agent-sdk/typescript/api-reference/models/outputcodeinterpreterservertoolitemtype) | :heavy\_check\_mark: | N/A         |           |
