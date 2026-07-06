> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# PipelineStageType - TypeScript SDK

> PipelineStageType type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Categorical kind of a pipeline stage. Multiple plugins can share a type (e.g. all guardrail-level plugins emit `guardrail`); the `name` field disambiguates which plugin emitted it.

## Example Usage

```typescript lines theme={null}
import { PipelineStageType } from "@openrouter/sdk/models";

let value: PipelineStageType = "guardrail";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript lines theme={null}
"guardrail" | "plugin" | "server_tools" | "response_healing" | "context_compression" | Unrecognized<string>
```
