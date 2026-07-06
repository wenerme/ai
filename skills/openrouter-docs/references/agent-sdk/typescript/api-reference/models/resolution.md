> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Resolution - TypeScript SDK

> Resolution type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Resolution of the generated video

## Example Usage

```typescript lines theme={null}
import { Resolution } from "@openrouter/sdk/models";

let value: Resolution = "720p";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript lines theme={null}
"480p" | "720p" | "1080p" | "1K" | "2K" | "4K" | Unrecognized<string>
```
