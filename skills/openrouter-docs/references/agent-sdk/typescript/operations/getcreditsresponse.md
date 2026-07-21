> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# GetCreditsResponse - TypeScript SDK

> GetCreditsResponse method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Total credits purchased and used

## Example Usage

```typescript lines theme={null}
import { GetCreditsResponse } from "@openrouter/sdk/models/operations";

let value: GetCreditsResponse = {
  data: {
    totalCredits: 100.5,
    totalUsage: 25.75,
  },
};
```

## Fields

| Field  | Type                                                                         | Required             | Description | Example                                         |
| ------ | ---------------------------------------------------------------------------- | -------------------- | ----------- | ----------------------------------------------- |
| `data` | [operations.GetCreditsData](/docs/agent-sdk/typescript/operations/getcreditsdata) | :heavy\_check\_mark: | N/A         | `{"total_credits": 100.5,"total_usage": 25.75}` |
