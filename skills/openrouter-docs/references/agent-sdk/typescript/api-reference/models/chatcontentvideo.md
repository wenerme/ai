> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ChatContentVideo - TypeScript SDK

> ChatContentVideo type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Video input content part

## Example Usage

```typescript lines theme={null}
import { ChatContentVideo } from "@openrouter/sdk/models";

let value: ChatContentVideo = {
  type: "video_url",
  videoUrl: {
    url: "https://example.com/video.mp4",
  },
};
```

## Fields

| Field      | Type                                                                                             | Required             | Description        | Example                                    |
| ---------- | ------------------------------------------------------------------------------------------------ | -------------------- | ------------------ | ------------------------------------------ |
| `type`     | *"video\_url"*                                                                                   | :heavy\_check\_mark: | N/A                |                                            |
| `videoUrl` | [models.ChatContentVideoInput](/docs/agent-sdk/typescript/api-reference/models/chatcontentvideoinput) | :heavy\_check\_mark: | Video input object | `{"url": "https://example.com/video.mp4"}` |
