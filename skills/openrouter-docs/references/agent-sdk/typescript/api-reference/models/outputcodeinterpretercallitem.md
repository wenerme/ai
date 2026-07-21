> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# OutputCodeInterpreterCallItem - TypeScript SDK

> OutputCodeInterpreterCallItem type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

A code interpreter execution call with outputs

## Example Usage

```typescript lines theme={null}
import { OutputCodeInterpreterCallItem } from "@openrouter/sdk/models";

let value: OutputCodeInterpreterCallItem = {
  code: "print(\"hello\")",
  containerId: "ctr-xyz789",
  id: "ci-abc123",
  outputs: [
    {
      logs: "hello\n",
      type: "logs",
    },
  ],
  status: "completed",
  type: "code_interpreter_call",
};
```

## Fields

| Field         | Type                                                                                                 | Required             | Description | Example   |
| ------------- | ---------------------------------------------------------------------------------------------------- | -------------------- | ----------- | --------- |
| `code`        | *string*                                                                                             | :heavy\_check\_mark: | N/A         |           |
| `containerId` | *string*                                                                                             | :heavy\_check\_mark: | N/A         |           |
| `id`          | *string*                                                                                             | :heavy\_check\_mark: | N/A         |           |
| `outputs`     | *models.OutputCodeInterpreterCallItemOutputUnion*\[]                                                 | :heavy\_check\_mark: | N/A         |           |
| `status`      | [models.ToolCallStatus](/docs/agent-sdk/typescript/api-reference/models/toolcallstatus)                   | :heavy\_check\_mark: | N/A         | completed |
| `type`        | [models.TypeCodeInterpreterCall](/docs/agent-sdk/typescript/api-reference/models/typecodeinterpretercall) | :heavy\_check\_mark: | N/A         |           |
