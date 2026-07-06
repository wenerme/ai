> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# UsageLimitType - TypeScript SDK

> UsageLimitType type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Optional credit limit reset interval. When set, the credit limit resets on this interval.

## Example Usage

```typescript lines theme={null}
import { UsageLimitType } from "@openrouter/sdk/models/operations";

let value: UsageLimitType = "monthly";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript lines theme={null}
"daily" | "weekly" | "monthly" | Unrecognized<string>
```
