> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# FrameType - TypeScript SDK

> FrameType type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Whether this image represents the first or last frame of the video

## Example Usage

```typescript lines theme={null}
import { FrameType } from "@openrouter/sdk/models";

let value: FrameType = "first_frame";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript lines theme={null}
"first_frame" | "last_frame" | Unrecognized<string>
```
