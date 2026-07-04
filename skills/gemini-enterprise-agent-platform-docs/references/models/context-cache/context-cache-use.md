You can use REST APIs or the Python SDK to reference content stored in a context
cache in a generative AI application. Before it can be used, you must first
[create the context cache](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/context-cache/context-cache-create).

The context cache object you use in your code includes the following properties:

- `name` - The context cache resource name. Its format is
  `projects/PROJECT_NUMBER/locations/LOCATION/cachedContents/CACHE_ID`.
  When you create a context cache, its resource name is returned in the
  response. The project number is a unique identifier for your project. The
  cache ID is an ID for your cache. When you specify a context cache in your
  code, you must use the full context cache resource name. The following is an
  example that shows how you specify a cached content resource name in a request
  body:

      "cached_content": "projects/123456789012/locations/us-central1/123456789012345678"

- `model` - The resource name for the model used to create the cache.
  Its format is
  `projects/PROJECT_NUMBER/locations/LOCATION/publishers/PUBLISHER_NAME/models/MODEL_ID`.

- `createTime` - A `Timestamp` that specifies the create time of the context
  cache.

- `updateTime` - A `Timestamp` that specifies the most recent update time of a
  context cache. After a context cache is created, and before it's updated, its
  `createTime` and `updateTime` are the same.

- `expireTime` - A `Timestamp` that specifies when a context cache expires. The
  default `expireTime` is 60 minutes after the `createTime`. You can update the
  cache with a new expiration time. For more information, see
  [Update the context cache](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/context-cache/context-cache-update).
  After a cache expires, it's marked for deletion and you shouldn't assume that
  it can be used or updated. If you need to use a context cache that expired,
  you need to recreate it with an appropriate expiration time.

## Context cache use restrictions

If the following features are specified when you create a context cache, you
shouldn't specify them again in your request:

- The `GenerativeModel.system_instructions` property. This property is used to
  specify instructions to the model before the model receives instructions from
  a user. For more information, see
  [System instructions](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/prompts/system-instructions).

- The `GenerativeModel.tool_config` property. The
  [`tool_config`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/models/function-calling) property is
  used to specify tools used by the Gemini model, such as a tool used by the
  [function calling](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/tools/function-calling) feature.

- The `GenerativeModel.tools` property. The `GenerativeModel.tools` property is
  used to specify functions to create a function calling application. For more
  information, see
  [Function calling](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/tools/function-calling).

## Use a context cache sample

The following shows how to use a context cache. When you use a context cache,
you can't specify the following properties:

- `GenerativeModel.system_instructions`
- `GenerativeModel.tool_config`
- `GenerativeModel.tools`

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
    from google.genai.types import GenerateContentConfig, HttpOptions

    client = genai.Client(http_options=HttpOptions(api_version="v1"))
    # Use content cache to generate text response
    # E.g cache_name = 'projects/.../locations/.../cachedContents/1111111111111111111'
    response = client.models.generate_content(
        model="gemini-3.5-flash",
        contents="Summarize the pdfs",
        config=GenerateContentConfig(
            cached_content=cache_name,
        ),
    )
    print(response.text)
    # Example response
    #   The Gemini family of multimodal models from Google DeepMind demonstrates remarkable capabilities across various
    #   modalities, including image, audio, video, and text....

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

    // useContentCacheWithTxt shows how to use content cache to generate text content.
    func useContentCacheWithTxt(w io.Writer, cacheName string) error {
        ctx := context.Background()

        client, err := genai.NewClient(ctx, &genai.ClientConfig{
            HTTPOptions: genai.HTTPOptions{APIVersion: "v1"},
        })
        if err != nil {
            return fmt.Errorf("failed to create genai client: %w", err)
        }

        resp, err := client.Models.GenerateContent(ctx,
            "gemini-2.5-flash",
            genai.Text("Summarize the pdfs"),
            &genai.GenerateContentConfig{
                CachedContent: cacheName,
            },
        )
        if err != nil {
            return fmt.Errorf("failed to use content cache to generate content: %w", err)
        }

        respText := resp.Text()

        fmt.Fprintln(w, respText)

        // Example response:
        // The provided research paper introduces Gemini 1.5 Pro, a multimodal model capable of recalling
        // and reasoning over information from very long contexts (up to 10 million tokens).  Key findings include:
        //
        // * **Long Context Performance:**
        // ...

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
    import com.google.genai.types.GenerateContentConfig;
    import com.google.genai.types.GenerateContentResponse;
    import com.google.genai.types.HttpOptions;

    public class ContentCacheUseWithText {

      public static void main(String[] args) {
        // TODO(developer): Replace these variables before running the sample.
        String modelId = "gemini-2.5-flash";
        // E.g cacheName = "projects/111111111111/locations/global/cachedContents/1111111111111111111"
        String cacheName = "your-cache-name";
        contentCacheUseWithText(modelId, cacheName);
      }

      // Shows how to generate text using cached content
      public static String contentCacheUseWithText(String modelId, String cacheName) {
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
                  "Summarize the pdfs",
                  GenerateContentConfig.builder().cachedContent(cacheName).build());

          System.out.println(response.text());
          // Example response
          // The Gemini family of multimodal models from Google DeepMind demonstrates remarkable
          // capabilities across various
          // modalities, including image, audio, video, and text....
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

    async function useContentCache(
      projectId = GOOGLE_CLOUD_PROJECT,
      location = GOOGLE_CLOUD_LOCATION,
      cacheName = 'example-cache'
    ) {
      const client = new GoogleGenAI({
        vertexai: true,
        project: projectId,
        location: location,
        httpOptions: {
          apiVersion: 'v1',
        },
      });

      const response = await client.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: 'Summarize the pdfs',
        config: {
          cachedContent: cacheName,
        },
      });

      console.log(response.text);

      return response.text;
    }
    // Example response
    //    The Gemini family of multimodal models from Google DeepMind demonstrates remarkable capabilities across various
    //    modalities, including image, audio, video, and text....

### REST

You can use REST to use a context cache with a prompt by using the
Agent Platform API to send a POST request to the publisher model endpoint.

Before using any of the request data,
make the following replacements:

- <var class="edit" scope="PROJECT_ID" translate="no">PROJECT_ID</var>: Your \[project ID\](/resource-manager/docs/creating-managing-projects#identifiers). .
- <var class="edit" scope="LOCATION" translate="no">LOCATION</var>: The region where the request to [create the context cache](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/context-cache/context-cache-create) was processed.
- <var class="edit" scope="PROMPT_TEXT" translate="no">PROMPT_TEXT</var>: The text prompt to submit to the model.

HTTP method and URL:

```
POST https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/publishers/google/models/gemini-2.0-flash-001:generateContent
```

Request JSON body:

```
{
  "cachedContent": "projects/PROJECT_NUMBER/locations/LOCATION/cachedContents/CACHE_ID",
  "contents": [
      {"role":"user","parts":[{"text":"PROMPT_TEXT"}]}
  ],
  "generationConfig": {
      "maxOutputTokens": 8192,
      "temperature": 1,
      "topP": 0.95,
  },
  "safetySettings": [
      {
          "category": "HARM_CATEGORY_HATE_SPEECH",
          "threshold": "BLOCK_MEDIUM_AND_ABOVE"
      },
      {
          "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
          "threshold": "BLOCK_MEDIUM_AND_ABOVE"
      },
      {
          "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          "threshold": "BLOCK_MEDIUM_AND_ABOVE"
      },
      {
          "category": "HARM_CATEGORY_HARASSMENT",
          "threshold": "BLOCK_MEDIUM_AND_ABOVE"
      }
  ],
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
     "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/publishers/google/models/gemini-2.0-flash-001:generateContent"
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
    -Uri "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/publishers/google/models/gemini-2.0-flash-001:generateContent" | Select-Object -Expand Content
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
            "text": "MODEL_RESPONSE"
          }
        ]
      },
      "finishReason": "STOP",
      "safetyRatings": [
        {
          "category": "HARM_CATEGORY_HATE_SPEECH",
          "probability": "NEGLIGIBLE",
          "probabilityScore": 0.21866937,
          "severity": "HARM_SEVERITY_NEGLIGIBLE",
          "severityScore": 0.19946389
        },
        {
          "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
          "probability": "MEDIUM",
          "probabilityScore": 0.6880493,
          "severity": "HARM_SEVERITY_MEDIUM",
          "severityScore": 0.43374163
        },
        {
          "category": "HARM_CATEGORY_HARASSMENT",
          "probability": "NEGLIGIBLE",
          "probabilityScore": 0.4442634,
          "severity": "HARM_SEVERITY_LOW",
          "severityScore": 0.37903354
        },
        {
          "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          "probability": "NEGLIGIBLE",
          "probabilityScore": 0.10502681,
          "severity": "HARM_SEVERITY_LOW",
          "severityScore": 0.28170192
        }
      ]
    }
  ],
  "usageMetadata": {
    "promptTokenCount": 55927,
    "candidatesTokenCount": 105,
    "totalTokenCount": 56032
  }
}
```

### Example curl command

    LOCATION="us-central1"
    MODEL_ID="gemini-2.5-flash"
    PROJECT_ID="test-project"

    curl -X POST \
    -H "Authorization: Bearer $(gcloud auth print-access-token)" \
    -H "Content-Type: application/json" \
    "https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/publishers/google/models/${MODEL_ID}:generateContent" -d \
    '{
      "cachedContent": "projects/${PROJECT_NUMBER}/locations/${LOCATION}/cachedContents/${CACHE_ID}",
      "contents": [
          {"role":"user","parts":[{"text":"What are the benefits of exercise?"}]}
      ],
      "generationConfig": {
          "maxOutputTokens": 8192,
          "temperature": 1,
          "topP": 0.95,
      },
      "safetySettings": [
        {
          "category": "HARM_CATEGORY_HATE_SPEECH",
          "threshold": "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
          "threshold": "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          "threshold": "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          "category": "HARM_CATEGORY_HARASSMENT",
          "threshold": "BLOCK_MEDIUM_AND_ABOVE"
        }
      ],
    }'

## What's next

- Learn how to [update the expiration time of a context cache](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/context-cache/context-cache-update).
- Learn how to [create a new context cache](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/context-cache/context-cache-create).
- Learn how to [get information about all context caches associated with a Google Cloud project](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/context-cache/context-cache-getinfo).
- Learn how to [delete a context cache](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/context-cache/context-cache-delete).
