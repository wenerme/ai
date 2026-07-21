> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ThinkingEnabled - TypeScript SDK

> ThinkingEnabled type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { ThinkingEnabled } from "@openrouter/sdk/models";

let value: ThinkingEnabled = {
  budgetTokens: 599839,
  type: "enabled",
};
```

## Fields

| Field          | Type                                                                                                   | Required             | Description | Example    |
| -------------- | ------------------------------------------------------------------------------------------------------ | -------------------- | ----------- | ---------- |
| `budgetTokens` | *number*                                                                                               | :heavy\_check\_mark: | N/A         |            |
| `display`      | [models.AnthropicThinkingDisplay](/docs/agent-sdk/typescript/api-reference/models/anthropicthinkingdisplay) | :heavy\_minus\_sign: | N/A         | summarized |
| `type`         | *"enabled"*                                                                                            | :heavy\_check\_mark: | N/A         |            |
