> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# CostDetails - TypeScript SDK

> CostDetails type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Breakdown of upstream inference costs

## Example Usage

```typescript lines theme={null}
import { CostDetails } from "@openrouter/sdk/models";

let value: CostDetails = {
  upstreamInferenceCompletionsCost: 0.0004,
  upstreamInferencePromptCost: 0.0008,
};
```

## Fields

| Field                              | Type     | Required             | Description |
| ---------------------------------- | -------- | -------------------- | ----------- |
| `upstreamInferenceCompletionsCost` | *number* | :heavy\_check\_mark: | N/A         |
| `upstreamInferenceCost`            | *number* | :heavy\_minus\_sign: | N/A         |
| `upstreamInferencePromptCost`      | *number* | :heavy\_check\_mark: | N/A         |
