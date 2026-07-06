> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ContentFilterBuiltinSlug - TypeScript SDK

> ContentFilterBuiltinSlug type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

The builtin filter identifier

## Example Usage

```typescript lines theme={null}
import { ContentFilterBuiltinSlug } from "@openrouter/sdk/models";

let value: ContentFilterBuiltinSlug = "regex-prompt-injection";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript lines theme={null}
"email" | "phone" | "ssn" | "credit-card" | "ip-address" | "person-name" | "address" | "regex-prompt-injection" | Unrecognized<string>
```
