> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# PreferredMaxLatency - TypeScript SDK

> PreferredMaxLatency type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Preferred maximum latency (in seconds). Can be a number (applies to p50) or an object with percentile-specific cutoffs. Endpoints above the threshold(s) may still be used, but are deprioritized in routing. When using fallback models, this may cause a fallback model to be used instead of the primary model if it meets the threshold.

## Supported Types

### `number`

```typescript lines theme={null}
const value: number = 5;
```

### `models.PercentileLatencyCutoffs`

```typescript lines theme={null}
const value: models.PercentileLatencyCutoffs = {};
```

### `any`

```typescript lines theme={null}
const value: any = 5;
```
