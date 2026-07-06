> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# CreateKeysData - TypeScript SDK

> CreateKeysData method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

The created API key information

## Example Usage

```typescript expandable lines theme={null}
import { CreateKeysData } from "@openrouter/sdk/models/operations";

let value: CreateKeysData = {
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
};
```

## Fields

| Field                | Type                                                                                          | Required             | Description                                                               | Example                                                                   |
| -------------------- | --------------------------------------------------------------------------------------------- | -------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `hash`               | *string*                                                                                      | :heavy\_check\_mark: | Unique hash identifier for the API key                                    | OPENROUTER_API_KEY_EXAMPLE |
| `name`               | *string*                                                                                      | :heavy\_check\_mark: | Name of the API key                                                       | My Production Key                                                         |
| `label`              | *string*                                                                                      | :heavy\_check\_mark: | Human-readable label for the API key                                      | Production API Key                                                        |
| `disabled`           | *boolean*                                                                                     | :heavy\_check\_mark: | Whether the API key is disabled                                           | false                                                                     |
| `limit`              | *number*                                                                                      | :heavy\_check\_mark: | Spending limit for the API key in USD                                     | 100                                                                       |
| `limitRemaining`     | *number*                                                                                      | :heavy\_check\_mark: | Remaining spending limit in USD                                           | 74.5                                                                      |
| `limitReset`         | *string*                                                                                      | :heavy\_check\_mark: | Type of limit reset for the API key                                       | monthly                                                                   |
| `includeByokInLimit` | *boolean*                                                                                     | :heavy\_check\_mark: | Whether to include external BYOK usage in the credit limit                | false                                                                     |
| `usage`              | *number*                                                                                      | :heavy\_check\_mark: | Total OpenRouter credit usage (in USD) for the API key                    | 25.5                                                                      |
| `usageDaily`         | *number*                                                                                      | :heavy\_check\_mark: | OpenRouter credit usage (in USD) for the current UTC day                  | 25.5                                                                      |
| `usageWeekly`        | *number*                                                                                      | :heavy\_check\_mark: | OpenRouter credit usage (in USD) for the current UTC week (Monday-Sunday) | 25.5                                                                      |
| `usageMonthly`       | *number*                                                                                      | :heavy\_check\_mark: | OpenRouter credit usage (in USD) for the current UTC month                | 25.5                                                                      |
| `byokUsage`          | *number*                                                                                      | :heavy\_check\_mark: | Total external BYOK usage (in USD) for the API key                        | 17.38                                                                     |
| `byokUsageDaily`     | *number*                                                                                      | :heavy\_check\_mark: | External BYOK usage (in USD) for the current UTC day                      | 17.38                                                                     |
| `byokUsageWeekly`    | *number*                                                                                      | :heavy\_check\_mark: | External BYOK usage (in USD) for the current UTC week (Monday-Sunday)     | 17.38                                                                     |
| `byokUsageMonthly`   | *number*                                                                                      | :heavy\_check\_mark: | External BYOK usage (in USD) for current UTC month                        | 17.38                                                                     |
| `createdAt`          | *string*                                                                                      | :heavy\_check\_mark: | ISO 8601 timestamp of when the API key was created                        | 2025-08-24T10:30:00Z                                                      |
| `updatedAt`          | *string*                                                                                      | :heavy\_check\_mark: | ISO 8601 timestamp of when the API key was last updated                   | 2025-08-24T15:45:00Z                                                      |
| `expiresAt`          | [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) | :heavy\_minus\_sign: | ISO 8601 UTC timestamp when the API key expires, or null if no expiration | 2027-12-31T23:59:59Z                                                      |
