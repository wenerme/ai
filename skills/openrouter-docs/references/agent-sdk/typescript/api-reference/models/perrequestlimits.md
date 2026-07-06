> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# PerRequestLimits - TypeScript SDK

> PerRequestLimits type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Per-request token limits

## Example Usage

```typescript lines theme={null}
import { PerRequestLimits } from "@openrouter/sdk/models";

let value: PerRequestLimits = {
  completionTokens: 1000,
  promptTokens: 1000,
};
```

## Fields

| Field              | Type     | Required             | Description                           | Example |
| ------------------ | -------- | -------------------- | ------------------------------------- | ------- |
| `completionTokens` | *number* | :heavy\_check\_mark: | Maximum completion tokens per request | 1000    |
| `promptTokens`     | *number* | :heavy\_check\_mark: | Maximum prompt tokens per request     | 1000    |
