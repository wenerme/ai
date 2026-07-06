> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# InputMessageItemContentUnion - TypeScript SDK

> InputMessageItemContentUnion type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Supported Types

### `models.InputText`

```typescript lines theme={null}
const value: models.InputText = {
  text: "Hello, how can I help you?",
  type: "input_text",
};
```

### `models.InputMessageItemContentInputImage`

```typescript lines theme={null}
const value: models.InputMessageItemContentInputImage = {
  detail: "auto",
  type: "input_image",
};
```

### `models.InputFile`

```typescript lines theme={null}
const value: models.InputFile = {
  type: "input_file",
};
```

### `models.InputAudio`

```typescript lines theme={null}
const value: models.InputAudio = {
  inputAudio: {
    data: "SGVsbG8gV29ybGQ=",
    format: "mp3",
  },
  type: "input_audio",
};
```

### `models.InputVideo`

```typescript lines theme={null}
const value: models.InputVideo = {
  type: "input_video",
  videoUrl: "https://example.com/video.mp4",
};
```
