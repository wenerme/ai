> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Provider - TypeScript SDK

> Provider type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Optional provider slug to filter by (e.g. `openai`, `anthropic`, `amazon-bedrock`).

## Example Usage

```typescript lines theme={null}
import { Provider } from "@openrouter/sdk/models/operations";

let value: Provider = "openai";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript lines theme={null}
"ai21" | "aion-labs" | "akashml" | "alibaba" | "amazon-bedrock" | "amazon-nova" | "ambient" | "anthropic" | "arcee-ai" | "atlas-cloud" | "avian" | "azure" | "baidu" | "baseten" | "black-forest-labs" | "byteplus" | "cerebras" | "chutes" | "cirrascale" | "clarifai" | "cloudflare" | "cohere" | "crusoe" | "darkbloom" | "deepinfra" | "deepseek" | "dekallm" | "digitalocean" | "featherless" | "fireworks" | "friendli" | "gmicloud" | "google-ai-studio" | "google-vertex" | "groq" | "hyperbolic" | "inception" | "inceptron" | "inference-net" | "infermatic" | "inflection" | "io-net" | "ionstream" | "liquid" | "mancer" | "mara" | "minimax" | "mistral" | "modelrun" | "modular" | "moonshotai" | "morph" | "ncompass" | "nebius" | "nex-agi" | "nextbit" | "novita" | "nvidia" | "open-inference" | "openai" | "parasail" | "perceptron" | "perplexity" | "phala" | "poolside" | "recraft" | "reka" | "relace" | "sambanova" | "seed" | "siliconflow" | "sourceful" | "stepfun" | "streamlake" | "switchpoint" | "together" | "upstage" | "venice" | "wandb" | "xai" | "xiaomi" | "z-ai" | Unrecognized<string>
```
