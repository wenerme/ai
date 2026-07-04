This page shows you how to get the token count for a prompt by using the
`countTokens` API.

> [!NOTE]
> **Note:** Token counts for multimodal inputs (images, video, audio) are an estimation based on the chosen `media_resolution`. As such, the result from the `countTokens` API call may not match the final consumed tokens. The accurate usage for billing is only available after execution within the response's `usage_metadata`.

> [!IMPORTANT]
> **Important:** Instead of using the `countTokens` API, we recommend that you use the integrated tokenizer of the Agent Platform SDK for getting the token count. For details, see [List and count tokens](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/list-token).

## Supported models

The following multimodal models support getting an estimate of the prompt token
count:

#### Click to expand supported models

- [Gemini Omni Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/omni-flash-preview) preview
- [Gemini 3.1 Flash-Lite Image (Nano Banana 2 Lite)](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-flash-lite-image)
- [Gemini 3 Pro Image](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-pro-image)
- [Gemini 3.1 Flash Image](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-flash-image)
- [Gemini 3.5 Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-5-flash)
- [Gemini 3.1 Flash-Lite](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-flash-lite)
- [Gemini 3.1 Flash Image](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-flash-image) preview
- [Gemini 3.1 Pro](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-pro) preview
- [Gemini 3 Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-flash) preview
- [Gemini 3 Pro Image](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-pro-image-preview) preview
- [Gemini 2.5 Pro](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-pro)
- [Gemini 2.5 Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash) preview
- [Gemini 2.5 Flash-Lite](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash-lite) preview
- [Gemini 2.5 Flash Image](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash-image)
- [Gemini 2.5 Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash)
- [Gemini 2.5 Flash-Lite](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash-lite)

To learn more about model versions, see
[Gemini model versions and lifecycle](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/model-versions#gemini-model-versions).

## Get the token count for a prompt

You can get the token count estimate for a prompt by using the Agent Platform API.

> [!IMPORTANT]
> **Important:** The input format for `CountTokens` depends on the model you use. Each input format is the same as the `Predict` input format.

### Console

To get the token count for a prompt by using Agent Studio on Gemini Enterprise Agent Platform in the
Google Cloud console, perform the following steps:

1. In the Agent Platform section of the Google Cloud console, go to the **Agent Studio** page.

   [Go to
   Agent Studio](https://console.cloud.google.com/agent-platform/agent-platform/studio/multimodal)
2. Click either **Open Freeform** or **Open Chat**.
3. The number of tokens is calculated and displayed as you type in the **Prompt** pane. It includes the number of tokens in any input files.
4. To see more details, click **\<count\> tokens** to open the **Prompt tokenizer**.
   - To view the tokens in the text prompt that are highlighted with different colors marking the boundary of each token ID, click **Token ID to text**. Media tokens aren't supported.
   - To view the token IDs, click **Token ID** .

     To close the tokenizer tool pane, click **X**, or click outside of the pane.

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
    from google.genai.types import HttpOptions

    client = genai.Client(http_options=HttpOptions(api_version="v1"))
    response = client.models.count_tokens(
        model="gemini-3.5-flash",
        contents="What's the highest mountain in Africa?",
    )
    print(response)
    # Example output:
    # total_tokens=9
    # cached_content_token_count=None

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

    // countWithTxt shows how to count tokens with text input.
    func countWithTxt(w io.Writer) error {
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
                {Text: "What's the highest mountain in Africa?"},
            }},
        }

        resp, err := client.Models.CountTokens(ctx, modelName, contents, nil)
        if err != nil {
            return fmt.Errorf("failed to generate content: %w", err)
        }

        fmt.Fprintf(w, "Total: %d\nCached: %d\n", resp.TotalTokens, resp.CachedContentTokenCount)

        // Example response:
        // Total: 9
        // Cached: 0

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

    async function countTokens(
      projectId = GOOGLE_CLOUD_PROJECT,
      location = GOOGLE_CLOUD_LOCATION
    ) {
      const client = new GoogleGenAI({
        vertexai: true,
        project: projectId,
        location: location,
      });

      const response = await client.models.countTokens({
        model: 'gemini-2.5-flash',
        contents: 'What is the highest mountain in Africa?',
      });

      console.log(response);

      return response.totalTokens;
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
    import com.google.genai.types.CountTokensResponse;
    import com.google.genai.types.HttpOptions;
    import java.util.Optional;

    public class CountTokensWithText {

      public static void main(String[] args) {
        // TODO(developer): Replace these variables before running the sample.
        String modelId = "gemini-2.5-flash";
        countTokens(modelId);
      }

      // Counts tokens with text input
      public static Optional<Integer> countTokens(String modelId) {
        // Initialize client that will be used to send requests. This client only needs to be created
        // once, and can be reused for multiple requests.
        try (Client client =
            Client.builder()
                .location("global")
                .vertexAI(true)
                .httpOptions(HttpOptions.builder().apiVersion("v1").build())
                .build()) {

          CountTokensResponse response =
              client.models.countTokens(modelId, "What's the highest mountain in Africa?", null);

          System.out.print(response);
          // Example response:
          // CountTokensResponse{totalTokens=Optional[9], cachedContentTokenCount=Optional.empty}
          return response.totalTokens();
        }
      }
    }

### REST

To get the token count for a prompt by
using the Agent Platform API, send a POST request to the publisher model endpoint.

Before using any of the request data,
make the following replacements:

- <var class="edit" scope="LOCATION" translate="no">LOCATION</var>: The region to process the request. Available options include the following: **Click to expand a partial list of available regions**
  - `us-central1`
  - `us-west4`
  - `northamerica-northeast1`
  - `us-east4`
  - `us-west1`
  - `asia-northeast3`
  - `asia-southeast1`
  - `asia-northeast1`
- <var class="edit" scope="PROJECT_ID" translate="no">PROJECT_ID</var>: Your [project ID](https://docs.cloud.google.com/resource-manager/docs/creating-managing-projects#identifiers).
- <var class="edit" scope="MODEL_ID" translate="no">MODEL_ID</var>: The model ID of the multimodal model that you want to use.
- <var class="edit" scope="ROLE" translate="no">ROLE</var>: The role in a conversation associated with the content. Specifying a role is required even in singleturn use cases. Acceptable values include the following:
  - `USER`: Specifies content that's sent by you.
- <var class="edit" scope="TEXT" translate="no">TEXT</var>: The text instructions to include in the prompt.

HTTP method and URL:

```
POST https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/publishers/google/models/MODEL_ID:countTokens
```

Request JSON body:

```
{
  "contents": [{
    "role": "ROLE",
    "parts": [{
      "text": "TEXT"
    }]
  }]
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
     "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/publishers/google/models/MODEL_ID:countTokens"
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
    -Uri "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/publishers/google/models/MODEL_ID:countTokens" | Select-Object -Expand Content
```

You should receive a JSON response similar to the following.

#### Response

```
{
  "totalTokens": 31,
  "totalBillableCharacters": 96,
  "promptTokensDetails": [
    {
      "modality": "TEXT",
      "tokenCount": 31
    }
  ]
}
```

#### Example for text with image or video:

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

    contents = [
        Part.from_uri(
            file_uri="gs://cloud-samples-data/generative-ai/video/pixel8.mp4",
            mime_type="video/mp4",
        ),
        "Provide a description of the video.",
    ]

    response = client.models.count_tokens(
        model="gemini-3.5-flash",
        contents=contents,
    )
    print(response)
    # Example output:
    # total_tokens=16252 cached_content_token_count=None

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

    // countWithTxtAndVid shows how to count tokens with text and video inputs.
    func countWithTxtAndVid(w io.Writer) error {
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
                {Text: "Provide a description of the video."},
                {FileData: &genai.FileData{
                    FileURI:  "gs://cloud-samples-data/generative-ai/video/pixel8.mp4",
                    MIMEType: "video/mp4",
                }},
            },
                Role: genai.RoleUser},
        }

        resp, err := client.Models.CountTokens(ctx, modelName, contents, nil)
        if err != nil {
            return fmt.Errorf("failed to generate content: %w", err)
        }

        fmt.Fprintf(w, "Total: %d\nCached: %d\n", resp.TotalTokens, resp.CachedContentTokenCount)

        // Example response:
        // Total: 16252
        // Cached: 0

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

    async function countTokens(
      projectId = GOOGLE_CLOUD_PROJECT,
      location = GOOGLE_CLOUD_LOCATION
    ) {
      const client = new GoogleGenAI({
        vertexai: true,
        project: projectId,
        location: location,
      });

      const video = {
        fileData: {
          fileUri: 'gs://cloud-samples-data/generative-ai/video/pixel8.mp4',
          mimeType: 'video/mp4',
        },
      };

      const response = await client.models.countTokens({
        model: 'gemini-2.5-flash',
        contents: [video, 'Provide a description of the video.'],
      });

      console.log(response);

      return response.totalTokens;
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
    import com.google.genai.types.CountTokensResponse;
    import com.google.genai.types.HttpOptions;
    import com.google.genai.types.Part;
    import java.util.List;
    import java.util.Optional;

    public class CountTokensWithTextAndVideo {

      public static void main(String[] args) {
        // TODO(developer): Replace these variables before running the sample.
        String modelId = "gemini-2.5-flash";
        countTokens(modelId);
      }

      // Counts tokens with text and video inputs
      public static Optional<Integer> countTokens(String modelId) {
        // Initialize client that will be used to send requests. This client only needs to be created
        // once, and can be reused for multiple requests.
        try (Client client =
            Client.builder()
                .location("global")
                .vertexAI(true)
                .httpOptions(HttpOptions.builder().apiVersion("v1").build())
                .build()) {

          Content content =
              Content.fromParts(
                  Part.fromText("Provide a description of this video"),
                  Part.fromUri("gs://cloud-samples-data/generative-ai/video/pixel8.mp4", "video/mp4"));

          CountTokensResponse response = client.models.countTokens(modelId, List.of(content), null);

          System.out.print(response);
          // Example response:
          // CountTokensResponse{totalTokens=Optional[16707], cachedContentTokenCount=Optional.empty}
          return response.totalTokens();
        }
      }
    }

### REST

To get the token count for a prompt by
using the Agent Platform API, send a POST request to the publisher model endpoint.

```bash
MODEL_ID="gemini-3.5-flash"
PROJECT_ID="my-project"
TEXT="Provide a summary with about two sentences for the following article."
REGION="us-central1"

curl \
-X POST \
-H "Authorization: Bearer $(gcloud auth print-access-token)" \
-H "Content-Type: application/json" \
https://${REGION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${REGION}/publishers/google/models/${MODEL_ID}:countTokens -d \
$'{
    "contents": [{
      "role": "user",
      "parts": [
        {
          "file_data": {
            "file_uri": "gs://cloud-samples-data/generative-ai/video/pixel8.mp4",
            "mime_type": "video/mp4"
          }
        },
        {
          "text": "'"$TEXT"'"
        }]
    }]
 }'
```

## Pricing and quota

There is no charge or quota restriction for using the `CountTokens` API. The
maximum quota for the `CountTokens` API is 3000 requests per minute.

## What's next

- Learn how to use Agent Platform SDK to [list and count
  tokens](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/list-token) ([Preview](https://cloud.google.com/products#product-launch-stages))
- Learn about sending chat prompts and [text
  generation](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/send-chat-prompts-gemini)
