> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# MessagesOutputConfigEffort - TypeScript SDK

> MessagesOutputConfigEffort type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

How much effort the model should put into its response. Higher effort levels may result in more thorough analysis but take longer. Valid values are `low`, `medium`, `high`, `xhigh`, or `max`.

## Example Usage

```typescript lines theme={null}
import { MessagesOutputConfigEffort } from "@openrouter/sdk/models";

let value: MessagesOutputConfigEffort = "medium";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript lines theme={null}
"low" | "medium" | "high" | "xhigh" | "max" | Unrecognized<string>
```
