You can use Veo on Gemini Enterprise Agent Platform to generate new videos from a text prompt. Supported
interfaces include the Google Cloud console and the Agent Platform API.

The following models support generating video from a text prompt:

- [`veo-2.0-generate-001`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/2-0-generate#2.0-generate-001)
- [`veo-2.0-generate-exp`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/2-0-generate#2.0-generate-exp) preview
- [`veo-2.0-generate-preview`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/2-0-generate#2.0-generate-preview) preview
- [`veo-3.0-generate-preview`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-0-generate#3.0-generate-preview) preview
- [`veo-3.0-fast-generate-preview`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-0-generate#3.0-fast-generate-preview) preview
- [`veo-3.0-generate-001`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-0-generate#3.0-generate-001)
- [`veo-3.0-fast-generate-001`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-0-generate#3.0-fast-generate-001)
- [`veo-3.1-generate-preview`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-1-generate#3.1-generate-preview) preview
- [`veo-3.1-fast-generate-preview`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-1-generate#3.1-fast-generate-preview) preview
- [`veo-3.1-generate-001`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-1-generate#3.1-generate-001)
- [`veo-3.1-fast-generate-001`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-1-generate#3.1-fast-generate-001)
- [`veo-3.1-lite-generate-001`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-1-generate#3.1-lite-generate-001-preview) preview

For more information about writing effective text prompts for video generation,
see the [Veo prompt
guide](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/video/video-gen-prompt-guide).

[Try Veo in a Colab](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/vision/getting-started/veo3_video_generation.ipynb)

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

## Generate videos from text

The following examples show how you can use text prompts to generate videos:

### Console

1. In the Google Cloud console, go to the **Agent Platform \> Media Studio**
   page.

   [Media Studio](https://console.cloud.google.com/vertex-ai/studio/media/video)
2. Click **Video**.

3. In the **Task** menu, select **Text-to-video**.

4. From the **Model** menu, select a model from the displayed options.

5. In the **Prompt** box, enter a text prompt that describes the videos to
   generate.

6. Optional: Adjust the following **Parameters**:

   - **Aspect ratio** : choose either **16:9** or **9:16**.

   - **Number of results** : adjust the slider or enter a value between **1**
     and **4**.

   - **Video length**: select a video length from the menu.

   - **Output directory** : click **Browse** to create or select a
     [Cloud Storage bucket](https://docs.cloud.google.com/storage/docs/buckets) to store the generated
     files.

7. Click **Run**.

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
        model="veo-3.1-generate-001",
        prompt="a cat reading a book",
        config=GenerateVideosConfig(
            aspect_ratio="16:9",
            output_gcs_uri=output_gcs_uri,
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

### Go

Learn how to install or update the [Go](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/sdks/overview).

To learn more, see the
[SDK reference documentation](https://pkg.go.dev/google.golang.org/genai).

Set environment variables to use the Google Gen AI SDK with Vertex AI:

```bash
# Replace the `GOOGLE_CLOUD_PROJECT` and `GOOGLE_CLOUD_LOCATION` values
# with appropriate values for your project.
export GOOGLE_CLOUD_PROJECT=GOOGLE_CLOUD_PROJECT
export GOOGLE_CLOUD_LOCATION=global
export GOOGLE_GENAI_USE_ENTERPRISE=True
```

    import (
        "context"
        "fmt"
        "io"
        "time"

        "google.golang.org/genai"
    )

    // generateVideoWithText shows how to gen video from text.
    func generateVideoWithText(w io.Writer, outputGCSURI string) error {
        //outputGCSURI = "gs://your-bucket/your-prefix"
        ctx := context.Background()

        client, err := genai.NewClient(ctx, &genai.ClientConfig{
            HTTPOptions: genai.HTTPOptions{APIVersion: "v1"},
        })
        if err != nil {
            return fmt.Errorf("failed to create genai client: %w", err)
        }

        config := &genai.GenerateVideosConfig{
            AspectRatio:  "16:9",
            OutputGCSURI: outputGCSURI,
        }

        modelName := "veo-3.0-generate-preview"
        prompt := "a cat reading a book"
        operation, err := client.Models.GenerateVideos(ctx, modelName, prompt, nil, config)
        if err != nil {
            return fmt.Errorf("failed to start video generation: %w", err)
        }

        // Polling until the operation is done
        for !operation.Done {
            time.Sleep(15 * time.Second)
            operation, err = client.Operations.GetVideosOperation(ctx, operation, nil)
            if err != nil {
                return fmt.Errorf("failed to get operation status: %w", err)
            }
        }

        if operation.Response != nil && len(operation.Response.GeneratedVideos) > 0 {
            videoURI := operation.Response.GeneratedVideos[0].Video.URI
            fmt.Fprintln(w, videoURI)
            return nil
        }

        // Example response:
        // gs://your-bucket/your-prefix/videoURI

        return fmt.Errorf("video generation failed or returned no results")
    }

### Node.js

#### Install

```
npm install @google/genai
```

To learn more, see the
[SDK reference documentation](https://googleapis.github.io/js-genai/).

Set environment variables to use the Google Gen AI SDK with Vertex AI:

```bash
# Replace the `GOOGLE_CLOUD_PROJECT` and `GOOGLE_CLOUD_LOCATION` values
# with appropriate values for your project.
export GOOGLE_CLOUD_PROJECT=GOOGLE_CLOUD_PROJECT
export GOOGLE_CLOUD_LOCATION=global
export GOOGLE_GENAI_USE_ENTERPRISE=True
```

    const {GoogleGenAI} = require('@google/genai');

    const GOOGLE_CLOUD_PROJECT = process.env.GOOGLE_CLOUD_PROJECT;
    const GOOGLE_CLOUD_LOCATION = process.env.GOOGLE_CLOUD_LOCATION || 'global';

    async function generateVideo(
      outputGcsUri,
      projectId = GOOGLE_CLOUD_PROJECT,
      location = GOOGLE_CLOUD_LOCATION
    ) {
      const client = new GoogleGenAI({
        vertexai: true,
        project: projectId,
        location: location,
      });

      let operation = await client.models.generateVideos({
        model: 'veo-3.1-fast-generate-001',
        prompt: 'a cat reading a book',
        config: {
          aspectRatio: '16:9',
          outputGcsUri: outputGcsUri,
        },
      });

      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 15000));
        operation = await client.operations.get({operation: operation});
        console.log(operation);
      }

      if (operation.response) {
        console.log(operation.response.generatedVideos[0].video.uri);
      }
      return operation;
    }

### Java

Learn how to install or update the [Java](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/sdks/overview).

To learn more, see the
[SDK reference documentation](https://central.sonatype.com/artifact/com.google.genai/google-genai).

Set environment variables to use the Google Gen AI SDK with Vertex AI:

```bash
# Replace the `GOOGLE_CLOUD_PROJECT` and `GOOGLE_CLOUD_LOCATION` values
# with appropriate values for your project.
export GOOGLE_CLOUD_PROJECT=GOOGLE_CLOUD_PROJECT
export GOOGLE_CLOUD_LOCATION=global
export GOOGLE_GENAI_USE_ENTERPRISE=True
```

    import com.google.genai.Client;
    import com.google.genai.types.GenerateVideosConfig;
    import com.google.genai.types.GenerateVideosOperation;
    import com.google.genai.types.GenerateVideosResponse;
    import com.google.genai.types.GenerateVideosSource;
    import com.google.genai.types.GeneratedVideo;
    import com.google.genai.types.GetOperationConfig;
    import com.google.genai.types.Video;
    import java.util.concurrent.TimeUnit;

    public class VideoGenWithTxt {

      public static void main(String[] args) throws InterruptedException {
        // TODO(developer): Replace these variables before running the sample.
        String modelId = "veo-3.1-generate-001";
        String outputGcsUri = "gs://your-bucket/your-prefix";
        generateContent(modelId, outputGcsUri);
      }

      // Generates a video with a text prompt.
      public static String generateContent(String modelId, String outputGcsUri)
          throws InterruptedException {
        // Client Initialization. Once created, it can be reused for multiple requests.
        try (Client client = Client.builder().location("global").vertexAI(true).build()) {

          GenerateVideosOperation operation =
              client.models.generateVideos(
                  modelId,
                  GenerateVideosSource.builder().prompt("a cat reading a book").build(),
                  GenerateVideosConfig.builder()
                      .aspectRatio("16:9")
                      .outputGcsUri(outputGcsUri)
                      .build());

          while (!operation.done().orElse(false)) {
            TimeUnit.SECONDS.sleep(15);
            operation =
                client.operations.getVideosOperation(operation, GetOperationConfig.builder().build());
          }

          String generatedVideoUri =
              operation
                  .response()
                  .flatMap(GenerateVideosResponse::generatedVideos)
                  .flatMap(videos -> videos.stream().findFirst())
                  .flatMap(GeneratedVideo::video)
                  .flatMap(Video::uri)
                  .orElseThrow(
                      () ->
                          new IllegalStateException(
                              "Could not get the URI from the generated video"));

          System.out.println("Generated video URI: " + generatedVideoUri);
          // Example response:
          // Generated video URI: gs://your-bucket/your-prefix/generated-video-123.mp4
          return generatedVideoUri;
        }
      }
    }

### REST

For more information about the Veo API, see the following:

- [Method:
  `endpoints.predict`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations.endpoints/predict)
- [`VideoGenerationModelInstance`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/Shared.Types/VideoGenerationModelInstance)
- [`VideoGenerationModelParams`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/Shared.Types/VideoGenerationModelParams)
- [`VideoGenerationModelResult`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/Shared.Types/VideoGenerationModelResult)

1. Use the following command to send a video generation request. This
   request begins a long-running operation and stores output to a
   Cloud Storage bucket you specify.

   Before using any of the request data,
   make the following replacements:
   - `PROJECT_ID`: A string representing your Google Cloud project ID.
   - `MODEL_ID`: A string respresenting the model ID to use. The following are accepted values:
     - **Veo 2:** `"veo-2.0-generate-001"`
     - **Veo 3:** `"veo-3.0-generate-001"`
     - **Veo 3:** `"veo-3.0-fast-generate-001"`
     - **Veo 3:** `"veo-3.0-generate-preview"` (Preview)
     - **Veo 3:** `"veo-3.0-fast-generate-preview"` (Preview)
     - **Veo 3.1:** `"veo-3.1-generate-001"`
     - **Veo 3.1:** `"veo-3.1-fast-generate-001"`
   - `TEXT_PROMPT`: The text prompt used to guide video generation.
   - `OUTPUT_STORAGE_URI`: Optional: A string representing the Cloud Storage bucket to store the output videos. If not provided, video bytes are returned in the response. For example: `"gs://video-bucket/output/"`.
   - `RESPONSE_COUNT`: The number of video files to generate. The accepted range of values is `1`-`4`.
   - `DURATION`: An integer representing the length of the generated video files. The following are the accepted values for each model:
     - Veo 2 models: `5`-`8`. The default is `8`.
     - Veo 3 models: `4`, `6`, or `8`. The default is `8`.
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
       "sampleCount": "RESPONSE_COUNT"
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

2. Optional: Check the status of the video generation long-running
   operation.

   Before using any of the request data,
   make the following replacements:
   - <var translate="no">PROJECT_ID</var>: Your Google Cloud [project ID](https://docs.cloud.google.com/resource-manager/docs/creating-managing-projects#identifying_projects).
   - <var translate="no">MODEL_ID</var>: The model ID to use.
   - <var translate="no">OPERATION_ID</var>: The unique operation ID returned in the original generate video request.

   HTTP method and URL:

   ```
   POST https://us-central1-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/us-central1/publishers/google/models/MODEL_ID:fetchPredictOperation
   ```

   Request JSON body:

   ```
   {
     "operationName": "projects/PROJECT_ID/locations/us-central1/publishers/google/models/MODEL_ID/operations/OPERATION_ID"
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
        "https://us-central1-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/us-central1/publishers/google/models/MODEL_ID:fetchPredictOperation"
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
       -Uri "https://us-central1-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/us-central1/publishers/google/models/MODEL_ID:fetchPredictOperation" | Select-Object -Expand Content
   ```
   This request returns information about the operation, including if the operation is still running or is done.

   #### Response

   ```
   {
     "name": "projects/PROJECT_ID/locations/us-central1/publishers/google/models/MODEL_ID/operations/OPERATION_ID",
     "done": true,
     "response": {
       "raiMediaFilteredCount": 0,
       "@type": "type.googleapis.com/cloud.ai.large_models.vision.GenerateVideoResponse",
       "videos": [
         {
           "gcsUri":"gs://BUCKET_NAME/TIMESTAMPED_FOLDER/sample_0.mp4",
           "mimeType": "video/mp4"
         }
       ]
     }
   }
   ```

## What's next

- [Veo on Gemini Enterprise Agent Platform prompt guide](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/video/video-gen-prompt-guide)

- [Best practices for Veo on Gemini Enterprise Agent Platform](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/video/best-practice)

- [Generate videos with Veo on Gemini Enterprise Agent Platform from an image](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/video/generate-videos-from-an-image)

- [Generate videos with Veo on Gemini Enterprise Agent Platform using first and last video
  frames](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/video/generate-videos-from-first-and-last-frames)

- [Extend Veo on Gemini Enterprise Agent Platform-generate videos](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/video/extend-a-veo-video)

- [Understand responsible AI and usage guidelines for
  Veo on Gemini Enterprise Agent Platform](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/video/responsible-ai-and-usage-guidelines)
