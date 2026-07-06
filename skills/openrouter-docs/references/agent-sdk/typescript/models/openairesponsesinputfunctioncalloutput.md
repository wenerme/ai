> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# OpenAIResponsesInputFunctionCallOutput - TypeScript SDK

> OpenAIResponsesInputFunctionCallOutput method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { OpenAIResponsesInputFunctionCallOutput } from "@openrouter/sdk/models";

let value: OpenAIResponsesInputFunctionCallOutput = {
  type: "function_call_output",
  callId: "<id>",
  output: "<value>",
};
```

## Fields

| Field    | Type                                                                                                                         | Required             | Description | Example   |
| -------- | ---------------------------------------------------------------------------------------------------------------------------- | -------------------- | ----------- | --------- |
| `type`   | [models.OpenAIResponsesInputTypeFunctionCallOutput](/agent-sdk/typescript/models/openairesponsesinputtypefunctioncalloutput) | :heavy\_check\_mark: | N/A         |           |
| `id`     | *string*                                                                                                                     | :heavy\_minus\_sign: | N/A         |           |
| `callId` | *string*                                                                                                                     | :heavy\_check\_mark: | N/A         |           |
| `output` | *string*                                                                                                                     | :heavy\_check\_mark: | N/A         |           |
| `status` | [models.ToolCallStatus](/agent-sdk/typescript/models/toolcallstatus)                                                         | :heavy\_minus\_sign: | N/A         | completed |
