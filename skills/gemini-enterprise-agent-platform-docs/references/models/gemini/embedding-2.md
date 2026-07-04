Gemini Embedding 2 is Google's embedding generation model that's
ideal for complex retrieval and analytics tasks.

Gemini Embedding 2 accepts multimodal inputs to generate
3072-dimensional vectors. It accepts images, text, documents, audio, and video
inputs and semantically maps the generated vectors into a unified semantic
space. This lets you perform tasks, such as searching for an image based on a
text description.

Gemini Embedding 2 introduces several features to optimize
embedding quality and flexibility:

- **Custom task instructions:** By specifying task instructions (for
  example, `task:code retrieval` or `task:search result`) optimize
  the embeddings for the intended relationships and retrieve more accurate results
  for the specific goal.

- **Adjustable result size:** The model generates a 3072-dimensional float
  vector, by default. However, you can retrieve a smaller dimensional output by
  specifying the `output_dimensionality` parameter.

- **Document OCR:** Read OCR from document inputs.

- **Audio track extraction:** Extract audio tracks from video inputs and
  interleave them with video frames.

For more information on how to use Gemini Embedding 2, see [Get multimodal embeddings](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/embeddings/get-multimodal-embeddings).

[Try in Agent Studio](https://console.cloud.google.com/vertex-ai/generative/multimodal/create/text?model=gemini-embedding-2)

[Deploy example app](https://console.cloud.google.com/vertex-ai/studio/multimodal?suggestedPrompt=How+does+AI+work&deploy=true&model=gemini-embedding-2)
Note: "Deploy example app" requires a Google Cloud project with billing and Agent Platform API enabled.

| Model ID | `gemini-embedding-2` ||
| Modalities | Text Input only Image Input only Audio Input only Video Input only ||
| Token limits | Maximum input tokens | 8,192 |
| Token limits | Maximum output tokens | N/A |
| Maximum sequence length | 8,192 tokens ||
| Output dimensions | Up to 3,072 (with MRL support) ||
| Consumption options | - [Provisioned Throughput](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/provisioned-throughput) Not supported - [Batch inference](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/batch-inference) Not supported - [Pay-as-you-go](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/deploy/consumption-options) Standard PayGo Supported - [Fixed quota](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/quotas) Not supported ||
| Consumption options |
|---|---|---|
| See [Consumption options](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/deploy/consumption-options) for more information. ||
| **Image** | - Maximum images per prompt: 6 - Maximum file size per file for inline data or direct uploads through the console: No limit - Maximum file size per file from Google Cloud Storage: No limit - Maximum number of output images per prompt: N/A - Supported MIME types: `image/png`, `image/jpeg`, `image/webp`, `image/bmp`, `image/heic`, `image/heif`, `image/avif` |
| **Video** | - Maximum video length (with audio): 80 seconds - Maximum video length (without audio): 120 seconds - Maximum number of videos per prompt: 1 - Supported MIME types: `video/mpeg`, `video/mp4` |
| **Audio** | - Maximum audio length per prompt: 180 seconds - Maximum number of audio files per prompt: 1 - Supported MIME types: `audio/mp3`, `audio/wav` |
| See [Deployments and endpoints](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/locations) for more information. ||
