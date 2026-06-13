> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://openrouter.ai/docs/_mcp/server.

# Datasets - Go SDK

The Go SDK and docs are currently in beta.
Report issues on [GitHub](https://github.com/OpenRouterTeam/go-sdk/issues).

## Overview

Datasets endpoints

### Available Operations

* [GetAppRankings](#getapprankings) - Top apps by token usage
* [GetBenchmarksArtificialAnalysis](#getbenchmarksartificialanalysis) - Artificial Analysis Benchmark Indices
* [GetBenchmarksDesignArena](#getbenchmarksdesignarena) - Design Arena Benchmark Rankings
* [GetRankingsDaily](#getrankingsdaily) - Daily token totals for top 50 models

## GetAppRankings

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

```go
package main

import(
	"context"
	"os"
	openrouter "github.com/OpenRouterTeam/go-sdk"
	"github.com/OpenRouterTeam/go-sdk/models/operations"
	"log"
)

func main() {
    ctx := context.Background()

    s := openrouter.New(
        openrouter.WithSecurity(os.Getenv("OPENROUTER_API_KEY")),
    )

    res, err := s.Datasets.GetAppRankings(ctx, &operations.GetAppRankingsRequest{})
    if err != nil {
        log.Fatal(err)
    }
    if res != nil {
        for {
            // handle items

            res, err = res.Next()

            if err != nil {
                // handle error
            }

            if res == nil {
                break
            }
        }
    }
}
```

### Parameters

| Parameter | Type                                                                                             | Required             | Description                                |
| --------- | ------------------------------------------------------------------------------------------------ | -------------------- | ------------------------------------------ |
| `ctx`     | [context.Context](https://pkg.go.dev/context#Context)                                            | :heavy\_check\_mark: | The context to use for the request.        |
| `request` | [operations.GetAppRankingsRequest](/docs/sdks/go/api-reference/operations/getapprankingsrequest) | :heavy\_check\_mark: | The request object to use for the request. |
| `opts`    | \[][operations.Option](/docs/sdks/go/api-reference/operations/option)                            | :heavy\_minus\_sign: | The options for this request.              |

### Response

**[\*operations.GetAppRankingsResponse](/docs/sdks/go/api-reference/operations/getapprankingsresponse), error**

### Errors

| Error Type                             | Status Code | Content Type     |
| -------------------------------------- | ----------- | ---------------- |
| sdkerrors.BadRequestResponseError      | 400         | application/json |
| sdkerrors.UnauthorizedResponseError    | 401         | application/json |
| sdkerrors.TooManyRequestsResponseError | 429         | application/json |
| sdkerrors.InternalServerResponseError  | 500         | application/json |
| sdkerrors.APIError                     | 4XX, 5XX    | \*/\*            |

## GetBenchmarksArtificialAnalysis

Returns composite index scores (Intelligence, Coding, Agentic) from Artificial Analysis for LLM models. Includes OpenRouter pricing per model. Authenticate with any valid OpenRouter API key. Rate-limited to 30 requests/minute per key and 500 requests/day per account.

### Example Usage

```go
package main

import(
	"context"
	"os"
	openrouter "github.com/OpenRouterTeam/go-sdk"
	"log"
)

func main() {
    ctx := context.Background()

    s := openrouter.New(
        openrouter.WithSecurity(os.Getenv("OPENROUTER_API_KEY")),
    )

    res, err := s.Datasets.GetBenchmarksArtificialAnalysis(ctx, openrouter.Pointer[int64](20))
    if err != nil {
        log.Fatal(err)
    }
    if res != nil {
        // handle response
    }
}
```

### Parameters

| Parameter    | Type                                                                  | Required             | Description                                | Example |
| ------------ | --------------------------------------------------------------------- | -------------------- | ------------------------------------------ | ------- |
| `ctx`        | [context.Context](https://pkg.go.dev/context#Context)                 | :heavy\_check\_mark: | The context to use for the request.        |         |
| `maxResults` | `*int64`                                                              | :heavy\_minus\_sign: | Max results to return (1–100, default 50). | 20      |
| `opts`       | \[][operations.Option](/docs/sdks/go/api-reference/operations/option) | :heavy\_minus\_sign: | The options for this request.              |         |

### Response

**[\*components.BenchmarksAAResponse](/docs/sdks/go/api-reference/models/benchmarksaaresponse), error**

### Errors

| Error Type                             | Status Code | Content Type     |
| -------------------------------------- | ----------- | ---------------- |
| sdkerrors.BadRequestResponseError      | 400         | application/json |
| sdkerrors.UnauthorizedResponseError    | 401         | application/json |
| sdkerrors.TooManyRequestsResponseError | 429         | application/json |
| sdkerrors.InternalServerResponseError  | 500         | application/json |
| sdkerrors.APIError                     | 4XX, 5XX    | \*/\*            |

## GetBenchmarksDesignArena

Returns ELO ratings from head-to-head arena battles on Design Arena. Filterable by arena (models/builders/agents) and category. Includes OpenRouter pricing per model. Authenticate with any valid OpenRouter API key. Rate-limited to 30 requests/minute per key and 500 requests/day per account.

### Example Usage

```go
package main

import(
	"context"
	"os"
	openrouter "github.com/OpenRouterTeam/go-sdk"
	"github.com/OpenRouterTeam/go-sdk/models/operations"
	"log"
)

func main() {
    ctx := context.Background()

    s := openrouter.New(
        openrouter.WithSecurity(os.Getenv("OPENROUTER_API_KEY")),
    )

    res, err := s.Datasets.GetBenchmarksDesignArena(ctx, operations.ArenaModels.ToPointer(), nil, openrouter.Pointer[int64](20))
    if err != nil {
        log.Fatal(err)
    }
    if res != nil {
        // handle response
    }
}
```

### Parameters

| Parameter    | Type                                                                  | Required             | Description                                                                                                                                                  | Example        |
| ------------ | --------------------------------------------------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------- |
| `ctx`        | [context.Context](https://pkg.go.dev/context#Context)                 | :heavy\_check\_mark: | The context to use for the request.                                                                                                                          |                |
| `arena`      | [\*operations.Arena](/docs/sdks/go/api-reference/operations/arena)    | :heavy\_minus\_sign: | Arena to query. Defaults to `models`.                                                                                                                        | models         |
| `category`   | `*string`                                                             | :heavy\_minus\_sign: | Category within the arena (e.g. `codecategories`, `uicomponent`, `gamedev`, `3d`, `dataviz`, `image`, `video`, `svg`). When omitted, returns all categories. | codecategories |
| `maxResults` | `*int64`                                                              | :heavy\_minus\_sign: | Max results to return: per category when no category filter is applied (1–100, default 50).                                                                  | 20             |
| `opts`       | \[][operations.Option](/docs/sdks/go/api-reference/operations/option) | :heavy\_minus\_sign: | The options for this request.                                                                                                                                |                |

### Response

**[\*components.BenchmarksDAResponse](/docs/sdks/go/api-reference/models/benchmarksdaresponse), error**

### Errors

| Error Type                             | Status Code | Content Type     |
| -------------------------------------- | ----------- | ---------------- |
| sdkerrors.BadRequestResponseError      | 400         | application/json |
| sdkerrors.UnauthorizedResponseError    | 401         | application/json |
| sdkerrors.TooManyRequestsResponseError | 429         | application/json |
| sdkerrors.InternalServerResponseError  | 500         | application/json |
| sdkerrors.APIError                     | 4XX, 5XX    | \*/\*            |

## GetRankingsDaily

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

```go
package main

import(
	"context"
	"os"
	openrouter "github.com/OpenRouterTeam/go-sdk"
	"log"
)

func main() {
    ctx := context.Background()

    s := openrouter.New(
        openrouter.WithSecurity(os.Getenv("OPENROUTER_API_KEY")),
    )

    res, err := s.Datasets.GetRankingsDaily(ctx, nil, nil)
    if err != nil {
        log.Fatal(err)
    }
    if res != nil {
        // handle response
    }
}
```

### Parameters

| Parameter   | Type                                                                  | Required             | Description                                                                                                                                                                                                                               | Example    |
| ----------- | --------------------------------------------------------------------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `ctx`       | [context.Context](https://pkg.go.dev/context#Context)                 | :heavy\_check\_mark: | The context to use for the request.                                                                                                                                                                                                       |            |
| `startDate` | `*string`                                                             | :heavy\_minus\_sign: | Start of the date window in YYYY-MM-DD (UTC), inclusive. Defaults to 30 days before `end_date`. The dataset begins at 2025-01-01; earlier values are clamped forward to that floor and the resolved value is echoed in `meta.start_date`. | 2026-04-12 |
| `endDate`   | `*string`                                                             | :heavy\_minus\_sign: | End of the date window in YYYY-MM-DD (UTC), inclusive. Defaults to the most recent completed UTC day. Must be on or after 2025-01-01; earlier values are rejected with a 400.                                                             | 2026-05-11 |
| `opts`      | \[][operations.Option](/docs/sdks/go/api-reference/operations/option) | :heavy\_minus\_sign: | The options for this request.                                                                                                                                                                                                             |            |

### Response

**[\*components.RankingsDailyResponse](/docs/sdks/go/api-reference/models/rankingsdailyresponse), error**

### Errors

| Error Type                             | Status Code | Content Type     |
| -------------------------------------- | ----------- | ---------------- |
| sdkerrors.BadRequestResponseError      | 400         | application/json |
| sdkerrors.UnauthorizedResponseError    | 401         | application/json |
| sdkerrors.TooManyRequestsResponseError | 429         | application/json |
| sdkerrors.InternalServerResponseError  | 500         | application/json |
| sdkerrors.APIError                     | 4XX, 5XX    | \*/\*            |