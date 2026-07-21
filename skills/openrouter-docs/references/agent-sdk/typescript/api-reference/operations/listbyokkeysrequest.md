> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ListBYOKKeysRequest - TypeScript SDK

> ListBYOKKeysRequest type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { ListBYOKKeysRequest } from "@openrouter/sdk/models/operations";

let value: ListBYOKKeysRequest = {};
```

## Fields

| Field           | Type                                                                           | Required             | Description                                                                                                                                                 | Example                              |
| --------------- | ------------------------------------------------------------------------------ | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| `httpReferer`   | *string*                                                                       | :heavy\_minus\_sign: | The app identifier should be your app's URL and is used as the primary identifier for rankings.<br />This is used to track API usage per application.<br /> |                                      |
| `appTitle`      | *string*                                                                       | :heavy\_minus\_sign: | The app display name allows you to customize how your app appears in OpenRouter's dashboard.<br />                                                          |                                      |
| `appCategories` | *string*                                                                       | :heavy\_minus\_sign: | Comma-separated list of app categories (e.g. "cli-agent,cloud-agent"). Used for marketplace rankings.<br />                                                 |                                      |
| `offset`        | *number*                                                                       | :heavy\_minus\_sign: | Number of records to skip for pagination                                                                                                                    | 0                                    |
| `limit`         | *number*                                                                       | :heavy\_minus\_sign: | Maximum number of records to return (max 100)                                                                                                               | 50                                   |
| `workspaceId`   | *string*                                                                       | :heavy\_minus\_sign: | Optional workspace ID to filter by. Defaults to the authenticated entity's default workspace.                                                               | 550e8400-e29b-41d4-a716-446655440000 |
| `provider`      | [operations.Provider](/docs/agent-sdk/typescript/api-reference/operations/provider) | :heavy\_minus\_sign: | Optional provider slug to filter by (e.g. `openai`, `anthropic`, `amazon-bedrock`).                                                                         | openai                               |
