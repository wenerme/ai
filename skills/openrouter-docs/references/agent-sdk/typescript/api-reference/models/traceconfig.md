> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# TraceConfig - TypeScript SDK

> TraceConfig type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Metadata for observability and tracing. Known keys (trace\_id, trace\_name, span\_name, generation\_name, parent\_span\_id) have special handling. Additional keys are passed through as custom metadata to configured broadcast destinations.

## Example Usage

```typescript lines theme={null}
import { TraceConfig } from "@openrouter/sdk/models";

let value: TraceConfig = {};
```

## Fields

| Field                  | Type                    | Required             | Description | Example                                                     |
| ---------------------- | ----------------------- | -------------------- | ----------- | ----------------------------------------------------------- |
| `generationName`       | *string*                | :heavy\_minus\_sign: | N/A         |                                                             |
| `parentSpanId`         | *string*                | :heavy\_minus\_sign: | N/A         |                                                             |
| `spanName`             | *string*                | :heavy\_minus\_sign: | N/A         |                                                             |
| `traceId`              | *string*                | :heavy\_minus\_sign: | N/A         |                                                             |
| `traceName`            | *string*                | :heavy\_minus\_sign: | N/A         |                                                             |
| `additionalProperties` | `Record<string, *any*>` | :heavy\_minus\_sign: | N/A         | `{"trace_id": "trace-abc123","trace_name": "my-app-trace"}` |
