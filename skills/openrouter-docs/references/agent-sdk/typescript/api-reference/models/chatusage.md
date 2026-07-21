> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ChatUsage - TypeScript SDK

> ChatUsage type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Token usage statistics

## Example Usage

```typescript lines theme={null}
import { ChatUsage } from "@openrouter/sdk/models";

let value: ChatUsage = {
  completionTokens: 15,
  promptTokens: 10,
  totalTokens: 25,
};
```

## Fields

| Field                     | Type                                                                                                 | Required             | Description                                                         | Example                                                                                                                    |
| ------------------------- | ---------------------------------------------------------------------------------------------------- | -------------------- | ------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `completionTokens`        | *number*                                                                                             | :heavy\_check\_mark: | Number of tokens in the completion                                  |                                                                                                                            |
| `completionTokensDetails` | [models.CompletionTokensDetails](/docs/agent-sdk/typescript/api-reference/models/completiontokensdetails) | :heavy\_minus\_sign: | Detailed completion token usage                                     |                                                                                                                            |
| `cost`                    | *number*                                                                                             | :heavy\_minus\_sign: | Cost of the completion                                              |                                                                                                                            |
| `costDetails`             | [models.CostDetails](/docs/agent-sdk/typescript/api-reference/models/costdetails)                         | :heavy\_minus\_sign: | Breakdown of upstream inference costs                               | `{"upstream_inference_completions_cost": 0.0004,"upstream_inference_cost": null,"upstream_inference_prompt_cost": 0.0008}` |
| `isByok`                  | *boolean*                                                                                            | :heavy\_minus\_sign: | Whether a request was made using a Bring Your Own Key configuration |                                                                                                                            |
| `promptTokens`            | *number*                                                                                             | :heavy\_check\_mark: | Number of tokens in the prompt                                      |                                                                                                                            |
| `promptTokensDetails`     | [models.PromptTokensDetails](/docs/agent-sdk/typescript/api-reference/models/prompttokensdetails)         | :heavy\_minus\_sign: | Detailed prompt token usage                                         |                                                                                                                            |
| `totalTokens`             | *number*                                                                                             | :heavy\_check\_mark: | Total number of tokens                                              |                                                                                                                            |
