> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# OutputWebSearchCallItemActionSearch - TypeScript SDK

> OutputWebSearchCallItemActionSearch type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { OutputWebSearchCallItemActionSearch } from "@openrouter/sdk/models";

let value: OutputWebSearchCallItemActionSearch = {
  query: "<value>",
  type: "search",
};
```

## Fields

| Field     | Type                                                                                    | Required             | Description |
| --------- | --------------------------------------------------------------------------------------- | -------------------- | ----------- |
| `queries` | *string*\[]                                                                             | :heavy\_minus\_sign: | N/A         |
| `query`   | *string*                                                                                | :heavy\_check\_mark: | N/A         |
| `sources` | [models.WebSearchSource](/agent-sdk/typescript/api-reference/models/websearchsource)\[] | :heavy\_minus\_sign: | N/A         |
| `type`    | *"search"*                                                                              | :heavy\_check\_mark: | N/A         |
