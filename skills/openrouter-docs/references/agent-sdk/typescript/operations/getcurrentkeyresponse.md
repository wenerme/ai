> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# GetCurrentKeyResponse - TypeScript SDK

> GetCurrentKeyResponse method reference

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
    label: "OPENROUTER_API_KEY_EXAMPLE",
    limit: 100,
    usage: 25.5,
    usageDaily: 25.5,
    usageWeekly: 25.5,
    usageMonthly: 25.5,
    byokUsage: 17.38,
    byokUsageDaily: 17.38,
    byokUsageWeekly: 17.38,
    byokUsageMonthly: 17.38,
    isFreeTier: false,
    isProvisioningKey: false,
    limitRemaining: 74.5,
    limitReset: "monthly",
    includeByokInLimit: false,
    rateLimit: {
      requests: 1000,
      interval: "1h",
      note: "This field is deprecated and safe to ignore.",
    },
  },
};
```

## Fields

| Field  | Type                                                                               | Required             | Description                 | Example                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ------ | ---------------------------------------------------------------------------------- | -------------------- | --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data` | [operations.GetCurrentKeyData](/docs/agent-sdk/typescript/operations/getcurrentkeydata) | :heavy\_check\_mark: | Current API key information | `{"label": "OPENROUTER_API_KEY_EXAMPLE","limit": 100,"usage": 25.5,"usage_daily": 25.5,"usage_weekly": 25.5,"usage_monthly": 25.5,"byok_usage": 17.38,"byok_usage_daily": 17.38,"byok_usage_weekly": 17.38,"byok_usage_monthly": 17.38,"is_free_tier": false,"is_provisioning_key": false,"limit_remaining": 74.5,"limit_reset": "monthly","include_byok_in_limit": false,"expires_at": "2027-12-31T23:59:59Z","rate_limit": {"requests": 1000,"interval": "1h","note": "This field is deprecated and safe to ignore."}`<br />} |
