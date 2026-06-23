> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://openrouter.ai/docs/_mcp/server.

# Images - Go SDK

The Go SDK and docs are currently in beta.
Report issues on [GitHub](https://github.com/OpenRouterTeam/go-sdk/issues).

## Overview

Images endpoints

### Available Operations

* [Generate](#generate) - Generate an image
* [ListModels](#listmodels) - List image generation models
* [ListModelEndpoints](#listmodelendpoints) - List endpoints for an image model

## Generate

Generates an image from a text prompt via the image generation router

### Example Usage

```go
package main

import(
	"context"
	"os"
	openrouter "github.com/OpenRouterTeam/go-sdk"
	"github.com/OpenRouterTeam/go-sdk/models/components"
	"log"
)

func main() {
    ctx := context.Background()

    s := openrouter.New(
        openrouter.WithSecurity(os.Getenv("OPENROUTER_API_KEY")),
    )

    res, err := s.Images.Generate(ctx, components.ImageGenerationRequest{
        Model: "bytedance-seed/seedream-4.5",
        Prompt: "a red panda astronaut floating in space, studio lighting",
    })
    if err != nil {
        log.Fatal(err)
    }
    if res != nil {
        defer res.ImageStreamingResponse.Close()

        for res.ImageStreamingResponse.Next() {
            event := res.ImageStreamingResponse.Value()
            log.Print(event)
            // Handle the event
	      }
    }
}
```

### Parameters

| Parameter | Type                                                                                           | Required             | Description                                |
| --------- | ---------------------------------------------------------------------------------------------- | -------------------- | ------------------------------------------ |
| `ctx`     | [context.Context](https://pkg.go.dev/context#Context)                                          | :heavy\_check\_mark: | The context to use for the request.        |
| `request` | [components.ImageGenerationRequest](/docs/sdks/go/api-reference/models/imagegenerationrequest) | :heavy\_check\_mark: | The request object to use for the request. |
| `opts`    | \[][operations.Option](/docs/sdks/go/api-reference/operations/option)                          | :heavy\_minus\_sign: | The options for this request.              |

### Response

**[\*operations.CreateImagesResponse](/docs/sdks/go/api-reference/operations/createimagesresponse), error**

### Errors

| Error Type                                | Status Code | Content Type     |
| ----------------------------------------- | ----------- | ---------------- |
| sdkerrors.BadRequestResponseError         | 400         | application/json |
| sdkerrors.UnauthorizedResponseError       | 401         | application/json |
| sdkerrors.PaymentRequiredResponseError    | 402         | application/json |
| sdkerrors.ForbiddenResponseError          | 403         | application/json |
| sdkerrors.NotFoundResponseError           | 404         | application/json |
| sdkerrors.TooManyRequestsResponseError    | 429         | application/json |
| sdkerrors.InternalServerResponseError     | 500         | application/json |
| sdkerrors.BadGatewayResponseError         | 502         | application/json |
| sdkerrors.EdgeNetworkTimeoutResponseError | 524         | application/json |
| sdkerrors.ProviderOverloadedResponseError | 529         | application/json |
| sdkerrors.APIError                        | 4XX, 5XX    | \*/\*            |

## ListModels

Lists every image generation model with its top-level supported-parameter superset and a URL to its full per-endpoint records.

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

    res, err := s.Images.ListModels(ctx)
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

**[\*components.ImageModelsListResponse](/docs/sdks/go/api-reference/models/imagemodelslistresponse), error**

### Errors

| Error Type                            | Status Code | Content Type     |
| ------------------------------------- | ----------- | ---------------- |
| sdkerrors.InternalServerResponseError | 500         | application/json |
| sdkerrors.APIError                    | 4XX, 5XX    | \*/\*            |

## ListModelEndpoints

Returns the full per-endpoint records for an image model: each endpoint's definitive supported parameters, pricing, and passthrough allowlist.

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

    res, err := s.Images.ListModelEndpoints(ctx, "bytedance-seed", "seedream-4.5")
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
| `author`  | `string`                                                              | :heavy\_check\_mark: | Model author/organization           | bytedance-seed |
| `slug`    | `string`                                                              | :heavy\_check\_mark: | Model slug                          | seedream-4.5   |
| `opts`    | \[][operations.Option](/docs/sdks/go/api-reference/operations/option) | :heavy\_minus\_sign: | The options for this request.       |                |

### Response

**[\*components.ImageModelEndpointsResponse](/docs/sdks/go/api-reference/models/imagemodelendpointsresponse), error**

### Errors

| Error Type                            | Status Code | Content Type     |
| ------------------------------------- | ----------- | ---------------- |
| sdkerrors.NotFoundResponseError       | 404         | application/json |
| sdkerrors.InternalServerResponseError | 500         | application/json |
| sdkerrors.APIError                    | 4XX, 5XX    | \*/\*            |