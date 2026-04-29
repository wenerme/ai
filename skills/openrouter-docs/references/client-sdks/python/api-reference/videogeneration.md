> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For full documentation content, see https://openrouter.ai/docs/llms-full.txt.

# VideoGeneration - Python SDK

{/* banner:start */}

<Warning>
  The Python SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/python-sdk/issues).
</Warning>

{/* banner:end */}

## Overview

Video Generation endpoints

### Available Operations

* [generate](#generate) - Submit a video generation request
* [get\_generation](#get_generation) - Poll video generation status
* [get\_video\_content](#get_video_content) - Download generated video content
* [list\_videos\_models](#list_videos_models) - List all video generation models

## generate

Submits a video generation request and returns a polling URL to check status

### Example Usage

{/* UsageSnippet language="python" operationID="createVideos" method="post" path="/videos" */}

```python
from openrouter import OpenRouter
import os

with OpenRouter(
    http_referer="<value>",
    x_open_router_title="<value>",
    x_open_router_categories="<value>",
    api_key=os.getenv("OPENROUTER_API_KEY", ""),
) as open_router:

    res = open_router.video_generation.generate(model="google/veo-3.1", prompt="A serene mountain landscape at sunset", aspect_ratio="16:9", duration=8, resolution="720p")

    # Handle response
    print(res)

```

### Parameters

| Parameter                  | Type                                                                                                        | Required             | Description                                                                                                                                                                                               | Example                                                    |
| -------------------------- | ----------------------------------------------------------------------------------------------------------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| `model`                    | *str*                                                                                                       | :heavy\_check\_mark: | N/A                                                                                                                                                                                                       |                                                            |
| `prompt`                   | *str*                                                                                                       | :heavy\_check\_mark: | N/A                                                                                                                                                                                                       |                                                            |
| `http_referer`             | *Optional\[str]*                                                                                            | :heavy\_minus\_sign: | The app identifier should be your app's URL and is used as the primary identifier for rankings.<br />This is used to track API usage per application.<br />                                               |                                                            |
| `x_open_router_title`      | *Optional\[str]*                                                                                            | :heavy\_minus\_sign: | The app display name allows you to customize how your app appears in OpenRouter's dashboard.<br />                                                                                                        |                                                            |
| `x_open_router_categories` | *Optional\[str]*                                                                                            | :heavy\_minus\_sign: | Comma-separated list of app categories (e.g. "cli-agent,cloud-agent"). Used for marketplace rankings.<br />                                                                                               |                                                            |
| `aspect_ratio`             | [Optional\[components.AspectRatio\]](../../components/aspectratio.md)                                       | :heavy\_minus\_sign: | Aspect ratio of the generated video                                                                                                                                                                       | 16:9                                                       |
| `callback_url`             | *Optional\[str]*                                                                                            | :heavy\_minus\_sign: | URL to receive a webhook notification when the video generation job completes. Overrides the workspace-level default callback URL if set. Must be HTTPS.                                                  | [https://example.com/webhook](https://example.com/webhook) |
| `duration`                 | *Optional\[int]*                                                                                            | :heavy\_minus\_sign: | Duration of the generated video in seconds                                                                                                                                                                | 8                                                          |
| `frame_images`             | List\[[components.FrameImage](/docs/sdks/python/api-reference/components/frameimage)]                       | :heavy\_minus\_sign: | Images to use as the first and/or last frame of the generated video. Each image must specify a frame\_type of first\_frame or last\_frame.                                                                |                                                            |
| `generate_audio`           | *Optional\[bool]*                                                                                           | :heavy\_minus\_sign: | Whether to generate audio alongside the video. Defaults to the endpoint's generate\_audio capability flag, false if not set.                                                                              | true                                                       |
| `input_references`         | List\[[components.ContentPartImage](/docs/sdks/python/api-reference/components/contentpartimage)]           | :heavy\_minus\_sign: | Reference images to guide video generation                                                                                                                                                                |                                                            |
| `provider`                 | [Optional\[components.VideoGenerationRequestProvider\]](../../components/videogenerationrequestprovider.md) | :heavy\_minus\_sign: | Provider-specific passthrough configuration                                                                                                                                                               |                                                            |
| `resolution`               | [Optional\[components.Resolution\]](../../components/resolution.md)                                         | :heavy\_minus\_sign: | Resolution of the generated video                                                                                                                                                                         | 720p                                                       |
| `seed`                     | *Optional\[int]*                                                                                            | :heavy\_minus\_sign: | If specified, the generation will sample deterministically, such that repeated requests with the same seed and parameters should return the same result. Determinism is not guaranteed for all providers. |                                                            |
| `size`                     | *Optional\[str]*                                                                                            | :heavy\_minus\_sign: | Exact pixel dimensions of the generated video in "WIDTHxHEIGHT" format (e.g. "1280x720"). Interchangeable with resolution + aspect\_ratio.                                                                | 1280x720                                                   |
| `retries`                  | [Optional\[utils.RetryConfig\]](../../models/utils/retryconfig.md)                                          | :heavy\_minus\_sign: | Configuration to override the default retry behavior of the client.                                                                                                                                       |                                                            |

### Response

**[components.VideoGenerationResponse](/docs/sdks/python/api-reference/components/videogenerationresponse)**

### Errors

| Error Type                          | Status Code | Content Type     |
| ----------------------------------- | ----------- | ---------------- |
| errors.BadRequestResponseError      | 400         | application/json |
| errors.UnauthorizedResponseError    | 401         | application/json |
| errors.PaymentRequiredResponseError | 402         | application/json |
| errors.NotFoundResponseError        | 404         | application/json |
| errors.TooManyRequestsResponseError | 429         | application/json |
| errors.InternalServerResponseError  | 500         | application/json |
| errors.OpenRouterDefaultError       | 4XX, 5XX    | \*/\*            |

## get\_generation

Returns job status and content URLs when completed

### Example Usage

{/* UsageSnippet language="python" operationID="getVideos" method="get" path="/videos/{jobId}" */}

```python
from openrouter import OpenRouter
import os

with OpenRouter(
    http_referer="<value>",
    x_open_router_title="<value>",
    x_open_router_categories="<value>",
    api_key=os.getenv("OPENROUTER_API_KEY", ""),
) as open_router:

    res = open_router.video_generation.get_generation(job_id="job-abc123")

    # Handle response
    print(res)

```

### Parameters

| Parameter                  | Type                                                               | Required             | Description                                                                                                                                                 | Example    |
| -------------------------- | ------------------------------------------------------------------ | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `job_id`                   | *str*                                                              | :heavy\_check\_mark: | N/A                                                                                                                                                         | job-abc123 |
| `http_referer`             | *Optional\[str]*                                                   | :heavy\_minus\_sign: | The app identifier should be your app's URL and is used as the primary identifier for rankings.<br />This is used to track API usage per application.<br /> |            |
| `x_open_router_title`      | *Optional\[str]*                                                   | :heavy\_minus\_sign: | The app display name allows you to customize how your app appears in OpenRouter's dashboard.<br />                                                          |            |
| `x_open_router_categories` | *Optional\[str]*                                                   | :heavy\_minus\_sign: | Comma-separated list of app categories (e.g. "cli-agent,cloud-agent"). Used for marketplace rankings.<br />                                                 |            |
| `retries`                  | [Optional\[utils.RetryConfig\]](../../models/utils/retryconfig.md) | :heavy\_minus\_sign: | Configuration to override the default retry behavior of the client.                                                                                         |            |

### Response

**[components.VideoGenerationResponse](/docs/sdks/python/api-reference/components/videogenerationresponse)**

### Errors

| Error Type                         | Status Code | Content Type     |
| ---------------------------------- | ----------- | ---------------- |
| errors.UnauthorizedResponseError   | 401         | application/json |
| errors.NotFoundResponseError       | 404         | application/json |
| errors.InternalServerResponseError | 500         | application/json |
| errors.OpenRouterDefaultError      | 4XX, 5XX    | \*/\*            |

## get\_video\_content

Streams the generated video content from the upstream provider

### Example Usage

{/* UsageSnippet language="python" operationID="listVideosContent" method="get" path="/videos/{jobId}/content" */}

```python
from openrouter import OpenRouter
import os

with OpenRouter(
    http_referer="<value>",
    x_open_router_title="<value>",
    x_open_router_categories="<value>",
    api_key=os.getenv("OPENROUTER_API_KEY", ""),
) as open_router:

    res = open_router.video_generation.get_video_content(job_id="job-abc123", index=0)

    # Handle response
    print(res)

```

### Parameters

| Parameter                  | Type                                                               | Required             | Description                                                                                                                                                 | Example    |
| -------------------------- | ------------------------------------------------------------------ | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `job_id`                   | *str*                                                              | :heavy\_check\_mark: | N/A                                                                                                                                                         | job-abc123 |
| `http_referer`             | *Optional\[str]*                                                   | :heavy\_minus\_sign: | The app identifier should be your app's URL and is used as the primary identifier for rankings.<br />This is used to track API usage per application.<br /> |            |
| `x_open_router_title`      | *Optional\[str]*                                                   | :heavy\_minus\_sign: | The app display name allows you to customize how your app appears in OpenRouter's dashboard.<br />                                                          |            |
| `x_open_router_categories` | *Optional\[str]*                                                   | :heavy\_minus\_sign: | Comma-separated list of app categories (e.g. "cli-agent,cloud-agent"). Used for marketplace rankings.<br />                                                 |            |
| `index`                    | *OptionalNullable\[int]*                                           | :heavy\_minus\_sign: | N/A                                                                                                                                                         | 0          |
| `retries`                  | [Optional\[utils.RetryConfig\]](../../models/utils/retryconfig.md) | :heavy\_minus\_sign: | Configuration to override the default retry behavior of the client.                                                                                         |            |

### Response

**[httpx.Response](/docs/sdks/python/api-reference/models)**

### Errors

| Error Type                         | Status Code | Content Type     |
| ---------------------------------- | ----------- | ---------------- |
| errors.BadRequestResponseError     | 400         | application/json |
| errors.UnauthorizedResponseError   | 401         | application/json |
| errors.NotFoundResponseError       | 404         | application/json |
| errors.InternalServerResponseError | 500         | application/json |
| errors.BadGatewayResponseError     | 502         | application/json |
| errors.OpenRouterDefaultError      | 4XX, 5XX    | \*/\*            |

## list\_videos\_models

Returns a list of all available video generation models and their properties

### Example Usage

{/* UsageSnippet language="python" operationID="listVideosModels" method="get" path="/videos/models" */}

```python
from openrouter import OpenRouter
import os

with OpenRouter(
    http_referer="<value>",
    x_open_router_title="<value>",
    x_open_router_categories="<value>",
    api_key=os.getenv("OPENROUTER_API_KEY", ""),
) as open_router:

    res = open_router.video_generation.list_videos_models()

    # Handle response
    print(res)

```

### Parameters

| Parameter                  | Type                                                               | Required             | Description                                                                                                                                                 |
| -------------------------- | ------------------------------------------------------------------ | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `http_referer`             | *Optional\[str]*                                                   | :heavy\_minus\_sign: | The app identifier should be your app's URL and is used as the primary identifier for rankings.<br />This is used to track API usage per application.<br /> |
| `x_open_router_title`      | *Optional\[str]*                                                   | :heavy\_minus\_sign: | The app display name allows you to customize how your app appears in OpenRouter's dashboard.<br />                                                          |
| `x_open_router_categories` | *Optional\[str]*                                                   | :heavy\_minus\_sign: | Comma-separated list of app categories (e.g. "cli-agent,cloud-agent"). Used for marketplace rankings.<br />                                                 |
| `retries`                  | [Optional\[utils.RetryConfig\]](../../models/utils/retryconfig.md) | :heavy\_minus\_sign: | Configuration to override the default retry behavior of the client.                                                                                         |

### Response

**[components.VideoModelsListResponse](/docs/sdks/python/api-reference/components/videomodelslistresponse)**

### Errors

| Error Type                         | Status Code | Content Type     |
| ---------------------------------- | ----------- | ---------------- |
| errors.BadRequestResponseError     | 400         | application/json |
| errors.InternalServerResponseError | 500         | application/json |
| errors.OpenRouterDefaultError      | 4XX, 5XX    | \*/\*            |