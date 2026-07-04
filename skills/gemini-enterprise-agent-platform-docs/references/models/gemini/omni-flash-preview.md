> [!WARNING]
> **Preview**
>
>
> This product or feature is a Generative AI Preview offering, subject to the
> "Pre-GA Offerings Terms" of the
> [Google Cloud Service Specific Terms](https://cloud.google.com/terms/service-terms). For this Generative AI Preview
> offering, Customers may elect to use it for production or commercial
> purposes, or disclose Generated Output to third-parties, and may process
> personal data as outlined in the
> [Cloud Data Processing Addendum](https://cloud.google.com/terms/data-processing-addendum), subject to the obligations and
> restrictions described in the agreement under which you access Google
> Cloud.

Gemini Omni Flash (Preview) is a multimodal model designed for video,
image, and text tasks. It is optimized for video generation, offering video
output alongside text responses in a single model.

[Try in Agent Studio](https://console.cloud.google.com/agent-platform/studio/multimodal?model=gemini-omni-flash-preview)
[View in Model Garden](https://console.cloud.google.com/agent-platform/publishers/google/model-garden/gemini-omni-flash-preview)
[Deploy example app](https://console.cloud.google.com/agent-platform/studio/multimodal?suggestedPrompt=How+does+AI+work&deploy=true&model=gemini-omni-flash-preview)
Note: "Deploy example app" requires a Google Cloud project with billing and Agent Platform API enabled.

| Model ID | `gemini-omni-flash-preview` ||
| Modalities | Text Input and output Image Input only Audio Not supported Video Input and output ||
| Token limits | Maximum input tokens | 131,072 |
| Token limits | Maximum output tokens | 57,920 |
| Capabilities | - Supported - [Content Credentials (C2PA)](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/content-credentials) - [Count Tokens](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/get-token-count) - [Generate videos from text](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/video/generate-videos-from-text) - [Reference to video](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/video/use-reference-images-to-guide-video-generation) - [Sound generation (speech, music, fx)](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/video/video-gen-prompt-guide#audio) - [Video editing](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/video/overview) - [Thinking](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/thinking) - Not supported - [Chat completions](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/migrate/openai/overview) - [Image generation](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/image-generation) - [Interleaved images and text](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/image-generation#interleaved-images) - [Edit images](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/gemini-edit-images) - [Multi-turn image editing](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/gemini-edit-images#multi-turn-editing) - [Grounding with Google Search](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/grounding/grounding-with-google-search) - [Code execution](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/tools/code-execution) - [Supervised fine-tuning](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini-supervised-tuning) - [Continuous tuning](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini-use-continuous-tuning) - [Preference tuning](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini-preference-tuning) - [Tuning checkpoints](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/tuning-checkpoints) - [System instructions](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/prompts/system-instruction-introduction) - [Function calling](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/tools/function-calling) - [Gemini Live API](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/live-api) - [Implicit context caching](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/context-cache/context-cache-overview) - [Explicit context caching](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/context-cache/context-cache-overview) ||
| Consumption options | - [Provisioned Throughput](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/provisioned-throughput) Not supported - [Batch inference](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/batch-inference) Not supported - [Pay-as-you-go](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/deploy/consumption-options) Not supported - [Fixed quota](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/quotas) Supported ||
| Consumption options |
|---|---|---|
| See [Consumption options](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/deploy/consumption-options) for more information. ||
| **Text** | - Maximum file size per file for the API or Cloud Storage imports: 50 MB - Maximum file size per file for direct uploads through the console: 7 MB - Supported MIME types: `text/plain` |
| **Video** | - Maximum video length (with audio): 10 seconds - Maximum video length (without audio): 10 seconds - Maximum number of videos per prompt: 3 - Supported MIME types: `video/x-flv`, `video/quicktime`, `video/mpeg`, `video/mpegs`, `video/mpg`, `video/mp4`, `video/webm`, `video/wmv`, `video/3gpp` |
| **Parameter defaults** | - Temperature: 0.0-2.0 (default 1.0) - topP: 0.0-1.0 (default 0.95) - topK: - - candidateCount: 1 |
| Standard pay-as-you-go | - Global - global |
| See [Deployments and endpoints](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/locations) for more information. ||
