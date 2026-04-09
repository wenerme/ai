{/* banner:start */}

<Warning>
  The Python SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/python-sdk/issues).
</Warning>

{/* banner:end */}

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
    http_referer="<value>",
    x_open_router_title="<value>",
    x_open_router_categories="<value>",
    api_key=os.getenv("OPENROUTER_API_KEY", ""),
) as open_router:

    res = open_router.models.count()

    # Handle response
    print(res)

```

### Parameters

| Parameter                  | Type                                                               | Required             | Description                                                                                                                                                         | Example |
| -------------------------- | ------------------------------------------------------------------ | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `http_referer`             | *Optional\[str]*                                                   | :heavy\_minus\_sign: | The app identifier should be your app's URL and is used as the primary identifier for rankings.<br />This is used to track API usage per application.<br />         |         |
| `x_open_router_title`      | *Optional\[str]*                                                   | :heavy\_minus\_sign: | The app display name allows you to customize how your app appears in OpenRouter's dashboard.<br />                                                                  |         |
| `x_open_router_categories` | *Optional\[str]*                                                   | :heavy\_minus\_sign: | Comma-separated list of app categories (e.g. "cli-agent,cloud-agent"). Used for marketplace rankings.<br />                                                         |         |
| `output_modalities`        | *Optional\[str]*                                                   | :heavy\_minus\_sign: | Filter models by output modality. Accepts a comma-separated list of modalities (text, image, audio, embeddings) or "all" to include all models. Defaults to "text". | text    |
| `retries`                  | [Optional\[utils.RetryConfig\]](../../models/utils/retryconfig.md) | :heavy\_minus\_sign: | Configuration to override the default retry behavior of the client.                                                                                                 |         |

### Response

**[components.ModelsCountResponse](/docs/sdks/python/api-reference/components/modelscountresponse)**

### Errors

| Error Type                         | Status Code | Content Type     |
| ---------------------------------- | ----------- | ---------------- |
| errors.BadRequestResponseError     | 400         | application/json |
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
    http_referer="<value>",
    x_open_router_title="<value>",
    x_open_router_categories="<value>",
    api_key=os.getenv("OPENROUTER_API_KEY", ""),
) as open_router:

    res = open_router.models.list()

    # Handle response
    print(res)

```

### Parameters

| Parameter                  | Type                                                               | Required             | Description                                                                                                                                                         | Example     |
| -------------------------- | ------------------------------------------------------------------ | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `http_referer`             | *Optional\[str]*                                                   | :heavy\_minus\_sign: | The app identifier should be your app's URL and is used as the primary identifier for rankings.<br />This is used to track API usage per application.<br />         |             |
| `x_open_router_title`      | *Optional\[str]*                                                   | :heavy\_minus\_sign: | The app display name allows you to customize how your app appears in OpenRouter's dashboard.<br />                                                                  |             |
| `x_open_router_categories` | *Optional\[str]*                                                   | :heavy\_minus\_sign: | Comma-separated list of app categories (e.g. "cli-agent,cloud-agent"). Used for marketplace rankings.<br />                                                         |             |
| `category`                 | [Optional\[operations.Category\]](../../operations/category.md)    | :heavy\_minus\_sign: | Filter models by use case category                                                                                                                                  | programming |
| `supported_parameters`     | *Optional\[str]*                                                   | :heavy\_minus\_sign: | Filter models by supported parameter (comma-separated)                                                                                                              | temperature |
| `output_modalities`        | *Optional\[str]*                                                   | :heavy\_minus\_sign: | Filter models by output modality. Accepts a comma-separated list of modalities (text, image, audio, embeddings) or "all" to include all models. Defaults to "text". | text        |
| `retries`                  | [Optional\[utils.RetryConfig\]](../../models/utils/retryconfig.md) | :heavy\_minus\_sign: | Configuration to override the default retry behavior of the client.                                                                                                 |             |

### Response

**[components.ModelsListResponse](/docs/sdks/python/api-reference/components/modelslistresponse)**

### Errors

| Error Type                         | Status Code | Content Type     |
| ---------------------------------- | ----------- | ---------------- |
| errors.BadRequestResponseError     | 400         | application/json |
| errors.InternalServerResponseError | 500         | application/json |
| errors.OpenRouterDefaultError      | 4XX, 5XX    | \*/\*            |

## list\_for\_user

List models filtered by user provider preferences, [privacy settings](https://openrouter.ai/docs/guides/privacy/provider-logging), and [guardrails](https://openrouter.ai/docs/guides/features/guardrails). If requesting through `eu.openrouter.ai/api/v1/...` the results will be filtered to models that satisfy [EU in-region routing](https://openrouter.ai/docs/guides/privacy/provider-logging#enterprise-eu-in-region-routing).

### Example Usage

{/* UsageSnippet language="python" operationID="listModelsUser" method="get" path="/models/user" */}

```python
from openrouter import OpenRouter, operations
import os

with OpenRouter(
    http_referer="<value>",
    x_open_router_title="<value>",
    x_open_router_categories="<value>",
) as open_router:

    res = open_router.models.list_for_user(security=operations.ListModelsUserSecurity(
        bearer=os.getenv("OPENROUTER_BEARER", ""),
    ))

    # Handle response
    print(res)

```

### Parameters

| Parameter                  | Type                                                                                                   | Required             | Description                                                                                                                                                 |
| -------------------------- | ------------------------------------------------------------------------------------------------------ | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `security`                 | [operations.ListModelsUserSecurity](/docs/sdks/python/api-reference/operations/listmodelsusersecurity) | :heavy\_check\_mark: | N/A                                                                                                                                                         |
| `http_referer`             | *Optional\[str]*                                                                                       | :heavy\_minus\_sign: | The app identifier should be your app's URL and is used as the primary identifier for rankings.<br />This is used to track API usage per application.<br /> |
| `x_open_router_title`      | *Optional\[str]*                                                                                       | :heavy\_minus\_sign: | The app display name allows you to customize how your app appears in OpenRouter's dashboard.<br />                                                          |
| `x_open_router_categories` | *Optional\[str]*                                                                                       | :heavy\_minus\_sign: | Comma-separated list of app categories (e.g. "cli-agent,cloud-agent"). Used for marketplace rankings.<br />                                                 |
| `retries`                  | [Optional\[utils.RetryConfig\]](../../models/utils/retryconfig.md)                                     | :heavy\_minus\_sign: | Configuration to override the default retry behavior of the client.                                                                                         |

### Response

**[components.ModelsListResponse](/docs/sdks/python/api-reference/components/modelslistresponse)**

### Errors

| Error Type                         | Status Code | Content Type     |
| ---------------------------------- | ----------- | ---------------- |
| errors.UnauthorizedResponseError   | 401         | application/json |
| errors.NotFoundResponseError       | 404         | application/json |
| errors.InternalServerResponseError | 500         | application/json |
| errors.OpenRouterDefaultError      | 4XX, 5XX    | \*/\*            |
