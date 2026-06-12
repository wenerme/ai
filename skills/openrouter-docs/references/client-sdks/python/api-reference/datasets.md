> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://openrouter.ai/docs/_mcp/server.

# Datasets - Python SDK

The Python SDK and docs are currently in beta.
Report issues on [GitHub](https://github.com/OpenRouterTeam/python-sdk/issues).

## Overview

Datasets endpoints

### Available Operations

* [get\_app\_rankings](#get_app_rankings) - Top apps by token usage
* [get\_benchmarks\_design\_arena](#get_benchmarks_design_arena) - Design Arena Benchmark Rankings
* [get\_rankings\_daily](#get_rankings_daily) - Daily token totals for top 50 models

## get\_app\_rankings

Returns the top public apps on OpenRouter ranked by token usage inside the requested
date window, matching the public apps marketplace on openrouter.ai/apps. Token totals
are `prompt_tokens + completion_tokens`; hidden and private apps are excluded and
traffic from related app aliases is merged into the canonical visible app.

`sort=popular` (default) ranks by total token volume inside the window.
`sort=trending` ranks by absolute excess token growth: window volume minus the average
volume of the three equal-length periods immediately preceding the window. Apps with
no excess growth are omitted, so `trending` may return fewer than `limit` rows.

Filter with `category` (marketplace category group, e.g. `coding`) or `subcategory`
(e.g. `cli-agent`). Ranks are re-numbered 1..N after filtering. Page with `offset` —
`rank` stays absolute, so the first row of `offset=50` is `rank: 51`.

Authenticate with any valid OpenRouter API key (same key used for inference).
Rate-limited to 30 requests/minute per key and 500 requests/day per account.

When republishing or quoting this dataset, OpenRouter must be cited as:
"Source: OpenRouter (openrouter.ai/apps), as of \{as\_of}."

Token counts come from each upstream provider's own tokenizer, so a token attributed
to one app is not directly comparable to a token attributed to another app whose
traffic flows through a different provider.

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

    res = open_router.datasets.get_app_rankings(sort="popular", limit=50, offset=0)

    while res is not None:
        # Handle items

        res = res.next()

```

### Parameters

| Parameter                  | Type                                                                                        | Required             | Description                                                                                                                                                                                                                                                                                          | Example    |
| -------------------------- | ------------------------------------------------------------------------------------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `http_referer`             | *Optional\[str]*                                                                            | :heavy\_minus\_sign: | The app identifier should be your app's URL and is used as the primary identifier for rankings.<br />This is used to track API usage per application.<br />                                                                                                                                          |            |
| `x_open_router_title`      | *Optional\[str]*                                                                            | :heavy\_minus\_sign: | The app display name allows you to customize how your app appears in OpenRouter's dashboard.<br />                                                                                                                                                                                                   |            |
| `x_open_router_categories` | *Optional\[str]*                                                                            | :heavy\_minus\_sign: | Comma-separated list of app categories (e.g. "cli-agent,cloud-agent"). Used for marketplace rankings.<br />                                                                                                                                                                                          |            |
| `category`                 | [Optional\[operations.GetAppRankingsCategory\]](../../operations/getapprankingscategory.md) | :heavy\_minus\_sign: | Marketplace category group to filter by (e.g. `coding`). Only apps tagged with a subcategory inside this group are returned. Mutually combinable with `subcategory` — when both are supplied the `subcategory` must belong to the `category` group.                                                  | coding     |
| `subcategory`              | [Optional\[operations.Subcategory\]](../../operations/subcategory.md)                       | :heavy\_minus\_sign: | Marketplace subcategory to filter by (e.g. `cli-agent`). Takes precedence over `category` for the actual filter; when `category` is also supplied the pair must be consistent.                                                                                                                       | cli-agent  |
| `sort`                     | [Optional\[operations.GetAppRankingsSort\]](../../operations/getapprankingssort.md)         | :heavy\_minus\_sign: | `popular` ranks apps by total token volume inside the date window. `trending` ranks apps by absolute excess token growth: window volume minus the average volume of the three equal-length periods immediately preceding the window. Apps with no excess growth are omitted from `trending` results. | popular    |
| `start_date`               | *Optional\[str]*                                                                            | :heavy\_minus\_sign: | Start of the date window in YYYY-MM-DD (UTC), inclusive. Defaults to 30 days before `end_date`. The dataset begins at 2025-01-01; earlier values are clamped forward to that floor and the resolved value is echoed in `meta.start_date`.                                                            | 2026-04-12 |
| `end_date`                 | *Optional\[str]*                                                                            | :heavy\_minus\_sign: | End of the date window in YYYY-MM-DD (UTC), inclusive. Defaults to the most recent completed UTC day. Must be on or after 2025-01-01; earlier values are rejected with a 400.                                                                                                                        | 2026-05-11 |
| `limit`                    | *Optional\[int]*                                                                            | :heavy\_minus\_sign: | Maximum number of apps to return (1-100). Defaults to 50.                                                                                                                                                                                                                                            | 50         |
| `offset`                   | *Optional\[int]*                                                                            | :heavy\_minus\_sign: | Number of ranked apps to skip before the first returned row (0-100). Defaults to 0. `rank` stays absolute, so the first row of `offset=50` is `rank: 51`.                                                                                                                                            | 0          |
| `retries`                  | [Optional\[utils.RetryConfig\]](../../models/utils/retryconfig.md)                          | :heavy\_minus\_sign: | Configuration to override the default retry behavior of the client.                                                                                                                                                                                                                                  |            |

### Response

**[operations.GetAppRankingsResponse](/docs/sdks/python/api-reference/operations/getapprankingsresponse)**

### Errors

| Error Type                          | Status Code | Content Type     |
| ----------------------------------- | ----------- | ---------------- |
| errors.BadRequestResponseError      | 400         | application/json |
| errors.UnauthorizedResponseError    | 401         | application/json |
| errors.TooManyRequestsResponseError | 429         | application/json |
| errors.InternalServerResponseError  | 500         | application/json |
| errors.OpenRouterDefaultError       | 4XX, 5XX    | \*/\*            |

## get\_benchmarks\_design\_arena

Returns ELO ratings from head-to-head arena battles on Design Arena. Filterable by arena (models/builders/agents) and category. Includes OpenRouter pricing per model. Authenticate with any valid OpenRouter API key. Rate-limited to 30 requests/minute per key and 500 requests/day per account.

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

    res = open_router.datasets.get_benchmarks_design_arena(arena="models", max_results=20)

    # Handle response
    print(res)

```

### Parameters

| Parameter                  | Type                                                               | Required             | Description                                                                                                                                                  | Example        |
| -------------------------- | ------------------------------------------------------------------ | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------- |
| `http_referer`             | *Optional\[str]*                                                   | :heavy\_minus\_sign: | The app identifier should be your app's URL and is used as the primary identifier for rankings.<br />This is used to track API usage per application.<br />  |                |
| `x_open_router_title`      | *Optional\[str]*                                                   | :heavy\_minus\_sign: | The app display name allows you to customize how your app appears in OpenRouter's dashboard.<br />                                                           |                |
| `x_open_router_categories` | *Optional\[str]*                                                   | :heavy\_minus\_sign: | Comma-separated list of app categories (e.g. "cli-agent,cloud-agent"). Used for marketplace rankings.<br />                                                  |                |
| `arena`                    | [Optional\[operations.Arena\]](../../operations/arena.md)          | :heavy\_minus\_sign: | Arena to query. Defaults to `models`.                                                                                                                        | models         |
| `category`                 | *Optional\[str]*                                                   | :heavy\_minus\_sign: | Category within the arena (e.g. `codecategories`, `uicomponent`, `gamedev`, `3d`, `dataviz`, `image`, `video`, `svg`). When omitted, returns all categories. | codecategories |
| `max_results`              | *Optional\[int]*                                                   | :heavy\_minus\_sign: | Max results to return: per category when no category filter is applied (1–100, default 50).                                                                  | 20             |
| `retries`                  | [Optional\[utils.RetryConfig\]](../../models/utils/retryconfig.md) | :heavy\_minus\_sign: | Configuration to override the default retry behavior of the client.                                                                                          |                |

### Response

**[components.BenchmarksDAResponse](/docs/sdks/python/api-reference/components/benchmarksdaresponse)**

### Errors

| Error Type                          | Status Code | Content Type     |
| ----------------------------------- | ----------- | ---------------- |
| errors.BadRequestResponseError      | 400         | application/json |
| errors.UnauthorizedResponseError    | 401         | application/json |
| errors.TooManyRequestsResponseError | 429         | application/json |
| errors.InternalServerResponseError  | 500         | application/json |
| errors.OpenRouterDefaultError       | 4XX, 5XX    | \*/\*            |

## get\_rankings\_daily

Returns the top 50 public models per day by total token usage on OpenRouter, plus a
single aggregated `other` row per day that sums every model outside that top 50.
Token totals are `prompt_tokens + completion_tokens`, matching the public rankings
chart on openrouter.ai/rankings.

Each row is a distinct `(date, model_permaslug)` pair. The `other` row uses the
reserved permaslug `other` and is always returned last within its date, so callers
can compute `top-50 traffic / total daily traffic` without a second request.

Authenticate with any valid OpenRouter API key (same key used for inference).
Rate-limited to 30 requests/minute per key and 500 requests/day per account.

When republishing or quoting this dataset, OpenRouter must be cited as:
"Source: OpenRouter (openrouter.ai/rankings), as of \{as\_of}."

Token counts come from each upstream provider's own tokenizer (Anthropic counts
are as reported by Anthropic, OpenAI counts are as reported by OpenAI, etc.), so
a token in one row is not directly comparable to a token in another row from a
different provider.

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

    res = open_router.datasets.get_rankings_daily()

    # Handle response
    print(res)

```

### Parameters

| Parameter                  | Type                                                               | Required             | Description                                                                                                                                                                                                                               | Example    |
| -------------------------- | ------------------------------------------------------------------ | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `http_referer`             | *Optional\[str]*                                                   | :heavy\_minus\_sign: | The app identifier should be your app's URL and is used as the primary identifier for rankings.<br />This is used to track API usage per application.<br />                                                                               |            |
| `x_open_router_title`      | *Optional\[str]*                                                   | :heavy\_minus\_sign: | The app display name allows you to customize how your app appears in OpenRouter's dashboard.<br />                                                                                                                                        |            |
| `x_open_router_categories` | *Optional\[str]*                                                   | :heavy\_minus\_sign: | Comma-separated list of app categories (e.g. "cli-agent,cloud-agent"). Used for marketplace rankings.<br />                                                                                                                               |            |
| `start_date`               | *Optional\[str]*                                                   | :heavy\_minus\_sign: | Start of the date window in YYYY-MM-DD (UTC), inclusive. Defaults to 30 days before `end_date`. The dataset begins at 2025-01-01; earlier values are clamped forward to that floor and the resolved value is echoed in `meta.start_date`. | 2026-04-12 |
| `end_date`                 | *Optional\[str]*                                                   | :heavy\_minus\_sign: | End of the date window in YYYY-MM-DD (UTC), inclusive. Defaults to the most recent completed UTC day. Must be on or after 2025-01-01; earlier values are rejected with a 400.                                                             | 2026-05-11 |
| `retries`                  | [Optional\[utils.RetryConfig\]](../../models/utils/retryconfig.md) | :heavy\_minus\_sign: | Configuration to override the default retry behavior of the client.                                                                                                                                                                       |            |

### Response

**[components.RankingsDailyResponse](/docs/sdks/python/api-reference/components/rankingsdailyresponse)**

### Errors

| Error Type                          | Status Code | Content Type     |
| ----------------------------------- | ----------- | ---------------- |
| errors.BadRequestResponseError      | 400         | application/json |
| errors.UnauthorizedResponseError    | 401         | application/json |
| errors.TooManyRequestsResponseError | 429         | application/json |
| errors.InternalServerResponseError  | 500         | application/json |
| errors.OpenRouterDefaultError       | 4XX, 5XX    | \*/\*            |