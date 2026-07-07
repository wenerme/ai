> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ParetoRouterPlugin - TypeScript SDK

> ParetoRouterPlugin type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { ParetoRouterPlugin } from "@openrouter/sdk/models";

let value: ParetoRouterPlugin = {
  id: "pareto-router",
};
```

## Fields

| Field            | Type                          | Required             | Description                                                                                                                                                                                                                                                                  | Example |
| ---------------- | ----------------------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `enabled`        | *boolean*                     | :heavy\_minus\_sign: | Set to false to disable the pareto-router plugin for this request. Defaults to true.                                                                                                                                                                                         |         |
| `id`             | *"pareto-router"*             | :heavy\_check\_mark: | N/A                                                                                                                                                                                                                                                                          |         |
| `minCodingScore` | *number*                      | :heavy\_minus\_sign: | Minimum coding quality score between 0 and 1. Maps to internal quality tiers: >= 0.66 → high (top coding models), >= 0.33 → medium (strong modern flagships), \< 0.33 → low (capable coders above the median). Omit to default to the highest tier (equivalent to >= 0.66).  | 0.8     |
| `priceSource`    | *"prompt" \| "weighted\_avg"* | :heavy\_minus\_sign: | Price source for the Pareto frontier cost axis. "prompt" uses catalog list price (endpoint.pricing.prompt). "weighted\_avg" uses traffic-weighted effective input price from ClickHouse, falling back to prompt price for models without traffic data. Defaults to "prompt". |         |
