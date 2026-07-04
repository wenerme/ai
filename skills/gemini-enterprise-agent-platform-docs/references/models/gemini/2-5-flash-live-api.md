Gemini 2.5 Flash with Gemini Live API native audio features our
cutting-edge native audio functionality for
[Gemini Live API](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/live-api). In addition to the
standard Gemini Live API features, this model includes:

- **Enhanced audio quality:** Experience dramatically improved audio quality that feels like speaking with a person.
- **Enhanced voice quality and adaptability:** Gemini Live API native audio provides richer, more natural voice interactions with [30 HD voices](https://docs.cloud.google.com/text-to-speech/docs/chirp3-hd#voice_options) in [24 languages](https://docs.cloud.google.com/text-to-speech/docs/chirp3-hd#language_availability).
- **Introducing [Proactive Audio](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/live-api/configure-gemini-capabilities#use-proactive-audio):** (Preview) When Proactive Audio is enabled, the model only responds when it's relevant. The model generates text transcripts and audio responses proactively only for queries directed to the device, and does not respond to non-device directed queries.
- **Introducing Affective Dialog:** Models using Gemini Live API native audio can understand and respond appropriately to users' emotional expressions for more nuanced conversations.
- **Improved barge-in:** Interrupt Gemini more naturally and reliably, even in loud and noisy environments.
- **Robust function calling:** We've improved the triggering rate, allowing Gemini to successfully execute the functions you define to support your use cases.
- **Accurate transcription:** The accuracy of audio-to-text transcription has been significantly enhanced. For even better results, you can provide language hints to guide the model toward the correct language. For more information, see [Enable audio transcription for the session](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/live-api/start-manage-session#enable-audio-transcription).
- **Seamless multilingual support:** Speak to Gemini in multiple languages, and it will effortlessly switch between them without any pre-configuration. Language is no longer a barrier.

For more information on Gemini Live API, see:

- Our [standalone Gemini Live API documentation](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/live-api).
- Our [Gemini Live API supported audio formats](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/live-api#supported-audio-formats).
- Our [Gemini Live API concurrent session limits](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/live-api/start-manage-session#max-concurrent-sessions).

## Live 2.5 Flash Native Audio

[Try in Agent Studio](https://console.cloud.google.com/agent-platform/studio/multimodal-live?model=gemini-live-2.5-flash-native-audio)

Note: "Deploy example app" requires a Google Cloud project with billing and Agent Platform API enabled.

| Model ID | `gemini-live-2.5-flash-native-audio` ||
| Modalities | Text Input and output Image Input only Audio Input and output Video Input only ||
| Token limits | Context window | 128K |
| Token limits | Maximum output tokens | 64K |
| Maximum concurrent sessions | [1000](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/live-api/start-manage-session#maximum_concurrent_sessions) ||
| Capabilities | - Supported - [Grounding with Google Search](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/grounding/grounding-with-google-search) - [System instructions](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/prompts/system-instruction-introduction) - [Function calling](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/tools/function-calling) - [Gemini Live API](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/live-api) - Not supported - [Code execution](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/tools/code-execution) - [Supervised fine-tuning](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini-supervised-tuning) - [Continuous tuning](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini-use-continuous-tuning) - [Preference tuning](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini-preference-tuning) - [Tuning checkpoints](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/tuning-checkpoints) - [Structured output](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/control-generated-output) - [Thinking](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/thinking) - [Implicit context caching](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/context-cache/context-cache-overview) - [Explicit context caching](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/context-cache/context-cache-overview) - [Chat completions](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/migrate/openai/overview) - [Content Credentials (C2PA)](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/content-credentials) ||
| Consumption options | - [Provisioned Throughput](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/provisioned-throughput) Supported - [Batch inference](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/batch-inference) Not supported - [Pay-as-you-go](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/deploy/consumption-options) Standard PayGo Supported - [Fixed quota](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/quotas) Not supported ||
| Consumption options |
|---|---|---|
| See [Consumption options](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/deploy/consumption-options) for more information. ||
| **Video** | - Standard resolution: 768 x 768 - Supported MIME types: `video/x-flv`, `video/quicktime`, `video/mpeg`, `video/mpegs`, `video/mpg`, `video/mp4`, `video/webm`, `video/wmv`, `video/3gpp` |
| **Audio** | - Maximum conversation length: Default 10 minutes that can [be extended.](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/live-api/start-manage-session#session-extension) - Required audio input format: Raw 16-bit PCM audio at 16kHz, little-endian - Required audio output format: Raw 16-bit PCM audio at 24kHz, little-endian - Supported MIME types: `audio/x-aac`, `audio/flac`, `audio/mp3`, `audio/m4a`, `audio/mpeg`, `audio/mpga`, `audio/mp4`, `audio/ogg`, `audio/pcm`, `audio/wav`, `audio/webm` |
| **Parameter defaults** | - Start of speech sensitivity: Low - End of speech sensitivity: High - Prefix padding: 0 - Max context size: 128K |
| See [Deployments and endpoints](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/locations) for more information. ||
| See [Security controls](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/security-controls) for more information. ||

## Live 2.5 Flash Native Audio Preview

> [!CAUTION]
> **Caution:** `gemini-live-2.5-flash-preview-native-audio-09-2025` will be deprecated and removed on March 19, 2026. Migrate any workflows to `gemini-live-2.5-flash-native-audio`.

> [!WARNING]
>
> **Preview**
>
>
> This feature is
>
> subject to the "Pre-GA Offerings Terms" in the General Service Terms section of the
> [Service Specific
> Terms](https://docs.cloud.google.com/terms/service-terms#1).
>
> Pre-GA features are available "as is" and might have limited support.
>
> For more information, see the
> [launch stage descriptions](https://cloud.google.com/products/#product-launch-stages).

[Try in Agent Studio](https://console.cloud.google.com/agent-platform/studio/multimodal-live?model=gemini-live-2.5-flash-preview-native-audio-09-2025)

Note: "Deploy example app" requires a Google Cloud project with billing and Agent Platform API enabled.

| Model ID | `gemini-live-2.5-flash-preview-native-audio-09-2025` ||
| Modalities | Text Input and output Image Input only Audio Input and output Video Input only ||
| Token limits | Context window | 128K |
| Token limits | Maximum output tokens | 64K |
| Token limits | Context window | 32K (default), upgradable to 128K |
| Maximum concurrent sessions | [1000](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/live-api/start-manage-session#maximum_concurrent_sessions) ||
| Capabilities | - Supported - [Grounding with Google Search](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/grounding/grounding-with-google-search) - [System instructions](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/prompts/system-instruction-introduction) - [Function calling](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/tools/function-calling) - [Gemini Live API](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/live-api) - Not supported - [Code execution](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/tools/code-execution) - [Supervised fine-tuning](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini-supervised-tuning) - [Continuous tuning](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini-use-continuous-tuning) - [Preference tuning](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini-preference-tuning) - [Tuning checkpoints](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/tuning-checkpoints) - [Structured output](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/control-generated-output) - [Thinking](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/thinking) - [Implicit context caching](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/context-cache/context-cache-overview) - [Explicit context caching](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/context-cache/context-cache-overview) - [Chat completions](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/migrate/openai/overview) - [Content Credentials (C2PA)](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/content-credentials) ||
| Consumption options | - [Provisioned Throughput](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/provisioned-throughput) Supported - [Batch inference](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/batch-inference) Not supported - [Pay-as-you-go](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/deploy/consumption-options) Standard PayGo Supported - [Fixed quota](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/quotas) Not supported ||
| Consumption options |
|---|---|---|
| See [Consumption options](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/deploy/consumption-options) for more information. ||
| **Video** | - Standard resolution: 768 x 768 - Supported MIME types: `video/x-flv`, `video/quicktime`, `video/mpeg`, `video/mpegs`, `video/mpg`, `video/mp4`, `video/webm`, `video/wmv`, `video/3gpp` |
| **Audio** | - Maximum conversation length: Default 10 minutes that can [be extended.](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/live-api/start-manage-session#session-extension) - Required audio input format: Raw 16-bit PCM audio at 16kHz, little-endian - Required audio output format: Raw 16-bit PCM audio at 24kHz, little-endian - Supported MIME types: `audio/x-aac`, `audio/flac`, `audio/mp3`, `audio/m4a`, `audio/mpeg`, `audio/mpga`, `audio/mp4`, `audio/ogg`, `audio/pcm`, `audio/wav`, `audio/webm` |
| **Parameter defaults** | - Start of speech sensitivity: Low - End of speech sensitivity: High - Prefix padding: 0 - Max context size: 128K |
| See [Deployments and endpoints](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/locations) for more information. ||
