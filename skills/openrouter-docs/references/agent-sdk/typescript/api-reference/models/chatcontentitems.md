> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ChatContentItems - TypeScript SDK

> ChatContentItems type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Content part for chat completion messages

## Supported Types

### `models.ChatContentFile`

```typescript lines theme={null}
const value: models.ChatContentFile = {
  file: {},
  type: "file",
};
```

### `models.ChatContentImage`

```typescript lines theme={null}
const value: models.ChatContentImage = {
  imageUrl: {
    url: "https://vague-assist.org/",
  },
  type: "image_url",
};
```

### `models.ChatContentAudio`

```typescript lines theme={null}
const value: models.ChatContentAudio = {
  inputAudio: {
    data: "<value>",
    format: "<value>",
  },
  type: "input_audio",
};
```

### `models.LegacyChatContentVideo`

```typescript lines theme={null}
const value: models.LegacyChatContentVideo = {
  type: "input_video",
  videoUrl: {
    url: "https://example.com/video.mp4",
  },
};
```

### `models.ChatContentText`

```typescript lines theme={null}
const value: models.ChatContentText = {
  text: "Hello, world!",
  type: "text",
};
```

### `models.ChatContentVideo`

```typescript lines theme={null}
const value: models.ChatContentVideo = {
  type: "video_url",
  videoUrl: {
    url: "https://example.com/video.mp4",
  },
};
```
