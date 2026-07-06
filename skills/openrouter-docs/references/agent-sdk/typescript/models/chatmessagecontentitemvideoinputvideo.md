> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ChatMessageContentItemVideoInputVideo - TypeScript SDK

> ChatMessageContentItemVideoInputVideo method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { ChatMessageContentItemVideoInputVideo } from "@openrouter/sdk/models";

let value: ChatMessageContentItemVideoInputVideo = {
  type: "input_video",
  videoUrl: {
    url: "https://salty-diversity.biz",
  },
};
```

## Fields

| Field      | Type                                                       | Required             | Description |
| ---------- | ---------------------------------------------------------- | -------------------- | ----------- |
| `type`     | *"input\_video"*                                           | :heavy\_check\_mark: | N/A         |
| `videoUrl` | [models.VideoUrl1](/agent-sdk/typescript/models/videourl1) | :heavy\_check\_mark: | N/A         |
