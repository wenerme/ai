> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ResponsesOutputItemFunctionCall - TypeScript SDK

> ResponsesOutputItemFunctionCall method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { ResponsesOutputItemFunctionCall } from "@openrouter/sdk/models";

let value: ResponsesOutputItemFunctionCall = {
  type: "function_call",
  name: "get_weather",
  arguments: "{\"location\":\"San Francisco\",\"unit\":\"celsius\"}",
  callId: "call-abc123",
};
```

## Fields

| Field       | Type                                                                                                           | Required             | Description |
| ----------- | -------------------------------------------------------------------------------------------------------------- | -------------------- | ----------- |
| `type`      | [models.ResponsesOutputItemFunctionCallType](/docs/agent-sdk/typescript/models/responsesoutputitemfunctioncalltype) | :heavy\_check\_mark: | N/A         |
| `id`        | *string*                                                                                                       | :heavy\_minus\_sign: | N/A         |
| `name`      | *string*                                                                                                       | :heavy\_check\_mark: | N/A         |
| `arguments` | *string*                                                                                                       | :heavy\_check\_mark: | N/A         |
| `callId`    | *string*                                                                                                       | :heavy\_check\_mark: | N/A         |
| `status`    | *models.ResponsesOutputItemFunctionCallStatusUnion*                                                            | :heavy\_minus\_sign: | N/A         |
