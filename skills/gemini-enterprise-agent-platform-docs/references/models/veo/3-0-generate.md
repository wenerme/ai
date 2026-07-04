> [!CAUTION]
> **Caution:** The following table describes image generation endpoints that are deprecated and their replacements. We recommend updating your model endpoints before June 30, 2026, to avoid service disruption.
>
> | Discontinued endpoints | Recommended endpoint migration |
> |---|---|
> | `veo-3.0-generate-001` | `veo-3.1-generate-001` |
> | `veo-3.0-fast-generate-001` | `veo-3.1-fast-generate-001` |
> | `veo-2.0-generate-001` | `veo-3.1-generate-001` |
>

Veo 3 is our latest line of video generation models. This page
documents the capabilities and features of Veo 3.

## 3.0 Generate 001

| Model ID | `veo-3.0-generate-001` ||
| Modalities | Text Input only Image Not supported Audio Not supported Video Output only ||
| Capabilities | - Supported - [Text to video](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/video/generate-videos-from-text) - [Image to video](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/video/generate-videos-from-an-image) - [Prompt rewriting](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/video/turn-the-prompt-rewriter-off) - [Sound generation](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/video/video-gen-prompt-guide#audio) - [Content Credentials (C2PA)](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/content-credentials) - Not supported - [Extend videos](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/video/extend-a-veo-video) - [Generate videos from the first and last frames](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/video/generate-videos-from-first-and-last-frames) - [Reference style images](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/video/use-reference-images-to-guide-video-generation#use-style-images) - [Reference asset images](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/video/use-reference-images-to-guide-video-generation#use-subject-images) ||
| Consumption options | - [Provisioned Throughput](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/provisioned-throughput) Supported - [Batch inference](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/batch-inference) Not supported - [Pay-as-you-go](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/deploy/consumption-options) Not supported - [Fixed quota](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/quotas) Supported ||
| Consumption options |
|---|---|---|
| See [Consumption options](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/deploy/consumption-options) for more information. ||
| See [Deployments and endpoints](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/locations) for more information. ||
| See [Security controls](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/security-controls) for more information. ||

## 3.0 Fast Generate 001

| Model ID | `veo-3.0-fast-generate-001` ||
| Modalities | Text Input only Image Not supported Audio Not supported Video Output only ||
| Capabilities | - Supported - [Text to video](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/video/generate-videos-from-text) - [Image to video](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/video/generate-videos-from-an-image) - [Prompt rewriting](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/video/turn-the-prompt-rewriter-off) - [Sound generation](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/video/video-gen-prompt-guide#audio) - [Content Credentials (C2PA)](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/content-credentials) - Not supported - [Extend videos](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/video/extend-a-veo-video) - [Generate videos from the first and last frames](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/video/generate-videos-from-first-and-last-frames) - [Reference style images](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/video/use-reference-images-to-guide-video-generation#use-style-images) - [Reference asset images](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/video/use-reference-images-to-guide-video-generation#use-subject-images) ||
| Consumption options | - [Provisioned Throughput](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/provisioned-throughput) Supported - [Batch inference](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/batch-inference) Not supported - [Pay-as-you-go](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/deploy/consumption-options) Not supported - [Fixed quota](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/quotas) Supported ||
| Consumption options |
|---|---|---|
| See [Consumption options](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/deploy/consumption-options) for more information. ||
| See [Deployments and endpoints](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/locations) for more information. ||
| See [Security controls](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/security-controls) for more information. ||

> [!CAUTION]
> **Caution:** The following table describes the video generation preview endpoints that will be deprecated and removed on April 2, 2026. Migrate any workflows using preview models to the recommended GA endpoints.
>
> | Discontinued endpoints | Recommended endpoint migration |
> |---|---|
> | `veo-2.0-generate-exp` | `veo-2.0-generate-001` |
> | `veo-2.0-generate-preview` | `veo-2.0-generate-001` |
> | `veo-3.0-generate-preview` | `veo-3.0-generate-001` |
> | `veo-3.0-fast-generate-preview` | `veo-3.0-fast-generate-001` |
> | `veo-3.1-generate-preview` | `veo-3.1-generate-001` |
> | `veo-3.1-fast-generate-preview` | `veo-3.1-fast-generate-001` |
>
> [!WARNING]
> **Preview with production use**
>
>
> The Image-to-Video feature is a Generative AI Preview offering, subject
> to the "Pre-GA Offerings Terms" of the [Google Cloud Service
> Specific Terms](https://cloud.google.com/terms/service-terms), as well as the [Additional Terms for
> Generative AI Preview Products](https://cloud.google.com/trustedtester/aitos). For this Generative AI Preview
> offering, Customers may elect to use it for production or commercial
> purposes, or disclose Generated Output to third-parties. Pre-GA products
> and features may have limited support, and changes to pre-GA products
> and features may not be compatible with other pre-GA versions. For more
> information, see the [launch
> stage descriptions](https://cloud.google.com/products#product-launch-stages).

## 3.0 Generate

| Model ID | `veo-3.0-generate-preview` ||
| Modalities | Text Input only Image Not supported Audio Not supported Video Output only ||
| Capabilities | - Supported - [Text to video](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/video/generate-videos-from-text) Preview feature - [Image to video](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/video/generate-videos-from-an-image) Preview feature - [Prompt rewriting](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/video/turn-the-prompt-rewriter-off) Preview feature - [Sound generation](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/video/video-gen-prompt-guide#audio) Preview feature - [Content Credentials (C2PA)](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/content-credentials) - Not supported - [Extend videos](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/video/extend-a-veo-video) - [Generate videos from the first and last frames](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/video/generate-videos-from-first-and-last-frames) - [Reference style images](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/video/use-reference-images-to-guide-video-generation#use-style-images) - [Reference asset images](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/video/use-reference-images-to-guide-video-generation#use-subject-images) ||
| Consumption options | - [Provisioned Throughput](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/provisioned-throughput) Not supported - [Batch inference](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/batch-inference) Not supported - [Pay-as-you-go](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/deploy/consumption-options) Not supported - [Fixed quota](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/quotas) Supported ||
| Consumption options |
|---|---|---|
| See [Consumption options](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/deploy/consumption-options) for more information. ||
| See [Deployments and endpoints](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/locations) for more information. ||

> [!CAUTION]
> **Caution:** The following table describes the video generation preview endpoints that will be deprecated and removed on April 2, 2026. Migrate any workflows using preview models to the recommended GA endpoints.
>
> | Discontinued endpoints | Recommended endpoint migration |
> |---|---|
> | `veo-2.0-generate-exp` | `veo-2.0-generate-001` |
> | `veo-2.0-generate-preview` | `veo-2.0-generate-001` |
> | `veo-3.0-generate-preview` | `veo-3.0-generate-001` |
> | `veo-3.0-fast-generate-preview` | `veo-3.0-fast-generate-001` |
> | `veo-3.1-generate-preview` | `veo-3.1-generate-001` |
> | `veo-3.1-fast-generate-preview` | `veo-3.1-fast-generate-001` |
>
> [!WARNING]
> **Preview with production use**
>
>
> The Image-to-Video feature is a Generative AI Preview offering, subject
> to the "Pre-GA Offerings Terms" of the [Google Cloud Service
> Specific Terms](https://cloud.google.com/terms/service-terms), as well as the [Additional Terms for
> Generative AI Preview Products](https://cloud.google.com/trustedtester/aitos). For this Generative AI Preview
> offering, Customers may elect to use it for production or commercial
> purposes, or disclose Generated Output to third-parties. Pre-GA products
> and features may have limited support, and changes to pre-GA products
> and features may not be compatible with other pre-GA versions. For more
> information, see the [launch
> stage descriptions](https://cloud.google.com/products#product-launch-stages).

## 3.0 Fast Generate

| Model ID | `veo-3.0-fast-generate-preview` ||
| Modalities | Text Input only Image Not supported Audio Not supported Video Output only ||
| Capabilities | - Supported - [Text to video](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/video/generate-videos-from-text) Preview feature - [Image to video](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/video/generate-videos-from-an-image) Preview feature - [Prompt rewriting](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/video/turn-the-prompt-rewriter-off) Preview feature - [Sound generation](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/video/video-gen-prompt-guide#audio) Preview feature - [Content Credentials (C2PA)](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/content-credentials) - Not supported - [Extend videos](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/video/extend-a-veo-video) - [Generate videos from the first and last frames](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/video/generate-videos-from-first-and-last-frames) - [Reference style images](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/video/use-reference-images-to-guide-video-generation#use-style-images) - [Reference asset images](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/video/use-reference-images-to-guide-video-generation#use-subject-images) ||
| Consumption options | - [Provisioned Throughput](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/provisioned-throughput) Not supported - [Batch inference](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/batch-inference) Not supported - [Pay-as-you-go](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/deploy/consumption-options) Not supported - [Fixed quota](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/quotas) Supported ||
| Consumption options |
|---|---|---|
| See [Consumption options](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/deploy/consumption-options) for more information. ||
| See [Deployments and endpoints](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/locations) for more information. ||

For Veo pricing information, see the
[Veo](https://cloud.google.com/gemini-enterprise-agent-platform/generative-ai/pricing#veo)
section of the [Cost of building and deploying AI models in Agent Platform](https://cloud.google.com/gemini-enterprise-agent-platform/generative-ai/pricing)
page.
