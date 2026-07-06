> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Content - TypeScript SDK

> Content type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Supported Types

### `operations.ContentText`

```typescript lines theme={null}
const value: operations.ContentText = {
  text: "<value>",
  type: "text",
};
```

### `operations.ContentImageURL`

```typescript lines theme={null}
const value: operations.ContentImageURL = {
  imageUrl: {
    url: "https://zealous-march.biz/",
  },
  type: "image_url",
};
```

### `models.ContentPartInputAudio`

```typescript lines theme={null}
const value: models.ContentPartInputAudio = {
  inputAudio: {
    data: "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAA...",
  },
  type: "input_audio",
};
```

### `models.ContentPartInputVideo`

```typescript lines theme={null}
const value: models.ContentPartInputVideo = {
  inputVideo: {
    data: "data:video/mp4;base64,AAAAGGZ0eXBtcDQyAAAAAGlzb21tcDQy...",
  },
  type: "input_video",
};
```

### `models.ContentPartInputFile`

```typescript lines theme={null}
const value: models.ContentPartInputFile = {
  inputFile: {
    data: "data:application/pdf;base64,JVBERi0xLjQKJeLjz9MKMyAw...",
  },
  type: "input_file",
};
```
