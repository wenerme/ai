> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# CompoundFilter - TypeScript SDK

> CompoundFilter type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

A compound filter that combines multiple comparison or compound filters

## Example Usage

```typescript lines theme={null}
import { CompoundFilter } from "@openrouter/sdk/models";

let value: CompoundFilter = {
  filters: [
    {
      "key": "author",
      "type": "eq",
      "value": "Alice",
    },
  ],
  type: "and",
};
```

## Fields

| Field     | Type                                                                                       | Required             | Description |
| --------- | ------------------------------------------------------------------------------------------ | -------------------- | ----------- |
| `filters` | `Record<string, *any*>`\[]                                                                 | :heavy\_check\_mark: | N/A         |
| `type`    | [models.CompoundFilterType](/agent-sdk/typescript/api-reference/models/compoundfiltertype) | :heavy\_check\_mark: | N/A         |
