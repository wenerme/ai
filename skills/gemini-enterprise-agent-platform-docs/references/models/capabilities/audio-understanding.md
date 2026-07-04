> [!NOTE]
> To see an example of audio understanding,
> run the "Multimodal Sentiment Analysis with Gemini" notebook in one of the following
> environments:
>
> [!Open in Colab](https://colab.research.google.com/github/GoogleCloudPlatform/generative-ai/blob/main/gemini/use-cases/multimodal-sentiment-analysis/intro_to_multimodal_sentiment_analysis.ipynb)
>
>
> \|
>
> [!Open in Colab Enterprise](https://console.cloud.google.com/agent-platform/colab/import/https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fgemini%2Fuse-cases%2Fmultimodal-sentiment-analysis%2Fintro_to_multimodal_sentiment_analysis.ipynb)
>
>
> \|
>
> [!Open
> in Agent Platform Workbench](https://console.cloud.google.com/agent-platform/workbench/deploy-notebook?download_url=https://raw.githubusercontent.com/GoogleCloudPlatform/generative-ai/main/gemini/use-cases/multimodal-sentiment-analysis/intro_to_multimodal_sentiment_analysis.ipynb)
>
>
> \|
>
> [!View on GitHub](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/use-cases/multimodal-sentiment-analysis/intro_to_multimodal_sentiment_analysis.ipynb)

You can add audio to Gemini requests to perform tasks that involve
understanding the contents of the included audio. This page shows you how to add
audio to your requests to Gemini in Gemini Enterprise Agent Platform by using the
Google Cloud console and the Agent Platform API.

## Supported models

The following table lists the models that support audio understanding:

| Models | Media details | MIME types |
|---|---|---|
| - [Gemini 3.5 Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-5-flash) - [Gemini 3.1 Flash-Lite](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-flash-lite) - [Gemini 2.5 Flash-Lite](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash-lite) preview - [Gemini 2.5 Flash-Lite](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash-lite) | - Maximum audio length per prompt: Approximately 8.4 hours, or up to 1 million tokens - Maximum number of audio files per prompt: 1 | - `audio/x-aac` - `audio/flac` - `audio/mp3` - `audio/m4a` - `audio/mpeg` - `audio/mpga` - `audio/mp4` - `audio/ogg` - `audio/pcm` - `audio/wav` - `audio/webm` |
| - [Gemini 3.1 Pro](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-pro) preview - [Gemini 3 Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-flash) preview - [Gemini 2.5 Pro](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-pro) - [Gemini 2.5 Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash) preview - [Gemini 2.5 Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash) | - Maximum audio length per prompt: Approximately 8.4 hours, or up to 1 million tokens - Maximum number of audio files per prompt: 1 - Speech understanding for: Audio summarization, transcription, and translation | - `audio/x-aac` - `audio/flac` - `audio/mp3` - `audio/m4a` - `audio/mpeg` - `audio/mpga` - `audio/mp4` - `audio/ogg` - `audio/pcm` - `audio/wav` - `audio/webm` |
| - [Gemini 2.5 Flash with Gemini Live API native audio](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash-live-api) | - Maximum conversation length: Default 10 minutes that can [be extended.](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/live-api/start-manage-session#session-extension) - Required audio input format: Raw 16-bit PCM audio at 16kHz, little-endian - Required audio output format: Raw 16-bit PCM audio at 24kHz, little-endian | - `audio/x-aac` - `audio/flac` - `audio/mp3` - `audio/m4a` - `audio/mpeg` - `audio/mpga` - `audio/mp4` - `audio/ogg` - `audio/pcm` - `audio/wav` - `audio/webm` |

For a list of languages supported by Gemini models, see model information
[Google models](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/google-models). To learn
more about how to design multimodal prompts, see
[Design multimodal prompts](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/design-multimodal-prompts).
If you're looking for a way to use Gemini directly from your mobile and
web apps, see the
[Firebase AI Logic client SDKs](https://firebase.google.com/docs/ai-logic) for
Swift, Android, Web, Flutter, and Unity apps.

## Add audio to a request

You can add audio files in your requests to Gemini.

### Single audio

The following shows you how to use an audio file to summarize a podcast:

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
         </li>
           <li>**Output token limit**: Use the slider or textbox to enter a value for
             the max output limit.

         Maximum number of tokens that can be generated in the response. A token is
         approximately four characters. 100 tokens correspond to roughly 60-80 words.

         Specify a lower value for shorter responses and a higher value for potentially longer
         responses.

         </li>
           <li>**Add stop sequence**: Optional. Enter a stop sequence, which is a
             series of characters that includes spaces. If the model encounters a
             stop sequence, the response generation stops. The stop sequence isn't
             included in the response, and you can add up to five stop sequences.</li>
         </ul>

5. Click **Insert Media**, and select a source for your file.

   ### Upload

   Select the file that you want to upload and click **Open**.

   ### By URL

   Enter the URL of the file that you want to use and click **Insert**.

   ### Cloud Storage

   Select the bucket and then the file from the bucket that
   you want to import and click **Select**.

   ### Google Drive

   1. Choose an account and give consent to Agent Studio to access your account the first time you select this option. You can upload multiple files that have a total size of up to 10 MB. A single file can't exceed 7 MB.
   2. Click the file that you want to add.
   3. Click **Select**.

      The file thumbnail displays in the **Prompt** pane. The total
      number of tokens also displays. If your prompt data exceeds the
      [token limit](https://docs.cloud.google.com/vertex-ai/docs/learn/models#gemini-models), the
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
    prompt = """
    Provide a concise summary of the main points in the audio file.
    """
    response = client.models.generate_content(
        model="gemini-3.5-flash",
        contents=[
            prompt,
            Part.from_uri(
                file_uri="gs://cloud-samples-data/generative-ai/audio/pixel.mp3",
                mime_type="audio/mpeg",
            ),
        ],
    )
    print(response.text)
    # Example response:
    # Here's a summary of the main points from the audio file:

    # The Made by Google podcast discusses the Pixel feature drops with product managers Aisha Sheriff and De Carlos Love.  The key idea is that devices should improve over time, with a connected experience across phones, watches, earbuds, and tablets.

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

    // generateWithAudio shows how to generate text using an audio input.
    func generateWithAudio(w io.Writer) error {
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
                {Text: `Provide the summary of the audio file.
    Summarize the main points of the audio concisely.
    Create a chapter breakdown with timestamps for key sections or topics discussed.`},
                {FileData: &genai.FileData{
                    FileURI:  "gs://cloud-samples-data/generative-ai/audio/pixel.mp3",
                    MIMEType: "audio/mpeg",
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
        // Here is a summary and chapter breakdown of the audio file:
        //
        // **Summary:**
        //
        // The audio file is a "Made by Google" podcast episode discussing the Pixel Feature Drops, ...
        //
        // **Chapter Breakdown:**
        //
        // *   **0:00 - 0:54:** Introduction to the podcast and guests, Aisha Sharif and DeCarlos Love.
        // ...

        return nil
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

      const prompt =
        'Provide a concise summary of the main points in the audio file.';

      const response = await client.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          {
            fileData: {
              fileUri: 'gs://cloud-samples-data/generative-ai/audio/pixel.mp3',
              mimeType: 'audio/mpeg',
            },
          },
          {text: prompt},
        ],
      });

      console.log(response.text);

      // Example response:
      //  Here's a summary of the main points from the audio file:
      //  The Made by Google podcast discusses the Pixel feature drops with product managers Aisha Sheriff and De Carlos Love.  The key idea is that devices should improve over time, with a connected experience across phones, watches, earbuds, and tablets.

      return response.text;
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

    public class TextGenerationWithGcsAudio {

      public static void main(String[] args) {
        // TODO(developer): Replace these variables before running the sample.
        String modelId = "gemini-2.5-flash";
        generateContent(modelId);
      }

      // Generates text with audio input
      public static String generateContent(String modelId) {
        // Client Initialization. Once created, it can be reused for multiple requests.
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
                          "gs://cloud-samples-data/generative-ai/audio/pixel.mp3", "audio/mpeg"),
                      Part.fromText("Provide a concise summary of the main points in the audio file.")),
                  null);

          System.out.print(response.text());
          // Example response:
          // The audio features Google product managers Aisha Sharif and D. Carlos Love discussing Pixel
          // Feature Drops, emphasizing their role in continually enhancing devices across the entire
          // Pixel ecosystem...
          return response.text();
        }
      }
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

  If you don't have an audio file in Cloud Storage, then you can use the following
  publicly available file:
  `gs://cloud-samples-data/generative-ai/audio/pixel.mp3` with a mime type of
  `audio/mp3`. To listen to this audio,
  [open the sample MP3](https://storage.googleapis.com/cloud-samples-data/generative-ai/audio/pixel.mp3)
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
  The text instructions to include in the prompt. For example, `Please provide a summary for the audio. Provide chapter titles, be concise and short, no
  need to provide chapter summaries. Do not make up any information that is not part of the
  audio and do not be verbose.`

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
     "https://aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/global/publishers/google/models/gemini-2.0-flash:generateContent"
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
    -Uri "https://aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/global/publishers/google/models/gemini-2.0-flash:generateContent" | Select-Object -Expand Content
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
            "text": "## Made By Google Podcast - Pixel Feature Drops \n\n**Chapter 1: Transformative Pixel Features**\n\n**Chapter 2: Importance of Feature Drops**\n\n**Chapter 3: January's Feature Drop Highlights**\n\n**Chapter 4: March's Feature Drop Highlights for Pixel Watch**\n\n**Chapter 5: March's Feature Drop Highlights for Pixel Phones**\n\n**Chapter 6: Feature Drop Expansion to Other Devices**\n\n**Chapter 7: Deciding Which Features to Include in Feature Drops**\n\n**Chapter 8: Importance of User Feedback**\n\n**Chapter 9: When to Expect March's Feature Drop**\n\n**Chapter 10: Stand-Out Features from Past Feature Drops** \n"
          }
        ]
      },
      "finishReason": "STOP",
      "safetyRatings": [
        {
          "category": "HARM_CATEGORY_HATE_SPEECH",
          "probability": "NEGLIGIBLE",
          "probabilityScore": 0.05470151,
          "severity": "HARM_SEVERITY_NEGLIGIBLE",
          "severityScore": 0.07864238
        },
        {
          "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
          "probability": "NEGLIGIBLE",
          "probabilityScore": 0.027742893,
          "severity": "HARM_SEVERITY_NEGLIGIBLE",
          "severityScore": 0.050051305
        },
        {
          "category": "HARM_CATEGORY_HARASSMENT",
          "probability": "NEGLIGIBLE",
          "probabilityScore": 0.08678674,
          "severity": "HARM_SEVERITY_NEGLIGIBLE",
          "severityScore": 0.06108711
        },
        {
          "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          "probability": "NEGLIGIBLE",
          "probabilityScore": 0.11899801,
          "severity": "HARM_SEVERITY_NEGLIGIBLE",
          "severityScore": 0.14706452
        }
      ]
    }
  ],
  "usageMetadata": {
    "promptTokenCount": 18883,
    "candidatesTokenCount": 150,
    "totalTokenCount": 19033
  }
}
```
Note the following in the URL for this sample:

- Use the [`generateContent`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations.publishers.models/generateContent) method to request that the response is returned after it's fully generated. To reduce the perception of latency to a human audience, stream the response as it's being generated by using the [`streamGenerateContent`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations.publishers.models/streamGenerateContent) method.
- The multimodal model ID is located at the end of the URL before the method (for example, `gemini-2.5-flash`). This sample might support other models as well.
- When you use a regional API endpoint (for example, `us-central1`), the region from the endpoint URL determines where the request is processed. Any conflicting location in the resource path is ignored.

### Audio transcription

The following shows you how to use an audio file to transcribe an interview. To
enable timestamp understanding for audio-only files, enable the `audioTimestamp`
parameter in `GenerationConfig`:

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
         </li>
           <li>**Output token limit**: Use the slider or textbox to enter a value for
             the max output limit.

         Maximum number of tokens that can be generated in the response. A token is
         approximately four characters. 100 tokens correspond to roughly 60-80 words.

         Specify a lower value for shorter responses and a higher value for potentially longer
         responses.

         </li>
           <li>**Add stop sequence**: Optional. Enter a stop sequence, which is a
             series of characters that includes spaces. If the model encounters a
             stop sequence, the response generation stops. The stop sequence isn't
             included in the response, and you can add up to five stop sequences.</li>
         </ul>

5. Click **Insert Media**, and select a source for your file.

   ### Upload

   Select the file that you want to upload and click **Open**.

   ### By URL

   Enter the URL of the file that you want to use and click **Insert**.

   ### Cloud Storage

   Select the bucket and then the file from the bucket that
   you want to import and click **Select**.

   ### Google Drive

   1. Choose an account and give consent to Agent Studio to access your account the first time you select this option. You can upload multiple files that have a total size of up to 10 MB. A single file can't exceed 7 MB.
   2. Click the file that you want to add.
   3. Click **Select**.

      The file thumbnail displays in the **Prompt** pane. The total
      number of tokens also displays. If your prompt data exceeds the
      [token limit](https://docs.cloud.google.com/vertex-ai/docs/learn/models#gemini-models), the
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
    from google.genai.types import GenerateContentConfig, HttpOptions, Part

    client = genai.Client(http_options=HttpOptions(api_version="v1"))
    prompt = """
    Transcribe the interview, in the format of timecode, speaker, caption.
    Use speaker A, speaker B, etc. to identify speakers.
    """
    response = client.models.generate_content(
        model="gemini-3.5-flash",
        contents=[
            prompt,
            Part.from_uri(
                file_uri="gs://cloud-samples-data/generative-ai/audio/pixel.mp3",
                mime_type="audio/mpeg",
            ),
        ],
        # Required to enable timestamp understanding for audio-only files
        config=GenerateContentConfig(audio_timestamp=True),
    )
    print(response.text)
    # Example response:
    # [00:00:00] **Speaker A:** your devices are getting better over time. And so ...
    # [00:00:14] **Speaker B:** Welcome to the Made by Google podcast where we meet ...
    # [00:00:20] **Speaker B:** Here's your host, Rasheed Finch.
    # [00:00:23] **Speaker C:** Today we're talking to Aisha Sharif and DeCarlos Love. ...
    # ...

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

    // generateAudioTranscript shows how to generate an audio transcript.
    func generateAudioTranscript(w io.Writer) error {
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
                {Text: `Transcribe the interview, in the format of timecode, speaker, caption.
    Use speaker A, speaker B, etc. to identify speakers.`},
                {FileData: &genai.FileData{
                    FileURI:  "gs://cloud-samples-data/generative-ai/audio/pixel.mp3",
                    MIMEType: "audio/mpeg",
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
        // 00:00:00, A: your devices are getting better over time.
        // 00:01:13, A: And so we think about it across the entire portfolio from phones to watch, ...
        // ...

        return nil
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

      const prompt = `Transcribe the interview, in the format of timecode, speaker, caption.
        Use speaker A, speaker B, etc. to identify speakers.`;

      const response = await client.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          {text: prompt},
          {
            fileData: {
              fileUri: 'gs://cloud-samples-data/generative-ai/audio/pixel.mp3',
              mimeType: 'audio/mpeg',
            },
          },
        ],
        // Required to enable timestamp understanding for audio-only files
        config: {
          audioTimestamp: true,
        },
      });

      console.log(response.text);

      // Example response:
      // [00:00:00] **Speaker A:** your devices are getting better over time. And so ...
      // [00:00:14] **Speaker B:** Welcome to the Made by Google podcast where we meet ...
      // [00:00:20] **Speaker B:** Here's your host, Rasheed Finch.
      // [00:00:23] **Speaker C:** Today we're talking to Aisha Sharif and DeCarlos Love. ...
      // ...

      return response.text;
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
    import com.google.genai.types.GenerateContentConfig;
    import com.google.genai.types.GenerateContentResponse;
    import com.google.genai.types.HttpOptions;
    import com.google.genai.types.Part;

    public class TextGenerationTranscriptWithGcsAudio {

      public static void main(String[] args) {
        // TODO(developer): Replace these variables before running the sample.
        String modelId = "gemini-2.5-flash";
        generateContent(modelId);
      }

      // Generates transcript with audio input
      public static String generateContent(String modelId) {
        // Client Initialization. Once created, it can be reused for multiple requests.
        try (Client client =
            Client.builder()
                .location("global")
                .vertexAI(true)
                .httpOptions(HttpOptions.builder().apiVersion("v1").build())
                .build()) {

          String prompt =
              "Transcribe the interview, in the format of timecode, speaker, caption.\n"
                  + "Use speaker A, speaker B, etc. to identify speakers.";

          // Enable audioTimestamp to generate timestamps for audio-only files.
          GenerateContentConfig contentConfig =
              GenerateContentConfig.builder().audioTimestamp(true).build();

          GenerateContentResponse response =
              client.models.generateContent(
                  modelId,
                  Content.fromParts(
                      Part.fromUri(
                          "gs://cloud-samples-data/generative-ai/audio/pixel.mp3", "audio/mpeg"),
                      Part.fromText(prompt)),
                  contentConfig);

          System.out.print(response.text());
          // Example response:
          // 00:00 - Speaker A: your devices are getting better over time. And so we think about it...
          // 00:14 - Speaker B: Welcome to the Made by Google Podcast, where we meet the people who...
          // 00:41 - Speaker A: So many features. I am a singer, so I actually think recorder...
          return response.text();
        }
      }
    }

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

  If you don't have an audio file in Cloud Storage, then you can use the following
  publicly available file:
  `gs://cloud-samples-data/generative-ai/audio/pixel.mp3` with a mime type of
  `audio/mp3`. To listen to this audio,
  [open the sample MP3](https://storage.googleapis.com/cloud-samples-data/generative-ai/audio/pixel.mp3)
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
  The text instructions to include in the prompt. For example, `Can you transcribe this interview, in the format of timecode, speaker, caption.
  Use speaker A, speaker B, etc. to identify speakers.`

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
  },
  "generationConfig": {
    "audioTimestamp": true
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
     "https://aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/global/publishers/google/models/gemini-2.0-flash:generateContent"
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
  },
  "generationConfig": {
    "audioTimestamp": true
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
    -Uri "https://aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/global/publishers/google/models/gemini-2.0-flash:generateContent" | Select-Object -Expand Content
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
            "text": "0:00 Speaker A: Your devices are getting better over time, and so we think
              about it across the entire portfolio from phones to watch to buds to tablet. We get
              really excited about how we can tell a joint narrative across everything.
              0:18 Speaker B: Welcome to the Made By Google Podcast, where we meet the people who
              work on the Google products you love. Here's your host, Rasheed.
              0:33 Speaker B: Today we're talking to Aisha and DeCarlos. They're both
              Product Managers for various Pixel devices and work on something that all the Pixel
              owners love. The Pixel feature drops. This is the Made By Google Podcast. Aisha, which
              feature on your Pixel phone has been most transformative in your own life?
              0:56 Speaker A: So many features. I am a singer, so I actually think recorder
              transcription has been incredible because before I would record songs I'd just like,
              freestyle them, record them, type them up. But now with transcription it works so well
              even deciphering lyrics that are jumbled. I think that's huge.
              ...
              Subscribe now wherever you get your podcasts to be the first to listen."
          }
        ]
      },
      "finishReason": "STOP",
      "safetyRatings": [
        {
          "category": "HARM_CATEGORY_HATE_SPEECH",
          "probability": "NEGLIGIBLE",
          "probabilityScore": 0.043609526,
          "severity": "HARM_SEVERITY_NEGLIGIBLE",
          "severityScore": 0.06255973
        },
        {
          "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
          "probability": "NEGLIGIBLE",
          "probabilityScore": 0.022328783,
          "severity": "HARM_SEVERITY_NEGLIGIBLE",
          "severityScore": 0.04426588
        },
        {
          "category": "HARM_CATEGORY_HARASSMENT",
          "probability": "NEGLIGIBLE",
          "probabilityScore": 0.07107367,
          "severity": "HARM_SEVERITY_NEGLIGIBLE",
          "severityScore": 0.049405243
        },
        {
          "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          "probability": "NEGLIGIBLE",
          "probabilityScore": 0.10484337,
          "severity": "HARM_SEVERITY_NEGLIGIBLE",
          "severityScore": 0.13128456
        }
      ]
    }
  ],
  "usageMetadata": {
    "promptTokenCount": 18871,
    "candidatesTokenCount": 2921,
    "totalTokenCount": 21792
  }
}
```
Note the following in the URL for this sample:

- Use the [`generateContent`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations.publishers.models/generateContent) method to request that the response is returned after it's fully generated. To reduce the perception of latency to a human audience, stream the response as it's being generated by using the [`streamGenerateContent`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations.publishers.models/streamGenerateContent) method.
- The multimodal model ID is located at the end of the URL before the method (for example, `gemini-2.5-flash`). This sample might support other models as well.
- When you use a regional API endpoint (for example, `us-central1`), the region from the endpoint URL determines where the request is processed. Any conflicting location in the resource path is ignored.

## Set optional model parameters

Each model has a set of optional parameters that you can set. For more
information, see [Content generation parameters](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/content-generation-parameters).

## Limitations

While Gemini multimodal models are powerful in many multimodal use
cases, it's important to understand the limitations of the models:

- **Non-speech sound recognition**: The models that support audio might make mistakes recognizing sound that's not speech.
- **Audio-only timestamps** : To accurately generate timestamps for audio-only files, you must configure the `audio_timestamp` parameter in `generation_config`.

## What's next

- Start building with Gemini multimodal models - new customers [get $300 in free Google Cloud credits](https://console.cloud.google.com/freetrial) to explore what they can do with Gemini.
- Learn how to [send chat prompt requests](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/send-chat-prompts-gemini).
- Learn about [responsible AI best practices and Agent Platform's safety filters](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/responsible-ai).
