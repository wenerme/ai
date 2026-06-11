> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For full documentation content, see https://openrouter.ai/docs/llms-full.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://openrouter.ai/docs/_mcp/server.

# Beta.Analytics - Python SDK

The Python SDK and docs are currently in beta.
Report issues on [GitHub](https://github.com/OpenRouterTeam/python-sdk/issues).

## Overview

beta.Analytics endpoints

### Available Operations

* [get\_analytics\_meta](#get_analytics_meta) - Get available analytics metrics and dimensions
* [query\_analytics](#query_analytics) - Query analytics data

## get\_analytics\_meta

Returns the available metrics, dimensions, filter operators, and granularities for the analytics query endpoint. [Management key](/docs/guides/overview/auth/management-api-keys) required.

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

    res = open_router.beta.analytics.get_analytics_meta()

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

**[operations.GetAnalyticsMetaResponse](/docs/sdks/python/api-reference/operations/getanalyticsmetaresponse)**

### Errors

| Error Type                         | Status Code | Content Type     |
| ---------------------------------- | ----------- | ---------------- |
| errors.UnauthorizedResponseError   | 401         | application/json |
| errors.ForbiddenResponseError      | 403         | application/json |
| errors.InternalServerResponseError | 500         | application/json |
| errors.OpenRouterDefaultError      | 4XX, 5XX    | \*/\*            |

## query\_analytics

Execute an analytics query with specified metrics, dimensions, filters, and time range. [Management key](/docs/guides/overview/auth/management-api-keys) required.

### Example Usage

```python
from openrouter import OpenRouter
from openrouter.utils import parse_datetime
import os

with OpenRouter(
    http_referer="<value>",
    x_open_router_title="<value>",
    x_open_router_categories="<value>",
    api_key=os.getenv("OPENROUTER_API_KEY", ""),
) as open_router:

    res = open_router.beta.analytics.query_analytics(metrics=[
        "request_count",
    ], dimensions=[
        "model",
    ], granularity="day", limit=100, time_range={
        "end": parse_datetime("2025-01-08T00:00:00Z"),
        "start": parse_datetime("2025-01-01T00:00:00Z"),
    })

    # Handle response
    print(res)

```

### Parameters

| Parameter                  | Type                                                                           | Required             | Description                                                                                                                                                                                                                                                                                                                                                     | Example |
| -------------------------- | ------------------------------------------------------------------------------ | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `metrics`                  | List\[*str*]                                                                   | :heavy\_check\_mark: | N/A                                                                                                                                                                                                                                                                                                                                                             |         |
| `http_referer`             | *Optional\[str]*                                                               | :heavy\_minus\_sign: | The app identifier should be your app's URL and is used as the primary identifier for rankings.<br />This is used to track API usage per application.<br />                                                                                                                                                                                                     |         |
| `x_open_router_title`      | *Optional\[str]*                                                               | :heavy\_minus\_sign: | The app display name allows you to customize how your app appears in OpenRouter's dashboard.<br />                                                                                                                                                                                                                                                              |         |
| `x_open_router_categories` | *Optional\[str]*                                                               | :heavy\_minus\_sign: | Comma-separated list of app categories (e.g. "cli-agent,cloud-agent"). Used for marketplace rankings.<br />                                                                                                                                                                                                                                                     |         |
| `dimensions`               | List\[*str*]                                                                   | :heavy\_minus\_sign: | N/A                                                                                                                                                                                                                                                                                                                                                             |         |
| `filters`                  | List\[[operations.Filter](/docs/sdks/python/api-reference/operations/filter_)] | :heavy\_minus\_sign: | N/A                                                                                                                                                                                                                                                                                                                                                             |         |
| `granularity`              | *Optional\[str]*                                                               | :heavy\_minus\_sign: | Time granularity                                                                                                                                                                                                                                                                                                                                                | day     |
| `group_limit`              | *Optional\[int]*                                                               | :heavy\_minus\_sign: | Maximum rows per distinct combination of dimensions (ClickHouse LIMIT n BY). When omitted on time-series queries (granularity + dimensions), auto-computed to avoid truncating time windows. Explicit values override the default and may truncate time buckets if set lower than the number of buckets in the range. Ignored when no dimensions are specified. | 100     |
| `limit`                    | *Optional\[int]*                                                               | :heavy\_minus\_sign: | Maximum total rows returned. Defaults to 1000. On time-series queries with dimensions and no explicit group\_limit, the server may raise this to accommodate the expected number of unique time-bucket/dimension combinations.                                                                                                                                  |         |
| `order_by`                 | [Optional\[operations.OrderBy\]](../../operations/orderby.md)                  | :heavy\_minus\_sign: | N/A                                                                                                                                                                                                                                                                                                                                                             |         |
| `time_range`               | [Optional\[operations.TimeRange\]](../../operations/timerange.md)              | :heavy\_minus\_sign: | N/A                                                                                                                                                                                                                                                                                                                                                             |         |
| `retries`                  | [Optional\[utils.RetryConfig\]](../../models/utils/retryconfig.md)             | :heavy\_minus\_sign: | Configuration to override the default retry behavior of the client.                                                                                                                                                                                                                                                                                             |         |

### Response

**[operations.QueryAnalyticsResponse](/docs/sdks/python/api-reference/operations/queryanalyticsresponse)**

### Errors

| Error Type                         | Status Code | Content Type     |
| ---------------------------------- | ----------- | ---------------- |
| errors.BadRequestResponseError     | 400         | application/json |
| errors.UnauthorizedResponseError   | 401         | application/json |
| errors.ForbiddenResponseError      | 403         | application/json |
| errors.RequestTimeoutResponseError | 408         | application/json |
| errors.InternalServerResponseError | 500         | application/json |
| errors.OpenRouterDefaultError      | 4XX, 5XX    | \*/\*            |