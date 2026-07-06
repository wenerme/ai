> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# PercentileStats - TypeScript SDK

> PercentileStats method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Latency percentiles in milliseconds over the last 30 minutes. Latency measures time to first token. Only visible when authenticated with an API key or cookie; returns null for unauthenticated requests.

## Example Usage

```typescript lines theme={null}
import { PercentileStats } from "@openrouter/sdk/models";

let value: PercentileStats = {
  p50: 25.5,
  p75: 35.2,
  p90: 48.7,
  p99: 85.3,
};
```

## Fields

| Field | Type     | Required             | Description              | Example |
| ----- | -------- | -------------------- | ------------------------ | ------- |
| `p50` | *number* | :heavy\_check\_mark: | Median (50th percentile) | 25.5    |
| `p75` | *number* | :heavy\_check\_mark: | 75th percentile          | 35.2    |
| `p90` | *number* | :heavy\_check\_mark: | 90th percentile          | 48.7    |
| `p99` | *number* | :heavy\_check\_mark: | 99th percentile          | 85.3    |
