> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# OpenAIResponseCustomToolCallOutput - TypeScript SDK

> OpenAIResponseCustomToolCallOutput type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { OpenAIResponseCustomToolCallOutput } from "@openrouter/sdk/models";

let value: OpenAIResponseCustomToolCallOutput = {
  callId: "call-abc123",
  output: "patch applied successfully",
  type: "custom_tool_call_output",
};
```

## Fields

| Field    | Type                                                                                                                               | Required             | Description |
| -------- | ---------------------------------------------------------------------------------------------------------------------------------- | -------------------- | ----------- |
| `callId` | *string*                                                                                                                           | :heavy\_check\_mark: | N/A         |
| `id`     | *string*                                                                                                                           | :heavy\_minus\_sign: | N/A         |
| `output` | *models.OpenAIResponseCustomToolCallOutputOutput2*                                                                                 | :heavy\_check\_mark: | N/A         |
| `type`   | [models.OpenAIResponseCustomToolCallOutputType](/docs/agent-sdk/typescript/api-reference/models/openairesponsecustomtoolcalloutputtype) | :heavy\_check\_mark: | N/A         |
