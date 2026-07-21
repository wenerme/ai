> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# CreateKeysResponse - TypeScript SDK

> CreateKeysResponse type definition

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
    byokUsage: 0,
    byokUsageDaily: 0,
    byokUsageMonthly: 0,
    byokUsageWeekly: 0,
    createdAt: "2025-08-24T10:30:00Z",
    creatorUserId: "user_2dHFtVWx2n56w6HkM0000000000",
    disabled: false,
    hash: "f01d52606dc8f0a8303a7b5cc3fa07109c2e346cec7c0a16b40de462992ce943",
    includeByokInLimit: true,
    label: "My New API Key",
    limit: 50,
    limitRemaining: 50,
    limitReset: "monthly",
    name: "My New API Key",
    updatedAt: null,
    usage: 0,
    usageDaily: 0,
    usageMonthly: 0,
    usageWeekly: 0,
    workspaceId: "0df9e665-d932-5740-b2c7-b52af166bc11",
  },
  key:
    "OPENROUTER_API_KEY_EXAMPLE",
};
```

## Fields

| Field  | Type                                                                                       | Required             | Description                                 | Example                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ------ | ------------------------------------------------------------------------------------------ | -------------------- | ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data` | [operations.CreateKeysData](/docs/agent-sdk/typescript/api-reference/operations/createkeysdata) | :heavy\_check\_mark: | The created API key information             | `{"byok_usage": 17.38,"byok_usage_daily": 17.38,"byok_usage_monthly": 17.38,"byok_usage_weekly": 17.38,"created_at": "2025-08-24T10:30:00Z","creator_user_id": "user_2dHFtVWx2n56w6HkM0000000000","disabled": false,"expires_at": "2027-12-31T23:59:59Z","hash": "f01d52606dc8f0a8303a7b5cc3fa07109c2e346cec7c0a16b40de462992ce943","include_byok_in_limit": false,"label": "sk-or-v1-0e6...1c96","limit": 100,"limit_remaining": 74.5,"limit_reset": "monthly","name": "My Production Key","updated_at": "2025-08-24T15:45:00Z","usage": 25.5,"usage_daily": 25.5,"usage_monthly": 25.5,"usage_weekly": 25.5,"workspace_id": "0df9e665-d932-5740-b2c7-b52af166bc11"}` |
| `key`  | *string*                                                                                   | :heavy\_check\_mark: | The actual API key string (only shown once) | OPENROUTER_API_KEY_EXAMPLE                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
