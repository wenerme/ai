> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ShellCallOutputItem - TypeScript SDK

> ShellCallOutputItem type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Output from a shell command execution (newer variant)

## Example Usage

```typescript lines theme={null}
import { ShellCallOutputItem } from "@openrouter/sdk/models";

let value: ShellCallOutputItem = {
  callId: "call-abc123",
  output: [
    {
      type: "stdout",
    },
  ],
  type: "shell_call_output",
};
```

## Fields

| Field             | Type                                                                                                        | Required             | Description | Example   |
| ----------------- | ----------------------------------------------------------------------------------------------------------- | -------------------- | ----------- | --------- |
| `callId`          | *string*                                                                                                    | :heavy\_check\_mark: | N/A         |           |
| `id`              | *string*                                                                                                    | :heavy\_minus\_sign: | N/A         |           |
| `maxOutputLength` | *number*                                                                                                    | :heavy\_minus\_sign: | N/A         |           |
| `output`          | [models.ShellCallOutputItemOutput](/agent-sdk/typescript/api-reference/models/shellcalloutputitemoutput)\[] | :heavy\_check\_mark: | N/A         |           |
| `status`          | [models.ShellCallOutputItemStatus](/agent-sdk/typescript/api-reference/models/shellcalloutputitemstatus)    | :heavy\_minus\_sign: | N/A         | completed |
| `type`            | [models.ShellCallOutputItemType](/agent-sdk/typescript/api-reference/models/shellcalloutputitemtype)        | :heavy\_check\_mark: | N/A         |           |
