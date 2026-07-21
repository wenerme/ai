> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# VideoGenerationRequest - TypeScript SDK

> VideoGenerationRequest type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript lines theme={null}
import { VideoGenerationRequest } from "@openrouter/sdk/models";

let value: VideoGenerationRequest = {
  model: "google/veo-3.1",
  prompt: "A serene mountain landscape at sunset",
};
```

## Fields

| Field             | Type                                                                                                               | Required             | Description                                                                                                                                                                                               | Example                                                    |
| ----------------- | ------------------------------------------------------------------------------------------------------------------ | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| `aspectRatio`     | [models.AspectRatio](/docs/agent-sdk/typescript/api-reference/models/aspectratio)                                       | :heavy\_minus\_sign: | Aspect ratio of the generated video                                                                                                                                                                       | 16:9                                                       |
| `callbackUrl`     | *string*                                                                                                           | :heavy\_minus\_sign: | URL to receive a webhook notification when the video generation job completes. Overrides the workspace-level default callback URL if set. Must be HTTPS.                                                  | [https://example.com/webhook](https://example.com/webhook) |
| `duration`        | *number*                                                                                                           | :heavy\_minus\_sign: | Duration of the generated video in seconds                                                                                                                                                                | 8                                                          |
| `frameImages`     | [models.FrameImage](/docs/agent-sdk/typescript/api-reference/models/frameimage)\[]                                      | :heavy\_minus\_sign: | Images to use as the first and/or last frame of the generated video. Each image must specify a frame\_type of first\_frame or last\_frame.                                                                |                                                            |
| `generateAudio`   | *boolean*                                                                                                          | :heavy\_minus\_sign: | Whether to generate audio alongside the video. Defaults to the endpoint's generate\_audio capability flag, false if not set.                                                                              | true                                                       |
| `inputReferences` | [models.ContentPartImage](/docs/agent-sdk/typescript/api-reference/models/contentpartimage)\[]                          | :heavy\_minus\_sign: | Reference images to guide video generation                                                                                                                                                                |                                                            |
| `model`           | *string*                                                                                                           | :heavy\_check\_mark: | N/A                                                                                                                                                                                                       |                                                            |
| `prompt`          | *string*                                                                                                           | :heavy\_check\_mark: | N/A                                                                                                                                                                                                       |                                                            |
| `provider`        | [models.VideoGenerationRequestProvider](/docs/agent-sdk/typescript/api-reference/models/videogenerationrequestprovider) | :heavy\_minus\_sign: | Provider-specific passthrough configuration                                                                                                                                                               |                                                            |
| `resolution`      | [models.Resolution](/docs/agent-sdk/typescript/api-reference/models/resolution)                                         | :heavy\_minus\_sign: | Resolution of the generated video                                                                                                                                                                         | 720p                                                       |
| `seed`            | *number*                                                                                                           | :heavy\_minus\_sign: | If specified, the generation will sample deterministically, such that repeated requests with the same seed and parameters should return the same result. Determinism is not guaranteed for all providers. |                                                            |
| `size`            | *string*                                                                                                           | :heavy\_minus\_sign: | Exact pixel dimensions of the generated video in "WIDTHxHEIGHT" format (e.g. "1280x720"). Interchangeable with resolution + aspect\_ratio.                                                                | 1280x720                                                   |
