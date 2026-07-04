> [!IMPORTANT]
> **API reference overview** : To view an overview of the API options for video generation, see the [Veo model API reference](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/model-reference/veo-video-generation).

> [!NOTE]
> To see an example of Veo 3 Video Generation,
> run the "Veo 3 Video Generation" notebook in one of the following
> environments:
>
> [!Open in Colab](https://colab.research.google.com/github/GoogleCloudPlatform/generative-ai/blob/main/vision/getting-started/veo3_video_generation.ipynb)
>
>
> \|
>
> [!Open in Colab Enterprise](https://console.cloud.google.com/agent-platform/colab/import/https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fvision%2Fgetting-started%2Fveo3_video_generation.ipynb)
>
>
> \|
>
> [!Open
> in Agent Platform Workbench](https://console.cloud.google.com/agent-platform/workbench/deploy-notebook?download_url=https://raw.githubusercontent.com/GoogleCloudPlatform/generative-ai/main/vision/getting-started/veo3_video_generation.ipynb)
>
>
> \|
>
> [!View on GitHub](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/vision/getting-started/veo3_video_generation.ipynb)

Veo is Google's model for generating videos with audio.
You can use this model in the [Gemini Enterprise Agent Platform Media
Studio](https://console.cloud.google.com/agent-platform/studio/media/video) or using
the [Gemini Enterprise Agent Platform video generation
API](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/Shared.Types/VideoGenerationModelInstance).

Veo can generate the following:

- Videos at 720p, 1080p, or 4K resolution.
- Videos with 16:9 (landscape) or 9:16 (portrait) aspect ratio.
- Clips of 4, 6, or 8 seconds in length.
- Audio and dialogue.

You can also use Veo to extend existing videos, and instruct
the model to use specific images as the first and last frame of a video.

[Try Veo on Agent Platform Media Studio](https://console.cloud.google.com/agent-platform/studio/media/video)

[Try Veo in a Colab](https://colab.research.google.com/github/GoogleCloudPlatform/generative-ai/blob/main/vision/getting-started/veo3_video_generation.ipynb)

## Veo model versions

There are multiple Veo video generation models that you can use.
For more information, see [Veo
models](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/google-models#veo-models).

## Key features

Veo excels at a wide range of visual and cinematic styles with
the following capabilities:

- [Text to
  video](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/video/generate-videos-from-text)
- [Image (first frame) to
  video](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/video/generate-videos-from-an-image)
- [First and last frames to
  video](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/video/generate-videos-from-first-and-last-frames)
- [Ingredients to video (with image
  references)](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/video/use-reference-images-to-guide-video-generation)
- [Extend videos](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/video/extend-a-veo-video)
- [Insert
  objects](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/video/insert-objects-into-videos)
- [Remove
  objects](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/video/remove-objects-from-videos)

For more information about writing effective text prompts for video generation,
see the [Veo prompt
guide](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/video/video-gen-prompt-guide) and [Veo best
practices](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/video/best-practice).

## Locations

A location is a [region](https://docs.cloud.google.com/about/locations) that you can specify in a request to
control where data is stored at rest. For more information about where
Veo is available, see [Generative AI on Gemini Enterprise Agent Platform
locations](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/locations-genai).

## Responsible AI for Veo on Gemini Enterprise Agent Platform

Veo on Gemini Enterprise Agent Platform is designed with Google's [AI
Principles](https://ai.google/principles/) in mind. However, it's important to
understand how to test and deploy Google's models safely and responsibly.
Veo on Gemini Enterprise Agent Platform has built-in safety features to help you block potentially harmful
outputs within your use cases. For more information, see [Responsible AI for
Veo](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/video/responsible-ai-and-usage-guidelines).
