> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ListProvidersData - TypeScript SDK

> ListProvidersData method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { ListProvidersData } from "@openrouter/sdk/models/operations";

let value: ListProvidersData = {
  name: "OpenAI",
  slug: "openai",
  privacyPolicyUrl: "https://openai.com/privacy",
};
```

## Fields

| Field               | Type     | Required             | Description                              | Example                                                  |
| ------------------- | -------- | -------------------- | ---------------------------------------- | -------------------------------------------------------- |
| `name`              | *string* | :heavy\_check\_mark: | Display name of the provider             | OpenAI                                                   |
| `slug`              | *string* | :heavy\_check\_mark: | URL-friendly identifier for the provider | openai                                                   |
| `privacyPolicyUrl`  | *string* | :heavy\_check\_mark: | URL to the provider's privacy policy     | [https://openai.com/privacy](https://openai.com/privacy) |
| `termsOfServiceUrl` | *string* | :heavy\_minus\_sign: | URL to the provider's terms of service   | [https://openai.com/terms](https://openai.com/terms)     |
| `statusPageUrl`     | *string* | :heavy\_minus\_sign: | URL to the provider's status page        | [https://status.openai.com](https://status.openai.com)   |
