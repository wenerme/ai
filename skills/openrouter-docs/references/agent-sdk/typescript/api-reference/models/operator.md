> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Operator - TypeScript SDK

> Operator type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { Operator } from "@openrouter/sdk/models";

let value: Operator = "ends_with";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript lines theme={null}
"equals" | "not_equals" | "contains" | "not_contains" | "regex" | "starts_with" | "ends_with" | "gt" | "lt" | "gte" | "lte" | "exists" | "not_exists" | Unrecognized<string>
```
