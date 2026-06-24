> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/sdks/go/api-reference/llms.txt.
> For full documentation content, see https://openrouter.ai/docs/sdks/go/api-reference/llms-full.txt.

# Analytics - Go SDK

{/* banner:start */}

<Warning>
  The Go SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/go-sdk/issues).
</Warning>

{/* banner:end */}

## Overview

Analytics and usage endpoints

### Available Operations

* [GetUserActivity](#getuseractivity) - Get user activity grouped by endpoint

## GetUserActivity

Returns user activity data grouped by endpoint for the last 30 (completed) UTC days. [Management key](/docs/guides/overview/auth/management-api-keys) required.

### Example Usage

{/* UsageSnippet language="go" operationID="getUserActivity" method="get" path="/activity" */}

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

    res, err := s.Analytics.GetUserActivity(ctx, nil, nil, nil)
    if err != nil {
        log.Fatal(err)
    }
    if res != nil {
        // handle response
    }
}
```

### Parameters

| Parameter    | Type                                                                  | Required             | Description                                                               | Example         |
| ------------ | --------------------------------------------------------------------- | -------------------- | ------------------------------------------------------------------------- | --------------- |
| `ctx`        | [context.Context](https://pkg.go.dev/context#Context)                 | :heavy\_check\_mark: | The context to use for the request.                                       |                 |
| `date`       | `*string`                                                             | :heavy\_minus\_sign: | Filter by a single UTC date in the last 30 days (YYYY-MM-DD format).      | 2025-08-24      |
| `apiKeyHash` | `*string`                                                             | :heavy\_minus\_sign: | Filter by API key hash (SHA-256 hex string, as returned by the keys API). | abc123def456... |
| `userID`     | `*string`                                                             | :heavy\_minus\_sign: | Filter by org member user ID. Only applicable for organization accounts.  | user\_abc123    |
| `opts`       | \[][operations.Option](/docs/sdks/go/api-reference/operations/option) | :heavy\_minus\_sign: | The options for this request.                                             |                 |

### Response

**[\*components.ActivityResponse](/docs/sdks/go/api-reference/models/activityresponse), error**

### Errors

| Error Type                            | Status Code | Content Type     |
| ------------------------------------- | ----------- | ---------------- |
| sdkerrors.BadRequestResponseError     | 400         | application/json |
| sdkerrors.UnauthorizedResponseError   | 401         | application/json |
| sdkerrors.ForbiddenResponseError      | 403         | application/json |
| sdkerrors.NotFoundResponseError       | 404         | application/json |
| sdkerrors.InternalServerResponseError | 500         | application/json |
| sdkerrors.APIError                    | 4XX, 5XX    | \*/\*            |