{/* banner:start */}

<Warning>
  The Python SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/python-sdk/issues).
</Warning>

{/* banner:end */}

(*embeddings*)

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
    api_key=os.getenv("OPENROUTER_API_KEY", ""),
) as open_router:

    res = open_router.embeddings.generate(input="<value>", model="Taurus")

    # Handle response
    print(res)

```

### Parameters

| Parameter         | Type                                                                                  | Required             | Description                                                         |
| ----------------- | ------------------------------------------------------------------------------------- | -------------------- | ------------------------------------------------------------------- |
| `input`           | [operations.InputUnion](/docs/sdks/python/api-reference/operations/inputunion)        | :heavy\_check\_mark: | N/A                                                                 |
| `model`           | *str*                                                                                 | :heavy\_check\_mark: | N/A                                                                 |
| `encoding_format` | [Optional\[operations.EncodingFormat\]](../../operations/encodingformat.md)           | :heavy\_minus\_sign: | N/A                                                                 |
| `dimensions`      | *Optional\[int]*                                                                      | :heavy\_minus\_sign: | N/A                                                                 |
| `user`            | *Optional\[str]*                                                                      | :heavy\_minus\_sign: | N/A                                                                 |
| `provider`        | [Optional\[components.ProviderPreferences\]](../../components/providerpreferences.md) | :heavy\_minus\_sign: | Provider routing preferences for the request.                       |
| `input_type`      | *Optional\[str]*                                                                      | :heavy\_minus\_sign: | N/A                                                                 |
| `retries`         | [Optional\[utils.RetryConfig\]](../../models/utils/retryconfig.md)                    | :heavy\_minus\_sign: | Configuration to override the default retry behavior of the client. |

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
    api_key=os.getenv("OPENROUTER_API_KEY", ""),
) as open_router:

    res = open_router.embeddings.list_models()

    # Handle response
    print(res)

```

### Parameters

| Parameter | Type                                                               | Required             | Description                                                         |
| --------- | ------------------------------------------------------------------ | -------------------- | ------------------------------------------------------------------- |
| `retries` | [Optional\[utils.RetryConfig\]](../../models/utils/retryconfig.md) | :heavy\_minus\_sign: | Configuration to override the default retry behavior of the client. |

### Response

**[components.ModelsListResponse](/docs/sdks/python/api-reference/components/modelslistresponse)**

### Errors

| Error Type                         | Status Code | Content Type     |
| ---------------------------------- | ----------- | ---------------- |
| errors.BadRequestResponseError     | 400         | application/json |
| errors.InternalServerResponseError | 500         | application/json |
| errors.OpenRouterDefaultError      | 4XX, 5XX    | \*/\*            |
