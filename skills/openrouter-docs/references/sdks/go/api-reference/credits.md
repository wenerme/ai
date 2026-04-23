> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/sdks/go/api-reference/llms.txt.
> For full documentation content, see https://openrouter.ai/docs/sdks/go/api-reference/llms-full.txt.

# Credits - Go SDK

{/* banner:start */}

<Warning>
  The Go SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/go-sdk/issues).
</Warning>

{/* banner:end */}

## Overview

Credit management endpoints

### Available Operations

* [GetCredits](#getcredits) - Get remaining credits

## GetCredits

Get total credits purchased and used for the authenticated user. [Management key](/docs/guides/overview/auth/management-api-keys) required.

### Example Usage

{/* UsageSnippet language="go" operationID="getCredits" method="get" path="/credits" */}

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

    res, err := s.Credits.GetCredits(ctx)
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

**[\*operations.GetCreditsResponse](/docs/sdks/go/api-reference/operations/getcreditsresponse), error**

### Errors

| Error Type                            | Status Code | Content Type     |
| ------------------------------------- | ----------- | ---------------- |
| sdkerrors.UnauthorizedResponseError   | 401         | application/json |
| sdkerrors.ForbiddenResponseError      | 403         | application/json |
| sdkerrors.InternalServerResponseError | 500         | application/json |
| sdkerrors.APIError                    | 4XX, 5XX    | \*/\*            |