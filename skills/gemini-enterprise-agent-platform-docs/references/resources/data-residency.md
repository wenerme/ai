Data stored at rest in the customer selected location remains at rest in that
[location](https://cloud.google.com/about/locations), independent of the
Agent Platform endpoint called by that customer's request.

## ML processing

Machine learning (ML) processing for Agent Platform services
occurs within the specific [region or multi-region](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/locations)
where the request is made. For instructions on how to connect to endpoints, see
[Specify an endpoint](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/locations#specify-an-endpoint).

For any regional endpoint not explicitly listed in the following tables, such as
those in the Middle East, there is no guarantee that ML processing occurs at a
specific location. These endpoints support older models that don't offer ML
processing guarantees.

### Google Cloud model support

To learn what capabilities support data residency, see
[Supported capabilities](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/supported-capabilities).

| Model | US multi-region | EU multi-region | Brazil (southamerica-east1) | Canada (northamerica-northeast1) | France (europe-west9) | Germany (europe-west3) | Netherlands (europe-west4) | United Kingdom (europe-west2) | Australia (australia-southeast1) | India (asia-south1) | Japan (asia-northeast1) | Singapore (asia-southeast1) | South Korea (asia-northeast3) |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Gemini 3.5 Flash (`gemini-3.5-flash`) | Yes | Yes |   |   |   |   |   | Yes |   | Yes | Yes | Yes |   |
| Gemini 3.1 Flash-Lite (`gemini-3.1-flash-lite`) | Yes | Yes |   |   |   |   |   |   |   |   |   |   |   |
| Gemini 2.5 Flash Live API Native Audio (`gemini-live-2.5-flash-native-audio`) | Yes | Yes |   |   |   |   |   |   |   |   |   |   |   |
| Gemini 2.5 Flash, 128k (`gemini-2.5-flash`) | Yes | Yes | Yes | Yes | Yes | Yes |   | Yes | Yes | Yes | Yes | Yes | Yes |
| Gemini 2.5 Flash, 1M (`gemini-2.5-flash`) | Yes | Yes |   | Yes |   |   |   |   |   |   |   | Yes |   |
| Gemini 2.5 Flash Image (`gemini-2.5-flash-image`) | Yes | Yes |   |   |   |   |   |   |   |   |   |   |   |
| Gemini 2.5 Flash-Lite (`gemini-2.5-flash-lite`) | Yes | Yes |   |   |   |   |   |   |   |   |   |   |   |
| Gemini 2.5 Pro, 1M (`gemini-2.5-pro`) | Yes | Yes |   | Yes |   |   |   |   |   |   |   |   |   |
| Gemini 2.5 Pro, 64k (`gemini-2.5-pro`) | Yes | Yes |   | Yes |   |   |   |   |   |   | Yes |   |   |
| Tuning for Gemini 2.5 Flash (`gemini-2.5-flash`) | Yes | Yes |   |   |   |   |   |   |   |   |   |   |   |
| Tuning for Gemini 2.5 Flash-Lite (`gemini-2.5-flash-lite`) | Yes | Yes |   |   |   |   |   |   |   |   |   |   |   |
| Tuning for Gemini 2.5 Pro (`gemini-2.5-pro`) | Yes | Yes |   |   |   |   |   |   |   |   |   |   |   |
| Gemini Embedding (`gemini-embedding-001`) | Yes | Yes |   |   |   |   |   |   |   |   |   |   |   |
| Gemini Embedding 2 (`gemini-embedding-2`) | Yes | Yes |   |   |   |   |   |   |   |   |   |   |   |
| Chirp 2: Transcription (`chirp_2`) |   |   |   |   |   |   | Yes |   |   |   |   | Yes |   |
| Chirp 3: Transcription (`chirp_3`) | Yes | Yes |   |   |   |   |   |   |   |   | Yes | Yes |   |
| Chirp 3: HD Voices | Yes | Yes |   |   | Yes |   |   |   |   |   | Yes | Yes |   |
| Chirp 3: Instant Custom Voice | Yes | Yes |   |   | Yes |   |   |   |   |   | Yes | Yes |   |
| Embeddings for Multimodal | Yes | Yes |   |   |   |   |   |   |   |   |   |   |   |
| Embeddings for Text (`text-embedding-004`) | Yes | Yes |   | Yes |   |   |   | Yes | Yes |   | Yes |   |   |
| Embeddings for Text (`text-embedding-005`) | Yes | Yes |   |   |   |   |   |   |   | Yes |   |   |   |
| Embeddings for Text (`text-multilingual-embedding-002`) | Yes | Yes |   | Yes |   |   |   | Yes |   |   | Yes |   |   |

### Google Cloud partner model support

| Model | US multi-region | EU multi-region | Belgium (europe-west1) | Netherlands (europe-west4) | Singapore (asia-southeast1) | Taiwan (asia-east1) | Global |
|---|---|---|---|---|---|---|---|
| Anthropic's Claude Sonnet 5 | Yes | Yes |   |   |   |   | Yes |
| Anthropic's Claude Fable 5 | Yes | Yes |   |   | Yes |   | Yes |
| Anthropic's Claude Haiku 4.5 | Yes | Yes | Yes |   |   | Yes |   |
| Anthropic's Claude Opus 4 |   |   |   |   |   |   |   |
| Anthropic's Claude Opus 4.1 |   |   |   |   |   |   |   |
| Anthropic's Claude Opus 4.5 | Yes | Yes | Yes |   | Yes |   |   |
| Anthropic's Claude Opus 4.8 | Yes | Yes |   |   |   |   | Yes |
| Anthropic's Claude Opus 4.7 | Yes | Yes |   |   |   |   | Yes |
| Anthropic's Claude Opus 4.6 | Yes | Yes | Yes |   | Yes |   |   |
| Anthropic's Claude Sonnet 4 | Yes | Yes | Yes |   |   | Yes |   |
| Anthropic's Claude Sonnet 4.5 | Yes | Yes | Yes |   | Yes |   |   |
| Anthropic's Claude Sonnet 4.6 | Yes | Yes | Yes |   |   |   |   |
| Anthropic's Claude 3.5 Haiku (deprecated) | Yes | Yes | Yes |   |   |   |   |
| Anthropic's Claude 3 Haiku (deprecated) | Yes | Yes | Yes |   | Yes |   |   |
| Anthropic's Claude 3.7 Sonnet (deprecated) | Yes | Yes | Yes |   |   |   |   |
| Codestral (24.05) | Yes | Yes |   | Yes |   |   |   |
| Codestral 2 | Yes | Yes |   | Yes |   |   |   |
| Mistral Large (24.07) | Yes | Yes |   | Yes |   |   |   |
| Mistral Medium 3 | Yes | Yes |   | Yes |   |   |   |
| Mistral OCR (25.05) | Yes | Yes |   | Yes |   |   |   |
| Mistral Small 3.1 (25.03) | Yes | Yes |   | Yes |   |   |   |

### Google Cloud open model support

| Model | US multi-region | EU multi-region | Singapore (asia-southeast1) | Global |
|---|---|---|---|---|
| DeepSeek-OCR | Yes |   |   |   |
| DeepSeek R1 (0528) | Yes |   |   |   |
| DeepSeek-V3.1 | Yes |   |   |   |
| DeepSeek-V3.2 |   |   |   | Yes |
| Gemma 4 26B A4B IT | Yes |   |   |   |
| GLM 4.7 | Yes |   |   |   |
| GLM 5 | Yes |   |   |   |
| gpt-oss 120B | Yes |   |   |   |
| gpt-oss 20B | Yes |   |   |   |
| Kimi K2 Thinking | Yes |   |   |   |
| Llama 3.3 70B (Preview) | Yes |   |   |   |
| Llama 4 Maverick 17B-128E (Preview) | Yes |   |   |   |
| Llama 4 Scout 17B-16E (Preview) | Yes |   |   |   |
| MiniMax M2 | Yes |   |   |   |
| Multilingual E5 Large | Yes | Yes | Yes |   |
| Multilingual E5 Small | Yes | Yes | Yes |   |
| Qwen3 235B | Yes |   |   |   |
| Qwen3 Coder | Yes |   |   |   |
| Qwen3-Next-80B Instruct | Yes |   |   |   |
| Qwen3-Next-80B Thinking | Yes |   |   |   |

## What's next

- Learn about [Google Cloud regions](https://docs.cloud.google.com/docs/geography-and-regions).
- Learn more about
  [security controls by feature](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/security-controls).

- Learn about [Gemini Enterprise Agent Platform locations](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/locations).
