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

| Field            | Type              | Required             | Description                                                                                                                                                                                                                                                            | Example |
| ---------------- | ----------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `enabled`        | *boolean*         | :heavy\_minus\_sign: | Set to false to disable the pareto-router plugin for this request. Defaults to true.                                                                                                                                                                                   |         |
| `id`             | *"pareto-router"* | :heavy\_check\_mark: | N/A                                                                                                                                                                                                                                                                    |         |
| `minCodingScore` | *number*          | :heavy\_minus\_sign: | Minimum desired coding score between 0 and 1, where 1 is best. Higher values select from stronger coding models (sourced from Artificial Analysis coding percentiles). Maps internally to one of three tiers (low, medium, high). Omit to use the router default tier. | 0.8     |
