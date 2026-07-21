> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# OpenAIResponsesInputFunctionCall - TypeScript SDK

> OpenAIResponsesInputFunctionCall method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { OpenAIResponsesInputFunctionCall } from "@openrouter/sdk/models";

let value: OpenAIResponsesInputFunctionCall = {
  type: "function_call",
  callId: "<id>",
  name: "<value>",
  arguments: "<value>",
};
```

## Fields

| Field       | Type                                                                                                             | Required             | Description | Example   |
| ----------- | ---------------------------------------------------------------------------------------------------------------- | -------------------- | ----------- | --------- |
| `type`      | [models.OpenAIResponsesInputTypeFunctionCall](/docs/agent-sdk/typescript/models/openairesponsesinputtypefunctioncall) | :heavy\_check\_mark: | N/A         |           |
| `callId`    | *string*                                                                                                         | :heavy\_check\_mark: | N/A         |           |
| `name`      | *string*                                                                                                         | :heavy\_check\_mark: | N/A         |           |
| `arguments` | *string*                                                                                                         | :heavy\_check\_mark: | N/A         |           |
| `id`        | *string*                                                                                                         | :heavy\_minus\_sign: | N/A         |           |
| `status`    | [models.ToolCallStatus](/docs/agent-sdk/typescript/models/toolcallstatus)                                             | :heavy\_minus\_sign: | N/A         | completed |
