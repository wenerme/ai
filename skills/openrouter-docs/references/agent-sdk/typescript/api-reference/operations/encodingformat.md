> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# EncodingFormat - TypeScript SDK

> EncodingFormat type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

The format of the output embeddings

## Example Usage

```typescript lines theme={null}
import { EncodingFormat } from "@openrouter/sdk/models/operations";

let value: EncodingFormat = "float";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript lines theme={null}
"float" | "base64" | Unrecognized<string>
```
