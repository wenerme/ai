{/* banner:start */}

<Warning>
  The Python SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/python-sdk/issues).
</Warning>

{/* banner:end */}

## Overview

Text embedding endpoints

### Available Operations

* [generate](#generate) - Submit an embedding request
* [list\_models](#list_models) - List all embeddings models

## generate

Submits an embedding request to the embeddings router

### Example Usage

{/* UsageSnippet language="python" operationID="createEmbeddings" method="post" path="/embeddings" */}

```python
from openrouter import OpenRouter
import os

with OpenRouter(
    http_referer="<value>",
    x_open_router_title="<value>",
    x_open_router_categories="<value>",
    api_key=os.getenv("OPENROUTER_API_KEY", ""),
) as open_router:

    res = open_router.embeddings.generate(input="The quick brown fox jumps over the lazy dog", model="openai/text-embedding-3-small")

    # Handle response
    print(res)

```

### Parameters

| Parameter                  | Type                                                                                          | Required             | Description                                                                                                                                                 | Example                                     |
| -------------------------- | --------------------------------------------------------------------------------------------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| `input`                    | [operations.InputUnion](/docs/sdks/python/api-reference/operations/inputunion)                | :heavy\_check\_mark: | Text, token, or multimodal input(s) to embed                                                                                                                | The quick brown fox jumps over the lazy dog |
| `model`                    | *str*                                                                                         | :heavy\_check\_mark: | The model to use for embeddings                                                                                                                             | openai/text-embedding-3-small               |
| `http_referer`             | *Optional\[str]*                                                                              | :heavy\_minus\_sign: | The app identifier should be your app's URL and is used as the primary identifier for rankings.<br />This is used to track API usage per application.<br /> |                                             |
| `x_open_router_title`      | *Optional\[str]*                                                                              | :heavy\_minus\_sign: | The app display name allows you to customize how your app appears in OpenRouter's dashboard.<br />                                                          |                                             |
| `x_open_router_categories` | *Optional\[str]*                                                                              | :heavy\_minus\_sign: | Comma-separated list of app categories (e.g. "cli-agent,cloud-agent"). Used for marketplace rankings.<br />                                                 |                                             |
| `encoding_format`          | [Optional\[operations.EncodingFormat\]](../../operations/encodingformat.md)                   | :heavy\_minus\_sign: | The format of the output embeddings                                                                                                                         | float                                       |
| `dimensions`               | *Optional\[int]*                                                                              | :heavy\_minus\_sign: | The number of dimensions for the output embeddings                                                                                                          | 1536                                        |
| `user`                     | *Optional\[str]*                                                                              | :heavy\_minus\_sign: | A unique identifier for the end-user                                                                                                                        | user-1234                                   |
| `provider`                 | [OptionalNullable\[components.ProviderPreferences\]](../../components/providerpreferences.md) | :heavy\_minus\_sign: | N/A                                                                                                                                                         | `{"allow_fallbacks": true}`                 |
| `input_type`               | *Optional\[str]*                                                                              | :heavy\_minus\_sign: | The type of input (e.g. search\_query, search\_document)                                                                                                    | search\_query                               |
| `retries`                  | [Optional\[utils.RetryConfig\]](../../models/utils/retryconfig.md)                            | :heavy\_minus\_sign: | Configuration to override the default retry behavior of the client.                                                                                         |                                             |

### Response

**[operations.CreateEmbeddingsResponse](/docs/sdks/python/api-reference/operations/createembeddingsresponse)**

### Errors

| Error Type                             | Status Code | Content Type     |
| -------------------------------------- | ----------- | ---------------- |
| errors.BadRequestResponseError         | 400         | application/json |
| errors.UnauthorizedResponseError       | 401         | application/json |
| errors.PaymentRequiredResponseError    | 402         | application/json |
| errors.NotFoundResponseError           | 404         | application/json |
| errors.TooManyRequestsResponseError    | 429         | application/json |
| errors.InternalServerResponseError     | 500         | application/json |
| errors.BadGatewayResponseError         | 502         | application/json |
| errors.ServiceUnavailableResponseError | 503         | application/json |
| errors.EdgeNetworkTimeoutResponseError | 524         | application/json |
| errors.ProviderOverloadedResponseError | 529         | application/json |
| errors.OpenRouterDefaultError          | 4XX, 5XX    | \*/\*            |

## list\_models

Returns a list of all available embeddings models and their properties

### Example Usage

{/* UsageSnippet language="python" operationID="listEmbeddingsModels" method="get" path="/embeddings/models" */}

```python
from openrouter import OpenRouter
import os

with OpenRouter(
    http_referer="<value>",
    x_open_router_title="<value>",
    x_open_router_categories="<value>",
    api_key=os.getenv("OPENROUTER_API_KEY", ""),
) as open_router:

    res = open_router.embeddings.list_models()

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

**[components.ModelsListResponse](/docs/sdks/python/api-reference/components/modelslistresponse)**

### Errors

| Error Type                         | Status Code | Content Type     |
| ---------------------------------- | ----------- | ---------------- |
| errors.BadRequestResponseError     | 400         | application/json |
| errors.InternalServerResponseError | 500         | application/json |
| errors.OpenRouterDefaultError      | 4XX, 5XX    | \*/\*            |
