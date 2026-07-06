> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ListResponse - TypeScript SDK

> ListResponse method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

List of API keys

## Example Usage

```typescript expandable lines theme={null}
import { ListResponse } from "@openrouter/sdk/models/operations";

let value: ListResponse = {
  data: [
    {
      hash:
        "OPENROUTER_API_KEY_EXAMPLE",
      name: "My Production Key",
      label: "Production API Key",
      disabled: false,
      limit: 100,
      limitRemaining: 74.5,
      limitReset: "monthly",
      includeByokInLimit: false,
      usage: 25.5,
      usageDaily: 25.5,
      usageWeekly: 25.5,
      usageMonthly: 25.5,
      byokUsage: 17.38,
      byokUsageDaily: 17.38,
      byokUsageWeekly: 17.38,
      byokUsageMonthly: 17.38,
      createdAt: "2025-08-24T10:30:00Z",
      updatedAt: "2025-08-24T15:45:00Z",
    },
  ],
};
```

## Fields

| Field  | Type                                                                | Required             | Description      |
| ------ | ------------------------------------------------------------------- | -------------------- | ---------------- |
| `data` | [operations.ListData](/agent-sdk/typescript/operations/listdata)\[] | :heavy\_check\_mark: | List of API keys |
