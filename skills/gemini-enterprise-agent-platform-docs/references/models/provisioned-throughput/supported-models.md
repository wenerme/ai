The following tables show the models that support
Provisioned Throughput, the throughput for each
[generative AI scale unit (GSU) and the burndown
rates](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/provisioned-throughput/measure-provisioned-throughput#gsu-burndown-rate) for each
model.

## Google models

> [!CAUTION]
> **Caution:** As of June 1, 2026, `gemini-2.0-flash-001` and `gemini-2.0-flash-lite-001` are discontinued and are no longer available. This includes both model serving and Provisioned Throughput. Use Gemini 3.1 Flash-Lite, Gemma 4, or more recent Gemini releases.

Provisioned Throughput only supports models that you call directly
from your project using the specific model ID and not a model alias. To use
Provisioned Throughput to make API calls to a model, you must use the
specific model version ID (for example, `gemini-2.0-flash-001`) and not a
[model version alias](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/model-registry/model-alias).

While Provisioned Throughput assures capacity for your model
requests, it doesn't include or bypass quotas for other tools that you
might use, such as [Grounding](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/grounding/overview). Depending
on the size of your workload, you might need to request additional quota for
these tools separately.

Moreover, Provisioned Throughput doesn't support
models that are called by other Gemini Enterprise Agent Platform products, such as
Vertex AI Agents and Agent Search. For example, if you make
API calls to Gemini 2.0 Flash while using Agent Search,
your Provisioned Throughput order for Gemini 2.0 Flash
won't guarantee the calls made by Agent Search.

Provisioned Throughput doesn't support
[batch prediction](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/batch-prediction-gemini) calls.

The following table shows the throughput, purchase increment, and burndown rates
for Google models that support Provisioned Throughput. Your
*per-second throughput* is defined as your prompt input and generated output
across all requests per second.

To find out how many tokens your workload requires, refer to the [SDK
tokenizer](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/list-token) or the
[countTokens API](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/get-token-count).

| **Model** | **Per-second throughput per GSU** | **Units** | **Minimum GSU purchase increment** | **Burndown rates** |
|---|---|---|---|---|
| [Gemini 3.1 Flash-Lite Image (Nano Banana 2 Lite)](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-flash-lite-image) Latest supported version: `gemini-3.1-flash-lite-image` | 2015 | Tokens | 1 | 1 input text token = 1 token 1 input image token = 1 token 1 input video token = 1 token 1 output response text token = 6 tokens 1 output reasoning text token = 6 tokens 1 output image token = 120 tokens |
| [Gemini 3 Pro Image](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-pro-image) Latest supported version: `gemini-3-pro-image` | 500 | Tokens | 1 | 1 input text token = 1 token 1 input image token = 1 token 1 output response text token = 6 tokens 1 output reasoning text token = 6 tokens 1 output image token = 60 tokens |
| [Gemini 3.1 Flash Image](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-flash-image) Latest supported version: `gemini-3.1-flash-image` | 2015 | Tokens | 1 | 1 input text token = 1 token 1 input image token = 1 token 1 input video token = 1 token 1 output response text token = 6 tokens 1 output reasoning text token = 6 tokens 1 output image token = 120 tokens |
| [Gemini 3.5 Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-5-flash) Latest supported version: `gemini-3.5-flash` | 675 | Tokens | 1 | 1 input text token = 1 token 1 input image token = 1 token 1 input video token = 1 token 1 input audio token = 1 token 1 input text caching token = 0.1 tokens 1 input image caching token = 0.1 tokens 1 input video caching token = 0.1 tokens 1 input audio caching token = 0.1 tokens 1 output text token = 6 tokens |
| [Gemini 3.1 Flash-Lite](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-flash-lite) Latest supported version: `gemini-3.1-flash-lite` | 4030 | Tokens | 1 | 1 input text token = 1 token 1 input image token = 1 token 1 input video token = 1 token 1 input audio token = 2 tokens 1 input text caching token = 0.1 tokens 1 input image caching token = 0.1 tokens 1 input video caching token = 0.1 tokens 1 input audio caching token = 0.2 tokens 1 output response text token = 6 tokens 1 output reasoning text token = 6 tokens |
| [Gemini 3.1 Flash Image](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-flash-image) Latest supported version: `gemini-3.1-flash-image-preview` ([preview](https://cloud.google.com/products#product-launch-stages)) | 2015 | Tokens | 1 | 1 input text token = 1 token 1 input image token = 1 token 1 output text token = 6 tokens 1 output image token = 120 tokens |
| [Gemini 3.1 Pro](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-pro) Latest supported version: `gemini-3.1-pro-preview` ([preview](https://cloud.google.com/products#product-launch-stages)) | 500 | Tokens | 1 | **Less than or equal to 200,000 input tokens:** 1 input text token = 1 token 1 input image token = 1 token 1 input video token = 1 token 1 input audio token = 1 token 1 input cache token = 0.1 tokens 1 output response text token = 6 tokens 1 output reasoning text token = 6 tokens  **Greater than 200,000 input tokens:** 1 input text token = 2 tokens 1 input image token = 2 tokens 1 input video token = 2 tokens 1 input audio token = 2 tokens 1 input cache token = 0.2 tokens 1 output response text token = 9 tokens 1 output reasoning text token = 9 tokens |
| [Gemini 3 Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-flash) Latest supported version: `gemini-3-flash-preview` ([preview](https://cloud.google.com/products#product-launch-stages)) | 2015 | Tokens | 1 | 1 input text token = 1 token 1 input image token = 1 token 1 input video token = 1 token 1 input audio token = 2 tokens 1 input text, image, video caching token = 0.1 tokens 1 input audio caching token = 0.2 tokens 1 output response text token = 6 tokens 1 output reasoning text token = 6 tokens |
| [Gemini 3 Pro Image](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-pro-image-preview) Latest supported version: `gemini-3-pro-image-preview` ([preview](https://cloud.google.com/products#product-launch-stages)) | 500 | Tokens | 1 | 1 input text token = 1 token 1 input image token = 1 token 1 output text token = 6 tokens 1 output thinking token = 6 tokens 1 output image token = 60 tokens |
| [Gemini 2.5 Pro](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-pro) Latest supported version: `gemini-2.5-pro` | 650 | Tokens | 1 | **Less than or equal to 200,000 input tokens:** 1 input text token = 1 token 1 input image token = 1 token 1 input video token = 1 token 1 input audio token = 1 token 1 output response text token = 8 tokens 1 output reasoning text token = 8 tokens  **Greater than 200,000 input tokens:** 1 input text token = 2 tokens 1 input image token = 2 tokens 1 input video token = 2 tokens 1 input audio token = 2 tokens 1 output response text token = 12 tokens 1 output reasoning text token = 12 tokens |
| [Gemini 2.5 Flash Image](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash-image) Latest supported version: `gemini-2.5-flash-image` | 2,690 | Tokens | 1 | 1 input text token = 1 token 1 input image token = 1 token 1 output text token = 9 tokens 1 output image token = 100 tokens |
| [Gemini 2.5 Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash) Latest supported version: `gemini-2.5-flash` | 2690 | Tokens | 1 | 1 input text token = 1 token 1 input image token = 1 token 1 input video token = 1 token 1 input audio token = 4 tokens 1 output response text token = 9 tokens 1 output reasoning text token = 9 tokens |
| [Gemini 2.5 Flash-Lite](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash-lite) Latest supported version ([GA](https://cloud.google.com/products#product-launch-stages)): `gemini-2.5-flash-lite` Latest supported version ([preview](https://cloud.google.com/products#product-launch-stages)): `gemini-2.5-flash-lite-preview-09-2025` | 8,070 | Tokens | 1 | 1 input text token = 1 token 1 input image token = 1 token 1 input video token = 1 token 1 input audio token = 3 tokens 1 output response text token = 4 tokens 1 output reasoning text token = 4 tokens |
| [Gemini 2.5 Flash with Gemini Live API native audio](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash-live-api) Latest supported version: `gemini-live-2.5-flash-native-audio` | 1,620 | Tokens | 1 | 1 input text token = 1 token 1 input audio token = 6 tokens 1 input video token = 6 tokens 1 input image token = 6 tokens 1 input session memory token = 1 token 1 output text token = 4 tokens 1 output audio token = 24 tokens |
| [Veo 3.1 Lite Generate](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-1-generate#3.1-lite-generate-001-preview) Latest supported version: `veo-3.1-lite-generate-001` | 0.0350 | Video seconds (720p) | 1 | 1 (720p) output video second = 1 output video second |
| [Veo 3.1 Lite Generate](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-1-generate#3.1-lite-generate-001-preview) Latest supported version: `veo-3.1-lite-generate-001` | 0.0350 | Video+audio seconds (720p) | 1 | 1 (720p) output video+audio second = 1.75 output video seconds |
| [Veo 3.1 Lite Generate](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-1-generate#3.1-lite-generate-001-preview) Latest supported version: `veo-3.1-lite-generate-001` | 0.0350 | Video seconds (1080p) | 1 | 1 (1080p) output video second = 1.75 (720p) output video second |
| [Veo 3.1 Lite Generate](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-1-generate#3.1-lite-generate-001-preview) Latest supported version: `veo-3.1-lite-generate-001` | 0.0350 | Video+audio seconds (1080p) | 1 | 1 (1080p) output video+audio second = 2.33 (720p) output video seconds |
| [Veo 3.1](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-1-generate#3.1-generate-001) Latest supported version: `veo-3.1-generate-001` | 0.0040 | Video seconds | 1 | 1 output video second = 1 output video second |
| [Veo 3.1](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-1-generate#3.1-generate-001) Latest supported version: `veo-3.1-generate-001` | 0.0040 | Video+audio seconds | 1 | 1 output video+audio second = 2 output video seconds |
| [Veo 3.1 Fast](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-1-generate#3.1-fast-generate-001) Latest supported version: `veo-3.1-fast-generate-001` | 0.01 | Video seconds (720p) | 1 | 1 (720p) output video sec = 1 output video second |
| [Veo 3.1 Fast](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-1-generate#3.1-fast-generate-001) Latest supported version: `veo-3.1-fast-generate-001` | 0.01 | Video + Audio seconds (720p) | 1 | 1 (720p) output video + audio second = 1.30 output video seconds |
| [Veo 3.1 Fast](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-1-generate#3.1-fast-generate-001) Latest supported version: `veo-3.1-fast-generate-001` | 0.01 | Video seconds (1080p) | 1 | 1 (1080p) output video second = 1.30 (720p) output video seconds |
| [Veo 3.1 Fast](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-1-generate#3.1-fast-generate-001) Latest supported version: `veo-3.1-fast-generate-001` | 0.01 | Video + Audio seconds (1080p) | 1 | 1 (1080p) output video + audio second = 1.60 (720p) output video seconds |
| [Veo 3.1 Fast](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-1-generate#3.1-fast-generate-001) Latest supported version: `veo-3.1-fast-generate-001` | 0.01 | Video seconds (4k) | 1 | 1 (4k) output video second = 3.40 (720p) output video seconds |
| [Veo 3.1 Fast](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-1-generate#3.1-fast-generate-001) Latest supported version: `veo-3.1-fast-generate-001` | 0.01 | Video + Audio seconds (4k) | 1 | 1 (4k) output video + audio second = 4 (720p) output video seconds |
| [Veo 3](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-0-generate-001) Latest supported version: `veo-3.0-generate-001` | 0.0040 | Video seconds | 1 | 1 output video second = 1 output video second |
| [Veo 3](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-0-generate-001) Latest supported version: `veo-3.0-generate-001` | 0.0040 | Video+audio seconds | 1 | 1 output video+audio second = 2 output video seconds |
| [Veo 3 Fast](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-0-fast-generate-001) Latest supported version: `veo-3.0-fast-generate-001` | 0.01 | Video seconds (720p) | 1 | 1 (720p) output video sec = 1 output video second |
| [Veo 3 Fast](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-0-fast-generate-001) Latest supported version: `veo-3.0-fast-generate-001` | 0.01 | Video + Audio seconds (720p) | 1 | 1 (720p) output video + audio second = 1.30 output video seconds |
| [Veo 3 Fast](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-0-fast-generate-001) Latest supported version: `veo-3.0-fast-generate-001` | 0.01 | Video seconds (1080p) | 1 | 1 (1080p) output video second = 1.30 (720p) output video seconds |
| [Veo 3 Fast](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-0-fast-generate-001) Latest supported version: `veo-3.0-fast-generate-001` | 0.01 | Video + Audio seconds (1080p) | 1 | 1 (1080p) output video + audio second = 1.60 (720p) output video seconds |

For information about a model's capabilities and input or output limits,
see the documentation for the model.
**Request access:** The model `gemini-live-2.5-flash` is in private GA. For information about access to this release, see the [access request page](https://docs.google.com/forms/d/e/1FAIpQLScxBeD4UJ8GbUfX4SXjj5a1XJ1K7Urwvb0iSGdGccNcFRBrpQ/viewform).

You can upgrade to new models as they are made available. For information about
model availability and discontinuation dates, see [Google
models](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/provisioned-throughput/measure-provisioned-throughput/gemini-enterprise-agent-platform/models/provisioned-throughput/measure-provisioned-throughputlearn/models#stable-versions-available).

For more information about supported locations, see
[Available locations](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/locations#available-regions).

## Partner models

The following table shows the throughput, purchase increment, and burndown rates
for [partner models](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/partner-models/use-partner-models) that
support Provisioned Throughput. [Claude models](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/provisioned-throughput/supported-models#partner-models) are
measured in tokens per second, which is defined as a total of input and output
tokens across all requests per second.

| **Model** | **Throughput per GSU (tokens/sec)** | **Minimum GSU purchase** | **GSU purchase increment** | **Burndown rates** |
|---|---|---|---|---|
| Anthropic's Claude Sonnet 5 | 350 | 25 | 1 | 1 input token = 1 token 1 output token = 5 tokens 1 cache write 5m token = 1.25 tokens 1 cache write 1h token = 2 tokens 1 cache hit token = 0.1 token |
| Anthropic's Claude Fable 5 | 105 | 1 | 1 | 1 input token = 1 token 1 output token = 5 tokens 1 cache write 5m token = 1.25 tokens 1 cache write 1h token = 2 tokens 1 cache hit token = 0.1 token |
| Anthropic's Claude Opus 4.8 | 210 | 35 | 1 | 1 input token = 1 token 1 output token = 5 tokens 1 cache write 5m token = 1.25 tokens 1 cache write 1h token = 2 tokens 1 cache hit token = 0.1 token |
| Anthropic's Claude Opus 4.7 | 210 | 35 | 1 | 1 input token = 1 token 1 output token = 5 tokens 1 cache write 5m token = 1.25 tokens 1 cache write 1h token = 2 tokens 1 cache hit token = 0.1 token |
| Anthropic's Claude Sonnet 4.6 | 350 | 25 | 1 | 1 input token = 1 token 1 output token = 5 tokens 1 cache write 5m token = 1.25 tokens 1 cache write 1h token = 2 tokens 1 cache hit token = 0.1 token |
| Anthropic's Claude Opus 4.6 | 210 | 35 | 1 | 1 input token = 1 token 1 output token = 5 tokens 1 cache write 5m token = 1.25 tokens 1 cache write 1h token = 2 tokens 1 cache hit token = 0.1 token |
| Anthropic's Claude Opus 4.5 | 210 | 35 | 1 | 1 input token = 1 token 1 output token = 5 tokens 1 cache write 5m token = 1.25 tokens 1 cache write 1h token = 2 tokens 1 cache hit token = 0.1 token |
| Anthropic's Claude Sonnet 4.5 | 350 | 25 | 1 | **Less than 200,000 input tokens:** 1 input token = 1 token 1 output token = 5 tokens 1 cache write 5m token = 1.25 tokens 1 cache write 1h token = 2 tokens 1 cache hit token = 0.1 token **Greater than or equal to 200,000 input tokens:** 1 input token = 2 token 1 output token = 7.5 tokens 1 cache write 5m token = 2.5 tokens 1 cache write 1h token = 4 tokens 1 cache hit token = 0.2 token |
| Anthropic's Claude Opus 4.1 | 70 | 35 | 1 | 1 input token = 1 token 1 output token = 5 tokens 1 cache write 5m token = 1.25 tokens 1 cache write 1h token = 2 tokens 1 cache hit token = 0.1 token |
| Anthropic's Claude Haiku 4.5 | 1,050 | 8 | 1 | **Less than 200,000 input tokens:** 1 input token = 1 token 1 output token = 5 tokens 1 cache write 5m token = 1.25 tokens 1 cache write 1h token = 2 tokens 1 cache hit token = 0.1 token |
| Anthropic's Claude Opus 4 | 70 | 35 | 1 | 1 input token = 1 token 1 output token = 5 tokens 1 cache write 5m token = 1.25 tokens 1 cache write 1h token = 2 tokens 1 cache hit token = 0.1 token |
| Anthropic's Claude Sonnet 4 | 350 | 25 | 1 | **Less than 200,000 input tokens:** 1 input token = 1 token 1 output token = 5 tokens 1 cache write 5m token = 1.25 tokens 1 cache write 1h token = 2 tokens 1 cache hit token = 0.1 token **Greater than or equal to 200,000 input tokens:** 1 input token = 2 token 1 output token = 7.5 tokens 1 cache write 5m token = 2.5 tokens 1 cache write 1h token = 4 tokens 1 cache hit token = 0.2 token |
| Anthropic's Claude 3.7 Sonnet (deprecated) | 350 | 25 | 1 | 1 input token = 1 token 1 output token = 5 tokens 1 cache write 5m token = 1.25 tokens 1 cache hit token = 0.1 token |
| Anthropic's Claude 3.5 Sonnet v2 (deprecated) | 350 | 25 | 1 | 1 input token = 1 token 1 output token = 5 tokens 1 cache write 5m token = 1.25 tokens 1 cache hit token = 0.1 token |
| Anthropic's Claude 3.5 Haiku (deprecated) | 2,000 | 10 | 1 | 1 input token = 1 token 1 output token = 5 tokens 1 cache write 5m token = 1.25 tokens 1 cache write 1h token = 2 tokens 1 cache hit token = 0.1 token |
| Anthropic's Claude 3 Opus | 70 | 35 | 1 | 1 input token = 1 token 1 output token = 5 tokens 1 cache write 5m token = 1.25 tokens 1 cache hit token = 0.1 token |
| Anthropic's Claude 3 Haiku (deprecated) | 4,200 | 5 | 1 | 1 input token = 1 token 1 output token = 5 tokens 1 cache write 5m token = 1.25 tokens 1 cache write 1h token = 2 tokens 1 cache hit token = 0.1 token |
| Anthropic's Claude 3.5 Sonnet (deprecated) | 350 | 25 | 1 | 1 input token = 1 token 1 output token = 5 tokens 1 cache write 5m token = 1.25 tokens 1 cache hit token = 0.1 token |

For information about supported locations, see
[Anthropic Claude region availability](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/locations#genai-partner-models).
To order Provisioned Throughput for Anthropic models, contact your
[Google Cloud account representative](https://cloud.google.com/contact).

## Open models

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

The following table shows the throughput, purchase increment, and burndown rates
for [open models](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/maas/use-open-models) that
support Provisioned Throughput.

| **Model** | **Throughput per GSU (tokens/sec)** | **Minimum GSU purchase** | **GSU purchase increment** | **Burndown rates** |
|---|---|---|---|---|
| [DeepSeek-OCR](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/maas/deepseek/deepseek-ocr) Latest supported version: `deepseek-ocr-maas` | 3,360 | 1 | 1 | 1 input text token = 1 token 1 input image token = 1 token 1 output text token = 4 tokens |
| [DeepSeek-V3.2](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/maas/deepseek/deepseek-v32) [DeepSeek-V3.2](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/maas/deepseek/deepseek-v32) Latest supported version: `deepseek-v3.2-maas` | 1,680 | 1 | 1 | 1 input text token = 1 token 1 output text token = 4 tokens |
| [Gemma 4 26B A4B IT](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/maas/google/gemma-4-26b-a4b-it) Latest supported version: `gemma-4-26b-a4b-it-maas` Provisioned Throughput support for this model is billed under the same SKUs as Google models, but is subject to open model [capabilities](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/provisioned-throughput/supported-models#capabilities). | 6,725 | 1 | 1 | 1 input text token = 1 token 1 input image token = 1 token 1 output text token = 4 tokens |
| [Kimi K2 Thinking](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/maas/kimi/kimi-k2-thinking) Latest supported version: `kimi-k2-thinking-maas` | 1,680 | 1 | 1 | 1 input text token = 1 token 1 output text token = 4 tokens |
| [Llama 3.3 70B](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/partner-models/llama/llama3-3) Latest supported version: `llama-3.3-70b-instruct-maas` | 1,400 | 1 | 1 | 1 input text token = 1 token 1 output text token = 1 token |
| [Llama 4 Maverick 17B-128E](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/partner-models/llama/llama4-maverick) Latest supported version: `llama-4-maverick-17b-128e-instruct-maas` | 2,800 | 1 | 1 | 1 input text token = 1 token 1 input image token = 1 token 1 output text token = 4 tokens |
| [Llama 4 Scout 17B-16E](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/partner-models/llama/llama4-scout) Latest supported version: `llama-4-scout-17b-16e-instruct-maas` | 4,035 | 1 | 1 | 1 input text token = 1 token 1 input image token = 1 token 1 output text token = 3 tokens |
| [MiniMax M2](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/maas/minimax/minimax-m2) Latest supported version: `minimax-m2-maas` | 3,360 | 1 | 1 | 1 input text token = 1 token 1 output text token = 4 tokens |
| [OpenAI gpt-oss 120B](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/maas/openai/gpt-oss-120b) Latest supported version: `gpt-oss-120b-maas` | 11,205 | 1 | 1 | 1 input text token = 1 token 1 output text token = 4 tokens |
| [OpenAI gpt-oss 20B](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/maas/openai/gpt-oss-20b) Latest supported version: `gpt-oss-20b-maas` | 14,405 | 1 | 1 | 1 input text token = 1 token 1 output text token = 4 tokens |
| [Qwen3 235B](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/maas/qwen/qwen3-235b) Latest supported version: `qwen3-235b-a22b-instruct-2507-maas` | 4,035 | 1 | 1 | 1 input text token = 1 token 1 output text token = 4 tokens |
| [Qwen3 Coder](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/maas/qwen/qwen3-coder) Latest supported version: `qwen3-coder-480b-a35b-instruct-maas` | 1,010 | 1 | 1 | 1 input text token = 1 token 1 output text token = 4 tokens |
| [Qwen3-Next-80B Instruct](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/maas/qwen/qwen3-next-instruct) Latest supported version: `qwen3-next-80b-a3b-instruct-maas` | 6,725 | 1 | 1 | 1 input text token = 1 token 1 output text token = 8 tokens |
| [Qwen3-Next-80B Thinking](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/maas/qwen/qwen3-next-thinking) Latest supported version: `qwen3-next-80b-a3b-thinking-maas` | 6,725 | 1 | 1 | 1 input text token = 1 token 1 output text token = 8 tokens |
| [GLM 4.7](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/maas/zaiorg/glm-47) Latest supported version: `glm-4.7-maas` | 1,685 | 1 | 1 | 1 input text token = 1 token 1 output text token = 4 tokens |
| [GLM 5](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/maas/zaiorg/glm-5) Latest supported version: `glm-5-maas` | 1,010 | 1 | 1 | 1 input text token = 1 token 1 output text token = 3 tokens |

## Available capabilities for Google and open models

The following table lists the capabilities
that are available with Provisioned Throughput for Google models and open models:

| Capability | Google models | Open models (preview) |
|---|---|---|
| Order through Google Cloud console | Yes | Yes |
| Supports global endpoints | See [Global endpoint model support](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/provisioned-throughput/supported-models#global-endpoint). | See [Global endpoint model support](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/provisioned-throughput/supported-models#global-endpoint). |
| Supports [supervised fine-tuned models](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/provisioned-throughput/supported-models#supervised-fine-tuned-model-support) | Yes | No |
| Supports [API key usage](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/provisioned-throughput/use-provisioned-throughput#api-key) | Yes | No |
| Integrated with [implicit context caching](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/provisioned-throughput/measure-provisioned-throughput#context_caching) | Yes | Not applicable |
| Integrated with explicit context caching | Yes | Not applicable |
| ML processing | Available in specific regions. For details, see [Single Zone Provisioned Throughput](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/provisioned-throughput/szpt). | Not applicable |
| Available order terms | 1 week, 1 month, 3 month, and 1 year | 1 week, 1 month, 3 month, and 1 year |
| [Change order](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/provisioned-throughput/purchase-provisioned-throughput#change-order) from the console | Yes | No |
| [Order statuses](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/provisioned-throughput/purchase-provisioned-throughput#check-order-status): pending review, approved, active, expired | Yes | Yes |
| Overages [spillover](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/provisioned-throughput/use-provisioned-throughput#default) to pay-as-you-go by default | Yes | Yes |
| [API header control](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/provisioned-throughput/use-provisioned-throughput#use-rest-api): use "dedicated" to only use provisioned throughput or "shared" to only use pay-as-you-go | Yes | Yes |
| [Monitoring](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/provisioned-throughput/use-provisioned-throughput#monitor_provisioned_throughput): [metrics](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/provisioned-throughput/use-provisioned-throughput#metrics), [dashboards](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/provisioned-throughput/use-provisioned-throughput#dashboards), and [alerting](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/provisioned-throughput/use-provisioned-throughput#alerts) | Yes | Yes |

## Global endpoint model support

Provisioned Throughput supports the
[global endpoint](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/locations#global-endpoint) for Google models and open models.

Traffic that exceeds the Provisioned Throughput quota uses the
global endpoint, by default.

To assign Provisioned Throughput to the global endpoint of a model,
select `global` as the region when you [place a Provisioned Throughput order](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/provisioned-throughput/purchase-provisioned-throughput#place-an-order).

### Google models with global endpoint support

The following table lists the Google models for which Provisioned Throughput supports the global endpoint:

| Model | Latest supported model version |
|---|---|
| [Gemini 3.1 Flash-Lite Image (Nano Banana 2 Lite)](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-flash-lite-image) | `gemini-3.1-flash-lite-image` |
| [Gemini 3 Pro Image](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-pro-image) | `gemini-3-pro-image` |
| [Gemini 3.1 Flash Image](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-flash-image) | `gemini-3.1-flash-image` |
| [Gemini 3.5 Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-5-flash) | `gemini-3.5-flash` |
| [Gemini 3.1 Flash-Lite](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-flash-lite) | `gemini-3.1-flash-lite` |
| [Gemini 3.1 Flash Image](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-flash-image) preview | `gemini-3.1-flash-image-preview` |
| [Gemini 3.1 Pro](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-pro) preview | `gemini-3.1-pro-preview` |
| [Gemini 3 Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-flash) preview | `gemini-3-flash-preview` |
| [Gemini 3 Pro Image](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-pro-image-preview) preview | `gemini-3-pro-image-preview` |
| [Gemini 2.5 Pro](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-pro) | `gemini-2.5-pro` |
| [Gemini 2.5 Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash) preview | `gemini-2.5-flash-preview-09-2025` |
| [Gemini 2.5 Flash-Lite](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash-lite) preview | `gemini-2.5-flash-lite-preview-09-2025` |
| [Gemini 2.5 Flash Image](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash-image) | `gemini-2.5-flash-image` |
| [Gemini 2.5 Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash) | `gemini-2.5-flash` |
| [Gemini 2.5 Flash-Lite](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash-lite) | `gemini-2.5-flash-lite` |

### Open models with global endpoint support

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

The following table lists the open models for which Provisioned Throughput supports the global endpoint:

| **Model** | **Latest supported model version** |
|---|---|
| DeepSeek-OCR | `deepseek-ocr-maas` |
| DeepSeek-V3.2 | `deepseek-v3.2-maas` |
| Kimi K2 Thinking | `kimi-k2-thinking-maas` |
| MiniMax M2 | `minimax-m2-maas` |
| OpenAI gpt-oss 120B | `gpt-oss-120b-maas` |
| Qwen3-Next-80B Instruct | `qwen3-next-80b-a3b-instruct-maas` |
| Qwen3-Next-80B Thinking | `qwen3-next-80b-a3b-thinking-maas` |
| GLM 4.7 | `glm-4.7-maas` |
| GLM 5 | `glm-5-maas` |

## Supervised fine-tuned model support

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

The following is supported for Google [models that support supervised fine-tuning](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/tuning/supervised-tuning/use#expandable-1):

- Provisioned Throughput can be applied to both base models and
  supervised fine-tuned versions of those base models.

- Supervised fine-tuned model endpoints and their corresponding base model count
  towards the same Provisioned Throughput quota.

  For example, Provisioned Throughput purchased for
  `gemini-3.1-flash-lite` for a specific project
  prioritizes requests that are made from supervised fine-tuned versions of
  `gemini-3.1-flash-lite` created within that project. [Use the
  appropriate header](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/provisioned-throughput/use-provisioned-throughput#use-rest-api) to control traffic behavior.

Starting with Gemini 3, burndown rates for fine tuned model
inference are higher compared to base model inference. This premium is
proportional to the fine tuned inference
[premium](https://cloud.google.com/gemini-enterprise-agent-platform/generative-ai/pricing#model-tuning)
for the model. For example, if fine tuned inference charges 50% more than base
model inference, then the burndown rate for fine tuned inference would be 50%
higher. In this case, if the base model inference of 1 input text token was 1
token, then the fine tuned model inference of 1 input text token would be 1.5
tokens.

Prior to Gemini 3, supervised fine-tuned model endpoints and
their corresponding base model count towards the same
Provisioned Throughput quota with the same burndown rates.

## What's next

- [Calculate Provisioned Throughput requirements](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/provisioned-throughput/measure-provisioned-throughput).
