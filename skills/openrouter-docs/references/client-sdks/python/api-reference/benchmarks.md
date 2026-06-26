> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://openrouter.ai/docs/_mcp/server.

# Benchmarks - Python SDK

## Overview

Benchmarks endpoints

### Available Operations

* [get\_benchmarks](#get_benchmarks) - List Benchmarks

## get\_benchmarks

Unified benchmark endpoint that aggregates scores from multiple benchmark sources (Artificial Analysis, Design Arena). Filter by source to reproduce the exact shapes from the legacy per-source endpoints, or use task\_type to find models suited for specific workloads. Authenticate with any valid OpenRouter API key. Rate-limited to 30 requests/minute per key and 500 requests/day per account.

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

    res = open_router.benchmarks.get_benchmarks()

    # Handle response
    print(res)

```

### Parameters

| Parameter                  | Type                                                               | Required             | Description                                                                                                                                                                     | Example             |
| -------------------------- | ------------------------------------------------------------------ | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| `http_referer`             | *Optional\[str]*                                                   | :heavy\_minus\_sign: | The app identifier should be your app's URL and is used as the primary identifier for rankings.<br />This is used to track API usage per application.<br />                     |                     |
| `x_open_router_title`      | *Optional\[str]*                                                   | :heavy\_minus\_sign: | The app display name allows you to customize how your app appears in OpenRouter's dashboard.<br />                                                                              |                     |
| `x_open_router_categories` | *Optional\[str]*                                                   | :heavy\_minus\_sign: | Comma-separated list of app categories (e.g. "cli-agent,cloud-agent"). Used for marketplace rankings.<br />                                                                     |                     |
| `source`                   | [Optional\[operations.Source\]](../../operations/source.md)        | :heavy\_minus\_sign: | Benchmark source to query. Determines the shape of the returned items. When omitted, returns results from all sources.                                                          | artificial-analysis |
| `task_type`                | [Optional\[operations.TaskType\]](../../operations/tasktype.md)    | :heavy\_minus\_sign: | Filter results by task type. For Artificial Analysis, maps to the corresponding index. For Design Arena, maps to the matching category.                                         | coding              |
| `arena`                    | [Optional\[operations.Arena\]](../../operations/arena.md)          | :heavy\_minus\_sign: | Design Arena only: arena to query. Defaults to `models` when source is `design-arena`.                                                                                          | models              |
| `category`                 | *Optional\[str]*                                                   | :heavy\_minus\_sign: | Design Arena only: category within the arena (e.g. `codecategories`, `uicomponent`, `gamedev`, `3d`, `dataviz`, `image`, `video`, `svg`). When omitted, returns all categories. | codecategories      |
| `max_results`              | *Optional\[int]*                                                   | :heavy\_minus\_sign: | Maximum number of items to return. When omitted, all matching results are returned.                                                                                             | 50                  |
| `retries`                  | [Optional\[utils.RetryConfig\]](../../models/utils/retryconfig.md) | :heavy\_minus\_sign: | Configuration to override the default retry behavior of the client.                                                                                                             |                     |

### Response

**[components.UnifiedBenchmarksResponse](/docs/sdks/python/api-reference/components/unifiedbenchmarksresponse)**

### Errors

| Error Type                          | Status Code | Content Type     |
| ----------------------------------- | ----------- | ---------------- |
| errors.BadRequestResponseError      | 400         | application/json |
| errors.UnauthorizedResponseError    | 401         | application/json |
| errors.TooManyRequestsResponseError | 429         | application/json |
| errors.InternalServerResponseError  | 500         | application/json |
| errors.OpenRouterDefaultError       | 4XX, 5XX    | \*/\*            |