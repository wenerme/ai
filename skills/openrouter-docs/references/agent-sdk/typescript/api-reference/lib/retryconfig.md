> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# RetryConfig - TypeScript SDK

> RetryConfig method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Allows customizing the default retry configuration. It is only permitted in methods that accept retry policies.

## Fields

| Name                    | Type                                | Description                                                                               | Example                    |             |
| ----------------------- | ----------------------------------- | ----------------------------------------------------------------------------------------- | -------------------------- | ----------- |
| `strategy`              | \`"backoff"                         | "none"\`                                                                                  | The retry strategy to use. | `"backoff"` |
| `backoff`               | [BackoffStrategy](#backoffstrategy) | When strategy is "backoff", this configurates for the backoff parameters.                 |                            |             |
| `retryConnectionErrors` | `*boolean*`                         | When strategy is "backoff", this determines whether or not to retry on connection errors. | `true`                     |             |

## BackoffStrategy

The backoff strategy allows retrying a request with an exponential backoff between each retry.

### Fields

| Name              | Type       | Description                               | Example  |
| ----------------- | ---------- | ----------------------------------------- | -------- |
| `initialInterval` | `*number*` | The initial interval in milliseconds.     | `500`    |
| `maxInterval`     | `*number*` | The maximum interval in milliseconds.     | `60000`  |
| `exponent`        | `*number*` | The exponent to use for the backoff.      | `1.5`    |
| `maxElapsedTime`  | `*number*` | The maximum elapsed time in milliseconds. | `300000` |
