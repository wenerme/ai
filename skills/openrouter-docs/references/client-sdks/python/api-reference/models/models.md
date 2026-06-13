> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://openrouter.ai/docs/_mcp/server.

# Models - Python SDK

The Python SDK and docs are currently in beta.
Report issues on [GitHub](https://github.com/OpenRouterTeam/python-sdk/issues).

## Overview

Model information endpoints

### Available Operations

* [get](#get) - Get a model by its slug
* [list](#list) - List all models and their properties
* [count](#count) - Get total count of available models
* [list\_for\_user](#list_for_user) - List models filtered by user provider preferences, privacy settings, and guardrails

## get

Returns full details for a single model identified by its author and slug (e.g. openai/gpt-4). Supports variant suffixes (e.g. openai/gpt-4:free) and resolves known slug aliases.

### Example Usage

```python
from openrouter import OpenRouter
import os

with OpenRouter(
    http_referer="<value>",
    x_open_router_title="<value>",
    x_open_router_categories="<value>",
    api_key=os.getenv("OPENROUTER_API_KEY", ""),
) as open_router:

    res = open_router.models.get(author="openai", slug="gpt-4")

    # Handle response
    print(res)

```

### Parameters

| Parameter                  | Type                                                               | Required             | Description                                                                                                                                                 | Example |
| -------------------------- | ------------------------------------------------------------------ | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `author`                   | *str*                                                              | :heavy\_check\_mark: | The author/organization of the model                                                                                                                        | openai  |
| `slug`                     | *str*                                                              | :heavy\_check\_mark: | The model slug, optionally including a variant suffix (e.g. gpt-4 or gpt-4:free)                                                                            | gpt-4   |
| `http_referer`             | *Optional\[str]*                                                   | :heavy\_minus\_sign: | The app identifier should be your app's URL and is used as the primary identifier for rankings.<br />This is used to track API usage per application.<br /> |         |
| `x_open_router_title`      | *Optional\[str]*                                                   | :heavy\_minus\_sign: | The app display name allows you to customize how your app appears in OpenRouter's dashboard.<br />                                                          |         |
| `x_open_router_categories` | *Optional\[str]*                                                   | :heavy\_minus\_sign: | Comma-separated list of app categories (e.g. "cli-agent,cloud-agent"). Used for marketplace rankings.<br />                                                 |         |
| `retries`                  | [Optional\[utils.RetryConfig\]](../../models/utils/retryconfig.md) | :heavy\_minus\_sign: | Configuration to override the default retry behavior of the client.                                                                                         |         |

### Response

**[components.ModelResponse](/docs/sdks/python/api-reference/components/modelresponse)**

### Errors

| Error Type                         | Status Code | Content Type     |
| ---------------------------------- | ----------- | ---------------- |
| errors.NotFoundResponseError       | 404         | application/json |
| errors.InternalServerResponseError | 500         | application/json |
| errors.OpenRouterDefaultError      | 4XX, 5XX    | \*/\*            |

## list

List all models and their properties

### Example Usage

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

| Parameter                  | Type                                                                              | Required             | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                | Example          |
| -------------------------- | --------------------------------------------------------------------------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `http_referer`             | *Optional\[str]*                                                                  | :heavy\_minus\_sign: | The app identifier should be your app's URL and is used as the primary identifier for rankings.<br />This is used to track API usage per application.<br />                                                                                                                                                                                                                                                                                                |                  |
| `x_open_router_title`      | *Optional\[str]*                                                                  | :heavy\_minus\_sign: | The app display name allows you to customize how your app appears in OpenRouter's dashboard.<br />                                                                                                                                                                                                                                                                                                                                                         |                  |
| `x_open_router_categories` | *Optional\[str]*                                                                  | :heavy\_minus\_sign: | Comma-separated list of app categories (e.g. "cli-agent,cloud-agent"). Used for marketplace rankings.<br />                                                                                                                                                                                                                                                                                                                                                |                  |
| `category`                 | [Optional\[operations.GetModelsCategory\]](../../operations/getmodelscategory.md) | :heavy\_minus\_sign: | Filter models by use case category                                                                                                                                                                                                                                                                                                                                                                                                                         | programming      |
| `supported_parameters`     | *Optional\[str]*                                                                  | :heavy\_minus\_sign: | Filter models by supported parameter (comma-separated)                                                                                                                                                                                                                                                                                                                                                                                                     | temperature      |
| `output_modalities`        | *Optional\[str]*                                                                  | :heavy\_minus\_sign: | Filter models by output modality. Accepts a comma-separated list of modalities (text, image, audio, embeddings) or "all" to include all models. Defaults to "text".                                                                                                                                                                                                                                                                                        | text             |
| `sort`                     | [Optional\[operations.GetModelsSort\]](../../operations/getmodelssort.md)         | :heavy\_minus\_sign: | Sort the returned models server-side. Prefer this over fetching the full list and sorting client-side. Options: pricing-low-to-high, pricing-high-to-low (average prompt/completion price), context-high-to-low (context length), throughput-high-to-low, latency-low-to-high (recent median performance), most-popular, top-weekly (tokens processed in the last week), newest (creation date). When omitted, the existing default ordering is preserved. | newest           |
| `q`                        | *Optional\[str]*                                                                  | :heavy\_minus\_sign: | Free-text search by model name or slug.                                                                                                                                                                                                                                                                                                                                                                                                                    | gpt-4            |
| `input_modalities`         | *Optional\[str]*                                                                  | :heavy\_minus\_sign: | Filter models by input modality. Comma-separated list of: text, image, audio, file.                                                                                                                                                                                                                                                                                                                                                                        | text,image       |
| `context`                  | *Optional\[int]*                                                                  | :heavy\_minus\_sign: | Minimum context length (tokens). Models with smaller context are excluded.                                                                                                                                                                                                                                                                                                                                                                                 | 128000           |
| `min_price`                | *OptionalNullable\[float]*                                                        | :heavy\_minus\_sign: | Minimum prompt price in \$/M tokens.                                                                                                                                                                                                                                                                                                                                                                                                                       | 0                |
| `max_price`                | *OptionalNullable\[float]*                                                        | :heavy\_minus\_sign: | Maximum prompt price in \$/M tokens.                                                                                                                                                                                                                                                                                                                                                                                                                       | 10               |
| `arch`                     | *Optional\[str]*                                                                  | :heavy\_minus\_sign: | Filter models by architecture/model family (e.g. GPT, Claude, Gemini, Llama).                                                                                                                                                                                                                                                                                                                                                                              | GPT              |
| `model_authors`            | *Optional\[str]*                                                                  | :heavy\_minus\_sign: | Filter models by the organization that created the model. Comma-separated list of author slugs.                                                                                                                                                                                                                                                                                                                                                            | openai,anthropic |
| `providers`                | *Optional\[str]*                                                                  | :heavy\_minus\_sign: | Filter models by hosting provider. Comma-separated list of provider names.                                                                                                                                                                                                                                                                                                                                                                                 | OpenAI,Anthropic |
| `distillable`              | [Optional\[operations.Distillable\]](../../operations/distillable.md)             | :heavy\_minus\_sign: | Filter by distillation capability. "true" returns only distillable models, "false" excludes them.                                                                                                                                                                                                                                                                                                                                                          | true             |
| `zdr`                      | [Optional\[operations.Zdr\]](../../operations/zdr.md)                             | :heavy\_minus\_sign: | When set to "true", return only models with zero data retention endpoints.                                                                                                                                                                                                                                                                                                                                                                                 | true             |
| `region`                   | [Optional\[operations.Region\]](../../operations/region.md)                       | :heavy\_minus\_sign: | Filter to models with endpoints in the given data region. Currently only "eu" is supported.                                                                                                                                                                                                                                                                                                                                                                | eu               |
| `retries`                  | [Optional\[utils.RetryConfig\]](../../models/utils/retryconfig.md)                | :heavy\_minus\_sign: | Configuration to override the default retry behavior of the client.                                                                                                                                                                                                                                                                                                                                                                                        |                  |

### Response

**[components.ModelsListResponse](/docs/sdks/python/api-reference/components/modelslistresponse)**

### Errors

| Error Type                         | Status Code | Content Type     |
| ---------------------------------- | ----------- | ---------------- |
| errors.BadRequestResponseError     | 400         | application/json |
| errors.InternalServerResponseError | 500         | application/json |
| errors.OpenRouterDefaultError      | 4XX, 5XX    | \*/\*            |

## count

Get total count of available models

### Example Usage

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

## list\_for\_user

List models filtered by user provider preferences, [privacy settings](https://openrouter.ai/docs/guides/privacy/provider-logging), and [guardrails](https://openrouter.ai/docs/guides/features/guardrails). If requesting through `eu.openrouter.ai/api/v1/...` the results will be filtered to models that satisfy [EU in-region routing](https://openrouter.ai/docs/guides/privacy/provider-logging#enterprise-eu-in-region-routing).

### Example Usage

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