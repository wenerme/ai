> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# UpdateKeysLimitReset - TypeScript SDK

> UpdateKeysLimitReset type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

New limit reset type for the API key (daily, weekly, monthly, or null for no reset). Resets happen automatically at midnight UTC, and weeks are Monday through Sunday.

## Example Usage

```typescript lines theme={null}
import { UpdateKeysLimitReset } from "@openrouter/sdk/models/operations";

let value: UpdateKeysLimitReset = "daily";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript lines theme={null}
"daily" | "weekly" | "monthly" | Unrecognized<string>
```
