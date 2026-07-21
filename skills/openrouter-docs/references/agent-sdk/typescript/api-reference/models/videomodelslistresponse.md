> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# VideoModelsListResponse - TypeScript SDK

> VideoModelsListResponse type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript expandable lines theme={null}
import { VideoModelsListResponse } from "@openrouter/sdk/models";

let value: VideoModelsListResponse = {
  data: [
    {
      allowedPassthroughParameters: [],
      canonicalSlug: "google/veo-3.1",
      created: 1700000000,
      generateAudio: true,
      id: "google/veo-3.1",
      name: "Veo 3.1",
      seed: null,
      supportedAspectRatios: [
        "16:9",
      ],
      supportedDurations: [
        5,
        8,
      ],
      supportedFrameImages: [
        "first_frame",
        "last_frame",
      ],
      supportedResolutions: [
        "720p",
      ],
      supportedSizes: null,
    },
  ],
};
```

## Fields

| Field  | Type                                                                          | Required             | Description |
| ------ | ----------------------------------------------------------------------------- | -------------------- | ----------- |
| `data` | [models.VideoModel](/docs/agent-sdk/typescript/api-reference/models/videomodel)\[] | :heavy\_check\_mark: | N/A         |
