> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Images

> Images endpoints

## Overview

Images endpoints

### Available Operations

* [generate](#generate) - Generate an image
* [list\_models](#list_models) - List image generation models
* [list\_model\_endpoints](#list_model_endpoints) - List endpoints for an image model

## generate

Generates an image from a text prompt via the image generation router

### Example Usage

```python theme={null}
from openrouter import OpenRouter
import os


with OpenRouter(
    http_referer="<value>",
    x_open_router_title="<value>",
    x_open_router_categories="<value>",
    api_key=os.getenv("OPENROUTER_API_KEY", ""),
) as open_router:

    res = open_router.images.generate(model="bytedance-seed/seedream-4.5", prompt="a red panda astronaut floating in space, studio lighting")

    with res as event_stream:
        for event in event_stream:
            # handle event
            print(event, flush=True)

```

### Parameters

| Parameter                  | Type                                                                                                                 | Required             | Description                                                                                                                                                                                                                                                                                                                                                                                            | Example                                                  |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------- |
| `model`                    | *str*                                                                                                                | :heavy\_check\_mark: | The image generation model to use                                                                                                                                                                                                                                                                                                                                                                      | bytedance-seed/seedream-4.5                              |
| `prompt`                   | *str*                                                                                                                | :heavy\_check\_mark: | Text description of the desired image                                                                                                                                                                                                                                                                                                                                                                  | a red panda astronaut floating in space, studio lighting |
| `http_referer`             | *Optional\[str]*                                                                                                     | :heavy\_minus\_sign: | The app identifier should be your app's URL and is used as the primary identifier for rankings.<br />This is used to track API usage per application.<br />                                                                                                                                                                                                                                            |                                                          |
| `x_open_router_title`      | *Optional\[str]*                                                                                                     | :heavy\_minus\_sign: | The app display name allows you to customize how your app appears in OpenRouter's dashboard.<br />                                                                                                                                                                                                                                                                                                     |                                                          |
| `x_open_router_categories` | *Optional\[str]*                                                                                                     | :heavy\_minus\_sign: | Comma-separated list of app categories (e.g. "cli-agent,cloud-agent"). Used for marketplace rankings.<br />                                                                                                                                                                                                                                                                                            |                                                          |
| `aspect_ratio`             | [Optional\[components.ImageGenerationRequestAspectRatio\]](../../components/imagegenerationrequestaspectratio.mdx)   | :heavy\_minus\_sign: | Normalized aspect ratio of the generated image. Providers clamp to their supported subset.                                                                                                                                                                                                                                                                                                             | 16:9                                                     |
| `background`               | [Optional\[components.ImageGenerationRequestBackground\]](../../components/imagegenerationrequestbackground.mdx)     | :heavy\_minus\_sign: | Background treatment. `transparent` requires an output\_format that supports alpha (png or webp).                                                                                                                                                                                                                                                                                                      | auto                                                     |
| `input_references`         | List\[[components.ContentPartImage](../../components/contentpartimage.mdx)]                                          | :heavy\_minus\_sign: | Reference images to guide image-to-image generation, as base64 data URLs or HTTP(S) URLs.                                                                                                                                                                                                                                                                                                              |                                                          |
| `n`                        | *Optional\[int]*                                                                                                     | :heavy\_minus\_sign: | Number of images to generate (1-10). Providers that only support single-image generation reject n > 1.                                                                                                                                                                                                                                                                                                 | 1                                                        |
| `output_compression`       | *Optional\[int]*                                                                                                     | :heavy\_minus\_sign: | Compression level (0-100) for webp/jpeg output. Ignored for png and by providers without a compression knob.                                                                                                                                                                                                                                                                                           | 100                                                      |
| `output_format`            | [Optional\[components.ImageGenerationRequestOutputFormat\]](../../components/imagegenerationrequestoutputformat.mdx) | :heavy\_minus\_sign: | Encoding of the returned image bytes. Most models produce raster formats (png, jpeg, webp). SVG is supported by vectorization models (e.g. Quiver) — the SVG markup is UTF-8 base64-encoded in `b64_json`.                                                                                                                                                                                             | png                                                      |
| `provider`                 | [Optional\[components.ImageGenerationRequestProvider\]](../../components/imagegenerationrequestprovider.mdx)         | :heavy\_minus\_sign: | Provider-specific passthrough configuration                                                                                                                                                                                                                                                                                                                                                            |                                                          |
| `quality`                  | [Optional\[components.ImageGenerationRequestQuality\]](../../components/imagegenerationrequestquality.mdx)           | :heavy\_minus\_sign: | Rendering quality. Providers without a quality knob ignore this.                                                                                                                                                                                                                                                                                                                                       | high                                                     |
| `resolution`               | [Optional\[components.ImageGenerationRequestResolution\]](../../components/imagegenerationrequestresolution.mdx)     | :heavy\_minus\_sign: | Normalized resolution tier of the generated image. Concrete pixel dimensions are derived per-provider.                                                                                                                                                                                                                                                                                                 | 2K                                                       |
| `seed`                     | *Optional\[int]*                                                                                                     | :heavy\_minus\_sign: | If specified, the generation will sample deterministically, such that repeated requests with the same seed and parameters should return the same result. Determinism is not guaranteed for all providers.                                                                                                                                                                                              |                                                          |
| `size`                     | *Optional\[str]*                                                                                                     | :heavy\_minus\_sign: | Optional. A convenience shorthand for output dimensions — pass a tier ("2K", "4K") or explicit pixels ("2048x2048") and we normalize it to the right dimensions for the chosen provider. A tier size is equivalent to setting `resolution` and combines with `aspect_ratio`. An explicit pixel size is authoritative: a mismatched `resolution` or `aspect_ratio` alongside it is rejected with a 400. | 2K                                                       |
| `stream`                   | *Optional\[bool]*                                                                                                    | :heavy\_minus\_sign: | If true, partial images are streamed as SSE events as they become available. Only supported by providers with native streaming (currently OpenAI). Non-streaming providers ignore this flag and return a buffered response.                                                                                                                                                                            |                                                          |
| `retries`                  | [Optional\[utils.RetryConfig\]](../../models/utils/retryconfig.mdx)                                                  | :heavy\_minus\_sign: | Configuration to override the default retry behavior of the client.                                                                                                                                                                                                                                                                                                                                    |                                                          |

### Response

**[operations.CreateImagesResponse](../../operations/createimagesresponse.mdx)**

### Errors

| Error Type                             | Status Code | Content Type     |
| -------------------------------------- | ----------- | ---------------- |
| errors.BadRequestResponseError         | 400         | application/json |
| errors.UnauthorizedResponseError       | 401         | application/json |
| errors.PaymentRequiredResponseError    | 402         | application/json |
| errors.ForbiddenResponseError          | 403         | application/json |
| errors.NotFoundResponseError           | 404         | application/json |
| errors.PayloadTooLargeResponseError    | 413         | application/json |
| errors.TooManyRequestsResponseError    | 429         | application/json |
| errors.InternalServerResponseError     | 500         | application/json |
| errors.BadGatewayResponseError         | 502         | application/json |
| errors.EdgeNetworkTimeoutResponseError | 524         | application/json |
| errors.ProviderOverloadedResponseError | 529         | application/json |
| errors.OpenRouterDefaultError          | 4XX, 5XX    | \*/\*            |

## list\_models

Lists every image generation model with its top-level supported-parameter superset and a URL to its full per-endpoint records.

### Example Usage

```python theme={null}
from openrouter import OpenRouter
import os


with OpenRouter(
    http_referer="<value>",
    x_open_router_title="<value>",
    x_open_router_categories="<value>",
    api_key=os.getenv("OPENROUTER_API_KEY", ""),
) as open_router:

    res = open_router.images.list_models()

    # Handle response
    print(res)

```

### Parameters

| Parameter                  | Type                                                                | Required             | Description                                                                                                                                                 |
| -------------------------- | ------------------------------------------------------------------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `http_referer`             | *Optional\[str]*                                                    | :heavy\_minus\_sign: | The app identifier should be your app's URL and is used as the primary identifier for rankings.<br />This is used to track API usage per application.<br /> |
| `x_open_router_title`      | *Optional\[str]*                                                    | :heavy\_minus\_sign: | The app display name allows you to customize how your app appears in OpenRouter's dashboard.<br />                                                          |
| `x_open_router_categories` | *Optional\[str]*                                                    | :heavy\_minus\_sign: | Comma-separated list of app categories (e.g. "cli-agent,cloud-agent"). Used for marketplace rankings.<br />                                                 |
| `retries`                  | [Optional\[utils.RetryConfig\]](../../models/utils/retryconfig.mdx) | :heavy\_minus\_sign: | Configuration to override the default retry behavior of the client.                                                                                         |

### Response

**[components.ImageModelsListResponse](../../components/imagemodelslistresponse.mdx)**

### Errors

| Error Type                         | Status Code | Content Type     |
| ---------------------------------- | ----------- | ---------------- |
| errors.InternalServerResponseError | 500         | application/json |
| errors.OpenRouterDefaultError      | 4XX, 5XX    | \*/\*            |

## list\_model\_endpoints

Returns the full per-endpoint records for an image model: each endpoint's definitive supported parameters, pricing, and passthrough allowlist.

### Example Usage

```python theme={null}
from openrouter import OpenRouter
import os


with OpenRouter(
    http_referer="<value>",
    x_open_router_title="<value>",
    x_open_router_categories="<value>",
    api_key=os.getenv("OPENROUTER_API_KEY", ""),
) as open_router:

    res = open_router.images.list_model_endpoints(author="bytedance-seed", slug="seedream-4.5")

    # Handle response
    print(res)

```

### Parameters

| Parameter                  | Type                                                                | Required             | Description                                                                                                                                                 | Example        |
| -------------------------- | ------------------------------------------------------------------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `author`                   | *str*                                                               | :heavy\_check\_mark: | Model author/organization                                                                                                                                   | bytedance-seed |
| `slug`                     | *str*                                                               | :heavy\_check\_mark: | Model slug                                                                                                                                                  | seedream-4.5   |
| `http_referer`             | *Optional\[str]*                                                    | :heavy\_minus\_sign: | The app identifier should be your app's URL and is used as the primary identifier for rankings.<br />This is used to track API usage per application.<br /> |                |
| `x_open_router_title`      | *Optional\[str]*                                                    | :heavy\_minus\_sign: | The app display name allows you to customize how your app appears in OpenRouter's dashboard.<br />                                                          |                |
| `x_open_router_categories` | *Optional\[str]*                                                    | :heavy\_minus\_sign: | Comma-separated list of app categories (e.g. "cli-agent,cloud-agent"). Used for marketplace rankings.<br />                                                 |                |
| `retries`                  | [Optional\[utils.RetryConfig\]](../../models/utils/retryconfig.mdx) | :heavy\_minus\_sign: | Configuration to override the default retry behavior of the client.                                                                                         |                |

### Response

**[components.ImageModelEndpointsResponse](../../components/imagemodelendpointsresponse.mdx)**

### Errors

| Error Type                         | Status Code | Content Type     |
| ---------------------------------- | ----------- | ---------------- |
| errors.NotFoundResponseError       | 404         | application/json |
| errors.InternalServerResponseError | 500         | application/json |
| errors.OpenRouterDefaultError      | 4XX, 5XX    | \*/\*            |
