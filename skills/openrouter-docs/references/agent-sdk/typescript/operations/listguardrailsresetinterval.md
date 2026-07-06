> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ListGuardrailsResetInterval - TypeScript SDK

> ListGuardrailsResetInterval method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Interval at which the limit resets (daily, weekly, monthly)

## Example Usage

```typescript lines theme={null}
import { ListGuardrailsResetInterval } from "@openrouter/sdk/models/operations";

let value: ListGuardrailsResetInterval = "monthly";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript lines theme={null}
"daily" | "weekly" | "monthly" | Unrecognized<string>
```
