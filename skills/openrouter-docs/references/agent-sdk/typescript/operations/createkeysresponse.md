> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# CreateKeysResponse - TypeScript SDK

> CreateKeysResponse method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

API key created successfully

## Example Usage

```typescript expandable lines theme={null}
import { CreateKeysResponse } from "@openrouter/sdk/models/operations";

let value: CreateKeysResponse = {
  data: {
    hash:
      "OPENROUTER_API_KEY_EXAMPLE",
    name: "My New API Key",
    label: "My New API Key",
    disabled: false,
    limit: 50,
    limitRemaining: 50,
    limitReset: "monthly",
    includeByokInLimit: true,
    usage: 0,
    usageDaily: 0,
    usageWeekly: 0,
    usageMonthly: 0,
    byokUsage: 0,
    byokUsageDaily: 0,
    byokUsageWeekly: 0,
    byokUsageMonthly: 0,
    createdAt: "2025-08-24T10:30:00Z",
    updatedAt: null,
  },
  key:
    "OPENROUTER_API_KEY_EXAMPLE",
};
```

## Fields

| Field  | Type                                                                         | Required             | Description                                 | Example                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ------ | ---------------------------------------------------------------------------- | -------------------- | ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data` | [operations.CreateKeysData](/docs/agent-sdk/typescript/operations/createkeysdata) | :heavy\_check\_mark: | The created API key information             | `{"hash": "OPENROUTER_API_KEY_EXAMPLE","name": "My Production Key","label": "Production API Key","disabled": false,"limit": 100,"limit_remaining": 74.5,"limit_reset": "monthly","include_byok_in_limit": false,"usage": 25.5,"usage_daily": 25.5,"usage_weekly": 25.5,"usage_monthly": 25.5,"byok_usage": 17.38,"byok_usage_daily": 17.38,"byok_usage_weekly": 17.38,"byok_usage_monthly": 17.38,"created_at": "2025-08-24T10:30:00Z","updated_at": "2025-08-24T15:45:00Z","expires_at": "2027-12-31T23:59:59Z"}` |
| `key`  | *string*                                                                     | :heavy\_check\_mark: | The actual API key string (only shown once) | OPENROUTER_API_KEY_EXAMPLE                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
