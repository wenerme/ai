> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# UpdateKeysData - TypeScript SDK

> UpdateKeysData type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

The updated API key information

## Example Usage

```typescript expandable lines theme={null}
import { UpdateKeysData } from "@openrouter/sdk/models/operations";

let value: UpdateKeysData = {
  byokUsage: 17.38,
  byokUsageDaily: 17.38,
  byokUsageMonthly: 17.38,
  byokUsageWeekly: 17.38,
  createdAt: "2025-08-24T10:30:00Z",
  creatorUserId: "user_2dHFtVWx2n56w6HkM0000000000",
  disabled: false,
  hash: "f01d52606dc8f0a8303a7b5cc3fa07109c2e346cec7c0a16b40de462992ce943",
  includeByokInLimit: false,
  label: "sk-or-v1-0e6...1c96",
  limit: 100,
  limitRemaining: 74.5,
  limitReset: "monthly",
  name: "My Production Key",
  updatedAt: "2025-08-24T15:45:00Z",
  usage: 25.5,
  usageDaily: 25.5,
  usageMonthly: 25.5,
  usageWeekly: 25.5,
  workspaceId: "0df9e665-d932-5740-b2c7-b52af166bc11",
};
```

## Fields

| Field                | Type                                                                                          | Required             | Description                                                                                                                                           | Example                                                          |
| -------------------- | --------------------------------------------------------------------------------------------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| `byokUsage`          | *number*                                                                                      | :heavy\_check\_mark: | Total external BYOK usage (in USD) for the API key                                                                                                    | 17.38                                                            |
| `byokUsageDaily`     | *number*                                                                                      | :heavy\_check\_mark: | External BYOK usage (in USD) for the current UTC day                                                                                                  | 17.38                                                            |
| `byokUsageMonthly`   | *number*                                                                                      | :heavy\_check\_mark: | External BYOK usage (in USD) for current UTC month                                                                                                    | 17.38                                                            |
| `byokUsageWeekly`    | *number*                                                                                      | :heavy\_check\_mark: | External BYOK usage (in USD) for the current UTC week (Monday-Sunday)                                                                                 | 17.38                                                            |
| `createdAt`          | *string*                                                                                      | :heavy\_check\_mark: | ISO 8601 timestamp of when the API key was created                                                                                                    | 2025-08-24T10:30:00Z                                             |
| `creatorUserId`      | *string*                                                                                      | :heavy\_check\_mark: | The user ID of the key creator. For organization-owned keys, this is the member who created the key. For individual users, this is the user's own ID. | user\_2dHFtVWx2n56w6HkM0000000000                                |
| `disabled`           | *boolean*                                                                                     | :heavy\_check\_mark: | Whether the API key is disabled                                                                                                                       | false                                                            |
| `expiresAt`          | [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) | :heavy\_minus\_sign: | ISO 8601 UTC timestamp when the API key expires, or null if no expiration                                                                             | 2027-12-31T23:59:59Z                                             |
| `hash`               | *string*                                                                                      | :heavy\_check\_mark: | Unique hash identifier for the API key                                                                                                                | f01d52606dc8f0a8303a7b5cc3fa07109c2e346cec7c0a16b40de462992ce943 |
| `includeByokInLimit` | *boolean*                                                                                     | :heavy\_check\_mark: | Whether to include external BYOK usage in the credit limit                                                                                            | false                                                            |
| `label`              | *string*                                                                                      | :heavy\_check\_mark: | Human-readable label for the API key                                                                                                                  | sk-or-v1-0e6...1c96                                              |
| `limit`              | *number*                                                                                      | :heavy\_check\_mark: | Spending limit for the API key in USD                                                                                                                 | 100                                                              |
| `limitRemaining`     | *number*                                                                                      | :heavy\_check\_mark: | Remaining spending limit in USD                                                                                                                       | 74.5                                                             |
| `limitReset`         | *string*                                                                                      | :heavy\_check\_mark: | Type of limit reset for the API key                                                                                                                   | monthly                                                          |
| `name`               | *string*                                                                                      | :heavy\_check\_mark: | Name of the API key                                                                                                                                   | My Production Key                                                |
| `updatedAt`          | *string*                                                                                      | :heavy\_check\_mark: | ISO 8601 timestamp of when the API key was last updated                                                                                               | 2025-08-24T15:45:00Z                                             |
| `usage`              | *number*                                                                                      | :heavy\_check\_mark: | Total OpenRouter credit usage (in USD) for the API key                                                                                                | 25.5                                                             |
| `usageDaily`         | *number*                                                                                      | :heavy\_check\_mark: | OpenRouter credit usage (in USD) for the current UTC day                                                                                              | 25.5                                                             |
| `usageMonthly`       | *number*                                                                                      | :heavy\_check\_mark: | OpenRouter credit usage (in USD) for the current UTC month                                                                                            | 25.5                                                             |
| `usageWeekly`        | *number*                                                                                      | :heavy\_check\_mark: | OpenRouter credit usage (in USD) for the current UTC week (Monday-Sunday)                                                                             | 25.5                                                             |
| `workspaceId`        | *string*                                                                                      | :heavy\_check\_mark: | The workspace ID this API key belongs to.                                                                                                             | 0df9e665-d932-5740-b2c7-b52af166bc11                             |
