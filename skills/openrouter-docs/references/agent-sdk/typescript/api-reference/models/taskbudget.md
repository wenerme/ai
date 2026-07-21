> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# TaskBudget - TypeScript SDK

> TaskBudget type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Task budget for an agentic turn. The model sees a countdown of remaining tokens and uses it to prioritize work and wind down gracefully. Advisory — does not enforce a hard cap.

## Example Usage

```typescript lines theme={null}
import { TaskBudget } from "@openrouter/sdk/models";

let value: TaskBudget = {
  total: 400000,
  type: "tokens",
};
```

## Fields

| Field       | Type                                                                       | Required             | Description |
| ----------- | -------------------------------------------------------------------------- | -------------------- | ----------- |
| `remaining` | *number*                                                                   | :heavy\_minus\_sign: | N/A         |
| `total`     | *number*                                                                   | :heavy\_check\_mark: | N/A         |
| `type`      | [models.TypeTokens](/docs/agent-sdk/typescript/api-reference/models/typetokens) | :heavy\_check\_mark: | N/A         |
