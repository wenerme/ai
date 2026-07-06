> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ChatRequestEffort - TypeScript SDK

> ChatRequestEffort type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Constrains effort on reasoning for reasoning models

## Example Usage

```typescript lines theme={null}
import { ChatRequestEffort } from "@openrouter/sdk/models";

let value: ChatRequestEffort = "medium";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript lines theme={null}
"xhigh" | "high" | "medium" | "low" | "minimal" | "none" | Unrecognized<string>
```
