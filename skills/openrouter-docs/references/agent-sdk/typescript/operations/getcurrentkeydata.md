> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# GetCurrentKeyData - TypeScript SDK

> GetCurrentKeyData method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Current API key information

## Example Usage

```typescript expandable lines theme={null}
import { GetCurrentKeyData } from "@openrouter/sdk/models/operations";

let value: GetCurrentKeyData = {
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
};
```

## Fields

| Field                | Type                                                                                          | Required             | Description                                                                                                                                                                                              | Example                                                                                      |
| -------------------- | --------------------------------------------------------------------------------------------- | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `label`              | *string*                                                                                      | :heavy\_check\_mark: | Human-readable label for the API key                                                                                                                                                                     | OPENROUTER_API_KEY_EXAMPLE                    |
| `limit`              | *number*                                                                                      | :heavy\_check\_mark: | Spending limit for the API key in USD                                                                                                                                                                    | 100                                                                                          |
| `usage`              | *number*                                                                                      | :heavy\_check\_mark: | Total OpenRouter credit usage (in USD) for the API key                                                                                                                                                   | 25.5                                                                                         |
| `usageDaily`         | *number*                                                                                      | :heavy\_check\_mark: | OpenRouter credit usage (in USD) for the current UTC day                                                                                                                                                 | 25.5                                                                                         |
| `usageWeekly`        | *number*                                                                                      | :heavy\_check\_mark: | OpenRouter credit usage (in USD) for the current UTC week (Monday-Sunday)                                                                                                                                | 25.5                                                                                         |
| `usageMonthly`       | *number*                                                                                      | :heavy\_check\_mark: | OpenRouter credit usage (in USD) for the current UTC month                                                                                                                                               | 25.5                                                                                         |
| `byokUsage`          | *number*                                                                                      | :heavy\_check\_mark: | Total external BYOK usage (in USD) for the API key                                                                                                                                                       | 17.38                                                                                        |
| `byokUsageDaily`     | *number*                                                                                      | :heavy\_check\_mark: | External BYOK usage (in USD) for the current UTC day                                                                                                                                                     | 17.38                                                                                        |
| `byokUsageWeekly`    | *number*                                                                                      | :heavy\_check\_mark: | External BYOK usage (in USD) for the current UTC week (Monday-Sunday)                                                                                                                                    | 17.38                                                                                        |
| `byokUsageMonthly`   | *number*                                                                                      | :heavy\_check\_mark: | External BYOK usage (in USD) for current UTC month                                                                                                                                                       | 17.38                                                                                        |
| `isFreeTier`         | *boolean*                                                                                     | :heavy\_check\_mark: | Whether this is a free tier API key                                                                                                                                                                      | false                                                                                        |
| `isProvisioningKey`  | *boolean*                                                                                     | :heavy\_check\_mark: | Whether this is a provisioning key                                                                                                                                                                       | false                                                                                        |
| `limitRemaining`     | *number*                                                                                      | :heavy\_check\_mark: | Remaining spending limit in USD                                                                                                                                                                          | 74.5                                                                                         |
| `limitReset`         | *string*                                                                                      | :heavy\_check\_mark: | Type of limit reset for the API key                                                                                                                                                                      | monthly                                                                                      |
| `includeByokInLimit` | *boolean*                                                                                     | :heavy\_check\_mark: | Whether to include external BYOK usage in the credit limit                                                                                                                                               | false                                                                                        |
| `expiresAt`          | [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) | :heavy\_minus\_sign: | ISO 8601 UTC timestamp when the API key expires, or null if no expiration                                                                                                                                | 2027-12-31T23:59:59Z                                                                         |
| ~~`rateLimit`~~      | [operations.RateLimit](/docs/agent-sdk/typescript/operations/ratelimit)                            | :heavy\_check\_mark: | : warning: \*\* DEPRECATED \*\*: This will be removed in a future release, please migrate away from it as soon as possible.<br /><br />Legacy rate limit information about a key. Will always return -1. | `{"requests": 1000,"interval": "1h","note": "This field is deprecated and safe to ignore."}` |
