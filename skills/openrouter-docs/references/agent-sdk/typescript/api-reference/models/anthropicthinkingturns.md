> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# AnthropicThinkingTurns - TypeScript SDK

> AnthropicThinkingTurns type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { AnthropicThinkingTurns } from "@openrouter/sdk/models";

let value: AnthropicThinkingTurns = {
  type: "thinking_turns",
  value: 3,
};
```

## Fields

| Field   | Type                                                                                                       | Required             | Description |
| ------- | ---------------------------------------------------------------------------------------------------------- | -------------------- | ----------- |
| `type`  | [models.AnthropicThinkingTurnsType](/agent-sdk/typescript/api-reference/models/anthropicthinkingturnstype) | :heavy\_check\_mark: | N/A         |
| `value` | *number*                                                                                                   | :heavy\_check\_mark: | N/A         |
