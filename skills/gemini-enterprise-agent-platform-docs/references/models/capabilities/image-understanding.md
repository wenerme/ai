> [!NOTE]
> To see an example of image understanding,
> run the "Intro to Multimodal Use Cases with the Gemini API" notebook in one of the following
> environments:
>
> [!Open in Colab](https://colab.research.google.com/github/GoogleCloudPlatform/generative-ai/blob/main/gemini/use-cases/intro_multimodal_use_cases.ipynb)
>
>
> \|
>
> [!Open in Colab Enterprise](https://console.cloud.google.com/agent-platform/colab/import/https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fgemini%2Fuse-cases%2Fintro_multimodal_use_cases.ipynb)
>
>
> \|
>
> [!Open
> in Agent Platform Workbench](https://console.cloud.google.com/agent-platform/workbench/deploy-notebook?download_url=https://raw.githubusercontent.com/GoogleCloudPlatform/generative-ai/main/gemini/use-cases/intro_multimodal_use_cases.ipynb)
>
>
> \|
>
> [!View on GitHub](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/use-cases/intro_multimodal_use_cases.ipynb)

You can add images to Gemini requests to perform tasks that involve
understanding the contents of the included images. This page shows you how to add
images to your requests to Gemini in Gemini Enterprise Agent Platform by using the
Google Cloud console and the Agent Platform API.

## Supported models

The following table lists the models that support image understanding:

| Models | Media details | MIME types |
|---|---|---|
| - [Gemini 3.1 Flash-Lite Image (Nano Banana 2 Lite)](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-flash-lite-image) | - Maximum images per prompt: 14 - Maximum file size per file for inline data or direct uploads through the console: 7 MB - Maximum file size per file from Google Cloud Storage: 30 MB - Maximum number of output images per prompt: Limited to 32,768 output tokens - Supported aspect ratios: 1:1, 1:4, 4:1, 1:8, 8:1, 2:3, 3:2, 3:4, 4:3, 4:5, 5:4, 9:16, 16:9, 21:9 - Supported resolutions: 1K | - `image/png` - `image/jpeg` - `image/webp` - `image/heic` - `image/heif` |

For a list of languages supported by Gemini models, see model information
[Google models](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/google-models). To learn
more about how to design multimodal prompts, see
[Design multimodal prompts](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/design-multimodal-prompts).
If you're looking for a way to use Gemini directly from your mobile and
web apps, see the
[Firebase AI Logic client SDKs](https://firebase.google.com/docs/ai-logic) for
Swift, Android, Web, Flutter, and Unity apps.

## Add images to a request

You can add a single image or multiple images in your request to Gemini.

### Single image

The sample code in each of the following tabs shows a different way to identify
what's in an image. This sample works with all Gemini multimodal models.

### Console

To send a multimodal prompt by using the Google Cloud console, do the following:

1. In the Agent Platform section of the Google Cloud console, go to
   the **Agent Studio** page.

   [Go to Agent Studio](https://console.cloud.google.com/agent-platform/generative/multimodal)
2. Click **Open freeform**.

3. Optional: Configure the model and parameters:

   - **Model**: Select a model.
   - **Region**: Select the region that you want to use.
   - **Temperature**: Use the slider or textbox to enter a value for
     temperature.

     The temperature is used for sampling during response generation, which occurs when `topP`
     and `topK` are applied. Temperature controls the degree of randomness in token selection.
     Lower temperatures are good for prompts that require a less open-ended or creative response, while
     higher temperatures can lead to more diverse or creative results. A temperature of `0`
     means that the highest probability tokens are always selected. In this case, responses for a given
     prompt are mostly deterministic, but a small amount of variation is still possible.

     If the model returns a response that's too generic, too short, or the model gives a fallback
     response, try increasing the temperature. If the model enters infinite generation, increasing the
     temperature to at least `0.1` may lead to improved results.
     `1.0` is the recommended starting value for temperature.

   - **Output token limit**: Use the slider or textbox to enter a value for
     the max output limit.

     Maximum number of tokens that can be generated in the response. A token is
     approximately four characters. 100 tokens correspond to roughly 60-80 words.

     Specify a lower value for shorter responses and a higher value for potentially longer
     responses.

   - **Add stop sequence**: Optional. Enter a stop sequence, which is a
     series of characters that includes spaces. If the model encounters a
     stop sequence, the response generation stops. The stop sequence isn't
     included in the response, and you can add up to five stop sequences.

4. Optional: To configure advanced parameters, click **Advanced** and
   configure as follows:

   #### Click to expand advanced configurations

   - **Top-K**: Use the slider or textbox to enter a value for top-K.
     (not supported for Gemini 1.5).

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
    **Get code**.

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
            "What is shown in this image?",
            Part.from_uri(
                file_uri="gs://cloud-samples-data/generative-ai/image/scones.jpg",
                mime_type="image/jpeg",
            ),
        ],
    )
    print(response.text)
    # Example response:
    # The image shows a flat lay of blueberry scones arranged on parchment paper. There are ...

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

    // generateWithTextImage shows how to generate text using both text and image input
    func generateWithTextImage(w io.Writer) error {
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
                {Text: "What is shown in this image?"},
                {FileData: &genai.FileData{
                    // Image source: https://storage.googleapis.com/cloud-samples-data/generative-ai/image/scones.jpg
                    FileURI:  "gs://cloud-samples-data/generative-ai/image/scones.jpg",
                    MIMEType: "image/jpeg",
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
        // The image shows an overhead shot of a rustic, artistic arrangement on a surface that ...

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

    async function generateContent(
      projectId = GOOGLE_CLOUD_PROJECT,
      location = GOOGLE_CLOUD_LOCATION
    ) {
      const client = new GoogleGenAI({
        vertexai: true,
        project: projectId,
        location: location,
      });

      const image = {
        fileData: {
          fileUri: 'gs://cloud-samples-data/generative-ai/image/scones.jpg',
          mimeType: 'image/jpeg',
        },
      };

      const response = await client.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [image, 'What is shown in this image?'],
      });

      console.log(response.text);

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

    public class TextGenerationWithTextAndImage {

      public static void main(String[] args) {
        // TODO(developer): Replace these variables before running the sample.
        String modelId = "gemini-2.5-flash";
        generateContent(modelId);
      }

      // Generates text with text and image input
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
                      Part.fromText("What is shown in this image?"),
                      Part.fromUri(
                          "gs://cloud-samples-data/generative-ai/image/scones.jpg", "image/jpeg")),
                  null);

          System.out.print(response.text());
          // Example response:
          // The image shows a flat lay of blueberry scones arranged on parchment paper. There are ...
          return response.text();
        }
      }
    }

### REST

After you set up your environment, you can use REST to test a text prompt. The
following sample sends a request to the publisher model endpoint.
You can include images that are stored in Cloud Storage or use base64-encoded image data.

### Image in Cloud Storage

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

  If you don't have an image file in Cloud Storage, then you can use the following
  publicly available file:
  `gs://cloud-samples-data/generative-ai/image/scones.jpg` with a mime type of
  `image/jpeg`. To view this image,
  [open the sample image](https://storage.googleapis.com/cloud-samples-data/generative-ai/image/scones.jpg)
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
- `TEXT`: The text instructions to include in the prompt. For example, `What is shown in this image?`

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
     "https://aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/global/publishers/google/models/gemini-1.5-flash:generateContent"
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
    -Uri "https://aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/global/publishers/google/models/gemini-1.5-flash:generateContent" | Select-Object -Expand Content
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
            "text": " The image shows a table with a cup of coffee, a bowl of blueberries, and a plate of scones with blueberries on it. There are also pink flowers on the table."
          }
        ]
      },
      "finishReason": "STOP",
      "safetyRatings": [
        {
          "category": "HARM_CATEGORY_HATE_SPEECH",
          "probability": "NEGLIGIBLE",
          "probabilityScore": 0.027742893,
          "severity": "HARM_SEVERITY_NEGLIGIBLE",
          "severityScore": 0.07276838
        },
        {
          "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
          "probability": "NEGLIGIBLE",
          "probabilityScore": 0.026155617,
          "severity": "HARM_SEVERITY_NEGLIGIBLE",
          "severityScore": 0.07172113
        },
        {
          "category": "HARM_CATEGORY_HARASSMENT",
          "probability": "NEGLIGIBLE",
          "probabilityScore": 0.04304285,
          "severity": "HARM_SEVERITY_NEGLIGIBLE",
          "severityScore": 0.037608635
        },
        {
          "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          "probability": "NEGLIGIBLE",
          "probabilityScore": 0.08803312,
          "severity": "HARM_SEVERITY_NEGLIGIBLE",
          "severityScore": 0.09203286
        }
      ]
    }
  ],
  "usageMetadata": {
    "promptTokenCount": 265,
    "candidatesTokenCount": 35,
    "totalTokenCount": 300
  }
}
```

### Base64 image data

Before using any of the request data,
make the following replacements:

- `LOCATION`: The region to process the request. Enter a supported region. For the full list of supported regions, see [Available locations](https://docs.cloud.google.com/vertex-ai/docs/learn/locations#available-regions). **Click to expand a partial list of available regions**
  - `us-central1`
  - `us-west4`
  - `northamerica-northeast1`
  - `us-east4`
  - `us-west1`
  - `asia-northeast3`
  - `asia-southeast1`
  - `asia-northeast1`
- `PROJECT_ID`: Your \[project ID\](/resource-manager/docs/creating-managing-projects#identifiers). .
-

  ```
  B64_BASE_IMAGE
  ```
  The [base64 encoding](https://docs.cloud.google.com/gemini-enterprise-agent-platform/tutorials/base64-encode) of the image, PDF, or video to include inline in the prompt. When including media inline, you must also specify the media type (`mimeType`) of the data.
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
- `TEXT`: The text instructions to include in the prompt. For example, `What is shown in this image?`.

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
        "inlineData": {
          "data": "B64_BASE_IMAGE",
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
     "https://aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/global/publishers/google/models/gemini-1.5-flash:generateContent"
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
        "inlineData": {
          "data": "B64_BASE_IMAGE",
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
    -Uri "https://aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/global/publishers/google/models/gemini-1.5-flash:generateContent" | Select-Object -Expand Content
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
            "text": " The image shows a table with a cup of coffee, a bowl of blueberries, and a plate of scones with blueberries on it. There are also pink flowers on the table."
          }
        ]
      },
      "finishReason": "STOP",
      "safetyRatings": [
        {
          "category": "HARM_CATEGORY_HATE_SPEECH",
          "probability": "NEGLIGIBLE",
          "probabilityScore": 0.027742893,
          "severity": "HARM_SEVERITY_NEGLIGIBLE",
          "severityScore": 0.07276838
        },
        {
          "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
          "probability": "NEGLIGIBLE",
          "probabilityScore": 0.026155617,
          "severity": "HARM_SEVERITY_NEGLIGIBLE",
          "severityScore": 0.07172113
        },
        {
          "category": "HARM_CATEGORY_HARASSMENT",
          "probability": "NEGLIGIBLE",
          "probabilityScore": 0.04304285,
          "severity": "HARM_SEVERITY_NEGLIGIBLE",
          "severityScore": 0.037608635
        },
        {
          "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          "probability": "NEGLIGIBLE",
          "probabilityScore": 0.08803312,
          "severity": "HARM_SEVERITY_NEGLIGIBLE",
          "severityScore": 0.09203286
        }
      ]
    }
  ],
  "usageMetadata": {
    "promptTokenCount": 265,
    "candidatesTokenCount": 35,
    "totalTokenCount": 300
  }
}
```
Note the following in the URL for this sample:

- Use the [`generateContent`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations.publishers.models/generateContent) method to request that the response is returned after it's fully generated. To reduce the perception of latency to a human audience, stream the response as it's being generated by using the [`streamGenerateContent`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations.publishers.models/streamGenerateContent) method.
- The multimodal model ID is located at the end of the URL before the method (for example, `gemini-2.5-flash`). This sample might support other models as well.
- When you use a regional API endpoint (for example, `us-central1`), the region from the endpoint URL determines where the request is processed. Any conflicting location in the resource path is ignored.

### Multiple images

Each of the following tabs shows you a different way to include multiple images
in a prompt request. Each sample takes in two sets of the following inputs:

- An image of a popular city landmark
- The media type of the image
- Text indicating the city and landmark in the image

The sample also takes in a third image and media type, but no text. The sample
returns a text response indicating the city and landmark in the third image.

These image samples work with all Gemini multimodal models.

### Console

To send a multimodal prompt by using the Google Cloud console, do the following:

1. In the Agent Platform section of the Google Cloud console, go to
   the **Agent Studio** page.

   [Go to Agent Studio](https://console.cloud.google.com/agent-platform/generative/multimodal)
2. Click **Open freeform**.

3. Optional: Configure the model and parameters:

   - **Model**: Select a model.
   - **Region**: Select the region that you want to use.
   - **Temperature**: Use the slider or textbox to enter a value for
     temperature.

     The temperature is used for sampling during response generation, which occurs when `topP`
     and `topK` are applied. Temperature controls the degree of randomness in token selection.
     Lower temperatures are good for prompts that require a less open-ended or creative response, while
     higher temperatures can lead to more diverse or creative results. A temperature of `0`
     means that the highest probability tokens are always selected. In this case, responses for a given
     prompt are mostly deterministic, but a small amount of variation is still possible.

     If the model returns a response that's too generic, too short, or the model gives a fallback
     response, try increasing the temperature. If the model enters infinite generation, increasing the
     temperature to at least `0.1` may lead to improved results.
     `1.0` is the recommended starting value for temperature.

   - **Output token limit**: Use the slider or textbox to enter a value for
     the max output limit.

     Maximum number of tokens that can be generated in the response. A token is
     approximately four characters. 100 tokens correspond to roughly 60-80 words.

     Specify a lower value for shorter responses and a higher value for potentially longer
     responses.

   - **Add stop sequence**: Optional. Enter a stop sequence, which is a
     series of characters that includes spaces. If the model encounters a
     stop sequence, the response generation stops. The stop sequence isn't
     included in the response, and you can add up to five stop sequences.

4. Optional: To configure advanced parameters, click **Advanced** and
   configure as follows:

   #### Click to expand advanced configurations

   - **Top-K**: Use the slider or textbox to enter a value for top-K.
     (not supported for Gemini 1.5).

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
    **Get code**.

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

    # Read content from GCS
    gcs_file_img_path = "gs://cloud-samples-data/generative-ai/image/scones.jpg"

    # Read content from a local file
    with open("test_data/latte.jpg", "rb") as f:
        local_file_img_bytes = f.read()

    response = client.models.generate_content(
        model="gemini-3.5-flash",
        contents=[
            "Generate a list of all the objects contained in both images.",
            Part.from_uri(file_uri=gcs_file_img_path, mime_type="image/jpeg"),
            Part.from_bytes(data=local_file_img_bytes, mime_type="image/jpeg"),
        ],
    )
    print(response.text)
    # Example response:
    # Okay, here's the list of objects present in both images:
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
        "os"

        genai "google.golang.org/genai"
    )

    // generateWithMultiImg shows how to generate text using multiple image inputs.
    func generateWithMultiImg(w io.Writer) error {
        ctx := context.Background()

        client, err := genai.NewClient(ctx, &genai.ClientConfig{
            HTTPOptions: genai.HTTPOptions{APIVersion: "v1"},
        })
        if err != nil {
            return fmt.Errorf("failed to create genai client: %w", err)
        }

        // TODO(Developer): Update the path to file (image source:
        //   https://storage.googleapis.com/cloud-samples-data/generative-ai/image/latte.jpg )
        imageBytes, err := os.ReadFile("./latte.jpg")
        if err != nil {
            return fmt.Errorf("failed to read image: %w", err)
        }

        contents := []*genai.Content{
            {Parts: []*genai.Part{
                {Text: "Write an advertising jingle based on the items in both images."},
                {FileData: &genai.FileData{
                    // Image source: https://storage.googleapis.com/cloud-samples-data/generative-ai/image/scones.jpg
                    FileURI:  "gs://cloud-samples-data/generative-ai/image/scones.jpg",
                    MIMEType: "image/jpeg",
                }},
                {InlineData: &genai.Blob{
                    Data:     imageBytes,
                    MIMEType: "image/jpeg",
                }},
            }},
        }
        modelName := "gemini-2.5-flash"

        resp, err := client.Models.GenerateContent(ctx, modelName, contents, nil)
        if err != nil {
            return fmt.Errorf("failed to generate content: %w", err)
        }

        respText := resp.Text()

        fmt.Fprintln(w, respText)

        // Example response:
        // Okay, here's an advertising jingle inspired by the blueberry scones, coffee, flowers, chocolate cake, and latte:
        //
        // (Upbeat, jazzy music)
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

    async function generateContent(
      projectId = GOOGLE_CLOUD_PROJECT,
      location = GOOGLE_CLOUD_LOCATION
    ) {
      const client = new GoogleGenAI({
        vertexai: true,
        project: projectId,
        location: location,
      });

      const image1 = {
        fileData: {
          fileUri: 'gs://cloud-samples-data/generative-ai/image/scones.jpg',
          mimeType: 'image/jpeg',
        },
      };

      const image2 = {
        fileData: {
          fileUri: 'gs://cloud-samples-data/generative-ai/image/fruit.png',
          mimeType: 'image/png',
        },
      };

      const response = await client.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          image1,
          image2,
          'Generate a list of all the objects contained in both images.',
        ],
      });

      console.log(response.text);

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
    import java.io.IOException;
    import java.nio.file.Files;
    import java.nio.file.Paths;

    public class TextGenerationWithMultiImage {

      public static void main(String[] args) throws IOException {
        // TODO(developer): Replace these variables before running the sample.
        String modelId = "gemini-2.5-flash";
        // Content from Google Cloud Storage
        String gcsFileImagePath = "gs://cloud-samples-data/generative-ai/image/scones.jpg";
        String localImageFilePath = "resources/latte.jpg";
        generateContent(modelId, gcsFileImagePath, localImageFilePath);
      }

      // Generates text with multiple images
      public static String generateContent(
          String modelId, String gcsFileImagePath, String localImageFilePath) throws IOException {
        // Initialize client that will be used to send requests. This client only needs to be created
        // once, and can be reused for multiple requests.
        try (Client client =
            Client.builder()
                .location("global")
                .vertexAI(true)
                .httpOptions(HttpOptions.builder().apiVersion("v1").build())
                .build()) {

          // Read content from a local file.
          byte[] localFileImgBytes = Files.readAllBytes(Paths.get(localImageFilePath));

          GenerateContentResponse response =
              client.models.generateContent(
                  modelId,
                  Content.fromParts(
                      Part.fromText("Generate a list of all the objects contained in both images"),
                      Part.fromBytes(localFileImgBytes, "image/jpeg"),
                      Part.fromUri(gcsFileImagePath, "image/jpeg")),
                  null);

          System.out.print(response.text());
          // Example response:
          // Okay, here's the list of objects present in both images:
          //
          // **Image 1 (Scones):**
          //
          // *   Scones
          // *   Plate
          // *   Jam/Preserve
          // *   Cream/Butter
          // *   Table/Surface
          // *   Napkin/Cloth (possibly)
          //
          // **Image 2 (Latte):**
          //
          // *   Latte/Coffee cup
          // *   Saucer
          // *   Spoon
          // *   Table/Surface
          // *   Foam/Latte art
          //
          // **Objects potentially in both (depending on interpretation and specific items):**
          //
          // *   Plate/Saucer (both are serving dishes)
          // *   Table/Surface
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
- `FILE_URI1`: The URI or URL of the file to include in the prompt. Acceptable values include the following:
  - **Cloud Storage bucket URI:** The object must either be publicly readable or reside in the same Google Cloud project that's sending the request. For `gemini-2.0-flash` and `gemini-2.0-flash-lite`, the size limit is 2 GB.
  - **HTTP URL:** The file URL must be publicly readable. You can specify one video file, one audio file, and up to 10 image files per request. Audio files, video files, and documents can't exceed 15 MB.
  - **YouTube video URL:**The YouTube video must be either owned by the account that you used to sign in to the Google Cloud console or be public. Only one YouTube video URL is supported per request.

  When specifying a `fileURI`, you must also specify the media type
  (`mimeType`) of the file. If VPC Service Controls is enabled, specifying a media file
  URL for `fileURI` is not supported.

  If you don't have an image file in Cloud Storage, then you can use the following
  publicly available file:
  `gs://cloud-samples-data/vertex-ai/llm/prompts/landmark1.png` with a mime type of
  `image/png`. To view this image,
  [open the sample image](https://storage.googleapis.com/cloud-samples-data/vertex-ai/llm/prompts/landmark1.png)
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
  For simplicity, this sample uses the same media type for all three input images.
- `TEXT1`: The text instructions to include in the prompt. For example, `city: Rome, Landmark: the Colosseum`
- `FILE_URI2`: The URI or URL of the file to include in the prompt. Acceptable values include the following:
  - **Cloud Storage bucket URI:** The object must either be publicly readable or reside in the same Google Cloud project that's sending the request. For `gemini-2.0-flash` and `gemini-2.0-flash-lite`, the size limit is 2 GB.
  - **HTTP URL:** The file URL must be publicly readable. You can specify one video file, one audio file, and up to 10 image files per request. Audio files, video files, and documents can't exceed 15 MB.
  - **YouTube video URL:**The YouTube video must be either owned by the account that you used to sign in to the Google Cloud console or be public. Only one YouTube video URL is supported per request.

  When specifying a `fileURI`, you must also specify the media type
  (`mimeType`) of the file. If VPC Service Controls is enabled, specifying a media file
  URL for `fileURI` is not supported.

  If you don't have an image file in Cloud Storage, then you can use the following
  publicly available file:
  `gs://cloud-samples-data/vertex-ai/llm/prompts/landmark2.png` with a mime type of
  `image/png`. To view this image,
  [open the sample image](https://storage.googleapis.com/cloud-samples-data/vertex-ai/llm/prompts/landmark2.png)
  file.
- `TEXT2`: The text instructions to include in the prompt. For example, `city: Beijing, Landmark: Forbidden City`
- `FILE_URI3`: The URI or URL of the file to include in the prompt. Acceptable values include the following:
  - **Cloud Storage bucket URI:** The object must either be publicly readable or reside in the same Google Cloud project that's sending the request. For `gemini-2.0-flash` and `gemini-2.0-flash-lite`, the size limit is 2 GB.
  - **HTTP URL:** The file URL must be publicly readable. You can specify one video file, one audio file, and up to 10 image files per request. Audio files, video files, and documents can't exceed 15 MB.
  - **YouTube video URL:**The YouTube video must be either owned by the account that you used to sign in to the Google Cloud console or be public. Only one YouTube video URL is supported per request.

  When specifying a `fileURI`, you must also specify the media type
  (`mimeType`) of the file. If VPC Service Controls is enabled, specifying a media file
  URL for `fileURI` is not supported.

  If you don't have an image file in Cloud Storage, then you can use the following
  publicly available file:
  `gs://cloud-samples-data/vertex-ai/llm/prompts/landmark3.png` with a mime type of
  `image/png`. To view this image,
  [open the sample image](https://storage.googleapis.com/cloud-samples-data/vertex-ai/llm/prompts/landmark3.png)
  file.

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
          "fileUri": "FILE_URI1",
          "mimeType": "MIME_TYPE"
        }
      },
      {
        "text": "TEXT1"
      },
      {
        "fileData": {
          "fileUri": "FILE_URI2",
          "mimeType": "MIME_TYPE"
        }
      },
      {
        "text": "TEXT2"
      },
      {
        "fileData": {
          "fileUri": "FILE_URI3",
          "mimeType": "MIME_TYPE"
        }
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
          "fileUri": "FILE_URI1",
          "mimeType": "MIME_TYPE"
        }
      },
      {
        "text": "TEXT1"
      },
      {
        "fileData": {
          "fileUri": "FILE_URI2",
          "mimeType": "MIME_TYPE"
        }
      },
      {
        "text": "TEXT2"
      },
      {
        "fileData": {
          "fileUri": "FILE_URI3",
          "mimeType": "MIME_TYPE"
        }
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
            "text": "city: Rio de Janeiro, Landmark: Christ the Redeemer statue \n"
          }
        ]
      },
      "finishReason": "STOP",
      "safetyRatings": [
        {
          "category": "HARM_CATEGORY_HATE_SPEECH",
          "probability": "NEGLIGIBLE",
          "probabilityScore": 0.05340333,
          "severity": "HARM_SEVERITY_NEGLIGIBLE",
          "severityScore": 0.08740791
        },
        {
          "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
          "probability": "NEGLIGIBLE",
          "probabilityScore": 0.13050689,
          "severity": "HARM_SEVERITY_NEGLIGIBLE",
          "severityScore": 0.10338596
        },
        {
          "category": "HARM_CATEGORY_HARASSMENT",
          "probability": "NEGLIGIBLE",
          "probabilityScore": 0.05399884,
          "severity": "HARM_SEVERITY_NEGLIGIBLE",
          "severityScore": 0.09947021
        },
        {
          "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          "probability": "NEGLIGIBLE",
          "probabilityScore": 0.10576342,
          "severity": "HARM_SEVERITY_NEGLIGIBLE",
          "severityScore": 0.066934206
        }
      ]
    }
  ],
  "usageMetadata": {
    "promptTokenCount": 791,
    "candidatesTokenCount": 14,
    "totalTokenCount": 805
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

## Image tokenization

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

With Gemini 3 models, image tokenization uses a variable sequence length,
which replaces the Pan and Scan method used in previous models for better
quality and latency.

You can specify a media resolution for image and PDF inputs, which affects
how images are tokenized and how many tokens are used for each image.
You can set `media_resolution` in `generationConfig` to apply `low`, `medium`,
or `high` resolution to all media in the request, or set resolution for
individual media parts, which will override the top-level setting. The
`ultra_high` resolution can only be set for individual media parts.

The following resolutions are available for Gemini 3 models:

- `MEDIA_RESOLUTION_ULTRA_HIGH`: 2240 tokens for images
- `MEDIA_RESOLUTION_HIGH`: 1120 tokens for images and PDFs
- `MEDIA_RESOLUTION_MEDIUM`: 560 tokens for images and PDFs
- `MEDIA_RESOLUTION_LOW`: 280 tokens for images and PDFs
- `MEDIA_RESOLUTION_UNSPECIFIED`: 1120 tokens for images and 560 for PDFs (default)

The following token counts apply to Gemini 3 Pro Image:

- Input images: 560 tokens per image
- Output images:
  - 1K resolution: 1120 tokens per image (default)
  - 2K resolution: 1120 tokens per image
  - 4K resolution: 2000 tokens per image

For models earlier than Gemini 3, each image is processed using Pan
and Scan and costs 258 tokens.

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

When using images, use the following best practices and information for the
best results:

- If you want to detect text in an image, use prompts with a single image to produce better results than prompts with multiple images.
- If your prompt contains a single image, place the image before the text prompt in your request.
- If your prompt contains multiple images, and you want to refer to them later in your prompt or have the model refer to them in the model response, it can help to give each image an index before the image. Use `a` `b` `c` or `image 1` `image 2` `image 3` for your index. The following is an example of using indexed images in a prompt:

  ```
  image 1
  image 2
  image 3

  Write a blogpost about my day using image 1 and image 2. Then, give me ideas
  for tomorrow based on image 3.
  ```
- Use images with higher resolution; they yield better results.
- Include a few examples in the prompt.
- Rotate images to their proper orientation before adding them to the prompt.
- Avoid blurry images.

## Limitations

While Gemini multimodal models are powerful in many multimodal use
cases, it's important to understand the limitations of the models:

- **Content moderation**: The models refuse to provide answers on images that violate our safety policies.
- **Spatial reasoning**: The models aren't precise at locating text or objects in images. They might only return the approximated counts of objects.
- **Medical uses**: The models aren't suitable for interpreting medical images (for example, x-rays and CT scans) or providing medical advice.
- **People recognition**: The models aren't meant to be used to identify people who aren't celebrities in images.
- **Accuracy**: The models might hallucinate or make mistakes when interpreting low-quality, rotated, or extremely low-resolution images. The models might also hallucinate when interpreting handwritten text in images documents.

## What's next

- Start building with Gemini multimodal models - new customers [get $300 in free Google Cloud credits](https://console.cloud.google.com/freetrial) to explore what they can do with Gemini.
- Learn how to [send chat prompt requests](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/send-chat-prompts-gemini).
- Learn about [responsible AI best practices and Agent Platform's safety filters](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/responsible-ai).
