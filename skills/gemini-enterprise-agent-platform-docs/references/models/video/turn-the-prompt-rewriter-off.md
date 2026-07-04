Veo offers an LLM-based prompt enhancement tool, also known as a
prompt rewriter. The prompt rewriter offers the option to rewrite your prompts
to add video description, camera motions, transcription, and sound effects to
your prompt. More detailed prompts result in higher quality videos.

If you disable prompt enhancement, the quality of the videos and how well the
output resembles the prompt that you supplied may be impacted. This feature is
enabled by default for `veo-2.0-generate-001`.

> [!IMPORTANT]
> **Important:** You can't disable the prompt rewriter when using Veo 3 and 3.1 models.

A rewritten prompt is delivered by API response only if the original prompt is
fewer than 30 words long.

For more information about writing effective text prompts for video generation,
see the [Veo prompt
guide](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/video/video-gen-prompt-guide).

## Before you begin

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

## Turn off prompt rewriter

To turn prompt enhancement off, do the following:

### Console

1. In the Google Cloud console, go to the **Agent Platform Studio \> Media
   Studio** page.

   [Go to Media Studio](https://console.cloud.google.com/vertex-ai/studio/media/generate;tab=video)
2. Click **Veo**.

3. In **Settings** , click the **Enable prompt enhancement toggle**.

4. In the **Write your prompt** box, enter your prompt and then click
   **Generate**.

### Python

#### Install

```
pip install --upgrade google-genai
```

To learn more, see the
[SDK reference documentation](https://googleapis.github.io/python-genai/).

Set environment variables to use the Google Gen AI SDK with Vertex AI:

```bash
# Replace the `GOOGLE_CLOUD_PROJECT` and `GOOGLE_CLOUD_LOCATION` values
# with appropriate values for your project.
export GOOGLE_CLOUD_PROJECT=GOOGLE_CLOUD_PROJECT
export GOOGLE_CLOUD_LOCATION=global
export GOOGLE_GENAI_USE_ENTERPRISE=True
```

    import time
    from google import genai
    from google.genai.types import GenerateVideosConfig

    client = genai.Client()

    # TODO(developer): Update and un-comment below line
    # output_gcs_uri = "gs://your-bucket/your-prefix"

    operation = client.models.generate_videos(
        model="veo-2.0-generate-001",
        prompt="a cat reading a book",
        config=GenerateVideosConfig(
            aspect_ratio="16:9",
            output_gcs_uri=output_gcs_uri,
            number_of_videos=1,
            duration_seconds=5,
            person_generation="dont_allow",
            enhance_prompt=False,
        ),
    )

    while not operation.done:
        time.sleep(15)
        operation = client.operations.get(operation)
        print(operation)

    if operation.response:
        print(operation.result.generated_videos[0].video.uri)

    # Example response:
    # gs://your-bucket/your-prefix

### REST

For more information about the Veo API, see the following:

- [Method:
  `endpoints.predict`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations.endpoints/predict)
- [`VideoGenerationModelInstance`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/Shared.Types/VideoGenerationModelInstance)
- [`VideoGenerationModelParams`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/Shared.Types/VideoGenerationModelParams)
- [`VideoGenerationModelResult`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/Shared.Types/VideoGenerationModelResult)

1. Use the following command to send a video generation request. This request begins a long-running operation and stores output to a Cloud Storage bucket you specify.

Before using any of the request data,
make the following replacements:

- <var translate="no">PROJECT_ID</var>: Your Google Cloud [project ID](https://docs.cloud.google.com/resource-manager/docs/creating-managing-projects#identifying_projects).
- <var translate="no">MODEL_ID</var>: The model ID to use. Available values:
  - `veo-2.0-generate-001`
- <var translate="no">TEXT_PROMPT</var>: The text prompt used to guide video generation.
- <var translate="no">OUTPUT_STORAGE_URI</var>: Optional: The Cloud Storage bucket to store the output videos. If not provided, video bytes are returned in the response. For example: `gs://video-bucket/output/`.
- <var translate="no">RESPONSE_COUNT</var>: The number of video files you want to generate. Accepted integer values: 1-4.
- <var translate="no">DURATION</var>: The length of video files that you want to generate. Accepted integer values are 5-8.
- <var translate="no">ENHANCED_PROMPT</var>: Whether to use enhanced prompts or not. You can use one of the following:
  - **`True`**: (default) use Gemini to enhance your prompts.
  - **`False`**: don't use Gemini to enhance your prompts.
- **Additional optional parameters**

  Use the following optional variables depending on your use
  case. Add some or all of the following parameters in the `"parameters": {}` object.

  ```
  "parameters": {
    "aspectRatio": "ASPECT_RATIO",
    "negativePrompt": "NEGATIVE_PROMPT",
    "personGeneration": "PERSON_SAFETY_SETTING",
    // "resolution": RESOLUTION, // Veo 3 models only
    "sampleCount": RESPONSE_COUNT,
    "seed": SEED_NUMBER
  }
  ```
  - `ASPECT_RATIO`: Optional: A string value that describes the aspect ratio of the generated videos. You can use the following values:
    - `"16:9"` for landscape
    - `"9:16"` for portrait

    The default value is `"16:9"`
  - `NEGATIVE_PROMPT`: Optional: A string value that describes content that you want to prevent the model from generating.
  - `PERSON_SAFETY_SETTING`: Optional: A string value that controls the safety setting for generating people or face generation. You can use the following values:
    - `"allow_adult"`: Only allow generation of adult people and faces.
    - `"disallow"`: Doesn't generate people or faces.

    The default value is `"allow_adult"`.
  - `RESOLUTION`: Optional: A string value that controls the resolution of the generated video. Supported by **Veo 3 models only.** You can use the following values:
    - `"720p"`
    - `"1080p"`
    - `"4k"` (Veo 3.1 Preview models only)

    The default value is `"720p"`.
  - `RESPONSE_COUNT`: Optional. An integer value that describes the number of videos to generate. The accepted range of values is `1`-`4`.
  - `SEED_NUMBER`: Optional. An uint32 value that the model uses to generate deterministic videos. Specifying a seed number with your request without changing other parameters guides the model to produce the same videos. The accepted range of values is `0`-`4294967295`.

HTTP method and URL:

```
POST https://us-central1-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/us-central1/publishers/google/models/MODEL_ID:predictLongRunning
```

Request JSON body:

```
{
  "instances": [
    {
      "prompt": "TEXT_PROMPT"
    }
  ],
  "parameters": {
    "storageUri": "OUTPUT_STORAGE_URI",
    "sampleCount": "RESPONSE_COUNT",
    "durationSeconds": "DURATION",
    "enhancePrompt": ENHANCED_PROMPT
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
     "https://us-central1-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/us-central1/publishers/google/models/MODEL_ID:predictLongRunning"
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
    -Uri "https://us-central1-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/us-central1/publishers/google/models/MODEL_ID:predictLongRunning" | Select-Object -Expand Content
```
This request returns a full operation name with a unique operation ID. Use this full operation name to poll that status of the video generation request.

```
{
  "name": "projects/PROJECT_ID/locations/us-central1/publishers/google/models/MODEL_ID/operations/a1b07c8e-7b5a-4aba-bb34-3e1ccb8afcc8"
}
```

## What's next

- [Generate videos from text](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/video/generate-videos-from-text)
- [Generate videos from an image](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/video/generate-videos-from-an-image)
- [Learn more about prompts](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/video/video-gen-prompt-guide)
- [Understand responsible AI and usage guidelines for
  Veo on Gemini Enterprise Agent Platform](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/video/responsible-ai-and-usage-guidelines)
