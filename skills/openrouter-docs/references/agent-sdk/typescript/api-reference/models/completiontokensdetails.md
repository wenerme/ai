> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# CompletionTokensDetails - TypeScript SDK

> CompletionTokensDetails type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Detailed completion token usage

## Example Usage

```typescript lines theme={null}
import { CompletionTokensDetails } from "@openrouter/sdk/models";

let value: CompletionTokensDetails = {};
```

## Fields

| Field                      | Type     | Required             | Description                  |
| -------------------------- | -------- | -------------------- | ---------------------------- |
| `acceptedPredictionTokens` | *number* | :heavy\_minus\_sign: | Accepted prediction tokens   |
| `audioTokens`              | *number* | :heavy\_minus\_sign: | Tokens used for audio output |
| `reasoningTokens`          | *number* | :heavy\_minus\_sign: | Tokens used for reasoning    |
| `rejectedPredictionTokens` | *number* | :heavy\_minus\_sign: | Rejected prediction tokens   |
