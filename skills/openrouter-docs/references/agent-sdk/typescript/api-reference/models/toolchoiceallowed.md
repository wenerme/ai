> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ToolChoiceAllowed - TypeScript SDK

> ToolChoiceAllowed type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Constrains the model to a pre-defined set of allowed tools

## Example Usage

```typescript lines theme={null}
import { ToolChoiceAllowed } from "@openrouter/sdk/models";

let value: ToolChoiceAllowed = {
  mode: "auto",
  tools: [
    {
      "name": "get_weather",
      "type": "function",
    },
  ],
  type: "allowed_tools",
};
```

## Fields

| Field   | Type                                                                                             | Required             | Description |
| ------- | ------------------------------------------------------------------------------------------------ | -------------------- | ----------- |
| `mode`  | *models.Mode*                                                                                    | :heavy\_check\_mark: | N/A         |
| `tools` | `Record<string, *any*>`\[]                                                                       | :heavy\_check\_mark: | N/A         |
| `type`  | [models.ToolChoiceAllowedType](/docs/agent-sdk/typescript/api-reference/models/toolchoiceallowedtype) | :heavy\_check\_mark: | N/A         |
