You can update when a context cache expires. The default expiration time of a
context cache is 60 minutes after its creation time. An expired context cache is
deleted during a garbage collection process and can't be used or updated. To
update the time when an unexpired context cache expires, update one of its
following properties:

- `ttl` - The number of seconds and nanoseconds that the cache lives after it's
  created or after the `ttl` is updated before it expires. When you set the
  `ttl`, the `expireTime` of the cache is updated.

- `expire_time` - A `Timestamp` that specifies the absolute date and time when
  the context cache expires.

## Update the context cache using its `ttl` parameter

The following is an example of a curl command that updates its expiration time
by 3,600 seconds.

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

    from datetime import datetime as dt
    from datetime import timezone as tz
    from datetime import timedelta

    from google import genai
    from google.genai.types import HttpOptions, UpdateCachedContentConfig

    client = genai.Client(http_options=HttpOptions(api_version="v1"))

    # Get content cache by name
    # cache_name = "projects/.../locations/.../cachedContents/1111111111111111111"
    content_cache = client.caches.get(name=cache_name)
    print("Expire time", content_cache.expire_time)
    # Example response
    #   Expire time 2025-02-20 15:50:18.434482+00:00

    # Update expire time using TTL
    content_cache = client.caches.update(
        name=cache_name, config=UpdateCachedContentConfig(ttl="36000s")
    )
    time_diff = content_cache.expire_time - dt.now(tz.utc)
    print("Expire time(after update):", content_cache.expire_time)
    print("Expire time(in seconds):", time_diff.seconds)
    # Example response
    #   Expire time(after update): 2025-02-14 01:51:42.571696+00:00
    #   Expire time(in seconds): 35999

    # Update expire time using specific time stamp
    next_week_utc = dt.now(tz.utc) + timedelta(days=7)
    content_cache = client.caches.update(
        name=cache_name, config=UpdateCachedContentConfig(expireTime=next_week_utc)
    )
    print("Expire time(after update):", content_cache.expire_time)
    # Example response
    #   Expire time(after update): 2025-02-20 15:51:42.614968+00:00

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
        "time"

        genai "google.golang.org/genai"
    )

    // updateContentCache shows how to update content cache expiration time.
    func updateContentCache(w io.Writer, cacheName string) error {
        ctx := context.Background()

        client, err := genai.NewClient(ctx, &genai.ClientConfig{
            HTTPOptions: genai.HTTPOptions{APIVersion: "v1"},
        })
        if err != nil {
            return fmt.Errorf("failed to create genai client: %w", err)
        }

        // Update expire time using TTL
        resp, err := client.Caches.Update(ctx, cacheName, &genai.UpdateCachedContentConfig{
            TTL: time.Duration(time.Duration.Seconds(36000)),
        })
        if err != nil {
            return fmt.Errorf("failed to update content cache exp. time with TTL: %w", err)
        }

        fmt.Fprintf(w, "Cache expires in: %s\n", time.Until(resp.ExpireTime))
        // Example response:
        // Cache expires in: 10h0m0.005875s

        // Update expire time using specific time stamp
        inSevenDays := time.Now().Add(7 * 24 * time.Hour)
        resp, err = client.Caches.Update(ctx, cacheName, &genai.UpdateCachedContentConfig{
            ExpireTime: inSevenDays,
        })
        if err != nil {
            return fmt.Errorf("failed to update content cache expire time: %w", err)
        }

        fmt.Fprintf(w, "Cache expires in: %s\n", time.Until(resp.ExpireTime))
        // Example response:
        // Cache expires in: 167h59m59.80327s

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
    import com.google.genai.types.UpdateCachedContentConfig;
    import java.time.Duration;
    import java.time.Instant;
    import java.time.temporal.ChronoUnit;

    public class ContentCacheUpdate {

      public static void main(String[] args) {
        // TODO(developer): Replace these variables before running the sample.
        // E.g cacheName = "projects/111111111111/locations/global/cachedContents/1111111111111111111"
        String cacheName = "your-cache-name";
        contentCacheUpdate(cacheName);
      }

      // Updates the cache using the specified cache resource name
      public static void contentCacheUpdate(String cacheName) {

        // Initialize client that will be used to send requests. This client only needs to be created
        // once, and can be reused for multiple requests.
        try (Client client =
            Client.builder()
                .location("global")
                .vertexAI(true)
                .httpOptions(HttpOptions.builder().apiVersion("v1").build())
                .build()) {

          // Get info of the cached content
          CachedContent cachedContent = client.caches.get(cacheName, null);

          cachedContent.expireTime()
              .ifPresent(expireTime -> System.out.println("Expire time: " + expireTime));
          // Example response
          // Expire time: 2025-07-29T23:39:49.227291Z

          // Update expire time using TTL
          CachedContent updatedCachedContent =
              client.caches.update(
                  cacheName,
                  UpdateCachedContentConfig.builder().ttl(Duration.ofSeconds(36000)).build());

          updatedCachedContent.expireTime()
              .ifPresent(expireTime -> System.out.println("Expire time after update: " + expireTime));
          // Example response
          // Expire time after update: 2025-07-30T08:40:33.537205Z

          // Update expire time using specific time stamp
          Instant nextWeek = Instant.now().plus(7, ChronoUnit.DAYS);
          updatedCachedContent =
              client.caches.update(
                  cacheName, UpdateCachedContentConfig.builder().expireTime(nextWeek).build());

          updatedCachedContent
              .expireTime()
              .ifPresent(expireTime -> System.out.println("Expire time after update: " + expireTime));
          // Example response
          // Expire time after update: 2025-08-05T22:40:33.713988900Z

          System.out.println("Updated cache: " + cacheName);
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
    const {DateTime} = require('luxon');

    const GOOGLE_CLOUD_PROJECT = process.env.GOOGLE_CLOUD_PROJECT;
    const GOOGLE_CLOUD_LOCATION = process.env.GOOGLE_CLOUD_LOCATION || 'global';

    async function updateContentCache(
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

      let contentCache = await client.caches.get({
        name: cacheName,
      });

      console.log('Expire time', contentCache.expireTime);

      contentCache = await client.caches.update({
        name: cacheName,
        config: {
          ttl: '36000s',
        },
      });

      const expireTime = DateTime.fromISO(contentCache.expireTime, {zone: 'utc'});
      const now = DateTime.utc();
      const timeDiff = expireTime.diff(now, ['seconds']);

      console.log('Expire time (after update):', expireTime.toISO());
      console.log('Expire time (in seconds):', Math.floor(timeDiff.seconds));

      const nextWeekUtc = DateTime.utc().plus({days: 7});
      console.log('Next week (UTC):', nextWeekUtc.toISO());

      contentCache = await client.caches.update({
        name: cacheName,
        config: {
          expireTime: nextWeekUtc,
        },
      });

      console.log('Expire time (after update):', contentCache.expireTime);
      return contentCache;
    }
    // Example response
    //    Expire time(after update): 2025-02-20 15:51:42.614968+00:00

### REST

You can use REST to update the context cache by using the
Agent Platform API to send a PATCH request to the publisher model endpoint. The
following example shows how to update the expiration date using the
`ttl` parameter.

Before using any of the request data,
make the following replacements:

- <var class="edit" scope="PROJECT_ID" translate="no">PROJECT_ID</var>: Your \[project ID\](/resource-manager/docs/creating-managing-projects#identifiers). .
- <var class="edit" scope="LOCATION" translate="no">LOCATION</var>: The region where the request to [create the context cache](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/context-cache/context-cache-create) was processed.
- <var class="edit" scope="CACHE_ID" translate="no">CACHE_ID</var>: The ID of the context cache. The context cache ID is returned when you create the context cache. You can also find context cache IDs by listing the context caches for a Google Cloud project using. For more information, see [create a context cache](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/context-cache/context-cache-create) and [list context caches](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/context-cache/context-cache-getinfo#get-context-cache-list).
- <var class="edit" scope="SECONDS" translate="no">SECONDS</var>: A `float` that specifies the seconds component of the duration before the cache expires.
- <var class="edit" scope="NANOSECONDS" translate="no">NANOSECONDS</var>: A `float` that specifies the nanoseconds component of the duration before the cache expires.

HTTP method and URL:

```
PATCH https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/cachedContents/CACHE_ID
```

Request JSON body:

```
{
  "seconds":"SECONDS",
  "nanos":"NANOSECONDS"
}
```

To send your request, choose one of these options:

#### curl

> [!NOTE]
> **Note:** The following command assumes that you have logged in to the `gcloud` CLI with your user account by running [`gcloud init`](https://docs.cloud.google.com/sdk/gcloud/reference/init) or [`gcloud auth login`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) , or by using [Cloud Shell](https://docs.cloud.google.com/shell/docs), which automatically logs you into the `gcloud` CLI . You can check the currently active account by running [`gcloud auth list`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/list).

Save the request body in a file named `request.json`,
and execute the following command:

```
curl -X PATCH \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d @request.json \
     "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/cachedContents/CACHE_ID"
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
    -Method PATCH `
    -Headers $headers `
    -ContentType: "application/json; charset=utf-8" `
    -InFile request.json `
    -Uri "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/cachedContents/CACHE_ID" | Select-Object -Expand Content
```

You should receive a JSON response similar to the following:

#### Response

```
{
  "name": "projects/PROJECT_NUMBER/locations/us-central1/cachedContents/CACHE_ID",
  "model": "projects/PROJECT_ID/locations/us-central1/publishers/google/models/gemini-2.0-flash-001",
  "createTime": "2024-05-30T21:14:39.880235Z",
  "updateTime": "2024-05-31T00:21:15.350969Z",
  "expireTime": "2024-05-31T01:21:15.348014Z"
}
```

### Example curl command

    PROJECT_ID="PROJECT_ID"
    LOCATION="us-central1"
    CACHE_ID="CACHE_ID"

    curl \
    -X PATCH \
    -H "Authorization: Bearer $(gcloud auth print-access-token)" \
    -H "Content-Type: application/json"\
    "https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/cachedContents/${CACHE_ID}" -d \
    '{
       "ttl": {"seconds":"3600","nanos":"0"}
    }'

## Update the context cache using its `expire_time` parameter

The following is an example of a curl command that uses the `expire_time`
parameter to update its expiration time to 9 AM on June 30, 2024.

### REST

You can use REST to update the context cache by using the
Agent Platform API to send a PATCH request to the publisher model endpoint. The
following example shows how to update the expiration date using the
`expire_time` parameter.

Before using any of the request data,
make the following replacements:

- <var class="edit" scope="PROJECT_ID" translate="no">PROJECT_ID</var>: .
- <var class="edit" scope="LOCATION" translate="no">LOCATION</var>: The region where the request to [create the context cache](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/context-cache/context-cache-create) was processed.
- <var class="edit" scope="CACHE_ID" translate="no">CACHE_ID</var>: The ID of the context cache. You can find the ID in the response when you [create the context cache](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/context-cache/context-cache-create).
- <var class="edit" scope="EXPIRE_TIME" translate="no">EXPIRE_TIME</var>: A `Timestamp` that specifies the time when the context cache expires.

HTTP method and URL:

```
PATCH https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/cachedContents/CACHE_ID
```

Request JSON body:

```
{
   "expire_time":"EXPIRE_TIME"
}
```

To send your request, choose one of these options:

#### curl

> [!NOTE]
> **Note:** The following command assumes that you have logged in to the `gcloud` CLI with your user account by running [`gcloud init`](https://docs.cloud.google.com/sdk/gcloud/reference/init) or [`gcloud auth login`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) , or by using [Cloud Shell](https://docs.cloud.google.com/shell/docs), which automatically logs you into the `gcloud` CLI . You can check the currently active account by running [`gcloud auth list`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/list).

Save the request body in a file named `request.json`,
and execute the following command:

```
curl -X PATCH \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d @request.json \
     "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/cachedContents/CACHE_ID"
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
    -Method PATCH `
    -Headers $headers `
    -ContentType: "application/json; charset=utf-8" `
    -InFile request.json `
    -Uri "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/cachedContents/CACHE_ID" | Select-Object -Expand Content
```

You should receive a JSON response similar to the following:

#### Response

```
{
  "name": "projects/PROJECT_NUMBER/locations/us-central1/cachedContents/CACHE_ID",
  "model": "projects/PROJECT_ID/locations/us-central1/publishers/google/models/gemini-2.0-flash-001",
  "createTime": "2024-05-30T21:14:39.880235Z",
  "updateTime": "2024-05-31T00:20:24.296585Z",
  "expireTime": "2024-06-30T09:00:00Z"
}
```

### Example curl command

    PROJECT_ID="PROJECT_ID"
    LOCATION="us-central1"
    CACHE_ID="CACHE_ID"

    curl \
    -X PATCH \
    -H "Authorization: Bearer $(gcloud auth print-access-token)" \
    -H "Content-Type: application/json"\
    "https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/cachedContents/${CACHE_ID}" -d \
    '{
       "expire_time":"2024-06-30T09:00:00.000000Z"
    }'

## What's next

- Learn how to [use a context cache](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/context-cache/context-cache-use).
- Learn how to [get information about all context caches associated with a Google Cloud project](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/context-cache/context-cache-getinfo).
