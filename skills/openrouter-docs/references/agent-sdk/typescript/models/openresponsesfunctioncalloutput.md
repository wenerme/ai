> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# OpenResponsesFunctionCallOutput - TypeScript SDK

> OpenResponsesFunctionCallOutput method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

The output from a function call execution

## Example Usage

```typescript lines theme={null}
import { OpenResponsesFunctionCallOutput } from "@openrouter/sdk/models";

let value: OpenResponsesFunctionCallOutput = {
  type: "function_call_output",
  callId: "call-abc123",
  output: "{\"temperature\":72,\"conditions\":\"sunny\"}",
};
```

## Fields

| Field    | Type                                                                                                           | Required             | Description | Example   |
| -------- | -------------------------------------------------------------------------------------------------------------- | -------------------- | ----------- | --------- |
| `type`   | [models.OpenResponsesFunctionCallOutputType](/docs/agent-sdk/typescript/models/openresponsesfunctioncalloutputtype) | :heavy\_check\_mark: | N/A         |           |
| `id`     | *string*                                                                                                       | :heavy\_minus\_sign: | N/A         |           |
| `callId` | *string*                                                                                                       | :heavy\_check\_mark: | N/A         |           |
| `output` | *string*                                                                                                       | :heavy\_check\_mark: | N/A         |           |
| `status` | [models.ToolCallStatus](/docs/agent-sdk/typescript/models/toolcallstatus)                                           | :heavy\_minus\_sign: | N/A         | completed |
