> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# StopServerToolsWhenMaxCost - TypeScript SDK

> StopServerToolsWhenMaxCost type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Stop once cumulative cost across the loop exceeds this dollar threshold.

## Example Usage

```typescript lines theme={null}
import { StopServerToolsWhenMaxCost } from "@openrouter/sdk/models";

let value: StopServerToolsWhenMaxCost = {
  maxCostInDollars: 7287.97,
  type: "max_cost",
};
```

## Fields

| Field              | Type          | Required             | Description |
| ------------------ | ------------- | -------------------- | ----------- |
| `maxCostInDollars` | *number*      | :heavy\_check\_mark: | N/A         |
| `type`             | *"max\_cost"* | :heavy\_check\_mark: | N/A         |
