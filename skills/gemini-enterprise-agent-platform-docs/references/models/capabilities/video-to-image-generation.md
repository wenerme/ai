> [!WARNING]
> **Preview**
>
>
> This product or feature is a Generative AI Preview offering, subject to the
> "Pre-GA Offerings Terms" of the
> [Google Cloud Service Specific Terms](https://cloud.google.com/terms/service-terms). For this Generative AI Preview
> offering, Customers may elect to use it for production or commercial
> purposes, or disclose Generated Output to third-parties, and may process
> personal data as outlined in the
> [Cloud Data Processing Addendum](https://cloud.google.com/terms/data-processing-addendum), subject to the obligations and
> restrictions described in the agreement under which you access Google
> Cloud.

> [!NOTE]
> To see examples of Image generation from videos with Gemini,
> run the following notebooks in the environment of your choice:
>
> - "Gemini 3.1 Flash Lite Image Generation in Agent Platform":
>
>   [!Open in Colab](https://colab.research.google.com/github/GoogleCloudPlatform/generative-ai/blob/main/gemini/getting-started/intro_gemini_3_1_flash_lite_image_gen.ipynb)
>
>
>   \|
>
>   [!Open in Colab Enterprise](https://console.cloud.google.com/agent-platform/colab/import/https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fgemini%2Fgetting-started%2Fintro_gemini_3_1_flash_lite_image_gen.ipynb)
>
>
>   \|
>
>   [!Open
>   in Agent Platform Workbench](https://console.cloud.google.com/agent-platform/workbench/deploy-notebook?download_url=https://raw.githubusercontent.com/GoogleCloudPlatform/generative-ai/main/gemini/getting-started/intro_gemini_3_1_flash_lite_image_gen.ipynb)
>
>
>   \|
>
>   [!View on GitHub](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/getting-started/intro_gemini_3_1_flash_lite_image_gen.ipynb)
> - "Gemini 3.1 Flash Image Generation in Agent Platform":
>
>   [!Open in Colab](https://colab.research.google.com/github/GoogleCloudPlatform/generative-ai/blob/main/gemini/getting-started/intro_gemini_3_1_flash_image_gen.ipynb)
>
>
>   \|
>
>   [!Open in Colab Enterprise](https://console.cloud.google.com/agent-platform/colab/import/https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fgemini%2Fgetting-started%2Fintro_gemini_3_1_flash_image_gen.ipynb)
>
>
>   \|
>
>   [!Open
>   in Agent Platform Workbench](https://console.cloud.google.com/agent-platform/workbench/deploy-notebook?download_url=https://raw.githubusercontent.com/GoogleCloudPlatform/generative-ai/main/gemini/getting-started/intro_gemini_3_1_flash_image_gen.ipynb)
>
>
>   \|
>
>   [!View on GitHub](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/getting-started/intro_gemini_3_1_flash_image_gen.ipynb)

You can use Gemini to generate images from a video, which can be useful
to credate an image for a thumbnail for a video. Supported interfaces include
the Google Cloud console and the Agent Platform API.

The following Gemini models support image generation from a
video:

#### Click to expand supported models

- [`gemini-3.1-flash-lite-image`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-flash-lite-image)
- [`gemini-3.1-flash-image`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-flash-image)

## Generate images from video

The following shows how to generate images from video using either
Agent Studio or using the API.

For more information about best practices for prompting, see [Design multimodal
prompts](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/design-multimodal-prompts#fundamentals).

### Console

To generate images from video with Gemini, do the following:

1. In the Agent Platform section of the Google Cloud console, go to
   **Agent Studio** \> **Image**.

   [Go to Vertex AI Studio](https://console.cloud.google.com/agent-platform/generative/multimodal;mode=prompt)
2. In **Model settings**, select one of the displayed models.

3. In the **Prompt** text area, click the
   add **add** button, and then
   select the source of the video file:

   ### Upload

   Select the file that you want to upload and click **Open**.

   ### By URL

   Enter the URL of the file that you want to use and click **Insert**.

   ### YouTube

   Enter the URL of the YouTube video that you want to use and click
   **Insert**.

   You can use any public video or a video that's owned by the account that
   you used to sign in to the Google Cloud console.

   ### Cloud Storage

   Select the bucket and then the file from the bucket that
   you want to import and click **Select**.

   ### Google Drive

   1. Choose an account and give consent to Vertex AI Studio to access your account the first time you select this option. You can upload multiple files that have a total size of up to 10 MB. A single file can't exceed 7 MB.
   2. Click the file that you want to add.
   3. Click **Select**.

      The file thumbnail displays in the **Prompt** pane. The total number of
      tokens also displays. If your prompt data exceeds the token limit, the
      tokens are truncated and aren't included in processing your data.
4. Write a description of the image you want to generate in the text area of
   the **Prompt** text area.

5. Click the **Prompt** () button.

Gemini generates an image based on your description. This
process takes a few seconds, but can be comparatively slower depending on
capacity.

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
    from google.genai.types import GenerateContentConfig, Modality, Part
    from PIL import Image
    from io import BytesIO

    client = genai.Client()

    # A video on 'The ABCs of agent building'
    video = "https://www.youtube.com/watch?v=rjoMZyxncUI"

    response = client.models.generate_content(
        model="gemini-3.1-flash-image",
        contents=[
            Part.from_uri(
                file_uri=video,
                mime_type="video/mp4"
            ),
            "Generate an infographic of the topics covered in this video."
        ],
        config=GenerateContentConfig(response_modalities=[Modality.TEXT, Modality.IMAGE]),
    )
    for part in response.candidates[0].content.parts:
        if part.text:
            print(part.text)
        elif part.inline_data:
            image = Image.open(BytesIO((part.inline_data.data)))
            image.save("output_folder/video-image.png")

### REST

After you set up your environment, you can use REST to test a text prompt. The
following sample sends a request to the publisher model endpoint.

Before using any of the request data,
make the following replacements:

- `PROJECT_ID`: Your [project ID.](https://docs.cloud.google.com/resource-manager/docs/creating-managing-projects#identifiers)
-
  `FILE_URI`: The URI or
  URL of the file to include in the prompt. Acceptable values include the
  following:

  - **Cloud Storage bucket URI:** The object must either be publicly readable or reside in the same Google Cloud project that's sending the request.
  - **HTTP URL:** The file URL must be publicly readable. You can specify one video file, one audio file, and up to 10 image files per request. Audio files, video files, and documents can't exceed 15 MB.
  - **YouTube video URL:**The YouTube video must be either owned by the account that you used to sign in to the Google Cloud console or be public. Only one YouTube video URL is supported per request.

  When specifying a `fileURI`, you must also specify the media
  type (`mimeType`) of the file. If VPC Service Controls is
  enabled, specifying a media file URL for `fileURI` is not
  supported.

  If you don't have a video file in Cloud Storage, then you can use the
  following publicly available file:
  `gs://cloud-samples-data/video/animals.mp4` with a mime type of
  `video/mp4`. To view this video,
  [open the sample MP4](https://storage.googleapis.com/cloud-samples-data/video/animals.mp4) file.
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
     "https://aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/global/publishers/google/models/gemini-3.1-flash-image:generateContent"
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
    -Uri "https://aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/global/publishers/google/models/gemini-3.1-flash-image:generateContent" | Select-Object -Expand Content
```

```

```
Note the following in the URL for this sample:

- Use the [`generateContent`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations.publishers.models/generateContent) method to request that the response is returned after it's fully generated. To reduce the perception of latency to a human audience, stream the response as it's being generated by using the [`streamGenerateContent`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations.publishers.models/streamGenerateContent) method.
- The multimodal model ID is located at the end of the URL before the method (for example, `gemini-2.5-flash`). This sample might support other models as well.
- When you use a regional API endpoint (for example, `us-central1`), the region from the endpoint URL determines where the request is processed. Any conflicting location in the resource path is ignored.

## What's next?

See the following links for more information about Gemini image
generation:

- [Edit images with
  Gemini](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/gemini-edit-images)

- [Gemini image generation best
  practices](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/gemini-image-generation-best-practices)

- [Gemini image generation and responsible AI](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/gemini-image-responsible-ai)
