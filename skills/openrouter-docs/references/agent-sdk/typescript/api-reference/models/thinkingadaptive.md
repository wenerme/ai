> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ThinkingAdaptive - TypeScript SDK

> ThinkingAdaptive type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { ThinkingAdaptive } from "@openrouter/sdk/models";

let value: ThinkingAdaptive = {
  type: "adaptive",
};
```

## Fields

| Field     | Type                                                                                                   | Required             | Description | Example    |
| --------- | ------------------------------------------------------------------------------------------------------ | -------------------- | ----------- | ---------- |
| `display` | [models.AnthropicThinkingDisplay](/agent-sdk/typescript/api-reference/models/anthropicthinkingdisplay) | :heavy\_minus\_sign: | N/A         | summarized |
| `type`    | *"adaptive"*                                                                                           | :heavy\_check\_mark: | N/A         |            |
