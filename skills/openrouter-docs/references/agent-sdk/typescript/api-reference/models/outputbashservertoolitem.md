> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# OutputBashServerToolItem - TypeScript SDK

> OutputBashServerToolItem type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

An openrouter:bash server tool output item

## Example Usage

```typescript lines theme={null}
import { OutputBashServerToolItem } from "@openrouter/sdk/models";

let value: OutputBashServerToolItem = {
  status: "completed",
  type: "openrouter:bash",
};
```

## Fields

| Field      | Type                                                                                                           | Required             | Description | Example   |
| ---------- | -------------------------------------------------------------------------------------------------------------- | -------------------- | ----------- | --------- |
| `command`  | *string*                                                                                                       | :heavy\_minus\_sign: | N/A         |           |
| `exitCode` | *number*                                                                                                       | :heavy\_minus\_sign: | N/A         |           |
| `id`       | *string*                                                                                                       | :heavy\_minus\_sign: | N/A         |           |
| `status`   | [models.ToolCallStatus](/docs/agent-sdk/typescript/api-reference/models/toolcallstatus)                             | :heavy\_check\_mark: | N/A         | completed |
| `stderr`   | *string*                                                                                                       | :heavy\_minus\_sign: | N/A         |           |
| `stdout`   | *string*                                                                                                       | :heavy\_minus\_sign: | N/A         |           |
| `type`     | [models.OutputBashServerToolItemType](/docs/agent-sdk/typescript/api-reference/models/outputbashservertoolitemtype) | :heavy\_check\_mark: | N/A         |           |
