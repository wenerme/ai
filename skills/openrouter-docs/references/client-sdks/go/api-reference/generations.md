> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/client-sdks/go/api-reference/llms.txt.
> For full documentation content, see https://openrouter.ai/docs/client-sdks/go/api-reference/llms-full.txt.

# Generations - Go SDK

{/* banner:start */}

<Warning>
  The Go SDK and docs are currently in beta.
  Report issues on [GitHub](https://github.com/OpenRouterTeam/go-sdk/issues).
</Warning>

{/* banner:end */}

## Overview

Generation history endpoints

### Available Operations

* [GetGeneration](#getgeneration) - Get request & usage metadata for a generation
* [ListGenerationContent](#listgenerationcontent) - Get stored prompt and completion content for a generation

## GetGeneration

Get request & usage metadata for a generation

### Example Usage

{/* UsageSnippet language="go" operationID="getGeneration" method="get" path="/generation" */}

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

    res, err := s.Generations.GetGeneration(ctx, "<id>")
    if err != nil {
        log.Fatal(err)
    }
    if res != nil {
        // handle response
    }
}
```

### Parameters

| Parameter | Type                                                                  | Required             | Description                         | Example        |
| --------- | --------------------------------------------------------------------- | -------------------- | ----------------------------------- | -------------- |
| `ctx`     | [context.Context](https://pkg.go.dev/context#Context)                 | :heavy\_check\_mark: | The context to use for the request. |                |
| `id`      | `string`                                                              | :heavy\_check\_mark: | The generation ID                   | gen-1234567890 |
| `opts`    | \[][operations.Option](/docs/sdks/go/api-reference/operations/option) | :heavy\_minus\_sign: | The options for this request.       |                |

### Response

**[\*components.GenerationResponse](/docs/sdks/go/api-reference/models/generationresponse), error**

### Errors

| Error Type                                | Status Code | Content Type     |
| ----------------------------------------- | ----------- | ---------------- |
| sdkerrors.UnauthorizedResponseError       | 401         | application/json |
| sdkerrors.PaymentRequiredResponseError    | 402         | application/json |
| sdkerrors.NotFoundResponseError           | 404         | application/json |
| sdkerrors.TooManyRequestsResponseError    | 429         | application/json |
| sdkerrors.InternalServerResponseError     | 500         | application/json |
| sdkerrors.BadGatewayResponseError         | 502         | application/json |
| sdkerrors.EdgeNetworkTimeoutResponseError | 524         | application/json |
| sdkerrors.ProviderOverloadedResponseError | 529         | application/json |
| sdkerrors.APIError                        | 4XX, 5XX    | \*/\*            |

## ListGenerationContent

Get stored prompt and completion content for a generation

### Example Usage

{/* UsageSnippet language="go" operationID="listGenerationContent" method="get" path="/generation/content" */}

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

    res, err := s.Generations.ListGenerationContent(ctx, "gen-1234567890")
    if err != nil {
        log.Fatal(err)
    }
    if res != nil {
        // handle response
    }
}
```

### Parameters

| Parameter | Type                                                                  | Required             | Description                         | Example        |
| --------- | --------------------------------------------------------------------- | -------------------- | ----------------------------------- | -------------- |
| `ctx`     | [context.Context](https://pkg.go.dev/context#Context)                 | :heavy\_check\_mark: | The context to use for the request. |                |
| `id`      | `string`                                                              | :heavy\_check\_mark: | The generation ID                   | gen-1234567890 |
| `opts`    | \[][operations.Option](/docs/sdks/go/api-reference/operations/option) | :heavy\_minus\_sign: | The options for this request.       |                |

### Response

**[\*components.GenerationContentResponse](/docs/sdks/go/api-reference/models/generationcontentresponse), error**

### Errors

| Error Type                                | Status Code | Content Type     |
| ----------------------------------------- | ----------- | ---------------- |
| sdkerrors.UnauthorizedResponseError       | 401         | application/json |
| sdkerrors.ForbiddenResponseError          | 403         | application/json |
| sdkerrors.NotFoundResponseError           | 404         | application/json |
| sdkerrors.TooManyRequestsResponseError    | 429         | application/json |
| sdkerrors.InternalServerResponseError     | 500         | application/json |
| sdkerrors.BadGatewayResponseError         | 502         | application/json |
| sdkerrors.EdgeNetworkTimeoutResponseError | 524         | application/json |
| sdkerrors.ProviderOverloadedResponseError | 529         | application/json |
| sdkerrors.APIError                        | 4XX, 5XX    | \*/\*            |