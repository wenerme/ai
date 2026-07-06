> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# CreateObservabilityDestinationRequestType - TypeScript SDK

> CreateObservabilityDestinationRequestType type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

The destination type. Only stable destination types are accepted.

## Example Usage

```typescript lines theme={null}
import { CreateObservabilityDestinationRequestType } from "@openrouter/sdk/models";

let value: CreateObservabilityDestinationRequestType = "langfuse";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript lines theme={null}
"arize" | "braintrust" | "clickhouse" | "datadog" | "grafana" | "langfuse" | "langsmith" | "newrelic" | "opik" | "otel-collector" | "posthog" | "ramp" | "s3" | "sentry" | "snowflake" | "weave" | "webhook" | Unrecognized<string>
```
