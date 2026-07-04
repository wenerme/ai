You can use Lyria to generate novel music tracks from prompts.
Supported interfaces include the Google Cloud console and the Gemini API in Gemini Enterprise Agent Platform
API.

[Try Lyria on Agent Platform (Agent Platform Studio)](https://console.cloud.google.com/vertex-ai/studio/media/music)

### Before you begin

1. Set up authentication for your environment.

   Select the tab for how you plan to use the samples on this page:

   ### Console

   When you use the Google Cloud console to access Google Cloud services and
   APIs, you don't need to set up authentication.

   ### REST

   To use the REST API samples on this page in a local development environment, you use the
   credentials you provide to the gcloud CLI.
   1. [Install](https://docs.cloud.google.com/sdk/docs/install) the Google Cloud CLI.
   2. If you're using an external identity provider (IdP), you must first [sign in to the gcloud CLI with your federated identity](https://docs.cloud.google.com/iam/docs/workforce-log-in-gcloud).

   For more information, see
   [Authenticate for using REST](https://docs.cloud.google.com/docs/authentication/rest)
   in the Google Cloud authentication documentation.

### Console

1. In the Google Cloud console, go to the **Vertex AI Studio \>
   Generate Media** \> **Generate media** page.

   [Generate studio](https://console.cloud.google.com/vertex-ai/studio/media/music)
2. Click **Music**.

3. From the **Task** menu, select **Text-to-music**.

4. From the **Model** menu, select a model from the options listed.

5. Optional: In the **Input assets** section, click **Add** to add an asset for
   this request.

6. In the **Prompt** box, enter your text prompt in US English that
   describes the music to generate.

7. Click **Run**.

   Generated audio clips are available for preview and downloadable as WAV
   files.

### Lyria 3 REST

Before using any of the request data,
make the following replacements:

- `PROJECT_ID`: A string representing your Google Cloud project ID.
-
  `MODEL_ID`: A string
  representing the model ID to use. The following are accepted values:

  - `lyria-3-clip-preview`
  - `lyria-3-pro-preview`
- `TEXT_PROMPT`: The text prompt used to guide music generation.
- `IMAGE_URI`: optional: the Cloud Storage uri where your input image is located.
- `IMAGE_DATABYTES`: Optional: A Base64-encoded input image.

HTTP method and URL:

```
POST https://aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/global/interactions
```

Request JSON body:

```
{
  "model": "MODEL_ID",
  "input": [
    {
      "type": "text",
      "text": "TEXT_PROMPT"
    },
    {
      "type": "image",
      "mime_type": "image/jpeg",
      "uri": "IMAGE_URI"
    },
    {
      "type": "image",
      "mime_type": "image/png",
      "data": "IMAGE_DATABYTES"
    },
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
     "https://aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/global/interactions"
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
    -Uri "https://aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/global/interactions" | Select-Object -Expand Content
```
The request returns the operation name, status, and result.

```
{
  "status": "completed",
  "outputs": [
    {
      "text": "LYRICS",
      "type": "text"
    },
    {
      "text": "DESCRIPTION",
      "type": "text"
    },
    {
      "mime_type": "audio/mpeg",
      "data": "GENERATED_SONG_DATABYTES",
      "type": "audio"
    },
    {}
  ],
  "role": "model",
  "created": "CREATED_TIME",
  "updated": "UPDATE_TIME",
  "object": "interaction",
  "model": "lyria-3-pro-preview"
}

```

### Lyria 2 REST

Use the `predict` method to send a music generation request. The
response will directly contain the audio data, typically base64-encoded if the
response is JSON.

For more information about `lyria-002` model requests, see the
[`lyria-002` model API reference](https://docs.cloud.google.com/vertex-ai/docs/model-reference/lyria-music-generation).

To generate music, send a POST request to the model's `predict` endpoint.

**Request:**

    curl -X POST \
      -H "Authorization: Bearer $(gcloud auth print-access-token)" \
      -H "Content-Type: application/json" \
      https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/publishers/google/models/lyria-002:predict \
      -d '{
        "instances": [
          {
            "prompt": "An uplifting and hopeful orchestral piece with a soaring string melody and triumphant brass.",
            "negative_prompt": " dissonant, minor key",
            "seed": 12345
          }
        ],
        "parameters": {
          // "sample_count": 1 // Use either seed or sample_count
        }
      }'

**Response:**

A successful request returns a JSON object containing the generated audio data.
This should look something like this:

    {
      "predictions": [
        {
          "audioContent": "BASE64_ENCODED_WAV_STRING_SAMPLE_1",
          "mimeType": "audio/wav"
        },
        {
          "audioContent": "BASE64_ENCODED_WAV_STRING_SAMPLE_2",
          "mimeType": "audio/wav"
        }
      ],
      "deployedModelId": "xxxxxxxxxxxxxxx",
      "model": "projects/PROJECT_ID/locations/LOCATION/publishers/google/models/lyria-002",
      "modelDisplayName": "Lyria 2"
    }

You would then decode the `audioContent` (base64) to get the WAV audio file.
Each clip is 32.8 seconds long.

## What's next

- Learn how to write effective prompts in the [Lyria music generation prompt
  guide](https://docs.cloud.google.com/vertex-ai/docs/music/music-gen-prompt-guide)

- Explore the [Lyria API
  reference](https://docs.cloud.google.com/vertex-ai/docs/model-reference/lyria-music-generation)

- Discover other [Generative AI models on
  Gemini Enterprise Agent Platform](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models)
