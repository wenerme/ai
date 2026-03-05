{/* banner:start */}

<Warning>
  The Python SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/python-sdk/issues).
</Warning>

{/* banner:end */}

(*models*)

## Overview

Model information endpoints

### Available Operations

* [count](#count) - Get total count of available models
* [list](#list) - List all models and their properties
* [list\_for\_user](#list_for_user) - List models filtered by user provider preferences, privacy settings, and guardrails

## count

Get total count of available models

### Example Usage

{/* UsageSnippet language="python" operationID="listModelsCount" method="get" path="/models/count" */}

```python
from openrouter import OpenRouter
import os

with OpenRouter(
    api_key=os.getenv("OPENROUTER_API_KEY", ""),
) as open_router:

    res = open_router.models.count()

    # Handle response
    print(res)

```

### Parameters

| Parameter | Type                                                               | Required             | Description                                                         |
| --------- | ------------------------------------------------------------------ | -------------------- | ------------------------------------------------------------------- |
| `retries` | [Optional\[utils.RetryConfig\]](../../models/utils/retryconfig.md) | :heavy\_minus\_sign: | Configuration to override the default retry behavior of the client. |

### Response

**[components.ModelsCountResponse](/docs/sdks/python/api-reference/components/modelscountresponse)**

### Errors

| Error Type                         | Status Code | Content Type     |
| ---------------------------------- | ----------- | ---------------- |
| errors.InternalServerResponseError | 500         | application/json |
| errors.OpenRouterDefaultError      | 4XX, 5XX    | \*/\*            |

## list

List all models and their properties

### Example Usage

{/* UsageSnippet language="python" operationID="getModels" method="get" path="/models" */}

```python
from openrouter import OpenRouter
import os

with OpenRouter(
    api_key=os.getenv("OPENROUTER_API_KEY", ""),
) as open_router:

    res = open_router.models.list()

    # Handle response
    print(res)

```

### Parameters

| Parameter              | Type                                                               | Required             | Description                                                         | Example     |
| ---------------------- | ------------------------------------------------------------------ | -------------------- | ------------------------------------------------------------------- | ----------- |
| `category`             | [Optional\[operations.Category\]](../../operations/category.md)    | :heavy\_minus\_sign: | Filter models by use case category                                  | programming |
| `supported_parameters` | *Optional\[str]*                                                   | :heavy\_minus\_sign: | N/A                                                                 |             |
| `retries`              | [Optional\[utils.RetryConfig\]](../../models/utils/retryconfig.md) | :heavy\_minus\_sign: | Configuration to override the default retry behavior of the client. |             |

### Response

**[components.ModelsListResponse](/docs/sdks/python/api-reference/components/modelslistresponse)**

### Errors

| Error Type                         | Status Code | Content Type     |
| ---------------------------------- | ----------- | ---------------- |
| errors.BadRequestResponseError     | 400         | application/json |
| errors.InternalServerResponseError | 500         | application/json |
| errors.OpenRouterDefaultError      | 4XX, 5XX    | \*/\*            |

## list\_for\_user

List models filtered by user provider preferences, [privacy settings](https://openrouter.ai/docs/guides/privacy/logging), and [guardrails](https://openrouter.ai/docs/guides/features/guardrails). If requesting through `eu.openrouter.ai/api/v1/...` the results will be filtered to models that satisfy [EU in-region routing](https://openrouter.ai/docs/guides/privacy/logging#enterprise-eu-in-region-routing).

### Example Usage

{/* UsageSnippet language="python" operationID="listModelsUser" method="get" path="/models/user" */}

```python
from openrouter import OpenRouter, operations
import os

with OpenRouter() as open_router:

    res = open_router.models.list_for_user(security=operations.ListModelsUserSecurity(
        bearer=os.getenv("OPENROUTER_BEARER", ""),
    ))

    # Handle response
    print(res)

```

### Parameters

| Parameter  | Type                                                                                                   | Required             | Description                                                         |
| ---------- | ------------------------------------------------------------------------------------------------------ | -------------------- | ------------------------------------------------------------------- |
| `security` | [operations.ListModelsUserSecurity](/docs/sdks/python/api-reference/operations/listmodelsusersecurity) | :heavy\_check\_mark: | The security requirements to use for the request.                   |
| `retries`  | [Optional\[utils.RetryConfig\]](../../models/utils/retryconfig.md)                                     | :heavy\_minus\_sign: | Configuration to override the default retry behavior of the client. |

### Response

**[components.ModelsListResponse](/docs/sdks/python/api-reference/components/modelslistresponse)**

### Errors

| Error Type                         | Status Code | Content Type     |
| ---------------------------------- | ----------- | ---------------- |
| errors.UnauthorizedResponseError   | 401         | application/json |
| errors.NotFoundResponseError       | 404         | application/json |
| errors.InternalServerResponseError | 500         | application/json |
| errors.OpenRouterDefaultError      | 4XX, 5XX    | \*/\*            |
