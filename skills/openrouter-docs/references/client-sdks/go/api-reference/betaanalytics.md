> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://openrouter.ai/docs/_mcp/server.

# Beta.Analytics - Go SDK

The Go SDK and docs are currently in beta.
Report issues on [GitHub](https://github.com/OpenRouterTeam/go-sdk/issues).

## Overview

beta.Analytics endpoints

### Available Operations

* [GetAnalyticsMeta](#getanalyticsmeta) - Get available analytics metrics and dimensions
* [QueryAnalytics](#queryanalytics) - Query analytics data

## GetAnalyticsMeta

Returns the available metrics, dimensions, filter operators, and granularities for the analytics query endpoint. [Management key](/docs/guides/overview/auth/management-api-keys) required.

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

    res, err := s.Beta.Analytics.GetAnalyticsMeta(ctx)
    if err != nil {
        log.Fatal(err)
    }
    if res != nil {
        // handle response
    }
}
```

### Parameters

| Parameter | Type                                                                  | Required             | Description                         |
| --------- | --------------------------------------------------------------------- | -------------------- | ----------------------------------- |
| `ctx`     | [context.Context](https://pkg.go.dev/context#Context)                 | :heavy\_check\_mark: | The context to use for the request. |
| `opts`    | \[][operations.Option](/docs/sdks/go/api-reference/operations/option) | :heavy\_minus\_sign: | The options for this request.       |

### Response

**[\*operations.GetAnalyticsMetaResponse](/docs/sdks/go/api-reference/operations/getanalyticsmetaresponse), error**

### Errors

| Error Type                            | Status Code | Content Type     |
| ------------------------------------- | ----------- | ---------------- |
| sdkerrors.UnauthorizedResponseError   | 401         | application/json |
| sdkerrors.ForbiddenResponseError      | 403         | application/json |
| sdkerrors.InternalServerResponseError | 500         | application/json |
| sdkerrors.APIError                    | 4XX, 5XX    | \*/\*            |

## QueryAnalytics

Execute an analytics query with specified metrics, dimensions, filters, and time range. [Management key](/docs/guides/overview/auth/management-api-keys) required.

### Example Usage

```go
package main

import(
	"context"
	"os"
	openrouter "github.com/OpenRouterTeam/go-sdk"
	"github.com/OpenRouterTeam/go-sdk/types"
	"github.com/OpenRouterTeam/go-sdk/models/operations"
	"log"
)

func main() {
    ctx := context.Background()

    s := openrouter.New(
        openrouter.WithSecurity(os.Getenv("OPENROUTER_API_KEY")),
    )

    res, err := s.Beta.Analytics.QueryAnalytics(ctx, operations.QueryAnalyticsRequest{
        Dimensions: []string{
            "model",
        },
        Granularity: openrouter.Pointer("day"),
        Limit: openrouter.Pointer[int64](100),
        Metrics: []string{
            "request_count",
        },
        TimeRange: &operations.TimeRange{
            End: types.MustTimeFromString("2025-01-08T00:00:00Z"),
            Start: types.MustTimeFromString("2025-01-01T00:00:00Z"),
        },
    })
    if err != nil {
        log.Fatal(err)
    }
    if res != nil {
        // handle response
    }
}
```

### Parameters

| Parameter | Type                                                                                             | Required             | Description                                |
| --------- | ------------------------------------------------------------------------------------------------ | -------------------- | ------------------------------------------ |
| `ctx`     | [context.Context](https://pkg.go.dev/context#Context)                                            | :heavy\_check\_mark: | The context to use for the request.        |
| `request` | [operations.QueryAnalyticsRequest](/docs/sdks/go/api-reference/operations/queryanalyticsrequest) | :heavy\_check\_mark: | The request object to use for the request. |
| `opts`    | \[][operations.Option](/docs/sdks/go/api-reference/operations/option)                            | :heavy\_minus\_sign: | The options for this request.              |

### Response

**[\*operations.QueryAnalyticsResponse](/docs/sdks/go/api-reference/operations/queryanalyticsresponse), error**

### Errors

| Error Type                            | Status Code | Content Type     |
| ------------------------------------- | ----------- | ---------------- |
| sdkerrors.BadRequestResponseError     | 400         | application/json |
| sdkerrors.UnauthorizedResponseError   | 401         | application/json |
| sdkerrors.ForbiddenResponseError      | 403         | application/json |
| sdkerrors.RequestTimeoutResponseError | 408         | application/json |
| sdkerrors.InternalServerResponseError | 500         | application/json |
| sdkerrors.APIError                    | 4XX, 5XX    | \*/\*            |