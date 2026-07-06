> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# PromptTokensDetails - TypeScript SDK

> PromptTokensDetails type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Detailed prompt token usage

## Example Usage

```typescript lines theme={null}
import { PromptTokensDetails } from "@openrouter/sdk/models";

let value: PromptTokensDetails = {};
```

## Fields

| Field              | Type     | Required             | Description                                                                                      |
| ------------------ | -------- | -------------------- | ------------------------------------------------------------------------------------------------ |
| `audioTokens`      | *number* | :heavy\_minus\_sign: | Audio input tokens                                                                               |
| `cacheWriteTokens` | *number* | :heavy\_minus\_sign: | Tokens written to cache. Only returned for models with explicit caching and cache write pricing. |
| `cachedTokens`     | *number* | :heavy\_minus\_sign: | Cached prompt tokens                                                                             |
| `videoTokens`      | *number* | :heavy\_minus\_sign: | Video input tokens                                                                               |
