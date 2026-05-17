> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For full documentation content, see https://openrouter.ai/docs/llms-full.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://openrouter.ai/docs/_mcp/server.

# Byok - Python SDK

The Python SDK and docs are currently in beta.
Report issues on [GitHub](https://github.com/OpenRouterTeam/python-sdk/issues).

## Overview

BYOK endpoints

### Available Operations

* [list](#list) - List BYOK provider credentials
* [get](#get) - Get a BYOK provider credential

## list

List the bring-your-own-key (BYOK) provider credentials for the authenticated entity's default workspace. Use the `workspace_id` query parameter to scope the result to a different workspace, or the `provider` query parameter to filter by upstream provider. [Management key](/docs/guides/overview/auth/management-api-keys) required.

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

    res = open_router.byok.list()

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
| `provider`                 | [Optional\[operations.Provider\]](../../operations/provider.md)    | :heavy\_minus\_sign: | Optional provider slug to filter by (e.g. `openai`, `anthropic`, `amazon-bedrock`).                                                                         | openai                               |
| `retries`                  | [Optional\[utils.RetryConfig\]](../../models/utils/retryconfig.md) | :heavy\_minus\_sign: | Configuration to override the default retry behavior of the client.                                                                                         |                                      |

### Response

**[operations.ListBYOKKeysResponse](/docs/sdks/python/api-reference/operations/listbyokkeysresponse)**

### Errors

| Error Type                         | Status Code | Content Type     |
| ---------------------------------- | ----------- | ---------------- |
| errors.UnauthorizedResponseError   | 401         | application/json |
| errors.InternalServerResponseError | 500         | application/json |
| errors.OpenRouterDefaultError      | 4XX, 5XX    | \*/\*            |

## get

Get a single bring-your-own-key (BYOK) provider credential by its `id`. Defaults to the authenticated entity's default workspace; use the `workspace_id` query parameter to scope to a different workspace. [Management key](/docs/guides/overview/auth/management-api-keys) required.

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

    res = open_router.byok.get(id="11111111-2222-3333-4444-555555555555")

    # Handle response
    print(res)

```

### Parameters

| Parameter                  | Type                                                               | Required             | Description                                                                                                                                                 | Example                              |
| -------------------------- | ------------------------------------------------------------------ | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| `id`                       | *str*                                                              | :heavy\_check\_mark: | The BYOK credential ID (UUID).                                                                                                                              | 11111111-2222-3333-4444-555555555555 |
| `http_referer`             | *Optional\[str]*                                                   | :heavy\_minus\_sign: | The app identifier should be your app's URL and is used as the primary identifier for rankings.<br />This is used to track API usage per application.<br /> |                                      |
| `x_open_router_title`      | *Optional\[str]*                                                   | :heavy\_minus\_sign: | The app display name allows you to customize how your app appears in OpenRouter's dashboard.<br />                                                          |                                      |
| `x_open_router_categories` | *Optional\[str]*                                                   | :heavy\_minus\_sign: | Comma-separated list of app categories (e.g. "cli-agent,cloud-agent"). Used for marketplace rankings.<br />                                                 |                                      |
| `workspace_id`             | *Optional\[str]*                                                   | :heavy\_minus\_sign: | Optional workspace ID. Defaults to the authenticated entity's default workspace.                                                                            | 550e8400-e29b-41d4-a716-446655440000 |
| `retries`                  | [Optional\[utils.RetryConfig\]](../../models/utils/retryconfig.md) | :heavy\_minus\_sign: | Configuration to override the default retry behavior of the client.                                                                                         |                                      |

### Response

**[components.GetBYOKKeyResponse](/docs/sdks/python/api-reference/components/getbyokkeyresponse)**

### Errors

| Error Type                         | Status Code | Content Type     |
| ---------------------------------- | ----------- | ---------------- |
| errors.UnauthorizedResponseError   | 401         | application/json |
| errors.NotFoundResponseError       | 404         | application/json |
| errors.InternalServerResponseError | 500         | application/json |
| errors.OpenRouterDefaultError      | 4XX, 5XX    | \*/\*            |