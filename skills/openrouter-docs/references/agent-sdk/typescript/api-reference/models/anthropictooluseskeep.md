> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# AnthropicToolUsesKeep - TypeScript SDK

> AnthropicToolUsesKeep type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { AnthropicToolUsesKeep } from "@openrouter/sdk/models";

let value: AnthropicToolUsesKeep = {
  type: "tool_uses",
  value: 5,
};
```

## Fields

| Field   | Type                                                                                                     | Required             | Description |
| ------- | -------------------------------------------------------------------------------------------------------- | -------------------- | ----------- |
| `type`  | [models.AnthropicToolUsesKeepType](/docs/agent-sdk/typescript/api-reference/models/anthropictooluseskeeptype) | :heavy\_check\_mark: | N/A         |
| `value` | *number*                                                                                                 | :heavy\_check\_mark: | N/A         |
