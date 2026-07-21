> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# UpdateKeysRequestBody - TypeScript SDK

> UpdateKeysRequestBody method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { UpdateKeysRequestBody } from "@openrouter/sdk/models/operations";

let value: UpdateKeysRequestBody = {};
```

## Fields

| Field                | Type                                                                                     | Required             | Description                                                                                                                                                            | Example              |
| -------------------- | ---------------------------------------------------------------------------------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `name`               | *string*                                                                                 | :heavy\_minus\_sign: | New name for the API key                                                                                                                                               | Updated API Key Name |
| `disabled`           | *boolean*                                                                                | :heavy\_minus\_sign: | Whether to disable the API key                                                                                                                                         | false                |
| `limit`              | *number*                                                                                 | :heavy\_minus\_sign: | New spending limit for the API key in USD                                                                                                                              | 75                   |
| `limitReset`         | [operations.UpdateKeysLimitReset](/docs/agent-sdk/typescript/operations/updatekeyslimitreset) | :heavy\_minus\_sign: | New limit reset type for the API key (daily, weekly, monthly, or null for no reset). Resets happen automatically at midnight UTC, and weeks are Monday through Sunday. | daily                |
| `includeByokInLimit` | *boolean*                                                                                | :heavy\_minus\_sign: | Whether to include BYOK usage in the limit                                                                                                                             | true                 |
