> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# CreateKeysRequest - TypeScript SDK

> CreateKeysRequest method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { CreateKeysRequest } from "@openrouter/sdk/models/operations";

let value: CreateKeysRequest = {
  name: "My New API Key",
};
```

## Fields

| Field                | Type                                                                                          | Required             | Description                                                                                                                                                           | Example              |
| -------------------- | --------------------------------------------------------------------------------------------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `name`               | *string*                                                                                      | :heavy\_check\_mark: | Name for the new API key                                                                                                                                              | My New API Key       |
| `limit`              | *number*                                                                                      | :heavy\_minus\_sign: | Optional spending limit for the API key in USD                                                                                                                        | 50                   |
| `limitReset`         | [operations.CreateKeysLimitReset](/docs/agent-sdk/typescript/operations/createkeyslimitreset)      | :heavy\_minus\_sign: | Type of limit reset for the API key (daily, weekly, monthly, or null for no reset). Resets happen automatically at midnight UTC, and weeks are Monday through Sunday. | monthly              |
| `includeByokInLimit` | *boolean*                                                                                     | :heavy\_minus\_sign: | Whether to include BYOK usage in the limit                                                                                                                            | true                 |
| `expiresAt`          | [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) | :heavy\_minus\_sign: | Optional ISO 8601 UTC timestamp when the API key should expire. Must be UTC, other timezones will be rejected                                                         | 2027-12-31T23:59:59Z |
