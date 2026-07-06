> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ListProvidersResponse - TypeScript SDK

> ListProvidersResponse method reference

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
      slug: "openai",
      privacyPolicyUrl: "https://openai.com/privacy",
    },
  ],
};
```

## Fields

| Field  | Type                                                                                  | Required             | Description |
| ------ | ------------------------------------------------------------------------------------- | -------------------- | ----------- |
| `data` | [operations.ListProvidersData](/agent-sdk/typescript/operations/listprovidersdata)\[] | :heavy\_check\_mark: | N/A         |
