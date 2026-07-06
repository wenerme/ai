> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ApiType - TypeScript SDK

> ApiType method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Type of API used for the generation

## Example Usage

```typescript lines theme={null}
import { ApiType } from "@openrouter/sdk/models/operations";

let value: ApiType = "embeddings";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript lines theme={null}
"completions" | "embeddings" | Unrecognized<string>
```
