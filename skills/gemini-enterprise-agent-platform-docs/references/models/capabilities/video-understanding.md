> [!NOTE]
> To see an example of video understanding,
> run the "YouTube Video Analysis with Gemini" notebook in one of the following
> environments:
>
> [!Open in Colab](https://colab.research.google.com/github/GoogleCloudPlatform/generative-ai/blob/main/gemini/use-cases/video-analysis/youtube_video_analysis.ipynb)
>
>
> \|
>
> [!Open in Colab Enterprise](https://console.cloud.google.com/agent-platform/colab/import/https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fgemini%2Fuse-cases%2Fvideo-analysis%2Fyoutube_video_analysis.ipynb)
>
>
> \|
>
> [!Open
> in Agent Platform Workbench](https://console.cloud.google.com/agent-platform/workbench/deploy-notebook?download_url=https://raw.githubusercontent.com/GoogleCloudPlatform/generative-ai/main/gemini/use-cases/video-analysis/youtube_video_analysis.ipynb)
>
>
> \|
>
> [!View on GitHub](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/use-cases/video-analysis/youtube_video_analysis.ipynb)

You can add videos to Gemini requests to perform tasks that involve
understanding the contents of the included videos. This page
shows you how to add videos to your requests to Gemini in
Gemini Enterprise Agent Platform by using the Google Cloud console and the Agent Platform API.

## Supported models

The following table lists the models that support video understanding:

| Models | Media details | MIME types |
|---|---|---|
| - [Gemini Omni Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/omni-flash-preview) preview | - Maximum video length (with audio): 10 seconds - Maximum video length (without audio): 10 seconds - Maximum number of videos per prompt: 3 | - `video/x-flv` - `video/quicktime` - `video/mpeg` - `video/mpegs` - `video/mpg` - `video/mp4` - `video/webm` - `video/wmv` - `video/3gpp` |
| - [Gemini 3.5 Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-5-flash) - [Gemini 3.1 Flash-Lite](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-flash-lite) - [Gemini 2.5 Pro](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-pro) - [Gemini 2.5 Flash-Lite](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash-lite) preview - [Gemini 2.5 Flash-Lite](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash-lite) - [Gemini 2.5 Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash) preview - [Gemini 2.5 Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash) | - Maximum video length (with audio): Approximately 45 minutes - Maximum video length (without audio): Approximately 1 hour - Maximum number of videos per prompt: 10 | - `video/x-flv` - `video/quicktime` - `video/mpeg` - `video/mpegs` - `video/mpg` - `video/mp4` - `video/webm` - `video/wmv` - `video/3gpp` |
| - [Gemini 3.1 Pro](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-pro) preview - [Gemini 3 Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-flash) preview | - Maximum video length (with audio): Approximately 45 minutes - Maximum video length (without audio): Approximately 1 hour - Maximum number of videos per prompt: 10 - Default resolution tokens per frame: 70 | - `video/x-flv` - `video/quicktime` - `video/mpeg` - `video/mpegs` - `video/mpg` - `video/mp4` - `video/webm` - `video/wmv` - `video/3gpp` |
| - [Gemini 2.5 Flash with Gemini Live API native audio](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash-live-api) | - Standard resolution: 768 x 768 | - `video/x-flv` - `video/quicktime` - `video/mpeg` - `video/mpegs` - `video/mpg` - `video/mp4` - `video/webm` - `video/wmv` - `video/3gpp` |

For a list of languages supported by Gemini models, see model information
[Google models](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/google-models). To learn
more about how to design multimodal prompts, see
[Design multimodal prompts](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/design-multimodal-prompts).
If you're looking for a way to use Gemini directly from your mobile and
web apps, see the
[Firebase AI Logic client SDKs](https://firebase.google.com/docs/ai-logic) for
Swift, Android, Web, Flutter, and Unity apps.

## Add videos to a request

You can add a single video or multiple videos in your request to Gemini and the
videos can include audio.

### Single video

The sample code in each of the following tabs shows a different way to identify
what's in a video. This sample works with all Gemini multimodal models.

### Console

To send a multimodal prompt by using the Google Cloud console, do the following:

1. In the Agent Platform section of the Google Cloud console, go to
   the **Agent Studio** page.

   [Go to Agent Studio](https://console.cloud.google.com/agent-platform/generative/multimodal)
2. Click **Create prompt**.

3. Optional: Configure the model and parameters:

   - **Model**: Select a model.
4. Optional: To configure advanced parameters, click **Advanced** and
   configure as follows:

   #### Click to expand advanced configurations

   - **Top-K**: Use the slider or textbox to enter a value for top-K.

     Top-K changes how the model selects tokens for output. A top-K of `1` means the next selected token is the most probable among all tokens in the model's vocabulary (also called greedy decoding), while a top-K of `3` means that the next token is selected from among the three most probable tokens by using temperature.

     For each token selection step, the top-K tokens with the highest
     probabilities are sampled. Then tokens are further filtered based on top-P with
     the final token selected using temperature sampling.

     Specify a lower value for less random responses and a higher value for more
     random responses.
   - **Top-P** : Use the slider or textbox to enter a value for top-P. Tokens are selected from most probable to the least until the sum of their probabilities equals the value of top-P. For the least variable results, set top-P to `0`.
   - **Max responses**: Use the slider or textbox to enter a value for the number of responses to generate.
   - **Streaming responses**: Enable to print responses as they're generated.
   - **Safety filter threshold**: Select the threshold of how likely you are to see responses that could be harmful.
   - **Enable Grounding**: Grounding isn't supported for multimodal prompts.
   - **Region**: Select the region that you want to use.
   - **Temperature** : Use the slider or textbox to enter a value for temperature.

         The temperature is used for sampling during response generation, which occurs when `topP`
         and `topK` are applied. Temperature controls the degree of randomness in token selection.
         Lower temperatures are good for prompts that require a less open-ended or creative response, while
         higher temperatures can lead to more diverse or creative results. A temperature of `0`
         means that the highest probability tokens are always selected. In this case, responses for a given
         prompt are mostly deterministic, but a small amount of variation is still possible.

         If the model returns a response that's too generic, too short, or the model gives a fallback
         response, try increasing the temperature. If the model enters infinite generation, increasing the
         temperature to at least `0.1` may lead to improved results.
          `1.0` is the
         recommended starting value for temperature.

           <li>**Output token limit**: Use the slider or textbox to enter a value for
             the max output limit.

         Maximum number of tokens that can be generated in the response. A token is
         approximately four characters. 100 tokens correspond to roughly 60-80 words.

         Specify a lower value for shorter responses and a higher value for potentially longer
         responses.

           <li>**Add stop sequence**: Optional. Enter a stop sequence, which is a
             series of characters that includes spaces. If the model encounters a
             stop sequence, the response generation stops. The stop sequence isn't
             included in the response, and you can add up to five stop sequences.
         </ul>

5. Click **Insert Media**, and select a source for your file.

   ### Upload

   Select the file that you want to upload and click **Open**.

   ### By URL

   Enter the URL of the file that you want to use and click **Insert**.

   ### YouTube

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

   Enter the URL of the YouTube video that you want to use and click
   **Insert**.

   You can use any public video or a video that's owned by the account that
   you used to sign in to the Google Cloud console.

   ### Cloud Storage

   Select the bucket and then the file from the bucket that
   you want to import and click **Select**.

   ### Google Drive

   1. Choose an account and give consent to Agent Studio to access your account the first time you select this option. You can upload multiple files that have a total size of up to 10 MB. A single file can't exceed 7 MB.
   2. Click the file that you want to add.
   3. Click **Select**.

      The file thumbnail displays in the **Prompt** pane. The total
      number of tokens also displays. If your prompt data exceeds the
      [token limit](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/google-models), the
      tokens are truncated and aren't included in processing your data.
6. Enter your text prompt in the **Prompt** pane.

7. Optional: To view the **Token ID to text** and **Token IDs** , click the
   **tokens count** in the **Prompt** pane.

   > [!NOTE]
   > **Note:** Media tokens aren't supported.

8. Click **Submit**.

9. Optional: To save your prompt to **My prompts** , click **Save**.

10. Optional: To get the Python code or a curl command for your prompt, click
    **Build with code \> Get code**.

### Python

#### Install

```
pip install --upgrade google-genai
```

To learn more, see the
[SDK reference documentation](https://googleapis.github.io/python-genai/).

Set environment variables to use the Gen AI SDK with Vertex AI:

```bash
# Replace the `GOOGLE_CLOUD_PROJECT` and `GOOGLE_CLOUD_LOCATION` values
# with appropriate values for your project.
export GOOGLE_CLOUD_PROJECT=GOOGLE_CLOUD_PROJECT
export GOOGLE_CLOUD_LOCATION=global
export GOOGLE_GENAI_USE_ENTERPRISE=True
```

    from google import genai
    from google.genai.types import HttpOptions, Part

    client = genai.Client(http_options=HttpOptions(api_version="v1"))
    response = client.models.generate_content(
        model="gemini-3.5-flash",
        contents=[
            Part.from_uri(
                file_uri="gs://cloud-samples-data/generative-ai/video/ad_copy_from_video.mp4",
                mime_type="video/mp4",
            ),
            "What is in the video?",
        ],
    )
    print(response.text)
    # Example response:
    # The video shows several people surfing in an ocean with a coastline in the background. The camera ...

### Go

Learn how to install or update the [Go](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/sdks/overview).

To learn more, see the
[SDK reference documentation](https://pkg.go.dev/google.golang.org/genai).

Set environment variables to use the Gen AI SDK with Vertex AI:

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

        genai "google.golang.org/genai"
    )

    // generateWithMuteVideo shows how to generate text using a video with no sound as the input.
    func generateWithMuteVideo(w io.Writer) error {
        ctx := context.Background()

        client, err := genai.NewClient(ctx, &genai.ClientConfig{
            HTTPOptions: genai.HTTPOptions{APIVersion: "v1"},
        })
        if err != nil {
            return fmt.Errorf("failed to create genai client: %w", err)
        }

        modelName := "gemini-2.5-flash"
        contents := []*genai.Content{
            {Parts: []*genai.Part{
                {Text: "What is in the video?"},
                {FileData: &genai.FileData{
                    FileURI:  "gs://cloud-samples-data/generative-ai/video/ad_copy_from_video.mp4",
                    MIMEType: "video/mp4",
                }},
            },
                Role: genai.RoleUser},
        }

        resp, err := client.Models.GenerateContent(ctx, modelName, contents, nil)
        if err != nil {
            return fmt.Errorf("failed to generate content: %w", err)
        }

        respText := resp.Text()

        fmt.Fprintln(w, respText)

        // Example response:
        // The video shows several surfers riding waves in an ocean setting. The waves are ...

        return nil
    }

### Java

Learn how to install or update the [Java](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/sdks/overview).

To learn more, see the
[SDK reference documentation](https://central.sonatype.com/artifact/com.google.genai/google-genai).

Set environment variables to use the Gen AI SDK with Vertex AI:

```bash
# Replace the `GOOGLE_CLOUD_PROJECT` and `GOOGLE_CLOUD_LOCATION` values
# with appropriate values for your project.
export GOOGLE_CLOUD_PROJECT=GOOGLE_CLOUD_PROJECT
export GOOGLE_CLOUD_LOCATION=global
export GOOGLE_GENAI_USE_ENTERPRISE=True
```

    import com.google.genai.Client;
    import com.google.genai.types.Content;
    import com.google.genai.types.GenerateContentResponse;
    import com.google.genai.types.HttpOptions;
    import com.google.genai.types.Part;

    public class TextGenerationWithMuteVideo {

      public static void main(String[] args) {
        // TODO(developer): Replace these variables before running the sample.
        String modelId = "gemini-2.5-flash";
        generateContent(modelId);
      }

      // Generates text with mute video input
      public static String generateContent(String modelId) {
        // Initialize client that will be used to send requests. This client only needs to be created
        // once, and can be reused for multiple requests.
        try (Client client =
            Client.builder()
                .location("global")
                .vertexAI(true)
                .httpOptions(HttpOptions.builder().apiVersion("v1").build())
                .build()) {

          GenerateContentResponse response =
              client.models.generateContent(
                  modelId,
                  Content.fromParts(
                      Part.fromUri(
                          "gs://cloud-samples-data/generative-ai/video/ad_copy_from_video.mp4",
                          "video/mp4"),
                      Part.fromText("What is in this video?")),
                  null);

          System.out.print(response.text());
          // Example response:
          // This video features **surfers in the ocean**.
          //
          // The main focus is on **one individual who catches and rides a wave**, executing various
          // turns and maneuvers as the wave breaks and dissipates into whitewater...
          return response.text();
        }
      }
    }

### Node.js

#### Install

```
npm install @google/genai
```

To learn more, see the
[SDK reference documentation](https://googleapis.github.io/js-genai/).

Set environment variables to use the Gen AI SDK with Vertex AI:

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

    async function generateText(
      projectId = GOOGLE_CLOUD_PROJECT,
      location = GOOGLE_CLOUD_LOCATION
    ) {
      const client = new GoogleGenAI({
        vertexai: true,
        project: projectId,
        location: location,
      });

      const response = await client.models.generateContent({
        model: 'gemini-2.5-flash-lite',
        contents: [
          {
            role: 'user',
            parts: [
              {
                fileData: {
                  mimeType: 'video/mp4',
                  fileUri:
                    'gs://cloud-samples-data/generative-ai/video/ad_copy_from_video.mp4',
                },
              },
              {
                text: 'What is in the video?',
              },
            ],
          },
        ],
        config: {
          mediaResolution: 'MEDIA_RESOLUTION_LOW',
        },
      });

      console.log(response.text);

      // Example response:
      // The video shows several people surfing in an ocean with a coastline in the background. The camera ...

      return response.text;
    }

### REST

After you set up your environment, you can use REST to test a text prompt. The
following sample sends a request to the publisher model endpoint.

Before using any of the request data,
make the following replacements:

- `PROJECT_ID`: Your \[project ID\](/resource-manager/docs/creating-managing-projects#identifiers). .
- `FILE_URI`: The URI or URL of the file to include in the prompt. Acceptable values include the following:
  - **Cloud Storage bucket URI:** The object must either be publicly readable or reside in the same Google Cloud project that's sending the request. For `gemini-2.0-flash` and `gemini-2.0-flash-lite`, the size limit is 2 GB.
  - **HTTP URL:** The file URL must be publicly readable. You can specify one video file, one audio file, and up to 10 image files per request. Audio files, video files, and documents can't exceed 15 MB.
  - **YouTube video URL:**The YouTube video must be either owned by the account that you used to sign in to the Google Cloud console or be public. Only one YouTube video URL is supported per request.

  When specifying a `fileURI`, you must also specify the media type
  (`mimeType`) of the file. If VPC Service Controls is enabled, specifying a media file
  URL for `fileURI` is not supported.

  If you don't have a video file in Cloud Storage, then you can use the following
  publicly available file:
  `gs://cloud-samples-data/video/animals.mp4` with a mime type of
  `video/mp4`. To view this video,
  [open the sample MP4](https://storage.googleapis.com/cloud-samples-data/video/animals.mp4)
  file.
- `MIME_TYPE`: The media type of the file specified in the `data` or `fileUri` fields. Acceptable values include the following: **Click to expand MIME types**
  - `application/pdf`
  - `audio/mpeg`
  - `audio/mp3`
  - `audio/wav`
  - `image/png`
  - `image/jpeg`
  - `image/webp`
  - `text/plain`
  - `video/mov`
  - `video/mpeg`
  - `video/mp4`
  - `video/mpg`
  - `video/avi`
  - `video/wmv`
  - `video/mpegps`
  - `video/flv`
- `TEXT`: The text instructions to include in the prompt. For example, `What is in the video?`

To send your request, choose one of these options:

#### curl

> [!NOTE]
> **Note:** The following command assumes that you have logged in to the `gcloud` CLI with your user account by running [`gcloud init`](https://docs.cloud.google.com/sdk/gcloud/reference/init) or [`gcloud auth login`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) , or by using [Cloud Shell](https://docs.cloud.google.com/shell/docs), which automatically logs you into the `gcloud` CLI . You can check the currently active account by running [`gcloud auth list`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/list).

Save the request body in a file named `request.json`.
Run the following command in the terminal to create or overwrite
this file in the current directory:

```
cat > request.json << 'EOF'
{
  "contents": {
    "role": "USER",
    "parts": [
      {
        "fileData": {
          "fileUri": "FILE_URI",
          "mimeType": "MIME_TYPE"
        }
      },
      {
        "text": "TEXT"
      }
    ]
  }
}
EOF
```

Then execute the following command to send your REST request:

```
curl -X POST \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d @request.json \
     "https://aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/global/publishers/google/models/gemini-2.5-flash:generateContent"
```

#### PowerShell

> [!NOTE]
> **Note:** The following command assumes that you have logged in to the `gcloud` CLI with your user account by running [`gcloud init`](https://docs.cloud.google.com/sdk/gcloud/reference/init) or [`gcloud auth login`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) . You can check the currently active account by running [`gcloud auth list`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/list).

Save the request body in a file named `request.json`.
Run the following command in the terminal to create or overwrite
this file in the current directory:

```
@'
{
  "contents": {
    "role": "USER",
    "parts": [
      {
        "fileData": {
          "fileUri": "FILE_URI",
          "mimeType": "MIME_TYPE"
        }
      },
      {
        "text": "TEXT"
      }
    ]
  }
}
'@  | Out-File -FilePath request.json -Encoding utf8
```

Then execute the following command to send your REST request:

```
$cred = gcloud auth print-access-token
$headers = @{ "Authorization" = "Bearer $cred" }

Invoke-WebRequest `
    -Method POST `
    -Headers $headers `
    -ContentType: "application/json; charset=utf-8" `
    -InFile request.json `
    -Uri "https://aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/global/publishers/google/models/gemini-2.5-flash:generateContent" | Select-Object -Expand Content
```

You should receive a JSON response similar to the following.

#### Response

```
{
  "candidates": [
    {
      "content": {
        "role": "model",
        "parts": [
          {
            "text": "This video is a commercial for Google Photos, featuring animals taking selfies
              with the Google Photos app. The commercial plays on the popularity of media in which
              animals act like humans, especially their use of technology. The commercial also
              highlights the app's ability to automatically back up photos."
          }
        ]
      },
      "finishReason": "STOP",
      "safetyRatings": [
        {
          "category": "HARM_CATEGORY_HATE_SPEECH",
          "probability": "NEGLIGIBLE",
          "probabilityScore": 0.053601142,
          "severity": "HARM_SEVERITY_NEGLIGIBLE",
          "severityScore": 0.053799648
        },
        {
          "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
          "probability": "NEGLIGIBLE",
          "probabilityScore": 0.06278921,
          "severity": "HARM_SEVERITY_NEGLIGIBLE",
          "severityScore": 0.07850098
        },
        {
          "category": "HARM_CATEGORY_HARASSMENT",
          "probability": "NEGLIGIBLE",
          "probabilityScore": 0.090253234,
          "severity": "HARM_SEVERITY_NEGLIGIBLE",
          "severityScore": 0.058453236
        },
        {
          "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          "probability": "NEGLIGIBLE",
          "probabilityScore": 0.1647851,
          "severity": "HARM_SEVERITY_NEGLIGIBLE",
          "severityScore": 0.09285216
        }
      ]
    }
  ],
  "usageMetadata": {
    "promptTokenCount": 28916,
    "candidatesTokenCount": 61,
    "totalTokenCount": 28977
  }
}
```
Note the following in the URL for this sample:

- Use the [`generateContent`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations.publishers.models/generateContent) method to request that the response is returned after it's fully generated. To reduce the perception of latency to a human audience, stream the response as it's being generated by using the [`streamGenerateContent`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations.publishers.models/streamGenerateContent) method.
- The multimodal model ID is located at the end of the URL before the method (for example, `gemini-2.5-flash`). This sample might support other models as well.
- When you use a regional API endpoint (for example, `us-central1`), the region from the endpoint URL determines where the request is processed. Any conflicting location in the resource path is ignored.

### Video with audio

The following shows you how to summarize a video file with audio and return
chapters with timestamps. This sample works with all Gemini multimodal
models that support video with audio.

### Python

#### Install

```
pip install --upgrade google-genai
```

To learn more, see the
[SDK reference documentation](https://googleapis.github.io/python-genai/).

Set environment variables to use the Gen AI SDK with Vertex AI:

```bash
# Replace the `GOOGLE_CLOUD_PROJECT` and `GOOGLE_CLOUD_LOCATION` values
# with appropriate values for your project.
export GOOGLE_CLOUD_PROJECT=GOOGLE_CLOUD_PROJECT
export GOOGLE_CLOUD_LOCATION=global
export GOOGLE_GENAI_USE_ENTERPRISE=True
```

    from google import genai
    from google.genai.types import HttpOptions, Part

    client = genai.Client(http_options=HttpOptions(api_version="v1"))
    response = client.models.generate_content(
        model="gemini-3.5-flash",
        contents=[
            Part.from_uri(
                file_uri="gs://cloud-samples-data/generative-ai/video/ad_copy_from_video.mp4",
                mime_type="video/mp4",
            ),
            "What is in the video?",
        ],
    )
    print(response.text)
    # Example response:
    # The video shows several people surfing in an ocean with a coastline in the background. The camera ...

### REST

After you set up your environment, you can use REST to test a text prompt. The
following sample sends a request to the publisher model endpoint.

Before using any of the request data,
make the following replacements:

- `PROJECT_ID`: .
- `FILE_URI`: The URI or URL of the file to include in the prompt. Acceptable values include the following:
  - **Cloud Storage bucket URI:** The object must either be publicly readable or reside in the same Google Cloud project that's sending the request. For `gemini-2.0-flash` and `gemini-2.0-flash-lite`, the size limit is 2 GB.
  - **HTTP URL:** The file URL must be publicly readable. You can specify one video file, one audio file, and up to 10 image files per request. Audio files, video files, and documents can't exceed 15 MB.
  - **YouTube video URL:**The YouTube video must be either owned by the account that you used to sign in to the Google Cloud console or be public. Only one YouTube video URL is supported per request.

  When specifying a `fileURI`, you must also specify the media type
  (`mimeType`) of the file. If VPC Service Controls is enabled, specifying a media file
  URL for `fileURI` is not supported.

  If you don't have a video file in Cloud Storage, then you can use the following
  publicly available file:
  `gs://cloud-samples-data/generative-ai/video/pixel8.mp4` with a mime type of
  `video/mp4`. To view this video,
  [open the sample MP4](https://storage.googleapis.com/cloud-samples-data/generative-ai/video/pixel8.mp4)
  file.
- `MIME_TYPE`: The media type of the file specified in the `data` or `fileUri` fields. Acceptable values include the following: **Click to expand MIME types**
  - `application/pdf`
  - `audio/mpeg`
  - `audio/mp3`
  - `audio/wav`
  - `image/png`
  - `image/jpeg`
  - `image/webp`
  - `text/plain`
  - `video/mov`
  - `video/mpeg`
  - `video/mp4`
  - `video/mpg`
  - `video/avi`
  - `video/wmv`
  - `video/mpegps`
  - `video/flv`
-

  ```
  TEXT
  ```
  The text instructions to include in the prompt. For example, `Provide a description of the video. The description should also contain anything
  important which people say in the video.`

To send your request, choose one of these options:

#### curl

> [!NOTE]
> **Note:** The following command assumes that you have logged in to the `gcloud` CLI with your user account by running [`gcloud init`](https://docs.cloud.google.com/sdk/gcloud/reference/init) or [`gcloud auth login`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) , or by using [Cloud Shell](https://docs.cloud.google.com/shell/docs), which automatically logs you into the `gcloud` CLI . You can check the currently active account by running [`gcloud auth list`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/list).

Save the request body in a file named `request.json`.
Run the following command in the terminal to create or overwrite
this file in the current directory:

```
cat > request.json << 'EOF'
{
  "contents": {
    "role": "USER",
    "parts": [
      {
        "fileData": {
          "fileUri": "FILE_URI",
          "mimeType": "MIME_TYPE"
        }
      },
      {
        "text": "TEXT"
      }
    ]
  }
}
EOF
```

Then execute the following command to send your REST request:

```
curl -X POST \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d @request.json \
     "https://aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/global/publishers/google/models/gemini-2.5-flash:generateContent"
```

#### PowerShell

> [!NOTE]
> **Note:** The following command assumes that you have logged in to the `gcloud` CLI with your user account by running [`gcloud init`](https://docs.cloud.google.com/sdk/gcloud/reference/init) or [`gcloud auth login`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) . You can check the currently active account by running [`gcloud auth list`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/list).

Save the request body in a file named `request.json`.
Run the following command in the terminal to create or overwrite
this file in the current directory:

```
@'
{
  "contents": {
    "role": "USER",
    "parts": [
      {
        "fileData": {
          "fileUri": "FILE_URI",
          "mimeType": "MIME_TYPE"
        }
      },
      {
        "text": "TEXT"
      }
    ]
  }
}
'@  | Out-File -FilePath request.json -Encoding utf8
```

Then execute the following command to send your REST request:

```
$cred = gcloud auth print-access-token
$headers = @{ "Authorization" = "Bearer $cred" }

Invoke-WebRequest `
    -Method POST `
    -Headers $headers `
    -ContentType: "application/json; charset=utf-8" `
    -InFile request.json `
    -Uri "https://aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/global/publishers/google/models/gemini-2.5-flash:generateContent" | Select-Object -Expand Content
```

You should receive a JSON response similar to the following.

#### Response

```
{
  "candidates": [
    {
      "content": {
        "role": "model",
        "parts": [
          {
            "text": "The video opens with a shot of a train traveling over a bridge in the night. \n
              \nThe scene changes to a woman walking in the streets of Tokyo. She says "My name is
              Saeko. I am a photographer in Tokyo. Tokyo has many faces. The city at night
              is totally different from what you see during the day. The new Pixel has a feature
              called "Video Boost". In low light, it activates "Night Sight" to make the quality
              even better." \n\nShe then uses her phone to take several photos of different parts of
              the city including a street with a lot of shops, a small alleyway, and a small
              restaurant. She says "Sancha is where I used to live when I first moved to Tokyo. I
              have a lot of great memories here. Oh, I like this." \n\nShe smiles and says
              "Beautiful".\n\nThe video ends with the woman standing in a different part of the
              city. She says "Next, I came to Shibuya." The scene shows the famous Shibuya crossing
              in the night. \n\nThe video features a woman showcasing the camera features of the
              Google Pixel phone while walking around the streets of Tokyo. She mentions "Night
              Sight" and "Video Boost" features. \n"
          }
        ]
      },
      "finishReason": "STOP",
      "safetyRatings": [
        {
          "category": "HARM_CATEGORY_HATE_SPEECH",
          "probability": "NEGLIGIBLE",
          "probabilityScore": 0.053601142,
          "severity": "HARM_SEVERITY_NEGLIGIBLE",
          "severityScore": 0.053799648
        },
        {
          "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
          "probability": "NEGLIGIBLE",
          "probabilityScore": 0.06278921,
          "severity": "HARM_SEVERITY_NEGLIGIBLE",
          "severityScore": 0.07850098
        },
        {
          "category": "HARM_CATEGORY_HARASSMENT",
          "probability": "NEGLIGIBLE",
          "probabilityScore": 0.090253234,
          "severity": "HARM_SEVERITY_NEGLIGIBLE",
          "severityScore": 0.058453236
        },
        {
          "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          "probability": "NEGLIGIBLE",
          "probabilityScore": 0.1647851,
          "severity": "HARM_SEVERITY_NEGLIGIBLE",
          "severityScore": 0.09285216
        }
      ]
    }
  ],
  "usageMetadata": {
    "promptTokenCount": 28916,
    "candidatesTokenCount": 61,
    "totalTokenCount": 28977
  }
}
```
Note the following in the URL for this sample:

- Use the [`generateContent`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations.publishers.models/generateContent) method to request that the response is returned after it's fully generated. To reduce the perception of latency to a human audience, stream the response as it's being generated by using the [`streamGenerateContent`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations.publishers.models/streamGenerateContent) method.
- The multimodal model ID is located at the end of the URL before the method (for example, `gemini-2.5-flash`). This sample might support other models as well.
- When you use a regional API endpoint (for example, `us-central1`), the region from the endpoint URL determines where the request is processed. Any conflicting location in the resource path is ignored.

### Console

To send a multimodal prompt by using the Google Cloud console, do the following:

1. In the Agent Platform section of the Google Cloud console, go to
   the **Agent Studio** page.

   [Go to Agent Studio](https://console.cloud.google.com/agent-platform/generative/multimodal)
2. Click **Create prompt**.

3. Optional: Configure the model and parameters:

   - **Model**: Select a model.
4. Optional: To configure advanced parameters, click **Advanced** and
   configure as follows:

   #### Click to expand advanced configurations

   - **Top-K**: Use the slider or textbox to enter a value for top-K.

     Top-K changes how the model selects tokens for output. A top-K of `1` means the next selected token is the most probable among all tokens in the model's vocabulary (also called greedy decoding), while a top-K of `3` means that the next token is selected from among the three most probable tokens by using temperature.

     For each token selection step, the top-K tokens with the highest
     probabilities are sampled. Then tokens are further filtered based on top-P with
     the final token selected using temperature sampling.

     Specify a lower value for less random responses and a higher value for more
     random responses.
   - **Top-P** : Use the slider or textbox to enter a value for top-P. Tokens are selected from most probable to the least until the sum of their probabilities equals the value of top-P. For the least variable results, set top-P to `0`.
   - **Max responses**: Use the slider or textbox to enter a value for the number of responses to generate.
   - **Streaming responses**: Enable to print responses as they're generated.
   - **Safety filter threshold**: Select the threshold of how likely you are to see responses that could be harmful.
   - **Enable Grounding**: Grounding isn't supported for multimodal prompts.
   - **Region**: Select the region that you want to use.
   - **Temperature** : Use the slider or textbox to enter a value for temperature.

         The temperature is used for sampling during response generation, which occurs when `topP`
         and `topK` are applied. Temperature controls the degree of randomness in token selection.
         Lower temperatures are good for prompts that require a less open-ended or creative response, while
         higher temperatures can lead to more diverse or creative results. A temperature of `0`
         means that the highest probability tokens are always selected. In this case, responses for a given
         prompt are mostly deterministic, but a small amount of variation is still possible.

         If the model returns a response that's too generic, too short, or the model gives a fallback
         response, try increasing the temperature. If the model enters infinite generation, increasing the
         temperature to at least `0.1` may lead to improved results.
          `1.0` is the
         recommended starting value for temperature.

           <li>**Output token limit**: Use the slider or textbox to enter a value for
             the max output limit.

         Maximum number of tokens that can be generated in the response. A token is
         approximately four characters. 100 tokens correspond to roughly 60-80 words.

         Specify a lower value for shorter responses and a higher value for potentially longer
         responses.

           <li>**Add stop sequence**: Optional. Enter a stop sequence, which is a
             series of characters that includes spaces. If the model encounters a
             stop sequence, the response generation stops. The stop sequence isn't
             included in the response, and you can add up to five stop sequences.
         </ul>

5. Click **Insert Media**, and select a source for your file.

   ### Upload

   Select the file that you want to upload and click **Open**.

   ### By URL

   Enter the URL of the file that you want to use and click **Insert**.

   ### YouTube

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

   Enter the URL of the YouTube video that you want to use and click
   **Insert**.

   You can use any public video or a video that's owned by the account that
   you used to sign in to the Google Cloud console.

   ### Cloud Storage

   Select the bucket and then the file from the bucket that
   you want to import and click **Select**.

   ### Google Drive

   1. Choose an account and give consent to Agent Studio to access your account the first time you select this option. You can upload multiple files that have a total size of up to 10 MB. A single file can't exceed 7 MB.
   2. Click the file that you want to add.
   3. Click **Select**.

      The file thumbnail displays in the **Prompt** pane. The total
      number of tokens also displays. If your prompt data exceeds the
      [token limit](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/google-models), the
      tokens are truncated and aren't included in processing your data.
6. Enter your text prompt in the **Prompt** pane.

7. Optional: To view the **Token ID to text** and **Token IDs** , click the
   **tokens count** in the **Prompt** pane.

   > [!NOTE]
   > **Note:** Media tokens aren't supported.

8. Click **Submit**.

9. Optional: To save your prompt to **My prompts** , click **Save**.

10. Optional: To get the Python code or a curl command for your prompt, click
    **Build with code \> Get code**.

## Customize video processing

You can customize video processing in the Gemini for Google Cloud API by setting
clipping intervals or providing custom frame rate sampling.

> [!TIP]
> **Tip:** Video clipping and frames per second (FPS) are supported by all models, but the quality is significantly higher with 2.5-series models.

### Set clipping intervals

You can clip videos by specifying
[`videoMetadata`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/Content#VideoMetadata)
with start and end offsets.

### Set a custom frame rate

You can set custom frame rate sampling by passing an `fps` argument to
`videoMetadata`.

By default, 1 frame per second (FPS) is sampled from the video. You might want to
set low FPS (\< 1) for long videos. This is especially useful for mostly static
videos (for example, lectures). If you want to capture more details in rapidly changing
visuals, consider setting a higher FPS value.

## Adjust media resolution

You can adjust
[`MediaResolution`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/Shared.Types/MediaResolution)
to process your videos with fewer tokens.

## Set optional model parameters

Each model has a set of optional parameters that you can set. For more
information, see [Content generation parameters](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/content-generation-parameters).

## Video tokenization

> [!WARNING]
>
> **Preview**
>
>
> This product or feature is
>
> subject to the "Pre-GA Offerings Terms" in the General Service Terms section
> of the [Service Specific
> Terms](https://docs.cloud.google.com/terms/service-terms#1), and the
> [Additional Terms for Generative AI
> Preview Products](https://cloud.google.com/trustedtester/aitos).
>
> You can process personal data for
>
> this product or feature
>
> as outlined in the
> [Cloud Data
> Processing Addendum](https://docs.cloud.google.com/terms/data-processing-addendum), subject to the obligations and restrictions described in the
> agreement under which you access Google Cloud.
>
> Pre-GA products and features are available "as is" and might have limited support.
>
> For more information, see the
> [launch stage descriptions](https://cloud.google.com/products/#product-launch-stages).

With Gemini 3, video tokenization uses a variable sequence length,
which replaces the Pan and Scan method used in previous models for better
quality and latency.

You can specify a media resolution for video inputs, which affects
how videos are tokenized and how many tokens are used for each video.
You can set `media_resolution` in `generationConfig` to apply to all media in
the request, or set it for individual media parts, which will override the
top-level setting. The default resolution for videos is 70 tokens per frame.

The following resolutions are available for Gemini 3 models:

- `MEDIA_RESOLUTION_HIGH`: 280 tokens per frame
- `MEDIA_RESOLUTION_MEDIUM`: 70 tokens per frame
- `MEDIA_RESOLUTION_LOW`: 70 tokens per frame
- `MEDIA_RESOLUTION_UNSPECIFIED`: 70 tokens per frame (default)

For models earlier than Gemini 3, each frame is tokenized at 258
tokens per frame for default resolution, or 66 tokens per frame for low
resolution.

This code sample demonstrates how to adjust `media_resolution`:

```python
from google import genai
from google.genai import types

client = genai.Client()

response = client.models.generate_content(
  model="gemini-3.1-pro-preview",
  contents=[
      types.Part(
          file_data=types.FileData(
              file_uri="gs://cloud-samples-data/generative-ai/image/a-man-and-a-dog.png",
              mime_type="image/jpeg",
          ),
          media_resolution=types.PartMediaResolution(
              level=types.PartMediaResolutionLevel.MEDIA_RESOLUTION_HIGH
          ),
      ),
      Part(
          file_data=types.FileData(
              file_uri="gs://cloud-samples-data/generative-ai/video/behind_the_scenes_pixel.mp4",
              mime_type="video/mp4",
          ),
          media_resolution=types.PartMediaResolution(
              level=types.PartMediaResolutionLevel.MEDIA_RESOLUTION_LOW
          ),
      ),
      "When does the image appear in the video? What is the context?",
  ],
)
print(response.text)
```

## Best practices

When using video, use the following best practices and information for the
best results:

- If your prompt contains a single video, place the video before the text prompt.
- If you require timestamp localization in a video with audio, ask the model to generate timestamps that follow the format as described in "Timestamp format".

For Gemini 3 models, also consider the following:

- Use a higher Frame Per Second (FPS) sampling rate for videos requiring granular temporal analysis, such as fast-action understanding or high-speed motion tracking.

## Limitations

While Gemini multimodal models are powerful in many multimodal use
cases, it's important to understand the limitations of the models:

- **Content moderation**: The models refuse to provide answers on videos that violate our safety policies.
- **Non-speech sound recognition**: The models that support audio might make mistakes recognizing sound that's not speech.

## Technical details about videos

- **File API processing**: When using the File API, videos are sampled at 1
  frame per second (FPS) and audio is processed at 1Kbps (single channel).
  Timestamps are added every second.

  - These rates are subject to change in the future for improvements in inference.
- **Timestamp format**: When referring to specific moments in a video within
  your prompt, the timestamp format depends on your video's frame per second
  (FPS) sampling rate:

  - **For sampling rates at 1 FPS or below** : Use the `MM:SS` format, where
    the first two digits represent minutes and the last two digits represent
    seconds. If you have offsets that are greater than 1 hour, use the
    `H:MM:SS` format.

  - **For sampling rates above 1 FPS** : Use the `MM:SS.sss` format, or, if
    you have offsets that are greater than 1 hour, use the
    `H:MM:SS.sss` format, described as follows:

    - The first digit represents the hour.
    - The second two digits represent minutes.
    - The third two digits represent seconds.
    - The final three digits represent subseconds.
- **Best practices**:

  - Use only one video per prompt request for optimal results.

  - If combining text and a single video, place the text prompt *after* the
    video part in the `contents` array.

  - Be aware that fast action sequences might lose detail due to the 1 FPS
    sampling rate. Consider slowing down such clips if necessary.

## What's next

- Start building with Gemini multimodal models - new customers [get $300 in free Google Cloud credits](https://console.cloud.google.com/freetrial?redirectPath=/vertex-ai/model-garden) to explore what they can do with Gemini.
- Learn how to [send chat prompt requests](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/send-chat-prompts-gemini).
- Learn about [responsible AI best practices and Agent Platform's safety filters](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/responsible-ai).
