> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# OpenResponsesFunctionToolCall - TypeScript SDK

> OpenResponsesFunctionToolCall method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

A function call initiated by the model

## Example Usage

```typescript lines theme={null}
import { OpenResponsesFunctionToolCall } from "@openrouter/sdk/models";

let value: OpenResponsesFunctionToolCall = {
  type: "function_call",
  callId: "call-abc123",
  name: "get_weather",
  arguments: "{\"location\":\"San Francisco\"}",
  id: "call-abc123",
};
```

## Fields

| Field       | Type                                                                                                       | Required             | Description | Example   |
| ----------- | ---------------------------------------------------------------------------------------------------------- | -------------------- | ----------- | --------- |
| `type`      | [models.OpenResponsesFunctionToolCallType](/docs/agent-sdk/typescript/models/openresponsesfunctiontoolcalltype) | :heavy\_check\_mark: | N/A         |           |
| `callId`    | *string*                                                                                                   | :heavy\_check\_mark: | N/A         |           |
| `name`      | *string*                                                                                                   | :heavy\_check\_mark: | N/A         |           |
| `arguments` | *string*                                                                                                   | :heavy\_check\_mark: | N/A         |           |
| `id`        | *string*                                                                                                   | :heavy\_check\_mark: | N/A         |           |
| `status`    | [models.ToolCallStatus](/docs/agent-sdk/typescript/models/toolcallstatus)                                       | :heavy\_minus\_sign: | N/A         | completed |
