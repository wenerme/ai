> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# CreateKeysRequest - TypeScript SDK

> CreateKeysRequest type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { CreateKeysRequest } from "@openrouter/sdk/models/operations";

let value: CreateKeysRequest = {
  requestBody: {
    name: "My New API Key",
  },
};
```

## Fields

| Field           | Type                                                                                                     | Required             | Description                                                                                                                                                 | Example                                                                                                                              |
| --------------- | -------------------------------------------------------------------------------------------------------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `httpReferer`   | *string*                                                                                                 | :heavy\_minus\_sign: | The app identifier should be your app's URL and is used as the primary identifier for rankings.<br />This is used to track API usage per application.<br /> |                                                                                                                                      |
| `appTitle`      | *string*                                                                                                 | :heavy\_minus\_sign: | The app display name allows you to customize how your app appears in OpenRouter's dashboard.<br />                                                          |                                                                                                                                      |
| `appCategories` | *string*                                                                                                 | :heavy\_minus\_sign: | Comma-separated list of app categories (e.g. "cli-agent,cloud-agent"). Used for marketplace rankings.<br />                                                 |                                                                                                                                      |
| `requestBody`   | [operations.CreateKeysRequestBody](/docs/agent-sdk/typescript/api-reference/operations/createkeysrequestbody) | :heavy\_check\_mark: | N/A                                                                                                                                                         | `{"expires_at": "2027-12-31T23:59:59Z","include_byok_in_limit": true,"limit": 50,"limit_reset": "monthly","name": "My New API Key"}` |
