> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# InputVideo - TypeScript SDK

> InputVideo type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

Video input content item

## Example Usage

```typescript lines theme={null}
import { InputVideo } from "@openrouter/sdk/models";

let value: InputVideo = {
  type: "input_video",
  videoUrl: "https://example.com/video.mp4",
};
```

## Fields

| Field      | Type             | Required             | Description                                                   |
| ---------- | ---------------- | -------------------- | ------------------------------------------------------------- |
| `type`     | *"input\_video"* | :heavy\_check\_mark: | N/A                                                           |
| `videoUrl` | *string*         | :heavy\_check\_mark: | A base64 data URL or remote URL that resolves to a video file |
