> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ApiType - TypeScript SDK

> ApiType type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Type of API used for the generation

## Example Usage

```typescript lines theme={null}
import { ApiType } from "@openrouter/sdk/models";

let value: ApiType = "tts";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript lines theme={null}
"completions" | "embeddings" | "rerank" | "tts" | "stt" | "video" | "image" | Unrecognized<string>
```
