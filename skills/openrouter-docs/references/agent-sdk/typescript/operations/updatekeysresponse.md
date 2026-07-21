> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# UpdateKeysResponse - TypeScript SDK

> UpdateKeysResponse method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

API key updated successfully

## Example Usage

```typescript expandable lines theme={null}
import { UpdateKeysResponse } from "@openrouter/sdk/models/operations";

let value: UpdateKeysResponse = {
  data: {
    hash:
      "OPENROUTER_API_KEY_EXAMPLE",
    name: "Updated API Key Name",
    label: "Updated API Key Name",
    disabled: false,
    limit: 75,
    limitRemaining: 49.5,
    limitReset: "daily",
    includeByokInLimit: true,
    usage: 25.5,
    usageDaily: 25.5,
    usageWeekly: 25.5,
    usageMonthly: 25.5,
    byokUsage: 17.38,
    byokUsageDaily: 17.38,
    byokUsageWeekly: 17.38,
    byokUsageMonthly: 17.38,
    createdAt: "2025-08-24T10:30:00Z",
    updatedAt: "2025-08-24T16:00:00Z",
  },
};
```

## Fields

| Field  | Type                                                                         | Required             | Description                     | Example                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ------ | ---------------------------------------------------------------------------- | -------------------- | ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data` | [operations.UpdateKeysData](/docs/agent-sdk/typescript/operations/updatekeysdata) | :heavy\_check\_mark: | The updated API key information | `{"hash": "OPENROUTER_API_KEY_EXAMPLE","name": "My Production Key","label": "Production API Key","disabled": false,"limit": 100,"limit_remaining": 74.5,"limit_reset": "monthly","include_byok_in_limit": false,"usage": 25.5,"usage_daily": 25.5,"usage_weekly": 25.5,"usage_monthly": 25.5,"byok_usage": 17.38,"byok_usage_daily": 17.38,"byok_usage_weekly": 17.38,"byok_usage_monthly": 17.38,"created_at": "2025-08-24T10:30:00Z","updated_at": "2025-08-24T15:45:00Z","expires_at": "2027-12-31T23:59:59Z"}` |
