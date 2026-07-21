> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# VideoModel - TypeScript SDK

> VideoModel type definition

<Warning>
  The TypeScript SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/typescript-sdk/issues).
</Warning>

## Example Usage

```typescript expandable lines theme={null}
import { VideoModel } from "@openrouter/sdk/models";

let value: VideoModel = {
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
};
```

## Fields

| Field                          | Type                                                                                              | Required             | Description                                                              | Example                                                                                    |
| ------------------------------ | ------------------------------------------------------------------------------------------------- | -------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| `allowedPassthroughParameters` | *string*\[]                                                                                       | :heavy\_check\_mark: | List of parameters that are allowed to be passed through to the provider |                                                                                            |
| `canonicalSlug`                | *string*                                                                                          | :heavy\_check\_mark: | Canonical slug for the model                                             | openai/gpt-4                                                                               |
| `created`                      | *number*                                                                                          | :heavy\_check\_mark: | Unix timestamp of when the model was created                             | 1692901234                                                                                 |
| `description`                  | *string*                                                                                          | :heavy\_minus\_sign: | Description of the model                                                 | GPT-4 is a large multimodal model that can solve difficult problems with greater accuracy. |
| `generateAudio`                | *boolean*                                                                                         | :heavy\_check\_mark: | Whether the model supports generating audio alongside video              |                                                                                            |
| `huggingFaceId`                | *string*                                                                                          | :heavy\_minus\_sign: | Hugging Face model identifier, if applicable                             | microsoft/DialoGPT-medium                                                                  |
| `id`                           | *string*                                                                                          | :heavy\_check\_mark: | Unique identifier for the model                                          | openai/gpt-4                                                                               |
| `name`                         | *string*                                                                                          | :heavy\_check\_mark: | Display name of the model                                                | GPT-4                                                                                      |
| `pricingSkus`                  | `Record<string, *string*>`                                                                        | :heavy\_minus\_sign: | Pricing SKUs with provider prefix stripped, values as strings            |                                                                                            |
| `seed`                         | *boolean*                                                                                         | :heavy\_check\_mark: | Whether the model supports deterministic generation via seed parameter   |                                                                                            |
| `supportedAspectRatios`        | [models.SupportedAspectRatio](/docs/agent-sdk/typescript/api-reference/models/supportedaspectratio)\[] | :heavy\_check\_mark: | Supported output aspect ratios                                           |                                                                                            |
| `supportedDurations`           | *number*\[]                                                                                       | :heavy\_check\_mark: | Supported video durations in seconds                                     |                                                                                            |
| `supportedFrameImages`         | [models.SupportedFrameImage](/docs/agent-sdk/typescript/api-reference/models/supportedframeimage)\[]   | :heavy\_check\_mark: | Supported frame image types (e.g. first\_frame, last\_frame)             |                                                                                            |
| `supportedResolutions`         | [models.SupportedResolution](/docs/agent-sdk/typescript/api-reference/models/supportedresolution)\[]   | :heavy\_check\_mark: | Supported output resolutions                                             |                                                                                            |
| `supportedSizes`               | [models.SupportedSize](/docs/agent-sdk/typescript/api-reference/models/supportedsize)\[]               | :heavy\_check\_mark: | Supported output sizes (width x height)                                  |                                                                                            |
