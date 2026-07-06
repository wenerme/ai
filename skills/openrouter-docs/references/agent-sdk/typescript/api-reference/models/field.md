> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Field - TypeScript SDK

> Field type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { Field } from "@openrouter/sdk/models";

let value: Field = "user_id";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript lines theme={null}
"model" | "provider" | "session_id" | "user_id" | "api_key_name" | "finish_reason" | "input" | "output" | "total_cost" | "total_tokens" | "prompt_tokens" | "completion_tokens" | Unrecognized<string>
```
