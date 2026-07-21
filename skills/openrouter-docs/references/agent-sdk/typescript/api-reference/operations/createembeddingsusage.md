> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# CreateEmbeddingsUsage - TypeScript SDK

> CreateEmbeddingsUsage type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Token usage statistics

## Example Usage

```typescript lines theme={null}
import { CreateEmbeddingsUsage } from "@openrouter/sdk/models/operations";

let value: CreateEmbeddingsUsage = {
  promptTokens: 8,
  totalTokens: 8,
};
```

## Fields

| Field                 | Type                                                                                                 | Required             | Description                                                                                                                                                                                                   | Example |
| --------------------- | ---------------------------------------------------------------------------------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `cost`                | *number*                                                                                             | :heavy\_minus\_sign: | Cost of the request in credits                                                                                                                                                                                | 0.0001  |
| `promptTokens`        | *number*                                                                                             | :heavy\_check\_mark: | Number of tokens in the input                                                                                                                                                                                 | 8       |
| `promptTokensDetails` | [operations.PromptTokensDetails](/docs/agent-sdk/typescript/api-reference/operations/prompttokensdetails) | :heavy\_minus\_sign: | Per-modality token breakdown. Only present when the input contains 2+ modalities (e.g. text + image) and the upstream provider returns modality-level usage data. Only non-zero modality counts are included. |         |
| `totalTokens`         | *number*                                                                                             | :heavy\_check\_mark: | Total number of tokens used                                                                                                                                                                                   | 8       |
