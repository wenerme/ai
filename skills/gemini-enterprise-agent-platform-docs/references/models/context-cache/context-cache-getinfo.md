You can learn about the time a context cache was created, the time it was most
recently updated, and the time it expires. To get information about every
context cache associated with a Google Cloud project, including their cache IDs,
use the command to list context caches. If you know the cache ID of a context
cache, you can get information about just that context cache.

## Get a list of context caches

To get a list of the context caches associated with a Google Cloud project, you need
the region where you created and the ID of your Google Cloud project. The following
shows you how to get a list of context caches for a Google Cloud project.

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

    content_cache_list = client.caches.list()

    # Access individual properties of a ContentCache object(s)
    for content_cache in content_cache_list:
        print(f"Cache `{content_cache.name}` for model `{content_cache.model}`")
        print(f"Last updated at: {content_cache.update_time}")
        print(f"Expires at: {content_cache.expire_time}")

    # Example response:
    # * Cache `projects/111111111111/locations/.../cachedContents/1111111111111111111` for
    #       model `projects/111111111111/locations/.../publishers/google/models/gemini-XXX-pro-XXX`
    # * Last updated at: 2025-02-13 14:46:42.620490+00:00
    # * CachedContentUsageMetadata(audio_duration_seconds=None, image_count=167, text_count=153, total_token_count=43130, video_duration_seconds=None)
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
        "net/http"
        "time"

        "google.golang.org/genai"
    )

    // listContentCache shows how to retrieve details about cached content.
    func listContentCache(w io.Writer) error {
        ctx := context.Background()

        client, err := genai.NewClient(ctx, &genai.ClientConfig{
            HTTPOptions: genai.HTTPOptions{APIVersion: "v1"},
        })
        if err != nil {
            return fmt.Errorf("failed to create genai client: %w", err)
        }

        // Retrieve cached content metadata
        cache, err := client.Caches.List(ctx, &genai.ListCachedContentsConfig{
            HTTPOptions: &genai.HTTPOptions{
                Headers:    http.Header{"X-Custom-Header": []string{"example"}},
                APIVersion: "v1",
            },
        })
        if err != nil {
            return fmt.Errorf("failed to get content cache: %w", err)
        }

        // Print basic info about the cached content
        fmt.Fprintf(w, "Cache name: %s\n", cache.Name)
        fmt.Fprintf(w, "Display name: %s\n", cache.Items[0].DisplayName)
        fmt.Fprintf(w, "Model: %s\n", cache.Items[0].Model)
        fmt.Fprintf(w, "Create time: %s\n", cache.Items[0].CreateTime.Format(time.RFC3339))
        fmt.Fprintf(w, "Update time: %s\n", cache.Items[0].UpdateTime.Format(time.RFC3339))
        fmt.Fprintf(w, "Expire time: %s (in %s)\n", cache.Items[0].ExpireTime.Format(time.RFC3339), time.Until(cache.Items[0].ExpireTime).Round(time.Second))

        if cache.Items[0].UsageMetadata != nil {
            fmt.Fprintf(w, "Usage metadata: %+v\n", cache.Items[0].UsageMetadata)
        }

        // Example response:
        // Cache name: projects/111111111111/locations/us-central1/cachedContents/1234567890123456789
        // Display name: product_recommendations_prompt
        // Model: models/gemini-2.5-flash
        // Create time: 2025-04-08T02:15:23Z
        // Update time: 2025-04-08T03:05:11Z
        // Expire time: 2025-04-20T03:05:11Z (in 167h59m59s)
        // Usage metadata: &{AudioDurationSeconds:0 ImageCount:167 TextCount:153 TotalTokenCount:43124 VideoDurationSeconds:0}

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
    import com.google.genai.types.CachedContent;
    import com.google.genai.types.HttpOptions;
    import com.google.genai.types.ListCachedContentsConfig;

    public class ContentCacheList {

      public static void main(String[] args) {
        contentCacheList();
      }

      // Lists all cached contents
      public static void contentCacheList() {
        // Initialize client that will be used to send requests. This client only needs to be created
        // once, and can be reused for multiple requests.
        try (Client client =
            Client.builder()
                .location("global")
                .vertexAI(true)
                .httpOptions(HttpOptions.builder().apiVersion("v1").build())
                .build()) {

          for (CachedContent content : client.caches.list(ListCachedContentsConfig.builder().build())) {
            content.name().ifPresent(name -> System.out.println("Name: " + name));
            content.model().ifPresent(model -> System.out.println("Model: " + model));
            content.updateTime().ifPresent(time -> System.out.println("Last updated at: " + time));
            content.expireTime().ifPresent(time -> System.out.println("Expires at: " + time));
          }
          // Example response:
          // Name: projects/111111111111/locations/global/cachedContents/1111111111111111111
          // Model:
          // projects/111111111111/locations/global/publishers/google/models/gemini-2.5-flash
          // Last updated at: 2025-07-28T21:54:19.125825Z
          // Expires at: 2025-08-04T21:54:18.328233500Z
          // ...
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
    async function listContentCaches(
      projectId = GOOGLE_CLOUD_PROJECT,
      location = GOOGLE_CLOUD_LOCATION
    ) {
      const client = new GoogleGenAI({
        vertexai: true,
        project: projectId,
        location: location,
        httpOptions: {
          apiVersion: 'v1',
        },
      });

      const contentCacheList = await client.caches.list();

      // Access individual properties of a ContentCache object(s)
      const contentCacheNames = [];
      for (const contentCache of contentCacheList.pageInternal) {
        console.log(
          `Cache \`${contentCache.name}\` for model \`${contentCache.model}\``
        );
        console.log(`Last updated at: ${contentCache.updateTime}`);
        console.log(`Expires at: ${contentCache.expireTime}`);
        contentCacheNames.push(contentCache.name);
      }
      console.log(contentCacheNames);

      // Example response:
      //  * Cache `projects/111111111111/locations/us-central1/cachedContents/1111111111111111111` for
      //  model `projects/111111111111/locations/us-central1/publishers/google/models/gemini-XXX-pro-XXX`
      //  * Last updated at: 2025-02-13 14:46:42.620490+00:00
      //  * CachedContentUsageMetadata(audio_duration_seconds=None, image_count=167, text_count=153, total_token_count=43130, video_duration_seconds=None)
      // ...

      return contentCacheNames;
    }

### REST

The following shows how to use REST to list the context caches associated with
a Google Cloud project by sending a GET request to the publisher model endpoint.

Before using any of the request data,
make the following replacements:

- <var class="edit" scope="PROJECT_ID" translate="no">PROJECT_ID</var>: Your \[project ID\](/resource-manager/docs/creating-managing-projects#identifiers). .
- <var class="edit" scope="LOCATION" translate="no">LOCATION</var>: The region where the requests to [create the context caches](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/context-cache/context-cache-create) were processed.

HTTP method and URL:

```
GET https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/cachedContents
```

To send your request, choose one of these options:

#### curl

> [!NOTE]
> **Note:** The following command assumes that you have logged in to the `gcloud` CLI with your user account by running [`gcloud init`](https://docs.cloud.google.com/sdk/gcloud/reference/init) or [`gcloud auth login`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) , or by using [Cloud Shell](https://docs.cloud.google.com/shell/docs), which automatically logs you into the `gcloud` CLI . You can check the currently active account by running [`gcloud auth list`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/list).

Execute the following command:

```
curl -X GET \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/cachedContents"
```

#### PowerShell

> [!NOTE]
> **Note:** The following command assumes that you have logged in to the `gcloud` CLI with your user account by running [`gcloud init`](https://docs.cloud.google.com/sdk/gcloud/reference/init) or [`gcloud auth login`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) . You can check the currently active account by running [`gcloud auth list`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/list).

Execute the following command:

```
$cred = gcloud auth print-access-token
$headers = @{ "Authorization" = "Bearer $cred" }

Invoke-WebRequest `
    -Method GET `
    -Headers $headers `
    -Uri "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/cachedContents" | Select-Object -Expand Content
```

You should receive a JSON response similar to the following:

#### Response

```
{
  "cachedContents": [
    {
      "name": "projects/PROJECT_NUMBER/locations/us-central1/cachedContents/CACHE_ID_1",
      "model": "projects/PROJECT_ID/locations/us-central1/publishers/google/models/gemini-2.0-flash-001",
      "createTime": "2024-05-31T19:04:35.380412Z",
      "updateTime": "2024-05-31T19:04:35.380412Z",
      "expireTime": "2024-05-31T20:04:35.349680Z"
    },
    {
      "name": "projects/PROJECT_NUMBER/locations/us-central1/cachedContents/CACHE_ID_2",
      "model": "projects/PROJECT_ID/locations/us-central1/publishers/google/models/gemini-2.0-flash-001",
      "createTime": "2024-05-30T21:14:39.880235Z",
      "updateTime": "2024-05-31T00:21:15.350969Z",
      "expireTime": "2024-05-31T01:21:15.348014Z"
    },
    {
      "name": "projects/PROJECT_NUMBER/locations/us-central1/cachedContents/CACHE_ID_N",
      "model": "projects/PROJECT_ID/locations/us-central1/publishers/google/models/gemini-2.0-flash-001",
      "createTime": "2024-05-30T21:14:39.880235Z",
      "updateTime": "2024-05-31T00:21:15.350969Z",
      "expireTime": "2024-05-31T01:21:15.348014Z"
    }
  ]
}
```

### Example curl command

    LOCATION="us-central1"
    PROJECT_ID="PROJECT_ID"

    curl \
    -X GET \
    -H "Authorization: Bearer $(gcloud auth print-access-token)" \
    https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/cachedContents

## Get information about a context cache

To get information about one context cache, you need its cache ID, the
Google Cloud project ID with which the context cache is associated, and the region
where the request to
[create the context cache](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/context-cache/context-cache-create)
was processed. The cache ID of a context cache is returned when you create the
context cache. You can also get the cache ID of each context cache associated
with a project using the [context cache list command](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/context-cache/context-cache-getinfo#get-context-cache-list).

The following shows you how to get information about one context cache.

### Go

Before trying this sample, follow the Go setup instructions in the [Gemini Enterprise Agent Platform
quickstart.](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/client-libraries) For more information, see the [Gemini Enterprise Agent Platform
Go SDK for Gemini reference documentation](https://docs.cloud.google.com/go/docs/reference/cloud.google.com/go/vertexai/latest).

To authenticate to Gemini Enterprise Agent Platform, set up Application Default Credentials.
For more information, see [Set up ADC for a local development environment](https://docs.cloud.google.com/docs/authentication/set-up-adc-local-dev-environment).

### Streaming and non-streaming responses

You can choose whether the model generates *streaming* responses or
*non-streaming* responses. For streaming responses, you receive each response
as soon as its output token is generated. For non-streaming responses, you receive
all responses after all of the output tokens are generated.

For a streaming response, use the [`GenerateContentStream`](https://pkg.go.dev/cloud.google.com/go/vertexai/genai#GenerativeModel.GenerateContentStream) method.

```
  iter := model.GenerateContentStream(ctx, genai.Text("Tell me a story about a lumberjack and his giant ox. Keep it very short."))

```

For a non-streaming response, use the [`GenerateContent`](https://pkg.go.dev/cloud.google.com/go/vertexai/genai#GenerativeModel.GenerateContent) method.

```
  resp, err := model.GenerateContent(ctx, genai.Text("What is the average size of a swallow?"))

```

### Sample code

    import (
        "context"
        "fmt"
        "io"
        "net/http"
        "time"

        "google.golang.org/genai"
    )

    // getContentCache shows how to retrieve the metadata of a cached content
    // contentName is the ID of the cached content to retrieve
    func getContentCache(w io.Writer, contentName string) error {
        ctx := context.Background()

        client, err := genai.NewClient(ctx, &genai.ClientConfig{
            HTTPOptions: genai.HTTPOptions{APIVersion: "v1"},
        })
        if err != nil {
            return fmt.Errorf("failed to create genai client: %w", err)
        }

        cachedContent, err := client.Caches.Get(ctx, contentName, &genai.GetCachedContentConfig{
            HTTPOptions: &genai.HTTPOptions{
                Headers:    http.Header{"X-Custom-Header": []string{"example"}},
                APIVersion: "v1",
            },
        })
        if err != nil {
            return fmt.Errorf("GetCachedContent: %w", err)
        }

        // Print basic info about the cached content
        fmt.Fprintf(w, "Cache name: %s\n", cachedContent.Name)
        fmt.Fprintf(w, "Display name: %s\n", cachedContent.DisplayName)
        fmt.Fprintf(w, "Model: %s\n", cachedContent.Model)
        fmt.Fprintf(w, "Create time: %s\n", cachedContent.CreateTime.Format(time.RFC3339))
        fmt.Fprintf(w, "Update time: %s\n", cachedContent.UpdateTime.Format(time.RFC3339))
        fmt.Fprintf(w, "Expire time: %s (in %s)\n", cachedContent.ExpireTime.Format(time.RFC3339), time.Until(cachedContent.ExpireTime).Round(time.Second))

        if cachedContent.UsageMetadata != nil {
            fmt.Fprintf(w, "Usage metadata: %+v\n", cachedContent.UsageMetadata)
        }

        // Example response:
        // Cache name: projects/111111111111/locations/us-central1/cachedContents/1234567890123456789
        // Display name: product_recommendations_prompt
        // Model: models/gemini-2.5-flash
        // Create time: 2025-04-08T02:15:23Z
        // Update time: 2025-04-08T03:05:11Z
        // Expire time: 2025-04-20T03:05:11Z (in 167h59m59s)
        // Usage metadata: &{AudioDurationSeconds:0 ImageCount:167 TextCount:153 TotalTokenCount:43124 VideoDurationSeconds:0}
        return nil
    }

### REST

The following shows how to use REST to list the context caches associated with
a Google Cloud project by sending a GET request to the publisher model endpoint.

Before using any of the request data,
make the following replacements:

- <var class="edit" scope="PROJECT_ID" translate="no">PROJECT_ID</var>: .
- <var class="edit" scope="LOCATION" translate="no">LOCATION</var>: The region where the request to [create the context cache](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/context-cache/context-cache-create) was processed.
- <var class="edit" scope="CACHE_ID" translate="no">CACHE_ID</var>: The ID of the context cache. The context cache ID is returned when you create the context cache. You can also find context cache IDs by listing the context caches for a Google Cloud project using. For more information, see [create a context cache](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/context-cache/context-cache-create) and [list context caches](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/context-cache/context-cache-getinfo#get-context-cache-list).

HTTP method and URL:

```
GET https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/cachedContents/CACHE_ID
```

To send your request, choose one of these options:

#### curl

> [!NOTE]
> **Note:** The following command assumes that you have logged in to the `gcloud` CLI with your user account by running [`gcloud init`](https://docs.cloud.google.com/sdk/gcloud/reference/init) or [`gcloud auth login`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) , or by using [Cloud Shell](https://docs.cloud.google.com/shell/docs), which automatically logs you into the `gcloud` CLI . You can check the currently active account by running [`gcloud auth list`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/list).

Execute the following command:

```
curl -X GET \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/cachedContents/CACHE_ID"
```

#### PowerShell

> [!NOTE]
> **Note:** The following command assumes that you have logged in to the `gcloud` CLI with your user account by running [`gcloud init`](https://docs.cloud.google.com/sdk/gcloud/reference/init) or [`gcloud auth login`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) . You can check the currently active account by running [`gcloud auth list`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/list).

Execute the following command:

```
$cred = gcloud auth print-access-token
$headers = @{ "Authorization" = "Bearer $cred" }

Invoke-WebRequest `
    -Method GET `
    -Headers $headers `
    -Uri "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/cachedContents/CACHE_ID" | Select-Object -Expand Content
```

You should receive a JSON response similar to the following:

#### Response

```
{
  "name": "projects/PROJECT_NUMBER/locations/us-central1/cachedContents/CACHE_ID",
  "model": "projects/PROJECT_ID/locations/us-central1/publishers/google/models/gemini-2.0-flash-001",
  "createTime": "2024-05-31T19:04:35.380412Z",
  "updateTime": "2024-05-31T19:04:35.380412Z",
  "expireTime": "2024-05-31T20:04:35.349680Z"
}
```

### Example curl command

    LOCATION="us-central1"
    PROJECT_ID="PROJECT_ID"
    CACHE_ID="CACHE_ID"

    curl \
    -X GET \
    -H "Authorization: Bearer $(gcloud auth print-access-token)" \
    https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/${CACHE_ID}

## What's next

- Learn how to [use a context cache](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/context-cache/context-cache-use).
- Learn how to [update the expiration time of a context cache](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/context-cache/context-cache-update).
- Learn how to [delete a context cache](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/context-cache/context-cache-delete).
