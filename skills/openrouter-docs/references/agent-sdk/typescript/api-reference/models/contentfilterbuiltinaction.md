> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ContentFilterBuiltinAction - TypeScript SDK

> ContentFilterBuiltinAction type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Action taken when the builtin filter triggers

## Example Usage

```typescript lines theme={null}
import { ContentFilterBuiltinAction } from "@openrouter/sdk/models";

let value: ContentFilterBuiltinAction = "block";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript lines theme={null}
"redact" | "block" | "flag" | Unrecognized<string>
```
