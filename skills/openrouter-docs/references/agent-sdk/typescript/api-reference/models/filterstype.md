> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# FiltersType - TypeScript SDK

> FiltersType type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { FiltersType } from "@openrouter/sdk/models";

let value: FiltersType = "gt";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript lines theme={null}
"eq" | "ne" | "gt" | "gte" | "lt" | "lte" | Unrecognized<string>
```
