> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ListProvidersData - TypeScript SDK

> ListProvidersData type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { ListProvidersData } from "@openrouter/sdk/models/operations";

let value: ListProvidersData = {
  name: "OpenAI",
  privacyPolicyUrl: "https://openai.com/privacy",
  slug: "openai",
};
```

## Fields

| Field               | Type                                                                                   | Required             | Description                                                           | Example                                                  |
| ------------------- | -------------------------------------------------------------------------------------- | -------------------- | --------------------------------------------------------------------- | -------------------------------------------------------- |
| `datacenters`       | [operations.Datacenter](/agent-sdk/typescript/api-reference/operations/datacenter)\[]  | :heavy\_minus\_sign: | ISO 3166-1 Alpha-2 country codes of the provider datacenter locations | \[<br />"US",<br />"IE"<br />]                           |
| `headquarters`      | [operations.Headquarters](/agent-sdk/typescript/api-reference/operations/headquarters) | :heavy\_minus\_sign: | ISO 3166-1 Alpha-2 country code of the provider headquarters          | US                                                       |
| `name`              | *string*                                                                               | :heavy\_check\_mark: | Display name of the provider                                          | OpenAI                                                   |
| `privacyPolicyUrl`  | *string*                                                                               | :heavy\_check\_mark: | URL to the provider's privacy policy                                  | [https://openai.com/privacy](https://openai.com/privacy) |
| `slug`              | *string*                                                                               | :heavy\_check\_mark: | URL-friendly identifier for the provider                              | openai                                                   |
| `statusPageUrl`     | *string*                                                                               | :heavy\_minus\_sign: | URL to the provider's status page                                     | [https://status.openai.com](https://status.openai.com)   |
| `termsOfServiceUrl` | *string*                                                                               | :heavy\_minus\_sign: | URL to the provider's terms of service                                | [https://openai.com/terms](https://openai.com/terms)     |
