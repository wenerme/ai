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

> [!CAUTION]
> **Caution:** As of March 26, 2026, `gemini-3-pro-preview` is discontinued. Both model serving and Provisioned Throughput are no longer available. New and existing projects should use `gemini-3.1-pro-preview`.

Gemini 3 Pro is our most advanced reasoning Gemini model,
capable of solving complex problems. Gemini 3 Pro can comprehend vast
datasets and challenging problems from different information sources, including
text, audio, images, video, PDFs, and even entire code repositories with its 1M
token context window.

> [!NOTE]
> **Note:** PDF token counts will be listed under the `IMAGE` modality instead of the `DOCUMENT` modality in `usage_metadata`.

## Quality changes

When migrating from Gemini 2.5 Pro to Gemini 3 Pro, you can
expect to see significant improvements in high-level reasoning, complex
instruction following, tool use, agentic use cases, and better long context
capabilities (including image and document understanding). Gemini 3 Pro
models aren't designed around prioritizing supporting audio understanding or
image segmentation use cases. For high performance output on
those use cases, try using models specifically built with those needs in mind.
For information-dense or complicated graphs, tables, or charts, the model can
sometimes incorrectly extract information or misinterpret the provided
resources. Presenting key information in as straightforward a manner as possible
can help ensure the preferred output when working with Gemini 3 Pro.

## Behavior changes

Gemini 3 Pro is designed for high efficiency and action. The model has
been trained to provide concise, direct answers and to attempt to solve user
intent as quickly as possible. Because the model is designed to prioritize being
helpful, it may occasionally guess when information is missing or prioritize a
satisfying answer over strict instructions. This behavior can be mitigated or
modified with prompting. For more information and best practices, see
[Get started with Gemini 3](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/start/get-started-with-gemini-3).

## New features

Gemini 3 Pro introduces several new features to improve performance,
control, and multimodal fidelity:

- **Thinking level** : Use the `thinking_level` parameter to control the amount of internal reasoning the model performs (*low* or *high* ) to balance response quality, reasoning complexity, latency, and cost. The `thinking_level` parameter replaces `thinking_budget` for Gemini 3 models.
- **Media resolution** : Use the `media_resolution` parameter (*low* , *medium* , or *high* ) to control vision processing for multimodal inputs, impacting token usage and latency. See [Get started with Gemini 3](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/start/get-started-with-gemini-3#media_resolution) for default resolution settings.
- **Thought signatures** : Stricter validation of [thought signatures](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/thought-signatures) improves reliability in multi-turn function calling.
- **Multimodal function responses** : Function responses can now include [multimodal objects like images and PDFs in addition to text](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/tools/function-calling#mm-fr).
- **Streaming function calling** : [Stream partial function call arguments](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/tools/function-calling#streaming-fc) to improve user experience during tool use.

For more information on using these features, see
[Get started with Gemini 3](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/start/get-started-with-gemini-3).

[Try in Agent Platform](https://console.cloud.google.com/agent-platform/studio/multimodal?model=gemini-3-pro-preview) [View in Model Garden](https://console.cloud.google.com/agent-platform/publishers/google/gemini-3-pro-preview) [(Preview) Deploy example app](https://console.cloud.google.com/agent-platform/studio/multimodal?suggestedPrompt=How+does+AI+work&deploy=true&model=gemini-3-pro-preview)
Note: To use the "Deploy example app" feature, you need a Google Cloud project with billing and Agent Platform API enabled.

| Model ID | `gemini-3-pro-preview` ||
| Supported inputs \& outputs | - Inputs: Text, Code, Images, Audio, Video, PDF - Outputs: Text ||
| Token limits | - Maximum input tokens: 1,048,576 - Maximum output tokens: 65,536 ||
| Capabilities | - Supported - [Grounding with Google Search](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/grounding/grounding-with-google-search) - [Code execution](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/tools/code-execution) - [System instructions](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/prompts/system-instruction-introduction) - [Structured output](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/control-generated-output) - [Function calling](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/tools/function-calling) - [Count Tokens](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/get-token-count) - [Thinking](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/thinking) - [Implicit context caching](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/context-cache/context-cache-overview) - [Explicit context caching](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/context-cache/context-cache-overview) - [Chat completions](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/migrate/openai/overview) - Not supported - [Supervised fine-tuning](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini-supervised-tuning) - [Continuous tuning](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini-use-continuous-tuning) - [Preference tuning](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini-preference-tuning) - [Tuning checkpoints](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/tuning-checkpoints) - [Gemini Live API](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/live-api) ||
| Consumption options | - Supported - [Provisioned Throughput](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/provisioned-throughput) - [Standard PayGo](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/standard-paygo) - [Flex PayGo](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/flex-paygo) - [Priority PayGo](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/priority-paygo) - [Batch inference](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/batch-inference) - Not supported ||
| Consumption options |
|---|---|---|
| See [Consumption options](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/deploy/consumption-options) for more information. ||
| **Images** | - Maximum images per prompt: 3000 - Maximum file size per file for inline data or direct uploads through the console: 7 MB - Maximum file size per file from Google Cloud Storage: 30 MB - Default resolution tokens: 1120 - Supported MIME types: `image/png`, `image/jpeg`, `image/webp`, `image/heic`, `image/heif` |
| **Documents** | - Maximum number of files per prompt: 3000 - Maximum number of pages per file: 3000 - Maximum file size per file for the API or Cloud Storage imports: 50 MB(application/pdf) or 7 MB(text/plain) - Maximum file size per file for direct uploads through the console: 7 MB - Default resolution tokens: 560 - OCR for scanned PDFs: Not used by default - Supported MIME types: `application/pdf`, `text/plain` |
| **Video** | - Maximum video length (with audio): Approximately 45 minutes - Maximum video length (without audio): Approximately 1 hour - Maximum number of videos per prompt: 10 - Default resolution tokens per frame: 70 - Supported MIME types: `video/x-flv`, `video/quicktime`, `video/mpeg`, `video/mpegs`, `video/mpg`, `video/mp4`, `video/webm`, `video/wmv`, `video/3gpp` |
| **Audio** | - Maximum audio length per prompt: Approximately 8.4 hours, or up to 1 million tokens - Maximum number of audio files per prompt: 1 - Speech understanding for: Audio summarization, transcription, and translation - Supported MIME types: `audio/x-aac`, `audio/flac`, `audio/mp3`, `audio/m4a`, `audio/mpeg`, `audio/mpga`, `audio/mp4`, `audio/ogg`, `audio/pcm`, `audio/wav`, `audio/webm` |
| **Parameter defaults** | - Temperature: 0.0-2.0 (default 1.0) - topP: 0.0-1.0 (default 0.95) - topK: 64 (fixed) - candidateCount: 1--8 (default 1) |
| Model availability | - Global - global |
| See [Deployments and endpoints](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/locations) for more information. ||
