> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Group - TypeScript SDK

> Group type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { Group } from "@openrouter/sdk/models";

let value: Group = {
  rules: [],
};
```

## Fields

| Field   | Type                                                              | Required             | Description |
| ------- | ----------------------------------------------------------------- | -------------------- | ----------- |
| `logic` | [models.Logic](/agent-sdk/typescript/api-reference/models/logic)  | :heavy\_minus\_sign: | N/A         |
| `rules` | [models.Rule](/agent-sdk/typescript/api-reference/models/rule)\[] | :heavy\_check\_mark: | N/A         |
