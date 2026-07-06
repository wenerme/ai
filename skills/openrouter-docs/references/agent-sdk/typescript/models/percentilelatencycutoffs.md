> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# PercentileLatencyCutoffs - TypeScript SDK

> PercentileLatencyCutoffs method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Percentile-based latency cutoffs. All specified cutoffs must be met for an endpoint to be preferred.

## Example Usage

```typescript lines theme={null}
import { PercentileLatencyCutoffs } from "@openrouter/sdk/models";

let value: PercentileLatencyCutoffs = {};
```

## Fields

| Field | Type     | Required             | Description                   |
| ----- | -------- | -------------------- | ----------------------------- |
| `p50` | *number* | :heavy\_minus\_sign: | Maximum p50 latency (seconds) |
| `p75` | *number* | :heavy\_minus\_sign: | Maximum p75 latency (seconds) |
| `p90` | *number* | :heavy\_minus\_sign: | Maximum p90 latency (seconds) |
| `p99` | *number* | :heavy\_minus\_sign: | Maximum p99 latency (seconds) |
