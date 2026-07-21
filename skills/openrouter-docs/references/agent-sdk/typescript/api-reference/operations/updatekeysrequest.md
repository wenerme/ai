> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# UpdateKeysRequest - TypeScript SDK

> UpdateKeysRequest type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { UpdateKeysRequest } from "@openrouter/sdk/models/operations";

let value: UpdateKeysRequest = {
  hash: "f01d52606dc8f0a8303a7b5cc3fa07109c2e346cec7c0a16b40de462992ce943",
  requestBody: {},
};
```

## Fields

| Field           | Type                                                                                                     | Required             | Description                                                                                                                                                 | Example                                                                                                               |
| --------------- | -------------------------------------------------------------------------------------------------------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `httpReferer`   | *string*                                                                                                 | :heavy\_minus\_sign: | The app identifier should be your app's URL and is used as the primary identifier for rankings.<br />This is used to track API usage per application.<br /> |                                                                                                                       |
| `appTitle`      | *string*                                                                                                 | :heavy\_minus\_sign: | The app display name allows you to customize how your app appears in OpenRouter's dashboard.<br />                                                          |                                                                                                                       |
| `appCategories` | *string*                                                                                                 | :heavy\_minus\_sign: | Comma-separated list of app categories (e.g. "cli-agent,cloud-agent"). Used for marketplace rankings.<br />                                                 |                                                                                                                       |
| `hash`          | *string*                                                                                                 | :heavy\_check\_mark: | The hash identifier of the API key to update                                                                                                                | f01d52606dc8f0a8303a7b5cc3fa07109c2e346cec7c0a16b40de462992ce943                                                      |
| `requestBody`   | [operations.UpdateKeysRequestBody](/docs/agent-sdk/typescript/api-reference/operations/updatekeysrequestbody) | :heavy\_check\_mark: | N/A                                                                                                                                                         | `{"disabled": false,"include_byok_in_limit": true,"limit": 75,"limit_reset": "daily","name": "Updated API Key Name"}` |
