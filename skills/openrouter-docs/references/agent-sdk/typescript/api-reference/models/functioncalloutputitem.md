> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# FunctionCallOutputItem - TypeScript SDK

> FunctionCallOutputItem type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

The output from a function call execution

## Example Usage

```typescript lines theme={null}
import { FunctionCallOutputItem } from "@openrouter/sdk/models";

let value: FunctionCallOutputItem = {
  callId: "call-abc123",
  output: "{\"temperature\":72,\"conditions\":\"sunny\"}",
  type: "function_call_output",
};
```

## Fields

| Field    | Type                                                                                                                                           | Required             | Description | Example   |
| -------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- | ----------- | --------- |
| `callId` | *string*                                                                                                                                       | :heavy\_check\_mark: | N/A         |           |
| `id`     | *string*                                                                                                                                       | :heavy\_minus\_sign: | N/A         |           |
| `output` | *models.FunctionCallOutputItemOutputUnion2*                                                                                                    | :heavy\_check\_mark: | N/A         |           |
| `status` | [models.FunctionCallOutputItemStatus](/docs/agent-sdk/typescript/api-reference/models/functioncalloutputitemstatus)                                 | :heavy\_minus\_sign: | N/A         | completed |
| `type`   | [models.FunctionCallOutputItemTypeFunctionCallOutput](/docs/agent-sdk/typescript/api-reference/models/functioncalloutputitemtypefunctioncalloutput) | :heavy\_check\_mark: | N/A         |           |
