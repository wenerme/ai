> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For full documentation content, see https://openrouter.ai/docs/llms-full.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://openrouter.ai/docs/_mcp/server.

# Guardrails - Python SDK

The Python SDK and docs are currently in beta.
Report issues on [GitHub](https://github.com/OpenRouterTeam/python-sdk/issues).

## Overview

Guardrails endpoints

### Available Operations

* [list](#list) - List guardrails
* [create](#create) - Create a guardrail
* [delete](#delete) - Delete a guardrail
* [get](#get) - Get a guardrail
* [update](#update) - Update a guardrail
* [list\_guardrail\_key\_assignments](#list_guardrail_key_assignments) - List key assignments for a guardrail
* [bulk\_assign\_keys](#bulk_assign_keys) - Bulk assign keys to a guardrail
* [bulk\_unassign\_keys](#bulk_unassign_keys) - Bulk unassign keys from a guardrail
* [list\_guardrail\_member\_assignments](#list_guardrail_member_assignments) - List member assignments for a guardrail
* [bulk\_assign\_members](#bulk_assign_members) - Bulk assign members to a guardrail
* [bulk\_unassign\_members](#bulk_unassign_members) - Bulk unassign members from a guardrail
* [list\_key\_assignments](#list_key_assignments) - List all key assignments
* [list\_member\_assignments](#list_member_assignments) - List all member assignments

## list

List all guardrails for the authenticated user. [Management key](/docs/guides/overview/auth/management-api-keys) required.

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

    res = open_router.guardrails.list()

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
| `workspace_id`             | *Optional\[str]*                                                   | :heavy\_minus\_sign: | Filter guardrails by workspace ID. By default, guardrails in the default workspace are returned.                                                            | 0df9e665-d932-5740-b2c7-b52af166bc11 |
| `retries`                  | [Optional\[utils.RetryConfig\]](../../models/utils/retryconfig.md) | :heavy\_minus\_sign: | Configuration to override the default retry behavior of the client.                                                                                         |                                      |

### Response

**[operations.ListGuardrailsResponse](/docs/sdks/python/api-reference/operations/listguardrailsresponse)**

### Errors

| Error Type                         | Status Code | Content Type     |
| ---------------------------------- | ----------- | ---------------- |
| errors.UnauthorizedResponseError   | 401         | application/json |
| errors.InternalServerResponseError | 500         | application/json |
| errors.OpenRouterDefaultError      | 4XX, 5XX    | \*/\*            |

## create

Create a new guardrail for the authenticated user. [Management key](/docs/guides/overview/auth/management-api-keys) required.

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

    res = open_router.guardrails.create(name="My New Guardrail", allowed_models=None, allowed_providers=[
        "openai",
        "anthropic",
        "deepseek",
    ], description="A guardrail for limiting API usage", enforce_zdr_anthropic=True, enforce_zdr_google=False, enforce_zdr_openai=True, enforce_zdr_other=False, ignored_models=None, ignored_providers=None, limit_usd=50, reset_interval="monthly")

    # Handle response
    print(res)

```

### Parameters

| Parameter                  | Type                                                                                                                          | Required             | Description                                                                                                                                                                                                                                                                                                                                                                             | Example                                                                                                           |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `name`                     | *str*                                                                                                                         | :heavy\_check\_mark: | Name for the new guardrail                                                                                                                                                                                                                                                                                                                                                              | My New Guardrail                                                                                                  |
| `http_referer`             | *Optional\[str]*                                                                                                              | :heavy\_minus\_sign: | The app identifier should be your app's URL and is used as the primary identifier for rankings.<br />This is used to track API usage per application.<br />                                                                                                                                                                                                                             |                                                                                                                   |
| `x_open_router_title`      | *Optional\[str]*                                                                                                              | :heavy\_minus\_sign: | The app display name allows you to customize how your app appears in OpenRouter's dashboard.<br />                                                                                                                                                                                                                                                                                      |                                                                                                                   |
| `x_open_router_categories` | *Optional\[str]*                                                                                                              | :heavy\_minus\_sign: | Comma-separated list of app categories (e.g. "cli-agent,cloud-agent"). Used for marketplace rankings.<br />                                                                                                                                                                                                                                                                             |                                                                                                                   |
| `allowed_models`           | List\[*str*]                                                                                                                  | :heavy\_minus\_sign: | Array of model identifiers (slug or canonical\_slug accepted)                                                                                                                                                                                                                                                                                                                           | \[<br />"openai/gpt-5.2",<br />"anthropic/claude-4.5-opus-20251124",<br />"deepseek/deepseek-r1-0528:free"<br />] |
| `allowed_providers`        | List\[*str*]                                                                                                                  | :heavy\_minus\_sign: | List of allowed provider IDs                                                                                                                                                                                                                                                                                                                                                            | \[<br />"openai",<br />"anthropic",<br />"deepseek"<br />]                                                        |
| `content_filter_builtins`  | List\[[components.ContentFilterBuiltinEntryInput](/docs/sdks/python/api-reference/components/contentfilterbuiltinentryinput)] | :heavy\_minus\_sign: | Builtin content filters to apply. The "flag" action is only supported for "regex-prompt-injection"; PII slugs (email, phone, ssn, credit-card, ip-address, person-name, address) accept "block" or "redact" only.                                                                                                                                                                       | \[<br />`{"action": "block","slug": "regex-prompt-injection"}`<br />]                                             |
| `content_filters`          | List\[[components.ContentFilterEntry](/docs/sdks/python/api-reference/components/contentfilterentry)]                         | :heavy\_minus\_sign: | Custom regex content filters to apply to request messages                                                                                                                                                                                                                                                                                                                               | \[<br />`{"action": "redact","label": "[API_KEY]","pattern": "\\b(sk-[a-zA-Z0-9]{48}`)\b"<br />}<br />]           |
| `description`              | *OptionalNullable\[str]*                                                                                                      | :heavy\_minus\_sign: | Description of the guardrail                                                                                                                                                                                                                                                                                                                                                            | A guardrail for limiting API usage                                                                                |
| `enforce_zdr`              | *OptionalNullable\[bool]*                                                                                                     | :heavy\_minus\_sign: | : warning: \*\* DEPRECATED \*\*: This will be removed in a future release, please migrate away from it as soon as possible.<br /><br />Deprecated. Use enforce\_zdr\_anthropic, enforce\_zdr\_openai, enforce\_zdr\_google, and enforce\_zdr\_other instead. When provided, its value is copied into any of those per-provider fields that are not explicitly specified on the request. | false                                                                                                             |
| `enforce_zdr_anthropic`    | *OptionalNullable\[bool]*                                                                                                     | :heavy\_minus\_sign: | Whether to enforce zero data retention for Anthropic models. Falls back to enforce\_zdr when not provided.                                                                                                                                                                                                                                                                              | false                                                                                                             |
| `enforce_zdr_google`       | *OptionalNullable\[bool]*                                                                                                     | :heavy\_minus\_sign: | Whether to enforce zero data retention for Google models. Falls back to enforce\_zdr when not provided.                                                                                                                                                                                                                                                                                 | false                                                                                                             |
| `enforce_zdr_openai`       | *OptionalNullable\[bool]*                                                                                                     | :heavy\_minus\_sign: | Whether to enforce zero data retention for OpenAI models. Falls back to enforce\_zdr when not provided.                                                                                                                                                                                                                                                                                 | false                                                                                                             |
| `enforce_zdr_other`        | *OptionalNullable\[bool]*                                                                                                     | :heavy\_minus\_sign: | Whether to enforce zero data retention for models that are not from Anthropic, OpenAI, or Google. Falls back to enforce\_zdr when not provided.                                                                                                                                                                                                                                         | false                                                                                                             |
| `ignored_models`           | List\[*str*]                                                                                                                  | :heavy\_minus\_sign: | Array of model identifiers to exclude from routing (slug or canonical\_slug accepted)                                                                                                                                                                                                                                                                                                   | \[<br />"openai/gpt-4o-mini"<br />]                                                                               |
| `ignored_providers`        | List\[*str*]                                                                                                                  | :heavy\_minus\_sign: | List of provider IDs to exclude from routing                                                                                                                                                                                                                                                                                                                                            | \[<br />"azure"<br />]                                                                                            |
| `limit_usd`                | *OptionalNullable\[float]*                                                                                                    | :heavy\_minus\_sign: | Spending limit in USD                                                                                                                                                                                                                                                                                                                                                                   | 50                                                                                                                |
| `reset_interval`           | [OptionalNullable\[components.GuardrailInterval\]](../../components/guardrailinterval.md)                                     | :heavy\_minus\_sign: | Interval at which the limit resets (daily, weekly, monthly)                                                                                                                                                                                                                                                                                                                             | monthly                                                                                                           |
| `workspace_id`             | *Optional\[str]*                                                                                                              | :heavy\_minus\_sign: | The workspace to create the guardrail in. Defaults to the default workspace if not provided.                                                                                                                                                                                                                                                                                            | 0df9e665-d932-5740-b2c7-b52af166bc11                                                                              |
| `retries`                  | [Optional\[utils.RetryConfig\]](../../models/utils/retryconfig.md)                                                            | :heavy\_minus\_sign: | Configuration to override the default retry behavior of the client.                                                                                                                                                                                                                                                                                                                     |                                                                                                                   |

### Response

**[components.CreateGuardrailResponse](/docs/sdks/python/api-reference/components/createguardrailresponse)**

### Errors

| Error Type                         | Status Code | Content Type     |
| ---------------------------------- | ----------- | ---------------- |
| errors.BadRequestResponseError     | 400         | application/json |
| errors.UnauthorizedResponseError   | 401         | application/json |
| errors.ForbiddenResponseError      | 403         | application/json |
| errors.InternalServerResponseError | 500         | application/json |
| errors.OpenRouterDefaultError      | 4XX, 5XX    | \*/\*            |

## delete

Delete an existing guardrail. [Management key](/docs/guides/overview/auth/management-api-keys) required.

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

    res = open_router.guardrails.delete(id="550e8400-e29b-41d4-a716-446655440000")

    # Handle response
    print(res)

```

### Parameters

| Parameter                  | Type                                                               | Required             | Description                                                                                                                                                 | Example                              |
| -------------------------- | ------------------------------------------------------------------ | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| `id`                       | *str*                                                              | :heavy\_check\_mark: | The unique identifier of the guardrail to delete                                                                                                            | 550e8400-e29b-41d4-a716-446655440000 |
| `http_referer`             | *Optional\[str]*                                                   | :heavy\_minus\_sign: | The app identifier should be your app's URL and is used as the primary identifier for rankings.<br />This is used to track API usage per application.<br /> |                                      |
| `x_open_router_title`      | *Optional\[str]*                                                   | :heavy\_minus\_sign: | The app display name allows you to customize how your app appears in OpenRouter's dashboard.<br />                                                          |                                      |
| `x_open_router_categories` | *Optional\[str]*                                                   | :heavy\_minus\_sign: | Comma-separated list of app categories (e.g. "cli-agent,cloud-agent"). Used for marketplace rankings.<br />                                                 |                                      |
| `retries`                  | [Optional\[utils.RetryConfig\]](../../models/utils/retryconfig.md) | :heavy\_minus\_sign: | Configuration to override the default retry behavior of the client.                                                                                         |                                      |

### Response

**[components.DeleteGuardrailResponse](/docs/sdks/python/api-reference/components/deleteguardrailresponse)**

### Errors

| Error Type                         | Status Code | Content Type     |
| ---------------------------------- | ----------- | ---------------- |
| errors.UnauthorizedResponseError   | 401         | application/json |
| errors.NotFoundResponseError       | 404         | application/json |
| errors.InternalServerResponseError | 500         | application/json |
| errors.OpenRouterDefaultError      | 4XX, 5XX    | \*/\*            |

## get

Get a single guardrail by ID. [Management key](/docs/guides/overview/auth/management-api-keys) required.

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

    res = open_router.guardrails.get(id="550e8400-e29b-41d4-a716-446655440000")

    # Handle response
    print(res)

```

### Parameters

| Parameter                  | Type                                                               | Required             | Description                                                                                                                                                 | Example                              |
| -------------------------- | ------------------------------------------------------------------ | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| `id`                       | *str*                                                              | :heavy\_check\_mark: | The unique identifier of the guardrail to retrieve                                                                                                          | 550e8400-e29b-41d4-a716-446655440000 |
| `http_referer`             | *Optional\[str]*                                                   | :heavy\_minus\_sign: | The app identifier should be your app's URL and is used as the primary identifier for rankings.<br />This is used to track API usage per application.<br /> |                                      |
| `x_open_router_title`      | *Optional\[str]*                                                   | :heavy\_minus\_sign: | The app display name allows you to customize how your app appears in OpenRouter's dashboard.<br />                                                          |                                      |
| `x_open_router_categories` | *Optional\[str]*                                                   | :heavy\_minus\_sign: | Comma-separated list of app categories (e.g. "cli-agent,cloud-agent"). Used for marketplace rankings.<br />                                                 |                                      |
| `retries`                  | [Optional\[utils.RetryConfig\]](../../models/utils/retryconfig.md) | :heavy\_minus\_sign: | Configuration to override the default retry behavior of the client.                                                                                         |                                      |

### Response

**[components.GetGuardrailResponse](/docs/sdks/python/api-reference/components/getguardrailresponse)**

### Errors

| Error Type                         | Status Code | Content Type     |
| ---------------------------------- | ----------- | ---------------- |
| errors.UnauthorizedResponseError   | 401         | application/json |
| errors.NotFoundResponseError       | 404         | application/json |
| errors.InternalServerResponseError | 500         | application/json |
| errors.OpenRouterDefaultError      | 4XX, 5XX    | \*/\*            |

## update

Update an existing guardrail. [Management key](/docs/guides/overview/auth/management-api-keys) required.

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

    res = open_router.guardrails.update(id="550e8400-e29b-41d4-a716-446655440000", description="Updated description", limit_usd=75, name="Updated Guardrail Name", reset_interval="weekly")

    # Handle response
    print(res)

```

### Parameters

| Parameter                  | Type                                                                                                                          | Required             | Description                                                                                                                                                                                                                                                                                                                                                                             | Example                                                               |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| `id`                       | *str*                                                                                                                         | :heavy\_check\_mark: | The unique identifier of the guardrail to update                                                                                                                                                                                                                                                                                                                                        | 550e8400-e29b-41d4-a716-446655440000                                  |
| `http_referer`             | *Optional\[str]*                                                                                                              | :heavy\_minus\_sign: | The app identifier should be your app's URL and is used as the primary identifier for rankings.<br />This is used to track API usage per application.<br />                                                                                                                                                                                                                             |                                                                       |
| `x_open_router_title`      | *Optional\[str]*                                                                                                              | :heavy\_minus\_sign: | The app display name allows you to customize how your app appears in OpenRouter's dashboard.<br />                                                                                                                                                                                                                                                                                      |                                                                       |
| `x_open_router_categories` | *Optional\[str]*                                                                                                              | :heavy\_minus\_sign: | Comma-separated list of app categories (e.g. "cli-agent,cloud-agent"). Used for marketplace rankings.<br />                                                                                                                                                                                                                                                                             |                                                                       |
| `allowed_models`           | List\[*str*]                                                                                                                  | :heavy\_minus\_sign: | Array of model identifiers (slug or canonical\_slug accepted)                                                                                                                                                                                                                                                                                                                           | \[<br />"openai/gpt-5.2"<br />]                                       |
| `allowed_providers`        | List\[*str*]                                                                                                                  | :heavy\_minus\_sign: | New list of allowed provider IDs                                                                                                                                                                                                                                                                                                                                                        | \[<br />"openai",<br />"anthropic",<br />"deepseek"<br />]            |
| `content_filter_builtins`  | List\[[components.ContentFilterBuiltinEntryInput](/docs/sdks/python/api-reference/components/contentfilterbuiltinentryinput)] | :heavy\_minus\_sign: | Builtin content filters to apply. Set to null to remove. The "flag" action is only supported for "regex-prompt-injection"; PII slugs (email, phone, ssn, credit-card, ip-address, person-name, address) accept "block" or "redact" only.                                                                                                                                                | \[<br />`{"action": "block","slug": "regex-prompt-injection"}`<br />] |
| `content_filters`          | List\[[components.ContentFilterEntry](/docs/sdks/python/api-reference/components/contentfilterentry)]                         | :heavy\_minus\_sign: | Custom regex content filters to apply. Set to null to remove.                                                                                                                                                                                                                                                                                                                           | `<nil>`                                                               |
| `description`              | *OptionalNullable\[str]*                                                                                                      | :heavy\_minus\_sign: | New description for the guardrail                                                                                                                                                                                                                                                                                                                                                       | Updated description                                                   |
| `enforce_zdr`              | *OptionalNullable\[bool]*                                                                                                     | :heavy\_minus\_sign: | : warning: \*\* DEPRECATED \*\*: This will be removed in a future release, please migrate away from it as soon as possible.<br /><br />Deprecated. Use enforce\_zdr\_anthropic, enforce\_zdr\_openai, enforce\_zdr\_google, and enforce\_zdr\_other instead. When provided, its value is copied into any of those per-provider fields that are not explicitly specified on the request. | true                                                                  |
| `enforce_zdr_anthropic`    | *OptionalNullable\[bool]*                                                                                                     | :heavy\_minus\_sign: | Whether to enforce zero data retention for Anthropic models. Falls back to enforce\_zdr when not provided.                                                                                                                                                                                                                                                                              | true                                                                  |
| `enforce_zdr_google`       | *OptionalNullable\[bool]*                                                                                                     | :heavy\_minus\_sign: | Whether to enforce zero data retention for Google models. Falls back to enforce\_zdr when not provided.                                                                                                                                                                                                                                                                                 | true                                                                  |
| `enforce_zdr_openai`       | *OptionalNullable\[bool]*                                                                                                     | :heavy\_minus\_sign: | Whether to enforce zero data retention for OpenAI models. Falls back to enforce\_zdr when not provided.                                                                                                                                                                                                                                                                                 | true                                                                  |
| `enforce_zdr_other`        | *OptionalNullable\[bool]*                                                                                                     | :heavy\_minus\_sign: | Whether to enforce zero data retention for models that are not from Anthropic, OpenAI, or Google. Falls back to enforce\_zdr when not provided.                                                                                                                                                                                                                                         | true                                                                  |
| `ignored_models`           | List\[*str*]                                                                                                                  | :heavy\_minus\_sign: | Array of model identifiers to exclude from routing (slug or canonical\_slug accepted)                                                                                                                                                                                                                                                                                                   | \[<br />"openai/gpt-4o-mini"<br />]                                   |
| `ignored_providers`        | List\[*str*]                                                                                                                  | :heavy\_minus\_sign: | List of provider IDs to exclude from routing                                                                                                                                                                                                                                                                                                                                            | \[<br />"azure"<br />]                                                |
| `limit_usd`                | *OptionalNullable\[float]*                                                                                                    | :heavy\_minus\_sign: | New spending limit in USD                                                                                                                                                                                                                                                                                                                                                               | 75                                                                    |
| `name`                     | *Optional\[str]*                                                                                                              | :heavy\_minus\_sign: | New name for the guardrail                                                                                                                                                                                                                                                                                                                                                              | Updated Guardrail Name                                                |
| `reset_interval`           | [OptionalNullable\[components.GuardrailInterval\]](../../components/guardrailinterval.md)                                     | :heavy\_minus\_sign: | Interval at which the limit resets (daily, weekly, monthly)                                                                                                                                                                                                                                                                                                                             | monthly                                                               |
| `retries`                  | [Optional\[utils.RetryConfig\]](../../models/utils/retryconfig.md)                                                            | :heavy\_minus\_sign: | Configuration to override the default retry behavior of the client.                                                                                                                                                                                                                                                                                                                     |                                                                       |

### Response

**[components.UpdateGuardrailResponse](/docs/sdks/python/api-reference/components/updateguardrailresponse)**

### Errors

| Error Type                         | Status Code | Content Type     |
| ---------------------------------- | ----------- | ---------------- |
| errors.BadRequestResponseError     | 400         | application/json |
| errors.UnauthorizedResponseError   | 401         | application/json |
| errors.NotFoundResponseError       | 404         | application/json |
| errors.InternalServerResponseError | 500         | application/json |
| errors.OpenRouterDefaultError      | 4XX, 5XX    | \*/\*            |

## list\_guardrail\_key\_assignments

List all API key assignments for a specific guardrail. [Management key](/docs/guides/overview/auth/management-api-keys) required.

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

    res = open_router.guardrails.list_guardrail_key_assignments(id="550e8400-e29b-41d4-a716-446655440000")

    while res is not None:
        # Handle items

        res = res.next()

```

### Parameters

| Parameter                  | Type                                                               | Required             | Description                                                                                                                                                 | Example                              |
| -------------------------- | ------------------------------------------------------------------ | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| `id`                       | *str*                                                              | :heavy\_check\_mark: | The unique identifier of the guardrail                                                                                                                      | 550e8400-e29b-41d4-a716-446655440000 |
| `http_referer`             | *Optional\[str]*                                                   | :heavy\_minus\_sign: | The app identifier should be your app's URL and is used as the primary identifier for rankings.<br />This is used to track API usage per application.<br /> |                                      |
| `x_open_router_title`      | *Optional\[str]*                                                   | :heavy\_minus\_sign: | The app display name allows you to customize how your app appears in OpenRouter's dashboard.<br />                                                          |                                      |
| `x_open_router_categories` | *Optional\[str]*                                                   | :heavy\_minus\_sign: | Comma-separated list of app categories (e.g. "cli-agent,cloud-agent"). Used for marketplace rankings.<br />                                                 |                                      |
| `offset`                   | *Optional\[int]*                                                   | :heavy\_minus\_sign: | Number of records to skip for pagination                                                                                                                    | 0                                    |
| `limit`                    | *Optional\[int]*                                                   | :heavy\_minus\_sign: | Maximum number of records to return (max 100)                                                                                                               | 50                                   |
| `retries`                  | [Optional\[utils.RetryConfig\]](../../models/utils/retryconfig.md) | :heavy\_minus\_sign: | Configuration to override the default retry behavior of the client.                                                                                         |                                      |

### Response

**[operations.ListGuardrailKeyAssignmentsResponse](/docs/sdks/python/api-reference/operations/listguardrailkeyassignmentsresponse)**

### Errors

| Error Type                         | Status Code | Content Type     |
| ---------------------------------- | ----------- | ---------------- |
| errors.UnauthorizedResponseError   | 401         | application/json |
| errors.NotFoundResponseError       | 404         | application/json |
| errors.InternalServerResponseError | 500         | application/json |
| errors.OpenRouterDefaultError      | 4XX, 5XX    | \*/\*            |

## bulk\_assign\_keys

Assign multiple API keys to a specific guardrail. [Management key](/docs/guides/overview/auth/management-api-keys) required.

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

    res = open_router.guardrails.bulk_assign_keys(id="550e8400-e29b-41d4-a716-446655440000", key_hashes=[
        "c56454edb818d6b14bc0d61c46025f1450b0f4012d12304ab40aacb519fcbc93",
    ])

    # Handle response
    print(res)

```

### Parameters

| Parameter                  | Type                                                               | Required             | Description                                                                                                                                                 | Example                                                                           |
| -------------------------- | ------------------------------------------------------------------ | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `id`                       | *str*                                                              | :heavy\_check\_mark: | The unique identifier of the guardrail                                                                                                                      | 550e8400-e29b-41d4-a716-446655440000                                              |
| `key_hashes`               | List\[*str*]                                                       | :heavy\_check\_mark: | Array of API key hashes to assign to the guardrail                                                                                                          | \[<br />"c56454edb818d6b14bc0d61c46025f1450b0f4012d12304ab40aacb519fcbc93"<br />] |
| `http_referer`             | *Optional\[str]*                                                   | :heavy\_minus\_sign: | The app identifier should be your app's URL and is used as the primary identifier for rankings.<br />This is used to track API usage per application.<br /> |                                                                                   |
| `x_open_router_title`      | *Optional\[str]*                                                   | :heavy\_minus\_sign: | The app display name allows you to customize how your app appears in OpenRouter's dashboard.<br />                                                          |                                                                                   |
| `x_open_router_categories` | *Optional\[str]*                                                   | :heavy\_minus\_sign: | Comma-separated list of app categories (e.g. "cli-agent,cloud-agent"). Used for marketplace rankings.<br />                                                 |                                                                                   |
| `retries`                  | [Optional\[utils.RetryConfig\]](../../models/utils/retryconfig.md) | :heavy\_minus\_sign: | Configuration to override the default retry behavior of the client.                                                                                         |                                                                                   |

### Response

**[components.BulkAssignKeysResponse](/docs/sdks/python/api-reference/components/bulkassignkeysresponse)**

### Errors

| Error Type                         | Status Code | Content Type     |
| ---------------------------------- | ----------- | ---------------- |
| errors.BadRequestResponseError     | 400         | application/json |
| errors.UnauthorizedResponseError   | 401         | application/json |
| errors.NotFoundResponseError       | 404         | application/json |
| errors.InternalServerResponseError | 500         | application/json |
| errors.OpenRouterDefaultError      | 4XX, 5XX    | \*/\*            |

## bulk\_unassign\_keys

Unassign multiple API keys from a specific guardrail. [Management key](/docs/guides/overview/auth/management-api-keys) required.

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

    res = open_router.guardrails.bulk_unassign_keys(id="550e8400-e29b-41d4-a716-446655440000", key_hashes=[
        "c56454edb818d6b14bc0d61c46025f1450b0f4012d12304ab40aacb519fcbc93",
    ])

    # Handle response
    print(res)

```

### Parameters

| Parameter                  | Type                                                               | Required             | Description                                                                                                                                                 | Example                                                                           |
| -------------------------- | ------------------------------------------------------------------ | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `id`                       | *str*                                                              | :heavy\_check\_mark: | The unique identifier of the guardrail                                                                                                                      | 550e8400-e29b-41d4-a716-446655440000                                              |
| `key_hashes`               | List\[*str*]                                                       | :heavy\_check\_mark: | Array of API key hashes to unassign from the guardrail                                                                                                      | \[<br />"c56454edb818d6b14bc0d61c46025f1450b0f4012d12304ab40aacb519fcbc93"<br />] |
| `http_referer`             | *Optional\[str]*                                                   | :heavy\_minus\_sign: | The app identifier should be your app's URL and is used as the primary identifier for rankings.<br />This is used to track API usage per application.<br /> |                                                                                   |
| `x_open_router_title`      | *Optional\[str]*                                                   | :heavy\_minus\_sign: | The app display name allows you to customize how your app appears in OpenRouter's dashboard.<br />                                                          |                                                                                   |
| `x_open_router_categories` | *Optional\[str]*                                                   | :heavy\_minus\_sign: | Comma-separated list of app categories (e.g. "cli-agent,cloud-agent"). Used for marketplace rankings.<br />                                                 |                                                                                   |
| `retries`                  | [Optional\[utils.RetryConfig\]](../../models/utils/retryconfig.md) | :heavy\_minus\_sign: | Configuration to override the default retry behavior of the client.                                                                                         |                                                                                   |

### Response

**[components.BulkUnassignKeysResponse](/docs/sdks/python/api-reference/components/bulkunassignkeysresponse)**

### Errors

| Error Type                         | Status Code | Content Type     |
| ---------------------------------- | ----------- | ---------------- |
| errors.BadRequestResponseError     | 400         | application/json |
| errors.UnauthorizedResponseError   | 401         | application/json |
| errors.NotFoundResponseError       | 404         | application/json |
| errors.InternalServerResponseError | 500         | application/json |
| errors.OpenRouterDefaultError      | 4XX, 5XX    | \*/\*            |

## list\_guardrail\_member\_assignments

List all organization member assignments for a specific guardrail. [Management key](/docs/guides/overview/auth/management-api-keys) required.

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

    res = open_router.guardrails.list_guardrail_member_assignments(id="550e8400-e29b-41d4-a716-446655440000")

    while res is not None:
        # Handle items

        res = res.next()

```

### Parameters

| Parameter                  | Type                                                               | Required             | Description                                                                                                                                                 | Example                              |
| -------------------------- | ------------------------------------------------------------------ | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| `id`                       | *str*                                                              | :heavy\_check\_mark: | The unique identifier of the guardrail                                                                                                                      | 550e8400-e29b-41d4-a716-446655440000 |
| `http_referer`             | *Optional\[str]*                                                   | :heavy\_minus\_sign: | The app identifier should be your app's URL and is used as the primary identifier for rankings.<br />This is used to track API usage per application.<br /> |                                      |
| `x_open_router_title`      | *Optional\[str]*                                                   | :heavy\_minus\_sign: | The app display name allows you to customize how your app appears in OpenRouter's dashboard.<br />                                                          |                                      |
| `x_open_router_categories` | *Optional\[str]*                                                   | :heavy\_minus\_sign: | Comma-separated list of app categories (e.g. "cli-agent,cloud-agent"). Used for marketplace rankings.<br />                                                 |                                      |
| `offset`                   | *Optional\[int]*                                                   | :heavy\_minus\_sign: | Number of records to skip for pagination                                                                                                                    | 0                                    |
| `limit`                    | *Optional\[int]*                                                   | :heavy\_minus\_sign: | Maximum number of records to return (max 100)                                                                                                               | 50                                   |
| `retries`                  | [Optional\[utils.RetryConfig\]](../../models/utils/retryconfig.md) | :heavy\_minus\_sign: | Configuration to override the default retry behavior of the client.                                                                                         |                                      |

### Response

**[operations.ListGuardrailMemberAssignmentsResponse](/docs/sdks/python/api-reference/operations/listguardrailmemberassignmentsresponse)**

### Errors

| Error Type                         | Status Code | Content Type     |
| ---------------------------------- | ----------- | ---------------- |
| errors.UnauthorizedResponseError   | 401         | application/json |
| errors.NotFoundResponseError       | 404         | application/json |
| errors.InternalServerResponseError | 500         | application/json |
| errors.OpenRouterDefaultError      | 4XX, 5XX    | \*/\*            |

## bulk\_assign\_members

Assign multiple organization members to a specific guardrail. [Management key](/docs/guides/overview/auth/management-api-keys) required.

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

    res = open_router.guardrails.bulk_assign_members(id="550e8400-e29b-41d4-a716-446655440000", member_user_ids=[
        "user_abc123",
        "user_def456",
    ])

    # Handle response
    print(res)

```

### Parameters

| Parameter                  | Type                                                               | Required             | Description                                                                                                                                                 | Example                                            |
| -------------------------- | ------------------------------------------------------------------ | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| `id`                       | *str*                                                              | :heavy\_check\_mark: | The unique identifier of the guardrail                                                                                                                      | 550e8400-e29b-41d4-a716-446655440000               |
| `member_user_ids`          | List\[*str*]                                                       | :heavy\_check\_mark: | Array of member user IDs to assign to the guardrail                                                                                                         | \[<br />"user\_abc123",<br />"user\_def456"<br />] |
| `http_referer`             | *Optional\[str]*                                                   | :heavy\_minus\_sign: | The app identifier should be your app's URL and is used as the primary identifier for rankings.<br />This is used to track API usage per application.<br /> |                                                    |
| `x_open_router_title`      | *Optional\[str]*                                                   | :heavy\_minus\_sign: | The app display name allows you to customize how your app appears in OpenRouter's dashboard.<br />                                                          |                                                    |
| `x_open_router_categories` | *Optional\[str]*                                                   | :heavy\_minus\_sign: | Comma-separated list of app categories (e.g. "cli-agent,cloud-agent"). Used for marketplace rankings.<br />                                                 |                                                    |
| `retries`                  | [Optional\[utils.RetryConfig\]](../../models/utils/retryconfig.md) | :heavy\_minus\_sign: | Configuration to override the default retry behavior of the client.                                                                                         |                                                    |

### Response

**[components.BulkAssignMembersResponse](/docs/sdks/python/api-reference/components/bulkassignmembersresponse)**

### Errors

| Error Type                         | Status Code | Content Type     |
| ---------------------------------- | ----------- | ---------------- |
| errors.BadRequestResponseError     | 400         | application/json |
| errors.UnauthorizedResponseError   | 401         | application/json |
| errors.NotFoundResponseError       | 404         | application/json |
| errors.InternalServerResponseError | 500         | application/json |
| errors.OpenRouterDefaultError      | 4XX, 5XX    | \*/\*            |

## bulk\_unassign\_members

Unassign multiple organization members from a specific guardrail. [Management key](/docs/guides/overview/auth/management-api-keys) required.

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

    res = open_router.guardrails.bulk_unassign_members(id="550e8400-e29b-41d4-a716-446655440000", member_user_ids=[
        "user_abc123",
        "user_def456",
    ])

    # Handle response
    print(res)

```

### Parameters

| Parameter                  | Type                                                               | Required             | Description                                                                                                                                                 | Example                                            |
| -------------------------- | ------------------------------------------------------------------ | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| `id`                       | *str*                                                              | :heavy\_check\_mark: | The unique identifier of the guardrail                                                                                                                      | 550e8400-e29b-41d4-a716-446655440000               |
| `member_user_ids`          | List\[*str*]                                                       | :heavy\_check\_mark: | Array of member user IDs to unassign from the guardrail                                                                                                     | \[<br />"user\_abc123",<br />"user\_def456"<br />] |
| `http_referer`             | *Optional\[str]*                                                   | :heavy\_minus\_sign: | The app identifier should be your app's URL and is used as the primary identifier for rankings.<br />This is used to track API usage per application.<br /> |                                                    |
| `x_open_router_title`      | *Optional\[str]*                                                   | :heavy\_minus\_sign: | The app display name allows you to customize how your app appears in OpenRouter's dashboard.<br />                                                          |                                                    |
| `x_open_router_categories` | *Optional\[str]*                                                   | :heavy\_minus\_sign: | Comma-separated list of app categories (e.g. "cli-agent,cloud-agent"). Used for marketplace rankings.<br />                                                 |                                                    |
| `retries`                  | [Optional\[utils.RetryConfig\]](../../models/utils/retryconfig.md) | :heavy\_minus\_sign: | Configuration to override the default retry behavior of the client.                                                                                         |                                                    |

### Response

**[components.BulkUnassignMembersResponse](/docs/sdks/python/api-reference/components/bulkunassignmembersresponse)**

### Errors

| Error Type                         | Status Code | Content Type     |
| ---------------------------------- | ----------- | ---------------- |
| errors.BadRequestResponseError     | 400         | application/json |
| errors.UnauthorizedResponseError   | 401         | application/json |
| errors.NotFoundResponseError       | 404         | application/json |
| errors.InternalServerResponseError | 500         | application/json |
| errors.OpenRouterDefaultError      | 4XX, 5XX    | \*/\*            |

## list\_key\_assignments

List all API key guardrail assignments for the authenticated user. [Management key](/docs/guides/overview/auth/management-api-keys) required.

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

    res = open_router.guardrails.list_key_assignments()

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

**[operations.ListKeyAssignmentsResponse](/docs/sdks/python/api-reference/operations/listkeyassignmentsresponse)**

### Errors

| Error Type                         | Status Code | Content Type     |
| ---------------------------------- | ----------- | ---------------- |
| errors.UnauthorizedResponseError   | 401         | application/json |
| errors.InternalServerResponseError | 500         | application/json |
| errors.OpenRouterDefaultError      | 4XX, 5XX    | \*/\*            |

## list\_member\_assignments

List all organization member guardrail assignments for the authenticated user. [Management key](/docs/guides/overview/auth/management-api-keys) required.

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

    res = open_router.guardrails.list_member_assignments()

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

**[operations.ListMemberAssignmentsResponse](/docs/sdks/python/api-reference/operations/listmemberassignmentsresponse)**

### Errors

| Error Type                         | Status Code | Content Type     |
| ---------------------------------- | ----------- | ---------------- |
| errors.UnauthorizedResponseError   | 401         | application/json |
| errors.InternalServerResponseError | 500         | application/json |
| errors.OpenRouterDefaultError      | 4XX, 5XX    | \*/\*            |