> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ListProvidersResponse - TypeScript SDK

> ListProvidersResponse type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Returns a list of providers

## Example Usage

```typescript lines theme={null}
import { ListProvidersResponse } from "@openrouter/sdk/models/operations";

let value: ListProvidersResponse = {
  data: [
    {
      name: "OpenAI",
      privacyPolicyUrl: "https://openai.com/privacy",
      slug: "openai",
    },
  ],
};
```

## Fields

| Field  | Type                                                                                                | Required             | Description |
| ------ | --------------------------------------------------------------------------------------------------- | -------------------- | ----------- |
| `data` | [operations.ListProvidersData](/docs/agent-sdk/typescript/api-reference/operations/listprovidersdata)\[] | :heavy\_check\_mark: | N/A         |
