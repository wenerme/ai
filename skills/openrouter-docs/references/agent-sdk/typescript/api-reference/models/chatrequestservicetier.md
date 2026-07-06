> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ChatRequestServiceTier - TypeScript SDK

> ChatRequestServiceTier type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

The service tier to use for processing this request.

## Example Usage

```typescript lines theme={null}
import { ChatRequestServiceTier } from "@openrouter/sdk/models";

let value: ChatRequestServiceTier = "auto";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript lines theme={null}
"auto" | "default" | "flex" | "priority" | "scale" | Unrecognized<string>
```
