> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# FusionServerToolConfigEffort - TypeScript SDK

> FusionServerToolConfigEffort type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Reasoning effort level for panelist and judge inner calls.

## Example Usage

```typescript lines theme={null}
import { FusionServerToolConfigEffort } from "@openrouter/sdk/models";

let value: FusionServerToolConfigEffort = "high";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript lines theme={null}
"xhigh" | "high" | "medium" | "low" | "minimal" | "none" | Unrecognized<string>
```
