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

Gemini 3.1 Flash Image (Nano Banana 2) is optimized for image understanding and
generation and offers a balance of price and performance.

> [!CAUTION]
> **Caution:** The following table describes image generation endpoints that are deprecated and their replacements. We recommend updating your model endpoints before July 17, 2026, to avoid service disruption.
>
> | Discontinued endpoints | Recommended endpoint migration |
> |---|---|
> | `gemini-3.1-flash-image-preview` | `gemini-3.1-flash-image` |
> | `gemini-3-pro-image-preview` | `gemini-3-pro-image` |
>

### Image generation specifications

Generating images with Gemini 3.1 Flash Image consumes tokens based on
output image resolution: 747 tokens for 512p (0.25MP), 1120 tokens for 1K (1MP),
1680 tokens for 2K (4MP), and 2520 tokens for 4K (16MP).

[Try in Agent Studio](https://console.cloud.google.com/agent-platform/studio/multimodal?model=gemini-3.1-flash-image-preview)

[Deploy example app](https://console.cloud.google.com/agent-platform/studio/multimodal?suggestedPrompt=How+does+AI+work&deploy=true&model=gemini-3.1-flash-image-preview)
Note: "Deploy example app" requires a Google Cloud project with billing and Agent Platform API enabled.

| Model ID | `gemini-3.1-flash-image-preview` ||
| Modalities | Text Input and output Image Input and output Audio Not supported Video Not supported ||
| Token limits | Context window | 131,072 |
| Token limits | Maximum output tokens | 32,768 |
| Capabilities | - Supported - [Grounding with Google Search](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/grounding/grounding-with-google-search) - [System instructions](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/prompts/system-instruction-introduction) - [Count Tokens](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/get-token-count) Preview feature - [Thinking](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/thinking) - [Content Credentials (C2PA)](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/content-credentials) - [Image generation](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/image-generation) Preview feature - [Interleaved images and text](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/image-generation#interleaved-images) Preview feature - [Edit images](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/gemini-edit-images) Preview feature - [Multi-turn image editing](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/gemini-edit-images#multi-turn-editing) Preview feature - Not supported - [Code execution](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/tools/code-execution) - [Supervised fine-tuning](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini-supervised-tuning) - [Continuous tuning](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini-use-continuous-tuning) - [Preference tuning](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini-preference-tuning) - [Tuning checkpoints](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/tuning-checkpoints) - [Function calling](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/tools/function-calling) - [Gemini Live API](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/live-api) - [Implicit context caching](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/context-cache/context-cache-overview) - [Explicit context caching](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/context-cache/context-cache-overview) - [Chat completions](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/migrate/openai/overview) ||
| Consumption options | - [Provisioned Throughput](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/provisioned-throughput) Supported - [Batch inference](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/batch-inference) Supported - [Pay-as-you-go](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/deploy/consumption-options) Standard PayGo, Flex PayGo Supported - [Fixed quota](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/quotas) Not supported ||
| Consumption options |
|---|---|---|
| See [Consumption options](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/deploy/consumption-options) for more information. ||
| **Text** | - Maximum number of files per prompt: As supported by the 128k token context window - Maximum number of pages per file: As supported by the 65,536 token context window - Maximum file size per file for the API or Cloud Storage imports: 50 MB(application/pdf) or 7 MB(text/plain) - Maximum file size per file for direct uploads through the console: 7 MB - Supported MIME types: `application/pdf`, `text/plain` |
| **Parameter defaults** | - Temperature: 0.0-2.0 (default 1.0) - topP: 0.0-1.0 (default 0.95) - topK: - - candidateCount: 1 |
| See [Deployments and endpoints](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/locations) for more information. ||
