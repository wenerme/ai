> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# AspectRatio - TypeScript SDK

> AspectRatio type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Aspect ratio of the generated video

## Example Usage

```typescript lines theme={null}
import { AspectRatio } from "@openrouter/sdk/models";

let value: AspectRatio = "16:9";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript lines theme={null}
"16:9" | "9:16" | "1:1" | "4:3" | "3:4" | "3:2" | "2:3" | "21:9" | "9:21" | Unrecognized<string>
```
