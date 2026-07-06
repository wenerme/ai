> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# GetBYOKKeyRequest - TypeScript SDK

> GetBYOKKeyRequest type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { GetBYOKKeyRequest } from "@openrouter/sdk/models/operations";

let value: GetBYOKKeyRequest = {
  id: "11111111-2222-3333-4444-555555555555",
};
```

## Fields

| Field           | Type     | Required             | Description                                                                                                                                                 | Example                              |
| --------------- | -------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| `httpReferer`   | *string* | :heavy\_minus\_sign: | The app identifier should be your app's URL and is used as the primary identifier for rankings.<br />This is used to track API usage per application.<br /> |                                      |
| `appTitle`      | *string* | :heavy\_minus\_sign: | The app display name allows you to customize how your app appears in OpenRouter's dashboard.<br />                                                          |                                      |
| `appCategories` | *string* | :heavy\_minus\_sign: | Comma-separated list of app categories (e.g. "cli-agent,cloud-agent"). Used for marketplace rankings.<br />                                                 |                                      |
| `id`            | *string* | :heavy\_check\_mark: | The BYOK credential ID (UUID).                                                                                                                              | 11111111-2222-3333-4444-555555555555 |
