> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Filters - TypeScript SDK

> Filters type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { Filters } from "@openrouter/sdk/models";

let value: Filters = {
  key: "<key>",
  type: "eq",
  value: [],
};
```

## Fields

| Field   | Type                                                                         | Required             | Description |
| ------- | ---------------------------------------------------------------------------- | -------------------- | ----------- |
| `key`   | *string*                                                                     | :heavy\_check\_mark: | N/A         |
| `type`  | [models.FiltersType](/agent-sdk/typescript/api-reference/models/filterstype) | :heavy\_check\_mark: | N/A         |
| `value` | *models.FileSearchServerToolValue2*                                          | :heavy\_check\_mark: | N/A         |
