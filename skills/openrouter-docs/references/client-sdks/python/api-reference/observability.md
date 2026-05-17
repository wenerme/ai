> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For full documentation content, see https://openrouter.ai/docs/llms-full.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://openrouter.ai/docs/_mcp/server.

# Observability - Python SDK

The Python SDK and docs are currently in beta.
Report issues on [GitHub](https://github.com/OpenRouterTeam/python-sdk/issues).

## Overview

Observability endpoints

### Available Operations

* [list](#list) - List observability destinations
* [create](#create) - Create an observability destination
* [delete](#delete) - Delete an observability destination
* [get](#get) - Get an observability destination
* [update](#update) - Update an observability destination

## list

List the observability destinations configured for the authenticated entity's default workspace. Use the `workspace_id` query parameter to scope the result to a different workspace. Only destinations with stable release status are surfaced — destinations of other types are excluded. [Management key](/docs/guides/overview/auth/management-api-keys) required.

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

    res = open_router.observability.list()

    while res is not None:
        # Handle items

        res = res.next()

```

### Parameters

| Parameter                  | Type                                                               | Required             | Description                                                                                                                                                 | Example                              |
| -------------------------- | ------------------------------------------------------------------ | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| `http_referer`             | *Optional\[str]*                                                   | :heavy\_minus\_sign: | The app identifier should be your app's URL and is used as the primary identifier for rankings.<br />This is used to track API usage per application.<br /> |                                      |
| `x_open_router_title`      | *Optional\[str]*                                                   | :heavy\_minus\_sign: | The app display name allows you to customize how your app appears in OpenRouter's dashboard.<br />                                                          |                                      |
| `x_open_router_categories` | *Optional\[str]*                                                   | :heavy\_minus\_sign: | Comma-separated list of app categories (e.g. "cli-agent,cloud-agent"). Used for marketplace rankings.<br />                                                 |                                      |
| `offset`                   | *Optional\[int]*                                                   | :heavy\_minus\_sign: | Number of records to skip for pagination                                                                                                                    | 0                                    |
| `limit`                    | *Optional\[int]*                                                   | :heavy\_minus\_sign: | Maximum number of records to return (max 100)                                                                                                               | 50                                   |
| `workspace_id`             | *Optional\[str]*                                                   | :heavy\_minus\_sign: | Optional workspace ID to filter by. Defaults to the authenticated entity's default workspace.                                                               | 550e8400-e29b-41d4-a716-446655440000 |
| `retries`                  | [Optional\[utils.RetryConfig\]](../../models/utils/retryconfig.md) | :heavy\_minus\_sign: | Configuration to override the default retry behavior of the client.                                                                                         |                                      |

### Response

**[operations.ListObservabilityDestinationsResponse](/docs/sdks/python/api-reference/operations/listobservabilitydestinationsresponse)**

### Errors

| Error Type                         | Status Code | Content Type     |
| ---------------------------------- | ----------- | ---------------- |
| errors.UnauthorizedResponseError   | 401         | application/json |
| errors.InternalServerResponseError | 500         | application/json |
| errors.OpenRouterDefaultError      | 4XX, 5XX    | \*/\*            |

## create

Create a new observability destination. A maximum of 5 destinations per type is allowed. Defaults to the authenticated entity's default workspace; use the `workspace_id` body field to scope to a different workspace. [Management key](/docs/guides/overview/auth/management-api-keys) required.

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

    res = open_router.observability.create(config={
        "baseUrl": "https://us.cloud.langfuse.com",
        "publicKey": "pk-l...EfGh",
        "secretKey": "sk-l...AbCd",
    }, name="Production Langfuse", type_="langfuse", enabled=True, privacy_mode=False)

    # Handle response
    print(res)

```

### Parameters

| Parameter                  | Type                                                                                                                                         | Required             | Description                                                                                                                                                 | Example                                                                                              |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `config`                   | Dict\[str, *Nullable\[Any]*]                                                                                                                 | :heavy\_check\_mark: | Provider-specific configuration. The shape depends on `type` and is validated server-side.                                                                  | `{"baseUrl": "https://us.cloud.langfuse.com","publicKey": "pk-l...EfGh","secretKey": "sk-l...AbCd"}` |
| `name`                     | *str*                                                                                                                                        | :heavy\_check\_mark: | Human-readable name for the destination.                                                                                                                    | Production Langfuse                                                                                  |
| `type`                     | [components.CreateObservabilityDestinationRequestType](/docs/sdks/python/api-reference/components/createobservabilitydestinationrequesttype) | :heavy\_check\_mark: | The destination type. Only stable destination types are accepted.                                                                                           | langfuse                                                                                             |
| `http_referer`             | *Optional\[str]*                                                                                                                             | :heavy\_minus\_sign: | The app identifier should be your app's URL and is used as the primary identifier for rankings.<br />This is used to track API usage per application.<br /> |                                                                                                      |
| `x_open_router_title`      | *Optional\[str]*                                                                                                                             | :heavy\_minus\_sign: | The app display name allows you to customize how your app appears in OpenRouter's dashboard.<br />                                                          |                                                                                                      |
| `x_open_router_categories` | *Optional\[str]*                                                                                                                             | :heavy\_minus\_sign: | Comma-separated list of app categories (e.g. "cli-agent,cloud-agent"). Used for marketplace rankings.<br />                                                 |                                                                                                      |
| `api_key_hashes`           | List\[*str*]                                                                                                                                 | :heavy\_minus\_sign: | Optional allowlist of OpenRouter API key hashes whose traffic is forwarded. `null` or omitted means all keys. Must contain at least one hash if provided.   | `<nil>`                                                                                              |
| `enabled`                  | *Optional\[bool]*                                                                                                                            | :heavy\_minus\_sign: | Whether this destination should be enabled immediately.                                                                                                     | true                                                                                                 |
| `filter_rules`             | [OptionalNullable\[components.ObservabilityFilterRulesConfig\]](../../components/observabilityfilterrulesconfig.md)                          | :heavy\_minus\_sign: | Optional structured filter rules controlling which events are forwarded.                                                                                    | `<nil>`                                                                                              |
| `privacy_mode`             | *Optional\[bool]*                                                                                                                            | :heavy\_minus\_sign: | When true, request/response bodies are not forwarded — only metadata.                                                                                       | false                                                                                                |
| `sampling_rate`            | *Optional\[float]*                                                                                                                           | :heavy\_minus\_sign: | Sampling rate between 0 and 1 (1 = 100%).                                                                                                                   | 1                                                                                                    |
| `workspace_id`             | *Optional\[str]*                                                                                                                             | :heavy\_minus\_sign: | Optional workspace ID. Defaults to the authenticated entity's default workspace.                                                                            | 550e8400-e29b-41d4-a716-446655440000                                                                 |
| `retries`                  | [Optional\[utils.RetryConfig\]](../../models/utils/retryconfig.md)                                                                           | :heavy\_minus\_sign: | Configuration to override the default retry behavior of the client.                                                                                         |                                                                                                      |

### Response

**[components.CreateObservabilityDestinationResponse](/docs/sdks/python/api-reference/components/createobservabilitydestinationresponse)**

### Errors

| Error Type                         | Status Code | Content Type     |
| ---------------------------------- | ----------- | ---------------- |
| errors.BadRequestResponseError     | 400         | application/json |
| errors.UnauthorizedResponseError   | 401         | application/json |
| errors.ForbiddenResponseError      | 403         | application/json |
| errors.ConflictResponseError       | 409         | application/json |
| errors.InternalServerResponseError | 500         | application/json |
| errors.OpenRouterDefaultError      | 4XX, 5XX    | \*/\*            |

## delete

Delete an existing observability destination. This performs a soft delete. [Management key](/docs/guides/overview/auth/management-api-keys) required.

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

    res = open_router.observability.delete(id="99999999-aaaa-bbbb-cccc-dddddddddddd")

    # Handle response
    print(res)

```

### Parameters

| Parameter                  | Type                                                               | Required             | Description                                                                                                                                                 | Example                              |
| -------------------------- | ------------------------------------------------------------------ | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| `id`                       | *str*                                                              | :heavy\_check\_mark: | The destination ID (UUID).                                                                                                                                  | 99999999-aaaa-bbbb-cccc-dddddddddddd |
| `http_referer`             | *Optional\[str]*                                                   | :heavy\_minus\_sign: | The app identifier should be your app's URL and is used as the primary identifier for rankings.<br />This is used to track API usage per application.<br /> |                                      |
| `x_open_router_title`      | *Optional\[str]*                                                   | :heavy\_minus\_sign: | The app display name allows you to customize how your app appears in OpenRouter's dashboard.<br />                                                          |                                      |
| `x_open_router_categories` | *Optional\[str]*                                                   | :heavy\_minus\_sign: | Comma-separated list of app categories (e.g. "cli-agent,cloud-agent"). Used for marketplace rankings.<br />                                                 |                                      |
| `retries`                  | [Optional\[utils.RetryConfig\]](../../models/utils/retryconfig.md) | :heavy\_minus\_sign: | Configuration to override the default retry behavior of the client.                                                                                         |                                      |

### Response

**[components.DeleteObservabilityDestinationResponse](/docs/sdks/python/api-reference/components/deleteobservabilitydestinationresponse)**

### Errors

| Error Type                         | Status Code | Content Type     |
| ---------------------------------- | ----------- | ---------------- |
| errors.UnauthorizedResponseError   | 401         | application/json |
| errors.NotFoundResponseError       | 404         | application/json |
| errors.InternalServerResponseError | 500         | application/json |
| errors.OpenRouterDefaultError      | 4XX, 5XX    | \*/\*            |

## get

Fetch a single observability destination by its UUID. [Management key](/docs/guides/overview/auth/management-api-keys) required.

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

    res = open_router.observability.get(id="99999999-aaaa-bbbb-cccc-dddddddddddd")

    # Handle response
    print(res)

```

### Parameters

| Parameter                  | Type                                                               | Required             | Description                                                                                                                                                 | Example                              |
| -------------------------- | ------------------------------------------------------------------ | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| `id`                       | *str*                                                              | :heavy\_check\_mark: | The destination ID (UUID).                                                                                                                                  | 99999999-aaaa-bbbb-cccc-dddddddddddd |
| `http_referer`             | *Optional\[str]*                                                   | :heavy\_minus\_sign: | The app identifier should be your app's URL and is used as the primary identifier for rankings.<br />This is used to track API usage per application.<br /> |                                      |
| `x_open_router_title`      | *Optional\[str]*                                                   | :heavy\_minus\_sign: | The app display name allows you to customize how your app appears in OpenRouter's dashboard.<br />                                                          |                                      |
| `x_open_router_categories` | *Optional\[str]*                                                   | :heavy\_minus\_sign: | Comma-separated list of app categories (e.g. "cli-agent,cloud-agent"). Used for marketplace rankings.<br />                                                 |                                      |
| `retries`                  | [Optional\[utils.RetryConfig\]](../../models/utils/retryconfig.md) | :heavy\_minus\_sign: | Configuration to override the default retry behavior of the client.                                                                                         |                                      |

### Response

**[components.GetObservabilityDestinationResponse](/docs/sdks/python/api-reference/components/getobservabilitydestinationresponse)**

### Errors

| Error Type                         | Status Code | Content Type     |
| ---------------------------------- | ----------- | ---------------- |
| errors.UnauthorizedResponseError   | 401         | application/json |
| errors.NotFoundResponseError       | 404         | application/json |
| errors.InternalServerResponseError | 500         | application/json |
| errors.OpenRouterDefaultError      | 4XX, 5XX    | \*/\*            |

## update

Update an existing observability destination. Only the fields provided in the request body are updated. [Management key](/docs/guides/overview/auth/management-api-keys) required.

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

    res = open_router.observability.update(id="99999999-aaaa-bbbb-cccc-dddddddddddd", enabled=False, name="Updated Langfuse")

    # Handle response
    print(res)

```

### Parameters

| Parameter                  | Type                                                                                                                | Required             | Description                                                                                                                                                          | Example                                                                                              |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------- | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `id`                       | *str*                                                                                                               | :heavy\_check\_mark: | The destination ID (UUID).                                                                                                                                           | 99999999-aaaa-bbbb-cccc-dddddddddddd                                                                 |
| `http_referer`             | *Optional\[str]*                                                                                                    | :heavy\_minus\_sign: | The app identifier should be your app's URL and is used as the primary identifier for rankings.<br />This is used to track API usage per application.<br />          |                                                                                                      |
| `x_open_router_title`      | *Optional\[str]*                                                                                                    | :heavy\_minus\_sign: | The app display name allows you to customize how your app appears in OpenRouter's dashboard.<br />                                                                   |                                                                                                      |
| `x_open_router_categories` | *Optional\[str]*                                                                                                    | :heavy\_minus\_sign: | Comma-separated list of app categories (e.g. "cli-agent,cloud-agent"). Used for marketplace rankings.<br />                                                          |                                                                                                      |
| `api_key_hashes`           | List\[*str*]                                                                                                        | :heavy\_minus\_sign: | Optional allowlist of OpenRouter API key hashes. `null` clears the filter (all keys). Omitting leaves the current value. Must contain at least one hash if provided. | `<nil>`                                                                                              |
| `config`                   | Dict\[str, *Nullable\[Any]*]                                                                                        | :heavy\_minus\_sign: | Provider-specific configuration fields to update. Masked values are ignored; unset fields keep their current value.                                                  | `{"baseUrl": "https://us.cloud.langfuse.com","publicKey": "pk-l...EfGh","secretKey": "sk-l...AbCd"}` |
| `enabled`                  | *Optional\[bool]*                                                                                                   | :heavy\_minus\_sign: | Whether the destination is enabled.                                                                                                                                  | true                                                                                                 |
| `filter_rules`             | [OptionalNullable\[components.ObservabilityFilterRulesConfig\]](../../components/observabilityfilterrulesconfig.md) | :heavy\_minus\_sign: | N/A                                                                                                                                                                  | `<nil>`                                                                                              |
| `name`                     | *Optional\[str]*                                                                                                    | :heavy\_minus\_sign: | Human-readable name for the destination.                                                                                                                             | Production Langfuse                                                                                  |
| `privacy_mode`             | *Optional\[bool]*                                                                                                   | :heavy\_minus\_sign: | When true, request/response bodies are not forwarded — only metadata.                                                                                                | false                                                                                                |
| `sampling_rate`            | *Optional\[float]*                                                                                                  | :heavy\_minus\_sign: | Sampling rate between 0 and 1 (1 = 100%).                                                                                                                            | 1                                                                                                    |
| `retries`                  | [Optional\[utils.RetryConfig\]](../../models/utils/retryconfig.md)                                                  | :heavy\_minus\_sign: | Configuration to override the default retry behavior of the client.                                                                                                  |                                                                                                      |

### Response

**[components.UpdateObservabilityDestinationResponse](/docs/sdks/python/api-reference/components/updateobservabilitydestinationresponse)**

### Errors

| Error Type                         | Status Code | Content Type     |
| ---------------------------------- | ----------- | ---------------- |
| errors.BadRequestResponseError     | 400         | application/json |
| errors.UnauthorizedResponseError   | 401         | application/json |
| errors.NotFoundResponseError       | 404         | application/json |
| errors.ConflictResponseError       | 409         | application/json |
| errors.InternalServerResponseError | 500         | application/json |
| errors.OpenRouterDefaultError      | 4XX, 5XX    | \*/\*            |