> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# MemoryLimit - TypeScript SDK

> MemoryLimit type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { MemoryLimit } from "@openrouter/sdk/models";

let value: MemoryLimit = "16g";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript lines theme={null}
"1g" | "4g" | "16g" | "64g" | Unrecognized<string>
```
