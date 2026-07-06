> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Tokenizer - TypeScript SDK

> Tokenizer type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Tokenizer type used by the model

## Example Usage

```typescript lines theme={null}
import { Tokenizer } from "@openrouter/sdk/models";

let value: Tokenizer = "GPT";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript lines theme={null}
"Router" | "Media" | "Other" | "GPT" | "Claude" | "Gemini" | "Gemma" | "Grok" | "Cohere" | "Nova" | "Qwen" | "Yi" | "DeepSeek" | "Mistral" | "Llama2" | "Llama3" | "Llama4" | "PaLM" | "RWKV" | "Qwen3" | Unrecognized<string>
```
