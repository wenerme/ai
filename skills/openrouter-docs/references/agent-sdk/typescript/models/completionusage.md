> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# CompletionUsage - TypeScript SDK

> CompletionUsage method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { CompletionUsage } from "@openrouter/sdk/models";

let value: CompletionUsage = {
  promptTokens: 3945.12,
  completionTokens: 7037.32,
  totalTokens: 1194.53,
};
```

## Fields

| Field              | Type     | Required             | Description |
| ------------------ | -------- | -------------------- | ----------- |
| `promptTokens`     | *number* | :heavy\_check\_mark: | N/A         |
| `completionTokens` | *number* | :heavy\_check\_mark: | N/A         |
| `totalTokens`      | *number* | :heavy\_check\_mark: | N/A         |
