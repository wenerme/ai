> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# EditClearToolUses20250919 - TypeScript SDK

> EditClearToolUses20250919 type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { EditClearToolUses20250919 } from "@openrouter/sdk/models";

let value: EditClearToolUses20250919 = {
  type: "clear_tool_uses_20250919",
};
```

## Fields

| Field             | Type                                                                                                                   | Required             | Description | Example                                   |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------- | -------------------- | ----------- | ----------------------------------------- |
| `clearAtLeast`    | [models.AnthropicInputTokensClearAtLeast](/agent-sdk/typescript/api-reference/models/anthropicinputtokensclearatleast) | :heavy\_minus\_sign: | N/A         | `{"type": "input_tokens","value": 50000}` |
| `clearToolInputs` | *models.ClearToolInputs*                                                                                               | :heavy\_minus\_sign: | N/A         |                                           |
| `excludeTools`    | *string*\[]                                                                                                            | :heavy\_minus\_sign: | N/A         |                                           |
| `keep`            | [models.AnthropicToolUsesKeep](/agent-sdk/typescript/api-reference/models/anthropictooluseskeep)                       | :heavy\_minus\_sign: | N/A         | `{"type": "tool_uses","value": 5}`        |
| `trigger`         | *models.Trigger*                                                                                                       | :heavy\_minus\_sign: | N/A         |                                           |
| `type`            | *"clear\_tool\_uses\_20250919"*                                                                                        | :heavy\_check\_mark: | N/A         |                                           |
