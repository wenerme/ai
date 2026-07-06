> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# StopServerToolsWhenMaxTokensUsed - TypeScript SDK

> StopServerToolsWhenMaxTokensUsed type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Stop once cumulative token usage across the loop exceeds this threshold.

## Example Usage

```typescript lines theme={null}
import { StopServerToolsWhenMaxTokensUsed } from "@openrouter/sdk/models";

let value: StopServerToolsWhenMaxTokensUsed = {
  maxTokens: 945221,
  type: "max_tokens_used",
};
```

## Fields

| Field       | Type                  | Required             | Description |
| ----------- | --------------------- | -------------------- | ----------- |
| `maxTokens` | *number*              | :heavy\_check\_mark: | N/A         |
| `type`      | *"max\_tokens\_used"* | :heavy\_check\_mark: | N/A         |
