> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://openrouter.ai/docs/_mcp/server.

# Benchmarks - Go SDK

The Go SDK and docs are currently in beta.
Report issues on [GitHub](https://github.com/OpenRouterTeam/go-sdk/issues).

## Overview

Benchmarks endpoints

### Available Operations

* [GetBenchmarks](#getbenchmarks) - List Benchmarks

## GetBenchmarks

Unified benchmark endpoint that aggregates scores from multiple benchmark sources (Artificial Analysis, Design Arena). Filter by source to reproduce the exact shapes from the legacy per-source endpoints, or use task\_type to find models suited for specific workloads. Authenticate with any valid OpenRouter API key. Rate-limited to 30 requests/minute per key and 500 requests/day per account.

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

    res, err := s.Benchmarks.GetBenchmarks(ctx, nil)
    if err != nil {
        log.Fatal(err)
    }
    if res != nil {
        // handle response
    }
}
```

### Parameters

| Parameter | Type                                                                                           | Required             | Description                                |
| --------- | ---------------------------------------------------------------------------------------------- | -------------------- | ------------------------------------------ |
| `ctx`     | [context.Context](https://pkg.go.dev/context#Context)                                          | :heavy\_check\_mark: | The context to use for the request.        |
| `request` | [operations.GetBenchmarksRequest](/docs/sdks/go/api-reference/operations/getbenchmarksrequest) | :heavy\_check\_mark: | The request object to use for the request. |
| `opts`    | \[][operations.Option](/docs/sdks/go/api-reference/operations/option)                          | :heavy\_minus\_sign: | The options for this request.              |

### Response

**[\*components.UnifiedBenchmarksResponse](/docs/sdks/go/api-reference/models/unifiedbenchmarksresponse), error**

### Errors

| Error Type                             | Status Code | Content Type     |
| -------------------------------------- | ----------- | ---------------- |
| sdkerrors.BadRequestResponseError      | 400         | application/json |
| sdkerrors.UnauthorizedResponseError    | 401         | application/json |
| sdkerrors.TooManyRequestsResponseError | 429         | application/json |
| sdkerrors.InternalServerResponseError  | 500         | application/json |
| sdkerrors.APIError                     | 4XX, 5XX    | \*/\*            |