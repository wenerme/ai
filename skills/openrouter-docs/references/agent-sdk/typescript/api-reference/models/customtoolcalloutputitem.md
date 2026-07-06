> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# CustomToolCallOutputItem - TypeScript SDK

> CustomToolCallOutputItem type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

The output from a custom (freeform-grammar) tool call execution. Mirrors `function_call_output` but is matched to a `custom_tool_call` rather than a `function_call`.

## Example Usage

```typescript lines theme={null}
import { CustomToolCallOutputItem } from "@openrouter/sdk/models";

let value: CustomToolCallOutputItem = {
  callId: "call-abc123",
  output: "patch applied successfully",
  type: "custom_tool_call_output",
};
```

## Fields

| Field    | Type                                                                                                                                                   | Required             | Description |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------- | ----------- |
| `callId` | *string*                                                                                                                                               | :heavy\_check\_mark: | N/A         |
| `id`     | *string*                                                                                                                                               | :heavy\_minus\_sign: | N/A         |
| `output` | *models.CustomToolCallOutputItemOutputUnion2*                                                                                                          | :heavy\_check\_mark: | N/A         |
| `type`   | [models.CustomToolCallOutputItemTypeCustomToolCallOutput](/agent-sdk/typescript/api-reference/models/customtoolcalloutputitemtypecustomtoolcalloutput) | :heavy\_check\_mark: | N/A         |
