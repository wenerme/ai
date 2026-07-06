> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ChatFinishReasonEnum - TypeScript SDK

> ChatFinishReasonEnum type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { ChatFinishReasonEnum } from "@openrouter/sdk/models";

let value: ChatFinishReasonEnum = "stop";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript lines theme={null}
"tool_calls" | "stop" | "length" | "content_filter" | "error" | Unrecognized<string>
```
