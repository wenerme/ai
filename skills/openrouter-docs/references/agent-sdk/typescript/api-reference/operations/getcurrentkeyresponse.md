> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# GetCurrentKeyResponse - TypeScript SDK

> GetCurrentKeyResponse type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

API key details

## Example Usage

```typescript expandable lines theme={null}
import { GetCurrentKeyResponse } from "@openrouter/sdk/models/operations";

let value: GetCurrentKeyResponse = {
  data: {
    byokUsage: 17.38,
    byokUsageDaily: 17.38,
    byokUsageMonthly: 17.38,
    byokUsageWeekly: 17.38,
    creatorUserId: "user_2dHFtVWx2n56w6HkM0000000000",
    includeByokInLimit: false,
    isFreeTier: false,
    isManagementKey: false,
    isProvisioningKey: false,
    label: "sk-or-v1-au7...890",
    limit: 100,
    limitRemaining: 74.5,
    limitReset: "monthly",
    rateLimit: {
      interval: "1h",
      note: "This field is deprecated and safe to ignore.",
      requests: 1000,
    },
    usage: 25.5,
    usageDaily: 25.5,
    usageMonthly: 25.5,
    usageWeekly: 25.5,
  },
};
```

## Fields

| Field  | Type                                                                                             | Required             | Description                 | Example                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ------ | ------------------------------------------------------------------------------------------------ | -------------------- | --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data` | [operations.GetCurrentKeyData](/agent-sdk/typescript/api-reference/operations/getcurrentkeydata) | :heavy\_check\_mark: | Current API key information | `{"byok_usage": 17.38,"byok_usage_daily": 17.38,"byok_usage_monthly": 17.38,"byok_usage_weekly": 17.38,"creator_user_id": "user_2dHFtVWx2n56w6HkM0000000000","expires_at": "2027-12-31T23:59:59Z","include_byok_in_limit": false,"is_free_tier": false,"is_management_key": false,"is_provisioning_key": false,"label": "sk-or-v1-au7...890","limit": 100,"limit_remaining": 74.5,"limit_reset": "monthly","rate_limit": {"interval": "1h","note": "This field is deprecated and safe to ignore.","requests": 1000}`,<br />"usage": 25.5,<br />"usage\_daily": 25.5,<br />"usage\_monthly": 25.5,<br />"usage\_weekly": 25.5<br />} |
