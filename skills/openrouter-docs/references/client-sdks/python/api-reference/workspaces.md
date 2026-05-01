> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For full documentation content, see https://openrouter.ai/docs/llms-full.txt.

# Workspaces - Python SDK

<Warning>
  The Python SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/python-sdk/issues).
</Warning>

## Overview

Workspaces endpoints

### Available Operations

* [list](#list) - List workspaces
* [create](#create) - Create a workspace
* [delete](#delete) - Delete a workspace
* [get](#get) - Get a workspace
* [update](#update) - Update a workspace
* [bulk\_add\_members](#bulk_add_members) - Bulk add members to a workspace
* [bulk\_remove\_members](#bulk_remove_members) - Bulk remove members from a workspace

## list

List all workspaces for the authenticated user. [Management key](/docs/guides/overview/auth/management-api-keys) required.

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

    res = open_router.workspaces.list()

    while res is not None:
        # Handle items

        res = res.next()

```

### Parameters

| Parameter                  | Type                                                               | Required             | Description                                                                                                                                                 | Example |
| -------------------------- | ------------------------------------------------------------------ | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `http_referer`             | *Optional\[str]*                                                   | :heavy\_minus\_sign: | The app identifier should be your app's URL and is used as the primary identifier for rankings.<br />This is used to track API usage per application.<br /> |         |
| `x_open_router_title`      | *Optional\[str]*                                                   | :heavy\_minus\_sign: | The app display name allows you to customize how your app appears in OpenRouter's dashboard.<br />                                                          |         |
| `x_open_router_categories` | *Optional\[str]*                                                   | :heavy\_minus\_sign: | Comma-separated list of app categories (e.g. "cli-agent,cloud-agent"). Used for marketplace rankings.<br />                                                 |         |
| `offset`                   | *Optional\[int]*                                                   | :heavy\_minus\_sign: | Number of records to skip for pagination                                                                                                                    | 0       |
| `limit`                    | *Optional\[int]*                                                   | :heavy\_minus\_sign: | Maximum number of records to return (max 100)                                                                                                               | 50      |
| `retries`                  | [Optional\[utils.RetryConfig\]](../../models/utils/retryconfig.md) | :heavy\_minus\_sign: | Configuration to override the default retry behavior of the client.                                                                                         |         |

### Response

**[operations.ListWorkspacesResponse](/docs/sdks/python/api-reference/operations/listworkspacesresponse)**

### Errors

| Error Type                         | Status Code | Content Type     |
| ---------------------------------- | ----------- | ---------------- |
| errors.UnauthorizedResponseError   | 401         | application/json |
| errors.InternalServerResponseError | 500         | application/json |
| errors.OpenRouterDefaultError      | 4XX, 5XX    | \*/\*            |

## create

Create a new workspace for the authenticated user. [Management key](/docs/guides/overview/auth/management-api-keys) required.

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

    res = open_router.workspaces.create(name="Production", slug="production", default_image_model="openai/dall-e-3", default_provider_sort="price", default_text_model="openai/gpt-4o", description="Production environment workspace")

    # Handle response
    print(res)

```

### Parameters

| Parameter                             | Type                                                               | Required             | Description                                                                                                                                                 | Example                          |
| ------------------------------------- | ------------------------------------------------------------------ | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| `name`                                | *str*                                                              | :heavy\_check\_mark: | Name for the new workspace                                                                                                                                  | Production                       |
| `slug`                                | *str*                                                              | :heavy\_check\_mark: | URL-friendly slug (lowercase alphanumeric and hyphens only)                                                                                                 | production                       |
| `http_referer`                        | *Optional\[str]*                                                   | :heavy\_minus\_sign: | The app identifier should be your app's URL and is used as the primary identifier for rankings.<br />This is used to track API usage per application.<br /> |                                  |
| `x_open_router_title`                 | *Optional\[str]*                                                   | :heavy\_minus\_sign: | The app display name allows you to customize how your app appears in OpenRouter's dashboard.<br />                                                          |                                  |
| `x_open_router_categories`            | *Optional\[str]*                                                   | :heavy\_minus\_sign: | Comma-separated list of app categories (e.g. "cli-agent,cloud-agent"). Used for marketplace rankings.<br />                                                 |                                  |
| `default_image_model`                 | *OptionalNullable\[str]*                                           | :heavy\_minus\_sign: | Default image model for this workspace                                                                                                                      | openai/dall-e-3                  |
| `default_provider_sort`               | *OptionalNullable\[str]*                                           | :heavy\_minus\_sign: | Default provider sort preference (price, throughput, latency, exacto)                                                                                       | price                            |
| `default_text_model`                  | *OptionalNullable\[str]*                                           | :heavy\_minus\_sign: | Default text model for this workspace                                                                                                                       | openai/gpt-4o                    |
| `description`                         | *OptionalNullable\[str]*                                           | :heavy\_minus\_sign: | Description of the workspace                                                                                                                                | Production environment workspace |
| `io_logging_api_key_ids`              | List\[*int*]                                                       | :heavy\_minus\_sign: | Optional array of API key IDs to filter I/O logging                                                                                                         | `<nil>`                          |
| `io_logging_sampling_rate`            | *Optional\[float]*                                                 | :heavy\_minus\_sign: | Sampling rate for I/O logging (0.0001-1)                                                                                                                    | 1                                |
| `is_data_discount_logging_enabled`    | *Optional\[bool]*                                                  | :heavy\_minus\_sign: | Whether data discount logging is enabled                                                                                                                    | true                             |
| `is_observability_broadcast_enabled`  | *Optional\[bool]*                                                  | :heavy\_minus\_sign: | Whether broadcast is enabled                                                                                                                                | false                            |
| `is_observability_io_logging_enabled` | *Optional\[bool]*                                                  | :heavy\_minus\_sign: | Whether private logging is enabled                                                                                                                          | false                            |
| `retries`                             | [Optional\[utils.RetryConfig\]](../../models/utils/retryconfig.md) | :heavy\_minus\_sign: | Configuration to override the default retry behavior of the client.                                                                                         |                                  |

### Response

**[components.CreateWorkspaceResponse](/docs/sdks/python/api-reference/components/createworkspaceresponse)**

### Errors

| Error Type                         | Status Code | Content Type     |
| ---------------------------------- | ----------- | ---------------- |
| errors.BadRequestResponseError     | 400         | application/json |
| errors.UnauthorizedResponseError   | 401         | application/json |
| errors.ForbiddenResponseError      | 403         | application/json |
| errors.InternalServerResponseError | 500         | application/json |
| errors.OpenRouterDefaultError      | 4XX, 5XX    | \*/\*            |

## delete

Delete an existing workspace. The default workspace cannot be deleted. Workspaces with active API keys cannot be deleted. [Management key](/docs/guides/overview/auth/management-api-keys) required.

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

    res = open_router.workspaces.delete(id="production")

    # Handle response
    print(res)

```

### Parameters

| Parameter                  | Type                                                               | Required             | Description                                                                                                                                                 | Example    |
| -------------------------- | ------------------------------------------------------------------ | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `id`                       | *str*                                                              | :heavy\_check\_mark: | The workspace ID (UUID) or slug                                                                                                                             | production |
| `http_referer`             | *Optional\[str]*                                                   | :heavy\_minus\_sign: | The app identifier should be your app's URL and is used as the primary identifier for rankings.<br />This is used to track API usage per application.<br /> |            |
| `x_open_router_title`      | *Optional\[str]*                                                   | :heavy\_minus\_sign: | The app display name allows you to customize how your app appears in OpenRouter's dashboard.<br />                                                          |            |
| `x_open_router_categories` | *Optional\[str]*                                                   | :heavy\_minus\_sign: | Comma-separated list of app categories (e.g. "cli-agent,cloud-agent"). Used for marketplace rankings.<br />                                                 |            |
| `retries`                  | [Optional\[utils.RetryConfig\]](../../models/utils/retryconfig.md) | :heavy\_minus\_sign: | Configuration to override the default retry behavior of the client.                                                                                         |            |

### Response

**[components.DeleteWorkspaceResponse](/docs/sdks/python/api-reference/components/deleteworkspaceresponse)**

### Errors

| Error Type                         | Status Code | Content Type     |
| ---------------------------------- | ----------- | ---------------- |
| errors.BadRequestResponseError     | 400         | application/json |
| errors.UnauthorizedResponseError   | 401         | application/json |
| errors.ForbiddenResponseError      | 403         | application/json |
| errors.NotFoundResponseError       | 404         | application/json |
| errors.InternalServerResponseError | 500         | application/json |
| errors.OpenRouterDefaultError      | 4XX, 5XX    | \*/\*            |

## get

Get a single workspace by ID or slug. [Management key](/docs/guides/overview/auth/management-api-keys) required.

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

    res = open_router.workspaces.get(id="production")

    # Handle response
    print(res)

```

### Parameters

| Parameter                  | Type                                                               | Required             | Description                                                                                                                                                 | Example    |
| -------------------------- | ------------------------------------------------------------------ | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `id`                       | *str*                                                              | :heavy\_check\_mark: | The workspace ID (UUID) or slug                                                                                                                             | production |
| `http_referer`             | *Optional\[str]*                                                   | :heavy\_minus\_sign: | The app identifier should be your app's URL and is used as the primary identifier for rankings.<br />This is used to track API usage per application.<br /> |            |
| `x_open_router_title`      | *Optional\[str]*                                                   | :heavy\_minus\_sign: | The app display name allows you to customize how your app appears in OpenRouter's dashboard.<br />                                                          |            |
| `x_open_router_categories` | *Optional\[str]*                                                   | :heavy\_minus\_sign: | Comma-separated list of app categories (e.g. "cli-agent,cloud-agent"). Used for marketplace rankings.<br />                                                 |            |
| `retries`                  | [Optional\[utils.RetryConfig\]](../../models/utils/retryconfig.md) | :heavy\_minus\_sign: | Configuration to override the default retry behavior of the client.                                                                                         |            |

### Response

**[components.GetWorkspaceResponse](/docs/sdks/python/api-reference/components/getworkspaceresponse)**

### Errors

| Error Type                         | Status Code | Content Type     |
| ---------------------------------- | ----------- | ---------------- |
| errors.UnauthorizedResponseError   | 401         | application/json |
| errors.NotFoundResponseError       | 404         | application/json |
| errors.InternalServerResponseError | 500         | application/json |
| errors.OpenRouterDefaultError      | 4XX, 5XX    | \*/\*            |

## update

Update an existing workspace by ID or slug. [Management key](/docs/guides/overview/auth/management-api-keys) required.

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

    res = open_router.workspaces.update(id="production", name="Updated Workspace", slug="updated-workspace")

    # Handle response
    print(res)

```

### Parameters

| Parameter                             | Type                                                               | Required             | Description                                                                                                                                                 | Example             |
| ------------------------------------- | ------------------------------------------------------------------ | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| `id`                                  | *str*                                                              | :heavy\_check\_mark: | The workspace ID (UUID) or slug                                                                                                                             | production          |
| `http_referer`                        | *Optional\[str]*                                                   | :heavy\_minus\_sign: | The app identifier should be your app's URL and is used as the primary identifier for rankings.<br />This is used to track API usage per application.<br /> |                     |
| `x_open_router_title`                 | *Optional\[str]*                                                   | :heavy\_minus\_sign: | The app display name allows you to customize how your app appears in OpenRouter's dashboard.<br />                                                          |                     |
| `x_open_router_categories`            | *Optional\[str]*                                                   | :heavy\_minus\_sign: | Comma-separated list of app categories (e.g. "cli-agent,cloud-agent"). Used for marketplace rankings.<br />                                                 |                     |
| `default_image_model`                 | *OptionalNullable\[str]*                                           | :heavy\_minus\_sign: | Default image model for this workspace                                                                                                                      | openai/dall-e-3     |
| `default_provider_sort`               | *OptionalNullable\[str]*                                           | :heavy\_minus\_sign: | Default provider sort preference (price, throughput, latency, exacto)                                                                                       | price               |
| `default_text_model`                  | *OptionalNullable\[str]*                                           | :heavy\_minus\_sign: | Default text model for this workspace                                                                                                                       | openai/gpt-4o       |
| `description`                         | *OptionalNullable\[str]*                                           | :heavy\_minus\_sign: | New description for the workspace                                                                                                                           | Updated description |
| `io_logging_api_key_ids`              | List\[*int*]                                                       | :heavy\_minus\_sign: | Optional array of API key IDs to filter I/O logging                                                                                                         | `<nil>`             |
| `io_logging_sampling_rate`            | *Optional\[float]*                                                 | :heavy\_minus\_sign: | Sampling rate for I/O logging (0.0001-1)                                                                                                                    | 1                   |
| `is_data_discount_logging_enabled`    | *Optional\[bool]*                                                  | :heavy\_minus\_sign: | Whether data discount logging is enabled                                                                                                                    | true                |
| `is_observability_broadcast_enabled`  | *Optional\[bool]*                                                  | :heavy\_minus\_sign: | Whether broadcast is enabled                                                                                                                                | false               |
| `is_observability_io_logging_enabled` | *Optional\[bool]*                                                  | :heavy\_minus\_sign: | Whether private logging is enabled                                                                                                                          | false               |
| `name`                                | *Optional\[str]*                                                   | :heavy\_minus\_sign: | New name for the workspace                                                                                                                                  | Updated Workspace   |
| `slug`                                | *Optional\[str]*                                                   | :heavy\_minus\_sign: | New URL-friendly slug                                                                                                                                       | updated-workspace   |
| `retries`                             | [Optional\[utils.RetryConfig\]](../../models/utils/retryconfig.md) | :heavy\_minus\_sign: | Configuration to override the default retry behavior of the client.                                                                                         |                     |

### Response

**[components.UpdateWorkspaceResponse](/docs/sdks/python/api-reference/components/updateworkspaceresponse)**

### Errors

| Error Type                         | Status Code | Content Type     |
| ---------------------------------- | ----------- | ---------------- |
| errors.BadRequestResponseError     | 400         | application/json |
| errors.UnauthorizedResponseError   | 401         | application/json |
| errors.ForbiddenResponseError      | 403         | application/json |
| errors.NotFoundResponseError       | 404         | application/json |
| errors.InternalServerResponseError | 500         | application/json |
| errors.OpenRouterDefaultError      | 4XX, 5XX    | \*/\*            |

## bulk\_add\_members

Add multiple organization members to a workspace. Members are assigned the same role they hold in the organization. [Management key](/docs/guides/overview/auth/management-api-keys) required.

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

    res = open_router.workspaces.bulk_add_members(id="production", user_ids=[
        "user_abc123",
        "user_def456",
    ])

    # Handle response
    print(res)

```

### Parameters

| Parameter                  | Type                                                               | Required             | Description                                                                                                                                                 | Example                                            |
| -------------------------- | ------------------------------------------------------------------ | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| `id`                       | *str*                                                              | :heavy\_check\_mark: | The workspace ID (UUID) or slug                                                                                                                             | production                                         |
| `user_ids`                 | List\[*str*]                                                       | :heavy\_check\_mark: | List of user IDs to add to the workspace. Members are assigned the same role they hold in the organization.                                                 | \[<br />"user\_abc123",<br />"user\_def456"<br />] |
| `http_referer`             | *Optional\[str]*                                                   | :heavy\_minus\_sign: | The app identifier should be your app's URL and is used as the primary identifier for rankings.<br />This is used to track API usage per application.<br /> |                                                    |
| `x_open_router_title`      | *Optional\[str]*                                                   | :heavy\_minus\_sign: | The app display name allows you to customize how your app appears in OpenRouter's dashboard.<br />                                                          |                                                    |
| `x_open_router_categories` | *Optional\[str]*                                                   | :heavy\_minus\_sign: | Comma-separated list of app categories (e.g. "cli-agent,cloud-agent"). Used for marketplace rankings.<br />                                                 |                                                    |
| `retries`                  | [Optional\[utils.RetryConfig\]](../../models/utils/retryconfig.md) | :heavy\_minus\_sign: | Configuration to override the default retry behavior of the client.                                                                                         |                                                    |

### Response

**[components.BulkAddWorkspaceMembersResponse](/docs/sdks/python/api-reference/components/bulkaddworkspacemembersresponse)**

### Errors

| Error Type                         | Status Code | Content Type     |
| ---------------------------------- | ----------- | ---------------- |
| errors.BadRequestResponseError     | 400         | application/json |
| errors.UnauthorizedResponseError   | 401         | application/json |
| errors.ForbiddenResponseError      | 403         | application/json |
| errors.NotFoundResponseError       | 404         | application/json |
| errors.InternalServerResponseError | 500         | application/json |
| errors.OpenRouterDefaultError      | 4XX, 5XX    | \*/\*            |

## bulk\_remove\_members

Remove multiple members from a workspace. Members with active API keys in the workspace cannot be removed. [Management key](/docs/guides/overview/auth/management-api-keys) required.

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

    res = open_router.workspaces.bulk_remove_members(id="production", user_ids=[
        "user_abc123",
        "user_def456",
    ])

    # Handle response
    print(res)

```

### Parameters

| Parameter                  | Type                                                               | Required             | Description                                                                                                                                                 | Example                                            |
| -------------------------- | ------------------------------------------------------------------ | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| `id`                       | *str*                                                              | :heavy\_check\_mark: | The workspace ID (UUID) or slug                                                                                                                             | production                                         |
| `user_ids`                 | List\[*str*]                                                       | :heavy\_check\_mark: | List of user IDs to remove from the workspace                                                                                                               | \[<br />"user\_abc123",<br />"user\_def456"<br />] |
| `http_referer`             | *Optional\[str]*                                                   | :heavy\_minus\_sign: | The app identifier should be your app's URL and is used as the primary identifier for rankings.<br />This is used to track API usage per application.<br /> |                                                    |
| `x_open_router_title`      | *Optional\[str]*                                                   | :heavy\_minus\_sign: | The app display name allows you to customize how your app appears in OpenRouter's dashboard.<br />                                                          |                                                    |
| `x_open_router_categories` | *Optional\[str]*                                                   | :heavy\_minus\_sign: | Comma-separated list of app categories (e.g. "cli-agent,cloud-agent"). Used for marketplace rankings.<br />                                                 |                                                    |
| `retries`                  | [Optional\[utils.RetryConfig\]](../../models/utils/retryconfig.md) | :heavy\_minus\_sign: | Configuration to override the default retry behavior of the client.                                                                                         |                                                    |

### Response

**[components.BulkRemoveWorkspaceMembersResponse](/docs/sdks/python/api-reference/components/bulkremoveworkspacemembersresponse)**

### Errors

| Error Type                         | Status Code | Content Type     |
| ---------------------------------- | ----------- | ---------------- |
| errors.BadRequestResponseError     | 400         | application/json |
| errors.UnauthorizedResponseError   | 401         | application/json |
| errors.ForbiddenResponseError      | 403         | application/json |
| errors.NotFoundResponseError       | 404         | application/json |
| errors.InternalServerResponseError | 500         | application/json |
| errors.OpenRouterDefaultError      | 4XX, 5XX    | \*/\*            |