> [!CAUTION]
> **Caution:** The following table describes image generation endpoints that are deprecated and their replacements. We recommend updating your model endpoints before June 30, 2026, to avoid service disruption.
>
> | Discontinued endpoints | Recommended endpoint migration |
> |---|---|
> | `veo-3.0-generate-001` | `veo-3.1-generate-001` |
> | `veo-3.0-fast-generate-001` | `veo-3.1-fast-generate-001` |
> | `veo-2.0-generate-001` | `veo-3.1-generate-001` |
>

Veo 2 is our stable line of video generation models. This page
documents the capabilities and features of Veo 2.

| Model ID | `veo-2.0-generate-001` ||
| Modalities | Text Input only Image Not supported Audio Not supported Video Output only ||
| Capabilities | - Supported - [Text to video](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/video/generate-videos-from-text) - [Image to video](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/video/generate-videos-from-an-image) - [Prompt rewriting](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/video/turn-the-prompt-rewriter-off) - [Reference style images](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/video/use-reference-images-to-guide-video-generation#use-style-images) - [Reference asset images](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/video/use-reference-images-to-guide-video-generation#use-subject-images) - [Insert objects into videos](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/video/insert-objects-into-videos) Preview feature - [Remove objects from videos](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/video/remove-objects-from-videos) Preview feature - [Content Credentials (C2PA)](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/content-credentials) - Not supported - [Extend videos](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/video/extend-a-veo-video) - [Generate videos from the first and last frames](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/video/generate-videos-from-first-and-last-frames) ||
| Consumption options | - [Provisioned Throughput](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/provisioned-throughput) Not supported - [Batch inference](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/batch-inference) Not supported - [Pay-as-you-go](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/deploy/consumption-options) Not supported - [Fixed quota](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/quotas) Supported ||
| Consumption options |
|---|---|---|
| See [Consumption options](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/deploy/consumption-options) for more information. ||
| See [Deployments and endpoints](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/locations) for more information. ||
| See [Security controls](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/security-controls) for more information. ||

For Veo pricing information, see the
[Veo](https://cloud.google.com/gemini-enterprise-agent-platform/generative-ai/pricing#veo)
section of the [Cost of building and deploying AI models in Agent Platform](https://cloud.google.com/gemini-enterprise-agent-platform/generative-ai/pricing)
page.
