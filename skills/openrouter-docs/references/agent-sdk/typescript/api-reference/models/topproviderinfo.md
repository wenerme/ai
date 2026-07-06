> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# TopProviderInfo - TypeScript SDK

> TopProviderInfo type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Information about the top provider for this model

## Example Usage

```typescript lines theme={null}
import { TopProviderInfo } from "@openrouter/sdk/models";

let value: TopProviderInfo = {
  isModerated: true,
};
```

## Fields

| Field                 | Type      | Required             | Description                                     | Example |
| --------------------- | --------- | -------------------- | ----------------------------------------------- | ------- |
| `contextLength`       | *number*  | :heavy\_minus\_sign: | Context length from the top provider            | 8192    |
| `isModerated`         | *boolean* | :heavy\_check\_mark: | Whether the top provider moderates content      | true    |
| `maxCompletionTokens` | *number*  | :heavy\_minus\_sign: | Maximum completion tokens from the top provider | 4096    |
