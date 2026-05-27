> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For full documentation content, see https://openrouter.ai/docs/llms-full.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://openrouter.ai/docs/_mcp/server.

# Datasets - Go SDK

The Go SDK and docs are currently in beta.
Report issues on [GitHub](https://github.com/OpenRouterTeam/go-sdk/issues).

## Overview

Datasets endpoints

### Available Operations

* [GetRankingsDaily](#getrankingsdaily) - Daily token totals for top 50 models

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