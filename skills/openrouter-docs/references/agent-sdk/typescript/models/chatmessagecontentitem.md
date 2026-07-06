> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# ChatMessageContentItem - TypeScript SDK

> ChatMessageContentItem method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Supported Types

### `models.ChatMessageContentItemText`

```typescript lines theme={null}
const value: models.ChatMessageContentItemText = {
  type: "text",
  text: "<value>",
};
```

### `models.ChatMessageContentItemImage`

```typescript lines theme={null}
const value: models.ChatMessageContentItemImage = {
  type: "image_url",
  imageUrl: {
    url: "https://pretty-reservation.org",
  },
};
```

### `models.ChatMessageContentItemAudio`

```typescript lines theme={null}
const value: models.ChatMessageContentItemAudio = {
  type: "input_audio",
  inputAudio: {
    data: "<value>",
    format: "<value>",
  },
};
```

### `models.ChatMessageContentItemVideo`

```typescript lines theme={null}
const value: models.ChatMessageContentItemVideo = {
  type: "video_url",
  videoUrl: {
    url: "https://palatable-subexpression.com/",
  },
};
```

### `models.ChatMessageContentItemVideo`

```typescript lines theme={null}
const value: models.ChatMessageContentItemVideo = {
  type: "video_url",
  videoUrl: {
    url: "https://palatable-subexpression.com/",
  },
};
```
