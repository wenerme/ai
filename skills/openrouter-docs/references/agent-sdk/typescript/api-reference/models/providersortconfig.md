> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ProviderSortConfig - TypeScript SDK

> ProviderSortConfig type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

The provider sorting strategy (price, throughput, latency)

## Example Usage

```typescript lines theme={null}
import { ProviderSortConfig } from "@openrouter/sdk/models";

let value: ProviderSortConfig = {};
```

## Fields

| Field       | Type                                                                     | Required             | Description                                                                                                                                                                                | Example |
| ----------- | ------------------------------------------------------------------------ | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| `by`        | [models.By](/agent-sdk/typescript/api-reference/models/by)               | :heavy\_minus\_sign: | The provider sorting strategy (price, throughput, latency)                                                                                                                                 | price   |
| `partition` | [models.Partition](/agent-sdk/typescript/api-reference/models/partition) | :heavy\_minus\_sign: | Partitioning strategy for sorting: "model" (default) groups endpoints by model before sorting (fallback models remain fallbacks), "none" sorts all endpoints together regardless of model. | model   |
