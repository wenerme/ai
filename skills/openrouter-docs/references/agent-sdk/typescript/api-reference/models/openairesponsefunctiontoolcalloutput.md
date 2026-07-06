> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# OpenAIResponseFunctionToolCallOutput - TypeScript SDK

> OpenAIResponseFunctionToolCallOutput type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { OpenAIResponseFunctionToolCallOutput } from "@openrouter/sdk/models";

let value: OpenAIResponseFunctionToolCallOutput = {
  callId: "call-abc123",
  output: "{\"temperature\":72,\"conditions\":\"sunny\"}",
  type: "function_call_output",
};
```

## Fields

| Field    | Type                                                                                                                                       | Required             | Description | Example   |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------ | -------------------- | ----------- | --------- |
| `callId` | *string*                                                                                                                                   | :heavy\_check\_mark: | N/A         |           |
| `id`     | *string*                                                                                                                                   | :heavy\_minus\_sign: | N/A         |           |
| `output` | *models.OpenAIResponseFunctionToolCallOutputOutput2*                                                                                       | :heavy\_check\_mark: | N/A         |           |
| `status` | [models.OpenAIResponseFunctionToolCallOutputStatus](/agent-sdk/typescript/api-reference/models/openairesponsefunctiontoolcalloutputstatus) | :heavy\_minus\_sign: | N/A         | completed |
| `type`   | [models.OpenAIResponseFunctionToolCallOutputType](/agent-sdk/typescript/api-reference/models/openairesponsefunctiontoolcalloutputtype)     | :heavy\_check\_mark: | N/A         |           |
