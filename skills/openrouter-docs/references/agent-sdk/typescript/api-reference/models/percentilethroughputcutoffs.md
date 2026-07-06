> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# PercentileThroughputCutoffs - TypeScript SDK

> PercentileThroughputCutoffs type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Percentile-based throughput cutoffs. All specified cutoffs must be met for an endpoint to be preferred.

## Example Usage

```typescript lines theme={null}
import { PercentileThroughputCutoffs } from "@openrouter/sdk/models";

let value: PercentileThroughputCutoffs = {};
```

## Fields

| Field | Type     | Required             | Description                         |
| ----- | -------- | -------------------- | ----------------------------------- |
| `p50` | *number* | :heavy\_minus\_sign: | Minimum p50 throughput (tokens/sec) |
| `p75` | *number* | :heavy\_minus\_sign: | Minimum p75 throughput (tokens/sec) |
| `p90` | *number* | :heavy\_minus\_sign: | Minimum p90 throughput (tokens/sec) |
| `p99` | *number* | :heavy\_minus\_sign: | Minimum p99 throughput (tokens/sec) |
