> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# PreferredMinThroughput - TypeScript SDK

> PreferredMinThroughput type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Preferred minimum throughput (in tokens per second). Can be a number (applies to p50) or an object with percentile-specific cutoffs. Endpoints below the threshold(s) may still be used, but are deprioritized in routing. When using fallback models, this may cause a fallback model to be used instead of the primary model if it meets the threshold.

## Supported Types

### `number`

```typescript lines theme={null}
const value: number = 100;
```

### `models.PercentileThroughputCutoffs`

```typescript lines theme={null}
const value: models.PercentileThroughputCutoffs = {};
```

### `any`

```typescript lines theme={null}
const value: any = 100;
```
