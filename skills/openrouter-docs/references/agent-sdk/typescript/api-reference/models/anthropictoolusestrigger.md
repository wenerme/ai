> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# AnthropicToolUsesTrigger - TypeScript SDK

> AnthropicToolUsesTrigger type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { AnthropicToolUsesTrigger } from "@openrouter/sdk/models";

let value: AnthropicToolUsesTrigger = {
  type: "tool_uses",
  value: 10,
};
```

## Fields

| Field   | Type           | Required             | Description |
| ------- | -------------- | -------------------- | ----------- |
| `type`  | *"tool\_uses"* | :heavy\_check\_mark: | N/A         |
| `value` | *number*       | :heavy\_check\_mark: | N/A         |
