> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ~~LegacyChatContentVideo~~ - TypeScript SDK

> ~~LegacyChatContentVideo~~ type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Video input content part (legacy format - deprecated)

> :warning: **DEPRECATED**: This will be removed in a future release, please migrate away from it as soon as possible.

## Example Usage

```typescript lines theme={null}
import { LegacyChatContentVideo } from "@openrouter/sdk/models";

let value: LegacyChatContentVideo = {
  type: "input_video",
  videoUrl: {
    url: "https://example.com/video.mp4",
  },
};
```

## Fields

| Field      | Type                                                                                             | Required             | Description        | Example                                    |
| ---------- | ------------------------------------------------------------------------------------------------ | -------------------- | ------------------ | ------------------------------------------ |
| `type`     | *"input\_video"*                                                                                 | :heavy\_check\_mark: | N/A                |                                            |
| `videoUrl` | [models.ChatContentVideoInput](/agent-sdk/typescript/api-reference/models/chatcontentvideoinput) | :heavy\_check\_mark: | Video input object | `{"url": "https://example.com/video.mp4"}` |
