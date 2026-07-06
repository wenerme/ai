> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ReasoningDetailSummary - TypeScript SDK

> ReasoningDetailSummary type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Reasoning detail summary schema

## Example Usage

```typescript lines theme={null}
import { ReasoningDetailSummary } from "@openrouter/sdk/models";

let value: ReasoningDetailSummary = {
  summary:
    "The model analyzed the problem by first identifying key constraints, then evaluating possible solutions...",
  type: "reasoning.summary",
};
```

## Fields

| Field     | Type                                                                                 | Required             | Description | Example |
| --------- | ------------------------------------------------------------------------------------ | -------------------- | ----------- | ------- |
| `format`  | [models.ReasoningFormat](/agent-sdk/typescript/api-reference/models/reasoningformat) | :heavy\_minus\_sign: | N/A         | unknown |
| `id`      | *string*                                                                             | :heavy\_minus\_sign: | N/A         |         |
| `index`   | *number*                                                                             | :heavy\_minus\_sign: | N/A         |         |
| `summary` | *string*                                                                             | :heavy\_check\_mark: | N/A         |         |
| `type`    | *"reasoning.summary"*                                                                | :heavy\_check\_mark: | N/A         |         |
