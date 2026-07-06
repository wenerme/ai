> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ListRequest - TypeScript SDK

> ListRequest type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { ListRequest } from "@openrouter/sdk/models/operations";

let value: ListRequest = {};
```

## Fields

| Field             | Type      | Required             | Description                                                                                                                                                 | Example                              |
| ----------------- | --------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| `httpReferer`     | *string*  | :heavy\_minus\_sign: | The app identifier should be your app's URL and is used as the primary identifier for rankings.<br />This is used to track API usage per application.<br /> |                                      |
| `appTitle`        | *string*  | :heavy\_minus\_sign: | The app display name allows you to customize how your app appears in OpenRouter's dashboard.<br />                                                          |                                      |
| `appCategories`   | *string*  | :heavy\_minus\_sign: | Comma-separated list of app categories (e.g. "cli-agent,cloud-agent"). Used for marketplace rankings.<br />                                                 |                                      |
| `includeDisabled` | *boolean* | :heavy\_minus\_sign: | Whether to include disabled API keys in the response                                                                                                        | false                                |
| `offset`          | *number*  | :heavy\_minus\_sign: | Number of API keys to skip for pagination                                                                                                                   | 0                                    |
| `workspaceId`     | *string*  | :heavy\_minus\_sign: | Filter API keys by workspace ID. By default, keys in the default workspace are returned.                                                                    | 0df9e665-d932-5740-b2c7-b52af166bc11 |
