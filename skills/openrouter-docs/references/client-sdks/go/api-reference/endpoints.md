> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For full documentation content, see https://openrouter.ai/docs/llms-full.txt.

# Endpoints - Go SDK

{/* banner:start */}

<Warning>
  The Go SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/go-sdk/issues).
</Warning>

{/* banner:end */}

## Overview

Endpoint information

### Available Operations

* [ListZdrEndpoints](#listzdrendpoints) - Preview the impact of ZDR on the available endpoints
* [List](#list) - List all endpoints for a model

## ListZdrEndpoints

Preview the impact of ZDR on the available endpoints

### Example Usage

{/* UsageSnippet language="go" operationID="listEndpointsZdr" method="get" path="/endpoints/zdr" */}

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

    res, err := s.Endpoints.ListZdrEndpoints(ctx)
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

**[\*operations.ListEndpointsZdrResponse](/docs/sdks/go/api-reference/operations/listendpointszdrresponse), error**

### Errors

| Error Type                            | Status Code | Content Type     |
| ------------------------------------- | ----------- | ---------------- |
| sdkerrors.InternalServerResponseError | 500         | application/json |
| sdkerrors.APIError                    | 4XX, 5XX    | \*/\*            |

## List

List all endpoints for a model

### Example Usage

{/* UsageSnippet language="go" operationID="listEndpoints" method="get" path="/models/{author}/{slug}/endpoints" */}

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

    res, err := s.Endpoints.List(ctx, "<value>", "<value>")
    if err != nil {
        log.Fatal(err)
    }
    if res != nil {
        // handle response
    }
}
```

### Parameters

| Parameter | Type                                                                  | Required             | Description                          | Example |
| --------- | --------------------------------------------------------------------- | -------------------- | ------------------------------------ | ------- |
| `ctx`     | [context.Context](https://pkg.go.dev/context#Context)                 | :heavy\_check\_mark: | The context to use for the request.  |         |
| `author`  | `string`                                                              | :heavy\_check\_mark: | The author/organization of the model | openai  |
| `slug`    | `string`                                                              | :heavy\_check\_mark: | The model slug                       | gpt-4   |
| `opts`    | \[][operations.Option](/docs/sdks/go/api-reference/operations/option) | :heavy\_minus\_sign: | The options for this request.        |         |

### Response

**[\*operations.ListEndpointsResponse](/docs/sdks/go/api-reference/operations/listendpointsresponse), error**

### Errors

| Error Type                            | Status Code | Content Type     |
| ------------------------------------- | ----------- | ---------------- |
| sdkerrors.NotFoundResponseError       | 404         | application/json |
| sdkerrors.InternalServerResponseError | 500         | application/json |
| sdkerrors.APIError                    | 4XX, 5XX    | \*/\*            |