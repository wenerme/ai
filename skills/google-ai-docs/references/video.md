The Gemini API offers two models for generating video,
[Gemini Omni Flash](https://ai.google.dev/gemini-api/docs/omni) and [Veo](https://ai.google.dev/gemini-api/docs/veo).
Each are designed for different workflows.

Use Gemini Omni Flash as your default model for video generation. It provides
superior video coherence, multi-input reasoning (supporting text, images, audio,
and video inputs simultaneously), character consistency, factual accuracy, and
multi-turn conversational editing (e.g., element replacement or perspective
changes). Use Veo 3.1 for specific
capabilities like scene extension, last-frame control, or integration with
legacy pipelines are required.

## Gemini Omni Flash

Gemini Omni Flash is a fast, multimodal model for video generation and
conversational video editing. It excels at quickly turning text prompts and
images into short videos, and lets you refine results across multiple turns
using the Interactions API.

[Get started with Gemini Omni Flash →](https://ai.google.dev/gemini-api/docs/omni)

## Veo 3.1

> [!WARNING]
> **Warning:** Veo 3.1 Preview (`veo-3.1-generate-preview`, `veo-3.1-fast-generate-preview`, and `veo-3.1-lite-generate-preview`) in the Gemini API is [deprecated](https://ai.google.dev/gemini-api/docs/deprecations) and will be shut down on **October 22, 2026** ; migrate to [Gemini Omni Flash](https://ai.google.dev/gemini-api/docs/omni) (`gemini-omni-1.1-flash`) or the GA models available through the [Gemini Enterprise Agent Platform](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-1-generate) to avoid service interruptions.

Veo 3.1 is a model for generating video with native audio. It supports
features like video extension, frame-specific generation, and image-based
direction through the `generateContent` API.

[Get started with Veo 3.1 →](https://ai.google.dev/gemini-api/docs/veo)

## Video understanding

If you need to ingest and analyze existing video content rather than generate
new video, see the [Video understanding guide](https://ai.google.dev/gemini-api/docs/video-understanding).