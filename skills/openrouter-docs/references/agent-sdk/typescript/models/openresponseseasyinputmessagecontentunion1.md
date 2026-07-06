> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# OpenResponsesEasyInputMessageContentUnion1 - TypeScript SDK

> OpenResponsesEasyInputMessageContentUnion1 method reference

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Supported Types

### `models.ResponseInputText`

```typescript lines theme={null}
const value: models.ResponseInputText = {
  type: "input_text",
  text: "Hello, how can I help you?",
};
```

### `models.OpenResponsesEasyInputMessageContentInputImage`

```typescript lines theme={null}
const value: models.OpenResponsesEasyInputMessageContentInputImage = {
  type: "input_image",
  detail: "auto",
};
```

### `models.ResponseInputFile`

```typescript lines theme={null}
const value: models.ResponseInputFile = {
  type: "input_file",
};
```

### `models.ResponseInputAudio`

```typescript lines theme={null}
const value: models.ResponseInputAudio = {
  type: "input_audio",
  inputAudio: {
    data: "SGVsbG8gV29ybGQ=",
    format: "mp3",
  },
};
```

### `models.ResponseInputVideo`

```typescript lines theme={null}
const value: models.ResponseInputVideo = {
  type: "input_video",
  videoUrl: "https://example.com/video.mp4",
};
```
