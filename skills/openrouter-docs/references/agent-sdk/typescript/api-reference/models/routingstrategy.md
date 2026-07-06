> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# RoutingStrategy - TypeScript SDK

> RoutingStrategy type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { RoutingStrategy } from "@openrouter/sdk/models";

let value: RoutingStrategy = "direct";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript lines theme={null}
"direct" | "auto" | "free" | "latest" | "alias" | "fallback" | "pareto" | "bodybuilder" | "fusion" | Unrecognized<string>
```
