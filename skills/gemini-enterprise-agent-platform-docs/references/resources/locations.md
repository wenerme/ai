This page lists the supported locations for Google and Partner models and
generative AI features on Gemini Enterprise Agent Platform.

To see supported locations for Google agents and agent infrastructure features,
see [Supported locations for agents](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/agent-locations).

Google and Partner models and generative AI features on Gemini Enterprise Agent Platform are
exposed as specific [regional endpoints](https://cloud.google.com/about/locations) and a global
endpoint. Global endpoints cover the entire world and provide higher
availability and reliability than single regions.

> [!IMPORTANT]
> **Important:** Endpoints don't guarantee data residency or in-region ML processing. For information about data residency, see [Data residency](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/data-residency).

## Specify an endpoint

For standard regional endpoints (such as `us-central`) and the global endpoint:

### Python

    # google-cloud-aiplatform >= 1.79.0 is required
    import vertexai
    from vertexai.generative_models import GenerativeModel

    vertexai.init(project='GOOGLE_CLOUD_PROJECT', location='GOOGLE_CLOUD_LOCATION')

### Python

    client = genai.Client(
        enterprise=True,
        project='GOOGLE_CLOUD_PROJECT',
        location='GOOGLE_CLOUD_LOCATION'
    )

### REST

    GOOGLE_CLOUD_PROJECT="GOOGLE_CLOUD_PROJECT"
    GOOGLE_CLOUD_LOCATION="GOOGLE_CLOUD_LOCATION"
    MODEL_ID="MODEL_ID"

    curl -X POST \
      -H "Authorization: Bearer $(gcloud auth print-access-token)" \
      -H "Content-Type: application/json" \
      "https://${GOOGLE_CLOUD_LOCATION}-aiplatform.googleapis.com/v1/projects/${GOOGLE_CLOUD_PROJECT}/locations/${GOOGLE_CLOUD_LOCATION}/publishers/google/models/${MODEL_ID}:generateContent" \
      -d '{
        "contents": {
          "role": "user",
          "parts": {
            "text": "Explain how AI works in a few words."
          }
        }
      }'

> [!NOTE]
> **Note:** When using the global endpoint, use `https://aiplatform.googleapis.com/v1/projects/${GOOGLE_CLOUD_PROJECT}/locations/global/publishers/google/models/${MODEL_ID}:generateContent` instead of a service endpoint prepended with `https://${GOOGLE_CLOUD_LOCATION}-aiplatform.googleapis.com`.

### Multi-region endpoints

Multi-region endpoints allow you to ensure that machine learning processing of
Customer Data by the service stays within a specific jurisdictional boundary,
such as the United States or the European Union.

The following table lists the hostnames for multi-region endpoints:

| Multi-region | Location | Hostname |
|---|---|---|
| United States | `us` | `https://aiplatform.us.rep.googleapis.com` |
| European Union | `eu` | `https://aiplatform.eu.rep.googleapis.com` |

### Python

> [!NOTE]
> **Note:** ADK agents automatically use the location specified when initializing the environment using `vertexai.init()` or by creating a `vertexai.Client()`.

    import vertexai
    from google.adk.agents import Agent

    # Set the multi-region location on the client
    client = vertexai.Client(
        project='GOOGLE_CLOUD_PROJECT',
        location='GOOGLE_CLOUD_LOCATION'
    )

    # The agent will use this configuration
    agent = Agent(
        model="gemini-3.5-flash",
        name='my_agent'
    )

### Python

    from google import genai

    # location must be set to 'us' or 'eu' for multi-region routing
    client = genai.Client(
        enterprise=True,
        project='GOOGLE_CLOUD_PROJECT',
        location='GOOGLE_CLOUD_LOCATION'
    )

### REST

    GOOGLE_CLOUD_PROJECT="GOOGLE_CLOUD_PROJECT"
    MODEL_ID="gemini-3.5-flash"
    GOOGLE_CLOUD_LOCATION="GOOGLE_CLOUD_LOCATION" # Must be 'us' or 'eu'
    # Explicitly use the .rep. hostname for multi-region endpoints
    API_ENDPOINT="https://aiplatform.${GOOGLE_CLOUD_LOCATION}.rep.googleapis.com"

    curl -X POST \
      -H "Authorization: Bearer $(gcloud auth print-access-token)" \
      -H "Content-Type: application/json" \
      "${API_ENDPOINT}/v1/projects/${GOOGLE_CLOUD_PROJECT}/locations/${GOOGLE_CLOUD_LOCATION}/publishers/google/models/${MODEL_ID}:generateContent" \
      -d '{
        "contents": {
          "role": "user",
          "parts": {
            "text": "Explain how AI works in a few words"
          }
        }
      }'

#### Private connectivity to multi-region endpoints

Private Google Access isn't supported for multi-region endpoints. If you attempt to connect to a multi-region endpoint using Private Google Access, you might experience connectivity issues, SSL/TLS handshake errors, or certificate mismatch warnings.

To establish private connectivity to multi-region endpoints, you must configure [Private Service Connect endpoints for regional Google APIs](https://docs.cloud.google.com/vpc/docs/access-regional-google-apis-endpoints).

> [!NOTE]
> **Note:** Configuring Private Google Access endpoints for regional Google APIs is only supported using the [Google Cloud CLI](https://cloud.google.com/sdk/docs) (`gcloud`).

## Global endpoint

Selecting a global endpoint for your requests can improve overall availability
while reducing resource exhausted (429) errors. Don't use the global endpoint if
you have ML processing requirements, because you can't control or know which
region your ML processing requests are sent to when a request is made.

### Supported models

Usage of the global endpoint is supported for the following Google models in
specified regions. For details about which models support the global endpoint,
see the **Global** tab in the
[Google model endpoint locations table](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/locations#google-models).

- [Gemini Omni Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/omni-flash-preview) (Preview)
- [Gemini 3.1 Flash-Lite Image (Nano Banana 2 Lite)](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-flash-lite-image)
- [Gemini 3 Pro Image](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-pro-image)
- [Gemini 3.1 Flash Image](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-flash-image)
- [Gemini 3.5 Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-5-flash)
- [Gemini 3.1 Flash-Lite](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-flash-lite)
- [Gemini 3.1 Flash Image](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-flash-image) (Preview)
- [Gemini 3.1 Pro](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-pro) (Preview)
- [Gemini 3 Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-flash) (Preview)
- [Gemini 3 Pro Image](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-pro-image-preview) (Preview)
- [Gemini 2.5 Pro](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-pro)
- [Gemini 2.5 Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash) (Preview)
- [Gemini 2.5 Flash-Lite](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash-lite) (Preview)
- [Gemini 2.5 Flash Image](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash-image)
- [Gemini 2.5 Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash)
- [Gemini 2.5 Flash-Lite](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash-lite)

For information about global endpoint availability for partner models, see the
**Global** tab in the
[Google Cloud partner model endpoint locations table](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/locations#genai-partner-models).

### Limitations

The following capabilities are not available when using the global endpoint:

- Tuning
- Batch prediction for Anthropic and OpenMaaS models
- Retrieval-augmented generation (RAG) corpus (RAG requests are supported)

Usage of the global endpoint with Provisioned Throughput is
available only for the following models:

#### Click to view supported models for the global endpoint when using Provisioned Throughput

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

## Google model endpoint locations

Google models in Gemini Enterprise Agent Platform are available for the following endpoints:

### Global

|   | Global (global) |
|---|---|
| Gemini models ||
| [Gemini Omni Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/omni-flash-preview) preview  `(gemini-omni-flash-preview)` |   |
| [Gemini 3.1 Flash-Lite Image (Nano Banana 2 Lite)](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-flash-lite-image)  `(gemini-3.1-flash-lite-image)` |   |
| [Gemini 3 Pro Image](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-pro-image)  `(gemini-3-pro-image)` |   |
| [Gemini 3.1 Flash Image](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-flash-image)  `(gemini-3.1-flash-image)` |   |
| [Gemini 3.5 Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-5-flash)  `(gemini-3.5-flash)` |   |
| [Gemini 3.1 Flash-Lite](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-flash-lite)  `(gemini-3.1-flash-lite)` |   |
| [Gemini 3.1 Flash Image](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-flash-image) preview  `(gemini-3.1-flash-image-preview)` |   |
| [Gemini 3.1 Pro](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-pro) preview  `(gemini-3.1-pro-preview)` |   |
| [Gemini 3 Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-flash) preview  `(gemini-3-flash-preview)` |   |
| [Gemini 3 Pro Image](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-pro-image-preview) preview  `(gemini-3-pro-image-preview)` |   |
| [Gemini 2.5 Pro](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-pro)  `(gemini-2.5-pro)` |   |
| [Gemini 2.5 Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash) preview  `(gemini-2.5-flash-preview-09-2025)` |   |
| [Gemini 2.5 Flash-Lite](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash-lite) preview  `(gemini-2.5-flash-lite-preview-09-2025)` |   |
| [Gemini 2.5 Flash Image](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash-image)  `(gemini-2.5-flash-image)` |   |
| [Gemini 2.5 Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash)  `(gemini-2.5-flash)` |   |
| [Gemini 2.5 Flash-Lite](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash-lite)  `(gemini-2.5-flash-lite)` |   |
| [Gemini 2.5 Flash with Gemini Live API native audio](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash-live-api)  `(gemini-live-2.5-flash-native-audio)` |   |
| Embeddings models ||
| [Gemini Embedding 2](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/embedding-2)  `(gemini-embedding-2)` |   |
| Gemini Embedding  `(gemini-embedding-001)` |   |
| Embeddings for Text |   |
| Embeddings for Multimodal |   |
| Veo on Gemini Enterprise Agent Platform models ||
| [Veo 2 Generate](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/2-0-generate#2.0-generate-001)  `(veo-2.0-generate-001)` |   |
| [Veo 2 Generate](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/2-0-generate#2.0-generate-exp) preview  `(veo-2.0-generate-exp)` |   |
| [Veo 2 Generate](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/2-0-generate#2.0-generate-preview) preview  `(veo-2.0-generate-preview)` |   |
| [Veo 3 Generate](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-0-generate#3.0-generate-preview) preview  `(veo-3.0-generate-preview)` |   |
| [Veo 3 Generate](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-0-generate#3.0-fast-generate-preview) preview  `(veo-3.0-fast-generate-preview)` |   |
| [Veo 3 Generate](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-0-generate#3.0-generate-001)  `(veo-3.0-generate-001)` |   |
| [Veo 3 Fast Generate](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-0-generate#3.0-fast-generate-001)  `(veo-3.0-fast-generate-001)` |   |
| [Veo 3.1 Generate](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-1-generate#3.1-generate-preview) preview  `(veo-3.1-generate-preview)` |   |
| [Veo 3.1 Fast Generate](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-1-generate#3.1-fast-generate-preview) preview  `(veo-3.1-fast-generate-preview)` |   |
| [Veo 3.1 Generate](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-1-generate#3.1-generate-001)  `(veo-3.1-generate-001)` |   |
| [Veo 3.1 Fast Generate](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-1-generate#3.1-fast-generate-001)  `(veo-3.1-fast-generate-001)` |   |
| [Veo 3.1 Lite Generate](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-1-generate#3.1-lite-generate-001-preview) preview  `(veo-3.1-lite-generate-001)` |   |
| Speech-to-Text and Text-to-Speech models ||
| [Chirp 3: Transcription](https://docs.cloud.google.com/speech-to-text/docs/models/chirp-3)  `(chirp_3)` |   |
| [Chirp 3: HD Voices](https://docs.cloud.google.com/text-to-speech/docs/chirp3-hd) |   |
| [Chirp 3: Instant Custom Voice](https://docs.cloud.google.com/text-to-speech/docs/chirp3-instant-custom-voice) |   |
| [Chirp 2: Transcription](https://docs.cloud.google.com/speech-to-text/docs/models/chirp-2)  `(chirp_2)` |   |
| Gemini 2.5 Pro TTS  `(gemini-2.5-pro-tts)` |   |
| Gemini 2.5 Flash TTS  `(gemini-2.5-flash-tts)` |   |
| Gemini 2.5 Flash Lite Preview TTS preview  `(gemini-2.5-flash-lite-preview-tts)` |   |

### Multi-region

|   | United States multi-region (us) | European Union multi-region (eu) |
|---|---|---|
| Gemini models |||
| [Gemini Omni Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/omni-flash-preview) preview  `(gemini-omni-flash-preview)` |   |   |
| [Gemini 3.1 Flash-Lite Image (Nano Banana 2 Lite)](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-flash-lite-image)  `(gemini-3.1-flash-lite-image)` |   |   |
| [Gemini 3 Pro Image](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-pro-image)  `(gemini-3-pro-image)` |   |   |
| [Gemini 3.1 Flash Image](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-flash-image)  `(gemini-3.1-flash-image)` |   |   |
| [Gemini 3.5 Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-5-flash)  `(gemini-3.5-flash)` |   |   |
| [Gemini 3.1 Flash-Lite](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-flash-lite)  `(gemini-3.1-flash-lite)` |   |   |
| [Gemini 3.1 Flash Image](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-flash-image) preview  `(gemini-3.1-flash-image-preview)` |   |   |
| [Gemini 3.1 Pro](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-pro) preview  `(gemini-3.1-pro-preview)` |   |   |
| [Gemini 3 Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-flash) preview  `(gemini-3-flash-preview)` |   |   |
| [Gemini 3 Pro Image](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-pro-image-preview) preview  `(gemini-3-pro-image-preview)` |   |   |
| [Gemini 2.5 Pro](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-pro)  `(gemini-2.5-pro)` |   |   |
| [Gemini 2.5 Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash) preview  `(gemini-2.5-flash-preview-09-2025)` |   |   |
| [Gemini 2.5 Flash-Lite](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash-lite) preview  `(gemini-2.5-flash-lite-preview-09-2025)` |   |   |
| [Gemini 2.5 Flash Image](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash-image)  `(gemini-2.5-flash-image)` |   |   |
| [Gemini 2.5 Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash)  `(gemini-2.5-flash)` |   |   |
| [Gemini 2.5 Flash-Lite](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash-lite)  `(gemini-2.5-flash-lite)` |   |   |
| [Gemini 2.5 Flash with Gemini Live API native audio](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash-live-api)  `(gemini-live-2.5-flash-native-audio)` |   |   |
| Embeddings models |||
| [Gemini Embedding 2](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/embedding-2)  `(gemini-embedding-2)` |   |   |
| Gemini Embedding  `(gemini-embedding-001)` |   |   |
| Embeddings for Text |   |   |
| Embeddings for Multimodal |   |   |
| Veo on Gemini Enterprise Agent Platform models |||
| [Veo 2 Generate](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/2-0-generate#2.0-generate-001)  `(veo-2.0-generate-001)` |   |   |
| [Veo 2 Generate](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/2-0-generate#2.0-generate-exp) preview  `(veo-2.0-generate-exp)` |   |   |
| [Veo 2 Generate](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/2-0-generate#2.0-generate-preview) preview  `(veo-2.0-generate-preview)` |   |   |
| [Veo 3 Generate](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-0-generate#3.0-generate-preview) preview  `(veo-3.0-generate-preview)` |   |   |
| [Veo 3 Generate](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-0-generate#3.0-fast-generate-preview) preview  `(veo-3.0-fast-generate-preview)` |   |   |
| [Veo 3 Generate](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-0-generate#3.0-generate-001)  `(veo-3.0-generate-001)` |   |   |
| [Veo 3 Fast Generate](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-0-generate#3.0-fast-generate-001)  `(veo-3.0-fast-generate-001)` |   |   |
| [Veo 3.1 Generate](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-1-generate#3.1-generate-preview) preview  `(veo-3.1-generate-preview)` |   |   |
| [Veo 3.1 Fast Generate](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-1-generate#3.1-fast-generate-preview) preview  `(veo-3.1-fast-generate-preview)` |   |   |
| [Veo 3.1 Generate](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-1-generate#3.1-generate-001)  `(veo-3.1-generate-001)` |   |   |
| [Veo 3.1 Fast Generate](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-1-generate#3.1-fast-generate-001)  `(veo-3.1-fast-generate-001)` |   |   |
| [Veo 3.1 Lite Generate](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-1-generate#3.1-lite-generate-001-preview) preview  `(veo-3.1-lite-generate-001)` |   |   |
| Speech-to-Text and Text-to-Speech models |||
| [Chirp 3: Transcription](https://docs.cloud.google.com/speech-to-text/docs/models/chirp-3)  `(chirp_3)` |   |   |
| [Chirp 3: HD Voices](https://docs.cloud.google.com/text-to-speech/docs/chirp3-hd) |   |   |
| [Chirp 3: Instant Custom Voice](https://docs.cloud.google.com/text-to-speech/docs/chirp3-instant-custom-voice) |   |   |
| [Chirp 2: Transcription](https://docs.cloud.google.com/speech-to-text/docs/models/chirp-2)  `(chirp_2)` |   |   |
| Gemini 2.5 Pro TTS  `(gemini-2.5-pro-tts)` |   |   |
| Gemini 2.5 Flash TTS  `(gemini-2.5-flash-tts)` |   |   |
| Gemini 2.5 Flash Lite Preview TTS preview  `(gemini-2.5-flash-lite-preview-tts)` |   |   |

### United States

|   | Oregon (us-west1) | Las Vegas (us-west4) | Iowa (us-central1) | South Carolina (us-east1) | N. Virginia (us-east4) | Columbus (us-east5) | Dallas (us-south1) |
|---|---|---|---|---|---|---|---|
| Gemini models ||||||||
| [Gemini Omni Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/omni-flash-preview) preview  `(gemini-omni-flash-preview)` |   |   |   |   |   |   |   |
| [Gemini 3.1 Flash-Lite Image (Nano Banana 2 Lite)](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-flash-lite-image)  `(gemini-3.1-flash-lite-image)` |   |   |   |   |   |   |   |
| [Gemini 3 Pro Image](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-pro-image)  `(gemini-3-pro-image)` |   |   |   |   |   |   |   |
| [Gemini 3.1 Flash Image](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-flash-image)  `(gemini-3.1-flash-image)` |   |   |   |   |   |   |   |
| [Gemini 3.5 Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-5-flash)  `(gemini-3.5-flash)` |   |   |   |   |   |   |   |
| [Gemini 3.1 Flash-Lite](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-flash-lite)  `(gemini-3.1-flash-lite)` |   |   |   |   |   |   |   |
| [Gemini 3.1 Flash Image](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-flash-image) preview  `(gemini-3.1-flash-image-preview)` |   |   |   |   |   |   |   |
| [Gemini 3.1 Pro](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-pro) preview  `(gemini-3.1-pro-preview)` |   |   |   |   |   |   |   |
| [Gemini 3 Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-flash) preview  `(gemini-3-flash-preview)` |   |   |   |   |   |   |   |
| [Gemini 3 Pro Image](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-pro-image-preview) preview  `(gemini-3-pro-image-preview)` |   |   |   |   |   |   |   |
| [Gemini 2.5 Pro](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-pro)  `(gemini-2.5-pro)` |   |   |   |   |   |   |   |
| [Gemini 2.5 Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash) preview  `(gemini-2.5-flash-preview-09-2025)` |   |   |   |   |   |   |   |
| [Gemini 2.5 Flash-Lite](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash-lite) preview  `(gemini-2.5-flash-lite-preview-09-2025)` |   |   |   |   |   |   |   |
| [Gemini 2.5 Flash Image](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash-image)  `(gemini-2.5-flash-image)` |   |   |   |   |   |   |   |
| [Gemini 2.5 Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash)  `(gemini-2.5-flash)` |   |   |   |   |   |   |   |
| [Gemini 2.5 Flash-Lite](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash-lite)  `(gemini-2.5-flash-lite)` |   |   |   |   |   |   |   |
| [Gemini 2.5 Flash with Gemini Live API native audio](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash-live-api)  `(gemini-live-2.5-flash-native-audio)` |   |   |   |   |   |   |   |
| Embeddings models ||||||||
| [Gemini Embedding 2](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/embedding-2)  `(gemini-embedding-2)` |   |   |   |   |   |   |   |
| Gemini Embedding  `(gemini-embedding-001)` |   |   |   |   |   |   |   |
| Embeddings for Text |   |   |   |   |   |   |   |
| Embeddings for Multimodal |   |   |   |   |   |   |   |
| Veo on Gemini Enterprise Agent Platform models ||||||||
| [Veo 2 Generate](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/2-0-generate#2.0-generate-001)  `(veo-2.0-generate-001)` |   |   |   |   |   |   |   |
| [Veo 2 Generate](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/2-0-generate#2.0-generate-exp) preview  `(veo-2.0-generate-exp)` |   |   |   |   |   |   |   |
| [Veo 2 Generate](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/2-0-generate#2.0-generate-preview) preview  `(veo-2.0-generate-preview)` |   |   |   |   |   |   |   |
| [Veo 3 Generate](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-0-generate#3.0-generate-preview) preview  `(veo-3.0-generate-preview)` |   |   |   |   |   |   |   |
| [Veo 3 Generate](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-0-generate#3.0-fast-generate-preview) preview  `(veo-3.0-fast-generate-preview)` |   |   |   |   |   |   |   |
| [Veo 3 Generate](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-0-generate#3.0-generate-001)  `(veo-3.0-generate-001)` |   |   |   |   |   |   |   |
| [Veo 3 Fast Generate](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-0-generate#3.0-fast-generate-001)  `(veo-3.0-fast-generate-001)` |   |   |   |   |   |   |   |
| [Veo 3.1 Generate](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-1-generate#3.1-generate-preview) preview  `(veo-3.1-generate-preview)` |   |   |   |   |   |   |   |
| [Veo 3.1 Fast Generate](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-1-generate#3.1-fast-generate-preview) preview  `(veo-3.1-fast-generate-preview)` |   |   |   |   |   |   |   |
| [Veo 3.1 Generate](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-1-generate#3.1-generate-001)  `(veo-3.1-generate-001)` |   |   |   |   |   |   |   |
| [Veo 3.1 Fast Generate](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-1-generate#3.1-fast-generate-001)  `(veo-3.1-fast-generate-001)` |   |   |   |   |   |   |   |
| [Veo 3.1 Lite Generate](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-1-generate#3.1-lite-generate-001-preview) preview  `(veo-3.1-lite-generate-001)` |   |   |   |   |   |   |   |
| Speech-to-Text and Text-to-Speech models ||||||||
| [Chirp 3: Transcription](https://docs.cloud.google.com/speech-to-text/docs/models/chirp-3)  `(chirp_3)` |   |   |   |   |   |   |   |
| [Chirp 3: HD Voices](https://docs.cloud.google.com/text-to-speech/docs/chirp3-hd) |   |   |   |   |   |   |   |
| [Chirp 3: Instant Custom Voice](https://docs.cloud.google.com/text-to-speech/docs/chirp3-instant-custom-voice) |   |   |   |   |   |   |   |
| [Chirp 2: Transcription](https://docs.cloud.google.com/speech-to-text/docs/models/chirp-2)  `(chirp_2)` |   |   |   |   |   |   |   |
| Gemini 2.5 Pro TTS  `(gemini-2.5-pro-tts)` |   |   |   |   |   |   |   |
| Gemini 2.5 Flash TTS  `(gemini-2.5-flash-tts)` |   |   |   |   |   |   |   |
| Gemini 2.5 Flash Lite Preview TTS preview  `(gemini-2.5-flash-lite-preview-tts)` |   |   |   |   |   |   |   |

### Americas

|   | Montréal (northamerica-northeast1) | São Paulo (southamerica-east1) |
|---|---|---|
| Gemini models |||
| [Gemini Omni Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/omni-flash-preview) preview  `(gemini-omni-flash-preview)` |   |   |
| [Gemini 3.1 Flash-Lite Image (Nano Banana 2 Lite)](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-flash-lite-image)  `(gemini-3.1-flash-lite-image)` |   |   |
| [Gemini 3 Pro Image](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-pro-image)  `(gemini-3-pro-image)` |   |   |
| [Gemini 3.1 Flash Image](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-flash-image)  `(gemini-3.1-flash-image)` |   |   |
| [Gemini 3.5 Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-5-flash)  `(gemini-3.5-flash)` |   |   |
| [Gemini 3.1 Flash-Lite](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-flash-lite)  `(gemini-3.1-flash-lite)` |   |   |
| [Gemini 3.1 Flash Image](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-flash-image) preview  `(gemini-3.1-flash-image-preview)` |   |   |
| [Gemini 3.1 Pro](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-pro) preview  `(gemini-3.1-pro-preview)` |   |   |
| [Gemini 3 Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-flash) preview  `(gemini-3-flash-preview)` |   |   |
| [Gemini 3 Pro Image](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-pro-image-preview) preview  `(gemini-3-pro-image-preview)` |   |   |
| [Gemini 2.5 Pro](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-pro)  `(gemini-2.5-pro)` |   |   |
| [Gemini 2.5 Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash) preview  `(gemini-2.5-flash-preview-09-2025)` |   |   |
| [Gemini 2.5 Flash-Lite](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash-lite) preview  `(gemini-2.5-flash-lite-preview-09-2025)` |   |   |
| [Gemini 2.5 Flash Image](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash-image)  `(gemini-2.5-flash-image)` |   |   |
| [Gemini 2.5 Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash)  `(gemini-2.5-flash)` |   |   |
| [Gemini 2.5 Flash-Lite](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash-lite)  `(gemini-2.5-flash-lite)` |   |   |
| [Gemini 2.5 Flash with Gemini Live API native audio](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash-live-api)  `(gemini-live-2.5-flash-native-audio)` |   |   |
| Embeddings models |||
| [Gemini Embedding 2](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/embedding-2)  `(gemini-embedding-2)` |   |   |
| Gemini Embedding  `(gemini-embedding-001)` |   |   |
| Embeddings for Text |   |   |
| Embeddings for Multimodal |   |   |
| Veo on Gemini Enterprise Agent Platform models |||
| [Veo 2 Generate](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/2-0-generate#2.0-generate-001)  `(veo-2.0-generate-001)` |   |   |
| [Veo 2 Generate](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/2-0-generate#2.0-generate-exp) preview  `(veo-2.0-generate-exp)` |   |   |
| [Veo 2 Generate](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/2-0-generate#2.0-generate-preview) preview  `(veo-2.0-generate-preview)` |   |   |
| [Veo 3 Generate](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-0-generate#3.0-generate-preview) preview  `(veo-3.0-generate-preview)` |   |   |
| [Veo 3 Generate](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-0-generate#3.0-fast-generate-preview) preview  `(veo-3.0-fast-generate-preview)` |   |   |
| [Veo 3 Generate](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-0-generate#3.0-generate-001)  `(veo-3.0-generate-001)` |   |   |
| [Veo 3 Fast Generate](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-0-generate#3.0-fast-generate-001)  `(veo-3.0-fast-generate-001)` |   |   |
| [Veo 3.1 Generate](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-1-generate#3.1-generate-preview) preview  `(veo-3.1-generate-preview)` |   |   |
| [Veo 3.1 Fast Generate](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-1-generate#3.1-fast-generate-preview) preview  `(veo-3.1-fast-generate-preview)` |   |   |
| [Veo 3.1 Generate](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-1-generate#3.1-generate-001)  `(veo-3.1-generate-001)` |   |   |
| [Veo 3.1 Fast Generate](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-1-generate#3.1-fast-generate-001)  `(veo-3.1-fast-generate-001)` |   |   |
| [Veo 3.1 Lite Generate](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-1-generate#3.1-lite-generate-001-preview) preview  `(veo-3.1-lite-generate-001)` |   |   |
| Speech-to-Text and Text-to-Speech models |||
| [Chirp 3: Transcription](https://docs.cloud.google.com/speech-to-text/docs/models/chirp-3)  `(chirp_3)` |   |   |
| [Chirp 3: HD Voices](https://docs.cloud.google.com/text-to-speech/docs/chirp3-hd) |   |   |
| [Chirp 3: Instant Custom Voice](https://docs.cloud.google.com/text-to-speech/docs/chirp3-instant-custom-voice) |   |   |
| [Chirp 2: Transcription](https://docs.cloud.google.com/speech-to-text/docs/models/chirp-2)  `(chirp_2)` |   |   |
| Gemini 2.5 Pro TTS  `(gemini-2.5-pro-tts)` |   |   |
| Gemini 2.5 Flash TTS  `(gemini-2.5-flash-tts)` |   |   |
| Gemini 2.5 Flash Lite Preview TTS preview  `(gemini-2.5-flash-lite-preview-tts)` |   |   |

### Europe

|   | London (europe-west2) | Belgium (europe-west1) | Netherlands (europe-west4) | Zürich (europe-west6) | Frankfurt (europe-west3) | Finland (europe-north1) | Warsaw (europe-central2) | Milan (europe-west8) | Madrid (europe-southwest1) | Paris (europe-west9) |
|---|---|---|---|---|---|---|---|---|---|---|
| Gemini models |||||||||||
| [Gemini Omni Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/omni-flash-preview) preview  `(gemini-omni-flash-preview)` |   |   |   |   |   |   |   |   |   |   |
| [Gemini 3.1 Flash-Lite Image (Nano Banana 2 Lite)](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-flash-lite-image)  `(gemini-3.1-flash-lite-image)` |   |   |   |   |   |   |   |   |   |   |
| [Gemini 3 Pro Image](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-pro-image)  `(gemini-3-pro-image)` |   |   |   |   |   |   |   |   |   |   |
| [Gemini 3.1 Flash Image](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-flash-image)  `(gemini-3.1-flash-image)` |   |   |   |   |   |   |   |   |   |   |
| [Gemini 3.5 Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-5-flash)  `(gemini-3.5-flash)` |   |   |   |   |   |   |   |   |   |   |
| [Gemini 3.1 Flash-Lite](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-flash-lite)  `(gemini-3.1-flash-lite)` |   |   |   |   |   |   |   |   |   |   |
| [Gemini 3.1 Flash Image](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-flash-image) preview  `(gemini-3.1-flash-image-preview)` |   |   |   |   |   |   |   |   |   |   |
| [Gemini 3.1 Pro](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-pro) preview  `(gemini-3.1-pro-preview)` |   |   |   |   |   |   |   |   |   |   |
| [Gemini 3 Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-flash) preview  `(gemini-3-flash-preview)` |   |   |   |   |   |   |   |   |   |   |
| [Gemini 3 Pro Image](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-pro-image-preview) preview  `(gemini-3-pro-image-preview)` |   |   |   |   |   |   |   |   |   |   |
| [Gemini 2.5 Pro](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-pro)  `(gemini-2.5-pro)` |   |   |   |   |   |   |   |   |   |   |
| [Gemini 2.5 Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash) preview  `(gemini-2.5-flash-preview-09-2025)` |   |   |   |   |   |   |   |   |   |   |
| [Gemini 2.5 Flash-Lite](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash-lite) preview  `(gemini-2.5-flash-lite-preview-09-2025)` |   |   |   |   |   |   |   |   |   |   |
| [Gemini 2.5 Flash Image](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash-image)  `(gemini-2.5-flash-image)` |   |   |   |   |   |   |   |   |   |   |
| [Gemini 2.5 Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash)  `(gemini-2.5-flash)` |   |   |   |   |   |   |   |   |   |   |
| [Gemini 2.5 Flash-Lite](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash-lite)  `(gemini-2.5-flash-lite)` |   |   |   |   |   |   |   |   |   |   |
| [Gemini 2.5 Flash with Gemini Live API native audio](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash-live-api)  `(gemini-live-2.5-flash-native-audio)` |   |   |   |   |   |   |   |   |   |   |
| Embeddings models |||||||||||
| [Gemini Embedding 2](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/embedding-2)  `(gemini-embedding-2)` |   |   |   |   |   |   |   |   |   |   |
| Gemini Embedding  `(gemini-embedding-001)` |   |   |   |   |   |   |   |   |   |   |
| Embeddings for Text |   |   |   |   |   |   |   |   |   |   |
| Embeddings for Multimodal |   |   |   |   |   |   |   |   |   |   |
| Veo on Gemini Enterprise Agent Platform models |||||||||||
| [Veo 2 Generate](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/2-0-generate#2.0-generate-001)  `(veo-2.0-generate-001)` |   |   |   |   |   |   |   |   |   |   |
| [Veo 2 Generate](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/2-0-generate#2.0-generate-exp) preview  `(veo-2.0-generate-exp)` |   |   |   |   |   |   |   |   |   |   |
| [Veo 2 Generate](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/2-0-generate#2.0-generate-preview) preview  `(veo-2.0-generate-preview)` |   |   |   |   |   |   |   |   |   |   |
| [Veo 3 Generate](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-0-generate#3.0-generate-preview) preview  `(veo-3.0-generate-preview)` |   |   |   |   |   |   |   |   |   |   |
| [Veo 3 Generate](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-0-generate#3.0-fast-generate-preview) preview  `(veo-3.0-fast-generate-preview)` |   |   |   |   |   |   |   |   |   |   |
| [Veo 3 Generate](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-0-generate#3.0-generate-001)  `(veo-3.0-generate-001)` |   |   |   |   |   |   |   |   |   |   |
| [Veo 3 Fast Generate](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-0-generate#3.0-fast-generate-001)  `(veo-3.0-fast-generate-001)` |   |   |   |   |   |   |   |   |   |   |
| [Veo 3.1 Generate](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-1-generate#3.1-generate-preview) preview  `(veo-3.1-generate-preview)` |   |   |   |   |   |   |   |   |   |   |
| [Veo 3.1 Fast Generate](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-1-generate#3.1-fast-generate-preview) preview  `(veo-3.1-fast-generate-preview)` |   |   |   |   |   |   |   |   |   |   |
| [Veo 3.1 Generate](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-1-generate#3.1-generate-001)  `(veo-3.1-generate-001)` |   |   |   |   |   |   |   |   |   |   |
| [Veo 3.1 Fast Generate](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-1-generate#3.1-fast-generate-001)  `(veo-3.1-fast-generate-001)` |   |   |   |   |   |   |   |   |   |   |
| [Veo 3.1 Lite Generate](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-1-generate#3.1-lite-generate-001-preview) preview  `(veo-3.1-lite-generate-001)` |   |   |   |   |   |   |   |   |   |   |
| Speech-to-Text and Text-to-Speech models |||||||||||
| [Chirp 3: Transcription](https://docs.cloud.google.com/speech-to-text/docs/models/chirp-3)  `(chirp_3)` |   |   |   |   |   |   |   |   |   |   |
| [Chirp 3: HD Voices](https://docs.cloud.google.com/text-to-speech/docs/chirp3-hd) |   |   |   |   |   |   |   |   |   |   |
| [Chirp 3: Instant Custom Voice](https://docs.cloud.google.com/text-to-speech/docs/chirp3-instant-custom-voice) |   |   |   |   |   |   |   |   |   |   |
| [Chirp 2: Transcription](https://docs.cloud.google.com/speech-to-text/docs/models/chirp-2)  `(chirp_2)` |   |   |   |   |   |   |   |   |   |   |
| Gemini 2.5 Pro TTS  `(gemini-2.5-pro-tts)` |   |   |   |   |   |   |   |   |   |   |
| Gemini 2.5 Flash TTS  `(gemini-2.5-flash-tts)` |   |   |   |   |   |   |   |   |   |   |
| Gemini 2.5 Flash Lite Preview TTS preview  `(gemini-2.5-flash-lite-preview-tts)` |   |   |   |   |   |   |   |   |   |   |

### Asia Pacific

|   | Mumbai (asia-south1) | Singapore (asia-southeast1) | Hong Kong (asia-east2) | Taiwan (asia-east1) | Tokyo (asia-northeast1) | Sydney (australia-southeast1) | Seoul (asia-northeast3) |
|---|---|---|---|---|---|---|---|
| Gemini models ||||||||
| [Gemini Omni Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/omni-flash-preview) preview  `(gemini-omni-flash-preview)` |   |   |   |   |   |   |   |
| [Gemini 3.1 Flash-Lite Image (Nano Banana 2 Lite)](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-flash-lite-image)  `(gemini-3.1-flash-lite-image)` |   |   |   |   |   |   |   |
| [Gemini 3 Pro Image](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-pro-image)  `(gemini-3-pro-image)` |   |   |   |   |   |   |   |
| [Gemini 3.1 Flash Image](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-flash-image)  `(gemini-3.1-flash-image)` |   |   |   |   |   |   |   |
| [Gemini 3.5 Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-5-flash)  `(gemini-3.5-flash)` |   |   |   |   |   |   |   |
| [Gemini 3.1 Flash-Lite](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-flash-lite)  `(gemini-3.1-flash-lite)` |   |   |   |   |   |   |   |
| [Gemini 3.1 Flash Image](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-flash-image) preview  `(gemini-3.1-flash-image-preview)` |   |   |   |   |   |   |   |
| [Gemini 3.1 Pro](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-pro) preview  `(gemini-3.1-pro-preview)` |   |   |   |   |   |   |   |
| [Gemini 3 Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-flash) preview  `(gemini-3-flash-preview)` |   |   |   |   |   |   |   |
| [Gemini 3 Pro Image](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-pro-image-preview) preview  `(gemini-3-pro-image-preview)` |   |   |   |   |   |   |   |
| [Gemini 2.5 Pro](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-pro)  `(gemini-2.5-pro)` |   |   |   |   |   |   |   |
| [Gemini 2.5 Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash) preview  `(gemini-2.5-flash-preview-09-2025)` |   |   |   |   |   |   |   |
| [Gemini 2.5 Flash-Lite](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash-lite) preview  `(gemini-2.5-flash-lite-preview-09-2025)` |   |   |   |   |   |   |   |
| [Gemini 2.5 Flash Image](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash-image)  `(gemini-2.5-flash-image)` |   |   |   |   |   |   |   |
| [Gemini 2.5 Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash)  `(gemini-2.5-flash)` |   |   |   |   |   |   |   |
| [Gemini 2.5 Flash-Lite](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash-lite)  `(gemini-2.5-flash-lite)` |   |   |   |   |   |   |   |
| [Gemini 2.5 Flash with Gemini Live API native audio](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash-live-api)  `(gemini-live-2.5-flash-native-audio)` |   |   |   |   |   |   |   |
| Embeddings models ||||||||
| [Gemini Embedding 2](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/embedding-2)  `(gemini-embedding-2)` |   |   |   |   |   |   |   |
| Gemini Embedding  `(gemini-embedding-001)` |   |   |   |   |   |   |   |
| Embeddings for Text |   |   |   |   |   |   |   |
| Embeddings for Multimodal |   |   |   |   |   |   |   |
| Veo on Gemini Enterprise Agent Platform models ||||||||
| [Veo 2 Generate](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/2-0-generate#2.0-generate-001)  `(veo-2.0-generate-001)` |   |   |   |   |   |   |   |
| [Veo 2 Generate](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/2-0-generate#2.0-generate-exp) preview  `(veo-2.0-generate-exp)` |   |   |   |   |   |   |   |
| [Veo 2 Generate](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/2-0-generate#2.0-generate-preview) preview  `(veo-2.0-generate-preview)` |   |   |   |   |   |   |   |
| [Veo 3 Generate](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-0-generate#3.0-generate-preview) preview  `(veo-3.0-generate-preview)` |   |   |   |   |   |   |   |
| [Veo 3 Generate](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-0-generate#3.0-fast-generate-preview) preview  `(veo-3.0-fast-generate-preview)` |   |   |   |   |   |   |   |
| [Veo 3 Generate](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-0-generate#3.0-generate-001)  `(veo-3.0-generate-001)` |   |   |   |   |   |   |   |
| [Veo 3 Fast Generate](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-0-generate#3.0-fast-generate-001)  `(veo-3.0-fast-generate-001)` |   |   |   |   |   |   |   |
| [Veo 3.1 Generate](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-1-generate#3.1-generate-preview) preview  `(veo-3.1-generate-preview)` |   |   |   |   |   |   |   |
| [Veo 3.1 Fast Generate](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-1-generate#3.1-fast-generate-preview) preview  `(veo-3.1-fast-generate-preview)` |   |   |   |   |   |   |   |
| [Veo 3.1 Generate](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-1-generate#3.1-generate-001)  `(veo-3.1-generate-001)` |   |   |   |   |   |   |   |
| [Veo 3.1 Fast Generate](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-1-generate#3.1-fast-generate-001)  `(veo-3.1-fast-generate-001)` |   |   |   |   |   |   |   |
| [Veo 3.1 Lite Generate](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-1-generate#3.1-lite-generate-001-preview) preview  `(veo-3.1-lite-generate-001)` |   |   |   |   |   |   |   |
| Speech-to-Text and Text-to-Speech models ||||||||
| [Chirp 3: Transcription](https://docs.cloud.google.com/speech-to-text/docs/models/chirp-3)  `(chirp_3)` |   |   |   |   |   |   |   |
| [Chirp 3: HD Voices](https://docs.cloud.google.com/text-to-speech/docs/chirp3-hd) |   |   |   |   |   |   |   |
| [Chirp 3: Instant Custom Voice](https://docs.cloud.google.com/text-to-speech/docs/chirp3-instant-custom-voice) |   |   |   |   |   |   |   |
| [Chirp 2: Transcription](https://docs.cloud.google.com/speech-to-text/docs/models/chirp-2)  `(chirp_2)` |   |   |   |   |   |   |   |
| Gemini 2.5 Pro TTS  `(gemini-2.5-pro-tts)` |   |   |   |   |   |   |   |
| Gemini 2.5 Flash TTS  `(gemini-2.5-flash-tts)` |   |   |   |   |   |   |   |
| Gemini 2.5 Flash Lite Preview TTS preview  `(gemini-2.5-flash-lite-preview-tts)` |   |   |   |   |   |   |   |

### Middle East

|   | Tel Aviv (me-west1) | Doha (me-central1) | Dammam (me-central2) |
|---|---|---|---|
| Gemini models ||||
| [Gemini Omni Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/omni-flash-preview) preview  `(gemini-omni-flash-preview)` |   |   |   |
| [Gemini 3.1 Flash-Lite Image (Nano Banana 2 Lite)](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-flash-lite-image)  `(gemini-3.1-flash-lite-image)` |   |   |   |
| [Gemini 3 Pro Image](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-pro-image)  `(gemini-3-pro-image)` |   |   |   |
| [Gemini 3.1 Flash Image](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-flash-image)  `(gemini-3.1-flash-image)` |   |   |   |
| [Gemini 3.5 Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-5-flash)  `(gemini-3.5-flash)` |   |   |   |
| [Gemini 3.1 Flash-Lite](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-flash-lite)  `(gemini-3.1-flash-lite)` |   |   |   |
| [Gemini 3.1 Flash Image](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-flash-image) preview  `(gemini-3.1-flash-image-preview)` |   |   |   |
| [Gemini 3.1 Pro](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-pro) preview  `(gemini-3.1-pro-preview)` |   |   |   |
| [Gemini 3 Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-flash) preview  `(gemini-3-flash-preview)` |   |   |   |
| [Gemini 3 Pro Image](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-pro-image-preview) preview  `(gemini-3-pro-image-preview)` |   |   |   |
| [Gemini 2.5 Pro](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-pro)  `(gemini-2.5-pro)` |   |   |   |
| [Gemini 2.5 Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash) preview  `(gemini-2.5-flash-preview-09-2025)` |   |   |   |
| [Gemini 2.5 Flash-Lite](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash-lite) preview  `(gemini-2.5-flash-lite-preview-09-2025)` |   |   |   |
| [Gemini 2.5 Flash Image](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash-image)  `(gemini-2.5-flash-image)` |   |   |   |
| [Gemini 2.5 Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash)  `(gemini-2.5-flash)` |   |   |   |
| [Gemini 2.5 Flash-Lite](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash-lite)  `(gemini-2.5-flash-lite)` |   |   |   |
| [Gemini 2.5 Flash with Gemini Live API native audio](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash-live-api)  `(gemini-live-2.5-flash-native-audio)` |   |   |   |
| Embeddings models ||||
| [Gemini Embedding 2](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/embedding-2)  `(gemini-embedding-2)` |   |   |   |
| Gemini Embedding  `(gemini-embedding-001)` |   |   |   |
| Embeddings for Text |   |   |   |
| Embeddings for Multimodal |   |   |   |
| Veo on Gemini Enterprise Agent Platform models ||||
| [Veo 2 Generate](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/2-0-generate#2.0-generate-001)  `(veo-2.0-generate-001)` |   |   |   |
| [Veo 2 Generate](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/2-0-generate#2.0-generate-exp) preview  `(veo-2.0-generate-exp)` |   |   |   |
| [Veo 2 Generate](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/2-0-generate#2.0-generate-preview) preview  `(veo-2.0-generate-preview)` |   |   |   |
| [Veo 3 Generate](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-0-generate#3.0-generate-preview) preview  `(veo-3.0-generate-preview)` |   |   |   |
| [Veo 3 Generate](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-0-generate#3.0-fast-generate-preview) preview  `(veo-3.0-fast-generate-preview)` |   |   |   |
| [Veo 3 Generate](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-0-generate#3.0-generate-001)  `(veo-3.0-generate-001)` |   |   |   |
| [Veo 3 Fast Generate](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-0-generate#3.0-fast-generate-001)  `(veo-3.0-fast-generate-001)` |   |   |   |
| [Veo 3.1 Generate](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-1-generate#3.1-generate-preview) preview  `(veo-3.1-generate-preview)` |   |   |   |
| [Veo 3.1 Fast Generate](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-1-generate#3.1-fast-generate-preview) preview  `(veo-3.1-fast-generate-preview)` |   |   |   |
| [Veo 3.1 Generate](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-1-generate#3.1-generate-001)  `(veo-3.1-generate-001)` |   |   |   |
| [Veo 3.1 Fast Generate](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-1-generate#3.1-fast-generate-001)  `(veo-3.1-fast-generate-001)` |   |   |   |
| [Veo 3.1 Lite Generate](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-1-generate#3.1-lite-generate-001-preview) preview  `(veo-3.1-lite-generate-001)` |   |   |   |
| Speech-to-Text and Text-to-Speech models ||||
| [Chirp 3: Transcription](https://docs.cloud.google.com/speech-to-text/docs/models/chirp-3)  `(chirp_3)` |   |   |   |
| [Chirp 3: HD Voices](https://docs.cloud.google.com/text-to-speech/docs/chirp3-hd) |   |   |   |
| [Chirp 3: Instant Custom Voice](https://docs.cloud.google.com/text-to-speech/docs/chirp3-instant-custom-voice) |   |   |   |
| [Chirp 2: Transcription](https://docs.cloud.google.com/speech-to-text/docs/models/chirp-2)  `(chirp_2)` |   |   |   |
| Gemini 2.5 Pro TTS  `(gemini-2.5-pro-tts)` |   |   |   |
| Gemini 2.5 Flash TTS  `(gemini-2.5-flash-tts)` |   |   |   |
| Gemini 2.5 Flash Lite Preview TTS preview  `(gemini-2.5-flash-lite-preview-tts)` |   |   |   |

## Google Cloud partner model endpoint locations

Google serves requests from the region that you specified. For some models,
Google also offers a global endpoint to improve overall availability and reduce
error rates. The global endpoint can have a separate set of quotas from the
regional endpoint and doesn't support data residency requirements. For more
information, see the "Regional and global endpoint" section in [Gemini Enterprise Agent Platform partner models for
MaaS](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/partner-models/use-partner-models).

Partner model endpoints for Agent Platform are available in
the following regions:

### Global

|   | Global (global) |
|---|---|
| Anthropic models ||
| Claude Sonnet 5 |   |
| Claude Fable 5 |   |
| Claude Opus 4.8 |   |
| Claude Opus 4.7 |   |
| Claude Opus 4.6 |   |
| Claude Opus 4.5 |   |
| Claude Sonnet 4.6 |   |
| Claude Sonnet 4.5 |   |
| Claude Opus 4.1 |   |
| Claude Haiku 4.5 |   |
| Claude Opus 4 |   |
| Claude Sonnet 4 |   |
| Anthropic's Claude 3.7 Sonnet |   |
| Anthropic's Claude 3.5 Haiku |   |
| Anthropic's Claude 3 Haiku (deprecated) |   |
| Mistral models ||
| Mistral Medium 3 |   |
| Mistral OCR (25.05) |   |
| Mistral Small 3.1 (25.03) |   |
| Mistral Large (24.07) |   |
| Codestral 2 |   |
| Codestral (24.05) |   |
| Grok models ||
| Grok 4.20 (Reasoning) |   |
| Grok 4.20 (Non-reasoning) |   |
| Grok 4.1 Fast (Reasoning) |   |
| Grok 4.1 Fast (Non-reasoning) |   |

### Multi-region

|   | United States multi-region (us) | European Union multi-region (eu) |
|---|---|---|
| Anthropic models |||
| Claude Sonnet 5 |   |   |
| Claude Fable 5 |   |   |
| Claude Opus 4.8 |   |   |
| Claude Opus 4.7 |   |   |
| Claude Opus 4.6 |   |   |
| Claude Opus 4.5 |   |   |
| Claude Sonnet 4.6 |   |   |
| Claude Sonnet 4.5 |   |   |
| Claude Opus 4.1 |   |   |
| Claude Haiku 4.5 |   |   |
| Claude Opus 4 |   |   |
| Claude Sonnet 4 |   |   |
| Anthropic's Claude 3.7 Sonnet |   |   |
| Anthropic's Claude 3.5 Haiku |   |   |
| Anthropic's Claude 3 Haiku (deprecated) |   |   |
| Mistral models |||
| Mistral Medium 3 |   |   |
| Mistral OCR (25.05) |   |   |
| Mistral Small 3.1 (25.03) |   |   |
| Mistral Large (24.07) |   |   |
| Codestral 2 |   |   |
| Codestral (24.05) |   |   |
| Grok models |||
| Grok 4.20 (Reasoning) |   |   |
| Grok 4.20 (Non-reasoning) |   |   |
| Grok 4.1 Fast (Reasoning) |   |   |
| Grok 4.1 Fast (Non-reasoning) |   |   |

### United States

|   | Oregon (us-west1) | Las Vegas (us-west4) | Iowa (us-central1) | South Carolina (us-east1) | N. Virginia (us-east4) | Columbus (us-east5) | Dallas (us-south1) |
|---|---|---|---|---|---|---|---|
| Anthropic models ||||||||
| Claude Sonnet 5 |   |   |   |   |   |   |   |
| Claude Fable 5 |   |   |   |   |   |   |   |
| Claude Opus 4.8 |   |   |   |   |   |   |   |
| Claude Opus 4.7 |   |   |   |   |   |   |   |
| Claude Opus 4.6 |   |   |   |   |   |   |   |
| Claude Opus 4.5 |   |   |   |   |   |   |   |
| Claude Sonnet 4.6 |   |   |   |   |   |   |   |
| Claude Sonnet 4.5 |   |   |   |   |   |   |   |
| Claude Opus 4.1 |   |   |   |   |   |   |   |
| Claude Haiku 4.5 |   |   |   |   |   |   |   |
| Claude Opus 4 |   |   |   |   |   |   |   |
| Claude Sonnet 4 |   |   |   |   |   |   |   |
| Anthropic's Claude 3.7 Sonnet |   |   |   |   |   |   |   |
| Anthropic's Claude 3.5 Haiku |   |   |   |   |   |   |   |
| Anthropic's Claude 3 Haiku (deprecated) |   |   |   |   |   |   |   |
| Mistral models ||||||||
| Mistral Medium 3 |   |   |   |   |   |   |   |
| Mistral OCR (25.05) |   |   |   |   |   |   |   |
| Mistral Small 3.1 (25.03) |   |   |   |   |   |   |   |
| Mistral Large (24.07) |   |   |   |   |   |   |   |
| Codestral 2 |   |   |   |   |   |   |   |
| Codestral (24.05) |   |   |   |   |   |   |   |
| Grok models ||||||||
| Grok 4.20 (Reasoning) |   |   |   |   |   |   |   |
| Grok 4.20 (Non-reasoning) |   |   |   |   |   |   |   |
| Grok 4.1 Fast (Reasoning) |   |   |   |   |   |   |   |
| Grok 4.1 Fast (Non-reasoning) |   |   |   |   |   |   |   |

### Americas

|   | Montréal (northamerica-northeast1) | São Paulo (southamerica-east1) |
|---|---|---|
| Anthropic models |||
| Claude Sonnet 5 |   |   |
| Claude Fable 5 |   |   |
| Claude Opus 4.8 |   |   |
| Claude Opus 4.7 |   |   |
| Claude Opus 4.6 |   |   |
| Claude Opus 4.5 |   |   |
| Claude Sonnet 4.6 |   |   |
| Claude Sonnet 4.5 |   |   |
| Claude Opus 4.1 |   |   |
| Claude Haiku 4.5 |   |   |
| Claude Opus 4 |   |   |
| Claude Sonnet 4 |   |   |
| Anthropic's Claude 3.7 Sonnet |   |   |
| Anthropic's Claude 3.5 Haiku |   |   |
| Anthropic's Claude 3 Haiku (deprecated) |   |   |
| Mistral models |||
| Mistral Medium 3 |   |   |
| Mistral OCR (25.05) |   |   |
| Mistral Small 3.1 (25.03) |   |   |
| Mistral Large (24.07) |   |   |
| Codestral 2 |   |   |
| Codestral (24.05) |   |   |
| Grok models |||
| Grok 4.20 (Reasoning) |   |   |
| Grok 4.20 (Non-reasoning) |   |   |
| Grok 4.1 Fast (Reasoning) |   |   |
| Grok 4.1 Fast (Non-reasoning) |   |   |

### Europe

|   | London (europe-west2) | Belgium (europe-west1) | Netherlands (europe-west4) | Zürich (europe-west6) | Frankfurt (europe-west3) | Finland (europe-north1) | Warsaw (europe-central2) | Milan (europe-west8) | Madrid (europe-southwest1) | Paris (europe-west9) |
|---|---|---|---|---|---|---|---|---|---|---|
| Anthropic models |||||||||||
| Claude Sonnet 5 |   |   |   |   |   |   |   |   |   |   |
| Claude Fable 5 |   |   |   |   |   |   |   |   |   |   |
| Claude Opus 4.8 |   |   |   |   |   |   |   |   |   |   |
| Claude Opus 4.7 |   |   |   |   |   |   |   |   |   |   |
| Claude Opus 4.6 |   |   |   |   |   |   |   |   |   |   |
| Claude Opus 4.5 |   |   |   |   |   |   |   |   |   |   |
| Claude Sonnet 4.6 |   |   |   |   |   |   |   |   |   |   |
| Claude Sonnet 4.5 |   |   |   |   |   |   |   |   |   |   |
| Claude Opus 4.1 |   |   |   |   |   |   |   |   |   |   |
| Claude Haiku 4.5 |   |   |   |   |   |   |   |   |   |   |
| Claude Opus 4 |   |   |   |   |   |   |   |   |   |   |
| Claude Sonnet 4 |   |   |   |   |   |   |   |   |   |   |
| Anthropic's Claude 3.7 Sonnet |   |   |   |   |   |   |   |   |   |   |
| Anthropic's Claude 3.5 Haiku |   |   |   |   |   |   |   |   |   |   |
| Anthropic's Claude 3 Haiku (deprecated) |   |   |   |   |   |   |   |   |   |   |
| Mistral models |||||||||||
| Mistral Medium 3 |   |   |   |   |   |   |   |   |   |   |
| Mistral OCR (25.05) |   |   |   |   |   |   |   |   |   |   |
| Mistral Small 3.1 (25.03) |   |   |   |   |   |   |   |   |   |   |
| Mistral Large (24.07) |   |   |   |   |   |   |   |   |   |   |
| Codestral 2 |   |   |   |   |   |   |   |   |   |   |
| Codestral (24.05) |   |   |   |   |   |   |   |   |   |   |
| Grok models |||||||||||
| Grok 4.20 (Reasoning) |   |   |   |   |   |   |   |   |   |   |
| Grok 4.20 (Non-reasoning) |   |   |   |   |   |   |   |   |   |   |
| Grok 4.1 Fast (Reasoning) |   |   |   |   |   |   |   |   |   |   |
| Grok 4.1 Fast (Non-reasoning) |   |   |   |   |   |   |   |   |   |   |

### Asia Pacific

|   | Mumbai (asia-south1) | Singapore (asia-southeast1) | Hong Kong (asia-east2) | Taiwan (asia-east1) | Tokyo (asia-northeast1) | Sydney (australia-southeast1) | Seoul (asia-northeast3) |
|---|---|---|---|---|---|---|---|
| Anthropic models ||||||||
| Claude Sonnet 5 |   |   |   |   |   |   |   |
| Claude Fable 5 |   |   |   |   |   |   |   |
| Claude Opus 4.8 |   |   |   |   |   |   |   |
| Claude Opus 4.7 |   |   |   |   |   |   |   |
| Claude Opus 4.6 |   |   |   |   |   |   |   |
| Claude Opus 4.5 |   |   |   |   |   |   |   |
| Claude Sonnet 4.6 |   |   |   |   |   |   |   |
| Claude Sonnet 4.5 |   |   |   |   |   |   |   |
| Claude Opus 4.1 |   |   |   |   |   |   |   |
| Claude Haiku 4.5 |   |   |   |   |   |   |   |
| Claude Opus 4 |   |   |   |   |   |   |   |
| Claude Sonnet 4 |   |   |   |   |   |   |   |
| Anthropic's Claude 3.7 Sonnet |   |   |   |   |   |   |   |
| Anthropic's Claude 3.5 Haiku |   |   |   |   |   |   |   |
| Anthropic's Claude 3 Haiku (deprecated) |   |   |   |   |   |   |   |
| Mistral models ||||||||
| Mistral Medium 3 |   |   |   |   |   |   |   |
| Mistral OCR (25.05) |   |   |   |   |   |   |   |
| Mistral Small 3.1 (25.03) |   |   |   |   |   |   |   |
| Mistral Large (24.07) |   |   |   |   |   |   |   |
| Codestral 2 |   |   |   |   |   |   |   |
| Codestral (24.05) |   |   |   |   |   |   |   |
| Grok models ||||||||
| Grok 4.20 (Reasoning) |   |   |   |   |   |   |   |
| Grok 4.20 (Non-reasoning) |   |   |   |   |   |   |   |
| Grok 4.1 Fast (Reasoning) |   |   |   |   |   |   |   |
| Grok 4.1 Fast (Non-reasoning) |   |   |   |   |   |   |   |

### Middle East

|   | Tel Aviv (me-west1) | Doha (me-central1) | Dammam (me-central2) |
|---|---|---|---|
| Anthropic models ||||
| Claude Sonnet 5 |   |   |   |
| Claude Fable 5 |   |   |   |
| Claude Opus 4.8 |   |   |   |
| Claude Opus 4.7 |   |   |   |
| Claude Opus 4.6 |   |   |   |
| Claude Opus 4.5 |   |   |   |
| Claude Sonnet 4.6 |   |   |   |
| Claude Sonnet 4.5 |   |   |   |
| Claude Opus 4.1 |   |   |   |
| Claude Haiku 4.5 |   |   |   |
| Claude Opus 4 |   |   |   |
| Claude Sonnet 4 |   |   |   |
| Anthropic's Claude 3.7 Sonnet |   |   |   |
| Anthropic's Claude 3.5 Haiku |   |   |   |
| Anthropic's Claude 3 Haiku (deprecated) |   |   |   |
| Mistral models ||||
| Mistral Medium 3 |   |   |   |
| Mistral OCR (25.05) |   |   |   |
| Mistral Small 3.1 (25.03) |   |   |   |
| Mistral Large (24.07) |   |   |   |
| Codestral 2 |   |   |   |
| Codestral (24.05) |   |   |   |
| Grok models ||||
| Grok 4.20 (Reasoning) |   |   |   |
| Grok 4.20 (Non-reasoning) |   |   |   |
| Grok 4.1 Fast (Reasoning) |   |   |   |
| Grok 4.1 Fast (Non-reasoning) |   |   |   |

> [!NOTE]
> **Note:** Support for Taiwan (`asia-east1`) is scheduled for deprecation on February 27, 2025.

## Google Cloud open model endpoint locations

Google serves requests from the region that you specified. For some models,
Google also offers a global endpoint to improve overall availability and reduce
error rates. The global endpoint can have a separate set of quotas from the
regional endpoint and doesn't support data residency requirements. For more
information, see the "Regional and global endpoint" section in [Gemini Enterprise Agent Platform open models for
MaaS](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/maas/use-open-models).

Open model endpoints for Agent Platform are available in
the following regions:

### Global

|   | Global (global) |
|---|---|
| Deepseek models ||
| [DeepSeek-OCR](https://console.cloud.google.com/agent-platform/publishers/deepseek-ai/model-garden/deepseek-ocr-maas)  `(deepseek-ocr-maas)` |   |
| [DeepSeek-V3.2](https://console.cloud.google.com/agent-platform/publishers/deepseek-ai/model-garden/deepseek-v3.2-maas)  `(deepseek-v3.2-maas)` |   |
| [DeepSeek-V3.1](https://console.cloud.google.com/agent-platform/publishers/deepseek-ai/model-garden/deepseek-v3.1-maas)  `(deepseek-v3.1-maas)` |   |
| [DeepSeek R1 (0528)](https://console.cloud.google.com/agent-platform/publishers/deepseek-ai/model-garden/deepseek-r1-0528-maas)  `(deepseek-r1-0528-maas)` |   |
| ZAI.org models ||
| [GLM 4.7](https://console.cloud.google.com/agent-platform/publishers/zai-org/model-garden/glm-4.7-maas)  `(glm-4.7-maas)` |   |
| [GLM 5](https://console.cloud.google.com/agent-platform/publishers/zai-org/model-garden/glm-5-maas)  `(glm-5-maas)` |   |
| OpenAI models ||
| [gpt-oss 120B](https://console.cloud.google.com/agent-platform/publishers/openai/model-garden/gpt-oss-120b-maas)  `(gpt-oss-120b-maas)` |   |
| [gpt-oss 20B](https://console.cloud.google.com/agent-platform/publishers/openai/model-garden/gpt-oss-20b-maas)  `(gpt-oss-20b-maas)` |   |
| Moonshot AI models ||
| [Kimi K2 Thinking](https://console.cloud.google.com/agent-platform/publishers/moonshotai/model-garden/kimi-k2-thinking-maas)  `(kimi-k2-thinking-maas)` |   |
| Llama models ||
| Llama 3.3 70B |   |
| Llama 4 Maverick 17B-128E |   |
| Llama 4 Scout 17B-16E |   |
| MiniMax models ||
| [MiniMax M2](https://console.cloud.google.com/agent-platform/publishers/minimaxai/model-garden/minimax-m2-maas)  `(minimax-m2-maas)` |   |
| Qwen models ||
| [Qwen3-Next-80B Thinking](https://console.cloud.google.com/agent-platform/publishers/qwen/model-garden/qwen3-next-80b-a3b-thinking-maas)  `(qwen3-next-80b-a3b-thinking-maas)` |   |
| [Qwen3-Next-80B Instruct](https://console.cloud.google.com/agent-platform/publishers/qwen/model-garden/qwen3-next-80b-a3b-instruct-maas)  `(qwen3-next-80b-a3b-instruct-maas)` |   |
| [Qwen3 Coder](https://console.cloud.google.com/agent-platform/publishers/qwen/model-garden/qwen3-coder-480b-a35b-instruct-maas)  `(qwen3-coder-480b-a35b-instruct-maas)` |   |
| [Qwen3 235B](https://console.cloud.google.com/agent-platform/publishers/qwen/model-garden/qwen3-235b-a22b-instruct-2507-maas)  `(qwen3-235b-a22b-instruct-2507-maas)` |   |
| e5 models ||
| [Multilingual E5 Small](https://console.cloud.google.com/agent-platform/publishers/intfloat/model-garden/multilingual-e5-large-instruct-maas)  `(multilingual-e5-small-maas)` |   |
| [Multilingual E5 Large](https://console.cloud.google.com/agent-platform/publishers/intfloat/model-garden/multilingual-e5-large-instruct-maas)  `(multilingual-e5-large-instruct-maas)` |   |

### Multi-region

|   | United States multi-region (us) | European Union multi-region (eu) |
|---|---|---|
| Deepseek models |||
| [DeepSeek-OCR](https://console.cloud.google.com/agent-platform/publishers/deepseek-ai/model-garden/deepseek-ocr-maas)  `(deepseek-ocr-maas)` |   |   |
| [DeepSeek-V3.2](https://console.cloud.google.com/agent-platform/publishers/deepseek-ai/model-garden/deepseek-v3.2-maas)  `(deepseek-v3.2-maas)` |   |   |
| [DeepSeek-V3.1](https://console.cloud.google.com/agent-platform/publishers/deepseek-ai/model-garden/deepseek-v3.1-maas)  `(deepseek-v3.1-maas)` |   |   |
| [DeepSeek R1 (0528)](https://console.cloud.google.com/agent-platform/publishers/deepseek-ai/model-garden/deepseek-r1-0528-maas)  `(deepseek-r1-0528-maas)` |   |   |
| ZAI.org models |||
| [GLM 4.7](https://console.cloud.google.com/agent-platform/publishers/zai-org/model-garden/glm-4.7-maas)  `(glm-4.7-maas)` |   |   |
| [GLM 5](https://console.cloud.google.com/agent-platform/publishers/zai-org/model-garden/glm-5-maas)  `(glm-5-maas)` |   |   |
| OpenAI models |||
| [gpt-oss 120B](https://console.cloud.google.com/agent-platform/publishers/openai/model-garden/gpt-oss-120b-maas)  `(gpt-oss-120b-maas)` |   |   |
| [gpt-oss 20B](https://console.cloud.google.com/agent-platform/publishers/openai/model-garden/gpt-oss-20b-maas)  `(gpt-oss-20b-maas)` |   |   |
| Moonshot AI models |||
| [Kimi K2 Thinking](https://console.cloud.google.com/agent-platform/publishers/moonshotai/model-garden/kimi-k2-thinking-maas)  `(kimi-k2-thinking-maas)` |   |   |
| Llama models |||
| Llama 3.3 70B |   |   |
| Llama 4 Maverick 17B-128E |   |   |
| Llama 4 Scout 17B-16E |   |   |
| MiniMax models |||
| [MiniMax M2](https://console.cloud.google.com/agent-platform/publishers/minimaxai/model-garden/minimax-m2-maas)  `(minimax-m2-maas)` |   |   |
| Qwen models |||
| [Qwen3-Next-80B Thinking](https://console.cloud.google.com/agent-platform/publishers/qwen/model-garden/qwen3-next-80b-a3b-thinking-maas)  `(qwen3-next-80b-a3b-thinking-maas)` |   |   |
| [Qwen3-Next-80B Instruct](https://console.cloud.google.com/agent-platform/publishers/qwen/model-garden/qwen3-next-80b-a3b-instruct-maas)  `(qwen3-next-80b-a3b-instruct-maas)` |   |   |
| [Qwen3 Coder](https://console.cloud.google.com/agent-platform/publishers/qwen/model-garden/qwen3-coder-480b-a35b-instruct-maas)  `(qwen3-coder-480b-a35b-instruct-maas)` |   |   |
| [Qwen3 235B](https://console.cloud.google.com/agent-platform/publishers/qwen/model-garden/qwen3-235b-a22b-instruct-2507-maas)  `(qwen3-235b-a22b-instruct-2507-maas)` |   |   |
| e5 models |||
| [Multilingual E5 Small](https://console.cloud.google.com/agent-platform/publishers/intfloat/model-garden/multilingual-e5-large-instruct-maas)  `(multilingual-e5-small-maas)` |   |   |
| [Multilingual E5 Large](https://console.cloud.google.com/agent-platform/publishers/intfloat/model-garden/multilingual-e5-large-instruct-maas)  `(multilingual-e5-large-instruct-maas)` |   |   |

### United States

|   | Oregon (us-west1) | Las Vegas (us-west4) | Iowa (us-central1) | South Carolina (us-east1) | N. Virginia (us-east4) | Columbus (us-east5) | Dallas (us-south1) |
|---|---|---|---|---|---|---|---|
| Deepseek models ||||||||
| [DeepSeek-OCR](https://console.cloud.google.com/agent-platform/publishers/deepseek-ai/model-garden/deepseek-ocr-maas)  `(deepseek-ocr-maas)` |   |   |   |   |   |   |   |
| [DeepSeek-V3.2](https://console.cloud.google.com/agent-platform/publishers/deepseek-ai/model-garden/deepseek-v3.2-maas)  `(deepseek-v3.2-maas)` |   |   |   |   |   |   |   |
| [DeepSeek-V3.1](https://console.cloud.google.com/agent-platform/publishers/deepseek-ai/model-garden/deepseek-v3.1-maas)  `(deepseek-v3.1-maas)` |   |   |   |   |   |   |   |
| [DeepSeek R1 (0528)](https://console.cloud.google.com/agent-platform/publishers/deepseek-ai/model-garden/deepseek-r1-0528-maas)  `(deepseek-r1-0528-maas)` |   |   |   |   |   |   |   |
| ZAI.org models ||||||||
| [GLM 4.7](https://console.cloud.google.com/agent-platform/publishers/zai-org/model-garden/glm-4.7-maas)  `(glm-4.7-maas)` |   |   |   |   |   |   |   |
| [GLM 5](https://console.cloud.google.com/agent-platform/publishers/zai-org/model-garden/glm-5-maas)  `(glm-5-maas)` |   |   |   |   |   |   |   |
| OpenAI models ||||||||
| [gpt-oss 120B](https://console.cloud.google.com/agent-platform/publishers/openai/model-garden/gpt-oss-120b-maas)  `(gpt-oss-120b-maas)` |   |   |   |   |   |   |   |
| [gpt-oss 20B](https://console.cloud.google.com/agent-platform/publishers/openai/model-garden/gpt-oss-20b-maas)  `(gpt-oss-20b-maas)` |   |   |   |   |   |   |   |
| Moonshot AI models ||||||||
| [Kimi K2 Thinking](https://console.cloud.google.com/agent-platform/publishers/moonshotai/model-garden/kimi-k2-thinking-maas)  `(kimi-k2-thinking-maas)` |   |   |   |   |   |   |   |
| Llama models ||||||||
| Llama 3.3 70B |   |   |   |   |   |   |   |
| Llama 4 Maverick 17B-128E |   |   |   |   |   |   |   |
| Llama 4 Scout 17B-16E |   |   |   |   |   |   |   |
| MiniMax models ||||||||
| [MiniMax M2](https://console.cloud.google.com/agent-platform/publishers/minimaxai/model-garden/minimax-m2-maas)  `(minimax-m2-maas)` |   |   |   |   |   |   |   |
| Qwen models ||||||||
| [Qwen3-Next-80B Thinking](https://console.cloud.google.com/agent-platform/publishers/qwen/model-garden/qwen3-next-80b-a3b-thinking-maas)  `(qwen3-next-80b-a3b-thinking-maas)` |   |   |   |   |   |   |   |
| [Qwen3-Next-80B Instruct](https://console.cloud.google.com/agent-platform/publishers/qwen/model-garden/qwen3-next-80b-a3b-instruct-maas)  `(qwen3-next-80b-a3b-instruct-maas)` |   |   |   |   |   |   |   |
| [Qwen3 Coder](https://console.cloud.google.com/agent-platform/publishers/qwen/model-garden/qwen3-coder-480b-a35b-instruct-maas)  `(qwen3-coder-480b-a35b-instruct-maas)` |   |   |   |   |   |   |   |
| [Qwen3 235B](https://console.cloud.google.com/agent-platform/publishers/qwen/model-garden/qwen3-235b-a22b-instruct-2507-maas)  `(qwen3-235b-a22b-instruct-2507-maas)` |   |   |   |   |   |   |   |
| e5 models ||||||||
| [Multilingual E5 Small](https://console.cloud.google.com/agent-platform/publishers/intfloat/model-garden/multilingual-e5-large-instruct-maas)  `(multilingual-e5-small-maas)` |   |   |   |   |   |   |   |
| [Multilingual E5 Large](https://console.cloud.google.com/agent-platform/publishers/intfloat/model-garden/multilingual-e5-large-instruct-maas)  `(multilingual-e5-large-instruct-maas)` |   |   |   |   |   |   |   |

### Americas

|   | Montréal (northamerica-northeast1) | São Paulo (southamerica-east1) |
|---|---|---|
| Deepseek models |||
| [DeepSeek-OCR](https://console.cloud.google.com/agent-platform/publishers/deepseek-ai/model-garden/deepseek-ocr-maas)  `(deepseek-ocr-maas)` |   |   |
| [DeepSeek-V3.2](https://console.cloud.google.com/agent-platform/publishers/deepseek-ai/model-garden/deepseek-v3.2-maas)  `(deepseek-v3.2-maas)` |   |   |
| [DeepSeek-V3.1](https://console.cloud.google.com/agent-platform/publishers/deepseek-ai/model-garden/deepseek-v3.1-maas)  `(deepseek-v3.1-maas)` |   |   |
| [DeepSeek R1 (0528)](https://console.cloud.google.com/agent-platform/publishers/deepseek-ai/model-garden/deepseek-r1-0528-maas)  `(deepseek-r1-0528-maas)` |   |   |
| ZAI.org models |||
| [GLM 4.7](https://console.cloud.google.com/agent-platform/publishers/zai-org/model-garden/glm-4.7-maas)  `(glm-4.7-maas)` |   |   |
| [GLM 5](https://console.cloud.google.com/agent-platform/publishers/zai-org/model-garden/glm-5-maas)  `(glm-5-maas)` |   |   |
| OpenAI models |||
| [gpt-oss 120B](https://console.cloud.google.com/agent-platform/publishers/openai/model-garden/gpt-oss-120b-maas)  `(gpt-oss-120b-maas)` |   |   |
| [gpt-oss 20B](https://console.cloud.google.com/agent-platform/publishers/openai/model-garden/gpt-oss-20b-maas)  `(gpt-oss-20b-maas)` |   |   |
| Moonshot AI models |||
| [Kimi K2 Thinking](https://console.cloud.google.com/agent-platform/publishers/moonshotai/model-garden/kimi-k2-thinking-maas)  `(kimi-k2-thinking-maas)` |   |   |
| Llama models |||
| Llama 3.3 70B |   |   |
| Llama 4 Maverick 17B-128E |   |   |
| Llama 4 Scout 17B-16E |   |   |
| MiniMax models |||
| [MiniMax M2](https://console.cloud.google.com/agent-platform/publishers/minimaxai/model-garden/minimax-m2-maas)  `(minimax-m2-maas)` |   |   |
| Qwen models |||
| [Qwen3-Next-80B Thinking](https://console.cloud.google.com/agent-platform/publishers/qwen/model-garden/qwen3-next-80b-a3b-thinking-maas)  `(qwen3-next-80b-a3b-thinking-maas)` |   |   |
| [Qwen3-Next-80B Instruct](https://console.cloud.google.com/agent-platform/publishers/qwen/model-garden/qwen3-next-80b-a3b-instruct-maas)  `(qwen3-next-80b-a3b-instruct-maas)` |   |   |
| [Qwen3 Coder](https://console.cloud.google.com/agent-platform/publishers/qwen/model-garden/qwen3-coder-480b-a35b-instruct-maas)  `(qwen3-coder-480b-a35b-instruct-maas)` |   |   |
| [Qwen3 235B](https://console.cloud.google.com/agent-platform/publishers/qwen/model-garden/qwen3-235b-a22b-instruct-2507-maas)  `(qwen3-235b-a22b-instruct-2507-maas)` |   |   |
| e5 models |||
| [Multilingual E5 Small](https://console.cloud.google.com/agent-platform/publishers/intfloat/model-garden/multilingual-e5-large-instruct-maas)  `(multilingual-e5-small-maas)` |   |   |
| [Multilingual E5 Large](https://console.cloud.google.com/agent-platform/publishers/intfloat/model-garden/multilingual-e5-large-instruct-maas)  `(multilingual-e5-large-instruct-maas)` |   |   |

### Europe

|   | London (europe-west2) | Belgium (europe-west1) | Netherlands (europe-west4) | Zürich (europe-west6) | Frankfurt (europe-west3) | Finland (europe-north1) | Warsaw (europe-central2) | Milan (europe-west8) | Madrid (europe-southwest1) | Paris (europe-west9) |
|---|---|---|---|---|---|---|---|---|---|---|
| Deepseek models |||||||||||
| [DeepSeek-OCR](https://console.cloud.google.com/agent-platform/publishers/deepseek-ai/model-garden/deepseek-ocr-maas)  `(deepseek-ocr-maas)` |   |   |   |   |   |   |   |   |   |   |
| [DeepSeek-V3.2](https://console.cloud.google.com/agent-platform/publishers/deepseek-ai/model-garden/deepseek-v3.2-maas)  `(deepseek-v3.2-maas)` |   |   |   |   |   |   |   |   |   |   |
| [DeepSeek-V3.1](https://console.cloud.google.com/agent-platform/publishers/deepseek-ai/model-garden/deepseek-v3.1-maas)  `(deepseek-v3.1-maas)` |   |   |   |   |   |   |   |   |   |   |
| [DeepSeek R1 (0528)](https://console.cloud.google.com/agent-platform/publishers/deepseek-ai/model-garden/deepseek-r1-0528-maas)  `(deepseek-r1-0528-maas)` |   |   |   |   |   |   |   |   |   |   |
| ZAI.org models |||||||||||
| [GLM 4.7](https://console.cloud.google.com/agent-platform/publishers/zai-org/model-garden/glm-4.7-maas)  `(glm-4.7-maas)` |   |   |   |   |   |   |   |   |   |   |
| [GLM 5](https://console.cloud.google.com/agent-platform/publishers/zai-org/model-garden/glm-5-maas)  `(glm-5-maas)` |   |   |   |   |   |   |   |   |   |   |
| OpenAI models |||||||||||
| [gpt-oss 120B](https://console.cloud.google.com/agent-platform/publishers/openai/model-garden/gpt-oss-120b-maas)  `(gpt-oss-120b-maas)` |   |   |   |   |   |   |   |   |   |   |
| [gpt-oss 20B](https://console.cloud.google.com/agent-platform/publishers/openai/model-garden/gpt-oss-20b-maas)  `(gpt-oss-20b-maas)` |   |   |   |   |   |   |   |   |   |   |
| Moonshot AI models |||||||||||
| [Kimi K2 Thinking](https://console.cloud.google.com/agent-platform/publishers/moonshotai/model-garden/kimi-k2-thinking-maas)  `(kimi-k2-thinking-maas)` |   |   |   |   |   |   |   |   |   |   |
| Llama models |||||||||||
| Llama 3.3 70B |   |   |   |   |   |   |   |   |   |   |
| Llama 4 Maverick 17B-128E |   |   |   |   |   |   |   |   |   |   |
| Llama 4 Scout 17B-16E |   |   |   |   |   |   |   |   |   |   |
| MiniMax models |||||||||||
| [MiniMax M2](https://console.cloud.google.com/agent-platform/publishers/minimaxai/model-garden/minimax-m2-maas)  `(minimax-m2-maas)` |   |   |   |   |   |   |   |   |   |   |
| Qwen models |||||||||||
| [Qwen3-Next-80B Thinking](https://console.cloud.google.com/agent-platform/publishers/qwen/model-garden/qwen3-next-80b-a3b-thinking-maas)  `(qwen3-next-80b-a3b-thinking-maas)` |   |   |   |   |   |   |   |   |   |   |
| [Qwen3-Next-80B Instruct](https://console.cloud.google.com/agent-platform/publishers/qwen/model-garden/qwen3-next-80b-a3b-instruct-maas)  `(qwen3-next-80b-a3b-instruct-maas)` |   |   |   |   |   |   |   |   |   |   |
| [Qwen3 Coder](https://console.cloud.google.com/agent-platform/publishers/qwen/model-garden/qwen3-coder-480b-a35b-instruct-maas)  `(qwen3-coder-480b-a35b-instruct-maas)` |   |   |   |   |   |   |   |   |   |   |
| [Qwen3 235B](https://console.cloud.google.com/agent-platform/publishers/qwen/model-garden/qwen3-235b-a22b-instruct-2507-maas)  `(qwen3-235b-a22b-instruct-2507-maas)` |   |   |   |   |   |   |   |   |   |   |
| e5 models |||||||||||
| [Multilingual E5 Small](https://console.cloud.google.com/agent-platform/publishers/intfloat/model-garden/multilingual-e5-large-instruct-maas)  `(multilingual-e5-small-maas)` |   |   |   |   |   |   |   |   |   |   |
| [Multilingual E5 Large](https://console.cloud.google.com/agent-platform/publishers/intfloat/model-garden/multilingual-e5-large-instruct-maas)  `(multilingual-e5-large-instruct-maas)` |   |   |   |   |   |   |   |   |   |   |

### Asia Pacific

|   | Mumbai (asia-south1) | Singapore (asia-southeast1) | Hong Kong (asia-east2) | Taiwan (asia-east1) | Tokyo (asia-northeast1) | Sydney (australia-southeast1) | Seoul (asia-northeast3) |
|---|---|---|---|---|---|---|---|
| Deepseek models ||||||||
| [DeepSeek-OCR](https://console.cloud.google.com/agent-platform/publishers/deepseek-ai/model-garden/deepseek-ocr-maas)  `(deepseek-ocr-maas)` |   |   |   |   |   |   |   |
| [DeepSeek-V3.2](https://console.cloud.google.com/agent-platform/publishers/deepseek-ai/model-garden/deepseek-v3.2-maas)  `(deepseek-v3.2-maas)` |   |   |   |   |   |   |   |
| [DeepSeek-V3.1](https://console.cloud.google.com/agent-platform/publishers/deepseek-ai/model-garden/deepseek-v3.1-maas)  `(deepseek-v3.1-maas)` |   |   |   |   |   |   |   |
| [DeepSeek R1 (0528)](https://console.cloud.google.com/agent-platform/publishers/deepseek-ai/model-garden/deepseek-r1-0528-maas)  `(deepseek-r1-0528-maas)` |   |   |   |   |   |   |   |
| ZAI.org models ||||||||
| [GLM 4.7](https://console.cloud.google.com/agent-platform/publishers/zai-org/model-garden/glm-4.7-maas)  `(glm-4.7-maas)` |   |   |   |   |   |   |   |
| [GLM 5](https://console.cloud.google.com/agent-platform/publishers/zai-org/model-garden/glm-5-maas)  `(glm-5-maas)` |   |   |   |   |   |   |   |
| OpenAI models ||||||||
| [gpt-oss 120B](https://console.cloud.google.com/agent-platform/publishers/openai/model-garden/gpt-oss-120b-maas)  `(gpt-oss-120b-maas)` |   |   |   |   |   |   |   |
| [gpt-oss 20B](https://console.cloud.google.com/agent-platform/publishers/openai/model-garden/gpt-oss-20b-maas)  `(gpt-oss-20b-maas)` |   |   |   |   |   |   |   |
| Moonshot AI models ||||||||
| [Kimi K2 Thinking](https://console.cloud.google.com/agent-platform/publishers/moonshotai/model-garden/kimi-k2-thinking-maas)  `(kimi-k2-thinking-maas)` |   |   |   |   |   |   |   |
| Llama models ||||||||
| Llama 3.3 70B |   |   |   |   |   |   |   |
| Llama 4 Maverick 17B-128E |   |   |   |   |   |   |   |
| Llama 4 Scout 17B-16E |   |   |   |   |   |   |   |
| MiniMax models ||||||||
| [MiniMax M2](https://console.cloud.google.com/agent-platform/publishers/minimaxai/model-garden/minimax-m2-maas)  `(minimax-m2-maas)` |   |   |   |   |   |   |   |
| Qwen models ||||||||
| [Qwen3-Next-80B Thinking](https://console.cloud.google.com/agent-platform/publishers/qwen/model-garden/qwen3-next-80b-a3b-thinking-maas)  `(qwen3-next-80b-a3b-thinking-maas)` |   |   |   |   |   |   |   |
| [Qwen3-Next-80B Instruct](https://console.cloud.google.com/agent-platform/publishers/qwen/model-garden/qwen3-next-80b-a3b-instruct-maas)  `(qwen3-next-80b-a3b-instruct-maas)` |   |   |   |   |   |   |   |
| [Qwen3 Coder](https://console.cloud.google.com/agent-platform/publishers/qwen/model-garden/qwen3-coder-480b-a35b-instruct-maas)  `(qwen3-coder-480b-a35b-instruct-maas)` |   |   |   |   |   |   |   |
| [Qwen3 235B](https://console.cloud.google.com/agent-platform/publishers/qwen/model-garden/qwen3-235b-a22b-instruct-2507-maas)  `(qwen3-235b-a22b-instruct-2507-maas)` |   |   |   |   |   |   |   |
| e5 models ||||||||
| [Multilingual E5 Small](https://console.cloud.google.com/agent-platform/publishers/intfloat/model-garden/multilingual-e5-large-instruct-maas)  `(multilingual-e5-small-maas)` |   |   |   |   |   |   |   |
| [Multilingual E5 Large](https://console.cloud.google.com/agent-platform/publishers/intfloat/model-garden/multilingual-e5-large-instruct-maas)  `(multilingual-e5-large-instruct-maas)` |   |   |   |   |   |   |   |

### Middle East

|   | Tel Aviv (me-west1) | Doha (me-central1) | Dammam (me-central2) |
|---|---|---|---|
| Deepseek models ||||
| [DeepSeek-OCR](https://console.cloud.google.com/agent-platform/publishers/deepseek-ai/model-garden/deepseek-ocr-maas)  `(deepseek-ocr-maas)` |   |   |   |
| [DeepSeek-V3.2](https://console.cloud.google.com/agent-platform/publishers/deepseek-ai/model-garden/deepseek-v3.2-maas)  `(deepseek-v3.2-maas)` |   |   |   |
| [DeepSeek-V3.1](https://console.cloud.google.com/agent-platform/publishers/deepseek-ai/model-garden/deepseek-v3.1-maas)  `(deepseek-v3.1-maas)` |   |   |   |
| [DeepSeek R1 (0528)](https://console.cloud.google.com/agent-platform/publishers/deepseek-ai/model-garden/deepseek-r1-0528-maas)  `(deepseek-r1-0528-maas)` |   |   |   |
| ZAI.org models ||||
| [GLM 4.7](https://console.cloud.google.com/agent-platform/publishers/zai-org/model-garden/glm-4.7-maas)  `(glm-4.7-maas)` |   |   |   |
| [GLM 5](https://console.cloud.google.com/agent-platform/publishers/zai-org/model-garden/glm-5-maas)  `(glm-5-maas)` |   |   |   |
| OpenAI models ||||
| [gpt-oss 120B](https://console.cloud.google.com/agent-platform/publishers/openai/model-garden/gpt-oss-120b-maas)  `(gpt-oss-120b-maas)` |   |   |   |
| [gpt-oss 20B](https://console.cloud.google.com/agent-platform/publishers/openai/model-garden/gpt-oss-20b-maas)  `(gpt-oss-20b-maas)` |   |   |   |
| Moonshot AI models ||||
| [Kimi K2 Thinking](https://console.cloud.google.com/agent-platform/publishers/moonshotai/model-garden/kimi-k2-thinking-maas)  `(kimi-k2-thinking-maas)` |   |   |   |
| Llama models ||||
| Llama 3.3 70B |   |   |   |
| Llama 4 Maverick 17B-128E |   |   |   |
| Llama 4 Scout 17B-16E |   |   |   |
| MiniMax models ||||
| [MiniMax M2](https://console.cloud.google.com/agent-platform/publishers/minimaxai/model-garden/minimax-m2-maas)  `(minimax-m2-maas)` |   |   |   |
| Qwen models ||||
| [Qwen3-Next-80B Thinking](https://console.cloud.google.com/agent-platform/publishers/qwen/model-garden/qwen3-next-80b-a3b-thinking-maas)  `(qwen3-next-80b-a3b-thinking-maas)` |   |   |   |
| [Qwen3-Next-80B Instruct](https://console.cloud.google.com/agent-platform/publishers/qwen/model-garden/qwen3-next-80b-a3b-instruct-maas)  `(qwen3-next-80b-a3b-instruct-maas)` |   |   |   |
| [Qwen3 Coder](https://console.cloud.google.com/agent-platform/publishers/qwen/model-garden/qwen3-coder-480b-a35b-instruct-maas)  `(qwen3-coder-480b-a35b-instruct-maas)` |   |   |   |
| [Qwen3 235B](https://console.cloud.google.com/agent-platform/publishers/qwen/model-garden/qwen3-235b-a22b-instruct-2507-maas)  `(qwen3-235b-a22b-instruct-2507-maas)` |   |   |   |
| e5 models ||||
| [Multilingual E5 Small](https://console.cloud.google.com/agent-platform/publishers/intfloat/model-garden/multilingual-e5-large-instruct-maas)  `(multilingual-e5-small-maas)` |   |   |   |
| [Multilingual E5 Large](https://console.cloud.google.com/agent-platform/publishers/intfloat/model-garden/multilingual-e5-large-instruct-maas)  `(multilingual-e5-large-instruct-maas)` |   |   |   |
