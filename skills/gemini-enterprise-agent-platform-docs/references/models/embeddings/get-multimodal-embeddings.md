> [!NOTE]
> To see an example of multimodal embeddings,
> run the "Intro to multimodal embeddings" notebook in one of the following
> environments:
>
> [!Open in Colab](https://colab.research.google.com/github/GoogleCloudPlatform/generative-ai/blob/main/embeddings/intro_multimodal_embeddings.ipynb)
>
>
> \|
>
> [!Open in Colab Enterprise](https://console.cloud.google.com/agent-platform/colab/import/https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fembeddings%2Fintro_multimodal_embeddings.ipynb)
>
>
> \|
>
> [!Open
> in Agent Platform Workbench](https://console.cloud.google.com/agent-platform/workbench/deploy-notebook?download_url=https://raw.githubusercontent.com/GoogleCloudPlatform/generative-ai/main/embeddings/intro_multimodal_embeddings.ipynb)
>
>
> \|
>
> [!View on GitHub](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/embeddings/intro_multimodal_embeddings.ipynb)

[Video](https://www.youtube.com/watch?v=d4foqxCzRuA)

The multimodal embeddings model generates multi-dimensional vectors based on the
input you provide, which can include a combination of image, text, and video
data. The embedding vectors can then be used for subsequent tasks like image
classification or video content moderation.

Image and text embedding vectors are in the same semantic
space with the same dimensionality. Consequently, these vectors can be used
interchangeably for use cases like searching for images by text or searching for video
by image.

For text-only embedding use cases, we recommend using the Gemini Enterprise Agent Platform
text embedding API instead. For example, the text embedding API might be
better for text-based semantic search, clustering, long-form document analysis,
and other text retrieval or question-answering use cases. For more information,
see [Get text embeddings](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/embeddings/get-text-embeddings).

## Supported models

You can get multimodal embeddings by using the following models:

- `gemini-embedding-2`

- `multimodalembedding@001`

## Best practices

Consider the following input aspects when using the multimodal embeddings model:

- **Text in images** - The model can distinguish text in images, similar to optical character recognition (OCR). If you need to distinguish between a description of the image content and the text within an image, consider using prompt engineering to specify your target content. For example: instead of just "cat", specify "picture of a cat" or "the text 'cat'", depending on your use case.

  |---|---|
  | **the text** 'cat' | ![The word 'cat' is shown in a bold font.](https://docs.cloud.google.com/static/gemini-enterprise-agent-platform/models/embeddings/images/txt-embedding-cat.png) *The word 'cat' rendered in a large, bold font.* |
  | **picture of** a cat | ![A cat sitting on a wooden floor.](https://docs.cloud.google.com/static/gemini-enterprise-agent-platform/models/embeddings/images/img-embedding-cat.jpg) *Image credit: [Manja Vitolic](https://unsplash.com/photos/gKXKBY-C-Dk) on [Unsplash](https://unsplash.com/).* |

- **Embedding similarities** - The dot product of embeddings isn't a calibrated probability. The dot product is a similarity metric and might have different score distributions for different use cases. Consequently, avoid using a fixed value threshold to measure quality. Instead, use ranking approaches for retrieval, or use sigmoid for classification.

## Use `gemini-embedding-2`

The `gemini-embedding-2` model accepts interleaved inputs across image, text, document, audio, and video modalities.

### Specify task instructions to improve performance

> [!NOTE]
> **Note:** You cannot use the `task_type` field to specify an embedding task for the `gemini-embedding-2` model. Instead, include the task as an instruction in your prompt, as detailed in this section. For more information on task types for prior models, see [task types](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/embeddings/task-types).

You can use embeddings for a wide range of tasks, from classification to
document search. Specifying the right task instruction helps optimize the
embeddings for the intended relationships, maximizing accuracy and efficiency.

The following tables show examples of how to format queries and documents for
symmetric and asymmetric use cases using the `gemini-embedding-2`
model.

**Retrieval use cases (Asymmetric format)**

| Use case | Query structure | Document structure |
|---|---|---|
| Search query | `task: search result | query: {content}` | `title: {title} | text: {content}` If there is no title, use `title: none`. |
| Question answering | `task: question answering | query: {content}` | `title: {title} | text: {content}` |
| Fact checking | `task: fact checking | query: {content}` | `title: {title} | text: {content}` |
| Code retrieval | `task: code retrieval | query: {content}` | `title: {title} | text: {content}` |

> [!NOTE]
> **Note:** In asymmetric retrieval use cases, use the document structure for the content you want to embed and retrieve.

**Single-input use cases (Symmetric format)**

| Use case | Input structure |
|---|---|
| Classification | `task: classification | query: {content}` |
| Clustering | `task: clustering | query: {content}` |
| Semantic similarity | `task: sentence similarity | query: {content}` Do not use this for search or retrieval. It is intended for semantic textual similarity. |

**Example usage in Python**

### Python

```python
# Generate embedding for a search query
def prepare_query(query):
    return f"task: search result | query: {query}"

# Generate embedding for a search document
def prepare_document(content, title=None):
    if title is None:
        title = "none"
    return f"title: {title} | text: {content}"

# Generate embedding for classification
def prepare_classification_input(content):
    return f"task: classification | query: {content}"

```

### API usage

#### API limits

The following limits apply when you use the `gemini-embedding-2` model.

| Limit | Value and description |
|---|---|
|   | **Text, image, document, video, and audio data** |
| Input token limit | 8192 tokens Inputs longer than 8192 tokens are silently truncated. All modalities share the total 8192 tokens context window. Tokens are counted as follows per modality: - Audio: 25 tokens per second - Video: 66 tokens per frame - Image: 258 tokens per image - Document (PDF): rendered as an image, so 258 tokens per page. Additional text tokens are extracted if OCR is enabled. |
| Output dimensionality | 3072 (default, configurable using the `output_dimensionality` parameter) |
| Image limits | 6 images per request |
| Image formats | JPEG, PNG, WebP, BMP, HEIC, HEIF, AVIF |
| Image dimensions | Maximum 16384 x 16384 pixels per image |
| Document limits | 1 file per request, up to 6 pages We strongly recommend 1 page per PDF for the best quality. |
| Document formats | PDF |
|   | **Video and audio data** |
| Video limits | 1 video per request, up to 120 frames The 120-second limit is based on the default 1 FPS setting. Duration varies when you set different FPS: Duration = 120 / FPS. By default, audio extraction is disabled for video. When the audio track extraction option is enabled, the duration is subject to the maximum audio duration of 180 seconds, and the total video duration is limited by both the audio limit and the token context window (8192 tokens). |
| Video formats | Container: MOV, MP4. Codec: AV1, H264, H265, VP9. |
| Audio limits | 180 seconds per request Audio support is optimized for speech. Ambient sound and music might not perform at the highest quality. |
| Audio formats | MP3, WAV |

#### Video duration with audio extraction

Since all modalities share the total 8192 tokens context window, the maximum video duration varies when you enable `audio_track_extraction`:

| Modality | Token Count |
|---|---|
| Audio | 25 tokens per second |
| Video frame | 66 tokens per frame |
| Timestamps | 10 tokens per second (two timestamps per second formatted as "mm:ss") |
| FPS | Determined by the FPS setting (default is 1) |

The total video duration is limited by both the maximum 180-second audio support and the 8192 token context window.

**Example calculation:**

If you process a video with a default sampling rate of 1 FPS and enable audio
extraction:

- **Consume rate**: Each second of video consumes 66 tokens (1 frame) + 25 tokens (1 second of audio) + 10 tokens (timestamps) = 101 tokens.
- **Maximum duration**: With an 8192 token limit, the maximum duration is approximately 8192 / 101 ≈ 81 seconds.

If input exceeds the context window, the exceeded part will be silently
truncated.

### Get multimodal embeddings

## REST

```bash
PROJECT_ID="YOUR_PROJECT_ID"
LOCATION="us"

curl -X POST \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  -H "Content-Type: application/json" \
  "https://aiplatform.${LOCATION}.rep.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/publishers/google/models/gemini-embedding-2:embedContent" \
  -d '{
  "content": {
    "parts": [
      {
        "text": "Whats this"
      },
      {
        "file_data": {
          "mime_type": "video/mp4",
          "file_uri": "gs://cloud-samples-data/generative-ai/video/pixel8.mp4"
        }
      }
    ]
  }
}'

```

## Python

```python
from google import genai
from google.genai import types

# Initialize the client.
client = genai.Client(vertexai=True, project="YOUR_PROJECT_ID", location="us")

content = types.Content(
    parts=[
        types.Part.from_text(text="Audio AI"),
        types.Part.from_uri(
            file_uri="gs://cloud-samples-data/generative-ai/audio/Chirp-3-Docs-Dive.mp3",
            mime_type="audio/mpeg",
        ),
    ],
)

response = client.models.embed_content(
    model="gemini-embedding-2",
    contents=[content]
)

print(response.embeddings[0].values)

```

### Locations

A location is a [region](https://cloud.google.com/about/locations) you can
specify in a request to control where data is stored at rest. For a list of
available regions, see [Agent Platform
locations](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/locations).

### Quotas

To check the quota limit for `gemini-embedding-2`, see [Generative AI on Gemini Enterprise Agent Platform quotas and system
limits](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/quotas).

> [!NOTE]
> **Note:** `gemini-embedding-2` uses global quotas shared by all locations. You might also see regional quotas, which come from the preview model `gemini-embedding-2-preview`. The preview model and its regional quotas might be deleted in the future.

### Dimensions

When using the `gemini-embedding-2` model, you can specify lower
dimensions using the `output_dimensionality` parameter in `EmbedContentConfig`.

The following example returns a `128`-dimensional vector. For
`gemini-embedding-2`, the output embeddings are already L2 normalized
for non-default dimensions (unlike `gemini-embedding-001`).

### Python

```python
import numpy as np
from google import genai
from google.genai import types

# Initialize the client.
client = genai.Client(vertexai=True, project="YOUR_PROJECT_ID", location="us")

content = types.Content(
    parts=[
        types.Part.from_uri(
            file_uri="gs://cloud-samples-data/generative-ai/audio/Chirp-3-Docs-Dive.mp3",
            mime_type="audio/mpeg",
        ),
    ],
)

response = client.models.embed_content(
    model="gemini-embedding-2",
    contents=[content],
    config=types.EmbedContentConfig(output_dimensionality=128),
)

embedding_values_np = np.array(response.embeddings[0].values)

print(f"Embedding length: {len(embedding_values_np)}")
print(f"Norm of embedding: {np.linalg.norm(embedding_values_np):.6f}") # Should be very close to 1

```

### Parameters

The default video sampling rate is 1 frame per second (FPS). Additional
parameters can be added using `video_metadata`:

### Python

```python
from google import genai
from google.genai import types

# Initialize the client.
client = genai.Client(vertexai=True, project="YOUR_PROJECT_ID", location="us")

content = types.Content(
    parts=[
        types.Part(
            file_data=types.FileData(
                file_uri="gs://cloud-samples-data/generative-ai/video/pixel8.mp4",
                mime_type="video/mp4",
            ),
            video_metadata=types.VideoMetadata(
                fps=0.5,
                start_offset="10s",
                end_offset="20s",
            ),
        ),
    ]
)

response = client.models.embed_content(
    model="gemini-embedding-2",
    contents=[content]
)

print(response.embeddings[0].values)

```

There are extra options in `EmbedContentConfig`.

| Option | Type | Description |
|---|---|---|
| `output_dimensionality` | `int` | Reduce the dimensionality for the output embedding. |
| `document_ocr` | `bool` | Enable OCR for document input. |
| `audio_track_extraction` | `bool` | Extract audio from video input. |

## Use `multimodalembedding@001`

The following limits apply when you use the `multimodalembedding@001`
model for text and image embeddings:

| Limit | Value and description |
|---|---|
|   | **Text and image data** |
| Maximum number of API requests per minute per project | 120-600 depending on region |
| Maximum text length | 32 tokens (\~32 words) The maximum text length is 32 tokens (approximately 32 words). If the input exceeds 32 tokens, the model internally shortens the input to this length. |
| Language | English |
| Image formats | BMP, GIF, JPG, PNG |
| Image size | Base64-encoded images: 20 MB (when transcoded to PNG) Cloud Storage images: 20MB (original file format) The maximum image size accepted is 20 MB. To avoid increased network latency, use smaller images. Additionally, the model resizes images to 512 x 512 pixel resolution. Consequently, you don't need to provide higher resolution images. |
|   | **Video data** |
| Audio supported | N/A - The model doesn't consider audio content when generating video embeddings |
| Video formats | AVI, FLV, MKV, MOV, MP4, MPEG, MPG, WEBM, and WMV |
| Maximum video length (Cloud Storage) | No limit. However, only 2 minutes of content can be analyzed at a time. |

### Before you begin

> [!NOTE]
> Certain tasks in Agent Platform require that you use additional Google Cloud products besides Agent Platform. For example, in most cases, you must use Cloud Storage and Artifact Registry when you create a custom training pipeline. You might need to perform additional setup tasks to use other Google Cloud products.

1. Set up authentication for your environment.

   Select the tab for how you plan to use the samples on this page:

   ### Java

   To use the Java samples on this page in a local development environment, install and
   initialize the gcloud CLI, and then set up Application Default Credentials with
   your user credentials.
   1.
      [Install](https://docs.cloud.google.com/sdk/docs/install) the Google Cloud CLI.

   2. If you're using an external identity provider (IdP), you must first
      [sign in to the gcloud CLI with your federated identity](https://docs.cloud.google.com/iam/docs/workforce-log-in-gcloud).

   3.
      After initializing the gcloud CLI, update it and install the required components:

      ```bash
      gcloud components update
      gcloud components install beta
      ```
   4.

      If you're using a local shell, then create local authentication credentials for your user
      account:

      ```bash
      gcloud auth application-default login
      ```

      You don't need to do this if you're using Cloud Shell.

      If an authentication error is returned, and you are using an external identity provider
      (IdP), confirm that you have
      [signed in to the gcloud CLI with your federated identity](https://docs.cloud.google.com/iam/docs/workforce-log-in-gcloud).

   For more information, see
   [Set up ADC for a local development environment](https://docs.cloud.google.com/docs/authentication/set-up-adc-local-dev-environment)
   in the Google Cloud authentication documentation.

   ### Node.js

   To use the Node.js samples on this page in a local development environment, install and
   initialize the gcloud CLI, and then set up Application Default Credentials with
   your user credentials.
   1.
      [Install](https://docs.cloud.google.com/sdk/docs/install) the Google Cloud CLI.

   2. If you're using an external identity provider (IdP), you must first
      [sign in to the gcloud CLI with your federated identity](https://docs.cloud.google.com/iam/docs/workforce-log-in-gcloud).

   3.
      After initializing the gcloud CLI, update it and install the required components:

      ```bash
      gcloud components update
      gcloud components install beta
      ```
   4.

      If you're using a local shell, then create local authentication credentials for your user
      account:

      ```bash
      gcloud auth application-default login
      ```

      You don't need to do this if you're using Cloud Shell.

      If an authentication error is returned, and you are using an external identity provider
      (IdP), confirm that you have
      [signed in to the gcloud CLI with your federated identity](https://docs.cloud.google.com/iam/docs/workforce-log-in-gcloud).

   For more information, see
   [Set up ADC for a local development environment](https://docs.cloud.google.com/docs/authentication/set-up-adc-local-dev-environment)
   in the Google Cloud authentication documentation.

   ### Python

   To use the Python samples on this page in a local development environment, install and
   initialize the gcloud CLI, and then set up Application Default Credentials with
   your user credentials.
   1.
      [Install](https://docs.cloud.google.com/sdk/docs/install) the Google Cloud CLI.

   2. If you're using an external identity provider (IdP), you must first
      [sign in to the gcloud CLI with your federated identity](https://docs.cloud.google.com/iam/docs/workforce-log-in-gcloud).

   3.
      After initializing the gcloud CLI, update it and install the required components:

      ```bash
      gcloud components update
      gcloud components install beta
      ```
   4.

      If you're using a local shell, then create local authentication credentials for your user
      account:

      ```bash
      gcloud auth application-default login
      ```

      You don't need to do this if you're using Cloud Shell.

      If an authentication error is returned, and you are using an external identity provider
      (IdP), confirm that you have
      [signed in to the gcloud CLI with your federated identity](https://docs.cloud.google.com/iam/docs/workforce-log-in-gcloud).

   For more information, see
   [Set up ADC for a local development environment](https://docs.cloud.google.com/docs/authentication/set-up-adc-local-dev-environment)
   in the Google Cloud authentication documentation.

   ### REST

   To use the REST API samples on this page in a local development environment, you use the
   credentials you provide to the gcloud CLI.
   1.
      [Install](https://docs.cloud.google.com/sdk/docs/install) the Google Cloud CLI.

   2. If you're using an external identity provider (IdP), you must first
      [sign in to the gcloud CLI with your federated identity](https://docs.cloud.google.com/iam/docs/workforce-log-in-gcloud).

   3.
      After initializing the gcloud CLI, update it and install the required components:

      ```bash
      gcloud components update
      gcloud components install beta
      ```

   For more information, see
   [Authenticate for using REST](https://docs.cloud.google.com/docs/authentication/rest)
   in the Google Cloud authentication documentation.
2. To use the Python SDK, follow instructions at [Install the Agent Platform SDK for Python](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/start/install-sdk). For more information, see the [Agent Platform SDK for Python API reference documentation](https://docs.cloud.google.com/python/docs/reference/aiplatform/latest).
3. Optional. Review [pricing](https://cloud.google.com/gemini-enterprise-agent-platform/generative-ai/pricing) for this feature. Pricing for embeddings depends on the type of data you send (such as image or text), and also depends on the mode you use for certain data types (such as Video Plus, Video Standard, or Video Essential).

### Locations

A location is a [region](https://cloud.google.com/about/locations) you can
specify in a request to control where data is stored at rest. For a list of
available regions, see [Agent Platform
locations](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/locations).

### Error messages

This section describes common error messages you might encounter.

#### Quota exceeded error

    google.api_core.exceptions.ResourceExhausted: 429 Quota exceeded for
    aiplatform.googleapis.com/online_prediction_requests_per_base_model with base
    model: multimodalembedding. Please submit a quota increase request.

If this is the first time you receive this error, use the Google Cloud console
to [request a quota adjustment](https://docs.cloud.google.com/docs/quotas/help/request_increase) for your project. Use the
following filters before requesting your adjustment:

- `Service ID: aiplatform.googleapis.com`
- `metric: aiplatform.googleapis.com/online_prediction_requests_per_base_model`
- `base_model:multimodalembedding`

[Go to
Quotas](https://console.cloud.google.com/iam-admin/quotas?service=aiplatform.googleapis.com&metric=aiplatform.googleapis.com/online_prediction_requests_per_base_model&base_model=multimodalembedding)

If you have already sent a quota adjustment request, wait before sending another
request. If you need to further increase the quota, repeat the quota adjustment
request with your justification for a sustained quota adjustment.

### Specify lower-dimension embeddings

Depending on the model being used, an embedding request returns either a 1408
float vector or a 3072 float vector. You can specify lower dimension
embeddings for text and image data to optimize for latency and storage, or
quality. Lower dimension embeddings lower storage needs and provide lower latency
for subsequent embedding tasks (such as search or recommendation).
Higher-dimension embeddings offer greater accuracy for these tasks, but with
higher storage needs and higher latency.

The following table illustrates the default and available lower dimensions
available for each model:

| Model | Default dimensions (highest) | Supported dimensions (range) | Recommended lower dimensions |
|---|---|---|---|
| `gemini-embedding-2` | 3072 | 128 to 3072 | 128, 768 or 1536 |
| `multimodalembedding@001` | 1408 | 128 to 1408 | 128, 256, or 512 |

Use the following samples to generate embeddings with lower dimensions:

### REST

Lower dimensions can be accessed by adding the `parameters.dimension` field.
The parameter accepts any of the dimension values available for the model.
For example, you can specify `128`, `256`, `512` or `1408` when using
the `multimodalembedding@001` model. The response includes the
embedding of the specified dimension.

Before using any of the request data,
make the following replacements:

- <var translate="no">PROJECT_ID</var>: Your Google Cloud [project ID](https://docs.cloud.google.com/resource-manager/docs/creating-managing-projects#identifying_projects).
- <var translate="no">IMAGE_URI</var>: The Cloud Storage URI of the target image to get embeddings for. For example, `gs://my-bucket/embeddings/supermarket-img.png`. You can also provide the image as a base64-encoded byte
  string:

  ```
        [...]
        "image": {
          "bytesBase64Encoded": "B64_ENCODED_IMAGE"
        }
        [...]

  ```
- <var translate="no">TEXT</var>: The target text to get embeddings for. For example, `a
  cat`.
- <var translate="no">EMBEDDING_DIMENSION</var>: The number of embedding dimensions. Lower values offer decreased latency when using these embeddings for subsequent tasks, while higher values offer better accuracy. Available values: `128`, `256`, `512`, and `1408` (default).

HTTP method and URL:

```
POST https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/publishers/google/models/multimodalembedding@001:predict
```

Request JSON body:

```
{
  "instances": [
    {
      "image": {
        "gcsUri": "IMAGE_URI"
      },
      "text": "TEXT"
    }
  ],
  "parameters": {
    "dimension": EMBEDDING_DIMENSION
  }
}
```

To send your request, choose one of these options:

#### curl

> [!NOTE]
> **Note:** The following command assumes that you have logged in to the `gcloud` CLI with your user account by running [`gcloud init`](https://docs.cloud.google.com/sdk/gcloud/reference/init) or [`gcloud auth login`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) , or by using [Cloud Shell](https://docs.cloud.google.com/shell/docs), which automatically logs you into the `gcloud` CLI . You can check the currently active account by running [`gcloud auth list`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/list).

Save the request body in a file named `request.json`,
and execute the following command:

```
curl -X POST \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d @request.json \
     "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/publishers/google/models/multimodalembedding@001:predict"
```

#### PowerShell

> [!NOTE]
> **Note:** The following command assumes that you have logged in to the `gcloud` CLI with your user account by running [`gcloud init`](https://docs.cloud.google.com/sdk/gcloud/reference/init) or [`gcloud auth login`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) . You can check the currently active account by running [`gcloud auth list`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/list).

Save the request body in a file named `request.json`,
and execute the following command:

```
$cred = gcloud auth print-access-token
$headers = @{ "Authorization" = "Bearer $cred" }

Invoke-WebRequest `
    -Method POST `
    -Headers $headers `
    -ContentType: "application/json; charset=utf-8" `
    -InFile request.json `
    -Uri "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/publishers/google/models/multimodalembedding@001:predict" | Select-Object -Expand Content
```
The embedding the model returns a float vector of the dimension you specify. The following sample responses are shortened for space.

**128 dimensions:**

```
{
  "predictions": [
    {
      "imageEmbedding": [
        0.0279239565,
        [...128 dimension vector...]
        0.00403284049
      ],
      "textEmbedding": [
        0.202921599,
        [...128 dimension vector...]
        -0.0365431122
      ]
    }
  ],
  "deployedModelId": "DEPLOYED_MODEL_ID"
}
```

**256 dimensions:**

```
{
  "predictions": [
    {
      "imageEmbedding": [
        0.248620048,
        [...256 dimension vector...]
        -0.0646447465
      ],
      "textEmbedding": [
        0.0757875815,
        [...256 dimension vector...]
        -0.02749932
      ]
    }
  ],
  "deployedModelId": "DEPLOYED_MODEL_ID"
}
```

**512 dimensions:**

```
{
  "predictions": [
    {
      "imageEmbedding": [
        -0.0523675755,
        [...512 dimension vector...]
        -0.0444030389
      ],
      "textEmbedding": [
        -0.0592851527,
        [...512 dimension vector...]
        0.0350437127
      ]
    }
  ],
  "deployedModelId": "DEPLOYED_MODEL_ID"
}
```

### Python

    import vertexai

    from vertexai.vision_models import Image, MultiModalEmbeddingModel

    # TODO(developer): Update & uncomment line below
    # PROJECT_ID = "your-project-id"
    vertexai.init(project=PROJECT_ID, location="us-central1")

    # TODO(developer): Try different dimenions: 128, 256, 512, 1408
    embedding_dimension = 128

    model = MultiModalEmbeddingModel.from_pretrained("multimodalembedding@001")
    image = Image.load_from_file(
        "gs://cloud-samples-data/vertex-ai/llm/prompts/landmark1.png"
    )

    embeddings = model.get_embeddings(
        image=image,
        contextual_text="Colosseum",
        dimension=embedding_dimension,
    )

    print(f"Image Embedding: {embeddings.image_embedding}")
    print(f"Text Embedding: {embeddings.text_embedding}")

    # Example response:
    # Image Embedding: [0.0622573346, -0.0406507477, 0.0260440577, ...]
    # Text Embedding: [0.27469793, -0.146258667, 0.0222803634, ...]

### Go

    import (
        "context"
        "encoding/json"
        "fmt"
        "io"

        aiplatform "cloud.google.com/go/aiplatform/apiv1beta1"
        aiplatformpb "cloud.google.com/go/aiplatform/apiv1beta1/aiplatformpb"
        "google.golang.org/api/option"
        "google.golang.org/protobuf/encoding/protojson"
        "google.golang.org/protobuf/types/known/structpb"
    )

    // generateWithLowerDimension shows how to generate lower-dimensional embeddings for text and image inputs.
    func generateWithLowerDimension(w io.Writer, project, location string) error {
        // location = "us-central1"
        ctx := context.Background()
        apiEndpoint := fmt.Sprintf("%s-aiplatform.googleapis.com:443", location)
        client, err := aiplatform.https://docs.cloud.google.com/go/docs/reference/cloud.google.com/go/aiplatform/latest/apiv1beta1.html#cloud_google_com_go_aiplatform_apiv1beta1_PredictionClient_NewPredictionClient(ctx, option.WithEndpoint(apiEndpoint))
        if err != nil {
            return fmt.Errorf("failed to construct API client: %w", err)
        }
        defer client.Close()

        model := "multimodalembedding@001"
        endpoint := fmt.Sprintf("projects/%s/locations/%s/publishers/google/models/%s", project, location, model)

        // This is the input to the model's prediction call. For schema, see:
        // https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/multimodal-embeddings-api#request_body
        instance, err := structpb.NewValue(map[string]any{
            "image": map[string]any{
                // Image input can be provided either as a Google Cloud Storage URI or as
                // base64-encoded bytes using the "bytesBase64Encoded" field.
                "gcsUri": "gs://cloud-samples-data/vertex-ai/llm/prompts/landmark1.png",
            },
            "text": "Colosseum",
        })
        if err != nil {
            return fmt.Errorf("failed to construct request payload: %w", err)
        }

        // TODO(developer): Try different dimenions: 128, 256, 512, 1408
        outputDimensionality := 128
        params, err := structpb.NewValue(map[string]any{
            "dimension": outputDimensionality,
        })
        if err != nil {
            return fmt.Errorf("failed to construct request params: %w", err)
        }

        req := &aiplatformpb.PredictRequest{
            Endpoint: endpoint,
            // The model supports only 1 instance per request.
            Instances:  []*structpb.Value{instance},
            Parameters: params,
        }

        resp, err := client.Predict(ctx, req)
        if err != nil {
            return fmt.Errorf("failed to generate embeddings: %w", err)
        }

        instanceEmbeddingsJson, err := protojson.Marshal(resp.GetPredictions()[0])
        if err != nil {
            return fmt.Errorf("failed to convert protobuf value to JSON: %w", err)
        }
        // For response schema, see:
        // https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/multimodal-embeddings-api#response-body
        var instanceEmbeddings struct {
            ImageEmbeddings []float32 `json:"imageEmbedding"`
            TextEmbeddings  []float32 `json:"textEmbedding"`
        }
        if err := json.Unmarshal(instanceEmbeddingsJson, &instanceEmbeddings); err != nil {
            return fmt.Errorf("failed to unmarshal JSON: %w", err)
        }

        imageEmbedding := instanceEmbeddings.ImageEmbeddings
        textEmbedding := instanceEmbeddings.TextEmbeddings

        fmt.Fprintf(w, "Text embedding (length=%d): %v\n", len(textEmbedding), textEmbedding)
        fmt.Fprintf(w, "Image embedding (length=%d): %v\n", len(imageEmbedding), imageEmbedding)
        // Example response:
        // Text Embedding (length=128): [0.27469793 -0.14625867 0.022280363 ... ]
        // Image Embedding (length=128): [0.06225733 -0.040650766 0.02604402 ... ]

        return nil
    }

## Get image and text embeddings (`multimodalembedding@001`)

> [!NOTE]
> **Note:** For text-only embedding use cases, we recommend using the Gemini Enterprise Agent Platform text embedding API instead. For example, the text embedding API might be better for text-based semantic search, clustering, long-form document analysis, and other text retrieval or question-answering use cases. For more information, see [Get text embeddings](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/embeddings/get-text-embeddings).

Use the following code samples to send an embedding request with image and text
data. The samples show how to send a request with both data types, but you can
also use the service with an individual data type.

### Get text and image embeddings

### REST

Before using any of the request data,
make the following replacements:

- <var translate="no">PROJECT_ID</var>: Your Google Cloud [project ID](https://docs.cloud.google.com/resource-manager/docs/creating-managing-projects#identifying_projects).
- <var translate="no">TEXT</var>: The target text to get embeddings for. For example, `a
  cat`.
- <var translate="no">B64_ENCODED_IMG</var>: The target image to get embeddings for. The image must be specified as a [base64-encoded](https://docs.cloud.google.com/gemini-enterprise-agent-platform/tutorials/base64-encode) byte string.

HTTP method and URL:

```
POST https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/publishers/google/models/multimodalembedding@001:predict
```

Request JSON body:

```
{
  "instances": [
    {
      "text": "TEXT",
      "image": {
        "bytesBase64Encoded": "B64_ENCODED_IMG"
      }
    }
  ]
}
```

To send your request, choose one of these options:

#### curl

> [!NOTE]
> **Note:** The following command assumes that you have logged in to the `gcloud` CLI with your user account by running [`gcloud init`](https://docs.cloud.google.com/sdk/gcloud/reference/init) or [`gcloud auth login`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) , or by using [Cloud Shell](https://docs.cloud.google.com/shell/docs), which automatically logs you into the `gcloud` CLI . You can check the currently active account by running [`gcloud auth list`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/list).

Save the request body in a file named `request.json`,
and execute the following command:

```
curl -X POST \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d @request.json \
     "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/publishers/google/models/multimodalembedding@001:predict"
```

#### PowerShell

> [!NOTE]
> **Note:** The following command assumes that you have logged in to the `gcloud` CLI with your user account by running [`gcloud init`](https://docs.cloud.google.com/sdk/gcloud/reference/init) or [`gcloud auth login`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) . You can check the currently active account by running [`gcloud auth list`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/list).

Save the request body in a file named `request.json`,
and execute the following command:

```
$cred = gcloud auth print-access-token
$headers = @{ "Authorization" = "Bearer $cred" }

Invoke-WebRequest `
    -Method POST `
    -Headers $headers `
    -ContentType: "application/json; charset=utf-8" `
    -InFile request.json `
    -Uri "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/publishers/google/models/multimodalembedding@001:predict" | Select-Object -Expand Content
```
The embedding the model returns is a 1408 float vector. The following sample response is shortened for space.

```
{
  "predictions": [
    {
      "textEmbedding": [
        0.010477379,
        -0.00399621,
        0.00576670747,
        [...]
        -0.00823613815,
        -0.0169572588,
        -0.00472954148
      ],
      "imageEmbedding": [
        0.00262696808,
        -0.00198890246,
        0.0152047109,
        -0.0103145819,
        [...]
        0.0324628279,
        0.0284924973,
        0.011650892,
        -0.00452344026
      ]
    }
  ],
  "deployedModelId": "DEPLOYED_MODEL_ID"
}
```

### Python

To learn how to install or update the Vertex AI SDK for Python, see [Install the Vertex AI SDK for Python](https://docs.cloud.google.com/vertex-ai/docs/start/use-vertex-ai-python-sdk).

For more information, see the
[Python API reference documentation](https://docs.cloud.google.com/python/docs/reference/aiplatform/latest).

    import vertexai
    from vertexai.vision_models import Image, MultiModalEmbeddingModel

    # TODO(developer): Update & uncomment line below
    # PROJECT_ID = "your-project-id"
    vertexai.init(project=PROJECT_ID, location="us-central1")

    model = MultiModalEmbeddingModel.from_pretrained("multimodalembedding@001")
    image = Image.load_from_file(
        "gs://cloud-samples-data/vertex-ai/llm/prompts/landmark1.png"
    )

    embeddings = model.get_embeddings(
        image=image,
        contextual_text="Colosseum",
        dimension=1408,
    )
    print(f"Image Embedding: {embeddings.image_embedding}")
    print(f"Text Embedding: {embeddings.text_embedding}")
    # Example response:
    # Image Embedding: [-0.0123147098, 0.0727171078, ...]
    # Text Embedding: [0.00230263756, 0.0278981831, ...]

### Node.js

Before trying this sample, follow the Node.js setup instructions in the
[Agent Platform quickstart using
client libraries](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/start/client-libraries).

For more information, see the
[Agent Platform Node.js API
reference documentation](https://docs.cloud.google.com/nodejs/docs/reference/aiplatform/latest).

To authenticate to Agent Platform, set up Application Default Credentials.
For more information, see

[Set up authentication for a local development environment](https://docs.cloud.google.com/docs/authentication/set-up-adc-local-dev-environment).

    /**
     * TODO(developer): Uncomment these variables before running the sample.\
     * (Not necessary if passing values as arguments)
     */
    // const project = 'YOUR_PROJECT_ID';
    // const location = 'YOUR_PROJECT_LOCATION';
    // const baseImagePath = 'YOUR_BASE_IMAGE_PATH';
    // const textPrompt = 'YOUR_TEXT_PROMPT';
    const aiplatform = require('https://docs.cloud.google.com/nodejs/docs/reference/aiplatform/latest/overview.html');

    // Imports the Google Cloud Prediction service client
    const {PredictionServiceClient} = aiplatform.v1;

    // Import the helper module for converting arbitrary protobuf.Value objects.
    const {helpers} = aiplatform;

    // Specifies the location of the api endpoint
    const clientOptions = {
      apiEndpoint: 'us-central1-aiplatform.googleapis.com',
    };
    const publisher = 'google';
    const model = 'multimodalembedding@001';

    // Instantiates a client
    const predictionServiceClient = new https://docs.cloud.google.com/nodejs/docs/reference/aiplatform/latest/overview.html(clientOptions);

    async function predictImageFromImageAndText() {
      // Configure the parent resource
      const endpoint = `projects/${project}/locations/${location}/publishers/${publisher}/models/${model}`;

      const fs = require('fs');
      const imageFile = fs.readFileSync(baseImagePath);

      // Convert the image data to a Buffer and base64 encode it.
      const encodedImage = Buffer.from(imageFile).toString('base64');

      const prompt = {
        text: textPrompt,
        image: {
          bytesBase64Encoded: encodedImage,
        },
      };
      const instanceValue = https://docs.cloud.google.com/nodejs/docs/reference/aiplatform/latest/overview.html.toValue(prompt);
      const instances = [instanceValue];

      const parameter = {
        sampleCount: 1,
      };
      const parameters = https://docs.cloud.google.com/nodejs/docs/reference/aiplatform/latest/overview.html.toValue(parameter);

      const request = {
        endpoint,
        instances,
        parameters,
      };

      // Predict request
      const [response] = await predictionServiceClient.predict(request);
      console.log('Get image embedding response');
      const predictions = response.predictions;
      console.log('\tPredictions :');
      for (const prediction of predictions) {
        console.log(`\t\tPrediction : ${JSON.stringify(prediction)}`);
      }
    }

    await predictImageFromImageAndText();

### Java

Before trying this sample, follow the Java setup instructions in the
[Agent Platform quickstart using
client libraries](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/start/client-libraries).

For more information, see the
[Agent Platform Java API
reference documentation](https://docs.cloud.google.com/java/docs/reference/google-cloud-aiplatform/latest/com.google.cloud.aiplatform.v1).

To authenticate to Agent Platform, set up Application Default Credentials.
For more information, see

[Set up authentication for a local development environment](https://docs.cloud.google.com/docs/authentication/set-up-adc-local-dev-environment).

    import com.google.cloud.aiplatform.v1beta1.EndpointName;
    import com.google.cloud.aiplatform.v1beta1.PredictResponse;
    import com.google.cloud.aiplatform.v1beta1.PredictionServiceClient;
    import com.google.cloud.aiplatform.v1beta1.PredictionServiceSettings;
    import com.google.gson.Gson;
    import com.google.gson.JsonObject;
    import com.google.protobuf.https://docs.cloud.google.com/java/docs/reference/protobuf/latest/com.google.protobuf.InvalidProtocolBufferException.html;
    import com.google.protobuf.https://docs.cloud.google.com/java/docs/reference/protobuf/latest/com.google.protobuf.Value.html;
    import com.google.protobuf.util.https://docs.cloud.google.com/java/docs/reference/protobuf/latest/com.google.protobuf.util.JsonFormat.html;
    import java.io.IOException;
    import java.nio.charset.StandardCharsets;
    import java.nio.file.Files;
    import java.nio.file.Paths;
    import java.util.ArrayList;
    import java.util.Base64;
    import java.util.HashMap;
    import java.util.List;
    import java.util.Map;

    public class PredictImageFromImageAndTextSample {

      public static void main(String[] args) throws IOException {
        // TODO(developer): Replace this variable before running the sample.
        String project = "YOUR_PROJECT_ID";
        String textPrompt = "YOUR_TEXT_PROMPT";
        String baseImagePath = "YOUR_BASE_IMAGE_PATH";

        // Learn how to use text prompts to update an image:
        // https://cloud.google.com/vertex-ai/docs/generative-ai/image/edit-images
        Map<String, Object> parameters = new HashMap<String, Object>();
        parameters.put("sampleCount", 1);

        String location = "us-central1";
        String publisher = "google";
        String model = "multimodalembedding@001";

        predictImageFromImageAndText(
            project, location, publisher, model, textPrompt, baseImagePath, parameters);
      }

      // Update images using text prompts
      public static void predictImageFromImageAndText(
          String project,
          String location,
          String publisher,
          String model,
          String textPrompt,
          String baseImagePath,
          Map<String, Object> parameters)
          throws IOException {
        final String endpoint = String.format("%s-aiplatform.googleapis.com:443", location);
        final PredictionServiceSettings predictionServiceSettings =
            PredictionServiceSettings.newBuilder().setEndpoint(endpoint).build();

        // Initialize client that will be used to send requests. This client only needs to be created
        // once, and can be reused for multiple requests.
        try (PredictionServiceClient predictionServiceClient =
            PredictionServiceClient.create(predictionServiceSettings)) {
          final EndpointName endpointName =
              EndpointName.ofProjectLocationPublisherModelName(project, location, publisher, model);

          // Convert the image to Base64
          byte[] imageData = Base64.getEncoder().encode(Files.readAllBytes(Paths.get(baseImagePath)));
          String encodedImage = new String(imageData, StandardCharsets.UTF_8);

          JsonObject jsonInstance = new JsonObject();
          jsonInstance.addProperty("text", textPrompt);
          JsonObject jsonImage = new JsonObject();
          jsonImage.addProperty("bytesBase64Encoded", encodedImage);
          jsonInstance.add("image", jsonImage);

          https://docs.cloud.google.com/java/docs/reference/protobuf/latest/com.google.protobuf.Value.html instanceValue = stringToValue(jsonInstance.toString());
          https://docs.cloud.google.com/java/docs/reference/protobuf/latest/com.google.protobuf.ListValue.html instances = new ArrayList<>();
          instances.add(instanceValue);

          Gson gson = new Gson();
          String gsonString = gson.toJson(parameters);
          https://docs.cloud.google.com/java/docs/reference/protobuf/latest/com.google.protobuf.Value.html parameterValue = stringToValue(gsonString);

          PredictResponse predictResponse =
              predictionServiceClient.predict(endpointName, instances, parameterValue);
          System.out.println("Predict Response");
          System.out.println(predictResponse);
          for (https://docs.cloud.google.com/java/docs/reference/protobuf/latest/com.google.protobuf.Value.html prediction : predictResponse.getPredictionsList()) {
            System.out.format("\tPrediction: %s\n", prediction);
          }
        }
      }

      // Convert a Json string to a protobuf.Value
      static https://docs.cloud.google.com/java/docs/reference/protobuf/latest/com.google.protobuf.Value.html stringToValue(String value) throws https://docs.cloud.google.com/java/docs/reference/protobuf/latest/com.google.protobuf.InvalidProtocolBufferException.html {
        https://docs.cloud.google.com/java/docs/reference/protobuf/latest/com.google.protobuf.Value.html.Builder builder = https://docs.cloud.google.com/java/docs/reference/protobuf/latest/com.google.protobuf.Value.html.newBuilder();
        https://docs.cloud.google.com/java/docs/reference/protobuf/latest/com.google.protobuf.util.JsonFormat.html.parser().merge(value, builder);
        return https://docs.cloud.google.com/java/docs/reference/protobuf/latest/com.google.protobuf.TextFormatParseInfoTree.html#com_google_protobuf_TextFormatParseInfoTree_builder__.build();
      }
    }

### Go

Before trying this sample, follow the Go setup instructions in the
[Agent Platform quickstart using
client libraries](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/start/client-libraries).

For more information, see the
[Agent Platform Go API
reference documentation](https://docs.cloud.google.com/go/docs/reference/cloud.google.com/go/aiplatform/latest/apiv1).

To authenticate to Agent Platform, set up Application Default Credentials.
For more information, see

[Set up authentication for a local development environment](https://docs.cloud.google.com/docs/authentication/set-up-adc-local-dev-environment).

    import (
        "context"
        "encoding/json"
        "fmt"
        "io"

        aiplatform "cloud.google.com/go/aiplatform/apiv1beta1"
        aiplatformpb "cloud.google.com/go/aiplatform/apiv1beta1/aiplatformpb"
        "google.golang.org/api/option"
        "google.golang.org/protobuf/encoding/protojson"
        "google.golang.org/protobuf/types/known/structpb"
    )

    // generateForTextAndImage shows how to use the multimodal model to generate embeddings for
    // text and image inputs.
    func generateForTextAndImage(w io.Writer, project, location string) error {
        // location = "us-central1"
        ctx := context.Background()
        apiEndpoint := fmt.Sprintf("%s-aiplatform.googleapis.com:443", location)
        client, err := aiplatform.https://docs.cloud.google.com/go/docs/reference/cloud.google.com/go/aiplatform/latest/apiv1beta1.html#cloud_google_com_go_aiplatform_apiv1beta1_PredictionClient_NewPredictionClient(ctx, option.WithEndpoint(apiEndpoint))
        if err != nil {
            return fmt.Errorf("failed to construct API client: %w", err)
        }
        defer client.Close()

        model := "multimodalembedding@001"
        endpoint := fmt.Sprintf("projects/%s/locations/%s/publishers/google/models/%s", project, location, model)

        // This is the input to the model's prediction call. For schema, see:
        // https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/multimodal-embeddings-api#request_body
        instance, err := structpb.NewValue(map[string]any{
            "image": map[string]any{
                // Image input can be provided either as a Google Cloud Storage URI or as
                // base64-encoded bytes using the "bytesBase64Encoded" field.
                "gcsUri": "gs://cloud-samples-data/vertex-ai/llm/prompts/landmark1.png",
            },
            "text": "Colosseum",
        })
        if err != nil {
            return fmt.Errorf("failed to construct request payload: %w", err)
        }

        req := &aiplatformpb.PredictRequest{
            Endpoint: endpoint,
            // The model supports only 1 instance per request.
            Instances: []*structpb.Value{instance},
        }

        resp, err := client.Predict(ctx, req)
        if err != nil {
            return fmt.Errorf("failed to generate embeddings: %w", err)
        }

        instanceEmbeddingsJson, err := protojson.Marshal(resp.GetPredictions()[0])
        if err != nil {
            return fmt.Errorf("failed to convert protobuf value to JSON: %w", err)
        }
        // For response schema, see:
        // https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/multimodal-embeddings-api#response-body
        var instanceEmbeddings struct {
            ImageEmbeddings []float32 `json:"imageEmbedding"`
            TextEmbeddings  []float32 `json:"textEmbedding"`
        }
        if err := json.Unmarshal(instanceEmbeddingsJson, &instanceEmbeddings); err != nil {
            return fmt.Errorf("failed to unmarshal JSON: %w", err)
        }

        imageEmbedding := instanceEmbeddings.ImageEmbeddings
        textEmbedding := instanceEmbeddings.TextEmbeddings

        fmt.Fprintf(w, "Text embedding (length=%d): %v\n", len(textEmbedding), textEmbedding)
        fmt.Fprintf(w, "Image embedding (length=%d): %v\n", len(imageEmbedding), imageEmbedding)
        // Example response:
        // Text embedding (length=1408): [0.0023026613 0.027898183 -0.011858357 ... ]
        // Image embedding (length=1408): [-0.012314269 0.07271844 0.00020170923 ... ]

        return nil
    }

## Get video, image, or text embeddings (`multimodalembedding@001`)

When sending an embedding request you can specify an input video alone, or
you can specify a combination of video, image, and text data.

### Video embedding modes

There are three modes you can use with video embeddings: Essential, Standard, or
Plus. The mode corresponds to the density of the embeddings generated, which can
be specified by the `interval_sec` config in the request. For each video
interval with `interval_sec` length, an embedding is generated. The minimal
video interval length is 4 seconds. Interval lengths greater than 120 seconds
might negatively affect the quality of the generated embeddings.

Pricing for video embedding depends on the mode you use. For more information,
see [pricing](https://cloud.google.com/gemini-enterprise-agent-platform/generative-ai/pricing).

The following table summarizes the three modes you can use for video embeddings:

| Mode | Maximum number of embeddings per minute | Video embedding interval (minimum value) |
|---|---|---|
| Essential | 4 | 15 This corresponds to: `intervalSec` \>= 15 |
| Standard | 8 | 8 This corresponds to: 8 \<= `intervalSec` \< 15 |
| Plus | 15 | 4 This corresponds to: 4 \<= `intervalSec` \< 8 |

### Video embeddings best practices

Consider the following when you send video embedding requests:

- To generate a single embedding for the first two minutes of an input video
  of any length, use the following `videoSegmentConfig` setting:

  `request.json`:

      // other request body content
      "videoSegmentConfig": {
        "intervalSec": 120
      }
      // other request body content

- To generate embedding for a video with a length greater than two minutes,
  you can send multiple requests that specify the start and end times in the
  `videoSegmentConfig`:

  `request1.json`:

      // other request body content
      "videoSegmentConfig": {
        "startOffsetSec": 0,
        "endOffsetSec": 120
      }
      // other request body content

  `request2.json`:

      // other request body content
      "videoSegmentConfig": {
        "startOffsetSec": 120,
        "endOffsetSec": 240
      }
      // other request body content

  ### Get video embeddings

Use the following sample to get embeddings for video content alone.

### REST

The following example uses a video located in Cloud Storage. You can
also use the `video.bytesBase64Encoded` field to provide a
[base64-encoded](https://docs.cloud.google.com/gemini-enterprise-agent-platform/tutorials/base64-encode) string representation of the
video.

Before using any of the request data,
make the following replacements:

- <var translate="no">PROJECT_ID</var>: Your Google Cloud [project ID](https://docs.cloud.google.com/resource-manager/docs/creating-managing-projects#identifying_projects).
- <var translate="no">VIDEO_URI</var>: The Cloud Storage URI of the target video to get embeddings for. For example, `gs://my-bucket/embeddings/supermarket-video.mp4`. You can also provide the video as a base64-encoded
  byte string:

  ```
  [...]
  "video": {
    "bytesBase64Encoded": "B64_ENCODED_VIDEO"
  }
  [...]

  ```
- `videoSegmentConfig` (<var translate="no">START_SECOND</var>, <var translate="no">END_SECOND</var>, <var translate="no">INTERVAL_SECONDS</var>). Optional. The specific video segments (in seconds) the embeddings are generated for.

  > [!CAUTION]
  > The value you set for `videoSegmentConfig.intervalSec` affects the pricing tier you are charged at. For more information, see the [video embedding modes](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/embeddings/get-multimodal-embeddings#video-modes) section and [pricing](https://docs.cloud.google.com/gemini-enterprise-agent-platform/pricing) page.

  For example:

  ```
  [...]
  "videoSegmentConfig": {
    "startOffsetSec": 10,
    "endOffsetSec": 60,
    "intervalSec": 10
  }
  [...]
  ```

  Using this config specifies video data from 10 seconds to 60 seconds and
  generates embeddings for the following 10 second video intervals: \[10, 20),
  \[20, 30), \[30, 40), \[40, 50), \[50, 60). This video interval
  (`"intervalSec": 10`) falls in the [Standard
  video embedding mode](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/embeddings/get-multimodal-embeddings#video-modes), and you are charged at the [Standard mode pricing rate](https://docs.cloud.google.com/gemini-enterprise-agent-platform/pricing).

  If you omit `videoSegmentConfig`, the service uses the following
  default values: `"videoSegmentConfig": { "startOffsetSec": 0,
  "endOffsetSec": 120, "intervalSec": 16 }`. This video interval
  (`"intervalSec": 16`) falls in the [Essential
  video embedding mode](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/embeddings/get-multimodal-embeddings#video-modes), and the user is charged at the [Essential mode pricing rate](https://docs.cloud.google.com/gemini-enterprise-agent-platform/pricing).

HTTP method and URL:

```
POST https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/publishers/google/models/multimodalembedding@001:predict
```

Request JSON body:

```
{
  "instances": [
    {
      "video": {
        "gcsUri": "VIDEO_URI",
        "videoSegmentConfig": {
          "startOffsetSec": START_SECOND,
          "endOffsetSec": END_SECOND,
          "intervalSec": INTERVAL_SECONDS
        }
      }
    }
  ]
}
```

To send your request, choose one of these options:

#### curl

> [!NOTE]
> **Note:** The following command assumes that you have logged in to the `gcloud` CLI with your user account by running [`gcloud init`](https://docs.cloud.google.com/sdk/gcloud/reference/init) or [`gcloud auth login`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) , or by using [Cloud Shell](https://docs.cloud.google.com/shell/docs), which automatically logs you into the `gcloud` CLI . You can check the currently active account by running [`gcloud auth list`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/list).

Save the request body in a file named `request.json`,
and execute the following command:

```
curl -X POST \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d @request.json \
     "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/publishers/google/models/multimodalembedding@001:predict"
```

#### PowerShell

> [!NOTE]
> **Note:** The following command assumes that you have logged in to the `gcloud` CLI with your user account by running [`gcloud init`](https://docs.cloud.google.com/sdk/gcloud/reference/init) or [`gcloud auth login`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) . You can check the currently active account by running [`gcloud auth list`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/list).

Save the request body in a file named `request.json`,
and execute the following command:

```
$cred = gcloud auth print-access-token
$headers = @{ "Authorization" = "Bearer $cred" }

Invoke-WebRequest `
    -Method POST `
    -Headers $headers `
    -ContentType: "application/json; charset=utf-8" `
    -InFile request.json `
    -Uri "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/publishers/google/models/multimodalembedding@001:predict" | Select-Object -Expand Content
```
The embedding the model returns is a 1408 float vector. The following sample responses are shortened for space.

**Response (7 second video, no `videoSegmentConfig` specified):**

```
{
  "predictions": [
    {
      "videoEmbeddings": [
        {
          "endOffsetSec": 7,
          "embedding": [
            -0.0045467657,
            0.0258095954,
            0.0146885719,
            0.00945400633,
            [...]
            -0.0023291884,
            -0.00493789,
            0.00975185353,
            0.0168156829
          ],
          "startOffsetSec": 0
        }
      ]
    }
  ],
  "deployedModelId": "DEPLOYED_MODEL_ID"
}
```

**Response (59 second video, with the following video segment config: `"videoSegmentConfig": { "startOffsetSec": 0, "endOffsetSec": 60, "intervalSec": 10 }`):**

```
{
  "predictions": [
    {
      "videoEmbeddings": [
        {
          "endOffsetSec": 10,
          "startOffsetSec": 0,
          "embedding": [
            -0.00683252793,
            0.0390476175,
            [...]
            0.00657121744,
            0.013023301
          ]
        },
        {
          "startOffsetSec": 10,
          "endOffsetSec": 20,
          "embedding": [
            -0.0104404651,
            0.0357737206,
            [...]
            0.00509833824,
            0.0131902946
          ]
        },
        {
          "startOffsetSec": 20,
          "embedding": [
            -0.0113538112,
            0.0305239167,
            [...]
            -0.00195809244,
            0.00941874553
          ],
          "endOffsetSec": 30
        },
        {
          "embedding": [
            -0.00299320649,
            0.0322436653,
            [...]
            -0.00993082579,
            0.00968887936
          ],
          "startOffsetSec": 30,
          "endOffsetSec": 40
        },
        {
          "endOffsetSec": 50,
          "startOffsetSec": 40,
          "embedding": [
            -0.00591270532,
            0.0368893594,
            [...]
            -0.00219071587,
            0.0042470959
          ]
        },
        {
          "embedding": [
            -0.00458270218,
            0.0368121453,
            [...]
            -0.00317760976,
            0.00595594104
          ],
          "endOffsetSec": 59,
          "startOffsetSec": 50
        }
      ]
    }
  ],
  "deployedModelId": "DEPLOYED_MODEL_ID"
}
```

### Python

To learn how to install or update the Vertex AI SDK for Python, see [Install the Vertex AI SDK for Python](https://docs.cloud.google.com/vertex-ai/docs/start/use-vertex-ai-python-sdk).

For more information, see the
[Python API reference documentation](https://docs.cloud.google.com/python/docs/reference/aiplatform/latest).

    import vertexai

    from vertexai.vision_models import MultiModalEmbeddingModel, Video
    from vertexai.vision_models import VideoSegmentConfig

    # TODO(developer): Update & uncomment line below
    # PROJECT_ID = "your-project-id"
    vertexai.init(project=PROJECT_ID, location="us-central1")

    model = MultiModalEmbeddingModel.from_pretrained("multimodalembedding@001")

    embeddings = model.get_embeddings(
        video=Video.load_from_file(
            "gs://cloud-samples-data/vertex-ai-vision/highway_vehicles.mp4"
        ),
        video_segment_config=VideoSegmentConfig(end_offset_sec=1),
    )

    # Video Embeddings are segmented based on the video_segment_config.
    print("Video Embeddings:")
    for video_embedding in embeddings.video_embeddings:
        print(
            f"Video Segment: {video_embedding.start_offset_sec} - {video_embedding.end_offset_sec}"
        )
        print(f"Embedding: {video_embedding.embedding}")

    # Example response:
    # Video Embeddings:
    # Video Segment: 0.0 - 1.0
    # Embedding: [-0.0206376351, 0.0123456789, ...]

### Go

Before trying this sample, follow the Go setup instructions in the
[Agent Platform quickstart using
client libraries](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/start/client-libraries).

For more information, see the
[Agent Platform Go API
reference documentation](https://docs.cloud.google.com/go/docs/reference/cloud.google.com/go/aiplatform/latest/apiv1).

To authenticate to Agent Platform, set up Application Default Credentials.
For more information, see

[Set up authentication for a local development environment](https://docs.cloud.google.com/docs/authentication/set-up-adc-local-dev-environment).

    import (
        "context"
        "encoding/json"
        "fmt"
        "io"
        "time"

        aiplatform "cloud.google.com/go/aiplatform/apiv1beta1"
        aiplatformpb "cloud.google.com/go/aiplatform/apiv1beta1/aiplatformpb"
        "google.golang.org/api/option"
        "google.golang.org/protobuf/encoding/protojson"
        "google.golang.org/protobuf/types/known/structpb"
    )

    // generateForVideo shows how to use the multimodal model to generate embeddings for video input.
    func generateForVideo(w io.Writer, project, location string) error {
        // location = "us-central1"

        // The default context timeout may be not enough to process a video input.
        ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
        defer cancel()

        apiEndpoint := fmt.Sprintf("%s-aiplatform.googleapis.com:443", location)
        client, err := aiplatform.https://docs.cloud.google.com/go/docs/reference/cloud.google.com/go/aiplatform/latest/apiv1beta1.html#cloud_google_com_go_aiplatform_apiv1beta1_PredictionClient_NewPredictionClient(ctx, option.WithEndpoint(apiEndpoint))
        if err != nil {
            return fmt.Errorf("failed to construct API client: %w", err)
        }
        defer client.Close()

        model := "multimodalembedding@001"
        endpoint := fmt.Sprintf("projects/%s/locations/%s/publishers/google/models/%s", project, location, model)

        // This is the input to the model's prediction call. For schema, see:
        // https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/multimodal-embeddings-api#request_body
        instances, err := structpb.NewValue(map[string]any{
            "video": map[string]any{
                // Video input can be provided either as a Google Cloud Storage URI or as base64-encoded
                // bytes using the "bytesBase64Encoded" field.
                "gcsUri": "gs://cloud-samples-data/vertex-ai-vision/highway_vehicles.mp4",
                "videoSegmentConfig": map[string]any{
                    "startOffsetSec": 1,
                    "endOffsetSec":   5,
                },
            },
        })
        if err != nil {
            return fmt.Errorf("failed to construct request payload: %w", err)
        }

        req := &aiplatformpb.PredictRequest{
            Endpoint: endpoint,
            // The model supports only 1 instance per request.
            Instances: []*structpb.Value{instances},
        }
        resp, err := client.Predict(ctx, req)
        if err != nil {
            return fmt.Errorf("failed to generate embeddings: %w", err)
        }

        instanceEmbeddingsJson, err := protojson.Marshal(resp.GetPredictions()[0])
        if err != nil {
            return fmt.Errorf("failed to convert protobuf value to JSON: %w", err)
        }
        // For response schema, see:
        // https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/multimodal-embeddings-api#response-body
        var instanceEmbeddings struct {
            VideoEmbeddings []struct {
                Embedding      []float32 `json:"embedding"`
                StartOffsetSec float64   `json:"startOffsetSec"`
                EndOffsetSec   float64   `json:"endOffsetSec"`
            } `json:"videoEmbeddings"`
        }
        if err := json.Unmarshal(instanceEmbeddingsJson, &instanceEmbeddings); err != nil {
            return fmt.Errorf("failed to unmarshal json: %w", err)
        }
        // Get the embedding for our single video segment (`.videoEmbeddings` object has one entry per
        // each processed segment).
        videoEmbedding := instanceEmbeddings.VideoEmbeddings[0]

        fmt.Fprintf(w, "Video embedding (seconds: %.f-%.f; length=%d): %v\n",
            videoEmbedding.StartOffsetSec,
            videoEmbedding.EndOffsetSec,
            len(videoEmbedding.Embedding),
            videoEmbedding.Embedding,
        )
        // Example response:
        // Video embedding (seconds: 1-5; length=1408): [-0.016427778 0.032878537 -0.030755188 ... ]

        return nil
    }

### Get image, text, and video embeddings

Use the following sample to get embeddings for video, text, and image content.

### REST

The following example uses image, text, and video data. You can use any
combination of these data types in your request body.

Additionally, this
sample uses a video located in Cloud Storage. You can
also use the `video.bytesBase64Encoded` field to provide a
[base64-encoded](https://docs.cloud.google.com/gemini-enterprise-agent-platform/tutorials/base64-encode) string representation of the
video.

Before using any of the request data,
make the following replacements:

- <var translate="no">PROJECT_ID</var>: Your Google Cloud [project ID](https://docs.cloud.google.com/resource-manager/docs/creating-managing-projects#identifying_projects).
- <var translate="no">TEXT</var>: The target text to get embeddings for. For example, `a
  cat`.
- <var translate="no">IMAGE_URI</var>: The Cloud Storage URI of the target image to get embeddings for. For example, `gs://my-bucket/embeddings/supermarket-img.png`.
  You can also provide the image as a base64-encoded byte string:

  ```
  [...]
  "image": {
    "bytesBase64Encoded": "B64_ENCODED_IMAGE"
  }
  [...]
  ```
- <var translate="no">VIDEO_URI</var>: The Cloud Storage URI of the target video to get embeddings for. For example, `gs://my-bucket/embeddings/supermarket-video.mp4`. You can also provide the video as a base64-encoded
  byte string:

  ```
  [...]
  "video": {
    "bytesBase64Encoded": "B64_ENCODED_VIDEO"
  }
  [...]
  ```
- `videoSegmentConfig` (<var translate="no">START_SECOND</var>, <var translate="no">END_SECOND</var>, <var translate="no">INTERVAL_SECONDS</var>). Optional. The specific video segments (in seconds) the embeddings are generated for.

  > [!CAUTION]
  > The value you set for `videoSegmentConfig.intervalSec` affects the pricing tier you are charged at. For more information, see the [video embedding modes](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/embeddings/get-multimodal-embeddings#video-modes) section and [pricing](https://docs.cloud.google.com/gemini-enterprise-agent-platform/pricing) page.

  For example:

  ```
  [...]
    "videoSegmentConfig": {
      "startOffsetSec": 10,
      "endOffsetSec": 60,
      "intervalSec": 10
    }
    [...]
  ```

  Using this config specifies video data from 10 seconds to 60 seconds and
  generates embeddings for the following 10 second video intervals: \[10, 20),
  \[20, 30), \[30, 40), \[40, 50), \[50, 60). This video interval
  (`"intervalSec": 10`) falls in the [Standard
  video embedding mode](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/embeddings/get-multimodal-embeddings#video-modes), and the you are charged at the [Standard mode pricing rate](https://docs.cloud.google.com/gemini-enterprise-agent-platform/pricing).

  If you omit `videoSegmentConfig`, the service uses the following
  default values: `"videoSegmentConfig": { "startOffsetSec": 0,
  "endOffsetSec": 120, "intervalSec": 16 }`. This video interval
  (`"intervalSec": 16`) falls in the [Essential
  video embedding mode](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/embeddings/get-multimodal-embeddings#video-modes), and the user is charged at the [Essential mode pricing rate](https://docs.cloud.google.com/gemini-enterprise-agent-platform/pricing).

HTTP method and URL:

```
POST https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/publishers/google/models/multimodalembedding@001:predict
```

Request JSON body:

```
{
  "instances": [
    {
      "text": "TEXT",
      "image": {
        "gcsUri": "IMAGE_URI"
      },
      "video": {
        "gcsUri": "VIDEO_URI",
        "videoSegmentConfig": {
          "startOffsetSec": START_SECOND,
          "endOffsetSec": END_SECOND,
          "intervalSec": INTERVAL_SECONDS
        }
      }
    }
  ]
}
```

To send your request, choose one of these options:

#### curl

> [!NOTE]
> **Note:** The following command assumes that you have logged in to the `gcloud` CLI with your user account by running [`gcloud init`](https://docs.cloud.google.com/sdk/gcloud/reference/init) or [`gcloud auth login`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) , or by using [Cloud Shell](https://docs.cloud.google.com/shell/docs), which automatically logs you into the `gcloud` CLI . You can check the currently active account by running [`gcloud auth list`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/list).

Save the request body in a file named `request.json`,
and execute the following command:

```
curl -X POST \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d @request.json \
     "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/publishers/google/models/multimodalembedding@001:predict"
```

#### PowerShell

> [!NOTE]
> **Note:** The following command assumes that you have logged in to the `gcloud` CLI with your user account by running [`gcloud init`](https://docs.cloud.google.com/sdk/gcloud/reference/init) or [`gcloud auth login`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) . You can check the currently active account by running [`gcloud auth list`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/list).

Save the request body in a file named `request.json`,
and execute the following command:

```
$cred = gcloud auth print-access-token
$headers = @{ "Authorization" = "Bearer $cred" }

Invoke-WebRequest `
    -Method POST `
    -Headers $headers `
    -ContentType: "application/json; charset=utf-8" `
    -InFile request.json `
    -Uri "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/publishers/google/models/multimodalembedding@001:predict" | Select-Object -Expand Content
```
The embedding the model returns is a 1408 float vector. The following sample response is shortened for space.

```
{
  "predictions": [
    {
      "textEmbedding": [
        0.0105433334,
        -0.00302835181,
        0.00656806398,
        0.00603460241,
        [...]
        0.00445805816,
        0.0139605571,
        -0.00170318608,
        -0.00490092579
      ],
      "videoEmbeddings": [
        {
          "startOffsetSec": 0,
          "endOffsetSec": 7,
          "embedding": [
            -0.00673126569,
            0.0248149596,
            0.0128901172,
            0.0107588246,
            [...]
            -0.00180952181,
            -0.0054573305,
            0.0117037306,
            0.0169312079
          ]
        }
      ],
      "imageEmbedding": [
        -0.00728622358,
        0.031021487,
        -0.00206603738,
        0.0273937676,
        [...]
        -0.00204976718,
        0.00321615417,
        0.0121978866,
        0.0193375275
      ]
    }
  ],
  "deployedModelId": "DEPLOYED_MODEL_ID"
}
```

### Python

To learn how to install or update the Vertex AI SDK for Python, see [Install the Vertex AI SDK for Python](https://docs.cloud.google.com/vertex-ai/docs/start/use-vertex-ai-python-sdk).

For more information, see the
[Python API reference documentation](https://docs.cloud.google.com/python/docs/reference/aiplatform/latest).

    import vertexai

    from vertexai.vision_models import Image, MultiModalEmbeddingModel, Video
    from vertexai.vision_models import VideoSegmentConfig

    # TODO(developer): Update & uncomment line below
    # PROJECT_ID = "your-project-id"
    vertexai.init(project=PROJECT_ID, location="us-central1")

    model = MultiModalEmbeddingModel.from_pretrained("multimodalembedding@001")

    image = Image.load_from_file(
        "gs://cloud-samples-data/vertex-ai/llm/prompts/landmark1.png"
    )
    video = Video.load_from_file(
        "gs://cloud-samples-data/vertex-ai-vision/highway_vehicles.mp4"
    )

    embeddings = model.get_embeddings(
        image=image,
        video=video,
        video_segment_config=VideoSegmentConfig(end_offset_sec=1),
        contextual_text="Cars on Highway",
    )

    print(f"Image Embedding: {embeddings.image_embedding}")

    # Video Embeddings are segmented based on the video_segment_config.
    print("Video Embeddings:")
    for video_embedding in embeddings.video_embeddings:
        print(
            f"Video Segment: {video_embedding.start_offset_sec} - {video_embedding.end_offset_sec}"
        )
        print(f"Embedding: {video_embedding.embedding}")

    print(f"Text Embedding: {embeddings.text_embedding}")
    # Example response:
    # Image Embedding: [-0.0123144267, 0.0727186054, 0.000201397663, ...]
    # Video Embeddings:
    # Video Segment: 0.0 - 1.0
    # Embedding: [-0.0206376351, 0.0345234685, ...]
    # Text Embedding: [-0.0207006838, -0.00251058186, ...]

### Go

Before trying this sample, follow the Go setup instructions in the
[Agent Platform quickstart using
client libraries](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/start/client-libraries).

For more information, see the
[Agent Platform Go API
reference documentation](https://docs.cloud.google.com/go/docs/reference/cloud.google.com/go/aiplatform/latest/apiv1).

To authenticate to Agent Platform, set up Application Default Credentials.
For more information, see

[Set up authentication for a local development environment](https://docs.cloud.google.com/docs/authentication/set-up-adc-local-dev-environment).

    import (
        "context"
        "encoding/json"
        "fmt"
        "io"
        "time"

        aiplatform "cloud.google.com/go/aiplatform/apiv1beta1"
        aiplatformpb "cloud.google.com/go/aiplatform/apiv1beta1/aiplatformpb"
        "google.golang.org/api/option"
        "google.golang.org/protobuf/encoding/protojson"
        "google.golang.org/protobuf/types/known/structpb"
    )

    // generateForImageTextAndVideo shows how to use the multimodal model to generate embeddings for
    // image, text and video data.
    func generateForImageTextAndVideo(w io.Writer, project, location string) error {
        // location = "us-central1"

        // The default context timeout may be not enough to process a video input.
        ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
        defer cancel()

        apiEndpoint := fmt.Sprintf("%s-aiplatform.googleapis.com:443", location)
        client, err := aiplatform.https://docs.cloud.google.com/go/docs/reference/cloud.google.com/go/aiplatform/latest/apiv1beta1.html#cloud_google_com_go_aiplatform_apiv1beta1_PredictionClient_NewPredictionClient(ctx, option.WithEndpoint(apiEndpoint))
        if err != nil {
            return fmt.Errorf("failed to construct API client: %w", err)
        }
        defer client.Close()

        model := "multimodalembedding@001"
        endpoint := fmt.Sprintf("projects/%s/locations/%s/publishers/google/models/%s", project, location, model)

        // This is the input to the model's prediction call. For schema, see:
        // https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/multimodal-embeddings-api#request_body
        instance, err := structpb.NewValue(map[string]any{
            "text": "Domestic cats in natural conditions",
            "image": map[string]any{
                // Image and video inputs can be provided either as a Google Cloud Storage URI or as
                // base64-encoded bytes using the "bytesBase64Encoded" field.
                "gcsUri": "gs://cloud-samples-data/generative-ai/image/320px-Felis_catus-cat_on_snow.jpg",
            },
            "video": map[string]any{
                "gcsUri": "gs://cloud-samples-data/video/cat.mp4",
            },
        })
        if err != nil {
            return fmt.Errorf("failed to construct request payload: %w", err)
        }

        req := &aiplatformpb.PredictRequest{
            Endpoint: endpoint,
            // The model supports only 1 instance per request.
            Instances: []*structpb.Value{instance},
        }

        resp, err := client.Predict(ctx, req)
        if err != nil {
            return fmt.Errorf("failed to generate embeddings: %w", err)
        }

        instanceEmbeddingsJson, err := protojson.Marshal(resp.GetPredictions()[0])
        if err != nil {
            return fmt.Errorf("failed to convert protobuf value to JSON: %w", err)
        }
        // For response schema, see:
        // https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/multimodal-embeddings-api#response-body
        var instanceEmbeddings struct {
            ImageEmbeddings []float32 `json:"imageEmbedding"`
            TextEmbeddings  []float32 `json:"textEmbedding"`
            VideoEmbeddings []struct {
                Embedding      []float32 `json:"embedding"`
                StartOffsetSec float64   `json:"startOffsetSec"`
                EndOffsetSec   float64   `json:"endOffsetSec"`
            } `json:"videoEmbeddings"`
        }
        if err := json.Unmarshal(instanceEmbeddingsJson, &instanceEmbeddings); err != nil {
            return fmt.Errorf("failed to unmarshal JSON: %w", err)
        }

        imageEmbedding := instanceEmbeddings.ImageEmbeddings
        textEmbedding := instanceEmbeddings.TextEmbeddings
        // Get the embedding for our single video segment (`.videoEmbeddings` object has one entry per
        // each processed segment).
        videoEmbedding := instanceEmbeddings.VideoEmbeddings[0].Embedding

        fmt.Fprintf(w, "Image embedding (length=%d): %v\n", len(imageEmbedding), imageEmbedding)
        fmt.Fprintf(w, "Text embedding (length=%d): %v\n", len(textEmbedding), textEmbedding)
        fmt.Fprintf(w, "Video embedding (length=%d): %v\n", len(videoEmbedding), videoEmbedding)
        // Example response:
        // Image embedding (length=1408): [-0.01558477 0.0258355 0.016342038 ... ]
        // Text embedding (length=1408): [-0.005894961 0.008349559 0.015355394 ... ]
        // Video embedding (length=1408): [-0.018867437 0.013997682 0.0012682161 ... ]

        return nil
    }

## What's next

- Read the blog ["What is Multimodal Search: 'LLMs with vision' change
  businesses"](https://cloud.google.com/blog/products/ai-machine-learning/multimodal-generative-ai-search).
- For information about text-only use cases (text-based semantic search, clustering, long-form document analysis, and other text retrieval or question-answering use cases), read [Get text embeddings](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/embeddings/get-text-embeddings).
- Explore more pretrained models in [Model Garden](https://console.cloud.google.com/agent-platform/model-garden).
- Learn about [responsible AI best practices and safety filters in
  Gemini Enterprise Agent Platform](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/learn/responsible-ai).
