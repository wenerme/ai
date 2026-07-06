> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ApplyPatchCallStatus - TypeScript SDK

> ApplyPatchCallStatus type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Lifecycle state of an `apply_patch_call` output item.

## Example Usage

```typescript lines theme={null}
import { ApplyPatchCallStatus } from "@openrouter/sdk/models";

let value: ApplyPatchCallStatus = "completed";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript lines theme={null}
"in_progress" | "completed" | Unrecognized<string>
```
