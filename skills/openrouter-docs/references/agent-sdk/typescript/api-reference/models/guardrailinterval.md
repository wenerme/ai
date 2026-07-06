> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# GuardrailInterval - TypeScript SDK

> GuardrailInterval type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Interval at which the limit resets (daily, weekly, monthly)

## Example Usage

```typescript lines theme={null}
import { GuardrailInterval } from "@openrouter/sdk/models";

let value: GuardrailInterval = "monthly";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript lines theme={null}
"daily" | "weekly" | "monthly" | Unrecognized<string>
```
