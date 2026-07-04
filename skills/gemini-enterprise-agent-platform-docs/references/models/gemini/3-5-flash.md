Gemini 3.5 Flash delivers near-Pro intelligence at Flash-tier cost and speed: Pro-level coding proficiency, parallel agentic execution, all at the same price point as a Flash model.

To get started, view the [introductory notebook for Gemini 3.5 Flash](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/getting-started/intro_gemini_3_5_flash.ipynb).

For more information on using the latest Gemini models, see
[Get started with Gemini 3](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/start/get-started-with-gemini-3).

[Try in Agent Studio](https://console.cloud.google.com/vertex-ai/generative/multimodal/create/text?model=gemini-3.5-flash)

[Deploy example app](https://console.cloud.google.com/vertex-ai/studio/multimodal?suggestedPrompt=How+does+AI+work&deploy=true&model=gemini-3.5-flash)
Note: "Deploy example app" requires a Google Cloud project with billing and Agent Platform API enabled.

| Model ID | `gemini-3.5-flash` ||
| Modalities | Text Input and output Image Input only Audio Input only Video Input only ||
| Token limits | Context window | 1,048,576 |
| Token limits | Maximum output tokens | 65,535 (default) |
| Capabilities | - Supported - [Grounding with Google Search](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/grounding/grounding-with-google-search) - [Code execution](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/tools/code-execution) - [Supervised fine-tuning](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini-supervised-tuning) - [Continuous tuning](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini-use-continuous-tuning) - [Tuning checkpoints](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/tuning-checkpoints) - [System instructions](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/prompts/system-instruction-introduction) - [Function calling](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/tools/function-calling) - [Count Tokens](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/get-token-count) - [Structured output](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/control-generated-output) - [Thinking](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/thinking) - [Implicit context caching](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/context-cache/context-cache-overview) - [Explicit context caching](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/context-cache/context-cache-overview) - [Chat completions](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/migrate/openai/overview) - [Computer Use](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/computer-use) Preview feature - Not supported - [Preference tuning](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini-preference-tuning) - [Gemini Live API](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/live-api) - [Content Credentials (C2PA)](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/content-credentials) ||
| Consumption options | - [Provisioned Throughput](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/provisioned-throughput) Supported - [Batch inference](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/batch-inference) Supported - [Pay-as-you-go](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/deploy/consumption-options) Flex PayGo, Priority PayGo Supported - [Fixed quota](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/quotas) Not supported ||
| Consumption options |
|---|---|---|
| See [Consumption options](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/deploy/consumption-options) for more information. ||
| **Text** | - Maximum number of files per prompt: 3,000 - Maximum number of pages per file: 3,000 - Maximum file size per file for the API or Cloud Storage imports: 50 MB(application/pdf) or 7 MB(text/plain) - Maximum file size per file for direct uploads through the console: 7 MB - Supported MIME types: `application/pdf`, `text/plain` |
| **Video** | - Maximum video length (with audio): Approximately 45 minutes - Maximum video length (without audio): Approximately 1 hour - Maximum number of videos per prompt: 10 - Supported MIME types: `video/x-flv`, `video/quicktime`, `video/mpeg`, `video/mpegs`, `video/mpg`, `video/mp4`, `video/webm`, `video/wmv`, `video/3gpp` |
| **Audio** | - Maximum audio length per prompt: Approximately 8.4 hours, or up to 1 million tokens - Maximum number of audio files per prompt: 1 - Supported MIME types: `audio/x-aac`, `audio/flac`, `audio/mp3`, `audio/m4a`, `audio/mpeg`, `audio/mpga`, `audio/mp4`, `audio/ogg`, `audio/pcm`, `audio/wav`, `audio/webm` |
| **Parameter defaults** | - Temperature: 0.0-2.0 (default 1.0) - topP: 0.0-1.0 (default 0.95) - topK: 64 (fixed) - candidateCount: 1--8 (default 1) |
| ML processing | - Multi-region (See [connection guide](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/locations#specify-an-endpoint)) - us - eu - Europe - europe-west2 - Asia Pacific - asia-northeast1 - asia-south1 - asia-southeast1 |
| Provisioned throughput | - Global - global - Multi-region (See [connection guide](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/locations#specify-an-endpoint)) - us - eu - Europe - europe-west2 - Asia Pacific - asia-northeast1 - asia-south1 - asia-southeast1 |
| Standard pay-as-you-go | - Global - global - Multi-region (See [connection guide](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/locations#specify-an-endpoint)) - us - eu |
| See [Deployments and endpoints](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/locations) for more information. ||
| **Batch inference** | - Data residency - CMEK - VPC-SC - AXT |
| **Tuning** | - Data residency - CMEK - VPC-SC - AXT |
| **Context caching** | - Data residency - CMEK - VPC-SC - AXT |
| See [Security controls](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/security-controls) for more information. ||

> [!NOTE]
> **Note:** In `asia-northeast1`, `asia-south1`, `asia-southeast1`, and `europe-west2`, only Single Zone Provisioned Throughput is supported.
