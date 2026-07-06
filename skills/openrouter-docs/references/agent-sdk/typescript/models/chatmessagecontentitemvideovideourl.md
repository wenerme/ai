> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ChatMessageContentItemVideoVideoURL - TypeScript SDK

> ChatMessageContentItemVideoVideoURL method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { ChatMessageContentItemVideoVideoURL } from "@openrouter/sdk/models";

let value: ChatMessageContentItemVideoVideoURL = {
  type: "video_url",
  videoUrl: {
    url: "https://palatable-subexpression.com/",
  },
};
```

## Fields

| Field      | Type                                                       | Required             | Description |
| ---------- | ---------------------------------------------------------- | -------------------- | ----------- |
| `type`     | *"video\_url"*                                             | :heavy\_check\_mark: | N/A         |
| `videoUrl` | [models.VideoUrl2](/agent-sdk/typescript/models/videourl2) | :heavy\_check\_mark: | N/A         |
