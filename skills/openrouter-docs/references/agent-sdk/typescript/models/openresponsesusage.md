> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# OpenResponsesUsage - TypeScript SDK

> OpenResponsesUsage method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Token usage information for the response

## Example Usage

```typescript lines theme={null}
import { OpenResponsesUsage } from "@openrouter/sdk/models";

let value: OpenResponsesUsage = {
  inputTokens: 10,
  inputTokensDetails: {
    cachedTokens: 0,
  },
  outputTokens: 25,
  outputTokensDetails: {
    reasoningTokens: 0,
  },
  totalTokens: 35,
};
```

## Fields

| Field                 | Type                                                                           | Required             | Description                                                         |
| --------------------- | ------------------------------------------------------------------------------ | -------------------- | ------------------------------------------------------------------- |
| `inputTokens`         | *number*                                                                       | :heavy\_check\_mark: | N/A                                                                 |
| `inputTokensDetails`  | [models.InputTokensDetails](/docs/agent-sdk/typescript/models/inputtokensdetails)   | :heavy\_check\_mark: | N/A                                                                 |
| `outputTokens`        | *number*                                                                       | :heavy\_check\_mark: | N/A                                                                 |
| `outputTokensDetails` | [models.OutputTokensDetails](/docs/agent-sdk/typescript/models/outputtokensdetails) | :heavy\_check\_mark: | N/A                                                                 |
| `totalTokens`         | *number*                                                                       | :heavy\_check\_mark: | N/A                                                                 |
| `cost`                | *number*                                                                       | :heavy\_minus\_sign: | Cost of the completion                                              |
| `isByok`              | *boolean*                                                                      | :heavy\_minus\_sign: | Whether a request was made using a Bring Your Own Key configuration |
| `costDetails`         | [models.CostDetails](/docs/agent-sdk/typescript/models/costdetails)                 | :heavy\_minus\_sign: | N/A                                                                 |
